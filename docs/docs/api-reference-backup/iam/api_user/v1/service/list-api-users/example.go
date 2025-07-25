package main

import (
	"context"
	"log"

	api_userv1 "github.com/meshtrade/api/go/iam/api_user/v1"
)

func main() {
	// Create client (loads credentials from MESH_API_CREDENTIALS)
	client, err := api_userv1.NewApiUserService()
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
