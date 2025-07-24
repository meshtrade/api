package main

import (
	"context"
	"log"

	api_userv1 "github.com/meshtrade/api/go/iam/api_user/v1"
	rolev1 "github.com/meshtrade/api/go/iam/role/v1"
)

func main() {
	// Create client (loads credentials from MESH_API_CREDENTIALS)
	client, err := api_userv1.NewApiUserServiceGRPCClient()
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	// Create API user with IAM admin role
	apiUser, err := client.CreateApiUser(
		context.Background(),
		&api_userv1.CreateApiUserRequest{
			ApiUser: &api_userv1.APIUser{
				Owner:       client.Group(),
				DisplayName: "My API User",
				Roles: []string{
					rolev1.Role_ROLE_IAM_ADMIN.FullResourceNameFromGroupName(client.Group()),
				},
			},
		},
	)
	if err != nil {
		log.Fatalf("Failed to create API user: %v", err)
	}

	log.Printf("Created API user: %s", apiUser.Name)
	log.Printf("API key (save this!): %s", apiUser.ApiKey)
	log.Printf("State: %s", apiUser.State)
}
