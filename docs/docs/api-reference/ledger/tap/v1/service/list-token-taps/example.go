package main

import (
	"context"
	"log"

	tapv1 "github.com/meshtrade/api/go/ledger/tap/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := tapv1.NewTokenTapService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &tapv1.ListTokenTapsRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the ListTokenTaps method
	response, err := service.ListTokenTaps(ctx, request)
	if err != nil {
		log.Fatalf("ListTokenTaps failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("ListTokenTaps successful: %+v", response)
}
