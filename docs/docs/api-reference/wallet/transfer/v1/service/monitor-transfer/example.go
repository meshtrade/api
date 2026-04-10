package main

import (
	"context"
	"io"
	"log"

	transferv1 "github.com/meshtrade/api/go/wallet/transfer/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := transferv1.NewTransferService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Monitor a specific transfer for real-time state updates
	request := &transferv1.MonitorTransferRequest{
		Name: "wallet/transfers/01HQ3K5M8XYZ2NFVJT9BKR7P4C", // Transfer resource name
	}

	// Call the MonitorTransfer streaming method
	stream, err := service.MonitorTransfer(ctx, request)
	if err != nil {
		log.Fatalf("Failed to initiate stream: %v", err)
	}

	// Consume stream responses as the transfer state changes
	for {
		transfer, err := stream.Recv()
		if err == io.EOF {
			break // Stream completed normally
		}
		if err != nil {
			log.Fatalf("Stream error: %v", err)
		}

		// React to state changes
		log.Printf("Transfer %s state: %s", transfer.Number, transfer.State)

		if transfer.State == transferv1.TransferState_TRANSFER_STATE_SUCCESSFUL {
			log.Printf("Transfer completed successfully")
			log.Printf("  Fee: %s", transfer.Fee.Amount.Value)
			break
		}
		if transfer.State == transferv1.TransferState_TRANSFER_STATE_FAILED {
			log.Printf("Transfer failed")
			break
		}
	}
}
