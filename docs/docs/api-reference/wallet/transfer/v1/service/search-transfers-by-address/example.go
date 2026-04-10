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

	// Search for all transfers involving a specific ledger address
	request := &transferv1.SearchTransfersByAddressRequest{
		Address: "GBZH4LMGAYUDNFPNFGOBKU76DDRJHIAKGKGO2LNZFLQB6DMKV7EYHT", // Ledger address to search
	}

	// Call the SearchTransfersByAddress method
	response, err := service.SearchTransfersByAddress(ctx, request)
	if err != nil {
		log.Fatalf("SearchTransfersByAddress failed: %v", err)
	}

	// Display all transfers involving this address (as sender or receiver)
	log.Printf("Found %d transfers for address:", len(response.Transfers))
	for _, transfer := range response.Transfers {
		log.Printf("  Transfer %s:", transfer.Number)
		log.Printf("    From: %s", transfer.From)
		log.Printf("    To: %s", transfer.To)
		log.Printf("    Amount: %s %s", transfer.Amount.Value, transfer.Amount.Token.Code)
		log.Printf("    State: %s", transfer.State)
	}
}
