from meshtrade.iam.user_profile.v1 import (
    CreateUserProfileRequest,
    UserProfileService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserProfileService()

    with service:
        # Create request with service-specific parameters
        request = CreateUserProfileRequest(
        )

        # Call the CreateUserProfile method
        response = service.create_user_profile(request)

        # FIXME: Add relevant response object usage
        print("CreateUserProfile successful:", response)


if __name__ == "__main__":
    main()
