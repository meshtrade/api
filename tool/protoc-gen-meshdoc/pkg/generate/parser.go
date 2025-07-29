package generate

import (
	"fmt"
	"strings"

	validate "buf.build/gen/go/bufbuild/protovalidate/protocolbuffers/go/buf/validate"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/proto"
)

// ServiceInfo holds parsed information about a protobuf service
type ServiceInfo struct {
	Name        string
	Description string
	Package     string
	ProtoPath   string
	Methods     []MethodInfo
}

// MethodInfo holds parsed information about a service method
type MethodInfo struct {
	Name        string
	Description string
	Roles       []string
	MethodType  string
	Parameters  []FieldInfo
	Returns     string
	RequestType string
}

// FieldInfo holds information about message fields
type FieldInfo struct {
	Name        string
	Type        string
	Description string
	Required    bool
	Validation  string
}

// ParseService extracts information from a protobuf service
func ParseService(file *protogen.File, service *protogen.Service) (*ServiceInfo, error) {
	serviceInfo := &ServiceInfo{
		Name:      service.GoName,
		Package:   string(file.Desc.Package()),
		ProtoPath: string(file.Desc.Path()),
		Methods:   make([]MethodInfo, 0, len(service.Methods)),
	}

	// Extract service description from comments
	serviceInfo.Description = extractComment(service.Comments.Leading)

	// Parse each method
	for _, method := range service.Methods {
		methodInfo, err := parseMethod(method)
		if err != nil {
			return nil, err
		}
		serviceInfo.Methods = append(serviceInfo.Methods, *methodInfo)
	}

	return serviceInfo, nil
}

// parseMethod extracts information from a service method
func parseMethod(method *protogen.Method) (*MethodInfo, error) {
	methodInfo := &MethodInfo{
		Name:        method.GoName,
		Description: extractComment(method.Comments.Leading),
		RequestType: method.Input.GoIdent.GoName,
		Returns:     method.Output.GoIdent.GoName,
	}

	// Extract roles and method type from comment and method description
	commentsText := string(method.Comments.Leading)
	methodInfo.Roles = extractRolesFromText(commentsText)
	methodInfo.MethodType = extractMethodTypeFromText(commentsText)

	// Parse request parameters
	methodInfo.Parameters = parseMessageFields(method.Input)

	return methodInfo, nil
}

