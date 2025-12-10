package main

import (
	"context"
	"log"

	limit_orderv1 "github.com/meshtrade/api/go/trading/limit_order/v1"
	type_v1 "github.com/meshtrade/api/go/type/v1"
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

	// Create a buy limit order for 10 USDC at a limit price of 100.50 USDC
	// Note: You need a valid account resource name from the Wallet Account service
	request := &limit_orderv1.CreateLimitOrderRequest{
		LimitOrder: &limit_orderv1.LimitOrder{
			// Owner must be a valid group resource name
			Owner: "groups/01HQVBZ9F8X2T3K4M5N6P7Q8R9",
			// Account must be a valid Stellar account owned by your group
			Account: "accounts/01HQVBZ9F8X2T3K4M5N6P7Q8R9",
			// Optional: External reference for tracking in your system
			ExternalReference: "my-trading-system-order-123",
			// Buy side - use LIMIT_ORDER_SIDE_SELL for selling
			Side: limit_orderv1.LimitOrderSide_LIMIT_ORDER_SIDE_BUY,
			// Limit price: maximum price you're willing to pay (100.50 USDC)
			LimitPrice: &type_v1.Amount{
				Value: &type_v1.Decimal{
					Value: "100.50",
				},
				Token: &type_v1.Token{
					Code:   "USDC",
					Issuer: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
					Ledger: type_v1.Ledger_LEDGER_STELLAR,
				},
			},
			// Quantity: amount you want to buy (10 USDC)
			Quantity: &type_v1.Amount{
				Value: &type_v1.Decimal{
					Value: "10",
				},
				Token: &type_v1.Token{
					Code:   "USDC",
					Issuer: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
					Ledger: type_v1.Ledger_LEDGER_STELLAR,
				},
			},
		},
	}

	// Call the CreateLimitOrder method
	limitOrder, err := service.CreateLimitOrder(ctx, request)
	if err != nil {
		log.Fatalf("CreateLimitOrder failed: %v", err)
	}

	// Response contains the created order with system-generated resource name and number
	log.Printf("✓ Limit order created successfully!")
	log.Printf("  Resource name: %s", limitOrder.Name)
	log.Printf("  Number: %s", limitOrder.Number)
	log.Printf("  External reference: %s", limitOrder.ExternalReference)
	log.Printf("  Account: %s", limitOrder.Account)
	log.Printf("  Side: %s", limitOrder.Side)
	log.Printf("  Limit price: %s %s", limitOrder.LimitPrice.Value.Value, limitOrder.LimitPrice.Token.Code)
	log.Printf("  Quantity: %s %s", limitOrder.Quantity.Value.Value, limitOrder.Quantity.Token.Code)

	// Monitor the order until it opens on the ledger
	log.Printf("\n📡 Monitoring order until it opens on the ledger...")
	monitorRequest := &limit_orderv1.MonitorLimitOrderRequest{
		Identifier: &limit_orderv1.MonitorLimitOrderRequest_Name{
			Name: limitOrder.Name,
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
		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATE_SUBMISSION_IN_PROGRESS:
			log.Printf("  ⏳ Order submission in progress...")

		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATE_SUBMISSION_FAILED:
			log.Fatalf("  ❌ Order submission failed")

		case limit_orderv1.LimitOrderState_LIMIT_ORDER_STATE_OPEN:
			log.Printf("  ✓ Order is now open on the ledger and available for matching!")
			break monitorOrder
		}
	}
}
