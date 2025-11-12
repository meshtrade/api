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
	service, err := api_userv1.NewAPIUserService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &api_userv1.CreateAPIUserRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the CreateAPIUser method
	apiUser, err := service.CreateAPIUser(ctx, request)
	if err != nil {
		log.Fatalf("CreateAPIUser failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("CreateAPIUser successful: %+v", apiUser)
}
