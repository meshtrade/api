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

	// Activate the API user by name
	apiUser, err := client.ActivateApiUser(
		context.Background(),
		&api_userv1.ActivateApiUserRequest{
			Name: "api_users/01HPQR2S3T4U5V6W7X8Y9Z0123", // Replace with actual API user name
		},
	)
	if err != nil {
		log.Fatalf("Failed to activate API user: %v", err)
	}

	log.Printf("Activated API user: %s", apiUser.Name)
	log.Printf("State: %v", apiUser.State)
}
