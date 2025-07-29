package main

import (
	"context"
	"log"

	instrumentv1 "github.com/meshtrade/api/go/issuance_hub/instrument/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := instrumentv1.NewInstrumentService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &instrumentv1.BurnInstrumentRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the BurnInstrument method
	response, err := service.BurnInstrument(ctx, request)
	if err != nil {
		log.Fatalf("BurnInstrument failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("BurnInstrument successful: %+v", response)
}
