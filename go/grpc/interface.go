package grpc

// GRPCClient defines the base interface that all gRPC clients should implement
// to ensure proper resource cleanup and configuration access
type GRPCClient interface {
	Close() error
	Group() string
}
