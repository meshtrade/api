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

	// Get the existing account first
	existingAccount, err := service.GetAccount(ctx, &accountv1.GetAccountRequest{
		Name:               "accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C",
		PopulateLedgerData: false,
	})
	if err != nil {
		log.Fatalf("GetAccount failed: %v", err)
	}

	// Create request to update only the display name
	updatedAccount := *existingAccount
	updatedAccount.DisplayName = "Updated Trading Account Name"

	request := &accountv1.UpdateAccountRequest{
		Account: &updatedAccount,
	}

	// Call the UpdateAccount method
	account, err := service.UpdateAccount(ctx, request)
	if err != nil {
		log.Fatalf("UpdateAccount failed: %v", err)
	}

	// Display the updated account
	log.Printf("Account updated successfully:")
	log.Printf("  Name: %s", account.Name)
	log.Printf("  Display Name: %s", account.DisplayName)
	log.Printf("  Number: %s", account.Number)
	log.Printf("  Ledger: %s", account.Ledger)
}
