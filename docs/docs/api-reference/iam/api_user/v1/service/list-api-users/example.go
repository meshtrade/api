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

	// Create request (no parameters needed for basic list)
	request := &api_userv1.ListApiUsersRequest{}

	// Call the ListApiUsers method
	response, err := service.ListApiUsers(ctx, request)
	if err != nil {
		log.Fatalf("ListApiUsers failed: %v", err)
	}

	// Process the list of API users
	log.Printf("Found %d API users", len(response.GetApiUsers()))
	
	for i, apiUser := range response.GetApiUsers() {
		log.Printf("API User %d:", i+1)
		log.Printf("  Name: %s", apiUser.GetName())
		log.Printf("  Display Name: %s", apiUser.GetDisplayName())
		log.Printf("  State: %s", apiUser.GetState().String())
		log.Printf("  Owner: %s", apiUser.GetOwner())
	}
	
}
