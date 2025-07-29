package generate

import (
	"bytes"
	"embed"
	"fmt"
	"strings"
	"text/template"
)

//go:embed templates/*.tmpl
var templateFS embed.FS

// TemplateManager handles loading and executing templates
type TemplateManager struct {
	templates *template.Template
}

// NewTemplateManager creates a new template manager with all templates loaded
func NewTemplateManager() (*TemplateManager, error) {
	funcMap := template.FuncMap{
		"kebabCase":       kebabCase,
		"titleCase":       titleCase,
		"snakeCase":       snakeCase,
		"sub":             sub,
		"escapeCurly":     escapeCurly,
		"normalizeTable":  normalizeForTable,
	}

	tmpl, err := template.New("").Funcs(funcMap).ParseFS(templateFS, "templates/*.tmpl")
	if err != nil {
		return nil, fmt.Errorf("failed to parse templates: %w", err)
	}

	return &TemplateManager{
		templates: tmpl,
	}, nil
}

// Execute executes a template with the given data
func (tm *TemplateManager) Execute(templateName string, data interface{}) (string, error) {
	var buf bytes.Buffer
	
	err := tm.templates.ExecuteTemplate(&buf, templateName, data)
	if err != nil {
		return "", fmt.Errorf("failed to execute template %s: %w", templateName, err)
	}
	
	return buf.String(), nil
}

// Template data structures for clean template execution

// ServiceOverviewData contains data for service overview template
type ServiceOverviewData struct {
	Domain             string
	DomainTitle        string
	ServiceName        string
	ServiceDisplayName string
	Version            string
	VersionDisplay     string
	Description        string
}

// ServiceIndexData contains data for service index template
type ServiceIndexData struct {
	Domain             string
	DomainTitle        string
	ServiceName        string
	ServiceDisplayName string
	Version            string
	ProtoPath          string
	Methods            []MethodTemplateData
}

// MethodDocData contains data for method documentation template
type MethodDocData struct {
	Name           string
	Description    string
	RolesStr       string
	ParametersStr  string
	Returns        string
	MethodType     string
	ProtoPath      string
	Domain         string
	DomainTitle    string
	ServiceName    string
	ServiceDisplayName string
	Version        string
	VersionDisplay string
}

// TypeIndexData contains data for type index template
type TypeIndexData struct {
	Package            string
	Domain             string
	DomainTitle        string
	ServiceName        string
	ServiceDisplayName string
	Version            string
	VersionDisplay     string
	Types              []TypeTemplateData
}

// MessageDocData contains data for message documentation template
type MessageDocData struct {
	Name        string
	Description string
	ProtoPath   string
	Fields      []FieldTemplateData
}

// EnumDocData contains data for enum documentation template
type EnumDocData struct {
	Name        string
	Description string
	ProtoPath   string
	EnumValues  []EnumValueTemplateData
}

// ExampleGoData contains data for Go example template
type ExampleGoData struct {
	Domain             string
	ServiceName        string
	ServiceVariable    string
	ServiceConstructor string
	Version            string
	MethodName         string
	RequestType        string
	RequestFields      []ExampleFieldData
	ResponseType       string
	HasRequest         bool
	NeedsContext       bool
	ReturnsEntityType  bool
	ResponseVariable   string
}

// ExamplePyData contains data for Python example template
type ExamplePyData struct {
	Domain            string
	ServiceName       string
	ServiceTitle      string
	Version           string
	MethodName        string
	RequestType       string
	RequestFields     []ExampleFieldData
	ResponseType      string
	HasRequest        bool
	ReturnsEntityType bool
	ResponseVariable  string
}

// ExampleFieldData contains data for generating example field values
type ExampleFieldData struct {
	Name         string
	Type         string
	GoType       string
	PythonType   string
	ExampleValue string
	IsRepeated   bool
	IsNested     bool
	Required     bool
}

// SidebarData contains data for sidebar template
type SidebarData struct {
	Domains []DomainTemplateData
}

// Template data helper structures

type MethodTemplateData struct {
	Name     string
	KebabName string
}

type TypeTemplateData struct {
	Name     string
	KebabName string
}

type FieldTemplateData struct {
	Name        string
	Type        string
	Description string
	Required    bool
	Validation  string
}

type EnumValueTemplateData struct {
	Name        string
	Description string
}

type DomainTemplateData struct {
	Name     string
	Title    string
	Services []ServiceTemplateData
}

type ServiceTemplateData struct {
	Name        string
	DisplayName string
	Versions    []VersionTemplateData
}

type VersionTemplateData struct {
	Name    string
	Display string
	Types   []TypeTemplateData
	Methods []MethodTemplateData
}

