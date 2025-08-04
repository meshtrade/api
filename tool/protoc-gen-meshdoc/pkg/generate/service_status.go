package generate

import (
	"encoding/json"
	"os"
	"path/filepath"
)

// Predefined status types with their icons and descriptions
var PredefinedStatuses = map[string]StatusDetails{
	"development": {
		Label:       "In Development",
		Icon:        "🚧",
		Description: "Service is under active development",
	},
	"alpha": {
		Label:       "Alpha",
		Icon:        "🧪",
		Description: "Early testing phase, API may change",
	},
	"beta": {
		Label:       "Beta",
		Icon:        "📦",
		Description: "Feature complete, undergoing testing",
	},
	"released": {
		Label:       "Released",
		Icon:        "✅",
		Description: "Production ready and stable",
	},
	"deprecated": {
		Label:       "Deprecated",
		Icon:        "⚠️",
		Description: "Still functional but being phased out",
	},
}

// ServiceStatusConfig represents the simplified service status configuration
type ServiceStatusConfig struct {
	Description string                   `json:"description,omitempty"`
	Services    map[string]DomainStatus  `json:"services"`
}

// StatusDetails contains information about a status level
type StatusDetails struct {
	Label       string
	Icon        string
	Description string
}

// DomainStatus contains all services for a domain
type DomainStatus map[string]ServiceStatus

// ServiceStatus contains all versions for a service
type ServiceStatus map[string]string

var globalStatusConfig *ServiceStatusConfig

// LoadServiceStatusConfig loads the service status configuration from the JSON file
func LoadServiceStatusConfig() (*ServiceStatusConfig, error) {
	if globalStatusConfig != nil {
		return globalStatusConfig, nil
	}

	// Look for service-status.json in the project root
	configPath := findServiceStatusConfig()
	if configPath == "" {
		// Return default config if file not found
		return getDefaultStatusConfig(), nil
	}

	data, err := os.ReadFile(configPath)
	if err != nil {
		return nil, err
	}

	var config ServiceStatusConfig
	if err := json.Unmarshal(data, &config); err != nil {
		return nil, err
	}

	globalStatusConfig = &config
	return &config, nil
}

// findServiceStatusConfig searches for service-status.json starting from current directory
func findServiceStatusConfig() string {
	// Start from current directory and walk up
	currentDir, _ := os.Getwd()
	
	for {
		configPath := filepath.Join(currentDir, "service-status.json")
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

// getDefaultStatusConfig returns a default configuration
func getDefaultStatusConfig() *ServiceStatusConfig {
	return &ServiceStatusConfig{
		Description: "Default service status configuration",
		Services:    make(map[string]DomainStatus),
	}
}

// GetServiceStatus returns the status for a specific service version
func (sc *ServiceStatusConfig) GetServiceStatus(domain, service, version string) (string, StatusDetails) {
	if domainStatus, exists := sc.Services[domain]; exists {
		if serviceStatus, exists := domainStatus[service]; exists {
			if status, exists := serviceStatus[version]; exists {
				if statusDetails, exists := PredefinedStatuses[status]; exists {
					return status, statusDetails
				}
			}
		}
	}
	
	// Return development as default
	if statusDetails, exists := PredefinedStatuses["development"]; exists {
		return "development", statusDetails
	}
	
	// Fallback if even development doesn't exist
	return "development", StatusDetails{
		Label:       "In Development",
		Icon:        "🚧",
		Description: "Service is under active development",
	}
}