// parseMessageFields extracts field information from a message
// extractValidationRules parses buf.validate.field annotations and returns human-readable validation rules
func extractValidationRules(field *protogen.Field) (required bool, validation string) {
	// Get field options
	options := field.Desc.Options()
	if options == nil {
		return false, ""
	}

	// Try to get the validate.field extension
	if !proto.HasExtension(options, validate.E_Field) {
		return false, ""
	}

	fieldConstraint, ok := proto.GetExtension(options, validate.E_Field).(*validate.FieldRules)
	if !ok || fieldConstraint == nil {
		return false, ""
	}

	var validationParts []string
	required = false

	// Handle different constraint types based on field type
	switch constraint := fieldConstraint.Type.(type) {
	case *validate.FieldRules_String_:
		stringConstraint := constraint.String_
		if stringConstraint != nil {
			// Check for required conditions
			if stringConstraint.GetMinLen() > 0 {
				required = true
			}
			if stringConstraint.GetLen() > 0 {
				required = true
			}

			// Build validation description
			if stringConstraint.GetLen() > 0 {
				validationParts = append(validationParts, fmt.Sprintf("Exactly %d characters", stringConstraint.GetLen()))
			} else {
				var lengthParts []string
				if stringConstraint.GetMinLen() > 0 {
					lengthParts = append(lengthParts, fmt.Sprintf("min: %d", stringConstraint.GetMinLen()))
				}
				if stringConstraint.GetMaxLen() > 0 {
					lengthParts = append(lengthParts, fmt.Sprintf("max: %d", stringConstraint.GetMaxLen()))
				}
				if len(lengthParts) > 0 {
					validationParts = append(validationParts, fmt.Sprintf("Length %s characters", strings.Join(lengthParts, ", ")))
				}
			}

			if stringConstraint.GetPattern() != "" {
				validationParts = append(validationParts, fmt.Sprintf("Pattern: %s", stringConstraint.GetPattern()))
			}
		}

	case *validate.FieldRules_Int32:
		int32Constraint := constraint.Int32
		if int32Constraint != nil {
			var rangeParts []string
			if int32Constraint.GetGte() != 0 {
				rangeParts = append(rangeParts, fmt.Sprintf("≥ %d", int32Constraint.GetGte()))
			} else if int32Constraint.GetGt() != 0 {
				rangeParts = append(rangeParts, fmt.Sprintf("> %d", int32Constraint.GetGt()))
			}
			if int32Constraint.GetLte() != 0 {
				rangeParts = append(rangeParts, fmt.Sprintf("≤ %d", int32Constraint.GetLte()))
			} else if int32Constraint.GetLt() != 0 {
				rangeParts = append(rangeParts, fmt.Sprintf("< %d", int32Constraint.GetLt()))
			}
			if len(rangeParts) > 0 {
				validationParts = append(validationParts, fmt.Sprintf("Range: %s", strings.Join(rangeParts, ", ")))
			}
		}

	case *validate.FieldRules_Int64:
		int64Constraint := constraint.Int64
		if int64Constraint != nil {
			var rangeParts []string
			if int64Constraint.GetGte() != 0 {
				rangeParts = append(rangeParts, fmt.Sprintf("≥ %d", int64Constraint.GetGte()))
			} else if int64Constraint.GetGt() != 0 {
				rangeParts = append(rangeParts, fmt.Sprintf("> %d", int64Constraint.GetGt()))
			}
			if int64Constraint.GetLte() != 0 {
				rangeParts = append(rangeParts, fmt.Sprintf("≤ %d", int64Constraint.GetLte()))
			} else if int64Constraint.GetLt() != 0 {
				rangeParts = append(rangeParts, fmt.Sprintf("< %d", int64Constraint.GetLt()))
			}
			if len(rangeParts) > 0 {
				validationParts = append(validationParts, fmt.Sprintf("Range: %s", strings.Join(rangeParts, ", ")))
			}
		}

	case *validate.FieldRules_Enum:
		enumConstraint := constraint.Enum
		if enumConstraint != nil {
			// For enums, we typically want them to be specified (not default value)
			required = true
			validationParts = append(validationParts, "Must be a valid enum value")
		}
	}

	// Handle CEL expressions
	for _, celConstraint := range fieldConstraint.Cel {
		if celConstraint.GetMessage() != "" {
			validationParts = append(validationParts, celConstraint.GetMessage())
		} else if celConstraint.GetExpression() != "" {
			// Check if expression suggests required field
			expr := strings.ToLower(celConstraint.GetExpression())
			if strings.Contains(expr, "size(this)") && (strings.Contains(expr, "> 0") || strings.Contains(expr, ">= 1")) {
				required = true
			}
			// Add abbreviated expression
			if len(celConstraint.GetExpression()) > 50 {
				validationParts = append(validationParts, fmt.Sprintf("CEL: %s...", celConstraint.GetExpression()[:47]))
			} else {
				validationParts = append(validationParts, fmt.Sprintf("CEL: %s", celConstraint.GetExpression()))
			}
		}
	}

	// Join all validation parts
	validation = strings.Join(validationParts, " | ")
	
	// Sanitize for table safety
	validation = sanitizeForTable(validation)

	return required, validation
}

