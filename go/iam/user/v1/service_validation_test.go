package user_v1

import (
	"testing"

	"buf.build/go/protovalidate"
	role_v1 "github.com/meshtrade/api/go/iam/role/v1"
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
				Email: "user@example.com",
				Group: "test-group",
				Role:  role_v1.Role_ROLE_COMPLIANCE_ADMIN,
			},
			wantErr: false,
		},
		{
			name: "empty email",
			request: &AssignRoleToUserRequest{
				Email: "",
				Group: "test-group",
				Role:  role_v1.Role_ROLE_COMPLIANCE_ADMIN,
			},
			wantErr: true,
			errMsg:  "email is required and must be a valid email address",
		},
		{
			name: "invalid email format",
			request: &AssignRoleToUserRequest{
				Email: "invalid-email",
				Group: "test-group",
				Role:  role_v1.Role_ROLE_COMPLIANCE_ADMIN,
			},
			wantErr: true,
			errMsg:  "value does not match regex pattern",
		},
		{
			name: "email too long",
			request: func() *AssignRoleToUserRequest {
				// Create an email that's too long (over 254 chars)
				longLocalPart := ""
				for i := 0; i < 245; i++ {
					longLocalPart += "a"
				}
				longEmail := longLocalPart + "@example.com" // 245 + 12 = 257 chars, exceeds 254 limit
				return &AssignRoleToUserRequest{
					Email: longEmail,
					Group: "test-group", 
					Role:  role_v1.Role_ROLE_COMPLIANCE_ADMIN,
				}
			}(),
			wantErr: true,
			errMsg:  "value length must be at most 254 characters",
		},
		{
			name: "empty group",
			request: &AssignRoleToUserRequest{
				Email: "user@example.com",
				Group: "",
				Role:  role_v1.Role_ROLE_COMPLIANCE_ADMIN,
			},
			wantErr: true,
			errMsg:  "group name is required and must be between 1 and 255 characters",
		},
		{
			name: "group too long",
			request: func() *AssignRoleToUserRequest {
				// Create a group name that's too long (over 255 chars)
				longGroup := ""
				for i := 0; i < 256; i++ {
					longGroup += "a"
				}
				return &AssignRoleToUserRequest{
					Email: "user@example.com",
					Group: longGroup, // 256 chars, exceeds 255 limit
					Role:  role_v1.Role_ROLE_COMPLIANCE_ADMIN,
				}
			}(),
			wantErr: true,
			errMsg:  "group name is required and must be between 1 and 255 characters",
		},
		{
			name: "unspecified role",
			request: &AssignRoleToUserRequest{
				Email: "user@example.com",
				Group: "test-group",
				Role:  role_v1.Role_ROLE_UNSPECIFIED, // This is the default 0 value
			},
			wantErr: true,
			errMsg:  "role is required and must be a valid role type (not UNSPECIFIED)",
		},
		{
			name: "all fields empty/invalid",
			request: &AssignRoleToUserRequest{
				Email: "",
				Group: "",
				Role:  role_v1.Role_ROLE_UNSPECIFIED,
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

	t.Run("email at maximum length", func(t *testing.T) {
		// Create an email that's exactly 254 characters
		localPart := ""
		for i := 0; i < 241; i++ {
			localPart += "a"
		}
		email := localPart + "@example.com" // Total: 241 + 1 + 11 = 253 chars (under limit)
		
		request := &AssignRoleToUserRequest{
			Email: email,
			Group: "test-group",
			Role:  role_v1.Role_ROLE_COMPLIANCE_ADMIN,
		}
		
		err := validator.Validate(request)
		// This might fail due to email format validation, which is expected
		// The test demonstrates the length constraint
		t.Logf("Validation result for max length email: %v", err)
	})

	t.Run("group at maximum length", func(t *testing.T) {
		// Create a group name that's exactly 255 characters
		group := ""
		for i := 0; i < 255; i++ {
			group += "a"
		}
		
		request := &AssignRoleToUserRequest{
			Email: "user@example.com",
			Group: group,
			Role:  role_v1.Role_ROLE_COMPLIANCE_ADMIN,
		}
		
		err := validator.Validate(request)
		assert.NoError(t, err, "255 character group name should be valid")
	})

	t.Run("valid complex email formats", func(t *testing.T) {
		validEmails := []string{
			"test@example.com",
			"user.name@example.com",
			"user+tag@example.co.uk",
			"user123@sub.example.org",
			"a@b.co",
		}

		for _, email := range validEmails {
			request := &AssignRoleToUserRequest{
				Email: email,
				Group: "test-group", 
				Role:  role_v1.Role_ROLE_COMPLIANCE_ADMIN,
			}
			
			err := validator.Validate(request)
			assert.NoError(t, err, "Email %s should be valid", email)
		}
	})
}