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

	// Create request with the user profile resource name
	// Replace the ULIDv2 with your actual user profile ID
	request := &user_profilev1.GetUserProfileRequest{
		Name: "iam/user_profiles/01HQZXYZ9ABCDEFGHIJKLMNPQR",
	}

	// Call the GetUserProfile method
	userProfile, err := service.GetUserProfile(ctx, request)
	if err != nil {
		log.Fatalf("GetUserProfile failed: %v", err)
	}

	// Use the retrieved user profile
	log.Printf("User Profile Retrieved:")
	log.Printf("  Name: %s", userProfile.Name)
	log.Printf("  First Name: %s", userProfile.FirstName)
	log.Printf("  Last Name: %s", userProfile.LastName)
	log.Printf("  User: %s", userProfile.User)
	log.Printf("  Locale: %s", userProfile.Locale)
}
