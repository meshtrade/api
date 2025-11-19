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

	// Cancel an active limit order by its resource name
	// Replace with an actual limit order resource name from your system
	orderName := "groups/12345/accounts/67890/limitOrders/abc123"

	request := &limit_orderv1.CancelLimitOrderRequest{
		Name: orderName,
	}

	// Call the CancelLimitOrder method
	response, err := service.CancelLimitOrder(ctx, request)
	if err != nil {
		log.Fatalf("CancelLimitOrder failed: %v", err)
	}

	// Response contains the cancellation status
	log.Printf("✓ Limit order cancellation initiated:")
	log.Printf("  Order name: %s", orderName)
	log.Printf("  Status: %s", response.Status)

	// Terminal cancellation states:
	// - LIMIT_ORDER_STATUS_CANCELLATION_IN_PROGRESS: Cancel submitted to ledger
	// - LIMIT_ORDER_STATUS_CANCELLED: Cancel confirmed on ledger
	if response.Status == limit_orderv1.LimitOrderStatus_LIMIT_ORDER_STATUS_CANCELLED {
		log.Printf("  ✓ Order successfully cancelled on ledger")
	} else if response.Status == limit_orderv1.LimitOrderStatus_LIMIT_ORDER_STATUS_CANCELLATION_IN_PROGRESS {
		log.Printf("  ⏳ Cancellation in progress, check status later")
	}
}
