package user_v1

import (
	"strings"
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestUser_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		user      *User
		wantValid bool
		wantError string
	}{
		{
			name: "valid user with all fields",
			user: &User{
				Name:    "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Owner:   "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Owners:  []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV"},
				Email:   "test@example.com",
				Roles:   []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567"},
			},
			wantValid: true,
		},
		{
			name: "valid user with minimal required fields",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
			},
			wantValid: true,
		},
		{
			name: "valid user with empty system-set fields",
			user: &User{
				Name:   "", // System set, can be empty
				Owner:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Owners: []string{}, // System set, can be empty
				Email:  "test@example.com",
				Roles:  []string{}, // Can be empty
			},
			wantValid: true,
		},
		// name field tests
		{
			name: "valid name format with ULIDv2",
			user: &User{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
			},
			wantValid: true,
		},
		{
			name: "invalid name format - wrong prefix",
			user: &User{
				Name:  "user/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV", 
				Email: "test@example.com",
			},
			wantValid: false,
			wantError: "name must be empty or in the format users/{ULIDv2}",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			user: &User{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FIL", // Contains 'I' and 'L'
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
			},
			wantValid: false,
			wantError: "name must be empty or in the format users/{ULIDv2}",
		},
		{
			name: "invalid name format - wrong length",
			user: &User{
				Name:  "users/01ARZ3NDEKTSV4RRFFQ69G5FA", // 25 chars instead of 26
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
			},
			wantValid: false,
			wantError: "name must be empty or in the format users/{ULIDv2}",
		},
		// owner field tests (required)
		{
			name: "empty owner - should fail (required field)",
			user: &User{
				Owner: "",
				Email: "test@example.com",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid owner format - wrong prefix",
			user: &User{
				Owner: "group/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
			},
			wantValid: false,
			wantError: "groups/",
		},
		{
			name: "invalid owner format - invalid ULIDv2 characters",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FIL", // Contains 'I' and 'L'
				Email: "test@example.com",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid owner length - too short",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FA", // 32 chars instead of 33
				Email: "test@example.com",
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid owner length - too long",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 34 chars instead of 33
				Email: "test@example.com",
			},
			wantValid: false,
			wantError: "length",
		},
		// owners field tests (repeated)
		{
			name: "valid owners array",
			user: &User{
				Owner:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Owners: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV", "groups/01BRZ3NDEKTSV4RRFFQ69G5FAV"},
				Email:  "test@example.com",
			},
			wantValid: true,
		},
		{
			name: "invalid owners item - wrong format",
			user: &User{
				Owner:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Owners: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV", "invalid-format"},
				Email:  "test@example.com",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid owners item - wrong length",
			user: &User{
				Owner:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Owners: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FA"}, // Too short
				Email:  "test@example.com",
			},
			wantValid: false,
			wantError: "length",
		},
		// email field tests (required)
		{
			name: "empty email - should fail (required field)",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid email format",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "invalid-email",
			},
			wantValid: false,
			wantError: "email",
		},
		{
			name: "valid email formats",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "user+tag@subdomain.example.com",
			},
			wantValid: true,
		},
		// roles field tests (repeated, optional)
		{
			name: "valid roles array",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
				Roles: []string{
					"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567",
					"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/1987654",
				},
			},
			wantValid: true,
		},
		{
			name: "invalid role format - wrong pattern",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
				Roles: []string{"invalid-role-format"},
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - wrong group part",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
				Roles: []string{"group/01ARZ3NDEKTSV4RRFFQ69G5FAV/1234567"}, // Missing 's'
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - invalid ULIDv2 in group part",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FIL/1234567"}, // Contains 'I' and 'L'
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role format - wrong role ID format",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV/123456A"}, // Non-numeric role
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid role length - too short",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FA/1234567"}, // Group part too short
			},
			wantValid: false,
			wantError: "length",
		},
		{
			name: "invalid role length - too long",
			user: &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
				Roles: []string{"groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX/1234567"}, // Too long overall
			},
			wantValid: false,
			wantError: "length",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.user)

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

