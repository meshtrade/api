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

	// Update the client's display name
	request := &clientv1.UpdateClientRequest{
		Client: &clientv1.Client{
			Name:        "compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR",
			DisplayName: "Updated Client Name",
			ShortName:   "UCN",
		},
	}

	// Call the UpdateClient method
	client, err := service.UpdateClient(ctx, request)
	if err != nil {
		log.Fatalf("UpdateClient failed: %v", err)
	}

	log.Printf("Client updated: %s", client.DisplayName)
}
