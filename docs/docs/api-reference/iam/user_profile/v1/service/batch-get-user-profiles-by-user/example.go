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

	// Batch retrieve profiles for multiple users
	request := &user_profilev1.BatchGetUserProfilesByUserRequest{
		Users: []string{
			"users/01HQZXYZ9ABCDEFGHIJKLMNPQR",
			"users/01HQZXYZ9ABCDEFGHIJKLMNPQS",
		},
	}

	// Call the BatchGetUserProfilesByUser method
	response, err := service.BatchGetUserProfilesByUser(ctx, request)
	if err != nil {
		log.Fatalf("BatchGetUserProfilesByUser failed: %v", err)
	}

	for _, profile := range response.UserProfiles {
		log.Printf("Profile: %s %s (user: %s)", profile.FirstName, profile.LastName, profile.User)
	}
}
