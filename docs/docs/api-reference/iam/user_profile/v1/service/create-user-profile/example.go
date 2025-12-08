package main

import (
	"context"
	"log"

	user_profilev1 "github.com/meshtrade/api/go/iam/user_profile/v1"
	type_v1 "github.com/meshtrade/api/go/type/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := user_profilev1.NewUserProfileService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &user_profilev1.CreateUserProfileRequest{
		UserProfile: &user_profilev1.UserProfile{
			Owner: service.Group(),
			Owners:            []string{},
			DisplayName:       "",
			FirstName:         "",
			LastName:          "",
			RegisteredAddress: &type_v1.Address{
				AddressLines: []string{},
				Suburb:       "",
				City:         "",
				Province:     "",
				CountryCode:  "",
				PostalCode:   "",
			},
			ContactDetails:    &type_v1.ContactDetails{
				EmailAddress: "",
				PhoneNumber:  "",
				MobileNumber: "",
				Website:      "",
				Linkedin:     "",
				Facebook:     "",
				Instagram:    "",
				XTwitter:     "",
				Youtube:      "",
			},
		},
	}

	// Call the CreateUserProfile method
	response, err := service.CreateUserProfile(ctx, request)
	if err != nil {
		log.Fatalf("CreateUserProfile failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("CreateUserProfile successful: %+v", response)
}
