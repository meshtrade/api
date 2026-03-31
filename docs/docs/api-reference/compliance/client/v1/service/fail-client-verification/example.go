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

	// Fail verification with comments explaining the reason
	request := &clientv1.FailClientVerificationRequest{
		Client:   "compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR",
		Comments: []string{"Missing proof of address documentation"},
	}

	// Call the FailClientVerification method
	client, err := service.FailClientVerification(ctx, request)
	if err != nil {
		log.Fatalf("FailClientVerification failed: %v", err)
	}

	log.Printf("Verification failed, status: %s", client.VerificationStatus)
}
