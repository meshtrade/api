package auth

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

const MESH_API_CREDENTIALS_ENV_VAR = "MESH_API_CREDENTIALS"

// APICredentials represents the structure of API credentials loaded from configuration files.
// This contains the essential authentication information needed for gRPC service clients.
type APICredentials struct {
	ApiKey string `json:"api_key"`
	Group  string `json:"group"`
}

// LoadAPICredentialsFromFile loads API credentials from a JSON file.
// The file should contain a JSON object with api_key and group fields.
//
// Parameters:
//   - path: The file system path to the credentials JSON file
//
// Returns:
//   - *APICredentials: The loaded credentials if successful
//   - error: Any error that occurred while loading or parsing the file
func LoadAPICredentialsFromFile(path string) (*APICredentials, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("failed to read credentials file: %w", err)
	}

	var creds APICredentials
	if err := json.Unmarshal(data, &creds); err != nil {
		return nil, fmt.Errorf("failed to parse credentials file: %w", err)
	}

	if creds.ApiKey == "" {
		return nil, fmt.Errorf("api_key is required in credentials file")
	}

	if creds.Group == "" {
		return nil, fmt.Errorf("group is required in credentials file")
	}

	if !strings.HasPrefix(creds.Group, "groups/") {
		return nil, fmt.Errorf("group must be in format groups/{group_id}, got: %s", creds.Group)
	}

	return &creds, nil
}

// APICredentialsFromEnvironment loads API credentials from the file path specified
// in the MESH_API_CREDENTIALS environment variable.
//
// Returns:
//   - *APICredentials: The loaded credentials if successful
//   - error: Any error that occurred while loading
func APICredentialsFromEnvironment() (*APICredentials, error) {
	path := os.Getenv(MESH_API_CREDENTIALS_ENV_VAR)
	if path == "" {
		return nil, fmt.Errorf("MESH_API_CREDENTIALS environment variable not set")
	}

	return LoadAPICredentialsFromFile(path)
}

// DefaultCredentialsPath returns the OS-specific default path for Mesh API credentials.
// This follows the standard configuration directory conventions for the operating system.
//
// Returns:
//   - string: The default path where credentials should be stored
func DefaultCredentialsPath() string {
	configDir, err := os.UserConfigDir()
	if err != nil {
		// Fallback to home directory if UserConfigDir fails
		homeDir, err := os.UserHomeDir()
		if err != nil {
			return ""
		}
		configDir = filepath.Join(homeDir, ".config")
	}

	return filepath.Join(configDir, "mesh", "credentials.json")
}

// LoadDefaultCredentials loads API credentials from the default location if the file exists.
//
// Returns:
//   - *APICredentials: The loaded credentials if successful
//   - error: Any error that occurred while loading
func LoadDefaultCredentials() (*APICredentials, error) {
	path := DefaultCredentialsPath()
	if path == "" {
		return nil, fmt.Errorf("unable to determine default credentials path")
	}

	// Check if file exists before attempting to load
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return nil, fmt.Errorf("default credentials file does not exist: %s", path)
	}

	return LoadAPICredentialsFromFile(path)
}

// FindCredentials searches for API credentials using the standard discovery hierarchy:
// 1. MESH_API_CREDENTIALS environment variable (if set)
// 2. Default credential file location
//
// This function implements the standard credential discovery pattern used by all
// gRPC service clients for automatic authentication configuration.
//
// Returns:
//   - *APICredentials: The first successfully loaded credentials
//   - error: If no credentials are found or all attempts fail
func FindCredentials() (*APICredentials, error) {
	// Try environment variable first (existing behavior)
	if creds, err := APICredentialsFromEnvironment(); err == nil {
		return creds, nil
	}

	// Try default file location
	if creds, err := LoadDefaultCredentials(); err == nil {
		return creds, nil
	}

	return nil, fmt.Errorf("no API credentials found: tried environment variable (%s) and default location (%s)",
		MESH_API_CREDENTIALS_ENV_VAR, DefaultCredentialsPath())
}