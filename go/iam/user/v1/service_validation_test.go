package user_v1

import (
	"strings"
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestAssignRoleToUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *AssignRoleToUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with all fields",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2 values",
			request: &AssignRoleToUserRequest{
				Name: "users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
				Role: "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ/1987654",
			},
			wantValid: true,
		},
		// name field tests (32 characters total, users/{ULIDv2})
		{
			name: "empty name - should fail (not explicitly required but has length validation)",
			request: &AssignRoleToUserRequest{
				Name: "",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "32",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &AssignRoleToUserRequest{
				Name: "user/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Missing 's', 31 chars
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "32",
		},
		{
			name: "invalid name format - wrong resource type",
			request: &AssignRoleToUserRequest{
				Name: "groups/01ARZ3NDEKTSV4RRFFQ69G5FA", // Wrong resource, 32 chars
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FIL", // Contains 'I' and 'L', 32 chars
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - lowercase ULIDv2",
			request: &AssignRoleToUserRequest{
				Name: "users/01arz3ndektsv4rrffq69g5fav", // Lowercase, 32 chars
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name length - too short",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FA", // 31 chars instead of 32
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "32",
		},
		{
			name: "invalid name length - too long",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 33 chars instead of 32
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "32",
		},
		{
			name: "invalid name format - forbidden characters",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAU", // Contains 'U', 32 chars
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - special characters in ULIDv2",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5F@V", // Contains @, 32 chars
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			},
			wantValid: false,
			wantError: "pattern",
		},
		// role field tests (required, 41 characters total, groups/{ULIDv2}/1{role_id})
		{
			name: "empty role - should fail (required)",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid role format - wrong prefix",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "group/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567", // Missing 's', 40 chars
			},
			wantValid: false,
			wantError: "41",
		},
		{
			name: "invalid role format - wrong resource type",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567X", // Wrong resource, 41 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - invalid ULIDv2 characters in group",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FIL/1234567", // Contains 'I' and 'L', 41 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - lowercase ULIDv2 in group",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/01arz3ndektsv4rrffq69g5fav/1234567", // Lowercase, 41 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - wrong role ID format (not starting with 1)",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/2234567", // Starts with 2, 41 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - wrong role ID format (non-numeric)",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/123456A", // Non-numeric role, 41 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - wrong role ID length",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/123456", // 6 digits instead of 7, 40 chars
			},
			wantValid: false,
			wantError: "41",
		},
		{
			name: "invalid role length - too short",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FA/1234567", // Group part too short, 40 chars
			},
			wantValid: false,
			wantError: "41",
		},
		{
			name: "invalid role length - too long",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX/1234567", // Too long overall, 42 chars
			},
			wantValid: false,
			wantError: "41",
		},
		{
			name: "invalid role format - missing slash separator",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV1234567", // Missing slash, 40 chars
			},
			wantValid: false,
			wantError: "41",
		},
		{
			name: "invalid role format - special characters in group ULIDv2",
			request: &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5F@V/1234567", // Contains @, 41 chars
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

func TestAssignRoleToUserRequest_NameFieldValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid user name formats (32 characters total)
	validNames := []string{
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAV",   // Standard example
		"users/01BX5ZZKBKACTAV9WEVGEMMVRZ",   // Another valid ULIDv2
		"users/0123456789ABCDEFGHJKMNPQRS",   // All valid ULIDv2 characters
		"users/ZZZZZZZZZZZZZZZZZZZZZZZZZZ",    // All Z's (valid ULIDv2 char)
	}

	// Invalid user name formats
	invalidNames := []string{
		"",                                    // Empty (length validation will fail)
		"user/01ARZ3NDEKTSV4RRFFQ69G5FAV",    // Wrong prefix (missing 's')
		"api_users/01ARZ3NDEKTSV4RRFFQ69G",   // Wrong resource type
		"users/01ARZ3NDEKTSV4RRFFQ69G5FIL",  // Contains forbidden 'I' and 'L'
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAU",  // Contains forbidden 'U'
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAO",  // Contains forbidden 'O'
		"users/01arz3ndektsv4rrffq69g5fav",  // Lowercase not allowed
		"users/01ARZ3NDEKTSV4RRFFQ69G5FA",   // Too short (31 chars)
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // Too long (33 chars)
		"users/01ARZ3NDEKTSV4RRFFQ69G5F@V",  // Contains @ symbol
		"users/01ARZ3NDEKTSV4RRFFQ69G5F V",  // Contains space
		"users/01ARZ3NDEKTSV4RRFFQ69G5F-V",  // Contains hyphen (not in ULIDv2 alphabet)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F",   // Wrong prefix entirely
		"01ARZ3NDEKTSV4RRFFQ69G5FAV",        // Missing prefix entirely
	}

	// Test valid names
	for i, name := range validNames {
		t.Run("valid_name_"+string(rune(i+'0')), func(t *testing.T) {
			request := &AssignRoleToUserRequest{
				Name: name,
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			}

			err := validator.Validate(request)
			assert.NoError(t, err, "Name format %q should be valid (length: %d)", name, len(name))
		})
	}

	// Test invalid names
	for i, name := range invalidNames {
		t.Run("invalid_name_"+string(rune(i+'0')), func(t *testing.T) {
			request := &AssignRoleToUserRequest{
				Name: name,
				Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
			}

			err := validator.Validate(request)
			assert.Error(t, err, "Name format %q should be invalid (length: %d)", name, len(name))
		})
	}
}

