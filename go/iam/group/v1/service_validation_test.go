package group_v1

import (
	"strings"
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCreateGroupRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *CreateGroupRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with complete group",
			request: &CreateGroupRequest{
				Group: &Group{
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					DisplayName: "Test Group",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with group containing name (should be ignored by server)",
			request: &CreateGroupRequest{
				Group: &Group{
					Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Will be ignored
					Owner:       "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
					DisplayName: "Test Group with Name",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with group containing owners and description",
			request: &CreateGroupRequest{
				Group: &Group{
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					DisplayName: "Admin Group",
					Description: "This is a test group for administrative purposes.",
				},
			},
			wantValid: true,
		},
		// group field tests (required)
		{
			name: "empty group - should fail (required)",
			request: &CreateGroupRequest{
				Group: nil,
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "group with invalid owner - should fail",
			request: &CreateGroupRequest{
				Group: &Group{
					Owner:       "invalid-owner", // Invalid format
					DisplayName: "Test Group",
				},
			},
			wantValid: false,
			wantError: "pattern", // This will fail Group validation rules
		},
		{
			name: "group with invalid display_name - should fail",
			request: &CreateGroupRequest{
				Group: &Group{
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					DisplayName: "", // Empty display name
				},
			},
			wantValid: false,
			wantError: "required", // This will fail Group validation rules
		},
		{
			name: "group with empty required fields - should fail",
			request: &CreateGroupRequest{
				Group: &Group{
					// Missing required owner and display_name
				},
			},
			wantValid: false,
			wantError: "required", // This will fail Group validation rules
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

func TestUpdateGroupRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *UpdateGroupRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with complete group",
			request: &UpdateGroupRequest{
				Group: &Group{
					Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner:       "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
					DisplayName: "Updated Group Name",
					Description: "Updated description",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with minimal updates",
			request: &UpdateGroupRequest{
				Group: &Group{
					Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner:       "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
					DisplayName: "New Display Name",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with owners field (system maintained)",
			request: &UpdateGroupRequest{
				Group: &Group{
					Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner:       "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
					DisplayName: "Updated Group",
				},
			},
			wantValid: true,
		},
		// group field tests (required)
		{
			name: "empty group - should fail (required)",
			request: &UpdateGroupRequest{
				Group: nil,
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "group with invalid name - should fail",
			request: &UpdateGroupRequest{
				Group: &Group{
					Name:        "invalid-name", // Invalid format
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					DisplayName: "Updated Group",
				},
			},
			wantValid: false,
			wantError: "format", // This will fail Group validation rules
		},
		{
			name: "group with invalid owner - should fail",
			request: &UpdateGroupRequest{
				Group: &Group{
					Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner:       "invalid-owner", // Invalid format
					DisplayName: "Updated Group",
				},
			},
			wantValid: false,
			wantError: "pattern", // This will fail Group validation rules
		},
		{
			name: "group with invalid display_name - should fail",
			request: &UpdateGroupRequest{
				Group: &Group{
					Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					DisplayName: strings.Repeat("A", 256), // Too long
				},
			},
			wantValid: false,
			wantError: "max_len", // This will fail Group validation rules
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

func TestListGroupsRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *ListGroupsRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with no sorting",
			request: &ListGroupsRequest{
				// No sorting field set
			},
			wantValid: true,
		},
		{
			name: "valid request with empty sorting",
			request: &ListGroupsRequest{
				Sorting: &ListGroupsRequest_Sorting{},
			},
			wantValid: true,
		},
		{
			name: "valid request with name field sorting",
			request: &ListGroupsRequest{
				Sorting: &ListGroupsRequest_Sorting{
					Field: "name",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with display_name field sorting",
			request: &ListGroupsRequest{
				Sorting: &ListGroupsRequest_Sorting{
					Field: "display_name",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with empty field sorting",
			request: &ListGroupsRequest{
				Sorting: &ListGroupsRequest_Sorting{
					Field: "",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with name field and ASC order",
			request: &ListGroupsRequest{
				Sorting: &ListGroupsRequest_Sorting{
					Field: "name",
					Order: 1, // SORTING_ORDER_ASC
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with display_name field and DESC order",
			request: &ListGroupsRequest{
				Sorting: &ListGroupsRequest_Sorting{
					Field: "display_name",
					Order: 2, // SORTING_ORDER_DESC
				},
			},
			wantValid: true,
		},
		// Invalid sorting field tests
		{
			name: "invalid sorting field - not allowed",
			request: &ListGroupsRequest{
				Sorting: &ListGroupsRequest_Sorting{
					Field: "owner",
				},
			},
			wantValid: false,
			wantError: "field",
		},
		{
			name: "invalid sorting field - random value",
			request: &ListGroupsRequest{
				Sorting: &ListGroupsRequest_Sorting{
					Field: "invalid_field",
				},
			},
			wantValid: false,
			wantError: "field",
		},
		{
			name: "invalid sorting field - numeric value",
			request: &ListGroupsRequest{
				Sorting: &ListGroupsRequest_Sorting{
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

func TestListGroupsResponse_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *ListGroupsResponse
		wantValid bool
		wantError string
	}{
		{
			name: "valid empty response",
			request: &ListGroupsResponse{
				Groups: nil,
			},
			wantValid: true,
		},
		{
			name: "valid response with empty groups list",
			request: &ListGroupsResponse{
				Groups: []*Group{},
			},
			wantValid: true,
		},
		{
			name: "valid response with single group",
			request: &ListGroupsResponse{
				Groups: []*Group{
					{
						Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner:       "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						DisplayName: "Test Group",
					},
				},
			},
			wantValid: true,
		},
		{
			name: "valid response with multiple groups",
			request: &ListGroupsResponse{
				Groups: []*Group{
					{
						Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner:       "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						DisplayName: "Group One",
						Description: "First test group",
					},
					{
						Name:        "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						DisplayName: "Group Two",
						Description: "Second test group",
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

func TestSearchGroupsRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *SearchGroupsRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with display_name search",
			request: &SearchGroupsRequest{
				DisplayName: "Test Group",
			},
			wantValid: true,
		},
		{
			name: "valid request with description search",
			request: &SearchGroupsRequest{
				Description: "Test description",
			},
			wantValid: true,
		},
		{
			name: "valid request with both display_name and description search",
			request: &SearchGroupsRequest{
				DisplayName: "Admin",
				Description: "administrative",
			},
			wantValid: true,
		},
		{
			name: "valid request with empty search fields",
			request: &SearchGroupsRequest{
				DisplayName: "",
				Description: "",
			},
			wantValid: true,
		},
		{
			name: "valid request with display_name search and no sorting",
			request: &SearchGroupsRequest{
				DisplayName: "Test",
				// No sorting field set
			},
			wantValid: true,
		},
		{
			name: "valid request with display_name search and empty sorting",
			request: &SearchGroupsRequest{
				DisplayName: "Test",
				Sorting:     &SearchGroupsRequest_Sorting{},
			},
			wantValid: true,
		},
		{
			name: "valid request with display_name search and name field sorting",
			request: &SearchGroupsRequest{
				DisplayName: "Test",
				Sorting: &SearchGroupsRequest_Sorting{
					Field: "name",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with display_name search and display_name field sorting",
			request: &SearchGroupsRequest{
				DisplayName: "Test",
				Sorting: &SearchGroupsRequest_Sorting{
					Field: "display_name",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with display_name search and empty field sorting",
			request: &SearchGroupsRequest{
				DisplayName: "Test",
				Sorting: &SearchGroupsRequest_Sorting{
					Field: "",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with display_name search and sorting with ASC order",
			request: &SearchGroupsRequest{
				DisplayName: "Test",
				Sorting: &SearchGroupsRequest_Sorting{
					Field: "name",
					Order: 1, // SORTING_ORDER_ASC
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with display_name search and sorting with DESC order",
			request: &SearchGroupsRequest{
				DisplayName: "Test",
				Sorting: &SearchGroupsRequest_Sorting{
					Field: "display_name",
					Order: 2, // SORTING_ORDER_DESC
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with maximum length display_name search",
			request: &SearchGroupsRequest{
				DisplayName: strings.Repeat("A", 255), // Maximum allowed length
			},
			wantValid: true,
		},
		{
			name: "valid request with maximum length description search",
			request: &SearchGroupsRequest{
				Description: strings.Repeat("B", 255), // Maximum allowed length
			},
			wantValid: true,
		},
		// Invalid search field length tests
		{
			name: "invalid display_name search - too long",
			request: &SearchGroupsRequest{
				DisplayName: strings.Repeat("A", 256), // Exceeds maximum length
			},
			wantValid: false,
			wantError: "max_length",
		},
		{
			name: "invalid description search - too long",
			request: &SearchGroupsRequest{
				Description: strings.Repeat("B", 256), // Exceeds maximum length
			},
			wantValid: false,
			wantError: "max_length",
		},
		// Invalid sorting field tests
		{
			name: "invalid sorting field - not allowed",
			request: &SearchGroupsRequest{
				DisplayName: "Test",
				Sorting: &SearchGroupsRequest_Sorting{
					Field: "owner",
				},
			},
			wantValid: false,
			wantError: "field",
		},
		{
			name: "invalid sorting field - random value",
			request: &SearchGroupsRequest{
				DisplayName: "Test",
				Sorting: &SearchGroupsRequest_Sorting{
					Field: "invalid_field",
				},
			},
			wantValid: false,
			wantError: "field",
		},
		{
			name: "invalid sorting field - numeric value",
			request: &SearchGroupsRequest{
				DisplayName: "Test",
				Sorting: &SearchGroupsRequest_Sorting{
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

func TestSearchGroupsResponse_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *SearchGroupsResponse
		wantValid bool
		wantError string
	}{
		{
			name: "valid empty response",
			request: &SearchGroupsResponse{
				Groups: nil,
			},
			wantValid: true,
		},
		{
			name: "valid response with empty groups list",
			request: &SearchGroupsResponse{
				Groups: []*Group{},
			},
			wantValid: true,
		},
		{
			name: "valid response with single group",
			request: &SearchGroupsResponse{
				Groups: []*Group{
					{
						Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner:       "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						DisplayName: "Search Result Group",
					},
				},
			},
			wantValid: true,
		},
		{
			name: "valid response with multiple groups",
			request: &SearchGroupsResponse{
				Groups: []*Group{
					{
						Name:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner:       "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						DisplayName: "Search Group One",
						Description: "First search result",
					},
					{
						Name:        "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						DisplayName: "Search Group Two",
						Description: "Second search result",
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

func TestGetGroupRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *GetGroupRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with standard group name",
			request: &GetGroupRequest{
				Name: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2",
			request: &GetGroupRequest{
				Name: "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
			},
			wantValid: true,
		},
		{
			name: "valid request with all valid ULIDv2 characters",
			request: &GetGroupRequest{
				Name: "groups/0123456789ABCDEFGHJKMNPQRS",
			},
			wantValid: true,
		},
		// name field tests (required with pattern validation)
		{
			name: "empty name - should fail (required)",
			request: &GetGroupRequest{
				Name: "",
			},
			wantValid: false,
			wantError: "required",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &GetGroupRequest{
				Name: "group/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Missing 's'
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - wrong resource type",
			request: &GetGroupRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV", // Wrong resource type
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			request: &GetGroupRequest{
				Name: "groups/01ARZ3NDEKTSV4RRFFQ69G5FIL", // Contains 'I' and 'L'
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - lowercase ULIDv2",
			request: &GetGroupRequest{
				Name: "groups/01arz3ndektsv4rrffq69g5fav", // Lowercase
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - too short ULIDv2",
			request: &GetGroupRequest{
				Name: "groups/01ARZ3NDEKTSV4RRFFQ69G5FA", // 25 chars instead of 26
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - too long ULIDv2",
			request: &GetGroupRequest{
				Name: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAVX", // 27 chars instead of 26
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - forbidden characters",
			request: &GetGroupRequest{
				Name: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAU", // Contains 'U'
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - special characters",
			request: &GetGroupRequest{
				Name: "groups/01ARZ3NDEKTSV4RRFFQ69G5F@V", // Contains @
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - missing prefix",
			request: &GetGroupRequest{
				Name: "01ARZ3NDEKTSV4RRFFQ69G5FAV", // Missing groups/ prefix
			},
			wantValid: false,
			wantError: "format",
		},
		{
			name: "invalid name format - completely invalid",
			request: &GetGroupRequest{
				Name: "invalid-group-name", // Completely invalid format
			},
			wantValid: false,
			wantError: "format",
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

func TestGetGroupRequest_NameFieldValidation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	// Valid group name formats (required field)
	validNames := []string{
		"groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",   // Standard example
		"groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",   // Another valid ULIDv2
		"groups/0123456789ABCDEFGHJKMNPQRS",   // All valid ULIDv2 characters
		"groups/ZZZZZZZZZZZZZZZZZZZZZZZZZZ",    // All Z's (valid ULIDv2 char)
	}

	// Invalid group name formats
	invalidNames := []string{
		"",                                    // Empty (required field)
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
			request := &GetGroupRequest{
				Name: name,
			}

			err := validator.Validate(request)
			assert.NoError(t, err, "Name format %q should be valid (length: %d)", name, len(name))
		})
	}

	// Test invalid names
	for i, name := range invalidNames {
		t.Run("invalid_name_"+string(rune(i+'0')), func(t *testing.T) {
			request := &GetGroupRequest{
				Name: name,
			}

			err := validator.Validate(request)
			assert.Error(t, err, "Name format %q should be invalid (length: %d)", name, len(name))
		})
	}
}