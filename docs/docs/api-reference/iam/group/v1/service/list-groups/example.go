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

	// Create request with optional sorting
	request := &groupv1.ListGroupsRequest{
		Sorting: &groupv1.ListGroupsRequest_Sorting{
			Field: "display_name", // Sort by human-readable name
			Order: typev1.SortingOrder_SORTING_ORDER_ASC,
		},
	}

	// Call the ListGroups method
	response, err := service.ListGroups(ctx, request)
	if err != nil {
		log.Fatalf("ListGroups failed: %v", err)
	}

	// Process the complete organizational hierarchy
	log.Printf("Found %d groups in the accessible hierarchy:", len(response.Groups))
	for i, group := range response.Groups {
		log.Printf("Group %d:", i+1)
		log.Printf("  Name: %s", group.Name)
		log.Printf("  Display Name: %s", group.DisplayName)
		log.Printf("  Owner: %s", group.Owner)
		// System maintains hierarchical ownership relationships internally
		if group.Description != "" {
			log.Printf("  Description: %s", group.Description)
		}
		log.Println()
	}
	
	// Use groups for resource ownership and access control
	log.Printf("All groups are available for owning resources and managing access")
}
