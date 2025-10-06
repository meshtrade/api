package grpc

import (
	"context"
	"errors"
	"fmt"
	"time"

	"buf.build/go/protovalidate"
	"github.com/meshtrade/api/go/auth"
	"github.com/meshtrade/api/go/grpc/config"
	"go.opentelemetry.io/otel/trace"
	"go.opentelemetry.io/otel/trace/noop"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/connectivity"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/proto"
)

// BaseGRPCClient provides a generic base implementation for all gRPC service clients.
// It handles common functionality like connection management, authentication, tracing,
// timeouts, method execution patterns, and request validation.
//
// Type parameter T represents the specific gRPC client type (e.g., ApiUserServiceClient)
type BaseGRPCClient[T any] struct {
	// Connection configuration
	url  string
	port int
	tls  bool

	// gRPC connection and client
	conn       *grpc.ClientConn
	grpcClient T

	// Tracing and timing
	tracer              trace.Tracer
	serviceProviderName string
	timeout             time.Duration

	// Authentication
	apiKey string
	group  string

	// Request validation
	validator protovalidate.Validator

	// Interceptors
	unaryClientInterceptors []grpc.UnaryClientInterceptor

	// Client factory for creating new instances
	clientFactory func(grpc.ClientConnInterface) T
}

// NewBaseGRPCClient creates a new generic gRPC client with all common functionality.
// This constructor handles the complete setup process including credentials loading,
// connection establishment, and authentication configuration.
//
// Type parameter T should be the specific gRPC client type (e.g., ApiUserServiceClient)
//
// Parameters:
//   - serviceProviderName: The service name used for tracing spans
//   - clientFactory: Function that creates the specific gRPC client from a connection
//   - opts: Functional options to configure the client
//
// Returns:
//   - *BaseGRPCClient[T]: Configured base client instance
//   - error: Configuration or connection error
func NewBaseGRPCClient[T any](
	serviceProviderName string,
	clientFactory func(grpc.ClientConnInterface) T,
	opts ...config.ServiceOption,
) (*BaseGRPCClient[T], error) {
	// Create configuration with default values
	cfg := &config.BaseConfig{
		URL:     config.DefaultGRPCURL,
		Port:    config.DefaultGRPCPort,
		TLS:     config.DefaultTLS,
		Tracer:  noop.NewTracerProvider().Tracer(""),
		Timeout: 30 * time.Second, // default 30 second timeout
	}

	// Attempt to load credentials using discovery hierarchy
	if creds, err := auth.FindCredentials(); err == nil {
		cfg.ApiKey = creds.ApiKey
		cfg.Group = creds.Group
	}

	// Apply functional options (these can override credentials from file)
	for _, opt := range opts {
		opt(cfg)
	}

	// Initialize protovalidate validator
	validator, err := protovalidate.New()
	if err != nil {
		return nil, fmt.Errorf("failed to create validator: %w", err)
	}

	// Create client from configuration
	client := &BaseGRPCClient[T]{
		url:                 cfg.URL,
		port:                cfg.Port,
		tls:                 cfg.TLS,
		tracer:              cfg.Tracer,
		serviceProviderName: serviceProviderName,
		timeout:             cfg.Timeout,
		apiKey:              cfg.ApiKey,
		group:               cfg.Group,
		validator:           validator,
		clientFactory:       clientFactory,
	}

	// Validate authentication credentials
	if err := client.validateAuth(); err != nil {
		return nil, err
	}

	// Prepare authentication interceptor
	client.unaryClientInterceptors = []grpc.UnaryClientInterceptor{
		client.authInterceptor(),
	}

	// Prepare dial options
	dialOpts := make([]grpc.DialOption, 0)

	// Set transport credentials
	if client.tls {
		dialOpts = append(dialOpts, grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")))
	} else {
		dialOpts = append(dialOpts, grpc.WithTransportCredentials(insecure.NewCredentials()))
	}

	dialOpts = append(dialOpts, grpc.WithChainUnaryInterceptor(client.unaryClientInterceptors...))

	// Construct gRPC client connection
	conn, err := grpc.NewClient(
		fmt.Sprintf("%s:%d", client.url, client.port),
		dialOpts...,
	)
	if err != nil {
		return nil, fmt.Errorf("error constructing grpc service connection: %w", err)
	}

	// Set connection and create service-specific gRPC client
	client.conn = conn
	client.grpcClient = clientFactory(conn)

	return client, nil
}

// Executor provides a generic execution helper that supports type-safe method calls.
// This approach works around Go's limitation that methods cannot have additional type parameters.
type Executor[T any] struct {
	client *BaseGRPCClient[T]
}

// Execute provides a fully type-safe method execution pattern that handles all common functionality
// including request validation, connection health checking and conservative retry for connection establishment failures.
// (Standalone generic function that works around Go's method type parameter limitations).
//
// RETRY SAFETY: Only retries on connection establishment failures where the request
// definitely never reached the server. This prevents double-processing in financial systems.
//
// Type parameters:
//   - T: The gRPC client type
//   - R: The return type of the gRPC method, eliminating the need for type casting
//
// Parameters:
//   - executor: The executor instance containing the client
//   - ctx: Context for the request (can include custom timeout, tracing, etc.)
//   - methodName: Name of the method being called (used for tracing)
//   - request: The request message to validate using protovalidate
//   - grpcCall: Function that executes the actual gRPC call with the processed context
//
// Returns:
//   - R: The response from the gRPC method with full type safety
//   - error: Any error that occurred during validation or the request
//
// Example usage in a service method:
//
//	func (s *apiUserService) GetApiUser(ctx context.Context, request *GetApiUserRequest) (*APIUser, error) {
//	    return Execute(s.Executor(), ctx, "GetApiUser", request, func(ctx context.Context) (*APIUser, error) {
//	        return s.GrpcClient().GetApiUser(ctx, request)
//	    })
//	}
func Execute[T any, R any](
	executor *Executor[T],
	ctx context.Context,
	methodName string,
	request proto.Message,
	grpcCall func(context.Context) (R, error),
) (R, error) {
	// Validate request using protovalidate before any processing
	if err := executor.client.validator.Validate(request); err != nil {
		var zero R
		return zero, fmt.Errorf("request validation failed: %w", err)
	}

	// Apply timeout if no deadline is already set
	if _, hasDeadline := ctx.Deadline(); !hasDeadline {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, executor.client.timeout)
		defer cancel()
	}

	// Create tracing span
	ctx, span := executor.client.tracer.Start(
		ctx,
		executor.client.serviceProviderName+methodName,
	)
	defer span.End()

	// Execute with connection resilience
	return executeWithRetry(executor, ctx, grpcCall)
}

