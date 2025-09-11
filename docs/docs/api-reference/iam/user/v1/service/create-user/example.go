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

	// Create request with user configuration
	request := &userv1.CreateUserRequest{
		User: &userv1.User{
			Owner: service.Group(), // Current authenticated group becomes the owner
			Email: "sarah.thompson@company.com", // Unique email address
			Roles: []string{
				rolev1.Role_ROLE_WALLET_VIEWER.FullResourceNameFromGroupName(service.Group()),
				rolev1.Role_ROLE_TRADING_VIEWER.FullResourceNameFromGroupName(service.Group()),
			},
		},
	}

	// Call the CreateUser method
	user, err := service.CreateUser(ctx, request)
	if err != nil {
		log.Fatalf("CreateUser failed: %v", err)
	}

	// Use the newly created user
	log.Printf("User created successfully:")
	log.Printf("  Name: %s", user.Name)
	log.Printf("  Email: %s", user.Email)
	log.Printf("  Owner: %s", user.Owner)
	log.Printf("  Roles: %v", user.Roles)

	// The user is ready for authentication and resource access
	log.Printf("User is ready for authentication with %d assigned roles", len(user.Roles))
}
