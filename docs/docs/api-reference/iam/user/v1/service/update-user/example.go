package main

import (
	"context"
	"log"

	rolev1 "github.com/meshtrade/api/go/iam/role/v1"
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

	// Update user with modified information
	request := &userv1.UpdateUserRequest{
		User: &userv1.User{
			Name:  "users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6", // Existing user identifier
			Owner: service.Group(),                      // Owner must match current ownership
			Email: "sarah.t.johnson@company.com",        // Updated email address
			Roles: []string{
				rolev1.Role_ROLE_IAM_ADMIN.FullResourceNameFromGroupName(service.Group()),
				rolev1.Role_ROLE_TRADING_ADMIN.FullResourceNameFromGroupName(service.Group()),
				rolev1.Role_ROLE_COMPLIANCE_VIEWER.FullResourceNameFromGroupName(service.Group()),
			},
		},
	}

	// Call the UpdateUser method
	user, err := service.UpdateUser(ctx, request)
	if err != nil {
		log.Fatalf("UpdateUser failed: %v", err)
	}

	// Use the updated user
	log.Printf("User updated successfully:")
	log.Printf("  Name: %s", user.Name)
	log.Printf("  Email: %s", user.Email)
	log.Printf("  Owner: %s", user.Owner)
	log.Printf("  Roles: %v", user.Roles)
	
	// The user now has updated permissions
	log.Printf("User permissions updated with %d active roles", len(user.Roles))
}