// Helper functions for templates

// titleCase converts a string to title case (first letter of each word capitalized)
func titleCase(s string) string {
	return strings.Title(strings.ReplaceAll(s, "_", " "))
}

// sub subtracts one number from another (for template range comparisons)
func sub(a, b int) int {
	return a - b
}

// escapeCurly escapes curly braces to prevent MDX/JSX interpretation
func escapeCurly(s string) string {
	s = strings.ReplaceAll(s, "{", "\\{")
	s = strings.ReplaceAll(s, "}", "\\}")
	return s
}

// normalizeForTable converts multi-line descriptions to single line suitable for markdown tables
func normalizeForTable(s string) string {
	// First escape curly braces
	s = escapeCurly(s)
	
	// Replace newlines and multiple spaces with single spaces
	s = strings.ReplaceAll(s, "\n", " ")
	s = strings.ReplaceAll(s, "\r", " ")
	
	// Clean up multiple spaces
	for strings.Contains(s, "  ") {
		s = strings.ReplaceAll(s, "  ", " ")
	}
	
	// Trim whitespace
	s = strings.TrimSpace(s)
	
	return s
}

// sanitizeForTable sanitizes validation text to prevent Markdown table breaking
func sanitizeForTable(text string) string {
	if text == "" {
		return ""
	}
	
	// First escape curly braces to prevent MDX/JSX interpretation issues
	text = escapeCurly(text)
	
	// Escape square brackets to prevent link interpretation of regex patterns
	text = strings.ReplaceAll(text, "[", "\\[")
	text = strings.ReplaceAll(text, "]", "\\]")
	
	// Replace newlines with separator to maintain readability
	text = strings.ReplaceAll(text, "\n", " | ")
	text = strings.ReplaceAll(text, "\r\n", " | ")
	text = strings.ReplaceAll(text, "\r", " | ")
	
	// Escape pipe characters to prevent table breaking
	text = strings.ReplaceAll(text, "|", "\\|")
	
	// Replace tabs with spaces
	text = strings.ReplaceAll(text, "\t", " ")
	
	// Clean up multiple spaces
	for strings.Contains(text, "  ") {
		text = strings.ReplaceAll(text, "  ", " ")
	}
	
	// Trim whitespace
	text = strings.TrimSpace(text)
	
	// Truncate if too long to prevent excessive table width
	if len(text) > 200 {
		text = text[:197] + "..."
	}
	
	return text
}

// generateExampleValue creates realistic example values based on field name and type
func generateExampleValue(fieldName, fieldType string) string {
	fieldNameLower := strings.ToLower(fieldName)
	
	// Handle common field patterns
	switch {
	case strings.Contains(fieldNameLower, "name") && strings.Contains(fieldType, "api_users"):
		return `"api_users/01ABCDEFG123456789ABCDEFGH"`
	case strings.Contains(fieldNameLower, "name") && strings.Contains(fieldType, "groups"):
		return `"groups/01ABCDEFG123456789ABCDEFGH"`
	case strings.Contains(fieldNameLower, "display_name"):
		return `"My API User"`
	case strings.Contains(fieldNameLower, "key_hash"):
		return `"b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"`
	case strings.Contains(fieldNameLower, "owner"):
		return `"groups/01ABCDEFG123456789ABCDEFGH"`
	case fieldType == "string":
		if strings.Contains(fieldNameLower, "search") {
			return `"user"`
		}
		return `"example-value"`
	case fieldType == "bool":
		return "true"
	case fieldType == "int32" || fieldType == "int64":
		return "1"
	default:
		return `"example-value"`
	}
}

// convertToGoType converts protobuf types to Go types
func convertToGoType(protoType string, packageName string) string {
	switch protoType {
	case "string":
		return "string"
	case "bool":
		return "bool"
	case "int32":
		return "int32"
	case "int64":
		return "int64"
	case "double":
		return "float64"
	case "float":
		return "float32"
	default:
		// Handle message types
		if strings.Contains(protoType, ".") {
			parts := strings.Split(protoType, ".")
			return "*" + strings.Join(parts[len(parts)-1:], "")
		}
		return "*" + protoType
	}
}

// convertToPythonType converts protobuf types to Python types for imports
func convertToPythonType(protoType string) string {
	switch protoType {
	case "string":
		return "str"
	case "bool":
		return "bool"
	case "int32", "int64":
		return "int"
	case "double", "float":
		return "float"
	default:
		// Handle message types - use the type name directly
		if strings.Contains(protoType, ".") {
			parts := strings.Split(protoType, ".")
			return parts[len(parts)-1]
		}
		return protoType
	}
}