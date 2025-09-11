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

	// Assign role to existing user
	request := &userv1.AssignRoleToUserRequest{
		Name: "users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6", // User to assign role to
		Role: rolev1.Role_ROLE_IAM_ADMIN.FullResourceNameFromGroupName(service.Group()),
	}

	// Call the AssignRoleToUser method
	user, err := service.AssignRoleToUser(ctx, request)
	if err != nil {
		log.Fatalf("AssignRoleToUser failed: %v", err)
	}

	// Role has been successfully assigned
	log.Printf("Role assigned successfully:")
	log.Printf("  User: %s", user.Name)
	log.Printf("  Email: %s", user.Email)
	log.Printf("  Total Roles: %d", len(user.Roles))
}
