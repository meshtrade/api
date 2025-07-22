package api_userv1

import (
	"time"

	trace "go.opentelemetry.io/otel/trace"
)

// EXAMPLEClientOption is a functional option for configuring the API User Service gRPC client.
// This pattern provides a clean, extensible way to configure the client with optional
// parameters while maintaining backward compatibility and readability.
type EXAMPLEClientOption func(*apiUserServiceGRPCClientEXAMPLE)

// WithTLS configures whether to use TLS encryption for the gRPC connection.
// When enabled (true), the client will establish a secure connection using TLS.
// When disabled (false), the client will use an insecure connection.
//
// Default: true (secure connection)
//
// Example:
//
//	client, err := NewAPIUserServiceGRPCClient(
//	    WithTLS(true), // Enable TLS encryption
//	)
func EXAMPLEWithTLS(enabled bool) EXAMPLEClientOption {
	return func(c *apiUserServiceGRPCClientEXAMPLE) {
		c.tls = enabled
	}
}

// WithAddress configures the server address (URL and port) for the gRPC connection.
// This allows you to connect to different environments or custom deployments.
//
// Parameters:
//   - url: The server hostname or IP address (e.g., "api.example.com", "localhost")
//   - port: The server port number (e.g., 443 for HTTPS, 8080 for development)
//
// Default: Uses common.DefaultGRPCURL and common.DefaultGRPCPort
//
// Example:
//
//	client, err := NewAPIUserServiceGRPCClient(
//	    WithAddress("staging-api.example.com", 443), // Connect to staging
//	)
func EXAMPLEWithAddress(url string, port int) EXAMPLEClientOption {
	return func(c *apiUserServiceGRPCClientEXAMPLE) {
		c.url = url
		c.port = port
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
//	client, err := NewAPIUserServiceGRPCClient(
//	    WithURL("production-api.mesh.trade"), // Use production server
//	)
func EXAMPLEWithURL(url string) EXAMPLEClientOption {
	return func(c *apiUserServiceGRPCClientEXAMPLE) {
		c.url = url
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
//	client, err := NewAPIUserServiceGRPCClient(
//	    WithPort(9090), // Connect to port 9090
//	)
func EXAMPLEWithPort(port int) EXAMPLEClientOption {
	return func(c *apiUserServiceGRPCClientEXAMPLE) {
		c.port = port
	}
}

// WithAPIKey configures API key authentication for the gRPC client.
// The API key will be sent as a Bearer token in the Authorization header.
// This is the primary authentication method for service-to-service communication.
//
// The API key takes precedence over access token cookies if both are configured.
//
// Parameter:
//   - apiKey: The API key string (without "Bearer " prefix)
//
// Example:
//
//	client, err := NewAPIUserServiceGRPCClient(
//	    WithAPIKey("your-api-key-here"),
//	)
//
// Note: Alternatively, you can set the MESH_API_KEY environment variable
func EXAMPLEWithAPIKey(apiKey string) EXAMPLEClientOption {
	return func(c *apiUserServiceGRPCClientEXAMPLE) {
		c.apiKey = apiKey
	}
}

// WithAccessTokenCookie configures cookie-based authentication for the gRPC client.
// The access token will be sent as a cookie in the Cookie header as "AccessToken=value".
// This authentication method is typically used for user-facing applications.
//
// If both API key and access token cookie are configured, the API key takes precedence.
//
// Parameter:
//   - accessToken: The access token string (without "AccessToken=" prefix)
//
// Example:
//
//	client, err := NewAPIUserServiceGRPCClient(
//	    WithAccessTokenCookie("your-access-token-here"),
//	)
func EXAMPLEWithAccessTokenCookie(accessToken string) EXAMPLEClientOption {
	return func(c *apiUserServiceGRPCClientEXAMPLE) {
		c.accessTokenCookie = accessToken
	}
}

// WithTracer configures OpenTelemetry distributed tracing for the gRPC client.
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
//	tracer := otel.Tracer("api-user-client")
//	client, err := NewAPIUserServiceGRPCClient(
//	    WithTracer(tracer),
//	)
func EXAMPLEWithTracer(tracer trace.Tracer) EXAMPLEClientOption {
	return func(c *apiUserServiceGRPCClientEXAMPLE) {
		c.tracer = tracer
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
//	client, err := NewAPIUserServiceGRPCClient(
//	    WithTimeout(10 * time.Second), // Set 10 second timeout
//	)
//
// Note: Individual method calls can still override this timeout by providing
// a context with a shorter deadline.
func EXAMPLEWithTimeout(timeout time.Duration) EXAMPLEClientOption {
	return func(c *apiUserServiceGRPCClientEXAMPLE) {
		c.timeout = timeout
	}
}
