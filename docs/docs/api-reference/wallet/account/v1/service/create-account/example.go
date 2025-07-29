package main

import (
	"context"
	"log"

	accountv1 "github.com/meshtrade/api/go/wallet/account/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := accountv1.NewAccountService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &accountv1.CreateAccountRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the CreateAccount method
	account, err := service.CreateAccount(ctx, request)
	if err != nil {
		log.Fatalf("CreateAccount failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("CreateAccount successful: %+v", account)
}
