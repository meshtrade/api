package generate

import (
	"fmt"
	"os"
	"slices"
	"strings"

	validate "buf.build/gen/go/bufbuild/protovalidate/protocolbuffers/go/buf/validate"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/encoding/protowire"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/reflect/protoreflect"
)

var debugFile *os.File
var debugEnabled bool

func init() {
	// Only enable debug logging if DEBUG_MESHDOC environment variable is set
	debugEnabled = os.Getenv("DEBUG_MESHDOC") != ""
	if debugEnabled {
		var err error
		debugFile, err = os.Create("/tmp/protoc-gen-meshdoc-debug.log")
		if err != nil {
			panic(err)
		}
	}
}

func debugLog(format string, args ...interface{}) {
	if debugEnabled && debugFile != nil {
		fmt.Fprintf(debugFile, format+"\n", args...)
		debugFile.Sync()
	}
}

const (
	// Extension tag for meshtrade.option.method_options.v1.method_options
	methodOptionsExtension = 50006

	// Field numbers within MethodOptions message
	methodTypeFieldNumber  = 1 // type field (MethodType enum)
	accessLevelFieldNumber = 2 // access_level field (MethodAccessLevel enum)
	rolesFieldNumber       = 3 // roles field (repeated Role enum)
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
	Name              string
	Description       string
	Roles             []string
	MethodType        string
	AccessLevel       string // NEW: Access level from method_options (e.g., METHOD_ACCESS_LEVEL_AUTHENTICATED)
	Parameters        []FieldInfo
	Returns           string
	RequestType       string
	ResponseType      string            // NEW: Fully qualified response type name
	OutputMessage     *protogen.Message // Reference to response message for field parsing
	IsServerStreaming bool              // Indicates if this method uses server-side streaming
}

// FieldInfo holds information about message fields
type FieldInfo struct {
	Name         string
	Type         string
	Description  string
	Required     bool
	Validation   string
	NestedFields []FieldInfo // For inline message types, contains the nested field structure
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
		Name:          method.GoName,
		Description:   extractComment(method.Comments.Leading),
		RequestType:   method.Input.GoIdent.GoName,
		Returns:       method.Output.GoIdent.GoName,
		ResponseType:  string(method.Output.Desc.FullName()), // Fully qualified type name
		OutputMessage: method.Output,                         // Store response message reference for field parsing
	}

	// Extract method options from protobuf extension (type, access_level, roles)
	methodType, accessLevel, roles := extractMethodOptions(method)
	methodInfo.MethodType = methodType
	methodInfo.AccessLevel = accessLevel
	methodInfo.Roles = roles

	// Detect server-streaming methods
	methodInfo.IsServerStreaming = method.Desc.IsStreamingServer()

	// Parse request parameters
	methodInfo.Parameters = parseMessageFields(method.Input)

	return methodInfo, nil
}

// getEnumNameMap builds a map of enum number -> enum name from an enum descriptor
// This is a generic function that can find any enum by its fully-qualified name
func getEnumNameMap(method *protogen.Method, enumFullName string) map[int32]string {
	enumMap := make(map[int32]string)

	// Helper function to search for the enum in a file descriptor
	searchFileForEnum := func(fileDesc protoreflect.FileDescriptor) bool {
		enums := fileDesc.Enums()
		for j := 0; j < enums.Len(); j++ {
			enum := enums.Get(j)
			if string(enum.FullName()) == enumFullName {
				// Found the enum! Build the map
				values := enum.Values()
				for k := 0; k < values.Len(); k++ {
					value := values.Get(k)
					enumMap[int32(value.Number())] = string(value.Name())
				}
				debugLog("Found enum %s with %d entries in %s\n", enumFullName, len(enumMap), fileDesc.Path())
				return true
			}
		}
		return false
	}

	// Search through all imported files for the enum
	imports := method.Parent.Desc.ParentFile().Imports()
	for i := 0; i < imports.Len(); i++ {
		fileDesc := imports.Get(i).FileDescriptor

		// Check if this file contains the enum
		if searchFileForEnum(fileDesc) {
			return enumMap
		}

		// Also search this file's imports (transitive search)
		// This is important because service.proto -> method_options.proto -> role.proto
		transImports := fileDesc.Imports()
		for j := 0; j < transImports.Len(); j++ {
			transFileDesc := transImports.Get(j).FileDescriptor
			if searchFileForEnum(transFileDesc) {
				return enumMap
			}
		}
	}

	debugLog("Enum %s not found in imports\n", enumFullName)
	return enumMap
}

