package generate

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"google.golang.org/protobuf/compiler/protogen"
)

// ServiceTableConfig represents the services.json configuration for the docs table
type ServiceTableConfig struct {
	Description string                        `json:"description,omitempty"`
	Services    map[string]DomainTableStatus  `json:"services"`
}

// DomainTableStatus contains all services for a domain in the table config
type DomainTableStatus map[string]ServiceTableStatus

// ServiceTableStatus contains all versions for a service in the table config
type ServiceTableStatus map[string]string

// ServiceTableEntry represents a row in the services table
type ServiceTableEntry struct {
	Domain      string
	DomainTitle string
	Service     string
	ServiceTitle string
	Version     string
	StatusIcon  string
	StatusLabel string
	IsFirstInDomain bool
}

// LoadServicesTableConfig loads the services.json configuration from docs/api-reference/
func LoadServicesTableConfig() (*ServiceTableConfig, error) {
	// Look for services.json in docs/docs/api-reference/
	configPath := findServicesTableConfig()
	if configPath == "" {
		// Return default config if file not found
		return &ServiceTableConfig{
			Description: "Default services table configuration",
			Services:    make(map[string]DomainTableStatus),
		}, nil
	}

	data, err := os.ReadFile(configPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read services.json: %w", err)
	}

	var config ServiceTableConfig
	if err := json.Unmarshal(data, &config); err != nil {
		return nil, fmt.Errorf("failed to parse services.json: %w", err)
	}

	return &config, nil
}

// findServicesTableConfig searches for docs/docs/api-reference/services.json
func findServicesTableConfig() string {
	// Start from current directory and walk up
	currentDir, _ := os.Getwd()
	
	for {
		configPath := filepath.Join(currentDir, "docs", "docs", "api-reference", "services.json")
		if _, err := os.Stat(configPath); err == nil {
			return configPath
		}
		
		parent := filepath.Dir(currentDir)
		if parent == currentDir {
			break // Reached root
		}
		currentDir = parent
	}
	
	return ""
}

