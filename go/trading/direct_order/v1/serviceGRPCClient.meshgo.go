// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: meshtrade/trading/direct_order/v1/service.proto
package directorderv1

import (
	context "context"
	fmt "fmt"
	log "github.com/rs/zerolog/log"
	trace "go.opentelemetry.io/otel/trace"
	grpc "google.golang.org/grpc"
)

// Ensure that GRPCClientDirectOrderService implements the DirectOrderService interface
var _ DirectOrderService = &GRPCClientDirectOrderService{}

// GRPCClientDirectOrderService is a gRPC client implementation of the DirectOrderService interface.
type GRPCClientDirectOrderService struct {
	tracer     trace.Tracer
	grpcClient DirectOrderServiceClient
}

func NewGRPCClientDirectOrderService(
	tracer trace.Tracer,
	grpcClientConnection *grpc.ClientConn,
) *GRPCClientDirectOrderService {
	return &GRPCClientDirectOrderService{
		tracer:     tracer,
		grpcClient: NewDirectOrderServiceClient(grpcClientConnection),
	}
}

func (g *GRPCClientDirectOrderService) GetDirectOrder(ctx context.Context, request *GetDirectOrderRequest) (*DirectOrder, error) {
	ctx, span := g.tracer.Start(
		ctx,
		DirectOrderServiceServiceProviderName+"GetDirectOrder",
	)
	defer span.End()

	// call given implementation of the adapted service provider interface
	getDirectOrderResponse, err := g.grpcClient.GetDirectOrder(ctx, request)
	if err != nil {
		log.Ctx(ctx).Error().Err(err).Msg("could not GetDirectOrder")
		return nil, fmt.Errorf("could not GetDirectOrder: %s", err)
	}

	return getDirectOrderResponse, nil
}
