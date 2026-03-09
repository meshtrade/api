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
        # Create request with the user profile resource name
        # Replace the ULIDv2 with your actual user profile ID
        request = GetUserProfileRequest(name="iam/user_profiles/01HQZXYZ9ABCDEFGHIJKLMNPQR")

        # Call the GetUserProfile method
        user_profile = service.get_user_profile(request)

        # Use the retrieved user profile
        print("User Profile Retrieved:")
        print(f"  Name: {user_profile.name}")
        print(f"  First Name: {user_profile.first_name}")
        print(f"  Last Name: {user_profile.last_name}")
        print(f"  User: {user_profile.user}")
        print(f"  Locale: {user_profile.locale}")


if __name__ == "__main__":
    main()
