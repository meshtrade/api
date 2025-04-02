// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: api/proto/instrument/fee/service.proto
package fee

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

// Get exposes the Get method of the given implementation of the Service interface over gRPC
func (g *ServiceGRPCAdaptor) Get(ctx context.Context, request *GetRequest) (*GetResponse, error) {
	ctx, span := g.tracer.Start(
		ctx,
		ServiceServiceProviderName+"GRPCAdaptor.Get",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	getResponse, err := g.service.Get(ctx, request)
	if err != nil {
		return nil, err
	}

	return getResponse, nil
}

// List exposes the List method of the given implementation of the Service interface over gRPC
func (g *ServiceGRPCAdaptor) List(ctx context.Context, request *ListRequest) (*ListResponse, error) {
	ctx, span := g.tracer.Start(
		ctx,
		ServiceServiceProviderName+"GRPCAdaptor.List",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	listResponse, err := g.service.List(ctx, request)
	if err != nil {
		return nil, err
	}

	return listResponse, nil
}

// CalculateMintingFees exposes the CalculateMintingFees method of the given implementation of the Service interface over gRPC
func (g *ServiceGRPCAdaptor) CalculateMintingFees(ctx context.Context, request *CalculateMintingFeesRequest) (*CalculateMintingFeesResponse, error) {
	ctx, span := g.tracer.Start(
		ctx,
		ServiceServiceProviderName+"GRPCAdaptor.CalculateMintingFees",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	calculateMintingFeesResponse, err := g.service.CalculateMintingFees(ctx, request)
	if err != nil {
		return nil, err
	}

	return calculateMintingFeesResponse, nil
}

// CalculateBurningFees exposes the CalculateBurningFees method of the given implementation of the Service interface over gRPC
func (g *ServiceGRPCAdaptor) CalculateBurningFees(ctx context.Context, request *CalculateBurningFeesRequest) (*CalculateBurningFeesResponse, error) {
	ctx, span := g.tracer.Start(
		ctx,
		ServiceServiceProviderName+"GRPCAdaptor.CalculateBurningFees",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	calculateBurningFeesResponse, err := g.service.CalculateBurningFees(ctx, request)
	if err != nil {
		return nil, err
	}

	return calculateBurningFeesResponse, nil
}

// CalculateLifecycleFees exposes the CalculateLifecycleFees method of the given implementation of the Service interface over gRPC
func (g *ServiceGRPCAdaptor) CalculateLifecycleFees(ctx context.Context, request *CalculateLifecycleFeesRequest) (*CalculateLifecycleFeesResponse, error) {
	ctx, span := g.tracer.Start(
		ctx,
		ServiceServiceProviderName+"GRPCAdaptor.CalculateLifecycleFees",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	calculateLifecycleFeesResponse, err := g.service.CalculateLifecycleFees(ctx, request)
	if err != nil {
		return nil, err
	}

	return calculateLifecycleFeesResponse, nil
}

// FullUpdate exposes the FullUpdate method of the given implementation of the Service interface over gRPC
func (g *ServiceGRPCAdaptor) FullUpdate(ctx context.Context, request *FullUpdateRequest) (*FullUpdateResponse, error) {
	ctx, span := g.tracer.Start(
		ctx,
		ServiceServiceProviderName+"GRPCAdaptor.FullUpdate",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	fullUpdateResponse, err := g.service.FullUpdate(ctx, request)
	if err != nil {
		return nil, err
	}

	return fullUpdateResponse, nil
}
