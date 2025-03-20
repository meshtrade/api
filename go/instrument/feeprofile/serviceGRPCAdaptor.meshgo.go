// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: api/proto/instrument/feeprofile/service.proto
package feeprofile

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

// Create exposes the Create method of the given implementation of the Service interface over gRPC
func (g *ServiceGRPCAdaptor) Create(ctx context.Context, request *CreateRequest) (*CreateResponse, error) {
	ctx, span := g.tracer.Start(
		ctx,
		ServiceServiceProviderName+"GRPCAdaptor.Create",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	createResponse, err := g.service.Create(ctx, request)
	if err != nil {
		return nil, err
	}

	return createResponse, nil
}

// Update exposes the Update method of the given implementation of the Service interface over gRPC
func (g *ServiceGRPCAdaptor) Update(ctx context.Context, request *UpdateRequest) (*UpdateResponse, error) {
	ctx, span := g.tracer.Start(
		ctx,
		ServiceServiceProviderName+"GRPCAdaptor.Update",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	updateResponse, err := g.service.Update(ctx, request)
	if err != nil {
		return nil, err
	}

	return updateResponse, nil
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
