package common

import "io"

// GRPCClient defines the base interface that all gRPC clients should implement
// to ensure proper resource cleanup and configuration access
type GRPCClient interface {
	io.Closer
	Group() string
}
