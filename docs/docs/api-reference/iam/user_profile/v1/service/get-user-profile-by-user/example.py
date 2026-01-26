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
        # Create request with service-specific parameters
        request = GetUserProfileByUserRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetUserProfileByUser method
        user_profile = service.get_user_profile_by_user(request)

        # FIXME: Add relevant response object usage
        print("GetUserProfileByUser successful:", user_profile)


if __name__ == "__main__":
    main()
