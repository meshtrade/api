package main

import (
	"context"
	"log"

	typev1 "github.com/meshtrade/api/go/type/v1"
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

	// Create request with optional sorting
	request := &transferv1.ListTransfersRequest{
		Sorting: &transferv1.ListTransfersRequest_Sorting{
			Field: "number",                              // Sort by transfer number
			Order: typev1.SortingOrder_SORTING_ORDER_ASC, // Ascending order
		},
	}

	// Call the ListTransfers method
	response, err := service.ListTransfers(ctx, request)
	if err != nil {
		log.Fatalf("ListTransfers failed: %v", err)
	}

	// Display all transfers in the hierarchy
	log.Printf("Found %d transfers:", len(response.Transfers))
	for _, transfer := range response.Transfers {
		log.Printf("  Transfer %s:", transfer.Number)
		log.Printf("    Name: %s", transfer.Name)
		log.Printf("    From: %s", transfer.From)
		log.Printf("    To: %s", transfer.To)
		log.Printf("    Amount: %s %s", transfer.Amount.Value, transfer.Amount.Token.Code)
		log.Printf("    State: %s", transfer.State)
	}
}