func parseMessageFields(message *protogen.Message) []FieldInfo {
	fields := make([]FieldInfo, 0, len(message.Fields))

	for _, field := range message.Fields {
		// Extract validation rules from buf.validate annotations
		required, validation := extractValidationRules(field)
		
		// Fall back to presence check if no validation rules found
		if !required {
			required = field.Desc.HasPresence()
		}
		
		fieldInfo := FieldInfo{
			Name:        field.GoName,
			Type:        field.Desc.Kind().String(),
			Description: extractComment(field.Comments.Leading),
			Required:    required,
			Validation:  validation,
		}
		fields = append(fields, fieldInfo)
	}

	return fields
}

// extractComment extracts and cleans comment text
func extractComment(comments protogen.Comments) string {
	if comments == "" {
		return ""
	}

	// Clean up comment formatting
	text := string(comments)
	text = strings.TrimSpace(text)
	text = strings.ReplaceAll(text, "/*", "")
	text = strings.ReplaceAll(text, "*/", "")
	text = strings.TrimSpace(text)

	return text
}

// extractRolesFromText extracts role information from comment text
func extractRolesFromText(commentText string) []string {
	var roles []string
	
	// Look for "Authorization: Requires" pattern in comments
	lines := strings.Split(commentText, "\n")
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if strings.Contains(line, "Authorization:") && strings.Contains(line, "Requires") {
			// Extract roles from this line
			// Pattern: "Authorization: Requires ROLE_IAM_ADMIN or ROLE_IAM_VIEWER"
			roleStr := strings.Split(line, "Requires")[1]
			roleStr = strings.TrimSpace(roleStr)
			
			// Split by "or" and "and" to get individual roles
			roleParts := strings.Split(roleStr, " or ")
			for _, part := range roleParts {
				part = strings.TrimSpace(part)
				andParts := strings.Split(part, " and ")
				for _, andPart := range andParts {
					andPart = strings.TrimSpace(andPart)
					if strings.HasPrefix(andPart, "ROLE_") {
						roles = append(roles, andPart)
					}
				}
			}
		}
	}
	
	if len(roles) == 0 {
		return []string{"Check proto file for roles"}
	}
	
	return roles
}

// extractMethodTypeFromText extracts method type from comment text
func extractMethodTypeFromText(commentText string) string {
	// For now, we can't easily extract this from comments since it's in the option
	// Let's use a simple heuristic based on method name patterns
	if strings.Contains(strings.ToLower(commentText), "get") ||
		strings.Contains(strings.ToLower(commentText), "list") ||
		strings.Contains(strings.ToLower(commentText), "search") ||
		strings.Contains(strings.ToLower(commentText), "retriev") {
		return "METHOD_TYPE_READ"
	}
	
	if strings.Contains(strings.ToLower(commentText), "creat") ||
		strings.Contains(strings.ToLower(commentText), "updat") ||
		strings.Contains(strings.ToLower(commentText), "delet") ||
		strings.Contains(strings.ToLower(commentText), "activat") ||
		strings.Contains(strings.ToLower(commentText), "deactivat") {
		return "METHOD_TYPE_WRITE"
	}
	
	return "Unknown"
}


// getServiceDomain extracts domain from package name (e.g., "meshtrade.iam.api_user.v1" -> "iam")
func getServiceDomain(packageName string) string {
	parts := strings.Split(packageName, ".")
	if len(parts) >= 2 {
		return parts[1] // meshtrade.iam.api_user.v1 -> iam
	}
	return "unknown"
}

// getServiceName extracts service name from package (e.g., "meshtrade.iam.api_user.v1" -> "api_user")
func getServiceName(packageName string) string {
	parts := strings.Split(packageName, ".")
	if len(parts) >= 3 {
		return parts[2] // meshtrade.iam.api_user.v1 -> api_user
	}
	return "unknown"
}

// getServiceVersion extracts version from package (e.g., "meshtrade.iam.api_user.v1" -> "v1")
func getServiceVersion(packageName string) string {
	parts := strings.Split(packageName, ".")
	if len(parts) >= 4 {
		return parts[3] // meshtrade.iam.api_user.v1 -> v1
	}
	return "v1"
}