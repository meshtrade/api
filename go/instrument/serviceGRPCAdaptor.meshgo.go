// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: instrument/service.proto
package instrument

import (
	context "context"
	api "github.com/meshtrade/api/go/api"
	trace "go.opentelemetry.io/otel/trace"
	grpc "google.golang.org/grpc"
)

// Ensure that ServiceGRPCAdaptor implements the api.GRPCService interface
var _ api.GRPCService = &ServiceGRPCAdaptor{}

func (p *ServiceGRPCAdaptor) ServiceProviderName() string {
	return ServiceServiceProviderName
}

func (p *ServiceGRPCAdaptor) RegisterWithGRPCServer(s grpc.ServiceRegistrar) {
	RegisterServiceServer(s, p)
}

// ServiceGRPCAdaptorexposes an implementation of the Service interface over gGRPC through implemenation of the api.GRPCService interface
type ServiceGRPCAdaptor struct {
	UnimplementedServiceServer
	tracer  trace.Tracer
	service Service
}

// NewServiceGRPCAdaptor constructs a new ServiceGRPCAdaptor
func NewServiceGRPCAdaptor(
	tracer trace.Tracer,
	service Service,
) *ServiceGRPCAdaptor {
	return &ServiceGRPCAdaptor{
		tracer:  tracer,
		service: service,
	}
}

// Mint exposes the Mint method of the given implementation of the Service interface over gRPC
func (g *ServiceGRPCAdaptor) Mint(ctx context.Context, request *MintRequest) (*MintResponse, error) {
	ctx, span := g.tracer.Start(
		ctx,
		ServiceServiceProviderName+"GRPCAdaptor.Mint",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	mintResponse, err := g.service.Mint(ctx, request)
	if err != nil {
		return nil, err
	}

	return mintResponse, nil
}

// Burn exposes the Burn method of the given implementation of the Service interface over gRPC
func (g *ServiceGRPCAdaptor) Burn(ctx context.Context, request *BurnRequest) (*BurnResponse, error) {
	ctx, span := g.tracer.Start(
		ctx,
		ServiceServiceProviderName+"GRPCAdaptor.Burn",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	burnResponse, err := g.service.Burn(ctx, request)
	if err != nil {
		return nil, err
	}

	return burnResponse, nil
}
