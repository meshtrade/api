package generate

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"google.golang.org/protobuf/compiler/protogen"
)

// Global template manager
var templateManager *TemplateManager

func init() {
	var err error
	templateManager, err = NewTemplateManager()
	if err != nil {
		panic(fmt.Sprintf("Failed to initialize template manager: %v", err))
	}
}

// convertFieldInfoToTemplateData recursively converts FieldInfo to FieldTemplateData
func convertFieldInfoToTemplateData(field FieldInfo) FieldTemplateData {
	templateData := FieldTemplateData{
		Name:        field.Name,
		Type:        field.Type,
		Description: field.Description,
		Required:    field.Required,
		Validation:  field.Validation,
	}

	// Recursively convert nested fields if present
	if len(field.NestedFields) > 0 {
		templateData.NestedFields = make([]FieldTemplateData, 0, len(field.NestedFields))
		for _, nestedField := range field.NestedFields {
			templateData.NestedFields = append(templateData.NestedFields, convertFieldInfoToTemplateData(nestedField))
		}
	}

	return templateData
}

// GenerateServiceDocs generates all documentation files for a service
func GenerateServiceDocs(plugin *protogen.Plugin, serviceInfo *ServiceInfo) error {
	domain := getServiceDomain(serviceInfo.Package)
	serviceName := getServiceName(serviceInfo.Package)
	version := getServiceVersion(serviceInfo.Package)

	// Generate service overview file (index.mdx)
	if err := generateServiceOverview(plugin, serviceInfo, domain, serviceName, version); err != nil {
		return fmt.Errorf("failed to generate service overview: %w", err)
	}

	// Generate service index file (service/index_meshdoc.mdx)
	if err := generateServiceIndex(plugin, serviceInfo, domain, serviceName, version); err != nil {
		return fmt.Errorf("failed to generate service index: %w", err)
	}

	// Generate method documentation files
	for _, method := range serviceInfo.Methods {
		if err := generateMethodDoc(plugin, serviceInfo, &method, domain, serviceName, version); err != nil {
			return fmt.Errorf("failed to generate method doc for %s: %w", method.Name, err)
		}

		// Generate example files
		if err := generateExampleFiles(plugin, &method, domain, serviceName, version); err != nil {
			return fmt.Errorf("failed to generate example files for %s: %w", method.Name, err)
		}
	}

	return nil
}

// generateServiceOverview creates the service overview index.mdx file
func generateServiceOverview(plugin *protogen.Plugin, serviceInfo *ServiceInfo, domain, serviceName, version string) error {
	filename := filepath.Join(domain, serviceName, version, "index.mdx")
	fullPath := filepath.Join("docs", "docs", "api-reference", filename)

	// Only generate if file doesn't exist (allows manual customization)
	if !fileExists(fullPath) {
		file := plugin.NewGeneratedFile(filename, "")

		// Prepare template data with proper formatting
		data := ServiceOverviewData{
			Domain:             domain,
			DomainTitle:        titleCase(domain),
			ServiceName:        serviceName,
			ServiceDisplayName: titleCase(serviceName),
			Version:            version,
			VersionDisplay:     version, // Keep version as lowercase
			Description:        serviceInfo.Description,
		}

		// Execute template
		content, err := templateManager.Execute("service_overview.mdx.tmpl", data)
		if err != nil {
			return fmt.Errorf("failed to execute service overview template: %w", err)
		}

		file.Write([]byte(content))
	}
	return nil
}

// generateServiceIndex creates the service/index.mdx file
func generateServiceIndex(plugin *protogen.Plugin, serviceInfo *ServiceInfo, domain, serviceName, version string) error {
	filename := filepath.Join(domain, serviceName, version, "service", "index.mdx")
	file := plugin.NewGeneratedFile(filename, "")

	// Prepare method data
	var methods []MethodTemplateData
	for _, method := range serviceInfo.Methods {
		methods = append(methods, MethodTemplateData{
			Name:      method.Name,
			KebabName: kebabCase(method.Name),
		})
	}

	// Prepare template data
	data := ServiceIndexData{
		Domain:             domain,
		DomainTitle:        titleCase(domain),
		ServiceName:        serviceName,
		ServiceDisplayName: titleCase(serviceName),
		Version:            version,
		ProtoPath:          serviceInfo.ProtoPath,
		Methods:            methods,
	}

	// Execute template
	content, err := templateManager.Execute("service_index.mdx.tmpl", data)
	if err != nil {
		return fmt.Errorf("failed to execute service index template: %w", err)
	}

	file.Write([]byte(content))
	return nil
}

