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

	// Create request with user profile configuration
	request := &user_profilev1.CreateUserProfileRequest{
		UserProfile: &user_profilev1.UserProfile{
			Owner:              service.Group(), // Current authenticated group becomes the owner
			Name:               "users/01JCXYZ1234567890ABCDEFGHJK", // Associated user resource
			DisplayName:        "Sarah Thompson", // Required display name
			FirstName:          "Sarah",
			LastName:           "Thompson",
			ProfilePictureUrl:  "https://cdn.example.com/profiles/sarah.jpg",
			RegisteredAddress: &type_v1.Address{
				AddressLines: []string{"456 Oak Avenue", "Apartment 3B"},
				City:         "San Francisco",
				Province:     "California",
				CountryCode:  "US",
				PostalCode:   "94102",
			},
			ContactDetails: &type_v1.ContactDetails{
				EmailAddress: "sarah.thompson@company.com",
				MobileNumber: "+14155551234",
				PhoneNumber:  "+14155559876",
				Linkedin:     "in/sarah-thompson",
				XTwitter:     "sarahthompson",
			},
		},
	}

	// Call the CreateUserProfile method
	response, err := service.CreateUserProfile(ctx, request)
	if err != nil {
		log.Fatalf("CreateUserProfile failed: %v", err)
	}

	// Use the newly created user profile
	userProfile := response.UserProfile
	log.Printf("User profile created successfully:")
	log.Printf("  Name: %s", userProfile.Name)
	log.Printf("  Display Name: %s", userProfile.DisplayName)
	log.Printf("  User: %s", userProfile.UserName)
	log.Printf("  Owner: %s", userProfile.Owner)
	log.Printf("  Email: %s", userProfile.ContactDetails.EmailAddress)

	// The user profile is ready with complete information
	log.Printf("User profile is ready with complete contact and address information")
}
