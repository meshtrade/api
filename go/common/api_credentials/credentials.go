package api_credentials

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

const MESH_API_CREDENTIALS_ENV_VAR = "MESH_API_CREDENTIALS"

// Credentials represents API credentials loaded from file
type Credentials struct {
	APIKey string `json:"api_key"`
	Group  string `json:"group"`
}

// LoadCredentialsFromFile loads API credentials from a JSON file
func LoadCredentialsFromFile(path string) (*Credentials, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("failed to read credentials file: %w", err)
	}

	var creds Credentials
	if err := json.Unmarshal(data, &creds); err != nil {
		return nil, fmt.Errorf("failed to parse credentials file: %w", err)
	}

	if creds.APIKey == "" {
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

// CredentialsFromEnvironment loads API credentials from the file path specified in MESH_API_CREDENTIALS environment variable
func CredentialsFromEnvironment() (*Credentials, error) {
	path := os.Getenv(MESH_API_CREDENTIALS_ENV_VAR)
	if path == "" {
		return nil, fmt.Errorf("MESH_API_CREDENTIALS environment variable not set")
	}

	return LoadCredentialsFromFile(path)
}
