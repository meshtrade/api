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

	// Create request with service-specific parameters
	request := &user_profilev1.SearchUserProfilesRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the SearchUserProfiles method
	response, err := service.SearchUserProfiles(ctx, request)
	if err != nil {
		log.Fatalf("SearchUserProfiles failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("SearchUserProfiles successful: %+v", response)
}
