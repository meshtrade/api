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
        # Create request with the user profile resource name
        # Replace the ULIDv2 with your actual user profile ID
        request = GetUserProfilePictureUploadUrlRequest(
            name="user_profiles/01HQZXYZ9ABCDEFGHIJKLMNPQR"
        )

        # Call the GetUserProfilePictureUploadUrl method to get presigned upload URL
        response = service.get_user_profile_picture_upload_url(request)

        # Use the presigned URL to upload the profile picture
        print(f"Upload URL: {response.upload_url}")
        print(f"Expires at: {response.expires_at}")

        # The URL can now be used with an HTTP PUT request to upload an image file
        # Example: requests.put(response.upload_url, data=image_data)


if __name__ == "__main__":
    main()
