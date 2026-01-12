package main

import (
	"context"
	"log"

	tapv1 "github.com/meshtrade/api/go/testing/ledger/tap/v1"
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

	// List all available tokens that can be minted through the tap service
	// The ListTokenTapsRequest takes no parameters
	request := &tapv1.ListTokenTapsRequest{}

	// Call the ListTokenTaps method to retrieve available tokens
	response, err := service.ListTokenTaps(ctx, request)
	if err != nil {
		log.Fatalf("ListTokenTaps failed: %v", err)
	}

	// Process the list of available tokens
	log.Printf("Available tokens: %d", len(response.Tokens))
	for i, token := range response.Tokens {
		log.Printf("Token %d: %+v", i+1, token)
	}
}
