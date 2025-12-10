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

	// Get a limit order by its resource name
	// Replace with an actual limit order resource name from your system
	orderName := "limit_orders/01HQVBZ9F8X2T3K4M5N6P7Q8R9"

	// Example 1: Get without live ledger data (faster, but status will be UNSPECIFIED)
	request := &limit_orderv1.GetLimitOrderRequest{
		Name:           orderName,
		LiveLedgerData: false,
	}

	limitOrder, err := service.GetLimitOrder(ctx, request)
	if err != nil {
		log.Fatalf("GetLimitOrder failed: %v", err)
	}

	log.Printf("✓ Limit order retrieved (cached data):")
	log.Printf("  Resource name: %s", limitOrder.Name)
	log.Printf("  Number: %s", limitOrder.Number)
	log.Printf("  Account: %s", limitOrder.Account)
	log.Printf("  External reference: %s", limitOrder.ExternalReference)
	log.Printf("  Side: %s", limitOrder.Side)
	log.Printf("  State: %s (UNSPECIFIED when live_ledger_data=false)", limitOrder.State)

	// Example 2: Get with live ledger data (queries the ledger for current status)
	requestWithLiveData := &limit_orderv1.GetLimitOrderRequest{
		Name:           orderName,
		LiveLedgerData: true,
	}

	limitOrderWithStatus, err := service.GetLimitOrder(ctx, requestWithLiveData)
	if err != nil {
		log.Fatalf("GetLimitOrder with live data failed: %v", err)
	}

	log.Printf("\n✓ Limit order retrieved (with live ledger data):")
	log.Printf("  Resource name: %s", limitOrderWithStatus.Name)
	log.Printf("  State: %s", limitOrderWithStatus.State)
	log.Printf("  Limit price: %s %s", limitOrderWithStatus.LimitPrice.Value.Value, limitOrderWithStatus.LimitPrice.Token.Code)
	log.Printf("  Quantity: %s %s", limitOrderWithStatus.Quantity.Value.Value, limitOrderWithStatus.Quantity.Token.Code)
}
