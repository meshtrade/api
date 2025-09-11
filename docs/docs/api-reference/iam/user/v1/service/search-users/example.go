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

	// Search for users by email substring
	request := &userv1.SearchUsersRequest{
		Email: "thompson", // Substring to search for in email addresses
		Sorting: &userv1.SearchUsersRequest_Sorting{
			Field: "email", // Sort results by email address
			Order: typev1.SortingOrder_SORTING_ORDER_ASC,
		},
	}

	// Call the SearchUsers method  
	response, err := service.SearchUsers(ctx, request)
	if err != nil {
		log.Fatalf("SearchUsers failed: %v", err)
	}

	// Process search results
	if len(response.Users) == 0 {
		log.Printf("No users found matching email pattern: %s", request.Email)
	} else {
		log.Printf("Found %d users matching '%s':", len(response.Users), request.Email)
		for i, user := range response.Users {
			log.Printf("User %d:", i+1)
			log.Printf("  Name: %s", user.Name)
			log.Printf("  Email: %s", user.Email)
			log.Printf("  Owner: %s", user.Owner)
			log.Printf("  Roles: %d assigned", len(user.Roles))
			log.Println()
		}
	}
}
