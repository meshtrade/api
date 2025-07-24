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

	// Deactivate API user
	deactivatedUser, err := client.DeactivateApiUser(
		context.Background(),
		&api_userv1.DeactivateApiUserRequest{
			Name: "groups/your-group/apiUsers/api-user-123",
		},
	)
	if err != nil {
		log.Fatalf("Failed to deactivate API user: %v", err)
	}

	log.Printf("Deactivated API user: %s", deactivatedUser.Name)
	log.Printf("New state: %s", deactivatedUser.State)
}
