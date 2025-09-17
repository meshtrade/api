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

	// Look up account using its 7-digit Account Number
	request := &accountv1.GetAccountByNumberRequest{
		AccountNumber:      "1234567", // 7-digit account number
		PopulateLedgerData: true,       // Fetch live blockchain data
	}

	// Call the GetAccountByNumber method
	account, err := service.GetAccountByNumber(ctx, request)
	if err != nil {
		log.Fatalf("GetAccountByNumber failed: %v", err)
	}

	// Display account information retrieved by number
	log.Printf("Account found by number %s:", request.AccountNumber)
	log.Printf("  Name: %s", account.Name)
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
