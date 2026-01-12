package main

import (
	"context"
	"log"

	pricev1 "github.com/meshtrade/api/go/market_data/price/v1"
	type_v1 "github.com/meshtrade/api/go/type/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := pricev1.NewPriceService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request to get gold (XAU) price in ZAR
	request := &pricev1.GetCurrentPriceByTokenPairRequest{
		BaseToken: &type_v1.Token{
			Code: "XAU", // Gold - the token to price
		},
		QuoteToken: &type_v1.Token{
			Code: "ZAR", // South African Rand - the currency to price it in
		},
	}

	// Call the GetCurrentPriceByTokenPair method
	price, err := service.GetCurrentPriceByTokenPair(ctx, request)
	if err != nil {
		log.Fatalf("GetCurrentPriceByTokenPair failed: %v", err)
	}

	// Display the price information
	log.Printf("Price retrieved successfully:")
	log.Printf("  Base Token: %s", price.BaseToken.Code)
	log.Printf("  Quote Token: %s", price.QuoteToken.Code)
	log.Printf("  Mid Price: %s", price.MidPrice.Value)
	log.Printf("  Timestamp: %s", price.Time.AsTime())
}
