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

	// Get the existing group to update (example assumes you know the group name)
	// Note: Group names are in format "groups/{ULIDv2}" (e.g. "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU")
	// In practice, you would get this from a previous CreateGroup call or ListGroups result
	existingGroupName := "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU" // Example group name
	existingGroup, err := service.GetGroup(ctx, &groupv1.GetGroupRequest{Name: existingGroupName})
	if err != nil {
		log.Fatalf("Failed to get existing group: %v", err)
	}

	// Create request with complete group data (immutable fields must match existing)
	request := &groupv1.UpdateGroupRequest{
		Group: &groupv1.Group{
			Name:        existingGroup.Name,        // Must match existing
			Owner:       existingGroup.Owner,       // Must match existing  
			DisplayName: "Trading Team Alpha - Updated",      // Can be modified
			Description: "Primary trading team specializing in equity markets, derivatives, and fixed income instruments", // Can be modified
		},
	}

	// Call the UpdateGroup method
	group, err := service.UpdateGroup(ctx, request)
	if err != nil {
		log.Fatalf("UpdateGroup failed: %v", err)
	}

	// Verify the updated group information
	log.Printf("Group updated successfully:")
	log.Printf("  Name: %s (immutable)", group.Name)
	log.Printf("  Display Name: %s (updated)", group.DisplayName)
	log.Printf("  Description: %s (updated)", group.Description)
	log.Printf("  Owner: %s (immutable)", group.Owner)
	log.Printf("  Full Ownership Path: %v", group.Owners)
	
	// Updated group retains all existing relationships and permissions
	log.Printf("Group identity preserved, metadata updated successfully")
}
