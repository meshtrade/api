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

	// Activate API user
	activatedUser, err := client.ActivateApiUser(
		context.Background(),
		&api_userv1.ActivateApiUserRequest{
			Name: "groups/your-group/apiUsers/api-user-123",
		},
	)
	if err != nil {
		log.Fatalf("Failed to activate API user: %v", err)
	}

	log.Printf("Activated API user: %s", activatedUser.Name)
	log.Printf("New state: %s", activatedUser.State)
}
