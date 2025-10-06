package main

import (
	"context"
	"log"

	transactionv1 "github.com/meshtrade/api/go/ledger/transaction/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := transactionv1.NewTransactionService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &transactionv1.MonitorTransactionStateRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the MonitorTransactionState method
	response, err := service.MonitorTransactionState(ctx, request)
	if err != nil {
		log.Fatalf("MonitorTransactionState failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("MonitorTransactionState successful: %+v", response)
}
