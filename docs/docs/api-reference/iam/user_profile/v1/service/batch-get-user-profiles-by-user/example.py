from meshtrade.iam.user_profile.v1 import (
    BatchGetUserProfilesByUserRequest,
    UserProfileService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserProfileService()

    with service:
        # Batch retrieve profiles for multiple users
        request = BatchGetUserProfilesByUserRequest(
            users=[
                "users/01HQZXYZ9ABCDEFGHIJKLMNPQR",
                "users/01HQZXYZ9ABCDEFGHIJKLMNPQS",
            ]
        )

        # Call the BatchGetUserProfilesByUser method
        response = service.batch_get_user_profiles_by_user(request)

        for profile in response.user_profiles:
            print(f"Profile: {profile.first_name} {profile.last_name} (user: {profile.user})")


if __name__ == "__main__":
    main()
