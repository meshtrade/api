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

	// Create request (no parameters required)
	request := &ledgerv1.InitialiseTokenTapsRequest{}

	// Call the InitialiseTokenTaps method
	_, err = service.InitialiseTokenTaps(ctx, request)
	if err != nil {
		log.Fatalf("InitialiseTokenTaps failed: %v", err)
	}

	log.Println("InitialiseTokenTaps successful")
}
