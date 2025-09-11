package user_v1

import (
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestAssignRoleToUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name    string
		request *AssignRoleToUserRequest
		wantErr bool
		errMsg  string
	}{
		{
			name: "valid request",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1000000",
			},
			wantErr: false,
		},
		{
			name: "empty name",
			request: &AssignRoleToUserRequest{
				Name: "",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1000000",
			},
			wantErr: true,
			errMsg:  "value length must be 32 characters",
		},
		{
			name: "invalid name format",
			request: &AssignRoleToUserRequest{
				Name: "invalid-name",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1000000",
			},
			wantErr: true,
			errMsg:  "value does not match regex pattern",
		},
		{
			name: "empty role",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "",
			},
			wantErr: true,
			errMsg:  "value is required",
		},
		{
			name: "invalid role format",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "invalid-role",
			},
			wantErr: true,
			errMsg:  "value does not match regex pattern",
		},
		{
			name: "role wrong length",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/short/1000000", // Too short group ID
			},
			wantErr: true,
			errMsg:  "value length must be 41 characters",
		},
		{
			name: "all fields invalid",
			request: &AssignRoleToUserRequest{
				Name: "",
				Role: "",
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.request)
			
			if tt.wantErr {
				assert.Error(t, err, "Expected validation error for test case: %s", tt.name)
				if tt.errMsg != "" {
					assert.Contains(t, err.Error(), tt.errMsg, "Error message should contain expected text: %s", tt.errMsg)
					t.Logf("Test case '%s' - Error message: %s", tt.name, err.Error())
				}
			} else {
				assert.NoError(t, err, "Expected no validation error for test case: %s", tt.name)
			}
		})
	}
}

func TestAssignRoleToUserRequest_Validation_EdgeCases(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("valid role formats", func(t *testing.T) {
		validRoles := []string{
			"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1000000",
			"groups/01BX5ZZKBKACTAV9WEVGEMMVRZ/1000001", 
			"groups/01CX5ZZKBKACTAV9WEVGEMMVRZ/1000002",
		}

		for _, role := range validRoles {
			request := &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: role,
			}
			
			err := validator.Validate(request)
			assert.NoError(t, err, "Role %s should be valid", role)
		}
	})

	t.Run("valid user name formats", func(t *testing.T) {
		validNames := []string{
			"users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			"users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
			"users/01CX5ZZKBKACTAV9WEVGEMMVRZ",
		}

		for _, name := range validNames {
			request := &AssignRoleToUserRequest{
				Name: name,
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1000000",
			}
			
			err := validator.Validate(request)
			assert.NoError(t, err, "Name %s should be valid", name)
		}
	})
}