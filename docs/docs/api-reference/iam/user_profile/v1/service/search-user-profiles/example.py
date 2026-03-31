from meshtrade.iam.user_profile.v1 import (
    SearchUserProfilesRequest,
    UserProfileService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserProfileService()

    with service:
        # Search user profiles by last name
        request = SearchUserProfilesRequest(last_name="Smith")

        # Call the SearchUserProfiles method
        response = service.search_user_profiles(request)

        for profile in response.user_profiles:
            print(f"Found: {profile.first_name} {profile.last_name} ({profile.name})")


if __name__ == "__main__":
    main()
