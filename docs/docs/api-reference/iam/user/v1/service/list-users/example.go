package main

import (
	"context"
	"log"

	userv1 "github.com/meshtrade/api/go/iam/user/v1"
	typev1 "github.com/meshtrade/api/go/type/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := userv1.NewUserService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with optional sorting
	request := &userv1.ListUsersRequest{
		Sorting: &userv1.ListUsersRequest_Sorting{
			Field: "email", // Sort by email address
			Order: typev1.SortingOrder_SORTING_ORDER_ASC,
		},
	}

	// Call the ListUsers method
	response, err := service.ListUsers(ctx, request)
	if err != nil {
		log.Fatalf("ListUsers failed: %v", err)
	}

	// Process the user directory
	log.Printf("Found %d users in the accessible hierarchy:", len(response.Users))
	for i, user := range response.Users {
		log.Printf("User %d:", i+1)
		log.Printf("  Name: %s", user.Name)
		log.Printf("  Email: %s", user.Email)
		log.Printf("  Owner: %s", user.Owner)
		log.Printf("  Roles: %d assigned", len(user.Roles))
		log.Println()
	}
	
}