// generateMethodDoc creates the service/{method}/index.mdx file
func generateMethodDoc(plugin *protogen.Plugin, serviceInfo *ServiceInfo, method *MethodInfo, domain, serviceName, version string) error {
	methodPath := kebabCase(method.Name)
	filename := filepath.Join(domain, serviceName, version, "service", methodPath, "index.mdx")
	file := plugin.NewGeneratedFile(filename, "")

	// Build fully qualified method name (FQN)
	fqn := fmt.Sprintf("%s.%s.%s", serviceInfo.Package, serviceInfo.Name, method.Name)

	// Build fully qualified request message name
	requestMessage := fmt.Sprintf("%s.%s", serviceInfo.Package, method.RequestType)

	// Build fully qualified response message name
	responseMessage := method.ResponseType

	// Format roles (legacy string format for compatibility)
	rolesStr := strings.Join(method.Roles, ", ")
	if rolesStr == "" {
		rolesStr = "auto-generated from proto file"
	}

	// Format parameters (legacy string format for compatibility)
	var parametersStr string
	if len(method.Parameters) > 0 {
		var paramParts []string
		for _, param := range method.Parameters {
			required := ""
			if param.Required {
				required = " (required)"
			}
			escapedDesc := strings.ReplaceAll(param.Description, "{", "\\{")
			escapedDesc = strings.ReplaceAll(escapedDesc, "}", "\\}")
			paramParts = append(paramParts, fmt.Sprintf("- `%s` (%s)%s: %s", param.Name, param.Type, required, escapedDesc))
		}
		parametersStr = strings.Join(paramParts, "\n")
	} else {
		parametersStr = "No parameters"
	}

	// Convert parameters to template data for structured table generation
	var paramTemplateData []FieldTemplateData
	for _, param := range method.Parameters {
		paramTemplateData = append(paramTemplateData, convertFieldInfoToTemplateData(param))
	}

	// Detect if return type is a resource (domain entity) vs response message
	isResourceReturn := !strings.HasSuffix(method.Returns, "Response")

	// Generate return type URL for resource types
	var returnTypeURL string
	if isResourceReturn {
		// Extract domain/resource/version from response type
		// ResponseType format: meshtrade.domain.resource.version.TypeName
		typeParts := strings.Split(responseMessage, ".")
		if len(typeParts) >= 5 && typeParts[0] == "meshtrade" {
			typeDomain := typeParts[1]
			typeResource := typeParts[2]
			typeVersion := typeParts[3]
			typeName := typeParts[len(typeParts)-1]

			// Generate kebab-case type name
			kebabTypeName := properKebabCase(typeName)

			// Build URL: /docs/api-reference/{domain}/{resource}/{version}/type/{kebab-case-name}
			returnTypeURL = fmt.Sprintf("/docs/api-reference/%s/%s/%s/type/%s",
				typeDomain, typeResource, typeVersion, kebabTypeName)
		}
	}

	// Prepare template data
	data := MethodDocData{
		Name:               method.Name,
		Description:        method.Description,
		FQN:                fqn,
		MethodType:         method.MethodType,
		AccessLevel:        method.AccessLevel,
		Roles:              method.Roles,
		RolesStr:           rolesStr,
		ParametersStr:      parametersStr,
		RequestType:        method.RequestType,
		ResponseType:       method.ResponseType,
		Returns:            method.Returns,
		RequestMessage:     requestMessage,
		ResponseMessage:    responseMessage,
		Parameters:         paramTemplateData,
		IsResourceReturn:   isResourceReturn,
		ReturnTypeURL:      returnTypeURL,
		IsServerStreaming:  method.IsServerStreaming,
		ProtoPath:          serviceInfo.ProtoPath,
		Domain:             domain,
		DomainTitle:        titleCase(domain),
		ServiceName:        serviceName,
		ServiceDisplayName: titleCase(serviceName),
		Version:            version,
		VersionDisplay:     version,
	}

	// Execute template
	content, err := templateManager.Execute("method_doc.mdx.tmpl", data)
	if err != nil {
		return fmt.Errorf("failed to execute method doc template: %w", err)
	}

	file.Write([]byte(content))
	return nil
}

