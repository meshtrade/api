package main

import (
	"context"
	"log"

	userv1 "github.com/meshtrade/api/go/iam/user/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := userv1.NewUserService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &userv1.UpdateUserRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the UpdateUser method
	user, err := service.UpdateUser(ctx, request)
	if err != nil {
		log.Fatalf("UpdateUser failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("UpdateUser successful: %+v", user)
}
