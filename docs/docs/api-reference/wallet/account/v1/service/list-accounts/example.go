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

	// Call the ListAccounts method (no request parameters)
	response, err := service.ListAccounts(ctx)
	if err != nil {
		log.Fatalf("ListAccounts failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("ListAccounts successful: %+v", response)
}
