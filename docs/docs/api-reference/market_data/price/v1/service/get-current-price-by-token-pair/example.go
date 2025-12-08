package main

import (
	"context"
	"log"

	pricev1 "github.com/meshtrade/api/go/market_data/price/v1"
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

	// Create request with service-specific parameters
	request := &pricev1.GetCurrentPriceByTokenPairRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the GetCurrentPriceByTokenPair method
	price, err := service.GetCurrentPriceByTokenPair(ctx, request)
	if err != nil {
		log.Fatalf("GetCurrentPriceByTokenPair failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("GetCurrentPriceByTokenPair successful: %+v", price)
}