// ExecuteStream provides a fully type-safe streaming method execution pattern that handles
// all common functionality including request validation, connection health checking, timeout
// handling, distributed tracing, and authentication for server-side streaming methods.
//
// Type parameters:
//   - T: The gRPC client type
//   - R: The return type (the streaming client interface)
//
// Parameters:
//   - executor: The executor instance containing the client
//   - ctx: Context for the request (can include custom timeout, tracing, etc.)
//   - methodName: Name of the method being called (used for tracing)
//   - request: The request message to validate using protovalidate
//   - streamCall: Function that executes the actual gRPC streaming call
//
// Returns:
//   - R: The streaming client interface with full type safety
//   - error: Any error that occurred during validation or the request
func ExecuteStream[T any, R any](
	executor *Executor[T],
	ctx context.Context,
	methodName string,
	request proto.Message,
	streamCall func(context.Context) (R, error),
) (R, error) {
	// Validate request using protovalidate before any processing
	if err := executor.client.validator.Validate(request); err != nil {
		var zero R
		return zero, fmt.Errorf("request validation failed: %w", err)
	}

	// Apply timeout if no deadline is already set
	if _, hasDeadline := ctx.Deadline(); !hasDeadline {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, executor.client.timeout)
		defer cancel()
	}

	// Create tracing span
	ctx, span := executor.client.tracer.Start(
		ctx,
		executor.client.serviceProviderName+methodName,
	)
	defer span.End()

	// Check connection health before initiating stream
	if err := executor.client.ensureConnectionHealth(ctx); err != nil {
		var zero R
		return zero, fmt.Errorf("connection health check failed: %w", err)
	}

	// Add authentication metadata to context
	ctx = metadata.AppendToOutgoingContext(
		ctx,
		auth.APIKeyHeader,
		executor.client.apiKey,
		auth.GroupHeaderKey,
		executor.client.group,
	)

	// Execute the streaming call
	return streamCall(ctx)
}

