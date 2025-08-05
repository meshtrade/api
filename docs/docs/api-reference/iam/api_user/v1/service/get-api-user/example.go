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
	request := &api_userv1.GetApiUserRequest{
		Name: "api_users/01234567890123456789012345", // API user resource name
	}

	// Call the GetApiUser method
	apiUser, err := service.GetApiUser(ctx, request)
	if err != nil {
		log.Fatalf("GetApiUser failed: %v", err)
	}

	// Access API user details
	log.Printf("Retrieved API user: %s", apiUser.GetName())
	log.Printf("Display name: %s", apiUser.GetDisplayName())
	log.Printf("State: %s", apiUser.GetState().String())
	log.Printf("Owner: %s", apiUser.GetOwner())
	log.Printf("Roles: %v", apiUser.GetRoles())
	
	// Note: API key is not returned in get operations for security reasons
}
