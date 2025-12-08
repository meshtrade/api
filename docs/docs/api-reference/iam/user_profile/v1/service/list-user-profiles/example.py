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
        # Create request with service-specific parameters
        request = ListUserProfilesRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the ListUserProfiles method
        response = service.list_user_profiles(request)

        # FIXME: Add relevant response object usage
        print("ListUserProfiles successful:", response)


if __name__ == "__main__":
    main()