// generateExampleFiles creates the example.go and example.py files
func generateExampleFiles(plugin *protogen.Plugin, method *MethodInfo, domain, serviceName, version string) error {
	methodPath := kebabCase(method.Name)

	// Parse request fields for example generation
	requestFields := parseRequestFields(method.Parameters)
	hasRequest := method.RequestType != "" // All gRPC methods have request types, even if empty
	needsContext := true                   // All gRPC methods need context

	// Detect return type information for semantic variable naming
	returnsEntityType, goResponseVar, pythonResponseVar := detectReturnTypeInfo(method.Returns)

	// Select appropriate template based on streaming nature
	goTemplateName := "example.go.tmpl"
	if method.IsServerStreaming {
		goTemplateName = "example_streaming.go.tmpl"
	}

	// Generate Go example (only if it doesn't exist)
	goFilename := filepath.Join(domain, serviceName, version, "service", methodPath, "example.go")
	goFullPath := filepath.Join("docs", "docs", "api-reference", goFilename)

	if !fileExists(goFullPath) {
		goFile := plugin.NewGeneratedFile(goFilename, "")

		goData := ExampleGoData{
			Domain:             domain,
			ServiceName:        serviceName,
			ServiceVariable:    serviceName,
			ServiceConstructor: "New" + strings.ReplaceAll(titleCase(serviceName), " ", "") + "Service",
			Version:            version,
			MethodName:         method.Name,
			RequestType:        method.RequestType,
			RequestFields:      requestFields,
			ResponseType:       method.Returns,
			HasRequest:         hasRequest,
			NeedsContext:       needsContext,
			ReturnsEntityType:  returnsEntityType,
			ResponseVariable:   goResponseVar,
		}

		goContent, err := templateManager.Execute(goTemplateName, goData)
		if err != nil {
			return fmt.Errorf("failed to execute Go example template: %w", err)
		}
		goFile.Write([]byte(goContent))
	}

	// Select Python template based on streaming nature
	pyTemplateName := "example.py.tmpl"
	if method.IsServerStreaming {
		pyTemplateName = "example_streaming.py.tmpl"
	}

	// Generate Python example (only if it doesn't exist)
	pyFilename := filepath.Join(domain, serviceName, version, "service", methodPath, "example.py")
	pyFullPath := filepath.Join("docs", "docs", "api-reference", pyFilename)

	if !fileExists(pyFullPath) {
		pyFile := plugin.NewGeneratedFile(pyFilename, "")

		pyData := ExamplePyData{
			Domain:            domain,
			ServiceName:       serviceName,
			ServiceTitle:      strings.ReplaceAll(titleCase(serviceName), " ", ""),
			Version:           version,
			MethodName:        method.Name,
			RequestType:       method.RequestType,
			RequestFields:     requestFields,
			ResponseType:      method.Returns,
			HasRequest:        hasRequest,
			ReturnsEntityType: returnsEntityType,
			ResponseVariable:  pythonResponseVar,
		}

		pyContent, err := templateManager.Execute(pyTemplateName, pyData)
		if err != nil {
			return fmt.Errorf("failed to execute Python example template: %w", err)
		}
		pyFile.Write([]byte(pyContent))
	}

	// Select Java template based on streaming nature
	javaTemplateName := "example.java.tmpl"
	if method.IsServerStreaming {
		javaTemplateName = "example_streaming.java.tmpl"
	}

	// Generate Java example (only if it doesn't exist)
	javaFilename := filepath.Join(domain, serviceName, version, "service", methodPath, "example.java")
	javaFullPath := filepath.Join("docs", "docs", "api-reference", javaFilename)

	if !fileExists(javaFullPath) {
		javaFile := plugin.NewGeneratedFile(javaFilename, "")

		// Determine Java-specific return type and response variable
		javaResponseVar := "response"
		responseTypeImport := "Service"

		if returnsEntityType {
			if method.Returns == "APIUser" {
				javaResponseVar = "apiUser"
				responseTypeImport = "ApiUser"
			} else {
				javaResponseVar = camelCase(method.Returns)
				responseTypeImport = method.Returns
			}
		}

		javaData := ExampleJavaData{
			Domain:              domain,
			ServiceName:         serviceName,
			ServiceTitle:        strings.ReplaceAll(titleCase(serviceName), " ", ""),
			Version:             version,
			MethodName:          method.Name,
			MethodNameCamelCase: camelCase(method.Name),
			RequestType:         method.RequestType,
			RequestFields:       requestFields,
			ResponseType:        method.Returns,
			ResponseTypeImport:  responseTypeImport,
			HasRequest:          hasRequest,
			ReturnsEntityType:   returnsEntityType,
			ResponseVariable:    javaResponseVar,
		}

		javaContent, err := templateManager.Execute(javaTemplateName, javaData)
		if err != nil {
			return fmt.Errorf("failed to execute Java example template: %w", err)
		}
		javaFile.Write([]byte(javaContent))
	}

	return nil
}

