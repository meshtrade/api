package main

import (
	"context"
	"log"

	ledgerv1 "github.com/meshtrade/api/go/testing/ledger/token_tap/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := ledgerv1.NewTokenTapService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &ledgerv1.ListTokenTapsRequest{}

	// Call the ListTokenTaps method
	response, err := service.ListTokenTaps(ctx, request)
	if err != nil {
		log.Fatalf("ListTokenTaps failed: %v", err)
	}

	// List tokens in response
	for _, token := range response.Tokens {
		log.Printf("%+v", token)
	}
}
