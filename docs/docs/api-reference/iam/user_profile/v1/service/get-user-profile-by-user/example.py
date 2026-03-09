from meshtrade.iam.user_profile.v1 import (
    GetUserProfileByUserRequest,
    UserProfileService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserProfileService()

    with service:
        # Create request with the user resource name
        # Replace the ULIDv2 with your actual user ID
        request = GetUserProfileByUserRequest(user="users/01HQZXYZ9ABCDEFGHIJKLMNPQR")

        # Call the GetUserProfileByUser method
        user_profile = service.get_user_profile_by_user(request)

        # Use the retrieved user profile
        print("User Profile Retrieved:")
        print(f"  Name: {user_profile.name}")
        print(f"  First Name: {user_profile.first_name}")
        print(f"  Last Name: {user_profile.last_name}")
        print(f"  User: {user_profile.user}")
        print(f"  Locale: {user_profile.locale}")


if __name__ == "__main__":
    main()
