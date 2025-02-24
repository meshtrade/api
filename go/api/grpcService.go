package api

import "google.golang.org/grpc"

type GRPCService interface {
	ServiceProviderName() string
	RegisterWithGRPCServer(s grpc.ServiceRegistrar)
}
