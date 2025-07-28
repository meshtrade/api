package main

import (
	"context"
	"log"

	limit_orderv1 "github.com/meshtrade/api/go/trading/limit_order/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := limit_orderv1.NewLimitOrderService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &limit_orderv1.GetLimitOrderRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the GetLimitOrder method
	order, err := service.GetLimitOrder(ctx, request)
	if err != nil {
		log.Fatalf("GetLimitOrder failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("GetLimitOrder successful: %+v", order)
}
