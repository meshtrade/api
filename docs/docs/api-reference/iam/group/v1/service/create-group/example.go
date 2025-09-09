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

	// Get current executing group to use as owner for the new child group
	// Note: Owner format is "groups/{ULIDv2}" (e.g. "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU")  
	// but you can only create groups owned by your authenticated context
	currentGroup, err := service.GetCurrentGroup(ctx)
	if err != nil {
		log.Fatalf("Failed to get current group: %v", err)
	}

	// Create request with group configuration
	request := &groupv1.CreateGroupRequest{
		Group: &groupv1.Group{
			Owner:       currentGroup.Name,  // Current executing group becomes the parent
			DisplayName: "Trading Team Alpha",
			Description: "Primary trading team for equity markets and derivatives",
		},
	}

	// Call the CreateGroup method
	group, err := service.CreateGroup(ctx, request)
	if err != nil {
		log.Fatalf("CreateGroup failed: %v", err)
	}

	// Use the newly created group
	log.Printf("Group created successfully:")
	log.Printf("  Name: %s", group.Name)
	log.Printf("  Display Name: %s", group.DisplayName) 
	log.Printf("  Owner: %s", group.Owner)
	log.Printf("  Description: %s", group.Description)
	
	// The group can now be used to own resources and manage users
	log.Printf("Group is ready to own API users, accounts, and trading resources")
}
