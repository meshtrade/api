package main

import (
	"context"
	"log"

	groupv1 "github.com/meshtrade/api/go/iam/group/v1"
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

	// Create request with group resource name
	request := &groupv1.GetGroupRequest{
		Name: "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU", // Group ULIDv2 identifier
	}

	// Call the GetGroup method
	group, err := service.GetGroup(ctx, request)
	if err != nil {
		log.Fatalf("GetGroup failed: %v", err)
	}

	// Access group details and hierarchy information
	log.Printf("Group retrieved successfully:")
	log.Printf("  Name: %s", group.Name)
	log.Printf("  Display Name: %s", group.DisplayName)
	log.Printf("  Description: %s", group.Description)
	log.Printf("  Direct Owner: %s", group.Owner)
	log.Printf("  Full Ownership Path: %v", group.Owners)
	
	// Use group information for resource ownership validation
	if len(group.Owners) > 1 {
		log.Printf("Group has %d levels in the hierarchy", len(group.Owners))
	}
}
