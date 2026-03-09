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

	// Start verification for a client
	request := &clientv1.StartClientVerificationRequest{
		Client: "compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR",
	}

	// Call the StartClientVerification method
	client, err := service.StartClientVerification(ctx, request)
	if err != nil {
		log.Fatalf("StartClientVerification failed: %v", err)
	}

	log.Printf("Verification started, status: %s", client.VerificationStatus)
}
