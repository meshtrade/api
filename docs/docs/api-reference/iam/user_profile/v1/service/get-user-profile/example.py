from meshtrade.iam.user_profile.v1 import (
    GetUserProfileRequest,
    UserProfileService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserProfileService()

    with service:
        # Create request to get a specific user profile by name (resource identifier)
        request = GetUserProfileRequest(
            name="user_profiles/01JCXYZ1234567890ABCDEFGHJK"  # User profile resource name
        )

        # Call the GetUserProfile method
        response = service.get_user_profile(request)
        user_profile = response.user_profile

        # Use the retrieved user profile information
        print("Retrieved user profile successfully:")
        print(f"  Name: {user_profile.name}")  # System-generated identifier
        print(f"  Display Name: {user_profile.display_name}")
        print(f"  User: {user_profile.user_name}")
        print(f"  Owner: {user_profile.owner}")  # Direct group owner
        if user_profile.contact_details.email_address:
            print(f"  Email: {user_profile.contact_details.email_address}")
        if user_profile.contact_details.mobile_number:
            print(f"  Mobile: {user_profile.contact_details.mobile_number}")

        # User profile information can be used for display or management
        print(f"User profile for {user_profile.display_name} loaded successfully")


if __name__ == "__main__":
    main()
