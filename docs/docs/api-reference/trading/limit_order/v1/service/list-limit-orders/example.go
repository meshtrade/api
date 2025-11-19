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

	// List all limit orders in your group hierarchy
	// Use pagination to iterate through large result sets
	request := &limit_orderv1.ListLimitOrdersRequest{
		// Optional: Set to true to enrich with live ledger status (slower)
		LiveLedgerData: false,
		// Optional: Page size for pagination (default: 50, max: 1000)
		PageSize: 100,
		// Optional: Page token from previous response for next page
		// PageToken: "previous-page-token",
	}

	// Call the ListLimitOrders method
	response, err := service.ListLimitOrders(ctx, request)
	if err != nil {
		log.Fatalf("ListLimitOrders failed: %v", err)
	}

	// Response contains paginated list of limit orders
	log.Printf("✓ Listed %d limit orders:", len(response.LimitOrders))
	for i, order := range response.LimitOrders {
		log.Printf("\n  Order #%d:", i+1)
		log.Printf("    Resource name: %s", order.Name)
		log.Printf("    Account: %s", order.Account)
		log.Printf("    External ref: %s", order.ExternalReference)
		log.Printf("    Side: %s", order.Side)
		log.Printf("    Limit price: %s %s", order.LimitPrice.Value.Value, order.LimitPrice.Token.Code)
		log.Printf("    Quantity: %s %s", order.Quantity.Value.Value, order.Quantity.Token.Code)
		log.Printf("    Status: %s", order.Status)
	}

	// Check if there are more pages
	if response.NextPageToken != "" {
		log.Printf("\n  Next page token: %s", response.NextPageToken)
		log.Printf("  Use this token in the next request to fetch more orders")
	}
}
