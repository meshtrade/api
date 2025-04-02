// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: api/proto/instrument/fee/service.proto
package fee

import (
	context "context"
)

// Service is the Fee Service.
type Service interface {
	Get(ctx context.Context, request *GetRequest) (*GetResponse, error)

	List(ctx context.Context, request *ListRequest) (*ListResponse, error)

	CalculateMintingFees(ctx context.Context, request *CalculateMintingFeesRequest) (*CalculateMintingFeesResponse, error)

	CalculateBurningFees(ctx context.Context, request *CalculateBurningFeesRequest) (*CalculateBurningFeesResponse, error)

	CalculateLifecycleFees(ctx context.Context, request *CalculateLifecycleFeesRequest) (*CalculateLifecycleFeesResponse, error)

	FullUpdate(ctx context.Context, request *FullUpdateRequest) (*FullUpdateResponse, error)
}

const ServiceServiceProviderName = "api-instrument-fee-Service"
