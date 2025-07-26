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
	Domain          string
	ServiceName     string
	ServiceVariable string
	Version         string
	MethodName      string
}

// ExamplePyData contains data for Python example template
type ExamplePyData struct {
	Domain       string
	ServiceName  string
	ServiceTitle string
	Version      string
	MethodName   string
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