// GenerateServicesTable generates the services table MDX file
func GenerateServicesTable(plugin *protogen.Plugin, serviceInfos []*ServiceInfo) error {
	// Load the services table configuration
	tableConfig, err := LoadServicesTableConfig()
	if err != nil {
		return fmt.Errorf("failed to load services table config: %w", err)
	}

	// Load the main status configuration for status details
	statusConfig, err := LoadServiceStatusConfig()
	if err != nil {
		return fmt.Errorf("failed to load status config: %w", err)
	}

	// Build set of discovered services from protobuf
	discoveredServices := make(map[string]map[string]map[string]bool) // domain -> service -> version -> exists
	for _, serviceInfo := range serviceInfos {
		domain := getServiceDomain(serviceInfo.Package)
		serviceName := getServiceName(serviceInfo.Package)
		version := getServiceVersion(serviceInfo.Package)

		if discoveredServices[domain] == nil {
			discoveredServices[domain] = make(map[string]map[string]bool)
		}
		if discoveredServices[domain][serviceName] == nil {
			discoveredServices[domain][serviceName] = make(map[string]bool)
		}
		discoveredServices[domain][serviceName][version] = true
	}

	// Build table entries
	var entries []ServiceTableEntry

	// Get all domains and sort them
	allDomains := make(map[string]bool)
	for domain := range discoveredServices {
		allDomains[domain] = true
	}
	for domain := range tableConfig.Services {
		allDomains[domain] = true
	}

	var domainNames []string
	for domain := range allDomains {
		domainNames = append(domainNames, domain)
	}
	sort.Strings(domainNames)

	for _, domain := range domainNames {
		// Get all services for this domain
		allServices := make(map[string]bool)
		if discoveredServices[domain] != nil {
			for service := range discoveredServices[domain] {
				allServices[service] = true
			}
		}
		if tableConfig.Services[domain] != nil {
			for service := range tableConfig.Services[domain] {
				allServices[service] = true
			}
		}

		var serviceNames []string
		for service := range allServices {
			serviceNames = append(serviceNames, service)
		}
		sort.Strings(serviceNames)

		isFirstInDomain := true
		for _, service := range serviceNames {
			// Get all versions for this service
			allVersions := make(map[string]bool)
			if discoveredServices[domain] != nil && discoveredServices[domain][service] != nil {
				for version := range discoveredServices[domain][service] {
					allVersions[version] = true
				}
			}
			if tableConfig.Services[domain] != nil && tableConfig.Services[domain][service] != nil {
				for version := range tableConfig.Services[domain][service] {
					allVersions[version] = true
				}
			}

			var versionNames []string
			for version := range allVersions {
				versionNames = append(versionNames, version)
			}
			sort.Strings(versionNames)

			for _, version := range versionNames {
				// Get status from table config first, then fall back to main config
				var statusDetails StatusDetails
				if tableConfig.Services[domain] != nil && 
				   tableConfig.Services[domain][service] != nil && 
				   tableConfig.Services[domain][service][version] != "" {
					// Use status from table config
					tableStatus := tableConfig.Services[domain][service][version]
					if details, exists := PredefinedStatuses[tableStatus]; exists {
						statusDetails = details
					} else {
						// Fallback to development if invalid status
						statusDetails = PredefinedStatuses["development"]
					}
				} else {
					// Fallback to main status config
					_, statusDetails = statusConfig.GetServiceStatus(domain, service, version)
				}

				entry := ServiceTableEntry{
					Domain:          domain,
					DomainTitle:     titleCase(domain),
					Service:         service,
					ServiceTitle:    getServiceDisplayName(service),
					Version:         version,
					StatusIcon:      statusDetails.Icon,
					StatusLabel:     statusDetails.Label,
					IsFirstInDomain: isFirstInDomain,
				}
				entries = append(entries, entry)
				isFirstInDomain = false
			}
		}
	}

	// Generate the table MDX content
	content := generateTableMDX(entries)

	// Write the file
	filename := "services-table_meshdoc.mdx"
	file := plugin.NewGeneratedFile(filename, "")
	file.P(content)

	return nil
}

// getServiceDisplayName converts service name to display name
func getServiceDisplayName(serviceName string) string {
	// Handle special cases
	switch serviceName {
	case "api_user":
		return "API User"
	default:
		// Convert snake_case to Title Case
		parts := strings.Split(serviceName, "_")
		var titleParts []string
		for _, part := range parts {
			titleParts = append(titleParts, titleCase(part))
		}
		return strings.Join(titleParts, " ")
	}
}

// generateTableMDX generates the MDX content for the services table
func generateTableMDX(entries []ServiceTableEntry) string {
	var content strings.Builder
	
	content.WriteString(`{/*
Generated by protoc-gen-meshdoc. DO NOT EDIT.
This file is auto-generated from docs/docs/api-reference/services.json
*/}

| Domain | Service | Version | Go SDK | Python SDK | Java SDK | Typescript SDK (Web) |
|--------|---------|---------|--------|------------|---------|----------|
`)

	for _, entry := range entries {
		domain := ""
		if entry.IsFirstInDomain {
			domain = fmt.Sprintf("**%s**", entry.DomainTitle)
		}

		// Show the status icon for all services in SDK columns
		sdkStatus := entry.StatusIcon

		content.WriteString(fmt.Sprintf("| %s | %s | %s | %s | %s | %s | %s |\n",
			domain,
			entry.ServiceTitle,
			entry.Version,
			sdkStatus,
			sdkStatus,
			sdkStatus,
			sdkStatus,
		))
	}

	content.WriteString(`
**Legend:**
- ✅ Released - Production ready and stable
- 📦 Beta - Feature complete, undergoing testing  
- 🧪 Alpha - Early testing phase, API may change
- 🚧 In Development - Under active development
- ⚠️ Deprecated - Still functional but being phased out
`)

	return content.String()
}