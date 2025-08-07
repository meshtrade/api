package main

import (
	"context"
	"log"

	api_userv1 "github.com/meshtrade/api/go/iam/api_user/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := api_userv1.NewApiUserService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with service-specific parameters
	request := &api_userv1.SearchApiUsersRequest{
		DisplayName: "Integration", // Search for API users with "Integration" in display name
	}

	// Call the SearchApiUsers method
	response, err := service.SearchApiUsers(ctx, request)
	if err != nil {
		log.Fatalf("SearchApiUsers failed: %v", err)
	}

	// Process search results
	log.Printf("Found %d API users matching search criteria", len(response.GetApiUsers()))
	
	for i, apiUser := range response.GetApiUsers() {
		log.Printf("Match %d:", i+1)
		log.Printf("  Name: %s", apiUser.GetName())
		log.Printf("  Display Name: %s", apiUser.GetDisplayName())
		log.Printf("  State: %s", apiUser.GetState().String())
		log.Printf("  Owner: %s", apiUser.GetOwner())
	}
	
	if len(response.GetApiUsers()) == 0 {
		log.Printf("No API users found matching the search criteria")
	}
}