// getRoleNameMap builds a map of role number -> role name from the Role enum descriptor
func getRoleNameMap(method *protogen.Method) map[int32]string {
	return getEnumNameMap(method, "meshtrade.iam.role.v1.Role")
}

// getMethodTypeNameMap builds a map of method type number -> method type name from the MethodType enum descriptor
func getMethodTypeNameMap(method *protogen.Method) map[int32]string {
	return getEnumNameMap(method, "meshtrade.option.method_options.v1.MethodType")
}

// getAccessLevelNameMap builds a map of access level number -> access level name from the MethodAccessLevel enum descriptor
func getAccessLevelNameMap(method *protogen.Method) map[int32]string {
	return getEnumNameMap(method, "meshtrade.option.method_options.v1.MethodAccessLevel")
}

// extractMethodOptionsFromBytes parses the raw protobuf wire format bytes
// of the MethodOptions message and returns the parsed values
func extractMethodOptionsFromBytes(methodName string, data []byte, methodTypeMap, accessLevelMap, roleMap map[int32]string) (methodType string, accessLevel string, roles []string) {
	// Default values
	methodType = "Unknown"
	accessLevel = "Unknown"
	var roleNumbers []int32

	// Parse the wire format
	pos := 0
	for pos < len(data) {
		// Read field tag
		tag, n := protowire.ConsumeVarint(data[pos:])
		if n < 0 {
			debugLog("DEBUG [%s]: Failed to read tag in extension bytes\n", methodName)
			return
		}
		pos += n

		fieldNum := protowire.Number(tag >> 3)
		wireType := protowire.Type(tag & 0x7)

		switch fieldNum {
		case methodTypeFieldNumber:
			if wireType == protowire.VarintType {
				typeNum, n := protowire.ConsumeVarint(data[pos:])
				if n < 0 {
					debugLog("[%s] Failed to read type value\n", methodName)
					return
				}
				pos += n
				// Map enum number to name using dynamic map
				if typeName, ok := methodTypeMap[int32(typeNum)]; ok {
					methodType = typeName
				} else {
					methodType = "METHOD_TYPE_UNSPECIFIED"
				}
			}
		case accessLevelFieldNumber:
			if wireType == protowire.VarintType {
				accessNum, n := protowire.ConsumeVarint(data[pos:])
				if n < 0 {
					debugLog("[%s] Failed to read access_level value\n", methodName)
					return
				}
				pos += n
				// Map enum number to name using dynamic map
				if accessName, ok := accessLevelMap[int32(accessNum)]; ok {
					accessLevel = accessName
				} else {
					accessLevel = "METHOD_ACCESS_LEVEL_UNSPECIFIED"
				}
			}
		case rolesFieldNumber:
			if wireType == protowire.BytesType {
				// Packed repeated field - read the length-delimited bytes containing multiple varints
				packedBytes, n := protowire.ConsumeBytes(data[pos:])
				if n < 0 {
					debugLog("[%s] Failed to read packed roles bytes\n", methodName)
					return
				}
				pos += n

				// Parse the packed varints
				packedPos := 0
				for packedPos < len(packedBytes) {
					roleNum, n := protowire.ConsumeVarint(packedBytes[packedPos:])
					if n < 0 {
						debugLog("[%s] Failed to parse role from packed bytes\n", methodName)
						break
					}
					packedPos += n
					roleNumbers = append(roleNumbers, int32(roleNum))
				}
			} else if wireType == protowire.VarintType {
				// Non-packed repeated field (individual varints)
				roleNum, n := protowire.ConsumeVarint(data[pos:])
				if n < 0 {
					debugLog("[%s] Failed to read role value\n", methodName)
					return
				}
				pos += n
				roleNumbers = append(roleNumbers, int32(roleNum))
			}
		default:
			// Skip unknown fields
			switch wireType {
			case protowire.VarintType:
				_, n = protowire.ConsumeVarint(data[pos:])
			case protowire.Fixed64Type:
				_, n = protowire.ConsumeFixed64(data[pos:])
			case protowire.BytesType:
				_, n = protowire.ConsumeBytes(data[pos:])
			case protowire.Fixed32Type:
				_, n = protowire.ConsumeFixed32(data[pos:])
			default:
				debugLog("[%s] Unknown wire type in extension: %d\n", methodName, wireType)
				return
			}
			if n < 0 {
				debugLog("[%s] Failed to skip unknown field in extension\n", methodName)
				return
			}
			pos += n
		}
	}

	// Convert role numbers to role names using the provided roleMap
	for _, roleNum := range roleNumbers {
		if roleName, ok := roleMap[roleNum]; ok {
			roles = append(roles, roleName)
		} else {
			// Fallback to numeric representation if role not found in map
			roleName := fmt.Sprintf("ROLE_ENUM_%d", roleNum)
			roles = append(roles, roleName)
			debugLog("[%s] Role %d not in map, using %s\n", methodName, roleNum, roleName)
		}
	}

	debugLog("[%s] Parsed: type=%s, access=%s, roles=%v\n", methodName, methodType, accessLevel, roles)

	return methodType, accessLevel, roles
}

