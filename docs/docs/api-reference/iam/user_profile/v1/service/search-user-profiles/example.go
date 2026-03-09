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

	// Search user profiles by last name
	request := &user_profilev1.SearchUserProfilesRequest{
		LastName: "Smith",
	}

	// Call the SearchUserProfiles method
	response, err := service.SearchUserProfiles(ctx, request)
	if err != nil {
		log.Fatalf("SearchUserProfiles failed: %v", err)
	}

	for _, profile := range response.UserProfiles {
		log.Printf("Found: %s %s (%s)", profile.FirstName, profile.LastName, profile.Name)
	}
}
