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

	// Create request - no parameters needed for simple list
	request := &user_profilev1.ListUserProfilesRequest{}

	// Call the ListUserProfiles method
	response, err := service.ListUserProfiles(ctx, request)
	if err != nil {
		log.Fatalf("ListUserProfiles failed: %v", err)
	}

	// Process the user profile directory
	log.Printf("Found %d user profiles in the accessible hierarchy:", len(response.UserProfiles))
	for i, profile := range response.UserProfiles {
		log.Printf("User Profile %d:", i+1)
		log.Printf("  Name: %s", profile.Name)
		log.Printf("  Display Name: %s", profile.DisplayName)
		log.Printf("  User: %s", profile.GetUser())
		log.Printf("  Owner: %s", profile.Owner)
		log.Println()
	}
}
