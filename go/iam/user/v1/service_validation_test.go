package user_v1

import (
	"strings"
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestAssignRolesToUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *AssignRolesToUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with all fields",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2 values",
			request: &AssignRolesToUserRequest{
				Name:  "users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
				Roles: []string{"groups/01BX5ZZKBKACTAV9WEVGEMMVRZ/roles/1987654"},
			},
			wantValid: true,
		},
		// name field tests (32 characters total, users/{ULIDv2})
		{
			name: "empty name - should fail (required field)",
			request: &AssignRolesToUserRequest{
				Name:  "",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &AssignRolesToUserRequest{
				Name:  "user/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Missing 's', 31 chars
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "32",
		},
		{
			name: "invalid name format - wrong resource type",
			request: &AssignRolesToUserRequest{
				Name:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FA", // Wrong resource, 32 chars
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FIL", // Contains 'I' and 'L', 32 chars
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - lowercase ULIDv2",
			request: &AssignRolesToUserRequest{
				Name:  "users/01arz3ndektsv4rrffq69g5fav", // Lowercase, 32 chars
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name length - too short",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FA", // 31 chars instead of 32
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "32",
		},
		{
			name: "invalid name length - too long",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 33 chars instead of 32
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "32",
		},
		{
			name: "invalid name format - forbidden characters",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAU", // Contains 'U', 32 chars
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid name format - special characters in ULIDv2",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5F@V", // Contains @, 32 chars
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		// roles field tests (required, 47-48 characters total, groups/{ULIDv2}/roles/{role_id})
		{
			name: "empty role - should fail (required)",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{},
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid role format - wrong prefix",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"group/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567"}, // Missing 's', 40 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - wrong resource type",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"users/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567X"}, // Wrong resource
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - invalid ULIDv2 characters in group",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FIL/roles/1234567"}, // Contains 'I' and 'L'
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - lowercase ULIDv2 in group",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01arz3ndektsv4rrffq69g5fav/roles/1234567"}, // Lowercase
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "valid role format - role ID starting with 2",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/2234567"}, // Starts with 2, valid under new pattern [1-9][0-9]{6}
			},
			wantValid: true,
		},
		{
			name: "invalid role format - wrong role ID format (non-numeric)",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/123456A"}, // Non-numeric role
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - wrong role ID length",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/123456"}, // 6 digits instead of 7, 40 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role length - too short",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FA/roles/1234567"}, // Group part too short, 40 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role length - too long",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX/roles/1234567"}, // Too long overall, 42 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - missing slash separator",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV1234567"}, // Missing slash, 40 chars
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - special characters in group ULIDv2",
			request: &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5F@V/roles/1234567"}, // Contains @
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

func TestAssignRolesToUserRequest_NameFieldValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid user name formats (32 characters total)
	validNames := []string{
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Standard example
		"users/01BX5ZZKBKACTAV9WEVGEMMVRZ", // Another valid ULIDv2
		"users/0123456789ABCDEFGHJKMNPQRS", // All valid ULIDv2 characters
		"users/ZZZZZZZZZZZZZZZZZZZZZZZZZZ", // All Z's (valid ULIDv2 char)
	}

	// Invalid user name formats
	invalidNames := []string{
		"",                                     // Empty (length validation will fail)
		"user/01ARZ3NDEKTSV4RRFFQ69G5FAV",      // Wrong prefix (missing 's')
		"iam/api_users/01ARZ3NDEKTSV4RRFFQ69G", // Wrong resource type
		"users/01ARZ3NDEKTSV4RRFFQ69G5FIL",     // Contains forbidden 'I' and 'L'
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAU",     // Contains forbidden 'U'
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAO",     // Contains forbidden 'O'
		"users/01arz3ndektsv4rrffq69g5fav",     // Lowercase not allowed
		"users/01ARZ3NDEKTSV4RRFFQ69G5FA",      // Too short (31 chars)
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAVX",    // Too long (33 chars)
		"users/01ARZ3NDEKTSV4RRFFQ69G5F@V",     // Contains @ symbol
		"users/01ARZ3NDEKTSV4RRFFQ69G5F V",     // Contains space
		"users/01ARZ3NDEKTSV4RRFFQ69G5F-V",     // Contains hyphen (not in ULIDv2 alphabet)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F",      // Wrong prefix entirely
		"01ARZ3NDEKTSV4RRFFQ69G5FAV",           // Missing prefix entirely
	}

	// Test valid names
	for i, name := range validNames {
		t.Run("valid_name_"+string(rune(i+'0')), func(t *testing.T) {
			request := &AssignRolesToUserRequest{
				Name:  name,
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			}

			err := validator.Validate(request)
			assert.NoError(t, err, "Name format %q should be valid (length: %d)", name, len(name))
		})
	}

	// Test invalid names
	for i, name := range invalidNames {
		t.Run("invalid_name_"+string(rune(i+'0')), func(t *testing.T) {
			request := &AssignRolesToUserRequest{
				Name:  name,
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			}

			err := validator.Validate(request)
			assert.Error(t, err, "Name format %q should be invalid (length: %d)", name, len(name))
		})
	}
}