func TestAssignRoleToUserRequest_RoleFieldValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid role formats (41 characters total, groups/{ULIDv2}/1{6-digit-number})
	validRoles := []string{
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",   // Standard example
		"groups/01BX5ZZKBKACTAV9WEVGEMMVRZ/1987654",   // Another valid ULIDv2
		"groups/0123456789ABCDEFGHJKMNPQRS/1000000",   // All valid ULIDv2 characters, min role
		"groups/ZZZZZZZZZZZZZZZZZZZZZZZZZZ/1999999",    // All Z's, max role
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1111111",   // All 1's in role ID
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1098765",   // Mixed digits starting with 1
	}

	// Invalid role formats
	invalidRoles := []string{
		"",                                              // Empty (required field)
		"group/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",     // Wrong prefix (missing 's')
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",     // Wrong resource type
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FIL/1234567",   // Contains forbidden 'I' and 'L'
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAU/1234567",   // Contains forbidden 'U'
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAO/1234567",   // Contains forbidden 'O'
		"groups/01arz3ndektsv4rrffq69g5fav/1234567",   // Lowercase not allowed
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FA/1234567",    // Group too short (40 chars total)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX/1234567",  // Too long overall (42 chars)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/2234567",   // Role ID starts with 2
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/0234567",   // Role ID starts with 0
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/123456A",   // Non-numeric role ID
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/123456",    // Role ID too short (6 digits)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/12345678",  // Role ID too long (8 digits)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV1234567",    // Missing slash separator
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F@V/1234567",   // Contains @ symbol
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F V/1234567",   // Contains space
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F-V/1234567",   // Contains hyphen
		"/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",         // Missing groups prefix
		"01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",          // Missing groups prefix entirely
	}

	// Test valid roles
	for i, role := range validRoles {
		t.Run("valid_role_"+string(rune(i+'0')), func(t *testing.T) {
			request := &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: role,
			}

			err := validator.Validate(request)
			assert.NoError(t, err, "Role format %q should be valid (length: %d)", role, len(role))
		})
	}

	// Test invalid roles
	for i, role := range invalidRoles {
		t.Run("invalid_role_"+string(rune(i+'0')), func(t *testing.T) {
			request := &AssignRoleToUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Role: role,
			}

			err := validator.Validate(request)
			assert.Error(t, err, "Role format %q should be invalid (length: %d)", role, len(role))
		})
	}
}

func TestAssignRoleToUserRequest_RequiredFields(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("role field is required", func(t *testing.T) {
		request := &AssignRoleToUserRequest{
			Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			// Missing role field
		}

		err := validator.Validate(request)
		assert.Error(t, err, "Role should be required")
		assert.Contains(t, strings.ToLower(err.Error()), "required", "Error should indicate required field")
	})

	t.Run("name field has length validation (acts as implicit required)", func(t *testing.T) {
		request := &AssignRoleToUserRequest{
			// Missing name field (empty string)
			Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
		}

		err := validator.Validate(request)
		assert.Error(t, err, "Empty name should fail length validation")
		assert.Contains(t, err.Error(), "32", "Error should mention length requirement")
	})
}