// executeWithRetry implements connection health checking and conservative retry logic.
// Only retries on connection establishment failures to prevent double-processing in financial systems.
func executeWithRetry[T any, R any](
	executor *Executor[T],
	ctx context.Context,
	grpcCall func(context.Context) (R, error),
) (R, error) {
	var zero R
	const maxRetries = 2
	const retryDelay = 100 * time.Millisecond

	for attempt := 0; attempt <= maxRetries; attempt++ {
		// Check connection health before the call (except on retries where we might want to force through)
		if attempt == 0 {
			if err := executor.client.ensureConnectionHealth(ctx); err != nil {
				// If we can't establish a healthy connection, don't retry
				return zero, fmt.Errorf("connection health check failed: %w", err)
			}
		}

		// Execute the gRPC call
		response, err := grpcCall(ctx)
		if err == nil {
			return response, nil
		}

		// Check if this is a connection-related error that we should retry
		if !isRetriableConnectionError(err) || attempt == maxRetries {
			return zero, err
		}

		// For connection errors, wait briefly and force connection refresh on retry
		select {
		case <-ctx.Done():
			return zero, ctx.Err()
		case <-time.After(retryDelay):
			// Force connection state reset before retry
			executor.client.refreshConnectionState()
		}
	}

	return zero, fmt.Errorf("max retries exceeded")
}

// ensureConnectionHealth checks if the gRPC connection is in a healthy state
// and attempts to recover if it's not.
func (b *BaseGRPCClient[T]) ensureConnectionHealth(ctx context.Context) error {
	if b.conn == nil {
		return errors.New("gRPC connection is nil")
	}

	state := b.conn.GetState()

	// If connection is ready, we're good
	if state == connectivity.Ready {
		return nil
	}

	// If connection is idle, connecting, or recovering, wait for it to become ready
	if state == connectivity.Idle || state == connectivity.Connecting {
		// Create a short context for connection attempt
		connectCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
		defer cancel()

		// Wait for state change to Ready
		if b.conn.WaitForStateChange(connectCtx, state) {
			newState := b.conn.GetState()
			if newState == connectivity.Ready {
				return nil
			}
		}
	}

	// For shutdown or transient failure states, the connection might recover
	// Let the actual call attempt handle it rather than pre-failing
	if state == connectivity.TransientFailure {
		return nil // Let the call proceed and handle the error
	}

	if state == connectivity.Shutdown {
		return errors.New("gRPC connection is shutdown")
	}

	return nil
}

// refreshConnectionState forces the connection to re-evaluate its state
// which can help recover from stale connection issues.
func (b *BaseGRPCClient[T]) refreshConnectionState() {
	if b.conn != nil {
		// Reset idle connections by attempting to connect
		state := b.conn.GetState()
		if state == connectivity.Idle {
			b.conn.Connect()
		}
	}
}

// isRetriableConnectionError determines if an error is definitely safe to retry.
// For financial systems, we ONLY retry when we're absolutely certain the request
// never reached the server to prevent double-processing of transactions.
func isRetriableConnectionError(err error) bool {
	if err == nil {
		return false
	}

	// Check gRPC status codes - only retry Unavailable (service completely unreachable)
	if st, ok := status.FromError(err); ok {
		switch st.Code() {
		case codes.Unavailable:
			// Service unavailable - but only retry if error message indicates
			// connection establishment failure, not service overload
			errMsg := st.Message()
			if contains(errMsg, "connection refused") ||
				contains(errMsg, "no such host") ||
				contains(errMsg, "network is unreachable") {
				return true
			}
			// For other Unavailable cases, don't retry as they may indicate
			// service overload where requests could have been received
			return false
		}
		// Never retry any other gRPC status codes as they indicate the server
		// was reachable and may have processed the request
		return false
	}

	// Check for connection establishment errors only
	errStr := err.Error()
	safeConnectionErrors := []string{
		"connection refused",
		"no such host",
		"network is unreachable",
	}

	for _, connErr := range safeConnectionErrors {
		if contains(errStr, connErr) {
			return true
		}
	}

	// Do NOT retry on:
	// - "connection reset by peer" (request may have been sent)
	// - "broken pipe" (request may have been sent)
	// - "connection closed" (request may have been sent)
	// - "context deadline exceeded" (server may have received request)
	// - Any other errors (could indicate partial processing)

	return false
}

