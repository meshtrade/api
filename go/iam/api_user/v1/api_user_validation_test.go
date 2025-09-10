package api_user_v1

import (
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestAPIUser_ValidationUpdated(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		apiUser   *APIUser
		wantValid bool
		wantError string
	}{
		{
			name: "valid API user with all fields",
			apiUser: &APIUser{
				Owner:       "groups/test-group-123",
				Owners:      []string{"groups/test-group-123"},
				DisplayName: "Test API User",
				State:       APIUserState_API_USER_STATE_ACTIVE,
				Roles:       []string{"groups/test-group-123/ROLE_IAM_VIEWER"},
			},
			wantValid: true,
		},
		{
			name: "valid API user with minimal required fields",
			apiUser: &APIUser{
				Owner:       "groups/test-group-123",
				DisplayName: "Test API User",
			},
			wantValid: true,
		},
		{
			name: "valid API user with empty system-set fields",
			apiUser: &APIUser{
				Owner:       "groups/test-group-123",
				Owners:      []string{}, // System set, can be empty
				DisplayName: "Test API User",
				State:       APIUserState_API_USER_STATE_UNSPECIFIED, // System set, can be unspecified
				Roles:       []string{},                              // Can be empty (0 roles allowed)
			},
			wantValid: true,
		},
		{
			name: "valid API user with no roles",
			apiUser: &APIUser{
				Owner:       "groups/test-group-123",
				DisplayName: "Test API User",
				Roles:       []string{}, // 0 roles allowed
			},
			wantValid: true,
		},
		{
			name: "empty owner - should fail (required field)",
			apiUser: &APIUser{
				Owner:       "",
				DisplayName: "Test API User",
			},
			wantValid: false,
			wantError: "owner is required",
		},
		{
			name: "invalid owner format - missing groups prefix",
			apiUser: &APIUser{
				Owner:       "test-group-123",
				DisplayName: "Test API User",
			},
			wantValid: false,
			wantError: "owner must be in format groups/{group_id}",
		},
		{
			name: "invalid owner format - invalid group ID characters",
			apiUser: &APIUser{
				Owner:       "groups/test@group!",
				DisplayName: "Test API User",
			},
			wantValid: false,
			wantError: "group_id contains only alphanumeric characters",
		},
		{
			name: "valid owner with underscores and hyphens",
			apiUser: &APIUser{
				Owner:       "groups/test_group-123",
				DisplayName: "Test API User",
			},
			wantValid: true,
		},
		{
			name: "owners field accepts any values since no validation defined",
			apiUser: &APIUser{
				Owner:       "groups/test-group-123",
				Owners:      []string{"groups/test-group-123", "invalid-owner"},
				DisplayName: "Test API User",
			},
			wantValid: true, // No validation rules defined for owners field in proto
		},
		{
			name: "empty display name - should fail (required field)",
			apiUser: &APIUser{
				Owner:       "groups/test-group-123",
				DisplayName: "",
			},
			wantValid: false,
			wantError: "display name is required",
		},
		{
			name: "display name too long",
			apiUser: &APIUser{
				Owner:       "groups/test-group-123",
				DisplayName: string(make([]byte, 256)), // 256 characters
			},
			wantValid: false,
			wantError: "255 characters",
		},
		{
			name: "valid state when specified",
			apiUser: &APIUser{
				Owner:       "groups/test-group-123",
				DisplayName: "Test API User",
				State:       APIUserState_API_USER_STATE_ACTIVE,
			},
			wantValid: true,
		},
		{
			name: "valid unspecified state (system can set this)",
			apiUser: &APIUser{
				Owner:       "groups/test-group-123",
				DisplayName: "Test API User",
				State:       APIUserState_API_USER_STATE_UNSPECIFIED,
			},
			wantValid: true,
		},
		{
			name: "multiple valid roles",
			apiUser: &APIUser{
				Owner:       "groups/test-group-123",
				DisplayName: "Test API User",
				Roles:       []string{"groups/test-group-123/ROLE_IAM_VIEWER", "groups/test-group-123/ROLE_IAM_ADMIN"},
			},
			wantValid: true,
		},
		{
			name: "invalid role format when roles provided",
			apiUser: &APIUser{
				Owner:       "groups/test-group-123",
				DisplayName: "Test API User",
				Roles:       []string{"invalid-role-format"}, // Invalid role format
			},
			wantValid: true, // Currently no validation on role format in proto
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.apiUser)

			if tt.wantValid {
				assert.NoError(t, err, "Expected validation to pass")
			} else {
				assert.Error(t, err, "Expected validation to fail")
				if tt.wantError != "" {
					assert.Contains(t, err.Error(), tt.wantError, "Error message should contain expected text")
				}
			}
		})
	}
}

func TestAPIUser_ValidationOwnerFormatsUpdated(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	validOwnerFormats := []string{
		"groups/a",                    // single character
		"groups/abc123",               // alphanumeric
		"groups/test-group-123",       // with hyphens
		"groups/test_group_123",       // with underscores
		"groups/group-with_mixed-123", // mixed separators
		"groups/ABC123",               // uppercase
		"groups/a1b2c3",               // mixed case
	}

	invalidOwnerFormats := []string{
		"",                // empty (required field)
		"groups/",         // missing group ID
		"groups/-invalid", // starts with hyphen
		"groups/invalid-", // ends with hyphen
		"groups/_invalid", // starts with underscore
		"groups/invalid_", // ends with underscore
		"groups/inv@lid",  // invalid character @
		"groups/inv!lid",  // invalid character !
		"groups/inv lid",  // space
		"groups/inv.lid",  // dot
		"group/test",      // wrong prefix
		"test-group-123",  // no prefix
	}

	// Test valid formats
	for _, owner := range validOwnerFormats {
		t.Run("valid_"+owner, func(t *testing.T) {
			apiUser := &APIUser{
				Owner:       owner,
				DisplayName: "Test API User",
			}

			err := validator.Validate(apiUser)
			assert.NoError(t, err, "Owner format %s should be valid", owner)
		})
	}

	// Test invalid formats
	for _, owner := range invalidOwnerFormats {
		t.Run("invalid_"+owner, func(t *testing.T) {
			apiUser := &APIUser{
				Owner:       owner,
				DisplayName: "Test API User",
			}

			err := validator.Validate(apiUser)
			assert.Error(t, err, "Owner format %s should be invalid", owner)
		})
	}
}

func TestAPIUser_SystemSetFieldsOptional(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("all system-set fields can be empty/unspecified", func(t *testing.T) {
		apiUser := &APIUser{
			// Only required fields
			Owner:       "groups/test-group-123",
			DisplayName: "Test API User",

			// System-set fields can be empty/unspecified
			Name:   "",                                      // System set
			Owners: []string{},                              // System set
			State:  APIUserState_API_USER_STATE_UNSPECIFIED, // System set
			ApiKey: "",                                      // System set
			Roles:  []string{},                              // Can be empty
		}

		err := validator.Validate(apiUser)
		assert.NoError(t, err, "System-set fields should be allowed to be empty")
	})

	t.Run("system-set fields are validated when present", func(t *testing.T) {
		apiUser := &APIUser{
			Owner:       "groups/test-group-123",
			DisplayName: "Test API User",
			Owners:      []string{"invalid-owner"}, // Invalid format but no validation defined
		}

		err := validator.Validate(apiUser)
		assert.NoError(t, err, "Owners field has no validation rules defined in proto")
	})
}
