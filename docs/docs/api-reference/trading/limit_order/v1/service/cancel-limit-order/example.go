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
	orderName := "limit_orders/01HQVBZ9F8X2T3K4M5N6P7Q8R9"

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
	log.Printf("  State: %s", response.State)

	// Monitor the order until cancellation is complete
	log.Printf("\n📡 Monitoring order until cancellation is complete...")
	monitorRequest := &limit_orderv1.MonitorLimitOrderRequest{
		Identifier: &limit_orderv1.MonitorLimitOrderRequest_Name{
			Name: orderName,
		},
	}

	stream, err := service.MonitorLimitOrder(ctx, monitorRequest)
	if err != nil {
		log.Fatalf("MonitorLimitOrder failed: %v", err)
	}

monitorOrder:
	for {
		update, err := stream.Recv()
		if err != nil {
			log.Fatalf("Stream error: %v", err)
		}

		log.Printf("  State: %s", update.State)

		switch update.State {
		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATE_CANCELLATION_IN_PROGRESS:
			log.Printf("  ⏳ Order cancellation in progress...")

		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATE_CANCELLED:
			log.Printf("  ✓ Order successfully cancelled on ledger!")
			break monitorOrder
		}
	}
}
