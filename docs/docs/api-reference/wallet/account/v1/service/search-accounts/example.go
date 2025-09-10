package main

import (
	"context"
	"log"

	accountv1 "github.com/meshtrade/api/go/wallet/account/v1"
	typev1 "github.com/meshtrade/api/go/type/v1"
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

	// Search for accounts by display name substring
	request := &accountv1.SearchAccountsRequest{
		DisplayName:        "Trading", // Search for accounts with "Trading" in name
		PopulateLedgerData: false,     // Set to true to fetch live blockchain data
			Sorting: &accountv1.SearchAccountsRequest_Sorting{
			Field: "number",                                 // Sort by account number
			Order: typev1.SortingOrder_SORTING_ORDER_DESC, // Descending order
		},
	}

	// Call the SearchAccounts method
	response, err := service.SearchAccounts(ctx, request)
	if err != nil {
		log.Fatalf("SearchAccounts failed: %v", err)
	}

	// Display search results
	log.Printf("Found %d accounts matching '%s':", len(response.Accounts), request.DisplayName)
	for _, account := range response.Accounts {
		log.Printf("  Account %s:", account.Number)
		log.Printf("    Name: %s", account.Name)
		log.Printf("    Display Name: %s", account.DisplayName)
		log.Printf("    Ledger: %s", account.Ledger)
		log.Printf("    State: %s", account.State)
	}
}
