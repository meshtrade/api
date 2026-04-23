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

	// Create request with the transfer amount to calculate fees for
	request := &transferv1.CalculateTransferFeeRequest{
		Amount: &typev1.Amount{
			Token: &typev1.Token{
				Code:   "USDC",
				Issuer: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
				Ledger: typev1.Ledger_LEDGER_STELLAR,
			},
			Value: &typev1.Decimal{Value: "1000.00"},
		},
	}

	// Call the CalculateTransferFee method
	response, err := service.CalculateTransferFee(ctx, request)
	if err != nil {
		log.Fatalf("CalculateTransferFee failed: %v", err)
	}

	// Display the fee breakdown
	log.Printf("Transfer fee breakdown:")
	log.Printf("  Fee Amount: %s %s", response.FeeAmount.Value.Value, response.FeeAmount.Token.Code)
	log.Printf("  VAT Amount: %s %s", response.VatAmount.Value.Value, response.VatAmount.Token.Code)
	log.Printf("  VAT Rate: %s", response.VatRate.Value)
}
