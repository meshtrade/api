package api_user_v1

import (
	"fmt"
	"strings"
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestAPICredentials_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name        string
		credentials *APICredentials
		wantValid   bool
		wantError   string
	}{
		{
			name: "valid API credentials with all fields",
			credentials: &APICredentials{
				ApiKey: "aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789-_ABCDE", // Exactly 43 chars: 26+10+2+5 = 43
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid API credentials with different base64url chars",
			credentials: &APICredentials{
				ApiKey: "0123456789abcdefghijklmnopqrstuvwxyzABCDE-_", // Exactly 43 chars (shortened by 1)
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid API credentials with all valid base64url chars",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk123-_X", // Exactly 43 chars (42+1)
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		// api_key field tests
		{
			name: "empty api_key - should fail (required)",
			credentials: &APICredentials{
				ApiKey: "",
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "api_key too short - 42 characters",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk123-", // Exactly 42 chars: 26+11+3+1+1 = 42
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "43 characters",
		},
		{
			name: "api_key too long - 44 characters",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk123-_XY", // Exactly 44 chars: 43+1 = 44
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "43 characters",
		},
		{
			name: "api_key with invalid character - space",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef ghijklm-no", // Contains space, 43 chars
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "api_key with invalid character - plus sign",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef+ghijklm-no", // Contains +, 43 chars
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "api_key with invalid character - forward slash",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef/ghijklm-no", // Contains /, 43 chars
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "api_key with invalid character - equals sign",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef=ghijklm-no", // Contains =, 43 chars
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "api_key with invalid character - special symbol",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef@ghijklm-no", // Contains @, 43 chars
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "pattern",
		},
		// group field tests
		{
			name: "empty group - should fail (required)",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
				Group:  "",
			},
			wantValid: false,
			wantError: "group is required",
		},
		{
			name: "invalid group format - wrong prefix",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
				Group:  "group/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Missing 's'
			},
			wantValid: false,
			wantError: "groups/{ulid}",
		},
		{
			name: "invalid group format - invalid ULIDv2 characters",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FIL", // Contains 'I' and 'L'
			},
			wantValid: false,
			wantError: "26-character ULID",
		},
		{
			name: "invalid group format - lowercase ULIDv2",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
				Group:  "groups/01arz3ndektsv4rrffq69g5fav", // Lowercase
			},
			wantValid: false,
			wantError: "26-character ULID",
		},
		{
			name: "group too short - 32 characters total",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FA", // 32 chars total, ULIDv2 part is 25
			},
			wantValid: false,
			wantError: "33",
		},
		{
			name: "group too long - 34 characters total",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 34 chars total
			},
			wantValid: false,
			wantError: "33",
		},
		{
			name: "invalid group format - contains forbidden 'U' character",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAU", // Contains 'U'
			},
			wantValid: false,
			wantError: "26-character ULID",
		},
		{
			name: "invalid group format - contains forbidden 'O' character",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAO", // Contains 'O'
			},
			wantValid: false,
			wantError: "26-character ULID",
		},
		{
			name: "invalid group format - special characters in ULIDv2",
			credentials: &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5F@V", // Contains @
			},
			wantValid: false,
			wantError: "26-character ULID",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.credentials)

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

func TestAPICredentials_APIKeyValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid API key formats (43 characters, base64 URL-safe)
	validAPIKeys := []string{
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",      // Mixed case with underscore and hyphen
		"0123456789012345678901234567890123456789ABC",      // All numbers and letters (43 chars)
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop0",      // All letters and number (43 chars)
		"aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789-_ABCDE",    // Mixed with valid special chars
		"---___000111222333444555666777888999AAABBBC",    // Only valid special chars and alphanumeric
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN012",      // All valid base64url chars represented (43 chars)
	}

	// Invalid API key formats
	invalidAPIKeys := []string{
		"",                                                    // Empty (length test)
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-n",        // 42 chars (too short)
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-nop",      // 44 chars (too long)
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef ghijklm-no",       // Contains space, 43 chars
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef+ghijklm-no",       // Contains + (standard base64, not URL-safe)
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef/ghijklm-no",       // Contains / (standard base64, not URL-safe)
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef=ghijklm-no",       // Contains = (padding)
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef@ghijklm-no",       // Contains @
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef#ghijklm-no",       // Contains #
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef$ghijklm-no",       // Contains $
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef%ghijklm-no",       // Contains %
	}

	// Test valid API keys
	for i, apiKey := range validAPIKeys {
		t.Run(fmt.Sprintf("valid_api_key_%d", i), func(t *testing.T) {
			credentials := &APICredentials{
				ApiKey: apiKey,
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			}

			err := validator.Validate(credentials)
			assert.NoError(t, err, "API key %q should be valid (length: %d)", apiKey, len(apiKey))
		})
	}

	// Test invalid API keys
	for i, apiKey := range invalidAPIKeys {
		t.Run(fmt.Sprintf("invalid_api_key_%d", i), func(t *testing.T) {
			credentials := &APICredentials{
				ApiKey: apiKey,
				Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			}

			err := validator.Validate(credentials)
			assert.Error(t, err, "API key %q should be invalid (length: %d)", apiKey, len(apiKey))
		})
	}
}

