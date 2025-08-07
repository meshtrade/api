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

	// Create request with service-specific parameters
	request := &api_userv1.CreateApiUserRequest{
		ApiUser: &api_userv1.APIUser{
			Owner:       service.Group(), // Current group from service context
			DisplayName: "My Integration API Key",
			Roles: []string{
				rolev1.Role_ROLE_IAM_ADMIN.FullResourceNameFromGroupName(service.Group()),
			},
		},
	}

	// Call the CreateApiUser method
	apiUser, err := service.CreateApiUser(ctx, request)
	if err != nil {
		log.Fatalf("CreateApiUser failed: %v", err)
	}

	// Access the created API user details
	log.Printf("Successfully created API user: %s", apiUser.GetName())
	log.Printf("API key: %s", apiUser.GetApiKey()) // Only available in creation response
	log.Printf("Display name: %s", apiUser.GetDisplayName())
	log.Printf("State: %s", apiUser.GetState().String()) // Initially INACTIVE
	log.Printf("Owner: %s", apiUser.GetOwner())

	// Note: Store the API key securely - it's only returned once during creation
}