func TestAssignRolesToUserRequest_RoleFieldValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid role formats (47-48 characters total, groups/{ULIDv2}/roles/{role_id})
	validRoles := []string{
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567", // Standard example
		"groups/01BX5ZZKBKACTAV9WEVGEMMVRZ/roles/1987654", // Another valid ULIDv2
		"groups/0123456789ABCDEFGHJKMNPQRS/roles/1000000", // All valid ULIDv2 characters, min role
		"groups/ZZZZZZZZZZZZZZZZZZZZZZZZZZ/roles/1999999", // All Z's, max role
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1111111", // All 1's in role ID
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1098765", // Mixed digits starting with 1
	}

	// Invalid role formats
	invalidRoles := []string{
		"", // Empty (required field)
		"group/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567",    // Wrong prefix (missing 's')
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567",    // Wrong resource type
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FIL/roles/1234567",   // Contains forbidden 'I' and 'L'
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAU/roles/1234567",   // Contains forbidden 'U'
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAO/roles/1234567",   // Contains forbidden 'O'
		"groups/01arz3ndektsv4rrffq69g5fav/roles/1234567",   // Lowercase not allowed
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FA/roles/1234567",    // Group too short
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX/roles/1234567",  // Too long overall
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/0234567",   // Role ID starts with 0
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/123456A",   // Non-numeric role ID
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/123456",    // Role ID too short (6 digits)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/123456789", // Role ID too long (9 digits)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV1234567",          // Missing /roles/ separator
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F@V/roles/1234567",   // Contains @ symbol
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F V/roles/1234567",   // Contains space
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F-V/roles/1234567",   // Contains hyphen
		"/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567",         // Missing groups prefix
		"01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567",          // Missing groups prefix entirely
	}

	// Test valid roles
	for i, role := range validRoles {
		t.Run("valid_role_"+string(rune(i+'0')), func(t *testing.T) {
			request := &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{role},
			}

			err := validator.Validate(request)
			assert.NoError(t, err, "Role format %q should be valid (length: %d)", role, len(role))
		})
	}

	// Test invalid roles
	for i, role := range invalidRoles {
		t.Run("invalid_role_"+string(rune(i+'0')), func(t *testing.T) {
			request := &AssignRolesToUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{role},
			}

			err := validator.Validate(request)
			assert.Error(t, err, "Role format %q should be invalid (length: %d)", role, len(role))
		})
	}
}

func TestAssignRolesToUserRequest_RequiredFields(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("role field is required", func(t *testing.T) {
		request := &AssignRolesToUserRequest{
			Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			// Missing role field
		}

		err := validator.Validate(request)
		assert.Error(t, err, "Role should be required")
		assert.Contains(t, strings.ToLower(err.Error()), "required", "Error should indicate required field")
	})

	t.Run("name field is required", func(t *testing.T) {
		request := &AssignRolesToUserRequest{
			// Missing name field (empty string)
			Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
		}

		err := validator.Validate(request)
		assert.Error(t, err, "Empty name should fail validation")
		assert.Contains(t, strings.ToLower(err.Error()), "required", "Error should indicate required field")
	})
}

