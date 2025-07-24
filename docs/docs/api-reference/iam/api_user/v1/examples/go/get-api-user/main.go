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

	// Get API user by name
	retrievedUser, err := client.GetApiUser(
		context.Background(),
		&api_userv1.GetApiUserRequest{
			Name: "groups/your-group/apiUsers/api-user-123",
		},
	)
	if err != nil {
		log.Fatalf("Failed to get API user: %v", err)
	}

	log.Printf("API User: %s", retrievedUser.Name)
	log.Printf("Display Name: %s", retrievedUser.DisplayName)
	log.Printf("Owner: %s", retrievedUser.Owner)
	log.Printf("State: %s", retrievedUser.State)
	log.Printf("Roles: %v", retrievedUser.Roles)
}
