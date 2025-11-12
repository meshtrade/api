package generate

import (
	"strings"

	"google.golang.org/protobuf/compiler/protogen"
)

// TypeInfo holds parsed information about a protobuf message or enum
type TypeInfo struct {
	Name        string
	Description string
	Package     string
	ProtoPath   string
	IsEnum      bool
	Fields      []FieldInfo
	EnumValues  []EnumValueInfo
}

// EnumValueInfo holds information about enum values
type EnumValueInfo struct {
	Name        string
	Description string
	Number      int32
}

// PackageTypeInfo holds all types for a package
type PackageTypeInfo struct {
	Package     string
	Domain      string
	ServiceName string
	Version     string
	Types       []TypeInfo
}

// ParsePackageTypes extracts type information from all files in a package
func ParsePackageTypes(file *protogen.File) (*PackageTypeInfo, error) {
	packageInfo := &PackageTypeInfo{
		Package:     string(file.Desc.Package()),
		Domain:      getServiceDomain(string(file.Desc.Package())),
		ServiceName: getServiceName(string(file.Desc.Package())),
		Version:     getServiceVersion(string(file.Desc.Package())),
		Types:       make([]TypeInfo, 0),
	}

	// Parse message types
	for _, message := range file.Messages {
		if shouldIncludeType(string(message.Desc.Name())) {
			typeInfo := parseMessageType(file, message)
			packageInfo.Types = append(packageInfo.Types, *typeInfo)
		}
	}

	// Parse enum types
	for _, enum := range file.Enums {
		typeInfo := parseEnumType(file, enum)
		packageInfo.Types = append(packageInfo.Types, *typeInfo)
	}

	return packageInfo, nil
}

// parseMessageType extracts information from a protobuf message
func parseMessageType(file *protogen.File, message *protogen.Message) *TypeInfo {
	typeInfo := &TypeInfo{
		Name:        string(message.Desc.Name()),
		Description: extractComment(message.Comments.Leading),
		Package:     string(file.Desc.Package()),
		ProtoPath:   string(file.Desc.Path()),
		IsEnum:      false,
		Fields:      make([]FieldInfo, 0, len(message.Fields)),
	}

	// Parse fields
	for _, field := range message.Fields {
		// Extract validation rules from buf.validate annotations
		required, validation := extractValidationRules(field)
		
		// Fall back to presence check if no validation rules found
		if !required {
			required = field.Desc.HasPresence()
		}
		
		fieldInfo := FieldInfo{
			Name:        string(field.Desc.Name()),
			Type:        getFieldTypeString(field),
			Description: extractComment(field.Comments.Leading),
			Required:    required,
			Validation:  validation,
		}
		typeInfo.Fields = append(typeInfo.Fields, fieldInfo)
	}

	return typeInfo
}

// parseEnumType extracts information from a protobuf enum
func parseEnumType(file *protogen.File, enum *protogen.Enum) *TypeInfo {
	typeInfo := &TypeInfo{
		Name:        string(enum.Desc.Name()),
		Description: extractComment(enum.Comments.Leading),
		Package:     string(file.Desc.Package()),
		ProtoPath:   string(file.Desc.Path()),
		IsEnum:      true,
		EnumValues:  make([]EnumValueInfo, 0, len(enum.Values)),
	}

	// Parse enum values
	for _, value := range enum.Values {
		enumValue := EnumValueInfo{
			Name:        string(value.Desc.Name()),
			Description: extractComment(value.Comments.Leading),
			Number:      int32(value.Desc.Number()),
		}
		typeInfo.EnumValues = append(typeInfo.EnumValues, enumValue)
	}

	return typeInfo
}

// shouldIncludeType determines if a message type should be included in documentation
func shouldIncludeType(typeName string) bool {
	// Exclude request and response types
	if strings.HasSuffix(typeName, "Request") || strings.HasSuffix(typeName, "Response") {
		return false
	}

	// TODO: Add logic to include types that are returned from service methods
	// For now, include all non-request/response types
	return true
}

// getFieldTypeString returns a human-readable type string for a field
func getFieldTypeString(field *protogen.Field) string {
	if field.Desc.IsList() {
		return getBaseTypeString(field) + "[]"
	}
	return getBaseTypeString(field)
}

// getBaseTypeString returns the base type string for a field
func getBaseTypeString(field *protogen.Field) string {
	switch field.Desc.Kind().String() {
	case "message":
		// For message types, use the fully qualified name
		if field.Message != nil {
			return string(field.Message.Desc.FullName())
		}
		return "message"
	case "enum":
		// For enum types, use the fully qualified name
		if field.Enum != nil {
			return string(field.Enum.Desc.FullName())
		}
		return "enum"
	default:
		// For primitive types, use the kind string
		return field.Desc.Kind().String()
	}
}

