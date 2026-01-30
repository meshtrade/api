package user_profile_v1

import (
	"strings"
	"testing"

	"buf.build/go/protovalidate"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestUserProfile_Validation(t *testing.T) {
	validator, err := protovalidate.New()
	require.NoError(t, err)

	tests := []struct {
		name      string
		profile   *UserProfile
		wantValid bool
		wantError string
	}{
		// Valid cases
		{
			name: "valid user profile with all required fields",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
			},
			wantValid: true,
		},
		{
			name: "valid user profile with all fields",
			profile: &UserProfile{
				Name:              "user_profiles/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Owner:             "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:              "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Locale:            "en-US",
				ProfilePictureUrl: "https://example.com/avatar.png",
				DisplayName:       "John Doe",
			},
			wantValid: true,
		},
		{
			name: "valid user profile with empty optional fields",
			profile: &UserProfile{
				Owner:             "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:              "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Locale:            "",
				ProfilePictureUrl: "",
				DisplayName:       "Jane Doe",
			},
			wantValid: true,
		},

		// user field tests (required)
		{
			name: "invalid - missing user field",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "",
				DisplayName: "John Doe",
			},
			wantValid: false,
			wantError: "user",
		},
		{
			name: "invalid user format - wrong prefix",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
			},
			wantValid: false,
			wantError: "user",
		},
		{
			name: "invalid user format - invalid ULIDv2 characters",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FIL",
				DisplayName: "John Doe",
			},
			wantValid: false,
			wantError: "user",
		},
		{
			name: "invalid user format - lowercase ULIDv2",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01arz3ndektsv4rrffq69g5fav",
				DisplayName: "John Doe",
			},
			wantValid: false,
			wantError: "user",
		},
		{
			name: "invalid user format - too short",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FA",
				DisplayName: "John Doe",
			},
			wantValid: false,
			wantError: "user",
		},
		{
			name: "invalid user format - too long",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAVX",
				DisplayName: "John Doe",
			},
			wantValid: false,
			wantError: "user",
		},

		// locale field tests (optional, BCP 47 validation)
		{
			name: "valid locale - simple language code",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
				Locale:      "en",
			},
			wantValid: true,
		},
		{
			name: "valid locale - three letter language code",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
				Locale:      "eng",
			},
			wantValid: true,
		},
		{
			name: "valid locale - language with region",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
				Locale:      "en-US",
			},
			wantValid: true,
		},
		{
			name: "valid locale - language with script",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
				Locale:      "zh-Hans",
			},
			wantValid: true,
		},
		{
			name: "valid locale - language with script and region",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
				Locale:      "zh-Hans-CN",
			},
			wantValid: true,
		},
		{
			name: "valid locale - language with numeric region",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
				Locale:      "en-001",
			},
			wantValid: true,
		},
		{
			name: "invalid locale - uppercase language",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
				Locale:      "EN",
			},
			wantValid: false,
			wantError: "locale",
		},
		{
			name: "invalid locale - single character",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
				Locale:      "e",
			},
			wantValid: false,
			wantError: "locale",
		},
		{
			name: "invalid locale - invalid format",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
				Locale:      "english",
			},
			wantValid: false,
			wantError: "locale",
		},
		{
			name: "invalid locale - lowercase region",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
				Locale:      "en-us",
			},
			wantValid: false,
			wantError: "locale",
		},

		// profile_picture_url field tests (optional, URI validation)
		{
			name: "valid profile picture URL - https",
			profile: &UserProfile{
				Owner:             "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:              "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName:       "John Doe",
				ProfilePictureUrl: "https://example.com/avatar.png",
			},
			wantValid: true,
		},
		{
			name: "valid profile picture URL - http",
			profile: &UserProfile{
				Owner:             "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:              "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName:       "John Doe",
				ProfilePictureUrl: "http://example.com/avatar.png",
			},
			wantValid: true,
		},
		{
			name: "valid profile picture URL - with query params",
			profile: &UserProfile{
				Owner:             "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:              "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName:       "John Doe",
				ProfilePictureUrl: "https://cdn.example.com/images/user/123.jpg?size=large&format=webp",
			},
			wantValid: true,
		},
		{
			name: "valid profile picture URL - data URI",
			profile: &UserProfile{
				Owner:             "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:              "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName:       "John Doe",
				ProfilePictureUrl: "data:image/png;base64,iVBORw0KGgo=",
			},
			wantValid: true,
		},
		{
			name: "invalid profile picture URL - not a URI",
			profile: &UserProfile{
				Owner:             "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:              "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName:       "John Doe",
				ProfilePictureUrl: "not a valid url",
			},
			wantValid: false,
			wantError: "profile_picture_url",
		},
		{
			name: "invalid profile picture URL - missing scheme",
			profile: &UserProfile{
				Owner:             "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:              "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName:       "John Doe",
				ProfilePictureUrl: "example.com/avatar.png",
			},
			wantValid: false,
			wantError: "profile_picture_url",
		},

		// display_name field tests (required)
		{
			name: "invalid - missing display_name",
			profile: &UserProfile{
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "",
			},
			wantValid: false,
			wantError: "display_name",
		},

		// owner field tests (required)
		{
			name: "invalid - missing owner",
			profile: &UserProfile{
				Owner:       "",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
			},
			wantValid: false,
			wantError: "owner",
		},
		{
			name: "invalid owner format - wrong prefix",
			profile: &UserProfile{
				Owner:       "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
			},
			wantValid: false,
			wantError: "owner",
		},

		// name field tests (optional, but validated when provided)
		{
			name: "valid name format",
			profile: &UserProfile{
				Name:        "user_profiles/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
			},
			wantValid: true,
		},
		{
			name: "invalid name format - wrong prefix",
			profile: &UserProfile{
				Name:        "profiles/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				Owner:       "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				User:        "users/01ARZ3NDEKTSV4RRFFQ69G5FAV",
				DisplayName: "John Doe",
			},
			wantValid: false,
			wantError: "name",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validator.Validate(tt.profile)

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
