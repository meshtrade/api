from meshtrade.iam.api_user.v1 import (
    ActivateApiUserRequest,
    ApiUserService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Create request with service-specific parameters
        request = ActivateApiUserRequest(
            name="api_users/01234567890123456789012345"  # API user resource name
        )

        # Call the ActivateApiUser method
        api_user = service.activate_api_user(request)

        # Verify activation was successful
        print(f"Successfully activated API user: {api_user.name}")
        print(f"API user state: {api_user.state}")
        print(f"Display name: {api_user.display_name}")


if __name__ == "__main__":
    main()
