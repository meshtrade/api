package main

import (
	"context"
	"log"

	userv1 "github.com/meshtrade/api/go/iam/user/v1"
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

	// Create request with user resource name
	request := &userv1.GetUserRequest{
		Name: "users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6", // User ULIDv2 identifier
	}

	// Call the GetUser method
	user, err := service.GetUser(ctx, request)
	if err != nil {
		log.Fatalf("GetUser failed: %v", err)
	}

	// Access user details and hierarchy information
	log.Printf("User retrieved successfully:")
	log.Printf("  Name: %s", user.Name)
	log.Printf("  Email: %s", user.Email)
	log.Printf("  Owner: %s", user.Owner)
	// System maintains hierarchical ownership relationships internally
	log.Printf("  Assigned Roles: %v", user.Roles)
	
	// Use user information for access validation
	if len(user.Roles) > 0 {
		log.Printf("User has %d active role assignments", len(user.Roles))
	}
}
