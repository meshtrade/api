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
        # Create request with service-specific parameters
        request = SearchUserProfilesRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the SearchUserProfiles method
        response = service.search_user_profiles(request)

        # FIXME: Add relevant response object usage
        print("SearchUserProfiles successful:", response)


if __name__ == "__main__":
    main()
