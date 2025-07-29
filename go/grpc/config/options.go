package config

import (
	"time"

	"go.opentelemetry.io/otel/trace"
)

// BaseConfig represents the configuration that can be applied to any BaseGRPCClient.
// This internal type is used by ServiceOption functions to modify client settings
// before the client is fully constructed.
type BaseConfig struct {
	URL     string
	Port    int
	TLS     bool
	Tracer  trace.Tracer
	ApiKey  string
	Group   string
	Timeout time.Duration
}

// ServiceOption is a functional option for configuring any gRPC service client.
// This unified pattern provides a clean, extensible way to configure all services with optional
// parameters while maintaining backward compatibility and readability.
//
// All gRPC service clients in the API use this same option system, ensuring consistency
// across the entire codebase.
type ServiceOption func(*BaseConfig)

// WithTLS configures whether to use TLS encryption for the gRPC connection.
// When enabled (true), the service will establish a secure connection using TLS.
// When disabled (false), the service will use an insecure connection.
//
// Default: true (secure connection)
//
// Example:
//
//	service, err := NewApiUserService(
//	    config.WithTLS(true), // Enable TLS encryption
//	)
func WithTLS(enabled bool) ServiceOption {
	return func(config *BaseConfig) {
		config.TLS = enabled
	}
}

// WithAddress configures the server address (URL and port) for the gRPC connection.
// This allows you to connect to different environments or custom deployments.
//
// Parameters:
//   - url: The server hostname or IP address (e.g., "api.example.com", "localhost")
//   - port: The server port number (e.g., 443 for HTTPS, 8080 for development)
//
// Default: Uses config.DefaultGRPCURL and config.DefaultGRPCPort
//
// Example:
//
//	service, err := NewApiUserService(
//	    config.WithAddress("staging-api.example.com", 443), // Connect to staging
//	)
func WithAddress(url string, port int) ServiceOption {
	return func(config *BaseConfig) {
		config.URL = url
		config.Port = port
	}
}

// WithURL configures only the server URL/hostname for the gRPC connection.
// The port will remain unchanged (uses existing port or default).
// Use WithAddress() if you need to set both URL and port together.
//
// Parameter:
//   - url: The server hostname or IP address
//
// Example:
//
//	service, err := NewApiUserService(
//	    config.WithURL("production-api.mesh.trade"), // Use production server
//	)
func WithURL(url string) ServiceOption {
	return func(config *BaseConfig) {
		config.URL = url
	}
}

// WithPort configures only the server port for the gRPC connection.
// The URL will remain unchanged (uses existing URL or default).
// Use WithAddress() if you need to set both URL and port together.
//
// Parameter:
//   - port: The server port number
//
// Example:
//
//	service, err := NewApiUserService(
//	    config.WithPort(9090), // Connect to port 9090
//	)
func WithPort(port int) ServiceOption {
	return func(config *BaseConfig) {
		config.Port = port
	}
}

// WithAPIKey configures API key authentication for the gRPC service.
// The API key will be sent as a Bearer token in the Authorization header.
// This is the primary authentication method for service-to-service communication.
//
// IMPORTANT: When using API key authentication, you must also specify a group
// using WithGroup() or load from credentials file via MESH_API_CREDENTIALS.
//
// Parameter:
//   - apiKey: The API key string (without "Bearer " prefix)
//
// Example:
//
//	service, err := NewApiUserService(
//	    config.WithAPIKey("your-api-key-here"),
//	    config.WithGroup("groups/your-group-id"),
//	)
func WithAPIKey(apiKey string) ServiceOption {
	return func(config *BaseConfig) {
		config.ApiKey = apiKey
	}
}

// WithGroup configures the group resource name for all API requests made by this service.
// The group is required for public API calls and determines the authorization context
// for operations. It will be sent as an "x-group" header with every request.
//
// This option is required when using manual authentication configuration.
// When loading from credentials file via MESH_API_CREDENTIALS, the group
// is automatically loaded and this option is optional (but will override the file value).
//
// Parameter:
//   - group: The group resource name in format groups/{group_id}
//
// Example:
//
//	service, err := NewApiUserService(
//	    config.WithAPIKey("your-api-key"),
//	    config.WithGroup("groups/01ABCDEF123456789"),
//	)
func WithGroup(group string) ServiceOption {
	return func(config *BaseConfig) {
		config.Group = group
	}
}

// WithTracer configures OpenTelemetry distributed tracing for the gRPC service.
// This enables observability and monitoring of API calls across service boundaries.
// Each gRPC method call will create a trace span for tracking request flow.
//
// Parameter:
//   - tracer: An OpenTelemetry tracer instance
//
// Default: Uses a no-op tracer (tracing disabled)
//
// Example:
//
//	tracer := otel.Tracer("apiuser-service")
//	service, err := NewApiUserService(
//	    config.WithTracer(tracer),
//	)
func WithTracer(tracer trace.Tracer) ServiceOption {
	return func(config *BaseConfig) {
		config.Tracer = tracer
	}
}

// WithTimeout configures the default timeout for all gRPC method calls.
// This timeout applies to individual method calls and helps prevent hanging requests.
// If a request takes longer than the specified timeout, it will be cancelled.
//
// The timeout is implemented using context.WithTimeout() for each method call.
//
// Parameter:
//   - timeout: The maximum duration to wait for a method call to complete
//
// Default: 30 seconds
//
// Example:
//
//	service, err := NewApiUserService(
//	    config.WithTimeout(10 * time.Second), // Set 10 second timeout
//	)
//
// Note: Individual method calls can still override this timeout by providing
// a context with a shorter deadline.
func WithTimeout(timeout time.Duration) ServiceOption {
	return func(config *BaseConfig) {
		config.Timeout = timeout
	}
}