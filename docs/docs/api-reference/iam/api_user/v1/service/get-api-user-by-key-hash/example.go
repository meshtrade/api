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
	request := &api_userv1.GetApiUserByKeyHashRequest{
		KeyHash: "hash_of_api_key_123456", // Hash of the API key (calculated by auth system)
	}

	// Call the GetApiUserByKeyHash method
	apiUser, err := service.GetApiUserByKeyHash(ctx, request)
	if err != nil {
		log.Fatalf("GetApiUserByKeyHash failed: %v", err)
	}

	// Access API user details retrieved by key hash
	log.Printf("Found API user: %s", apiUser.GetName())
	log.Printf("Display name: %s", apiUser.GetDisplayName())
	log.Printf("State: %s", apiUser.GetState().String())
	log.Printf("Owner: %s", apiUser.GetOwner())
	
	// Note: This method is typically used by authentication systems
	// to validate API keys and retrieve associated user information
}