// parseRequestFields converts MethodInfo parameters to ExampleFieldData
func parseRequestFields(parameters []FieldInfo) []ExampleFieldData {
	var fields []ExampleFieldData

	for _, param := range parameters {
		field := ExampleFieldData{
			Name:         param.Name,
			Type:         param.Type,
			GoType:       convertToGoType(param.Type, ""),
			PythonType:   convertToPythonType(param.Type),
			ExampleValue: generateExampleValue(param.Name, param.Type),
			IsRepeated:   false, // TODO: Extract from protobuf if needed
			IsNested:     strings.Contains(param.Type, "."),
			Required:     param.Required,
		}
		fields = append(fields, field)
	}

	return fields
}

// kebabCase converts CamelCase to kebab-case
func kebabCase(s string) string {
	var result strings.Builder
	for i, r := range s {
		if i > 0 && r >= 'A' && r <= 'Z' {
			result.WriteRune('-')
		}
		if r >= 'A' && r <= 'Z' {
			result.WriteRune(r + ('a' - 'A'))
		} else {
			result.WriteRune(r)
		}
	}
	return result.String()
}

// snakeCase converts CamelCase to snake_case
func snakeCase(s string) string {
	var result strings.Builder
	for i, r := range s {
		if i > 0 && r >= 'A' && r <= 'Z' {
			result.WriteRune('_')
		}
		if r >= 'A' && r <= 'Z' {
			result.WriteRune(r + ('a' - 'A'))
		} else {
			result.WriteRune(r)
		}
	}
	return result.String()
}

// detectReturnTypeInfo analyzes method return type to determine if it's an entity type
// and generates appropriate variable names
func detectReturnTypeInfo(returnType string) (bool, string, string) {
	// If return type ends with "Response", it's not an entity - use generic "response" variable
	if strings.HasSuffix(returnType, "Response") {
		return false, "response", "response"
	}

	// Otherwise, treat as entity and generate semantic variable names from the return type
	// Handle special case for APIUser
	var goVar, pythonVar string
	if returnType == "APIUser" {
		goVar = "apiUser"
		pythonVar = "api_user"
	} else {
		// Generate camelCase for Go and snake_case for Python from the actual return type
		goVar = strings.ToLower(returnType[:1]) + returnType[1:] // standard camelCase
		pythonVar = snakeCase(returnType)                        // snake_case
	}

	return true, goVar, pythonVar
}

// properKebabCase converts type names to kebab-case with special handling for API prefixes
func properKebabCase(typeName string) string {
	// Handle special cases like APICredentials, APIUser, etc.
	if strings.HasPrefix(typeName, "API") && len(typeName) > 3 {
		// Convert APICredentials -> api-credentials, APIUser -> api-user
		rest := typeName[3:] // Remove "API" prefix
		return "api-" + kebabCase(rest)
	}

	// Use standard kebab case for other types
	return kebabCase(typeName)
}

