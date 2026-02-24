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

	// Update user profile with modified information
	request := &user_profilev1.UpdateUserProfileRequest{
		UserProfile: &user_profilev1.UserProfile{
			Name:              "iam/user_profiles/${_id}",                       // Existing profile identifier
			Owner:             service.Group(),                                  // Owner must match current ownership
			DisplayName:       "Sarah Thompson-Johnson",                         // Updated display name
			ProfilePictureUrl: "https://cdn.example.com/profiles/sarah-new.jpg", // New photo
		},
	}

	// Call the UpdateUserProfile method
	userProfile, err := service.UpdateUserProfile(ctx, request)
	if err != nil {
		log.Fatalf("UpdateUserProfile failed: %v", err)
	}

	// Use the updated user profile
	log.Printf("User profile updated successfully:")
	log.Printf("  Name: %s", userProfile.Name)
	log.Printf("  Display Name: %s", userProfile.DisplayName)
	log.Printf("User profile information updated with latest details")
}
