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
	accountName := "groups/12345/accounts/67890"

	request := &limit_orderv1.SearchLimitOrdersRequest{
		// Optional: Filter by account (returns only orders for this account)
		Account: accountName,
		// Optional: Filter by external reference
		// ExternalReference: "my-trading-system-order-123",
		// Optional: Set to true to enrich with live ledger status
		LiveLedgerData: true,
		// Optional: Page size for pagination (default: 50, max: 1000)
		PageSize: 100,
		// Optional: Page token from previous response for next page
		// PageToken: "previous-page-token",
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
		log.Printf("    Status: %s", order.Status)
		log.Printf("    Limit price: %s %s", order.LimitPrice.Value.Value, order.LimitPrice.Token.Code)
		log.Printf("    Quantity: %s %s", order.Quantity.Value.Value, order.Quantity.Token.Code)
	}

	// Check if there are more pages
	if response.NextPageToken != "" {
		log.Printf("\n  Next page token: %s", response.NextPageToken)
		log.Printf("  Use this token in the next request to fetch more orders")
	}
}
