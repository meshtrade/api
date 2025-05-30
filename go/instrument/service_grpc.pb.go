// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             v5.28.0
// source: api/proto/instrument/service.proto

package instrument

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.64.0 or later.
const _ = grpc.SupportPackageIsVersion9

const (
	Service_Mint_FullMethodName = "/api.instrument.Service/Mint"
	Service_Burn_FullMethodName = "/api.instrument.Service/Burn"
)

// ServiceClient is the client API for Service service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
//
// Service is the Instrument Service.
type ServiceClient interface {
	Mint(ctx context.Context, in *MintRequest, opts ...grpc.CallOption) (*MintResponse, error)
	Burn(ctx context.Context, in *BurnRequest, opts ...grpc.CallOption) (*BurnResponse, error)
}

type serviceClient struct {
	cc grpc.ClientConnInterface
}

func NewServiceClient(cc grpc.ClientConnInterface) ServiceClient {
	return &serviceClient{cc}
}

func (c *serviceClient) Mint(ctx context.Context, in *MintRequest, opts ...grpc.CallOption) (*MintResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(MintResponse)
	err := c.cc.Invoke(ctx, Service_Mint_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *serviceClient) Burn(ctx context.Context, in *BurnRequest, opts ...grpc.CallOption) (*BurnResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(BurnResponse)
	err := c.cc.Invoke(ctx, Service_Burn_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ServiceServer is the server API for Service service.
// All implementations must embed UnimplementedServiceServer
// for forward compatibility.
//
// Service is the Instrument Service.
type ServiceServer interface {
	Mint(context.Context, *MintRequest) (*MintResponse, error)
	Burn(context.Context, *BurnRequest) (*BurnResponse, error)
	mustEmbedUnimplementedServiceServer()
}

// UnimplementedServiceServer must be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedServiceServer struct{}

func (UnimplementedServiceServer) Mint(context.Context, *MintRequest) (*MintResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Mint not implemented")
}
func (UnimplementedServiceServer) Burn(context.Context, *BurnRequest) (*BurnResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Burn not implemented")
}
func (UnimplementedServiceServer) mustEmbedUnimplementedServiceServer() {}
func (UnimplementedServiceServer) testEmbeddedByValue()                 {}

// UnsafeServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ServiceServer will
// result in compilation errors.
type UnsafeServiceServer interface {
	mustEmbedUnimplementedServiceServer()
}

func RegisterServiceServer(s grpc.ServiceRegistrar, srv ServiceServer) {
	// If the following call panics, it indicates UnimplementedServiceServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&Service_ServiceDesc, srv)
}

func _Service_Mint_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MintRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ServiceServer).Mint(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Service_Mint_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ServiceServer).Mint(ctx, req.(*MintRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Service_Burn_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(BurnRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ServiceServer).Burn(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Service_Burn_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ServiceServer).Burn(ctx, req.(*BurnRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Service_ServiceDesc is the grpc.ServiceDesc for Service service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Service_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "api.instrument.Service",
	HandlerType: (*ServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Mint",
			Handler:    _Service_Mint_Handler,
		},
		{
			MethodName: "Burn",
			Handler:    _Service_Burn_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "api/proto/instrument/service.proto",
}
