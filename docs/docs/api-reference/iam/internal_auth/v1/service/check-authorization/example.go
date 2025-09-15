package main

import (
	"context"
	"log"

	internal_authv1 "github.com/meshtrade/api/go/iam/internal_auth/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := internal_authv1.NewInternalAuthService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &internal_authv1.CheckAuthorizationRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the CheckAuthorization method
	response, err := service.CheckAuthorization(ctx, request)
	if err != nil {
		log.Fatalf("CheckAuthorization failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("CheckAuthorization successful: %+v", response)
}