func TestAssignRoleToUserRequest_EdgeCases(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("exactly 32 characters for name", func(t *testing.T) {
		// Test boundary condition - exactly 32 characters
		name := "users/01ARZ3NDEKTSV4RRFFQ69G5FAV" // This is exactly 32 chars
		assert.Equal(t, 32, len(name), "Test name should be exactly 32 characters")

		request := &AssignRoleToUserRequest{
			Name: name,
			Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
		}

		err := validator.Validate(request)
		assert.NoError(t, err, "Exactly 32 character name should be valid")
	})

	t.Run("exactly 41 characters for role", func(t *testing.T) {
		// Test boundary condition - exactly 41 characters
		role := "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567" // This is exactly 41 chars
		assert.Equal(t, 41, len(role), "Test role should be exactly 41 characters")

		request := &AssignRoleToUserRequest{
			Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			Role: role,
		}

		err := validator.Validate(request)
		assert.NoError(t, err, "Exactly 41 character role should be valid")
	})

	t.Run("all valid ULIDv2 characters in name", func(t *testing.T) {
		// Test with all valid ULIDv2 characters: 0123456789ABCDEFGHJKMNPQRSTVWXYZ
		name := "users/0123456789ABCDEFGHJKMNPQRS" // Uses most valid chars, 32 chars
		request := &AssignRoleToUserRequest{
			Name: name,
			Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
		}

		err := validator.Validate(request)
		assert.NoError(t, err, "Name with all valid ULIDv2 characters should be valid")
	})

	t.Run("all valid ULIDv2 characters in role group part", func(t *testing.T) {
		// Test with all valid ULIDv2 characters in role group part
		role := "groups/0123456789ABCDEFGHJKMNPQRS/1234567" // Uses most valid chars, 41 chars
		request := &AssignRoleToUserRequest{
			Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			Role: role,
		}

		err := validator.Validate(request)
		assert.NoError(t, err, "Role with all valid ULIDv2 characters should be valid")
	})

	t.Run("role ID boundary values", func(t *testing.T) {
		// Test minimum valid role ID (1000000)
		request1 := &AssignRoleToUserRequest{
			Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1000000",
		}
		err := validator.Validate(request1)
		assert.NoError(t, err, "Role ID 1000000 should be valid")

		// Test maximum valid role ID (1999999)
		request2 := &AssignRoleToUserRequest{
			Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			Role: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1999999",
		}
		err = validator.Validate(request2)
		assert.NoError(t, err, "Role ID 1999999 should be valid")
	})
}

func TestGetUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *GetUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with all fields",
			request: &GetUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2",
			request: &GetUserRequest{
				Name: "users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
			},
			wantValid: true,
		},
		// name field tests (required, 32 characters total, users/{ULIDv2})
		{
			name: "empty name - should fail (required)",
			request: &GetUserRequest{
				Name: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &GetUserRequest{
				Name: "user/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Missing 's', 31 chars
			},
			wantValid: false,
			wantError: "32",
		},
		{
			name: "invalid name format - wrong resource type",
			request: &GetUserRequest{
				Name: "groups/01ARZ3NDEKTSV4RRFFQ69G5F", // Wrong resource, 32 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			request: &GetUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FIL", // Contains 'I' and 'L', 32 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - lowercase ULIDv2",
			request: &GetUserRequest{
				Name: "users/01arz3ndektsv4rrffq69g5fav", // Lowercase, 32 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name length - too short",
			request: &GetUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FA", // 31 chars instead of 32
			},
			wantValid: false,
			wantError: "32",
		},
		{
			name: "invalid name length - too long",
			request: &GetUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 33 chars instead of 32
			},
			wantValid: false,
			wantError: "32",
		},
		{
			name: "invalid name format - forbidden characters",
			request: &GetUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAU", // Contains 'U', 32 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - special characters in ULIDv2",
			request: &GetUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5F@V", // Contains @, 32 chars
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

func TestListUsersRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *ListUsersRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with no sorting",
			request: &ListUsersRequest{
				// No sorting field set
			},
			wantValid: true,
		},
		{
			name: "valid request with empty sorting",
			request: &ListUsersRequest{
				Sorting: &ListUsersRequest_Sorting{},
			},
			wantValid: true,
		},
		{
			name: "valid request with email field sorting",
			request: &ListUsersRequest{
				Sorting: &ListUsersRequest_Sorting{
					Field: "email",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with empty field sorting",
			request: &ListUsersRequest{
				Sorting: &ListUsersRequest_Sorting{
					Field: "",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with email field and ASC order",
			request: &ListUsersRequest{
				Sorting: &ListUsersRequest_Sorting{
					Field: "email",
					Order: 1, // SORTING_ORDER_ASC
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with email field and DESC order",
			request: &ListUsersRequest{
				Sorting: &ListUsersRequest_Sorting{
					Field: "email",
					Order: 2, // SORTING_ORDER_DESC
				},
			},
			wantValid: true,
		},
		// Invalid sorting field tests
		{
			name: "invalid sorting field - not allowed",
			request: &ListUsersRequest{
				Sorting: &ListUsersRequest_Sorting{
					Field: "name",
				},
			},
			wantValid: false,
			wantError: "field",
		},
		{
			name: "invalid sorting field - random value",
			request: &ListUsersRequest{
				Sorting: &ListUsersRequest_Sorting{
					Field: "invalid_field",
				},
			},
			wantValid: false,
			wantError: "field",
		},
		{
			name: "invalid sorting field - numeric value",
			request: &ListUsersRequest{
				Sorting: &ListUsersRequest_Sorting{
					Field: "123",
				},
			},
			wantValid: false,
			wantError: "field",
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

func TestListUsersResponse_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *ListUsersResponse
		wantValid bool
		wantError string
	}{
		{
			name: "valid empty response",
			request: &ListUsersResponse{
				Users: nil,
			},
			wantValid: true,
		},
		{
			name: "valid response with empty users list",
			request: &ListUsersResponse{
				Users: []*User{},
			},
			wantValid: true,
		},
		{
			name: "valid response with single user",
			request: &ListUsersResponse{
				Users: []*User{
					{
						Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Email: "test@example.com",
					},
				},
			},
			wantValid: true,
		},
		{
			name: "valid response with multiple users",
			request: &ListUsersResponse{
				Users: []*User{
					{
						Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Email: "user1@example.com",
					},
					{
						Name:  "users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						Owner: "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						Email: "user2@example.com",
					},
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

func TestSearchUsersRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *SearchUsersRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with email search",
			request: &SearchUsersRequest{
				Email: "test@example.com",
			},
			wantValid: true,
		},
		{
			name: "valid request with partial email search",
			request: &SearchUsersRequest{
				Email: "test",
			},
			wantValid: true,
		},
		{
			name: "valid request with empty email (no validation rules)",
			request: &SearchUsersRequest{
				Email: "",
			},
			wantValid: true,
		},
		{
			name: "valid request with domain search",
			request: &SearchUsersRequest{
				Email: "@example.com",
			},
			wantValid: true,
		},
		{
			name: "valid request with special characters",
			request: &SearchUsersRequest{
				Email: "user+tag@domain.co.uk",
			},
			wantValid: true,
		},
		{
			name: "valid request with email search and no sorting",
			request: &SearchUsersRequest{
				Email: "test@example.com",
				// No sorting field set
			},
			wantValid: true,
		},
		{
			name: "valid request with email search and empty sorting",
			request: &SearchUsersRequest{
				Email: "test@example.com",
				Sorting: &SearchUsersRequest_Sorting{},
			},
			wantValid: true,
		},
		{
			name: "valid request with email search and email field sorting",
			request: &SearchUsersRequest{
				Email: "test@example.com",
				Sorting: &SearchUsersRequest_Sorting{
					Field: "email",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with email search and empty field sorting",
			request: &SearchUsersRequest{
				Email: "test@example.com",
				Sorting: &SearchUsersRequest_Sorting{
					Field: "",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with email search and sorting with ASC order",
			request: &SearchUsersRequest{
				Email: "test@example.com",
				Sorting: &SearchUsersRequest_Sorting{
					Field: "email",
					Order: 1, // SORTING_ORDER_ASC
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with email search and sorting with DESC order",
			request: &SearchUsersRequest{
				Email: "test@example.com",
				Sorting: &SearchUsersRequest_Sorting{
					Field: "email",
					Order: 2, // SORTING_ORDER_DESC
				},
			},
			wantValid: true,
		},
		// Invalid sorting field tests
		{
			name: "invalid sorting field - not allowed",
			request: &SearchUsersRequest{
				Email: "test@example.com",
				Sorting: &SearchUsersRequest_Sorting{
					Field: "name",
				},
			},
			wantValid: false,
			wantError: "field",
		},
		{
			name: "invalid sorting field - random value",
			request: &SearchUsersRequest{
				Email: "test@example.com",
				Sorting: &SearchUsersRequest_Sorting{
					Field: "invalid_field",
				},
			},
			wantValid: false,
			wantError: "field",
		},
		{
			name: "invalid sorting field - numeric value",
			request: &SearchUsersRequest{
				Email: "test@example.com",
				Sorting: &SearchUsersRequest_Sorting{
					Field: "123",
				},
			},
			wantValid: false,
			wantError: "field",
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

func TestSearchUsersResponse_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *SearchUsersResponse
		wantValid bool
		wantError string
	}{
		{
			name: "valid empty response",
			request: &SearchUsersResponse{
				Users: nil,
			},
			wantValid: true,
		},
		{
			name: "valid response with empty users list",
			request: &SearchUsersResponse{
				Users: []*User{},
			},
			wantValid: true,
		},
		{
			name: "valid response with single user",
			request: &SearchUsersResponse{
				Users: []*User{
					{
						Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Email: "test@example.com",
					},
				},
			},
			wantValid: true,
		},
		{
			name: "valid response with multiple users",
			request: &SearchUsersResponse{
				Users: []*User{
					{
						Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Email: "search1@example.com",
					},
					{
						Name:  "users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						Owner: "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						Email: "search2@example.com",
					},
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