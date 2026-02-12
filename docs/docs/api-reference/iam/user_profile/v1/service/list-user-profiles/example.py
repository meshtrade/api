from meshtrade.iam.user_profile.v1 import (
    ListUserProfilesRequest,
    UserProfileService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserProfileService()

    with service:
        # Create request - no parameters needed for simple list
        request = ListUserProfilesRequest()

        # Call the ListUserProfiles method
        response = service.list_user_profiles(request)

        # Process the user profile directory
        print(f"Found {len(response.user_profiles)} user profiles in the accessible hierarchy:")
        for i, profile in enumerate(response.user_profiles):
            print(f"User Profile {i + 1}:")
            print(f"  Name: {profile.name}")
            print(f"  Display Name: {profile.display_name}")
            print(f"  User: {profile.user_name}")
            print(f"  Owner: {profile.owner}")
            if profile.contact_details.email_address:
                print(f"  Email: {profile.contact_details.email_address}")
            print()


if __name__ == "__main__":
    main()