// GenerateTypeDocs generates all type documentation files for a package
func GenerateTypeDocs(plugin *protogen.Plugin, packageInfo *PackageTypeInfo) error {
	if len(packageInfo.Types) == 0 {
		// No types to generate
		return nil
	}

	// Generate type index file
	if err := generateTypeIndex(plugin, packageInfo); err != nil {
		return fmt.Errorf("failed to generate type index: %w", err)
	}

	// Generate individual type documentation files
	for _, typeInfo := range packageInfo.Types {
		if err := generateTypeDoc(plugin, packageInfo, &typeInfo); err != nil {
			return fmt.Errorf("failed to generate type doc for %s: %w", typeInfo.Name, err)
		}
	}

	return nil
}

// generateTypeIndex creates the type/index.mdx file
func generateTypeIndex(plugin *protogen.Plugin, packageInfo *PackageTypeInfo) error {
	filename := filepath.Join(packageInfo.Domain, packageInfo.ServiceName, packageInfo.Version, "type", "index.mdx")
	file := plugin.NewGeneratedFile(filename, "")

	// Prepare type data
	var types []TypeTemplateData
	for _, typeInfo := range packageInfo.Types {
		types = append(types, TypeTemplateData{
			Name:      typeInfo.Name,
			KebabName: properKebabCase(typeInfo.Name),
		})
	}

	// Prepare template data
	data := TypeIndexData{
		Package:            packageInfo.Package,
		Domain:             packageInfo.Domain,
		DomainTitle:        titleCase(packageInfo.Domain),
		ServiceName:        packageInfo.ServiceName,
		ServiceDisplayName: titleCase(packageInfo.ServiceName),
		Version:            packageInfo.Version,
		VersionDisplay:     packageInfo.Version,
		Types:              types,
	}

	// Execute template
	content, err := templateManager.Execute("type_index.mdx.tmpl", data)
	if err != nil {
		return fmt.Errorf("failed to execute type index template: %w", err)
	}

	file.Write([]byte(content))
	return nil
}

// generateTypeDoc creates the type/{type}/index.mdx file
func generateTypeDoc(plugin *protogen.Plugin, packageInfo *PackageTypeInfo, typeInfo *TypeInfo) error {
	typePath := properKebabCase(typeInfo.Name)
	filename := filepath.Join(packageInfo.Domain, packageInfo.ServiceName, packageInfo.Version, "type", typePath, "index.mdx")
	file := plugin.NewGeneratedFile(filename, "")

	var content string
	if typeInfo.IsEnum {
		content = generateEnumDocContent(typeInfo)
	} else {
		content = generateMessageDocContent(typeInfo)
	}

	file.Write([]byte(content))
	return nil
}

// generateMessageDocContent generates content for a message type
func generateMessageDocContent(typeInfo *TypeInfo) string {
	// Prepare field data
	var fields []FieldTemplateData
	for _, field := range typeInfo.Fields {
		fields = append(fields, convertFieldInfoToTemplateData(field))
	}

	// Prepare template data
	data := MessageDocData{
		Name:        typeInfo.Name,
		Description: typeInfo.Description,
		ProtoPath:   typeInfo.ProtoPath,
		Fields:      fields,
	}

	// Execute template
	content, err := templateManager.Execute("message_doc.mdx.tmpl", data)
	if err != nil {
		// Return error string if template fails
		return fmt.Sprintf("Error generating message doc: %v", err)
	}

	return content
}

// generateEnumDocContent generates content for an enum type
func generateEnumDocContent(typeInfo *TypeInfo) string {
	// Prepare enum value data
	var enumValues []EnumValueTemplateData
	for _, value := range typeInfo.EnumValues {
		enumValues = append(enumValues, EnumValueTemplateData{
			Name:        value.Name,
			Description: value.Description,
		})
	}

	// Prepare template data
	data := EnumDocData{
		Name:        typeInfo.Name,
		Description: typeInfo.Description,
		ProtoPath:   typeInfo.ProtoPath,
		EnumValues:  enumValues,
	}

	// Execute template
	content, err := templateManager.Execute("enum_doc.mdx.tmpl", data)
	if err != nil {
		// Return error string if template fails
		return fmt.Sprintf("Error generating enum doc: %v", err)
	}

	return content
}

