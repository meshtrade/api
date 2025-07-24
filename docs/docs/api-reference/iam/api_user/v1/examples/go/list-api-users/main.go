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

	// List API users
	listResponse, err := client.ListApiUsers(
		context.Background(),
		&api_userv1.ListApiUsersRequest{},
	)
	if err != nil {
		log.Fatalf("Failed to list API users: %v", err)
	}

	log.Printf("Found %d API users:", len(listResponse.ApiUsers))
	for _, user := range listResponse.ApiUsers {
		log.Printf("- %s (%s) - State: %s", 
			user.Name, 
			user.DisplayName, 
			user.State)
	}
}
