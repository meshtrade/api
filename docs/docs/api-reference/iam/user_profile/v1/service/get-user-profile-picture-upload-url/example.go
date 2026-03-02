package main

import (
	"context"
	"log"

	user_profilev1 "github.com/meshtrade/api/go/iam/user_profile/v1"
)

func main() {
	ctx := context.Background()

	// Default configuration is used and credentials come from MESH_API_CREDENTIALS
	// environment variable or default discovery methods. Zero config required
	// unless you want custom configuration.
	service, err := user_profilev1.NewUserProfileService()
	if err != nil {
		log.Fatalf("Failed to create service: %v", err)
	}
	defer service.Close()

	// Create request with the user profile resource name
	// Replace the ULIDv2 with your actual user profile ID
	request := &user_profilev1.GetUserProfilePictureUploadUrlRequest{
		Name: "user_profiles/01HQZXYZ9ABCDEFGHIJKLMNPQR",
	}

	// Call the GetUserProfilePictureUploadUrl method to get presigned upload URL
	response, err := service.GetUserProfilePictureUploadUrl(ctx, request)
	if err != nil {
		log.Fatalf("GetUserProfilePictureUploadUrl failed: %v", err)
	}

	// Use the presigned URL to upload the profile picture
	log.Printf("Upload URL: %s", response.UploadUrl)
	log.Printf("Expires at: %s", response.ExpiresAt.AsTime())

	// The URL can now be used with an HTTP PUT request to upload an image file
	// Example: Use http.NewRequest("PUT", response.UploadUrl, imageReader)
}
