package main

import (
	"context"
	"log"

	user_profilev1 "github.com/meshtrade/api/go/iam/user_profile/v1"
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

	// Create request to get a specific user profile by name (resource identifier)
	request := &user_profilev1.GetUserProfileRequest{
		Name: "user_profiles/01JCXYZ1234567890ABCDEFGHJK", // User profile ULIDv2 identifier
	}

	// Call the GetUserProfile method
	response, err := service.GetUserProfile(ctx, request)
	if err != nil {
		log.Fatalf("GetUserProfile failed: %v", err)
	}

	// Access user profile details
	userProfile := response.UserProfile
	log.Printf("User profile retrieved successfully:")
	log.Printf("  Name: %s", userProfile.Name)
	log.Printf("  Display Name: %s", userProfile.DisplayName)
	log.Printf("  User: %s", userProfile.UserName)
	log.Printf("  Owner: %s", userProfile.Owner)
	if userProfile.ContactDetails != nil {
		if userProfile.ContactDetails.EmailAddress != "" {
			log.Printf("  Email: %s", userProfile.ContactDetails.EmailAddress)
		}
		if userProfile.ContactDetails.MobileNumber != "" {
			log.Printf("  Mobile: %s", userProfile.ContactDetails.MobileNumber)
		}
	}

	// Use user profile information for display
	log.Printf("User profile for %s loaded successfully", userProfile.DisplayName)
}
