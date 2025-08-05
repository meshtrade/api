package main

import (
	"context"
	"log"

	api_userv1 "github.com/meshtrade/api/go/iam/api_user/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := api_userv1.NewApiUserService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &api_userv1.DeactivateApiUserRequest{
		Name: "api_users/01234567890123456789012345", // API user resource name
	}

	// Call the DeactivateApiUser method
	apiUser, err := service.DeactivateApiUser(ctx, request)
	if err != nil {
		log.Fatalf("DeactivateApiUser failed: %v", err)
	}

	// Verify deactivation was successful
	log.Printf("Successfully deactivated API user: %s", apiUser.GetName())
	log.Printf("API user state: %s", apiUser.GetState().String()) // Should be INACTIVE
	log.Printf("Display name: %s", apiUser.GetDisplayName())
}
