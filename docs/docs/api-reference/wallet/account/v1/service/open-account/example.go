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

	// Open a previously created account on the blockchain
	request := &accountv1.OpenAccountRequest{
		Name: "accounts/01HQ3K5M8XYZ2NFVJT9BKR7P4C", // Account to open
	}

	// Call the OpenAccount method
	response, err := service.OpenAccount(ctx, request)
	if err != nil {
		log.Fatalf("OpenAccount failed: %v", err)
	}

	// Account is now open on the blockchain
	log.Printf("Account opened successfully on blockchain:")
	log.Printf("  Account Name: %s", response.Account.Name)
	log.Printf("  Account Number: %s", response.Account.Number)
	log.Printf("  Ledger ID: %s", response.Account.LedgerId)
	log.Printf("  State: %s", response.Account.State)
	log.Printf("  Transaction: %s", response.LedgerTransaction)
	log.Printf("\nUse the transaction reference to monitor the blockchain operation.")
}
