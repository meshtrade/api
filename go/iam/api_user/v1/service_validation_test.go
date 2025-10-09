package api_user_v1

import (
	"strings"
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestGetApiUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *GetApiUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with correct name format",
			request: &GetApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2",
			request: &GetApiUserRequest{
				Name: "api_users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
			},
			wantValid: true,
		},
		// name field tests
		{
			name: "empty name - should fail (required)",
			request: &GetApiUserRequest{
				Name: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &GetApiUserRequest{
				Name: "api_user/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Missing 's'
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - wrong resource type",
			request: &GetApiUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Wrong resource
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			request: &GetApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FIL", // Contains 'I' and 'L'
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - lowercase ULIDv2",
			request: &GetApiUserRequest{
				Name: "api_users/01arz3ndektsv4rrffq69g5fav", // Lowercase
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name length - too short",
			request: &GetApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FA", // 35 chars instead of 36
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name length - too long",
			request: &GetApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 37 chars instead of 36
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name format - forbidden characters",
			request: &GetApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAU", // Contains 'U'
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - special characters in ULIDv2",
			request: &GetApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5F@V", // Contains @
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

func TestGetApiUserByKeyHashRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *GetApiUserByKeyHashRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with 44-character key hash",
			request: &GetApiUserByKeyHashRequest{
				KeyHash: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk123456=",
			},
			wantValid: true,
		},
		{
			name: "valid request with different 44-character hash",
			request: &GetApiUserByKeyHashRequest{
				KeyHash: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFG=",
			},
			wantValid: true,
		},
		// key_hash field tests
		{
			name: "empty key_hash - should fail (required)",
			request: &GetApiUserByKeyHashRequest{
				KeyHash: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "key_hash too short - 43 characters",
			request: &GetApiUserByKeyHashRequest{
				KeyHash: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk12345", // 43 chars
			},
			wantValid: false,
			wantError: "44",
		},
		{
			name: "key_hash too long - 45 characters",
			request: &GetApiUserByKeyHashRequest{
				KeyHash: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk12345678", // 45 chars
			},
			wantValid: false,
			wantError: "44",
		},
		{
			name: "key_hash with base64 special characters - should be valid",
			request: &GetApiUserByKeyHashRequest{
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

func TestCreateApiUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *CreateApiUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with APIUser",
			request: &CreateApiUserRequest{
				ApiUser: &APIUser{
					DisplayName: "Test API User",
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Roles:       []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567"},
					State:       APIUserState_API_USER_STATE_ACTIVE,
				},
			},
			wantValid: true,
		},
		// api_user field tests
		{
			name: "missing api_user - should fail (required)",
			request: &CreateApiUserRequest{
				ApiUser: nil,
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "valid request with minimal APIUser",
			request: &CreateApiUserRequest{
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

func TestActivateApiUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *ActivateApiUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with correct name format",
			request: &ActivateApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2",
			request: &ActivateApiUserRequest{
				Name: "api_users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
			},
			wantValid: true,
		},
		// name field tests (same validation as GetApiUserRequest)
		{
			name: "empty name - should fail (required)",
			request: &ActivateApiUserRequest{
				Name: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &ActivateApiUserRequest{
				Name: "api_user/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name length - too short",
			request: &ActivateApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FA",
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name length - too long",
			request: &ActivateApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAVX",
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			request: &ActivateApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FIL",
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

func TestDeactivateApiUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *DeactivateApiUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with correct name format",
			request: &DeactivateApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2",
			request: &DeactivateApiUserRequest{
				Name: "api_users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
			},
			wantValid: true,
		},
		// name field tests (same validation as GetApiUserRequest)
		{
			name: "empty name - should fail (required)",
			request: &DeactivateApiUserRequest{
				Name: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &DeactivateApiUserRequest{
				Name: "api_user/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name length - too short",
			request: &DeactivateApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FA",
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name length - too long",
			request: &DeactivateApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAVX",
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			request: &DeactivateApiUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FIL",
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

	t.Run("ListApiUsersRequest - no validation rules", func(t *testing.T) {
		request := &ListApiUsersRequest{}
		err := validator.Validate(request)
		assert.NoError(t, err, "Empty message should always be valid")
	})

	t.Run("SearchApiUsersRequest - no validation rules on display_name", func(t *testing.T) {
		// Test with empty display_name
		request1 := &SearchApiUsersRequest{
			DisplayName: "",
		}
		err := validator.Validate(request1)
		assert.NoError(t, err, "Empty display_name should be valid (no validation rules)")

		// Test with any display_name value
		request2 := &SearchApiUsersRequest{
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

	t.Run("ListApiUsersResponse - no validation rules", func(t *testing.T) {
		response := &ListApiUsersResponse{
			ApiUsers: []*APIUser{}, // Empty list should be valid
		}
		err := validator.Validate(response)
		assert.NoError(t, err, "Empty response should be valid")

		// Test with API users (the APIUser validation is tested elsewhere)
		response.ApiUsers = []*APIUser{
			{
				Name:        "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test User",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				State:       APIUserState_API_USER_STATE_ACTIVE,
			},
		}
		err = validator.Validate(response)
		assert.NoError(t, err, "Response with API users should be valid")
	})

	t.Run("SearchApiUsersResponse - no validation rules", func(t *testing.T) {
		response := &SearchApiUsersResponse{
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
		"api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV",   // Standard example
		"api_users/01BX5ZZKBKACTAV9WEVGEMMVRZ",   // Another valid ULIDv2
		"api_users/0123456789ABCDEFGHJKMNPQRS",   // All valid ULIDv2 characters
		"api_users/ZZZZZZZZZZZZZZZZZZZZZZZZZZ",    // All Z's (valid ULIDv2 char)
	}

	// Invalid API user name formats
	invalidNames := []string{
		"",                                        // Empty (required)
		"api_user/01ARZ3NDEKTSV4RRFFQ69G5FAV",    // Wrong prefix (missing 's')
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAV",       // Wrong resource type
		"api_users/01ARZ3NDEKTSV4RRFFQ69G5FIL",  // Contains forbidden 'I' and 'L'
		"api_users/01ARZ3NDEKTSV4RRFFQ69G5FAU",  // Contains forbidden 'U'
		"api_users/01ARZ3NDEKTSV4RRFFQ69G5FAO",  // Contains forbidden 'O'
		"api_users/01arz3ndektsv4rrffq69g5fav",  // Lowercase not allowed
		"api_users/01ARZ3NDEKTSV4RRFFQ69G5FA",   // Too short (35 chars)
		"api_users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // Too long (37 chars)
		"api_users/01ARZ3NDEKTSV4RRFFQ69G5F@V",  // Contains @ symbol
		"api_users/01ARZ3NDEKTSV4RRFFQ69G5F V",  // Contains space
		"api_users/01ARZ3NDEKTSV4RRFFQ69G5F-V",  // Contains hyphen (not in ULIDv2 alphabet)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",     // Wrong prefix entirely
		"01ARZ3NDEKTSV4RRFFQ69G5FAV",            // Missing prefix entirely
	}

	// Test valid names using GetApiUserRequest
	for i, name := range validNames {
		t.Run("valid_name_"+string(rune(i+'0')), func(t *testing.T) {
			request := &GetApiUserRequest{
				Name: name,
			}

			err := validator.Validate(request)
			assert.NoError(t, err, "Name format %q should be valid (length: %d)", name, len(name))
		})
	}

	// Test invalid names using GetApiUserRequest
	for i, name := range invalidNames {
		t.Run("invalid_name_"+string(rune(i+'0')), func(t *testing.T) {
			request := &GetApiUserRequest{
				Name: name,
			}

			err := validator.Validate(request)
			assert.Error(t, err, "Name format %q should be invalid (length: %d)", name, len(name))
		})
	}
}
func TestAssignRoleToAPIUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *AssignRoleToAPIUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with correct formats",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // 36 chars - correct format after proto fix
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2 values",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01BX5ZZKBKACTAV9WEVGEMMVRZ", // 36 chars - correct format after proto fix
				Role: "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ/1000001",
			},
			wantValid: true,
		},
		// name field tests
		{
			name: "empty name - should fail (required field)",
			request: &AssignRoleToAPIUserRequest{
				Name: "",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - users prefix (wrong resource type)",
			request: &AssignRoleToAPIUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Should be api_users/ not users/
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - wrong length (too short)",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FA", // 35 chars instead of 36
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "len",
		},
		{
			name: "invalid name format - wrong length (too long)",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 37 chars instead of 36
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "len",
		},
		{
			name: "invalid name format - lowercase chars",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01arz3ndektsv4rrffq69g5fav", // Lowercase not allowed in ULIDv2
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "pattern",
		},
		// role field tests
		{
			name: "empty role - should fail (required)",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Corrected to api_users/
				Role: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid role format - wrong prefix",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Corrected to api_users/
				Role: "group/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567", // Missing 's'
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - wrong length (too short)",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Corrected to api_users/
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/123456", // Missing one digit in role_id
			},
			wantValid: false,
			wantError: "len",
		},
		{
			name: "invalid role format - wrong length (too long)",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Corrected to api_users/
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/12345678", // One extra digit in role_id
			},
			wantValid: false,
			wantError: "len",
		},
		{
			name: "valid role format - role_id starts with 2",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Corrected to api_users/
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/2234567", // Valid under new pattern [1-9][0-9]{6}
			},
			wantValid: true,
		},
		{
			name: "invalid role format - role_id contains letters",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Corrected to api_users/
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/123456A", // Must be digits only
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - ULIDv2 group part too short",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Corrected to api_users/
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FA/1234567", // Missing one char in group ULID
			},
			wantValid: false,
			wantError: "len",
		},
		{
			name: "invalid role format - lowercase chars in group ULID",
			request: &AssignRoleToAPIUserRequest{
				Name: "api_users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Corrected to api_users/
				Role: "groups/01arz3ndektsv4rrffq69g5fav/1234567", // Lowercase not allowed
			},
			wantValid: false,
			wantError: "pattern",
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