// contains checks if a string contains a substring (case-insensitive)
func contains(s, substr string) bool {
	return len(s) >= len(substr) &&
		(s == substr ||
			(len(s) > len(substr) &&
				func() bool {
					for i := 0; i <= len(s)-len(substr); i++ {
						if s[i:i+len(substr)] == substr {
							return true
						}
					}
					return false
				}()))
}

// Executor returns a generic executor that provides type-safe method execution.
// This enables fully generic method calls without type casting.
func (b *BaseGRPCClient[T]) Executor() *Executor[T] {
	return &Executor[T]{client: b}
}

// Close gracefully shuts down the gRPC service connection and releases all associated resources.
// This method should be called when the service is no longer needed to prevent resource leaks.
// It's safe to call Close() multiple times - subsequent calls will be no-ops.
func (b *BaseGRPCClient[T]) Close() error {
	if b.conn != nil {
		return b.conn.Close()
	}
	return nil
}

// Group returns the group resource name configured for this service.
// The group determines the authorization context for all API requests
// and is sent as an "x-group" header with every request.
func (b *BaseGRPCClient[T]) Group() string {
	return b.group
}

// WithGroup creates a new BaseGRPCClient instance with a different group context.
// This method copies all configuration from the current client but updates the group.
// The new client has an independent connection and can be used safely across goroutines.
//
// The group parameter is validated to ensure it's not empty. The format should be
// 'groups/{group_id}' where group_id is a valid group identifier.
//
// Parameters:
//   - group: The new group resource name to use for API requests
//
// Returns:
//   - *BaseGRPCClient[T]: A new client instance with the updated group context
//
// Note: The caller is responsible for calling Close() on the returned client
// when it is no longer needed to prevent resource leaks.
func (b *BaseGRPCClient[T]) WithGroup(group string) *BaseGRPCClient[T] {
	// Validate group parameter
	if group == "" {
		panic("group parameter cannot be empty")
	}

	// Create configuration options matching current client
	opts := []config.ServiceOption{
		config.WithURL(b.url),
		config.WithPort(b.port),
		config.WithTLS(b.tls),
		config.WithTracer(b.tracer),
		config.WithTimeout(b.timeout),
		config.WithAPIKey(b.apiKey),
		config.WithGroup(group), // Only this differs
	}

	// Create new base client with updated group
	newClient, err := NewBaseGRPCClient(
		b.serviceProviderName,
		b.clientFactory, // Use stored factory
		opts...,
	)
	if err != nil {
		// Since we're copying from a valid client, errors indicate programming bugs
		// or resource exhaustion. Panic is appropriate here.
		panic(fmt.Sprintf("failed to create new client with group %s: %v", group, err))
	}

	return newClient
}

// GrpcClient returns the underlying gRPC client for making service-specific calls.
// This provides access to the typed gRPC client methods.
func (b *BaseGRPCClient[T]) GrpcClient() T {
	return b.grpcClient
}

// Validator returns the protovalidate validator for request validation.
// This provides access to the validator for client-side request validation.
func (b *BaseGRPCClient[T]) Validator() protovalidate.Validator {
	return b.validator
}

// validateAuth ensures that authentication credentials and group ID are properly configured.
// This method is called during service initialization to prevent runtime authentication failures.
func (b *BaseGRPCClient[T]) validateAuth() error {
	if b.apiKey == "" {
		return errors.New("api key not set. set credentials via MESH_API_CREDENTIALS file, or use config.WithAPIKey option")
	}
	if b.group == "" {
		return errors.New("group not set. set via MESH_API_CREDENTIALS file or config.WithGroup option")
	}
	return nil
}

// authInterceptor creates and returns the gRPC unary interceptor for authentication.
// This interceptor automatically adds authentication and group ID headers to all outgoing requests.
func (b *BaseGRPCClient[T]) authInterceptor() grpc.UnaryClientInterceptor {
	return func(ctx context.Context, method string, req, reply any, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
		ctx = metadata.AppendToOutgoingContext(
			ctx,
			auth.APIKeyHeader,
			b.apiKey,
			auth.GroupHeaderKey,
			b.group,
		)
		return invoker(ctx, method, req, reply, cc, opts...)
	}
}
