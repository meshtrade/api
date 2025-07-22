package common

import (
	"encoding/json"
	"fmt"
	"os"
)

const DefaultGRPCURL = "production-service-mesh-api-gateway-lb-frontend.mesh.trade"
const DefaultGRPCPort = 443
const DefaultTLS = true

const MESH_API_CREDENTIALS_ENV_VAR = "MESH_API_CREDENTIALS"

// gRPC metadata constants
const (
	AuthorizationHeaderKey = "authorization"
	CookieHeaderKey        = "cookie"
	GroupIDHeaderKey       = "x-group-id"
	BearerPrefix           = "Bearer "
	AccessTokenPrefix      = "AccessToken="
)

// APICredentials represents the structure of the credentials file
type APICredentials struct {
	APIKey  string `json:"api_key"`
	GroupID string `json:"group_id"`
}

// LoadCredentialsFromFile loads API credentials from a JSON file
func LoadCredentialsFromFile(path string) (*APICredentials, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("failed to read credentials file: %w", err)
	}

	var creds APICredentials
	if err := json.Unmarshal(data, &creds); err != nil {
		return nil, fmt.Errorf("failed to parse credentials file: %w", err)
	}

	if creds.APIKey == "" {
		return nil, fmt.Errorf("api_key is required in credentials file")
	}

	if creds.GroupID == "" {
		return nil, fmt.Errorf("group_id is required in credentials file")
	}

	return &creds, nil
}

// CredentialsFromEnvironment loads API credentials from the file path specified in MESH_API_CREDENTIALS environment variable
func CredentialsFromEnvironment() (*APICredentials, error) {
	path := os.Getenv(MESH_API_CREDENTIALS_ENV_VAR)
	if path == "" {
		return nil, fmt.Errorf("MESH_API_CREDENTIALS environment variable not set")
	}

	return LoadCredentialsFromFile(path)
}
