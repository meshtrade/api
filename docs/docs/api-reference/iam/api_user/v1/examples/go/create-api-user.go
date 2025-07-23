package main

import (
	"context"
	"log"

	api_userv1 "github.com/meshtrade/api/go/iam/api_user/v1"
	rolev1 "github.com/meshtrade/api/go/iam/role/v1"
)

func main() {
	// Create client (see client-setup.go for details)
	client, err := api_userv1.NewApiUserServiceGRPCClient(
		api_userv1.WithAddress("localhost", 8080),
		api_userv1.WithTLS(false),
		api_userv1.WithAPIKey("your-api-key"),
		api_userv1.WithGroup("your-group-id"),
	)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	// Prepare API user configuration
	apiUserToCreate := &api_userv1.APIUser{
		Owner:       "groups/your-group-id",
		DisplayName: "My API User",
		Roles: []rolev1.Role{
			rolev1.Role_ROLE_IAM_ADMIN,
		},
	}

	// Create the new API user
	apiUser, err := client.CreateApiUser(
		context.Background(),
		&api_userv1.CreateApiUserRequest{
			ApiUser: apiUserToCreate,
		},
	)
	if err != nil {
		log.Fatalf("Failed to create API user: %v", err)
	}

	log.Printf("Created API user: %s", apiUser.Name)
	log.Printf("Display name: %s", apiUser.DisplayName)
	log.Printf("API key: %s", apiUser.ApiKey) // Only shown on creation
}
