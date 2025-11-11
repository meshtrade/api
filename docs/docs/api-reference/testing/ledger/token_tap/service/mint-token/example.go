package main

import (
	"context"
	"log"

	ledgerv1 "github.com/meshtrade/api/go/testing/ledger/token_tap/v1"
	type_v1 "github.com/meshtrade/api/go/type/v1"
	"github.com/shopspring/decimal"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := ledgerv1.NewTokenTapService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &ledgerv1.MintTokenRequest{
		Amount: &type_v1.Amount{
			Token: &type_v1.Token{
				Code:   "mZAR",
				Issuer: "Emcuqgub4rddZMceYqg5tJHGbtn9AhjdYnmvK9qrkR6b",
				Ledger: type_v1.Ledger_LEDGER_SOLANA,
			},
			Value: type_v1.FromShopspringDecimal(decimal.NewFromInt(10)),
		},
	}

	// Call the MintToken method
	_, err = service.MintToken(ctx, request)
	if err != nil {
		log.Fatalf("MintToken failed: %v", err)
	}
}
