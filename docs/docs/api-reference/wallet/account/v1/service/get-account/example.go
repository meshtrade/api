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
	request := &accountv1.GetAccountRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the GetAccount method
	account, err := service.GetAccount(ctx, request)
	if err != nil {
		log.Fatalf("GetAccount failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("GetAccount successful: %+v", account)
}
