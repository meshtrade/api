package main

import (
	"context"
	"log"

	api_userv1 "github.com/meshtrade/api/go/iam/api_user/v1"
)

func main() {
	// Create client (see ../client-setup/main.go for details)
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

	// Get a specific API user by name
	apiUser, err := client.GetApiUser(
		context.Background(),
		&api_userv1.GetApiUserRequest{
			Name: "api_users/01HPQR2S3T4U5V6W7X8Y9Z0123", // Replace with actual API user name
		},
	)
	if err != nil {
		log.Fatalf("Failed to get API user: %v", err)
	}

	log.Printf("API User: %s", apiUser.Name)
	log.Printf("Display Name: %s", apiUser.DisplayName)
	log.Printf("Owner: %s", apiUser.Owner)
	log.Printf("State: %v", apiUser.State)
	log.Printf("Roles: %v", apiUser.Roles)
}
