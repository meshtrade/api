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

	// Monitor a limit order in real-time via server-side streaming
	// You can use either the resource name or external reference

	// Option 1: Monitor by resource name
	request := &limit_orderv1.MonitorLimitOrderRequest{
		Identifier: &limit_orderv1.MonitorLimitOrderRequest_Name{
			Name: "limit_orders/01HQVBZ9F8X2T3K4M5N6P7Q8R9",
		},
	}

	// Option 2: Monitor by external reference (commented out)
	// request := &limit_orderv1.MonitorLimitOrderRequest{
	// 	Identifier: &limit_orderv1.MonitorLimitOrderRequest_ExternalReference{
	// 		ExternalReference: "my-trading-system-order-123",
	// 	},
	// }

	// Call the MonitorLimitOrder streaming method
	// This opens a long-lived server-side stream that pushes order updates
	stream, err := service.MonitorLimitOrder(ctx, request)
	if err != nil {
		log.Fatalf("Failed to initiate stream: %v", err)
	}

	log.Println("✓ Monitoring limit order for real-time updates...")
	log.Println("  Listening for status changes... (Ctrl+C to stop)")

	// Consume stream responses
	// The server pushes updates whenever order status changes on the ledger
monitorOrder:
	for {
		limitOrder, err := stream.Recv()
		if err == io.EOF {
			break // Stream completed normally
		}
		if err != nil {
			log.Fatalf("Stream error: %v", err)
		}

		// Process each order update as it arrives
		log.Printf("\n📡 State update received: %s", limitOrder.State)
		log.Printf("  Resource name: %s", limitOrder.Name)
		log.Printf("  Account: %s", limitOrder.Account)
		log.Printf("  External ref: %s", limitOrder.ExternalReference)
		log.Printf("  Side: %s", limitOrder.Side)
		log.Printf("  Limit price: %s %s", limitOrder.LimitPrice.Value.Value, limitOrder.LimitPrice.Token.Code)
		log.Printf("  Quantity: %s %s", limitOrder.Quantity.Value.Value, limitOrder.Quantity.Token.Code)

		// Handle order state transitions
		switch limitOrder.State {
		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATUS_SUBMISSION_IN_PROGRESS:
			log.Printf("  ⏳ Order submission in progress...")

		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATUS_SUBMISSION_FAILED:
			log.Printf("  ❌ Order submission failed")
			break monitorOrder

		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATUS_OPEN:
			log.Printf("  ✓ Order open on ledger and available for matching")
			// Order is active - continue monitoring for fills

		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATUS_COMPLETE_IN_PROGRESS:
			log.Printf("  ⏳ Order completion in progress...")

		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATUS_COMPLETE:
			log.Printf("  🎉 Order completed (fully filled)!")
			break monitorOrder

		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATUS_CANCELLATION_IN_PROGRESS:
			log.Printf("  ⏳ Order cancellation in progress...")

		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATUS_CANCELLED:
			log.Printf("  ❌ Order cancelled")
			break monitorOrder

		default:
			log.Printf("  ⚠️  Unexpected order state: %v", limitOrder.State)
		}
	}

	log.Println("\n✓ Stream completed successfully")
}
