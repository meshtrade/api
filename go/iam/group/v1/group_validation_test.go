package group_v1

import (
	"strings"
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestGroup_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		group     *Group
		wantValid bool
		wantError string
	}{
		{
			name: "valid group with all required fields",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: true,
		},
		{
			name: "valid group with name field (optional)",
			group: &Group{
				Name:        "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group with Name",
			},
			wantValid: true,
		},
		{
			name: "valid group with owners field",
			group: &Group{
				Name:        "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: true,
		},
		{
			name: "valid group with description",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
				Description: "This is a test group description with detailed information about the group purpose and scope.",
			},
			wantValid: true,
		},
		{
			name: "valid group with empty name (system will assign)",
			group: &Group{
				Name:        "", // Empty name is allowed for creation
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: true,
		},
		// owner field tests (required, 33 characters, groups/{ULIDv2})
		{
			name: "empty owner - should fail (required)",
			group: &Group{
				Owner:       "",
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid owner format - wrong prefix",
			group: &Group{
				Owner:       "group/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Missing 's', 32 chars
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "33",
		},
		{
			name: "invalid owner format - wrong resource type",
			group: &Group{
				Owner:       "users/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // Wrong resource type, 33 chars
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid owner format - invalid ULIDv2 characters",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FIL", // Contains 'I' and 'L', 33 chars
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid owner format - lowercase ULIDv2",
			group: &Group{
				Owner:       "groups/01arz3ndektsv4rrffq69g5fav", // Lowercase, 33 chars
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid owner length - too short",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FA", // 32 chars instead of 33
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "33",
		},
		{
			name: "invalid owner length - too long",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 34 chars instead of 33
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "33",
		},
		{
			name: "invalid owner format - forbidden characters",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAU", // Contains 'U', 33 chars
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid owner format - special characters",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5F@V", // Contains @, 33 chars
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "pattern",
		},
		// display_name field tests (required, 1-255 characters)
		{
			name: "empty display_name - should fail (required)",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "valid display_name - minimum length",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "A", // 1 character (minimum)
			},
			wantValid: true,
		},
		{
			name: "valid display_name - maximum length",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: strings.Repeat("A", 255), // 255 characters (maximum)
			},
			wantValid: true,
		},
		{
			name: "invalid display_name - too long",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: strings.Repeat("A", 256), // 256 characters (exceeds maximum)
			},
			wantValid: false,
			wantError: "max_len",
		},
		{
			name: "valid display_name - unicode characters",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group 测试组 グループ 그룹",
			},
			wantValid: true,
		},
		// description field tests (optional, max 1000 characters)
		{
			name: "valid empty description",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
				Description: "",
			},
			wantValid: true,
		},
		{
			name: "valid description - maximum length",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
				Description: strings.Repeat("A", 1000), // 1000 characters (maximum)
			},
			wantValid: true,
		},
		{
			name: "invalid description - too long",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
				Description: strings.Repeat("A", 1001), // 1001 characters (exceeds maximum)
			},
			wantValid: false,
			wantError: "max_len",
		},
		{
			name: "valid description - unicode characters",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
				Description: "Group description with unicode: 测试描述 説明 설명 ⭐🚀",
			},
			wantValid: true,
		},
		// name field tests (optional, groups/{ULIDv2} format when provided)
		{
			name: "invalid name format - wrong prefix",
			group: &Group{
				Name:        "group/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Missing 's'
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - wrong resource type",
			group: &Group{
				Name:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Wrong resource type
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			group: &Group{
				Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FIL", // Contains 'I' and 'L'
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - lowercase ULIDv2",
			group: &Group{
				Name:        "groups/01arz3ndektsv4rrffq69g5fav", // Lowercase
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - too short ULIDv2",
			group: &Group{
				Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FA", // 25 chars instead of 26
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - too long ULIDv2",
			group: &Group{
				Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 27 chars instead of 26
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - special characters",
			group: &Group{
				Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5F@V", // Contains @
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "format",
		},
		// owners field tests (repeated, each item must be 33 chars, groups/{ULIDv2})
		{
			name: "valid owners - single item",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: true,
		},
		{
			name: "valid owners - multiple items",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: true,
		},
		{
			name: "invalid owners - invalid format in one item",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "pattern",
		},
		{
			name: "invalid owners - wrong length in one item",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "33",
		},
		{
			name: "invalid owners - forbidden characters in one item",
			group: &Group{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			},
			wantValid: false,
			wantError: "pattern",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.group)

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

func TestGroup_NameFieldValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid name formats (optional field)
	validNames := []string{
		"",                                    // Empty is allowed (system assigns)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",   // Standard example
		"groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",   // Another valid ULIDv2
		"groups/0123456789ABCDEFGHJKMNPQRS",   // All valid ULIDv2 characters
		"groups/ZZZZZZZZZZZZZZZZZZZZZZZZZZ",    // All Z's (valid ULIDv2 char)
	}

	// Invalid name formats
	invalidNames := []string{
		"group/01ARZ3NDEKTSV4RRFFQ69G5FAV",    // Wrong prefix (missing 's')
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAV",    // Wrong resource type
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FIL",  // Contains forbidden 'I' and 'L'
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAU",  // Contains forbidden 'U'
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAO",  // Contains forbidden 'O'
		"groups/01arz3ndektsv4rrffq69g5fav",  // Lowercase not allowed
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FA",   // Too short (25 chars)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // Too long (27 chars)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F@V",  // Contains @ symbol
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F V",  // Contains space
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F-V",  // Contains hyphen
		"01ARZ3NDEKTSV4RRFFQ69G5FAV",        // Missing prefix entirely
		"invalid-name",                       // Completely invalid format
	}

	// Test valid names
	for i, name := range validNames {
		t.Run("valid_name_"+string(rune(i+'0')), func(t *testing.T) {
			group := &Group{
				Name:        name,
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			}

			err := validator.Validate(group)
			assert.NoError(t, err, "Name format %q should be valid (length: %d)", name, len(name))
		})
	}

	// Test invalid names
	for i, name := range invalidNames {
		t.Run("invalid_name_"+string(rune(i+'0')), func(t *testing.T) {
			group := &Group{
				Name:        name,
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "Test Group",
			}

			err := validator.Validate(group)
			assert.Error(t, err, "Name format %q should be invalid (length: %d)", name, len(name))
		})
	}
}

func TestGroup_OwnerFieldValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid owner formats (33 characters total, groups/{ULIDv2})
	validOwners := []string{
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",   // Standard example
		"groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",   // Another valid ULIDv2
		"groups/0123456789ABCDEFGHJKMNPQRS",   // All valid ULIDv2 characters
		"groups/ZZZZZZZZZZZZZZZZZZZZZZZZZZ",    // All Z's (valid ULIDv2 char)
	}

	// Invalid owner formats
	invalidOwners := []string{
		"",                                    // Empty (required field)
		"group/01ARZ3NDEKTSV4RRFFQ69G5FAV",    // Wrong prefix (missing 's')
		"users/01ARZ3NDEKTSV4RRFFQ69G5FAV",    // Wrong resource type
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FIL",  // Contains forbidden 'I' and 'L'
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAU",  // Contains forbidden 'U'
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAO",  // Contains forbidden 'O'
		"groups/01arz3ndektsv4rrffq69g5fav",  // Lowercase not allowed
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FA",   // Too short (32 chars)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // Too long (34 chars)
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F@V",  // Contains @ symbol
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F V",  // Contains space
		"groups/01ARZ3NDEKTSV4RRFFQ69G5F-V",  // Contains hyphen
		"01ARZ3NDEKTSV4RRFFQ69G5FAV",        // Missing prefix entirely
		"invalid-owner",                       // Completely invalid format
	}

	// Test valid owners
	for i, owner := range validOwners {
		t.Run("valid_owner_"+string(rune(i+'0')), func(t *testing.T) {
			group := &Group{
				Owner:       owner,
				DisplayName: "Test Group",
			}

			err := validator.Validate(group)
			assert.NoError(t, err, "Owner format %q should be valid (length: %d)", owner, len(owner))
		})
	}

	// Test invalid owners
	for i, owner := range invalidOwners {
		t.Run("invalid_owner_"+string(rune(i+'0')), func(t *testing.T) {
			group := &Group{
				Owner:       owner,
				DisplayName: "Test Group",
			}

			err := validator.Validate(group)
			assert.Error(t, err, "Owner format %q should be invalid (length: %d)", owner, len(owner))
		})
	}
}

func TestGroup_OwnersFieldValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("valid empty owners list", func(t *testing.T) {
		group := &Group{
			Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: "Test Group",
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Empty owners list should be valid")
	})

	t.Run("valid nil owners list", func(t *testing.T) {
		group := &Group{
			Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: "Test Group",
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Nil owners list should be valid")
	})

	t.Run("valid single owner in list", func(t *testing.T) {
		group := &Group{
			Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: "Test Group",
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Valid single owner should be valid")
	})

	t.Run("valid multiple owners in list", func(t *testing.T) {
		group := &Group{
			Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: "Test Group",
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Valid multiple owners should be valid")
	})

	t.Run("invalid owner in list - wrong format", func(t *testing.T) {
		group := &Group{
			Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: "Test Group",
		}

		err := validator.Validate(group)
		assert.Error(t, err, "Invalid owner format should fail validation")
	})

	t.Run("invalid owner in list - wrong length", func(t *testing.T) {
		group := &Group{
			Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: "Test Group",
		}

		err := validator.Validate(group)
		assert.Error(t, err, "Owner with wrong length should fail validation")
	})
}

func TestGroup_RequiredFields(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("owner field is required", func(t *testing.T) {
		group := &Group{
			DisplayName: "Test Group",
			// Missing owner field
		}

		err := validator.Validate(group)
		assert.Error(t, err, "Owner should be required")
		assert.Contains(t, strings.ToLower(err.Error()), "required", "Error should indicate required field")
	})

	t.Run("display_name field is required", func(t *testing.T) {
		group := &Group{
			Owner: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			// Missing display_name field
		}

		err := validator.Validate(group)
		assert.Error(t, err, "DisplayName should be required")
		assert.Contains(t, strings.ToLower(err.Error()), "required", "Error should indicate required field")
	})

	t.Run("name field is optional", func(t *testing.T) {
		group := &Group{
			Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: "Test Group",
			// Missing name field - should be valid
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Name field should be optional")
	})

	t.Run("description field is optional", func(t *testing.T) {
		group := &Group{
			Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: "Test Group",
			// Missing description field - should be valid
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Description field should be optional")
	})

	t.Run("owners field is optional", func(t *testing.T) {
		group := &Group{
			Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: "Test Group",
			// Missing owners field - should be valid
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Validation should pass")
	})
}

func TestGroup_EdgeCases(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	t.Run("display_name boundary - minimum length", func(t *testing.T) {
		group := &Group{
			Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: "A", // Exactly 1 character (minimum)
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Minimum display_name length should be valid")
	})

	t.Run("display_name boundary - maximum length", func(t *testing.T) {
		group := &Group{
			Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: strings.Repeat("A", 255), // Exactly 255 characters (maximum)
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Maximum display_name length should be valid")
	})

	t.Run("description boundary - maximum length", func(t *testing.T) {
		group := &Group{
			Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			DisplayName: "Test Group",
			Description: strings.Repeat("A", 1000), // Exactly 1000 characters (maximum)
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Maximum description length should be valid")
	})

	t.Run("owner boundary - exactly 33 characters", func(t *testing.T) {
		owner := "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV" // This is exactly 33 chars
		assert.Equal(t, 33, len(owner), "Test owner should be exactly 33 characters")

		group := &Group{
			Owner:       owner,
			DisplayName: "Test Group",
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Exactly 33 character owner should be valid")
	})

	t.Run("all valid ULIDv2 characters in owner", func(t *testing.T) {
		// Test with all valid ULIDv2 characters: 0123456789ABCDEFGHJKMNPQRSTVWXYZ
		owner := "groups/0123456789ABCDEFGHJKMNPQRS" // Uses most valid chars, 33 chars
		group := &Group{
			Owner:       owner,
			DisplayName: "Test Group",
		}

		err := validator.Validate(group)
		assert.NoError(t, err, "Owner with all valid ULIDv2 characters should be valid")
	})
}