func TestAssignRolesToUserRequest_EdgeCases(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("exactly 32 characters for name", func(t *testing.T) {
		// Test boundary condition - exactly 32 characters
		name := "users/01ARZ3NDEKTSV4RRFFQ69G5FAV" // This is exactly 32 chars
		assert.Equal(t, 32, len(name), "Test name should be exactly 32 characters")

		request := &AssignRolesToUserRequest{
			Name:  name,
			Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
		}

		err := validator.Validate(request)
		assert.NoError(t, err, "Exactly 32 character name should be valid")
	})

	t.Run("exactly 47 characters for role", func(t *testing.T) {
		// Test boundary condition - exactly 47 characters (7-digit role ID)
		role := "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567" // This is 47 chars
		assert.Equal(t, 47, len(role), "Test role should be exactly 47 characters")

		request := &AssignRolesToUserRequest{
			Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			Roles: []string{role},
		}

		err := validator.Validate(request)
		assert.NoError(t, err, "Exactly 47 character role should be valid")
	})

	t.Run("all valid ULIDv2 characters in name", func(t *testing.T) {
		// Test with all valid ULIDv2 characters: 0123456789ABCDEFGHJKMNPQRSTVWXYZ
		name := "users/0123456789ABCDEFGHJKMNPQRS" // Uses most valid chars, 32 chars
		request := &AssignRolesToUserRequest{
			Name:  name,
			Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
		}

		err := validator.Validate(request)
		assert.NoError(t, err, "Name with all valid ULIDv2 characters should be valid")
	})

	t.Run("all valid ULIDv2 characters in role group part", func(t *testing.T) {
		// Test with all valid ULIDv2 characters in role group part
		role := "groups/0123456789ABCDEFGHJKMNPQRS/roles/1234567" // Uses most valid chars, 47 chars
		request := &AssignRolesToUserRequest{
			Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			Roles: []string{role},
		}

		err := validator.Validate(request)
		assert.NoError(t, err, "Role with all valid ULIDv2 characters should be valid")
	})

	t.Run("role ID boundary values", func(t *testing.T) {
		// Test minimum valid role ID (1000000)
		request1 := &AssignRolesToUserRequest{
			Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1000000"},
		}
		err := validator.Validate(request1)
		assert.NoError(t, err, "Role ID 1000000 should be valid")

		// Test maximum valid role ID (1999999)
		request2 := &AssignRolesToUserRequest{
			Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1999999"},
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
			name:    "valid request with no sorting",
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

func TestCreateUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *CreateUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with complete user",
			request: &CreateUserRequest{
				User: &User{
					Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Email: "test@example.com",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with user containing name (should be ignored by server)",
			request: &CreateUserRequest{
				User: &User{
					Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Will be ignored
					Owner: "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
					Email: "user@example.com",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with user containing roles and owners",
			request: &CreateUserRequest{
				User: &User{
					Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Email: "admin@example.com",
					Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567", "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ/roles/1987654"},
				},
			},
			wantValid: true,
		},
		// user field tests (required)
		{
			name: "empty user - should fail (required)",
			request: &CreateUserRequest{
				User: nil,
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "user with invalid owner - should fail",
			request: &CreateUserRequest{
				User: &User{
					Owner: "invalid-owner", // Invalid format
					Email: "test@example.com",
				},
			},
			wantValid: false,
			wantError: "pattern", // This will fail User validation rules
		},
		{
			name: "user with invalid email - should fail",
			request: &CreateUserRequest{
				User: &User{
					Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Email: "invalid-email", // Invalid email format
				},
			},
			wantValid: false,
			wantError: "email", // This will fail User validation rules
		},
		{
			name: "user with empty required fields - should fail",
			request: &CreateUserRequest{
				User: &User{
					// Missing required owner and email
				},
			},
			wantValid: false,
			wantError: "required", // This will fail User validation rules
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

func TestUpdateUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *UpdateUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with complete user",
			request: &UpdateUserRequest{
				User: &User{
					Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner: "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
					Email: "updated@example.com",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with user containing roles and owners",
			request: &UpdateUserRequest{
				User: &User{
					Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Email: "updated-admin@example.com",
					Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567", "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ/roles/1987654"},
				},
			},
			wantValid: true,
		},
		// user field tests (required)
		{
			name: "empty user - should fail (required)",
			request: &UpdateUserRequest{
				User: nil,
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "user with invalid name - should fail",
			request: &UpdateUserRequest{
				User: &User{
					Name:  "invalid-name", // Invalid format
					Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Email: "test@example.com",
				},
			},
			wantValid: false,
			wantError: "format", // This will fail User validation rules
		},
		{
			name: "user with invalid owner - should fail",
			request: &UpdateUserRequest{
				User: &User{
					Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner: "invalid-owner", // Invalid format
					Email: "test@example.com",
				},
			},
			wantValid: false,
			wantError: "pattern", // This will fail User validation rules
		},
		{
			name: "user with invalid email - should fail",
			request: &UpdateUserRequest{
				User: &User{
					Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Email: "invalid-email", // Invalid email format
				},
			},
			wantValid: false,
			wantError: "email", // This will fail User validation rules
		},
		{
			name: "user with empty required fields - should fail",
			request: &UpdateUserRequest{
				User: &User{
					Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					// Missing required owner and email
				},
			},
			wantValid: false,
			wantError: "required", // This will fail User validation rules
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

func TestRevokeRolesFromUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *RevokeRolesFromUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with all fields",
			request: &RevokeRolesFromUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: true,
		},
		{
			name: "valid request with multiple roles",
			request: &RevokeRolesFromUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{
					"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567",
					"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/7654321",
				},
			},
			wantValid: true,
		},
		{
			name: "empty name - should fail",
			request: &RevokeRolesFromUserRequest{
				Name:  "",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &RevokeRolesFromUserRequest{
				Name:  "user/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "empty roles - should fail (required)",
			request: &RevokeRolesFromUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{},
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid role format - wrong prefix",
			request: &RevokeRolesFromUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"group/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - invalid ULIDv2 characters",
			request: &RevokeRolesFromUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FIL/roles/1234567"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - non-numeric role ID",
			request: &RevokeRolesFromUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/123456A"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role length - too short",
			request: &RevokeRolesFromUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FA/roles/1234567"},
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "valid 8-digit role ID",
			request: &RevokeRolesFromUserRequest{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/12345678"},
			},
			wantValid: true,
		},
		{
			name: "mixed valid and invalid roles - should fail",
			request: &RevokeRolesFromUserRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Roles: []string{
					"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/roles/1234567",
					"invalid-role-format",
				},
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
				if tt.wantError != "" {
					assert.Contains(t, err.Error(), tt.wantError, "Error message should contain expected text for case: %s", tt.name)
				}
			}
		})
	}
}
