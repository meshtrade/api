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

	// Search API users by display name
	searchResponse, err := client.SearchApiUsers(
		context.Background(),
		&api_userv1.SearchApiUsersRequest{
			DisplayName: "MyAPI",
		},
	)
	if err != nil {
		log.Fatalf("Failed to search API users: %v", err)
	}

	log.Printf("Found %d API users matching 'MyAPI':", len(searchResponse.ApiUsers))
	for _, user := range searchResponse.ApiUsers {
		log.Printf("- %s (%s)", user.Name, user.DisplayName)
	}
}
