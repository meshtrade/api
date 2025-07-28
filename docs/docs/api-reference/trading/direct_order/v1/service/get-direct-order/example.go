package main

import (
	"context"
	"log"

	direct_orderv1 "github.com/meshtrade/api/go/trading/direct_order/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := direct_orderv1.NewDirectOrderService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &direct_orderv1.GetDirectOrderRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the GetDirectOrder method
	order, err := service.GetDirectOrder(ctx, request)
	if err != nil {
		log.Fatalf("GetDirectOrder failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("GetDirectOrder successful: %+v", order)
}
