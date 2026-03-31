package main

import (
	"context"
	"log"
	"time"

	clientv1 "github.com/meshtrade/api/go/compliance/client/v1"
	"google.golang.org/protobuf/types/known/timestamppb"
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

	// Mark client as verified with next review date in one year
	request := &clientv1.MarkClientVerifiedRequest{
		Client:               "compliance/clients/01HQZXYZ9ABCDEFGHIJKLMNPQR",
		NextVerificationDate: timestamppb.New(time.Now().AddDate(1, 0, 0)),
	}

	// Call the MarkClientVerified method
	client, err := service.MarkClientVerified(ctx, request)
	if err != nil {
		log.Fatalf("MarkClientVerified failed: %v", err)
	}

	log.Printf("Client verified, next review: %s", client.NextVerificationDate.AsTime())
}
