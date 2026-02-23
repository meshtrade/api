package api_user_v1

import (
	"strings"
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestGetAPIUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *GetAPIUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with correct name format",
			request: &GetAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2",
			request: &GetAPIUserRequest{
				Name: "iam/api_users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
			},
			wantValid: true,
		},
		// name field tests
		{
			name: "empty name - should fail (required)",
			request: &GetAPIUserRequest{
				Name: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &GetAPIUserRequest{
				Name: "iam/api_user/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Missing 's'
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - wrong resource type",
			request: &GetAPIUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Wrong resource
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			request: &GetAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FIL", // Contains 'I' and 'L'
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - lowercase ULIDv2",
			request: &GetAPIUserRequest{
				Name: "iam/api_users/01arz3ndektsv4rrffq69g5fav", // Lowercase
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name length - too short",
			request: &GetAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FA", // 35 chars instead of 36
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name length - too long",
			request: &GetAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 37 chars instead of 36
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name format - forbidden characters",
			request: &GetAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAU", // Contains 'U'
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - special characters in ULIDv2",
			request: &GetAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5F@V", // Contains @
			},
			wantValid: false,
			wantError: "pattern",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.request)

			if tt.wantValid {
				assert.NoError(t, err, "Expected validation to pass for case: %s", tt.name)
			} else {
				assert.Error(t, err, "Expected validation to fail for case: %s", tt.name)
				if tt.wantError != "" && err != nil {
					assert.Contains(t, strings.ToLower(err.Error()), tt.wantError, "Error message should contain expected text for case: %s. Got error: %s", tt.name, err.Error())
				}
			}
		})
	}
}

func TestGetAPIUserByKeyHashRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *GetAPIUserByKeyHashRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with 44-character key hash",
			request: &GetAPIUserByKeyHashRequest{
				KeyHash: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk123456=",
			},
			wantValid: true,
		},
		{
			name: "valid request with different 44-character hash",
			request: &GetAPIUserByKeyHashRequest{
				KeyHash: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFG=",
			},
			wantValid: true,
		},
		// key_hash field tests
		{
			name: "empty key_hash - should fail (required)",
			request: &GetAPIUserByKeyHashRequest{
				KeyHash: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "key_hash too short - 43 characters",
			request: &GetAPIUserByKeyHashRequest{
				KeyHash: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk12345", // 43 chars
			},
			wantValid: false,
			wantError: "44",
		},
		{
			name: "key_hash too long - 45 characters",
			request: &GetAPIUserByKeyHashRequest{
				KeyHash: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk12345678", // 45 chars
			},
			wantValid: false,
			wantError: "44",
		},
		{
			name: "key_hash with base64 special characters - should be valid",
			request: &GetAPIUserByKeyHashRequest{
				KeyHash: "ABCDEFGHIJKLMNOPQRSTUVWXYZ+/abc012345678901=", // 44 chars with valid base64 chars
			},
			wantValid: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.request)

			if tt.wantValid {
				assert.NoError(t, err, "Expected validation to pass for case: %s", tt.name)
			} else {
				assert.Error(t, err, "Expected validation to fail for case: %s", tt.name)
				if tt.wantError != "" && err != nil {
					assert.Contains(t, err.Error(), tt.wantError, "Error message should contain expected text for case: %s. Got error: %s", tt.name, err.Error())
				}
			}
		})
	}
}

func TestCreateAPIUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *CreateAPIUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with APIUser",
			request: &CreateAPIUserRequest{
				ApiUser: &APIUser{
					DisplayName: "Test API User",
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Roles:       []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/3000001"},
					State:       APIUserState_API_USER_STATE_ACTIVE,
				},
			},
			wantValid: true,
		},
		// api_user field tests
		{
			name: "missing api_user - should fail (required)",
			request: &CreateAPIUserRequest{
				ApiUser: nil,
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "valid request with minimal APIUser",
			request: &CreateAPIUserRequest{
				ApiUser: &APIUser{
					DisplayName: "Minimal User",
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					State:       APIUserState_API_USER_STATE_ACTIVE,
				},
			},
			wantValid: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.request)

			if tt.wantValid {
				assert.NoError(t, err, "Expected validation to pass for case: %s", tt.name)
			} else {
				assert.Error(t, err, "Expected validation to fail for case: %s", tt.name)
				if tt.wantError != "" && err != nil {
					assert.Contains(t, strings.ToLower(err.Error()), tt.wantError, "Error message should contain expected text for case: %s. Got error: %s", tt.name, err.Error())
				}
			}
		})
	}
}

func TestActivateAPIUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *ActivateAPIUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with correct name format",
			request: &ActivateAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2",
			request: &ActivateAPIUserRequest{
				Name: "iam/api_users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
			},
			wantValid: true,
		},
		// name field tests (same validation as GetAPIUserRequest)
		{
			name: "empty name - should fail (required)",
			request: &ActivateAPIUserRequest{
				Name: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &ActivateAPIUserRequest{
				Name: "api_user/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name length - too short",
			request: &ActivateAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FA",
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name length - too long",
			request: &ActivateAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAVX",
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			request: &ActivateAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FIL",
			},
			wantValid: false,
			wantError: "pattern",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.request)

			if tt.wantValid {
				assert.NoError(t, err, "Expected validation to pass for case: %s", tt.name)
			} else {
				assert.Error(t, err, "Expected validation to fail for case: %s", tt.name)
				if tt.wantError != "" && err != nil {
					assert.Contains(t, strings.ToLower(err.Error()), tt.wantError, "Error message should contain expected text for case: %s. Got error: %s", tt.name, err.Error())
				}
			}
		})
	}
}

func TestDeactivateAPIUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *DeactivateAPIUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with correct name format",
			request: &DeactivateAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2",
			request: &DeactivateAPIUserRequest{
				Name: "iam/api_users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
			},
			wantValid: true,
		},
		// name field tests (same validation as GetAPIUserRequest)
		{
			name: "empty name - should fail (required)",
			request: &DeactivateAPIUserRequest{
				Name: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &DeactivateAPIUserRequest{
				Name: "api_user/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name length - too short",
			request: &DeactivateAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FA",
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name length - too long",
			request: &DeactivateAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAVX",
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			request: &DeactivateAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FIL",
			},
			wantValid: false,
			wantError: "pattern",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.request)

			if tt.wantValid {
				assert.NoError(t, err, "Expected validation to pass for case: %s", tt.name)
			} else {
				assert.Error(t, err, "Expected validation to fail for case: %s", tt.name)
				if tt.wantError != "" && err != nil {
					assert.Contains(t, strings.ToLower(err.Error()), tt.wantError, "Error message should contain expected text for case: %s. Got error: %s", tt.name, err.Error())
				}
			}
		})
	}
}

// Test request types with no validation rules
func TestRequestTypesWithoutValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("ListAPIUsersRequest - no validation rules", func(t *testing.T) {
		request := &ListAPIUsersRequest{}
		err := validator.Validate(request)
		assert.NoError(t, err, "Empty message should always be valid")
	})

	t.Run("SearchAPIUsersRequest - no validation rules on display_name", func(t *testing.T) {
		// Test with empty display_name
		request1 := &SearchAPIUsersRequest{
			DisplayName: "",
		}
		err := validator.Validate(request1)
		assert.NoError(t, err, "Empty display_name should be valid (no validation rules)")

		// Test with any display_name value
		request2 := &SearchAPIUsersRequest{
			DisplayName: "Any string value should work!",
		}
		err = validator.Validate(request2)
		assert.NoError(t, err, "Any display_name value should be valid (no validation rules)")
	})
}

// Test response types (all should have no validation rules)
func TestResponseTypesValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("ListAPIUsersResponse - no validation rules", func(t *testing.T) {
		response := &ListAPIUsersResponse{
			ApiUsers: []*APIUser{}, // Empty list should be valid
		}
		err := validator.Validate(response)
		assert.NoError(t, err, "Empty response should be valid")

		// Test with API users (the APIUser validation is tested elsewhere)
		response.ApiUsers = []*APIUser{
			{
				Name:        "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test User",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				State:       APIUserState_API_USER_STATE_ACTIVE,
			},
		}
		err = validator.Validate(response)
		assert.NoError(t, err, "Response with API users should be valid")
	})

	t.Run("SearchAPIUsersResponse - no validation rules", func(t *testing.T) {
		response := &SearchAPIUsersResponse{
			ApiUsers: []*APIUser{}, // Empty list should be valid
		}
		err := validator.Validate(response)
		assert.NoError(t, err, "Empty response should be valid")
	})
}