// GenerateNavigation generates the navigation sidebar_meshdoc.ts file
func GenerateNavigation(plugin *protogen.Plugin, serviceInfos []*ServiceInfo, packageInfos map[string]*PackageTypeInfo) error {
	filename := "sidebar_meshdoc.ts"
	file := plugin.NewGeneratedFile(filename, "")

	// Group services by domain
	domainMap := make(map[string]map[string]map[string]*ServiceInfo) // domain -> service -> version -> ServiceInfo

	for _, serviceInfo := range serviceInfos {
		domain := getServiceDomain(serviceInfo.Package)
		serviceName := getServiceName(serviceInfo.Package)
		version := getServiceVersion(serviceInfo.Package)

		if domainMap[domain] == nil {
			domainMap[domain] = make(map[string]map[string]*ServiceInfo)
		}
		if domainMap[domain][serviceName] == nil {
			domainMap[domain][serviceName] = make(map[string]*ServiceInfo)
		}
		domainMap[domain][serviceName][version] = serviceInfo
	}

	// Build template data structure
	var domains []DomainTemplateData

	// Convert map to sorted slice for consistent ordering
	var domainNames []string
	for domain := range domainMap {
		domainNames = append(domainNames, domain)
	}
	sort.Strings(domainNames)

	for _, domain := range domainNames {
		services := domainMap[domain]
		domainData := DomainTemplateData{
			Name:  domain,
			Title: titleCase(domain), // Use proper title case instead of all caps
		}

		// Convert service map to sorted slice
		var serviceNames []string
		for serviceName := range services {
			serviceNames = append(serviceNames, serviceName)
		}
		sort.Strings(serviceNames)

		for _, serviceName := range serviceNames {
			versions := services[serviceName]
			serviceData := ServiceTemplateData{
				Name:        serviceName,
				DisplayName: titleCase(serviceName),
			}

			// Convert version map to sorted slice
			var versionNames []string
			for version := range versions {
				versionNames = append(versionNames, version)
			}
			sort.Strings(versionNames)

			for _, version := range versionNames {
				serviceInfo := versions[version]

				// Load status configuration from the same source as the table
				tableConfig, _ := LoadServicesTableConfig()
				var statusDetails StatusDetails
				if tableConfig.Services[domain] != nil &&
					tableConfig.Services[domain][serviceName] != nil &&
					tableConfig.Services[domain][serviceName][version] != "" {
					// Use status from table config
					tableStatus := tableConfig.Services[domain][serviceName][version]
					if details, exists := PredefinedStatuses[tableStatus]; exists {
						statusDetails = details
					} else {
						// Fallback to development if invalid status
						statusDetails = PredefinedStatuses["development"]
					}
				} else {
					// Fallback to development status
					statusDetails = PredefinedStatuses["development"]
				}

				versionData := VersionTemplateData{
					Name:       version,
					Display:    version, // Keep version as lowercase
					StatusIcon: statusDetails.Icon,
				}

				// Add types
				packageKey := serviceInfo.Package
				if packageInfo, exists := packageInfos[packageKey]; exists {
					for _, typeInfo := range packageInfo.Types {
						versionData.Types = append(versionData.Types, TypeTemplateData{
							Name:      typeInfo.Name,
							KebabName: properKebabCase(typeInfo.Name),
						})
					}
				}

				// Add methods
				for _, method := range serviceInfo.Methods {
					versionData.Methods = append(versionData.Methods, MethodTemplateData{
						Name:      method.Name,
						KebabName: kebabCase(method.Name),
					})
				}

				serviceData.Versions = append(serviceData.Versions, versionData)
			}

			domainData.Services = append(domainData.Services, serviceData)
		}

		domains = append(domains, domainData)
	}

	// Prepare template data
	sidebarData := SidebarData{
		Domains: domains,
	}

	// Execute template
	content, err := templateManager.Execute("sidebar_meshdoc.ts.tmpl", sidebarData)
	if err != nil {
		return fmt.Errorf("failed to execute sidebar template: %w", err)
	}

	file.Write([]byte(content))
	return nil
}

// fileExists checks if a file exists at the given path
func fileExists(filename string) bool {
	_, err := os.Stat(filename)
	return !os.IsNotExist(err)
}
