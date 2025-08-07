from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    DeactivateApiUserRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Create request with service-specific parameters
        request = DeactivateApiUserRequest(
            name="api_users/01234567890123456789012345"  # API user resource name
        )

        # Call the DeactivateApiUser method
        api_user = service.deactivate_api_user(request)

        # Verify deactivation was successful
        print(f"Successfully deactivated API user: {api_user.name}")
        print(f"API user state: {api_user.state}")  # Should be INACTIVE
        print(f"Display name: {api_user.display_name}")


if __name__ == "__main__":
    main()
