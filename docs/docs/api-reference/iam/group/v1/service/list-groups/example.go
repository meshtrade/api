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

	// Call the ListGroups method (no request parameters)
	response, err := service.ListGroups(ctx)
	if err != nil {
		log.Fatalf("ListGroups failed: %v", err)
	}

	// FIXME: Add relevant response object usage
	log.Printf("ListGroups successful: %+v", response)
}
