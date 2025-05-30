// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: api/proto/instrument/feeprofile/service.proto
package feeprofile

import (
	context "context"
)

// Service is the Fee Profile Service.
type Service interface {
	Create(ctx context.Context, request *CreateRequest) (*CreateResponse, error)

	Update(ctx context.Context, request *UpdateRequest) (*UpdateResponse, error)

	List(ctx context.Context, request *ListRequest) (*ListResponse, error)

	Get(ctx context.Context, request *GetRequest) (*GetResponse, error)
}

const ServiceServiceProviderName = "api-instrument-feeprofile-Service"
