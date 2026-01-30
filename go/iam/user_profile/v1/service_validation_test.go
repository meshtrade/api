package user_profile_v1

import (
	"strings"
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestGetUserProfileRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *GetUserProfileRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request",
			request: &GetUserProfileRequest{
				Name: "user_profiles/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2",
			request: &GetUserProfileRequest{
				Name: "user_profiles/01BX5ZZKBKACTAV9WEVGEMMVRZ",
			},
			wantValid: true,
		},
		// name field tests (required)
		{
			name: "invalid - empty name",
			request: &GetUserProfileRequest{
				Name: "",
			},
			wantValid: false,
			wantError: "name",
		},
		{
			name: "invalid name format - wrong prefix",
			request: &GetUserProfileRequest{
				Name: "profiles/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "name",
		},
		{
			name: "invalid name format - users prefix instead of user_profiles",
			request: &GetUserProfileRequest{
				Name: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "name",
		},
		{
			name: "invalid name format - invalid ULIDv2 characters",
			request: &GetUserProfileRequest{
				Name: "user_profiles/01ARZ3NDEKTSV4RRFFQ69G5FIL",
			},
			wantValid: false,
			wantError: "name",
		},
		{
			name: "invalid name format - lowercase ULIDv2",
			request: &GetUserProfileRequest{
				Name: "user_profiles/01arz3ndektsv4rrffq69g5fav",
			},
			wantValid: false,
			wantError: "name",
		},
		{
			name: "invalid name format - too short",
			request: &GetUserProfileRequest{
				Name: "user_profiles/01ARZ3NDEKTSV4RRFFQ69G5FA",
			},
			wantValid: false,
			wantError: "name",
		},
		{
			name: "invalid name format - too long",
			request: &GetUserProfileRequest{
				Name: "user_profiles/01ARZ3NDEKTSV4RRFFQ69G5FAVX",
			},
			wantValid: false,
			wantError: "name",
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

func TestGetUserProfileByUserRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *GetUserProfileByUserRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request",
			request: &GetUserProfileByUserRequest{
				User: "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: true,
		},
		{
			name: "valid request with different ULIDv2",
			request: &GetUserProfileByUserRequest{
				User: "users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
			},
			wantValid: true,
		},
		// user field tests (required)
		{
			name: "invalid - empty user",
			request: &GetUserProfileByUserRequest{
				User: "",
			},
			wantValid: false,
			wantError: "user",
		},
		{
			name: "invalid user format - wrong prefix",
			request: &GetUserProfileByUserRequest{
				User: "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "user",
		},
		{
			name: "invalid user format - user_profiles prefix",
			request: &GetUserProfileByUserRequest{
				User: "user_profiles/01ARZ3NDEKTSV4RRFFQ69G5FAV",
			},
			wantValid: false,
			wantError: "user",
		},
		{
			name: "invalid user format - invalid ULIDv2 characters",
			request: &GetUserProfileByUserRequest{
				User: "users/01ARZ3NDEKTSV4RRFFQ69G5FIL",
			},
			wantValid: false,
			wantError: "user",
		},
		{
			name: "invalid user format - lowercase ULIDv2",
			request: &GetUserProfileByUserRequest{
				User: "users/01arz3ndektsv4rrffq69g5fav",
			},
			wantValid: false,
			wantError: "user",
		},
		{
			name: "invalid user format - too short",
			request: &GetUserProfileByUserRequest{
				User: "users/01ARZ3NDEKTSV4RRFFQ69G5FA",
			},
			wantValid: false,
			wantError: "user",
		},
		{
			name: "invalid user format - too long",
			request: &GetUserProfileByUserRequest{
				User: "users/01ARZ3NDEKTSV4RRFFQ69G5FAVX",
			},
			wantValid: false,
			wantError: "user",
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

func TestUpdateUserProfileRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *UpdateUserProfileRequest
		wantValid bool
		wantError string
	}{
		{
			name: "valid request with complete user profile",
			request: &UpdateUserProfileRequest{
				UserProfile: &UserProfile{
					Name:        "user_profiles/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					DisplayName: "John Doe",
				},
			},
			wantValid: true,
		},
		{
			name: "valid request with all fields",
			request: &UpdateUserProfileRequest{
				UserProfile: &UserProfile{
					Name:              "user_profiles/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Owner:             "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					User:              "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					Locale:            "en-US",
					ProfilePictureUrl: "https://example.com/avatar.png",
					DisplayName:       "John Doe",
				},
			},
			wantValid: true,
		},
		// user_profile field tests (required)
		{
			name: "invalid - missing user_profile",
			request: &UpdateUserProfileRequest{
				UserProfile: nil,
			},
			wantValid: false,
			wantError: "user_profile",
		},
		// Nested validation
		{
			name: "invalid - user_profile with invalid locale",
			request: &UpdateUserProfileRequest{
				UserProfile: &UserProfile{
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					DisplayName: "John Doe",
					Locale:      "invalid",
				},
			},
			wantValid: false,
			wantError: "locale",
		},
		{
			name: "invalid - user_profile with invalid profile_picture_url",
			request: &UpdateUserProfileRequest{
				UserProfile: &UserProfile{
					Owner:             "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					User:              "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					DisplayName:       "John Doe",
					ProfilePictureUrl: "not a url",
				},
			},
			wantValid: false,
			wantError: "profile_picture_url",
		},
		{
			name: "invalid - user_profile with missing display_name",
			request: &UpdateUserProfileRequest{
				UserProfile: &UserProfile{
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					DisplayName: "",
				},
			},
			wantValid: false,
			wantError: "display_name",
		},
		{
			name: "invalid - user_profile with missing user",
			request: &UpdateUserProfileRequest{
				UserProfile: &UserProfile{
					Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
					User:        "",
					DisplayName: "John Doe",
				},
			},
			wantValid: false,
			wantError: "user",
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

func TestListUserProfilesRequest_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		request   *ListUserProfilesRequest
		wantValid bool
		wantError string
	}{
		{
			name:      "valid empty request",
			request:   &ListUserProfilesRequest{},
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

func TestListUserProfilesResponse_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		response  *ListUserProfilesResponse
		wantValid bool
		wantError string
	}{
		{
			name: "valid empty response",
			response: &ListUserProfilesResponse{
				UserProfiles: nil,
			},
			wantValid: true,
		},
		{
			name: "valid response with empty list",
			response: &ListUserProfilesResponse{
				UserProfiles: []*UserProfile{},
			},
			wantValid: true,
		},
		{
			name: "valid response with single profile",
			response: &ListUserProfilesResponse{
				UserProfiles: []*UserProfile{
					{
						Name:        "user_profiles/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						DisplayName: "John Doe",
					},
				},
			},
			wantValid: true,
		},
		{
			name: "valid response with multiple profiles",
			response: &ListUserProfilesResponse{
				UserProfiles: []*UserProfile{
					{
						Name:        "user_profiles/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
						DisplayName: "John Doe",
					},
					{
						Name:        "user_profiles/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						Owner:       "groups/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						User:        "users/01BX5ZZKBKACTAV9WEVGEMMVRZ",
						DisplayName: "Jane Doe",
					},
				},
			},
			wantValid: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.response)

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
