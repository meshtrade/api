package main

import (
	"context"
	"log"

	api_userv1 "github.com/meshtrade/api/go/iam/api_user/v1"
	rolev1 "github.com/meshtrade/api/go/iam/role/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := api_userv1.NewApiUserService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Assign role to existing API user
	request := &api_userv1.AssignRoleToAPIUserRequest{
		Name: "api_users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6", // API user to assign role to
		Role: rolev1.Role_ROLE_IAM_VIEWER.FullResourceNameFromGroupName(service.Group()),
	}

	// Call the AssignRoleToAPIUser method
	apiUser, err := service.AssignRoleToAPIUser(ctx, request)
	if err != nil {
		log.Fatalf("AssignRoleToAPIUser failed: %v", err)
	}

	// Role has been successfully assigned
	log.Printf("Role assigned successfully:")
	log.Printf("  API User: %s", apiUser.Name)
	log.Printf("  Display Name: %s", apiUser.DisplayName)
	log.Printf("  Total Roles: %d", len(apiUser.Roles))
}
