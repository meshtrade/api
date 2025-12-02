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

	// Search limit orders with optional filters
	// Replace with an actual account resource name from your system
	accountName := "accounts/01HQVBZ9F8X2T3K4M5N6P7Q8R9"

	request := &limit_orderv1.SearchLimitOrdersRequest{
		// Optional: Filter by token code
		Token: "USDC",
		// Optional: Filter by account (returns only orders for this account)
		Account: accountName,
		// Optional: Set to true to enrich with live ledger status
		LiveLedgerData: true,
	}

	// Call the SearchLimitOrders method
	response, err := service.SearchLimitOrders(ctx, request)
	if err != nil {
		log.Fatalf("SearchLimitOrders failed: %v", err)
	}

	// Response contains filtered list of limit orders
	log.Printf("✓ Found %d limit orders matching filters:", len(response.LimitOrders))
	for i, order := range response.LimitOrders {
		log.Printf("\n  Order #%d:", i+1)
		log.Printf("    Resource name: %s", order.Name)
		log.Printf("    Account: %s", order.Account)
		log.Printf("    External ref: %s", order.ExternalReference)
		log.Printf("    Side: %s", order.Side)
		log.Printf("    State: %s", order.State)
		log.Printf("    Limit price: %s %s", order.LimitPrice.Value.Value, order.LimitPrice.Token.Code)
		log.Printf("    Quantity: %s %s", order.Quantity.Value.Value, order.Quantity.Token.Code)
	}
}
