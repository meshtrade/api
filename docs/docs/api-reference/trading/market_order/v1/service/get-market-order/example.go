package main

import (
	"context"
	"log"

	market_orderv1 "github.com/meshtrade/api/go/trading/market_order/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := market_orderv1.NewMarketOrderService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &market_orderv1.GetMarketOrderRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the GetMarketOrder method
	marketOrder, err := service.GetMarketOrder(ctx, request)
	if err != nil {
		log.Fatalf("GetMarketOrder failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("GetMarketOrder successful: %+v", marketOrder)
}
