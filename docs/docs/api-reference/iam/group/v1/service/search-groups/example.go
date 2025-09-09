package main

import (
	"context"
	"log"

	groupv1 "github.com/meshtrade/api/go/iam/group/v1"
	typev1 "github.com/meshtrade/api/go/type/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := groupv1.NewGroupService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with search criteria
	request := &groupv1.SearchGroupsRequest{
		DisplayName: "trading",      // Search for groups with "trading" in display name
		Description: "derivatives",  // OR groups with "derivatives" in description
		Sorting: &groupv1.SearchGroupsRequest_Sorting{
			Field: "display_name",
			Order: typev1.SortingOrder_SORTING_ORDER_ASC,
		},
	}

	// Call the SearchGroups method
	response, err := service.SearchGroups(ctx, request)
	if err != nil {
		log.Fatalf("SearchGroups failed: %v", err)
	}

	// Process search results with OR logic
	log.Printf("Found %d groups matching search criteria:", len(response.Groups))
	log.Println("(Groups matching 'trading' in name OR 'derivatives' in description)")
	
	for i, group := range response.Groups {
		log.Printf("Result %d:", i+1)
		log.Printf("  Name: %s", group.Name)
		log.Printf("  Display Name: %s", group.DisplayName)
		log.Printf("  Description: %s", group.Description)
		log.Printf("  Owner: %s", group.Owner)
		log.Println()
	}
	
	// Use filtered results for targeted operations
	if len(response.Groups) > 0 {
		log.Printf("Search found relevant groups for specialized operations")
	}
}
