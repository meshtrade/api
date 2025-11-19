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

	// Get a limit order by its external reference identifier
	// This is useful when you track orders in your own system using custom IDs
	externalRef := "my-trading-system-order-123"

	request := &limit_orderv1.GetLimitOrderByExternalReferenceRequest{
		ExternalReference: externalRef,
	}

	// Call the GetLimitOrderByExternalReference method
	limitOrder, err := service.GetLimitOrderByExternalReference(ctx, request)
	if err != nil {
		log.Fatalf("GetLimitOrderByExternalReference failed: %v", err)
	}

	// Response contains the limit order matching the external reference
	log.Printf("✓ Limit order found by external reference:")
	log.Printf("  External reference: %s", limitOrder.ExternalReference)
	log.Printf("  Resource name: %s", limitOrder.Name)
	log.Printf("  Account: %s", limitOrder.Account)
	log.Printf("  Side: %s", limitOrder.Side)
	log.Printf("  Limit price: %s %s", limitOrder.LimitPrice.Value.Value, limitOrder.LimitPrice.Token.Code)
	log.Printf("  Quantity: %s %s", limitOrder.Quantity.Value.Value, limitOrder.Quantity.Token.Code)
	log.Printf("\nNote: External references must be unique within your group hierarchy")
}