// extractMethodOptions reads method options from proto extension without importing generated code
// This avoids circular dependency on generated Go code.
func extractMethodOptions(method *protogen.Method) (methodType, accessLevel string, roles []string) {
	// Default values if extension not found
	methodType = "Unknown"
	accessLevel = "Unknown"
	roles = []string{"Check proto file for roles"}

	// Get method options
	methodOpts := method.Desc.Options()
	if methodOpts == nil {
		return
	}

	// Get the protoreflect message
	methodOptsMsg := methodOpts.ProtoReflect()

	// Try to find the extension descriptor from the parent file
	// Look for extensions named "method_options" in imported files
	var extensionField protoreflect.FieldDescriptor

	// Search through all imported files for the extension descriptor
	imports := method.Parent.Desc.ParentFile().Imports()
	for i := 0; i < imports.Len(); i++ {
		fileDesc := imports.Get(i).FileDescriptor
		exts := fileDesc.Extensions()
		// Check if this file contains our extension
		for j := 0; j < exts.Len(); j++ {
			ext := exts.Get(j)
			if ext.Number() == methodOptionsExtension &&
				string(ext.FullName()) == "meshtrade.option.method_options.v1.method_options" {
				extensionField = ext
				debugLog("[%s] Found extension descriptor in %s\n", method.GoName, fileDesc.Path())
				break
			}
		}
		if extensionField != nil {
			break
		}
	}

	// If we didn't find the extension descriptor, try the method's own file
	if extensionField == nil {
		exts := method.Parent.Desc.ParentFile().Extensions()
		for i := 0; i < exts.Len(); i++ {
			ext := exts.Get(i)
			if ext.Number() == methodOptionsExtension &&
				string(ext.FullName()) == "meshtrade.option.method_options.v1.method_options" {
				extensionField = ext
				debugLog("[%s] Found extension in method's own file\n", method.GoName)
				break
			}
		}
	}

	// If we still don't have the extension, return defaults
	if extensionField == nil {
		debugLog("[%s] Extension descriptor not found\n", method.GoName)
		return
	}

	// APPROACH: Parse extension from unknown fields
	// When extensions aren't registered (to avoid circular deps), they're stored in unknown fields
	// We need to manually parse the wire format from unknown fields

	// Get unknown fields from the message
	unknownFields := methodOptsMsg.GetUnknown()

	if len(unknownFields) == 0 {
		return
	}

	// Parse the unknown fields looking for our extension number (50006)
	// Wire format: field number is (tag >> 3), wire type is (tag & 0x7)
	// For a length-delimited field (messages), wire type is 2

	var extensionBytes []byte
	pos := 0
	for pos < len(unknownFields) {
		if pos >= len(unknownFields) {
			break
		}

		// Read varint tag
		tag, n := protowire.ConsumeVarint(unknownFields[pos:])
		if n < 0 {
			debugLog("[%s] Failed to read tag at pos %d\n", method.GoName, pos)
			break
		}
		pos += n

		fieldNum := protowire.Number(tag >> 3)
		wireType := protowire.Type(tag & 0x7)

		if fieldNum == protowire.Number(methodOptionsExtension) && wireType == protowire.BytesType {
			// Found our extension! Read the length-delimited value
			extensionBytes, n = protowire.ConsumeBytes(unknownFields[pos:])
			if n < 0 {
				debugLog("[%s] Failed to read extension bytes\n", method.GoName)
				return
			}
			debugLog("[%s] Found extension: %d bytes\n", method.GoName, len(extensionBytes))
			break
		}

		// Skip this field's value based on wire type
		switch wireType {
		case protowire.VarintType:
			_, n = protowire.ConsumeVarint(unknownFields[pos:])
		case protowire.Fixed64Type:
			_, n = protowire.ConsumeFixed64(unknownFields[pos:])
		case protowire.BytesType:
			_, n = protowire.ConsumeBytes(unknownFields[pos:])
		case protowire.Fixed32Type:
			_, n = protowire.ConsumeFixed32(unknownFields[pos:])
		default:
			debugLog("[%s] Unknown wire type %d\n", method.GoName, wireType)
			return
		}
		if n < 0 {
			debugLog("[%s] Failed to skip field value\n", method.GoName)
			return
		}
		pos += n
	}

	if extensionBytes == nil {
		debugLog("[%s] Extension field not found in unknown fields\n", method.GoName)
		return
	}

	// Now we have the raw bytes of the MethodOptions message
	// We need to parse it manually to extract the three fields:
	// 1 = type (enum)
	// 2 = access_level (enum)
	// 3 = roles (repeated enum)

	// Build enum name maps from descriptors
	methodTypeMap := getMethodTypeNameMap(method)
	accessLevelMap := getAccessLevelNameMap(method)
	roleMap := getRoleNameMap(method)

	methodType, accessLevel, roles = extractMethodOptionsFromBytes(method.GoName, extensionBytes, methodTypeMap, accessLevelMap, roleMap)

	return
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

	// ONLY check explicit required field - this is the single source of truth
	required = fieldConstraint.GetRequired()

	// Handle different constraint types based on field type
	switch constraint := fieldConstraint.Type.(type) {
	case *validate.FieldRules_String_:
		stringConstraint := constraint.String_
		if stringConstraint != nil {
			// Build validation description (DO NOT set required from these)
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
			// Build validation string but DO NOT set required
			validationParts = append(validationParts, "Must be a valid enum value")
		}
	}

	// Handle CEL expressions - build validation string but DO NOT set required
	for _, celConstraint := range fieldConstraint.Cel {
		if celConstraint.GetMessage() != "" {
			validationParts = append(validationParts, celConstraint.GetMessage())
		} else if celConstraint.GetExpression() != "" {
			// Add abbreviated expression (DO NOT check for required)
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

		// DO NOT fall back to HasPresence() - only use explicit required:true

		fieldInfo := FieldInfo{
			Name:        field.GoName,
			Type:        getFieldTypeString(field),
			Description: extractComment(field.Comments.Leading),
			Required:    required,
			Validation:  validation,
		}

		// Check if this field is an inline message type (nested message definition)
		// An inline message is one whose parent is another message (not the file itself)
		if field.Message != nil {
			// Check if the message is defined within another message (inline)
			parent := field.Message.Desc.Parent()
			if parent != nil && parent != field.Message.Desc.ParentFile() {
				// This is an inline message - recursively parse its fields
				fieldInfo.NestedFields = parseMessageFields(field.Message)
			}
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

// getServiceDomain extracts domain from package name (e.g., "meshtrade.iam.api_user.v1" -> "iam")
func getServiceDomain(packageName string) string {
	parts := strings.Split(packageName, ".")
	fmt.Fprintf(os.Stderr, "%v", parts)
	if slices.Contains(parts, "testing") {
		return fmt.Sprintf("%s/%s", parts[1], parts[2])
	}
	if len(parts) >= 2 {
		return parts[1] // meshtrade.iam.api_user.v1 -> iam
	}
	return "unknown"
}

// getServiceName extracts service name from package (e.g., "meshtrade.iam.api_user.v1" -> "api_user")
func getServiceName(packageName string) string {
	parts := strings.Split(packageName, ".")
	if slices.Contains(parts, "testing") {
		return parts[3]
	}
	if len(parts) >= 3 {
		return parts[2] // meshtrade.iam.api_user.v1 -> api_user
	}
	return "unknown"
}

// getServiceVersion extracts version from package (e.g., "meshtrade.iam.api_user.v1" -> "v1")
func getServiceVersion(packageName string) string {
	parts := strings.Split(packageName, ".")
	if slices.Contains(parts, "testing") {
		return parts[4]
	}
	if len(parts) >= 4 {
		return parts[3] // meshtrade.iam.api_user.v1 -> v1
	}
	return "v1"
}
