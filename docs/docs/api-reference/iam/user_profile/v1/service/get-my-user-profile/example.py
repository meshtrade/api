from meshtrade.iam.user_profile.v1 import (
    GetMyUserProfileRequest,
    UserProfileService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserProfileService()

    with service:
        # Create request with service-specific parameters
        request = GetMyUserProfileRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetMyUserProfile method
        response = service.get_my_user_profile(request)

        # FIXME: Add relevant response object usage
        print("GetMyUserProfile successful:", response)


if __name__ == "__main__":
    main()
