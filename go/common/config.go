package common

const DefaultGRPCURL = "production-service-mesh-api-gateway-lb-frontend.mesh.trade"
const DefaultGRPCPort = 443
const DefaultTLS = true

// gRPC metadata constants
const (
	AuthorizationHeaderKey = "authorization"
	GroupHeaderKey         = "x-group"
	BearerPrefix           = "Bearer "
)
