package generate

import (
	"fmt"
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
	return nil
}

// generateServiceIndex creates the service/index_meshdoc.mdx file
func generateServiceIndex(plugin *protogen.Plugin, serviceInfo *ServiceInfo, domain, serviceName, version string) error {
	filename := filepath.Join(domain, serviceName, version, "service", "index_meshdoc.mdx")
	file := plugin.NewGeneratedFile(filename, "")

	// Prepare method data
	var methods []MethodTemplateData
	for _, method := range serviceInfo.Methods {
		methods = append(methods, MethodTemplateData{
			Name:     method.Name,
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

// generateMethodDoc creates the service/{method}/index_meshdoc.mdx file
func generateMethodDoc(plugin *protogen.Plugin, serviceInfo *ServiceInfo, method *MethodInfo, domain, serviceName, version string) error {
	methodPath := kebabCase(method.Name)
	filename := filepath.Join(domain, serviceName, version, "service", methodPath, "index_meshdoc.mdx")
	file := plugin.NewGeneratedFile(filename, "")

	// Format roles
	rolesStr := strings.Join(method.Roles, ", ")
	if rolesStr == "" {
		rolesStr = "auto-generated from proto file"
	}

	// Format parameters
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

	// Prepare template data
	data := MethodDocData{
		Name:               method.Name,
		Description:        method.Description,
		RolesStr:           rolesStr,
		ParametersStr:      parametersStr,
		Returns:            method.Returns,
		MethodType:         method.MethodType,
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

	// Generate Go example
	goFilename := filepath.Join(domain, serviceName, version, "service", methodPath, "example.go")
	goFile := plugin.NewGeneratedFile(goFilename, "")
	
	goData := ExampleGoData{
		Domain:          domain,
		ServiceName:     serviceName,
		ServiceVariable: serviceName,
		Version:         version,
		MethodName:      method.Name,
	}
	
	goContent, err := templateManager.Execute("example.go.tmpl", goData)
	if err != nil {
		return fmt.Errorf("failed to execute Go example template: %w", err)
	}
	goFile.Write([]byte(goContent))

	// Generate Python example
	pyFilename := filepath.Join(domain, serviceName, version, "service", methodPath, "example.py")
	pyFile := plugin.NewGeneratedFile(pyFilename, "")
	
	pyData := ExamplePyData{
		Domain:       domain,
		ServiceName:  serviceName,
		ServiceTitle: titleCase(serviceName),
		Version:      version,
		MethodName:   method.Name,
	}
	
	pyContent, err := templateManager.Execute("example.py.tmpl", pyData)
	if err != nil {
		return fmt.Errorf("failed to execute Python example template: %w", err)
	}
	pyFile.Write([]byte(pyContent))

	return nil
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

// generateTypeIndex creates the type/index_meshdoc.mdx file
func generateTypeIndex(plugin *protogen.Plugin, packageInfo *PackageTypeInfo) error {
	filename := filepath.Join(packageInfo.Domain, packageInfo.ServiceName, packageInfo.Version, "type", "index_meshdoc.mdx")
	file := plugin.NewGeneratedFile(filename, "")

	// Prepare type data
	var types []TypeTemplateData
	for _, typeInfo := range packageInfo.Types {
		types = append(types, TypeTemplateData{
			Name:     typeInfo.Name,
			KebabName: kebabCase(typeInfo.Name),
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

// generateTypeDoc creates the type/{type}_meshdoc.mdx file
func generateTypeDoc(plugin *protogen.Plugin, packageInfo *PackageTypeInfo, typeInfo *TypeInfo) error {
	typePath := fmt.Sprintf("%s_meshdoc", kebabCase(typeInfo.Name))
	filename := filepath.Join(packageInfo.Domain, packageInfo.ServiceName, packageInfo.Version, "type", typePath+".mdx")
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
		fields = append(fields, FieldTemplateData{
			Name:        field.Name,
			Type:        field.Type,
			Description: field.Description,
			Required:    field.Required,
		})
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
				versionData := VersionTemplateData{
					Name:    version,
					Display: version, // Keep version as lowercase
				}

				// Add types
				packageKey := serviceInfo.Package
				if packageInfo, exists := packageInfos[packageKey]; exists {
					for _, typeInfo := range packageInfo.Types {
						versionData.Types = append(versionData.Types, TypeTemplateData{
							Name:     typeInfo.Name,
							KebabName: kebabCase(typeInfo.Name),
						})
					}
				}

				// Add methods
				for _, method := range serviceInfo.Methods {
					versionData.Methods = append(versionData.Methods, MethodTemplateData{
						Name:     method.Name,
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