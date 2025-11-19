package main

import (
	"context"
	"io"
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

	// Monitor limit orders in real-time via server-side streaming
	// Replace with an actual account resource name from your system
	accountName := "groups/12345/accounts/67890"

	request := &limit_orderv1.MonitorLimitOrderRequest{
		// Optional: Filter by account (monitor only orders for this account)
		Account: accountName,
		// Optional: Filter by external reference
		// ExternalReference: "my-trading-system-order-123",
	}

	// Call the MonitorLimitOrder streaming method
	// This opens a long-lived server-side stream that pushes order updates
	stream, err := service.MonitorLimitOrder(ctx, request)
	if err != nil {
		log.Fatalf("Failed to initiate stream: %v", err)
	}

	log.Printf("✓ Monitoring limit orders for account: %s", accountName)
	log.Println("  Listening for real-time updates... (Ctrl+C to stop)")

	// Consume stream responses
	// The server pushes updates whenever order status changes on the ledger
	updateCount := 0
	for {
		limitOrder, err := stream.Recv()
		if err == io.EOF {
			break // Stream completed normally
		}
		if err != nil {
			log.Fatalf("Stream error: %v", err)
		}

		// Process each order update as it arrives
		updateCount++
		log.Printf("\n📡 Update #%d received:", updateCount)
		log.Printf("  Resource name: %s", limitOrder.Name)
		log.Printf("  Account: %s", limitOrder.Account)
		log.Printf("  External ref: %s", limitOrder.ExternalReference)
		log.Printf("  Side: %s", limitOrder.Side)
		log.Printf("  Status: %s", limitOrder.Status)
		log.Printf("  Limit price: %s %s", limitOrder.LimitPrice.Value.Value, limitOrder.LimitPrice.Token.Code)
		log.Printf("  Quantity: %s %s", limitOrder.Quantity.Value.Value, limitOrder.Quantity.Token.Code)

		// Example: React to specific status changes
		switch limitOrder.Status {
		case limit_orderv1.LimitOrderStatus_LIMIT_ORDER_STATUS_FILLED:
			log.Printf("  🎉 Order fully filled!")
		case limit_orderv1.LimitOrderStatus_LIMIT_ORDER_STATUS_CANCELLED:
			log.Printf("  ❌ Order cancelled")
		case limit_orderv1.LimitOrderStatus_LIMIT_ORDER_STATUS_PARTIALLY_FILLED:
			log.Printf("  ⏳ Order partially filled")
		}
	}

	log.Println("\n✓ Stream completed successfully")
}
