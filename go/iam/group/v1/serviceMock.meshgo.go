// Code generated by protoc-gen-meshgo. DO NOT EDIT.
// source: meshtrade/iam/group/v1/service.proto
package groupv1

import (
	context "context"
	sync "sync"
	testing "testing"
)

// Ensure that MockGroupService implements the GroupService interface
var _ GroupService = &MockGroupService{}

// MockGroupService is a mock implementation of the GroupService interface.
type MockGroupService struct {
	mutex                   sync.Mutex
	T                       *testing.T
	GetGroupFunc            func(t *testing.T, m *MockGroupService, ctx context.Context, request *GetGroupRequest) (*Group, error)
	GetGroupFuncInvocations int
}

func (m *MockGroupService) GetGroup(ctx context.Context, request *GetGroupRequest) (*Group, error) {
	m.mutex.Lock()
	m.GetGroupFuncInvocations++
	m.mutex.Unlock()
	if m.GetGroupFunc == nil {
		return nil, nil
	}
	return m.GetGroupFunc(m.T, m, ctx, request)
}
