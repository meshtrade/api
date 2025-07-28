package main

import (
	"context"
	"log"

	clientv1 "github.com/meshtrade/api/go/compliance/client/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := clientv1.NewClientService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Call the ListClients method (no request parameters)
	response, err := service.ListClients(ctx)
	if err != nil {
		log.Fatalf("ListClients failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("ListClients successful: %+v", response)
}
