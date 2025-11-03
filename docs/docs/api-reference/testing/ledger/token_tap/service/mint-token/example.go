package main

import (
	"context"
	"log"

	ledgerv1 "github.com/meshtrade/api/go/testing/ledger/token_tap"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := ledgerv1.NewLedgerService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &ledgerv1.MintTokenRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the MintToken method
	response, err := service.MintToken(ctx, request)
	if err != nil {
		log.Fatalf("MintToken failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("MintToken successful: %+v", response)
}
