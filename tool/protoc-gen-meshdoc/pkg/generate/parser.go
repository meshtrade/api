package generate

import (
	"strings"

	"google.golang.org/protobuf/compiler/protogen"
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
func parseMessageFields(message *protogen.Message) []FieldInfo {
	fields := make([]FieldInfo, 0, len(message.Fields))

	for _, field := range message.Fields {
		fieldInfo := FieldInfo{
			Name:        field.GoName,
			Type:        field.Desc.Kind().String(),
			Description: extractComment(field.Comments.Leading),
			Required:    field.Desc.HasPresence(), // Simplified - actual validation rules would be more complex
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