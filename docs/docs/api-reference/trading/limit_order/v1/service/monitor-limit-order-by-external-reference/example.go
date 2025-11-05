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

	// Create request with service-specific parameters
	request := &limit_orderv1.MonitorLimitOrderByExternalReferenceRequest{
		// FIXME: Populate service-specific request fields
	}

	// Call the MonitorLimitOrderByExternalReference streaming method
	stream, err := service.MonitorLimitOrderByExternalReference(ctx, request)
	if err != nil {
		log.Fatalf("Failed to initiate stream: %v", err)
	}

	// Consume stream responses
	for {
		limitOrder, err := stream.Recv()
		if err == io.EOF {
			break // Stream completed normally
		}
		if err != nil {
			log.Fatalf("Stream error: %v", err)
		}

		// Process each response as it arrives
		log.Printf("Received: %+v", limitOrder)
	}

	log.Println("Stream completed successfully")
}
