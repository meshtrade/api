from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    GetApiUserRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Create request with service-specific parameters
        request = GetApiUserRequest(
            name="api_users/01234567890123456789012345"  # API user resource name
        )

        # Call the GetApiUser method
        api_user = service.get_api_user(request)

        # Access API user details
        print(f"Retrieved API user: {api_user.name}")
        print(f"Display name: {api_user.display_name}")
        print(f"State: {api_user.state}")
        print(f"Owner: {api_user.owner}")
        print(f"Roles: {api_user.roles}")

        # Note: API key is not returned in get operations for security reasons


if __name__ == "__main__":
    main()