func TestAPICredentials_GroupValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid group formats (33 characters total, strict ULIDv2)
	validGroups := []string{
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",   // Standard example
		"groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",   // Another valid ULIDv2
		"groups/0123456789ABCDEFGHJKMNPQRS",   // All valid ULIDv2 characters
		"groups/26CHARS123456789ABCDEFGHJK",   // Different valid pattern (33 chars)
		"groups/ZZZZZZZZZZZZZZZZZZZZZZZZZZ",    // All Z's (valid)
	}

	// Invalid group formats
	invalidGroups := []string{
		"",                                    // Empty (required)
		"group/01ARZ3NDEKTSV4RRFFQ69G5FAV",   // Wrong prefix (missing 's')
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FIL",  // Contains forbidden 'I' and 'L'
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAU",  // Contains forbidden 'U'
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAO",  // Contains forbidden 'O'
		"groups/01arz3ndektsv4rrffq69g5fav",  // Lowercase not allowed
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FA",   // Too short (32 chars total, ULIDv2 part is 25)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // Too long (34 chars total)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F@V",  // Contains @ symbol
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F V",  // Contains space
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F-V",  // Contains hyphen (not in ULIDv2 alphabet)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F_V",  // Contains underscore (not in ULIDv2 alphabet)
		"prefix/01ARZ3NDEKTSV4RRFFQ69G5FAV",  // Wrong prefix entirely
		"01ARZ3NDEKTSV4RRFFQ69G5FAV",         // Missing prefix entirely
	}

	// Test valid groups
	for i, group := range validGroups {
		t.Run(fmt.Sprintf("valid_group_%d", i), func(t *testing.T) {
			credentials := &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
				Group:  group,
			}

			err := validator.Validate(credentials)
			assert.NoError(t, err, "Group %q should be valid (length: %d)", group, len(group))
		})
	}

	// Test invalid groups
	for i, group := range invalidGroups {
		t.Run(fmt.Sprintf("invalid_group_%d", i), func(t *testing.T) {
			credentials := &APICredentials{
				ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
				Group:  group,
			}

			err := validator.Validate(credentials)
			assert.Error(t, err, "Group %q should be invalid (length: %d)", group, len(group))
		})
	}
}

func TestAPICredentials_RequiredFields(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("api_key field is required", func(t *testing.T) {
		credentials := &APICredentials{
			Group: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			// Missing api_key field
		}

		err := validator.Validate(credentials)
		assert.Error(t, err, "API key should be required")
		assert.Contains(t, strings.ToLower(err.Error()), "api_key", "Error should mention api_key field")
		assert.Contains(t, strings.ToLower(err.Error()), "required", "Error should indicate required field")
	})

	t.Run("group field is required", func(t *testing.T) {
		credentials := &APICredentials{
			ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
			// Missing group field
		}

		err := validator.Validate(credentials)
		assert.Error(t, err, "Group should be required")
		assert.Contains(t, strings.ToLower(err.Error()), "group", "Error should mention group field")
		assert.Contains(t, strings.ToLower(err.Error()), "required", "Error should indicate required field")
	})

	t.Run("both fields are required", func(t *testing.T) {
		credentials := &APICredentials{
			// Missing both fields
		}

		err := validator.Validate(credentials)
		assert.Error(t, err, "Both fields should be required")
		// Should have multiple validation errors
	})
}

func TestAPICredentials_EdgeCases(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("exactly 43 characters for api_key", func(t *testing.T) {
		// Test boundary condition - exactly 43 characters
		apiKey := strings.Repeat("A", 43)
		credentials := &APICredentials{
			ApiKey: apiKey,
			Group:  "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
		}

		err := validator.Validate(credentials)
		assert.NoError(t, err, "Exactly 43 character API key should be valid")
	})

	t.Run("exactly 33 characters for group", func(t *testing.T) {
		// Test boundary condition - exactly 33 characters
		group := "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV" // This is exactly 33 chars
		assert.Equal(t, 33, len(group), "Test group should be exactly 33 characters")

		credentials := &APICredentials{
			ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
			Group:  group,
		}

		err := validator.Validate(credentials)
		assert.NoError(t, err, "Exactly 33 character group should be valid")
	})

	t.Run("all valid ULIDv2 characters in group", func(t *testing.T) {
		// Test with all valid ULIDv2 characters: 0123456789ABCDEFGHJKMNPQRSTVWXYZ
		group := "groups/0123456789ABCDEFGHJKMNPQRS" // Uses most valid chars
		credentials := &APICredentials{
			ApiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef_ghijklm-no",
			Group:  group,
		}

		err := validator.Validate(credentials)
		assert.NoError(t, err, "Group with all valid ULIDv2 characters should be valid")
	})
}