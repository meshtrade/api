package main

import (
	"context"
	"log"

	api_userv1 "github.com/meshtrade/api/go/iam/api_user/v1"
)

func main() {
	// Create client (loads credentials from MESH_API_CREDENTIALS)
	client, err := api_userv1.NewApiUserServiceGRPCClient()
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	// Get API user by key hash (used by authentication system)
	retrievedUser, err := client.GetApiUserByKeyHash(
		context.Background(),
		&api_userv1.GetApiUserByKeyHashRequest{
			KeyHash: "api-key-hash-generated-by-authoriser",
		},
	)
	if err != nil {
		log.Fatalf("Failed to get API user by key hash: %v", err)
	}

	log.Printf("Found API User: %s", retrievedUser.Name)
	log.Printf("Display Name: %s", retrievedUser.DisplayName)
	log.Printf("State: %s", retrievedUser.State)
}
