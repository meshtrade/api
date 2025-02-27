// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: api/proto/instrument/feeprofile/service.proto
package feeprofile

import (
	context "context"
	sync "sync"
	testing "testing"
)

// Ensure that MockService implements the Service interface
var _ Service = &MockService{}

// MockService is a mock implementation of the Service interface.
type MockService struct {
	mutex                 sync.Mutex
	T                     *testing.T
	CreateFunc            func(t *testing.T, m *MockService, ctx context.Context, request *CreateRequest) (*CreateResponse, error)
	CreateFuncInvocations int
	UpdateFunc            func(t *testing.T, m *MockService, ctx context.Context, request *UpdateRequest) (*UpdateResponse, error)
	UpdateFuncInvocations int
	ListFunc              func(t *testing.T, m *MockService, ctx context.Context, request *ListRequest) (*ListResponse, error)
	ListFuncInvocations   int
}

func (m *MockService) Create(ctx context.Context, request *CreateRequest) (*CreateResponse, error) {
	m.mutex.Lock()
	m.CreateFuncInvocations++
	m.mutex.Unlock()
	if m.CreateFunc == nil {
		return nil, nil
	}
	return m.CreateFunc(m.T, m, ctx, request)
}

func (m *MockService) Update(ctx context.Context, request *UpdateRequest) (*UpdateResponse, error) {
	m.mutex.Lock()
	m.UpdateFuncInvocations++
	m.mutex.Unlock()
	if m.UpdateFunc == nil {
		return nil, nil
	}
	return m.UpdateFunc(m.T, m, ctx, request)
}

func (m *MockService) List(ctx context.Context, request *ListRequest) (*ListResponse, error) {
	m.mutex.Lock()
	m.ListFuncInvocations++
	m.mutex.Unlock()
	if m.ListFunc == nil {
		return nil, nil
	}
	return m.ListFunc(m.T, m, ctx, request)
}
