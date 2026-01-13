package main

import (
	"context"
	"log"

	typev1 "github.com/meshtrade/api/go/type/v1"
	token_tapv1 "github.com/meshtrade/api/go/testing/ledger/token_tap/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := token_tapv1.NewTokenTapService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create a test token (USDC on Stellar)
	testToken := &typev1.Token{
		Code:   "USDC",
		Issuer: "GBUQWP3BOUZX34ULNQG23RQ6F4BWFIDBIS7XYPV5NPROCEWV2E2YXNU",
		Ledger: typev1.Ledger_LEDGER_STELLAR,
	}

	// Mint tokens to a test address with optional network-specific options
	request := &token_tapv1.MintTokenRequest{
		// Specify the amount to mint (required)
		Amount: &typev1.Amount{
			Token: testToken,
			Value: &typev1.Decimal{
				Value: "1000000",
			},
		},
		// Specify the recipient address (required)
		Address: "GDQXVHH7QVVQSHCXU7ZDM4C2DAQF7UEQWPX3JHG7LJ2YS6FLXJY5E2SZ",
		// Optional: Network-specific options (Stellar or Solana)
		Options: &token_tapv1.MintTokenOptions{
			MintTokenOptions: &token_tapv1.MintTokenOptions_StellarMintOptions{
				StellarMintOptions: &token_tapv1.StellarMintOptions{
					StellarMintOptions: []*token_tapv1.StellarMintOption{
						{
							StellarMintOption: &token_tapv1.StellarMintOption_StellarMintTokenWithMemo{
								StellarMintTokenWithMemo: &token_tapv1.StellarMintTokenWithMemo{
									Memo: "test-mint-001",
								},
							},
						},
					},
				},
			},
		},
	}

	// Call the MintToken method
	response, err := service.MintToken(ctx, request)
	if err != nil {
		log.Fatalf("MintToken failed: %v", err)
	}

	// Token has been minted successfully
	log.Printf("Token minted successfully: %+v", response)
}
