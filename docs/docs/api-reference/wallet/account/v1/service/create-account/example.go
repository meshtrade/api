package main

import (
	"context"
	"log"

	typev1 "github.com/meshtrade/api/go/type/v1"
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
	request := &accountv1.CreateAccountRequest{
		Account: &accountv1.Account{
			Owner:       "groups/01HQ3K5M8XYZ2NFVJT9BKR7P4C", // Your group ID
			Ledger:      typev1.Ledger_LEDGER_STELLAR,        // Choose ledger network
			DisplayName: "Primary Trading Account",
		},
	}

	// Call the CreateAccount method
	account, err := service.CreateAccount(ctx, request)
	if err != nil {
		log.Fatalf("CreateAccount failed: %v", err)
	}

	// The account is created but not yet open on-chain
	log.Printf("Account created successfully:")
	log.Printf("  Name: %s", account.Name)
	log.Printf("  Number: %s", account.Number)
	log.Printf("  Ledger: %s", account.Ledger)
	log.Printf("  State: %s", account.State)
}
