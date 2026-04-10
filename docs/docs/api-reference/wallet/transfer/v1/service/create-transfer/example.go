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

	// Create request with transfer details
	request := &transferv1.CreateTransferRequest{
		Transfer: &transferv1.Transfer{
			Owner: service.Group(),                                          // Current group from service context
			From:  "GBZH4LMGAYUDNFPNFGOBKU76DDRJHIAKGKGO2LNZFLQB6DMKV7EYHT", // Source ledger address
			To:    "GCWNBLOHV5DKRG5UXKMO5IDAJLVSRRPGZJ5REWQPCT2LGXVQZQGWE3F", // Destination ledger address
			Amount: &typev1.Amount{
				Token: &typev1.Token{
					Code:   "USDC",
					Issuer: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
					Ledger: typev1.Ledger_LEDGER_STELLAR,
				},
				Value: &typev1.Decimal{Value: "100.50"},
			},
			Description:     "Payment for invoice #1234",  // Optional reason for the transfer
			IncludeInLedger: true,                          // Include description in on-chain transaction
		},
	}

	// Call the CreateTransfer method
	transfer, err := service.CreateTransfer(ctx, request)
	if err != nil {
		log.Fatalf("CreateTransfer failed: %v", err)
	}

	// Transfer has been created and submitted on-chain
	log.Printf("Transfer created successfully:")
	log.Printf("  Name: %s", transfer.Name)
	log.Printf("  Number: %s", transfer.Number)
	log.Printf("  State: %s", transfer.State)
	log.Printf("  Fee: %s", transfer.Fee.Amount.Value)
}
