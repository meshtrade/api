// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: api/proto/instrument/service.proto
package instrument

import (
	context "context"
	sync "sync"
	testing "testing"
)

// Ensure that MockService implements the Service interface
var _ Service = &MockService{}

// MockService is a mock implementation of the Service interface.
type MockService struct {
	mutex               sync.Mutex
	T                   *testing.T
	MintFunc            func(t *testing.T, m *MockService, ctx context.Context, request *MintRequest) (*MintResponse, error)
	MintFuncInvocations int
	BurnFunc            func(t *testing.T, m *MockService, ctx context.Context, request *BurnRequest) (*BurnResponse, error)
	BurnFuncInvocations int
}

func (m *MockService) Mint(ctx context.Context, request *MintRequest) (*MintResponse, error) {
	m.mutex.Lock()
	m.MintFuncInvocations++
	m.mutex.Unlock()
	if m.MintFunc == nil {
		return nil, nil
	}
	return m.MintFunc(m.T, m, ctx, request)
}

func (m *MockService) Burn(ctx context.Context, request *BurnRequest) (*BurnResponse, error) {
	m.mutex.Lock()
	m.BurnFuncInvocations++
	m.mutex.Unlock()
	if m.BurnFunc == nil {
		return nil, nil
	}
	return m.BurnFunc(m.T, m, ctx, request)
}
