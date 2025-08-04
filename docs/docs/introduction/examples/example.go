package main

import (
	"context"
	"log"

	api_userv1 "github.com/meshtrade/api/go/iam/api_user/v1"
)

func main() {
	// 1. Construct API User Service
	service, err := api_userv1.NewApiUserService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// 2. Call Search API Users Method
	response, err := service.SearchApiUsers(
		context.Background(),
		&api_userv1.SearchApiUsersRequest{DisplayName: "New Key"},
	)
	if err != nil {
		log.Fatalf("SearchApiUsers failed: %v", err)
	}

	// 3. Use response
	log.Printf("SearchApiUsers successful: %+v", response)
}
