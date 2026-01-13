package main

import (
	"context"
	"log"

	token_tapv1 "github.com/meshtrade/api/go/testing/ledger/token_tap/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := token_tapv1.NewTokenTapService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Initialize the token tapping infrastructure
	// The InitialiseTokenTapsRequest takes no parameters
	request := &token_tapv1.InitialiseTokenTapsRequest{}

	// Call the InitialiseTokenTaps method to set up token tapping
	response, err := service.InitialiseTokenTaps(ctx, request)
	if err != nil {
		log.Fatalf("InitialiseTokenTaps failed: %v", err)
	}

	// Token tapping infrastructure has been initialized successfully
	log.Printf("Token tapping infrastructure initialized successfully: %+v", response)
}
