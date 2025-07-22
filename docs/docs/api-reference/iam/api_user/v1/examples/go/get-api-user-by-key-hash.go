package main

import (
	"context"
	"log"

	api_userv1 "github.com/meshtrade/api/go/iam/api_user/v1"
)

func main() {
	// Create client (see client-setup.go for details)
	client, err := api_userv1.NewApiUserServiceGRPCClient(
		api_userv1.WithAddress("localhost", 8080),
		api_userv1.WithTLS(false),
		api_userv1.WithAPIKey("your-api-key"),
		api_userv1.WithGroup("your-group-id"),
	)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	// Get API user by key hash (typically used for authentication flows)
	apiUser, err := client.GetApiUserByKeyHash(
		context.Background(),
		&api_userv1.GetApiUserByKeyHashRequest{
			KeyHash: "abcd1234hash5678", // Replace with actual key hash
		},
	)
	if err != nil {
		log.Fatalf("Failed to get API user by key hash: %v", err)
	}

	log.Printf("Found API User: %s", apiUser.Name)
	log.Printf("Display Name: %s", apiUser.DisplayName)
	log.Printf("State: %v", apiUser.State)
}
