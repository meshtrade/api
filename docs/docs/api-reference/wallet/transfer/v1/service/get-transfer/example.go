package main

import (
	"context"
	"log"

	transferv1 "github.com/meshtrade/api/go/wallet/transfer/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := transferv1.NewTransferService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with the transfer resource name
	request := &transferv1.GetTransferRequest{
		Name: "wallet/transfers/01HQ3K5M8XYZ2NFVJT9BKR7P4C", // Transfer resource name
	}

	// Call the GetTransfer method
	transfer, err := service.GetTransfer(ctx, request)
	if err != nil {
		log.Fatalf("GetTransfer failed: %v", err)
	}

	// Display transfer details
	log.Printf("Transfer retrieved successfully:")
	log.Printf("  Name: %s", transfer.Name)
	log.Printf("  Number: %s", transfer.Number)
	log.Printf("  From: %s", transfer.From)
	log.Printf("  To: %s", transfer.To)
	log.Printf("  Amount: %s %s", transfer.Amount.Value, transfer.Amount.Token.Code)
	log.Printf("  State: %s", transfer.State)
	log.Printf("  Transaction: %s", transfer.Transaction)
}