func TestNameFieldValidation_Comprehensive(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid API user name formats (36 characters total)
	validNames := []string{
		"iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Standard example
		"iam/api_users/01BX5ZZKBKACTAV9WEVGEMMVRZ", // Another valid ULIDv2
		"iam/api_users/0123456789ABCDEFGHJKMNPQRS", // All valid ULIDv2 characters
		"iam/api_users/ZZZZZZZZZZZZZZZZZZZZZZZZZZ", // All Z's (valid ULIDv2 char)
	}

	// Invalid API user name formats
	invalidNames := []string{
		"",                                    // Empty (required)
		"api_user/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Wrong prefix (missing 's')
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAV",    // Wrong resource type
		"iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FIL",  // Contains forbidden 'I' and 'L'
		"iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAU",  // Contains forbidden 'U'
		"iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAO",  // Contains forbidden 'O'
		"iam/api_users/01arz3ndektsv4rrffq69g5fav",  // Lowercase not allowed
		"iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FA",   // Too short (35 chars)
		"iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // Too long (37 chars)
		"iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5F@V",  // Contains @ symbol
		"iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5F V",  // Contains space
		"iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5F-V",  // Contains hyphen (not in ULIDv2 alphabet)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",         // Wrong prefix entirely
		"01ARZ3NDEKTSV4RRFFQ69G5FAV",                // Missing prefix entirely
	}

	// Test valid names using GetAPIUserRequest
	for i, name := range validNames {
		t.Run("valid_name_"+string(rune(i+'0')), func(t *testing.T) {
			request := &GetAPIUserRequest{
				Name: name,
			}

			err := validator.Validate(request)
			assert.NoError(t, err, "Name format %q should be valid (length: %d)", name, len(name))
		})
	}

	// Test invalid names using GetAPIUserRequest
	for i, name := range invalidNames {
		t.Run("invalid_name_"+string(rune(i+'0')), func(t *testing.T) {
			request := &GetAPIUserRequest{
				Name: name,
			}

			err := validator.Validate(request)
			assert.Error(t, err, "Name format %q should be invalid (length: %d)", name, len(name))
		})
	}
}
func TestAssignRolesToAPIUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *AssignRolesToAPIUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with correct formats",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // 36 chars - correct format after proto fix
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2 values",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01BX5ZZKBKACTAV9WEVGEMMVRZ", // 36 chars - correct format after proto fix
				Roles: []string{"groups/01BX5ZZKBKACTAV9WEVGEMMVRZ/roles/1000001"},
			},
			wantValid: true,
		},
		// name field tests
		{
			name: "empty name - should fail (required field)",
			request: &AssignRolesToAPIUserRequest{
				Name:  "",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - users prefix (wrong resource type)",
			request: &AssignRolesToAPIUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Should be api_users/ not users/
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - wrong length (too short)",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FA", // 35 chars instead of 36
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "len",
		},
		{
			name: "invalid name format - wrong length (too long)",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 37 chars instead of 36
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "len",
		},
		{
			name: "invalid name format - lowercase chars",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01arz3ndektsv4rrffq69g5fav", // Lowercase not allowed in ULIDv2
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		// roles field tests
		{
			name: "empty roles - should fail (required)",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{},
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid role format - wrong prefix (missing /roles/ segment)",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"group/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567"}, // Missing 's' in groups
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - missing /roles/ segment",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567"}, // Missing /roles/ segment
			},
			wantValid: false,
			wantError: "min_len",
		},
		{
			name: "invalid role format - role_id too long (8 digits allowed max)",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/123456789"}, // 9 digits
			},
			wantValid: false,
			wantError: "max_len",
		},
		{
			name: "valid role format - 7-digit role_id",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/2234567"}, // Valid [1-9][0-9]{6}
			},
			wantValid: true,
		},
		{
			name: "valid role format - 8-digit role_id",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/12345678"}, // Valid [1-9][0-9]{7}
			},
			wantValid: true,
		},
		{
			name: "invalid role format - role_id contains letters",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/123456A"}, // Must be digits only
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - ULIDv2 group part too short",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FA/roles/1234567"}, // Missing one char in group ULID
			},
			wantValid: false,
			wantError: "min_len",
		},
		{
			name: "invalid role format - lowercase chars in group ULID",
			request: &AssignRolesToAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01arz3ndektsv4rrffq69g5fav/roles/1234567"}, // Lowercase not allowed
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "valid request - multiple roles",
			request: &AssignRolesToAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{
					"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567",
					"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/7654321",
				},
			},
			wantValid: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.request)
			if tt.wantValid {
				assert.NoError(t, err, "expected validation to pass but got error")
			} else {
				assert.Error(t, err, "expected validation to fail but got no error")
				if tt.wantError != "" {
					assert.Contains(t, err.Error(), tt.wantError, "error message should contain expected substring")
				}
			}
		})
	}
}

func TestRevokeRolesFromAPIUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *RevokeRolesFromAPIUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with correct formats",
			request: &RevokeRolesFromAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: true,
		},
		{
			name: "valid request with multiple roles",
			request: &RevokeRolesFromAPIUserRequest{
				Name: "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{
					"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567",
					"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/7654321",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with 8-digit role_id",
			request: &RevokeRolesFromAPIUserRequest{
				Name:  "iam/api_users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
				Roles: []string{"groups/01BX5ZZKBKACTAV9WEVGEMMVRZ/roles/12345678"},
			},
			wantValid: true,
		},
		// name field tests
		{
			name: "empty name - should fail (required field)",
			request: &RevokeRolesFromAPIUserRequest{
				Name:  "",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - wrong length",
			request: &RevokeRolesFromAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FA",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "len",
		},
		{
			name: "invalid name format - wrong pattern",
			request: &RevokeRolesFromAPIUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		// roles field tests
		{
			name: "empty roles - should fail (required)",
			request: &RevokeRolesFromAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{},
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid role format - missing /roles/ segment",
			request: &RevokeRolesFromAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567"},
			},
			wantValid: false,
			wantError: "min_len",
		},
		{
			name: "invalid role format - wrong prefix",
			request: &RevokeRolesFromAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"group/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - role_id contains letters",
			request: &RevokeRolesFromAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/123456A"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - role_id too long (9 digits)",
			request: &RevokeRolesFromAPIUserRequest{
				Name:  "iam/api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/123456789"},
			},
			wantValid: false,
			wantError: "max_len",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.request)
			if tt.wantValid {
				assert.NoError(t, err, "expected validation to pass but got error")
			} else {
				assert.Error(t, err, "expected validation to fail but got no error")
				if tt.wantError != "" {
					assert.Contains(t, err.Error(), tt.wantError, "error message should contain expected substring")
				}
			}
		})
	}
}
