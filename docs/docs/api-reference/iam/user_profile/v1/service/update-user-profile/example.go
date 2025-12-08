package main

import (
	"context"
	"log"

	user_profilev1 "github.com/meshtrade/api/go/iam/user_profile/v1"
	typev1 "github.com/meshtrade/api/go/type/v1"
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

	// Update user profile with modified information
	request := &user_profilev1.UpdateUserProfileRequest{
		UserProfile: &user_profilev1.UserProfile{
			Name:               "user_profiles/${_id}",  // Existing profile identifier
			Owner:              service.Group(), // Owner must match current ownership
			DisplayName:        "Sarah Thompson-Johnson", // Updated display name
			FirstName:          "Sarah",
			LastName:           "Thompson-Johnson", // Updated last name
			ProfilePictureUrl:  "https://cdn.example.com/profiles/sarah-new.jpg", // New photo
			Address: &typev1.Address{
				AddressLines: []string{"789 Maple Street", "Suite 2A"}, // New address
				City:         "Los Angeles",
				Province:     "California",
				CountryCode:  "US",
				PostalCode:   "90001",
			},
			ContactDetails: &typev1.ContactDetails{
				EmailAddress: "sarah.t.johnson@company.com", // Updated email
				MobileNumber: "+14155559999", // New mobile number
				PhoneNumber:  "+14155559876",
				Linkedin:     "in/sarah-thompson-johnson", // Updated profile
				XTwitter:     "sarahtjohnson",
			},
		},
	}

	// Call the UpdateUserProfile method
	response, err := service.UpdateUserProfile(ctx, request)
	if err != nil {
		log.Fatalf("UpdateUserProfile failed: %v", err)
	}

	// Use the updated user profile
	userProfile := response.UserProfile
	log.Printf("User profile updated successfully:")
	log.Printf("  Name: %s", userProfile.Name)
	log.Printf("  Display Name: %s", userProfile.DisplayName)
	log.Printf("  Email: %s", userProfile.ContactDetails.EmailAddress)
	log.Printf("  Mobile: %s", userProfile.ContactDetails.MobileNumber)
	log.Printf("  City: %s", userProfile.Address.City)
	log.Printf("User profile information updated with latest details")
}
