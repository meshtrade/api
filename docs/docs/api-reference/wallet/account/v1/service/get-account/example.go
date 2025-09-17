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
		Name:               "accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C", // Account resource name
		PopulateLedgerData: true,                                     // Fetch live blockchain data
	}

	// Call the GetAccount method
	account, err := service.GetAccount(ctx, request)
	if err != nil {
		log.Fatalf("GetAccount failed: %v", err)
	}

	// Display account information
	log.Printf("Account retrieved successfully:")
	log.Printf("  Name: %s", account.Name)
	log.Printf("  Number: %s", account.Number)
	log.Printf("  Display Name: %s", account.DisplayName)
	log.Printf("  Ledger: %s", account.Ledger)
	log.Printf("  State: %s", account.State)

	// Display balances if live data was populated
	if request.PopulateLedgerData && len(account.Balances) > 0 {
		log.Printf("  Balances:")
		for _, balance := range account.Balances {
			log.Printf("    %s: %s",
				balance.InstrumentMetadata.Name,
				balance.Amount.Value)
		}
	}
}