func TestUser_NameFieldValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid ULIDv2 formats for name field
	validNames := []string{
		"",                                    // Empty is allowed (system-set)
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAV",   // Standard example
		"users/01BX5ZZKBKACTAV9WEVGEMMVRZ",   // Another valid ULIDv2
		"users/0123456789ABCDEFGHJKMNPQRS",   // All valid characters
	}

	// Invalid formats for name field  
	invalidNames := []string{
		"user/01ARZ3NDEKTSV4RRFFQ69G5FAV",    // Wrong prefix
		"users/01ARZ3NDEKTSV4RRFFQ69G5FIL",  // Contains forbidden 'I' and 'L'  
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAU",  // Contains forbidden 'U'
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAO",  // Contains forbidden 'O'
		"users/01ARZ3NDEKTSV4RRFFQ69G5FA",   // Too short (25 chars)
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // Too long (27 chars)
		"users/01arz3ndektsv4rrffq69g5fav",  // Lowercase not allowed
		"users/01ARZ3NDEKTSV4RRFFQ69G5F@V",  // Invalid character @
	}

	// Test valid names
	for _, name := range validNames {
		t.Run("valid_name_"+name, func(t *testing.T) {
			user := &User{
				Name:  name,
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
			}

			err := validator.Validate(user)
			assert.NoError(t, err, "Name format %q should be valid", name)
		})
	}

	// Test invalid names
	for _, name := range invalidNames {
		t.Run("invalid_name_"+name, func(t *testing.T) {
			user := &User{
				Name:  name,
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: "test@example.com",
			}

			err := validator.Validate(user)
			assert.Error(t, err, "Name format %q should be invalid", name)
			assert.Contains(t, strings.ToLower(err.Error()), "name", "Error should mention name field")
		})
	}
}

func TestUser_EmailValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid email formats
	validEmails := []string{
		"test@example.com",
		"user.name@example.com",
		"user+tag@example.com",
		"user123@example123.com",
		"test@subdomain.example.com",
		"a@b.co",
		"very.long.email.address@very.long.domain.name.com",
	}

	// Invalid email formats
	invalidEmails := []string{
		"",              // Empty (required field)
		"invalid-email", // No @ symbol
		"@example.com",  // Missing local part
		"test@",         // Missing domain
		"test@.example.com",      // Leading dot in domain
		"test@example.",          // Trailing dot in domain
	}

	// Test valid emails
	for _, email := range validEmails {
		t.Run("valid_email_"+email, func(t *testing.T) {
			user := &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: email,
			}

			err := validator.Validate(user)
			assert.NoError(t, err, "Email %q should be valid", email)
		})
	}

	// Test invalid emails
	for _, email := range invalidEmails {
		t.Run("invalid_email_"+email, func(t *testing.T) {
			user := &User{
				Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Email: email,
			}

			err := validator.Validate(user)
			assert.Error(t, err, "Email %q should be invalid", email)
		})
	}
}

func TestUser_RequiredFields(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("owner field is required", func(t *testing.T) {
		user := &User{
			Email: "test@example.com",
			// Missing owner field
		}

		err := validator.Validate(user)
		assert.Error(t, err, "Owner should be required")
		assert.Contains(t, strings.ToLower(err.Error()), "required", "Error should indicate required field")
	})

	t.Run("email field is required", func(t *testing.T) {
		user := &User{
			Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			// Missing email field
		}

		err := validator.Validate(user)
		assert.Error(t, err, "Email should be required")
		assert.Contains(t, strings.ToLower(err.Error()), "required", "Error should indicate required field")
	})

	t.Run("system-set fields can be empty", func(t *testing.T) {
		user := &User{
			// name field can be empty (system-set)
			Owner:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			Owners: []string{}, // owners field can be empty (system-set)  
			Email:  "test@example.com",
			Roles:  []string{}, // roles field can be empty (optional)
		}

		err := validator.Validate(user)
		assert.NoError(t, err, "System-set fields should be allowed to be empty")
	})
}