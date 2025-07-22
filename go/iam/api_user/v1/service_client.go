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

// ensure apiUserServiceGRPCClient implements the APIUserService interface
var _ APIUserService = &apiUserServiceGRPCClient{}

type apiUserServiceGRPCClient struct {
	url                     string
	port                    int
	tls                     bool
	grpcClient              APIUserServiceClient
	tracer                  trace.Tracer
	apiKey                  string
	accessTokenCookie       string
	unaryClientInterceptors []grpc.UnaryClientInterceptor
}

func NewAPIUserServiceGRPCClient(opts ...apiUserServiceGRPCClientOption) (*apiUserServiceGRPCClient, error) {
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
	client.grpcClient = NewAPIUserServiceClient(gRRPClientConnection)

	// return constructed client
	return client, nil
}

func (s *apiUserServiceGRPCClient) GetAPIUser(ctx context.Context, request *GetAPIUserRequest) (*APIUser, error) {
	ctx, span := s.tracer.Start(
		ctx,
		APIUserServiceServiceProviderName+"GetAPIUser",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	getAPIUserResponse, err := s.grpcClient.GetAPIUser(ctx, request)
	if err != nil {
		return nil, err
	}

	return getAPIUserResponse, nil
}

func (s *apiUserServiceGRPCClient) GetAPIUserByKeyHash(ctx context.Context, request *GetAPIUserByKeyHashRequest) (*APIUser, error) {
	ctx, span := s.tracer.Start(
		ctx,
		APIUserServiceServiceProviderName+"GetAPIUserByKeyHash",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	getAPIUserByKeyHashResponse, err := s.grpcClient.GetAPIUserByKeyHash(ctx, request)
	if err != nil {
		return nil, err
	}

	return getAPIUserByKeyHashResponse, nil
}
