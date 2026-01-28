package main

import (
	"context"
	"log"

	user_profilev1 "github.com/meshtrade/api/go/iam/user_profile/v1"
	typev1 "github.com/meshtrade/api/go/type/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := user_profilev1.NewUserProfileService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create search request with filters and sorting
	request := &user_profilev1.SearchUserProfilesRequest{
		DisplayName: "Sarah",       // Search by display name (case-insensitive partial match)
		Email:       "company.com", // Search by email domain (case-insensitive partial match)
		Sorting: &user_profilev1.SearchUserProfilesRequest_Sorting{
			Name: "display_name",                 // Sort by display name
			Order: typev1.SortingOrder_SORTING_ORDER_ASC,
		},
	}

	// Call the SearchUserProfiles method
	response, err := service.SearchUserProfiles(ctx, request)
	if err != nil {
		log.Fatalf("SearchUserProfiles failed: %v", err)
	}

	// Process the search results
	log.Printf("Found %d matching user profiles:", len(response.UserProfiles))
	for i, profile := range response.UserProfiles {
		log.Printf("User Profile %d:", i+1)
		log.Printf("  Name: %s", profile.Name)
		log.Printf("  Display Name: %s", profile.DisplayName)
		log.Printf("  User: %s", profile.GetUser())
		log.Println()
	}
}
