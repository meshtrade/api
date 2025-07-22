package common

import "os"

const DefaultGRPCURL = "production-service-mesh-api-gateway-lb-frontend.mesh.trade"
const DefaultGRPCPort = 443
const DefaultTLS = true

const MESH_API_KEY_ENV_VAR = "MESH_API_KEY"

// gRPC metadata constants
const (
	AuthorizationHeaderKey = "authorization"
	CookieHeaderKey        = "cookie"
	BearerPrefix           = "Bearer "
	AccessTokenPrefix      = "AccessToken="
)

func APIKEYFromEnvironment() string {
	return os.Getenv(MESH_API_KEY_ENV_VAR)
}
