package api_userv1

import (
	"context"
	"errors"
	fmt "fmt"
	"time"

	"github.com/meshtrade/api/go/common"
	trace "go.opentelemetry.io/otel/trace"
	"go.opentelemetry.io/otel/trace/noop"
	grpc "google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/metadata"
)

// APIUserServiceGRPCClientEXAMPLE combines the service interface with the base gRPC client interface
// for proper resource management
type APIUserServiceGRPCClientEXAMPLE interface {
	ApiUserService
	common.GRPCClient
}

// ensure apiUserServiceGRPCClient implements the APIUserServiceGRPCClient interface
var _ APIUserServiceGRPCClientEXAMPLE = &apiUserServiceGRPCClientEXAMPLE{}

type apiUserServiceGRPCClientEXAMPLE struct {
	url                     string
	port                    int
	tls                     bool
	conn                    *grpc.ClientConn
	grpcClient              ApiUserServiceClient
	tracer                  trace.Tracer
	apiKey                  string
	accessTokenCookie       string
	timeout                 time.Duration
	unaryClientInterceptors []grpc.UnaryClientInterceptor
}

func NewAPIUserServiceGRPCClientEXAMPLE(opts ...EXAMPLEClientOption) (APIUserServiceGRPCClientEXAMPLE, error) {
	// prepare client with default configuration
	client := &apiUserServiceGRPCClientEXAMPLE{
		url:     common.DefaultGRPCURL,
		port:    common.DefaultGRPCPort,
		tls:     common.DefaultTLS,
		tracer:  noop.NewTracerProvider().Tracer(""),
		apiKey:  common.APIKEYFromEnvironment(),
		timeout: 30 * time.Second, // default 30 second timeout

		// set once options are applied and connection opened
		grpcClient:              nil,
		unaryClientInterceptors: nil,
	}

	// apply options to the client
	for _, opt := range opts {
		opt(client)
	}

	// validate authentication credentials
	if err := client.validateAuth(); err != nil {
		return nil, err
	}

	// prepare authentication interceptor
	client.unaryClientInterceptors = []grpc.UnaryClientInterceptor{
		client.authInterceptor(),
	}

	// prepare dial options
	dialOpts := make([]grpc.DialOption, 0)

	// set transport credentials
	if client.tls {
		dialOpts = append(dialOpts, grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")))
	} else {
		dialOpts = append(dialOpts, grpc.WithTransportCredentials(insecure.NewCredentials()))
	}

	dialOpts = append(dialOpts, grpc.WithChainUnaryInterceptor(client.unaryClientInterceptors...))

	// construct gRPC client connection
	conn, err := grpc.NewClient(
		fmt.Sprintf("%s:%d", client.url, client.port),
		dialOpts...,
	)
	if err != nil {
		return nil, fmt.Errorf("error constructing grpc client connection: %w", err)
	}

	// set client connection and gRPC client
	client.conn = conn
	client.grpcClient = NewApiUserServiceClient(conn)

	// return constructed client
	return client, nil
}

// ActivateApiUser implements ApiUserService.
func (s *apiUserServiceGRPCClientEXAMPLE) ActivateApiUser(ctx context.Context, request *ActivateApiUserRequest) (*APIUser, error) {
	// apply timeout if no deadline is already set
	if _, hasDeadline := ctx.Deadline(); !hasDeadline {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, s.timeout)
		defer cancel()
	}

	ctx, span := s.tracer.Start(
		ctx,
		ApiUserServiceServiceProviderName+"ActivateApiUser",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	activateApiUserResponse, err := s.grpcClient.ActivateApiUser(ctx, request)
	if err != nil {
		return nil, err
	}

	return activateApiUserResponse, nil
}

// CreateApiUser implements ApiUserService.
func (s *apiUserServiceGRPCClientEXAMPLE) CreateApiUser(ctx context.Context, request *CreateApiUserRequest) (*APIUser, error) {
	// apply timeout if no deadline is already set
	if _, hasDeadline := ctx.Deadline(); !hasDeadline {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, s.timeout)
		defer cancel()
	}

	ctx, span := s.tracer.Start(
		ctx,
		ApiUserServiceServiceProviderName+"CreateApiUser",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	createApiUserResponse, err := s.grpcClient.CreateApiUser(ctx, request)
	if err != nil {
		return nil, err
	}

	return createApiUserResponse, nil
}

// DeactivateApiUser implements ApiUserService.
func (s *apiUserServiceGRPCClientEXAMPLE) DeactivateApiUser(ctx context.Context, request *DeactivateApiUserRequest) (*APIUser, error) {
	// apply timeout if no deadline is already set
	if _, hasDeadline := ctx.Deadline(); !hasDeadline {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, s.timeout)
		defer cancel()
	}

	ctx, span := s.tracer.Start(
		ctx,
		ApiUserServiceServiceProviderName+"DeactivateApiUser",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	deactivateApiUserResponse, err := s.grpcClient.DeactivateApiUser(ctx, request)
	if err != nil {
		return nil, err
	}

	return deactivateApiUserResponse, nil
}

// GetApiUser implements ApiUserService.
func (s *apiUserServiceGRPCClientEXAMPLE) GetApiUser(ctx context.Context, request *GetApiUserRequest) (*APIUser, error) {
	// apply timeout if no deadline is already set
	if _, hasDeadline := ctx.Deadline(); !hasDeadline {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, s.timeout)
		defer cancel()
	}

	ctx, span := s.tracer.Start(
		ctx,
		ApiUserServiceServiceProviderName+"GetApiUser",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	getApiUserResponse, err := s.grpcClient.GetApiUser(ctx, request)
	if err != nil {
		return nil, err
	}

	return getApiUserResponse, nil
}

// GetApiUserByKeyHash implements ApiUserService.
func (s *apiUserServiceGRPCClientEXAMPLE) GetApiUserByKeyHash(ctx context.Context, request *GetApiUserByKeyHashRequest) (*APIUser, error) {
	// apply timeout if no deadline is already set
	if _, hasDeadline := ctx.Deadline(); !hasDeadline {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, s.timeout)
		defer cancel()
	}

	ctx, span := s.tracer.Start(
		ctx,
		ApiUserServiceServiceProviderName+"GetApiUserByKeyHash",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	getApiUserByKeyHashResponse, err := s.grpcClient.GetApiUserByKeyHash(ctx, request)
	if err != nil {
		return nil, err
	}

	return getApiUserByKeyHashResponse, nil
}

// ListApiUsers implements ApiUserService.
func (s *apiUserServiceGRPCClientEXAMPLE) ListApiUsers(ctx context.Context, request *ListApiUsersRequest) (*ListApiUsersResponse, error) {
	// apply timeout if no deadline is already set
	if _, hasDeadline := ctx.Deadline(); !hasDeadline {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, s.timeout)
		defer cancel()
	}

	ctx, span := s.tracer.Start(
		ctx,
		ApiUserServiceServiceProviderName+"ListApiUsers",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	listApiUsersResponse, err := s.grpcClient.ListApiUsers(ctx, request)
	if err != nil {
		return nil, err
	}

	return listApiUsersResponse, nil
}

// SearchApiUsers implements ApiUserService.
func (s *apiUserServiceGRPCClientEXAMPLE) SearchApiUsers(ctx context.Context, request *SearchApiUsersRequest) (*SearchApiUsersResponse, error) {
	// apply timeout if no deadline is already set
	if _, hasDeadline := ctx.Deadline(); !hasDeadline {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, s.timeout)
		defer cancel()
	}

	ctx, span := s.tracer.Start(
		ctx,
		ApiUserServiceServiceProviderName+"SearchApiUsers",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	searchApiUsersResponse, err := s.grpcClient.SearchApiUsers(ctx, request)
	if err != nil {
		return nil, err
	}

	return searchApiUsersResponse, nil
}

// Close implements common.GRPCClient
func (s *apiUserServiceGRPCClientEXAMPLE) Close() error {
	if s.conn != nil {
		return s.conn.Close()
	}
	return nil
}

// validateAuth validates that at least one authentication method is configured
func (c *apiUserServiceGRPCClientEXAMPLE) validateAuth() error {
	if c.apiKey == "" && c.accessTokenCookie == "" {
		return errors.New("neither api key nor access token cookie set. set api key via WithAPIKey option or as MESH_API_KEY environment variable. set access token cookie via WithAccessTokenCookie option")
	}
	return nil
}

// authInterceptor returns the appropriate authentication interceptor based on configured credentials
func (c *apiUserServiceGRPCClientEXAMPLE) authInterceptor() grpc.UnaryClientInterceptor {
	if c.apiKey != "" {
		return func(ctx context.Context, method string, req, reply any, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
			ctx = metadata.AppendToOutgoingContext(
				ctx,
				common.AuthorizationHeaderKey,
				common.BearerPrefix+c.apiKey,
			)
			return invoker(ctx, method, req, reply, cc, opts...)
		}
	}

	return func(ctx context.Context, method string, req, reply any, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
		ctx = metadata.AppendToOutgoingContext(
			ctx,
			common.CookieHeaderKey,
			common.AccessTokenPrefix+c.accessTokenCookie,
		)
		return invoker(ctx, method, req, reply, cc, opts...)
	}
}
