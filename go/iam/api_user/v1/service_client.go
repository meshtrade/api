package api_userv1

import (
	"context"
	"errors"
	fmt "fmt"

	"github.com/meshtrade/api/go/common"
	trace "go.opentelemetry.io/otel/trace"
	"go.opentelemetry.io/otel/trace/noop"
	grpc "google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/metadata"
)

// ensure apiUserServiceGRPCClient implements the ApiUserService interface
var _ ApiUserService = &apiUserServiceGRPCClient{}

type apiUserServiceGRPCClient struct {
	url                     string
	port                    int
	tls                     bool
	grpcClient              ApiUserServiceClient
	tracer                  trace.Tracer
	apiKey                  string
	accessTokenCookie       string
	unaryClientInterceptors []grpc.UnaryClientInterceptor
}

func NewAPIUserServiceGRPCClient(opts ...apiUserServiceGRPCClientOption) (ApiUserService, error) {
	// prepare client with default configuration
	client := &apiUserServiceGRPCClient{
		url:    common.DefaultGRPCURL,
		port:   common.DefaultGRPCPort,
		tls:    common.DefaultTLS,
		tracer: noop.NewTracerProvider().Tracer(""),
		apiKey: common.APIKEYFromEnvironment(),

		// set once options are applied and connection opened
		grpcClient:              nil,
		unaryClientInterceptors: nil,
	}

	// apply options to the client
	for _, opt := range opts {
		client = opt.apply(client)
	}

	// confirm api key is set
	if client.apiKey == "" && client.accessTokenCookie == "" {
		return nil, errors.New("neither api key nor access token cookie set. set api key via WithAPIKey option or as MESH_API_KEY environment variable. set access token cookie via WithAccessTokenCooke option")
	}

	// prepare unary client interceptors using api key or access token cookie
	if client.apiKey != "" {
		client.unaryClientInterceptors = []grpc.UnaryClientInterceptor{
			func(ctx context.Context, method string, req, reply any, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
				ctx = metadata.AppendToOutgoingContext(
					ctx,
					"authorization",
					fmt.Sprintf("Bearer %s", client.apiKey),
				)
				return invoker(ctx, method, req, reply, cc, opts...)
			},
		}
	} else if client.accessTokenCookie != "" {
		client.unaryClientInterceptors = []grpc.UnaryClientInterceptor{
			func(ctx context.Context, method string, req, reply any, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
				ctx = metadata.AppendToOutgoingContext(
					ctx,
					"cookie",
					fmt.Sprintf("AccessToken=%s", client.accessTokenCookie),
				)
				return invoker(ctx, method, req, reply, cc, opts...)
			},
		}
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
	gRRPClientConnection, err := grpc.NewClient(
		fmt.Sprintf("%s:%d", client.url, client.port),
		dialOpts...,
	)
	if err != nil {
		return nil, fmt.Errorf("error constructing grpc client connection: %w", err)
	}

	// set client connection
	client.grpcClient = NewApiUserServiceClient(gRRPClientConnection)

	// return constructed client
	return client, nil
}

// ActivateApiUser implements ApiUserService.
func (s *apiUserServiceGRPCClient) ActivateApiUser(ctx context.Context, request *ActivateApiUserRequest) (*APIUser, error) {
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
func (s *apiUserServiceGRPCClient) CreateApiUser(ctx context.Context, request *CreateApiUserRequest) (*APIUser, error) {
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
func (s *apiUserServiceGRPCClient) DeactivateApiUser(ctx context.Context, request *DeactivateApiUserRequest) (*APIUser, error) {
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
func (s *apiUserServiceGRPCClient) GetApiUser(ctx context.Context, request *GetApiUserRequest) (*APIUser, error) {
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
func (s *apiUserServiceGRPCClient) GetApiUserByKeyHash(ctx context.Context, request *GetApiUserByKeyHashRequest) (*APIUser, error) {
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
func (s *apiUserServiceGRPCClient) ListApiUsers(ctx context.Context, request *ListApiUsersRequest) (*ListApiUsersResponse, error) {
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
func (s *apiUserServiceGRPCClient) SearchApiUsers(ctx context.Context, request *SearchApiUsersRequest) (*SearchApiUsersResponse, error) {
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
