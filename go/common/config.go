package common

import "os"

const DefaultGRPCURL = "production-service-mesh-api-gateway-lb-frontend.mesh.trade"
const DefaultGRPCPort = 443
const DefaultTLS = true

const MESH_API_KEY_ENV_VAR = "MESH_API_KEY"

func APIKEYFromEnvironment() string {
	return os.Getenv(MESH_API_KEY_ENV_VAR)
}
