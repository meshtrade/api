package main

import (
	"context"
	"log"

	spotv1 "github.com/meshtrade/api/go/trading/spot/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := spotv1.NewSpotService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &spotv1.GetSpotRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the GetSpot method
	spot, err := service.GetSpot(ctx, request)
	if err != nil {
		log.Fatalf("GetSpot failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("GetSpot successful: %+v", spot)
}
