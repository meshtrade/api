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

	// List all API users in the group
	response, err := client.ListApiUsers(
		context.Background(),
		&api_userv1.ListApiUsersRequest{},
	)
	if err != nil {
		log.Fatalf("Failed to list API users: %v", err)
	}

	log.Printf("Found %d API users:", len(response.ApiUsers))
	for _, apiUser := range response.ApiUsers {
		log.Printf("- %s (%s) - State: %v", 
			apiUser.Name, 
			apiUser.DisplayName, 
			apiUser.State)
	}
}
