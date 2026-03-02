from meshtrade.iam.user_profile.v1 import (
    GetUserProfilePictureUploadUrlRequest,
    UserProfileService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserProfileService()

    with service:
        # Create request with service-specific parameters
        request = GetUserProfilePictureUploadUrlRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetUserProfilePictureUploadUrl method
        response = service.get_user_profile_picture_upload_url(request)

        # FIXME: Add relevant response object usage
        print("GetUserProfilePictureUploadUrl successful:", response)


if __name__ == "__main__":
    main()
