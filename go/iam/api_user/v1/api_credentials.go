package api_userv1

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

const MESH_API_CREDENTIALS_ENV_VAR = "MESH_API_CREDENTIALS"

// LoadAPICredentialsFromFile loads API APICredentials from a JSON file
func LoadAPICredentialsFromFile(path string) (*APICredentials, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("failed to read APICredentials file: %w", err)
	}

	var creds APICredentials
	if err := json.Unmarshal(data, &creds); err != nil {
		return nil, fmt.Errorf("failed to parse APICredentials file: %w", err)
	}

	if creds.ApiKey == "" {
		return nil, fmt.Errorf("api_key is required in APICredentials file")
	}

	if creds.Group == "" {
		return nil, fmt.Errorf("group is required in APICredentials file")
	}

	if !strings.HasPrefix(creds.Group, "groups/") {
		return nil, fmt.Errorf("group must be in format groups/{group_id}, got: %s", creds.Group)
	}

	return &creds, nil
}

// APICredentialsFromEnvironment loads API APICredentials from the file path specified in MESH_API_CREDENTIALS environment variable
func APICredentialsFromEnvironment() (*APICredentials, error) {
	path := os.Getenv(MESH_API_CREDENTIALS_ENV_VAR)
	if path == "" {
		return nil, fmt.Errorf("MESH_API_CREDENTIALS environment variable not set")
	}

	return LoadAPICredentialsFromFile(path)
}
