from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    GetApiUserByKeyHashRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Create request with service-specific parameters
        request = GetApiUserByKeyHashRequest(
            key_hash="hash_of_api_key_123456"  # Hash of the API key (calculated by auth system)
        )

        # Call the GetApiUserByKeyHash method
        api_user = service.get_api_user_by_key_hash(request)

        # Access API user details retrieved by key hash
        print(f"Found API user: {api_user.name}")
        print(f"Display name: {api_user.display_name}")
        print(f"State: {api_user.state}")
        print(f"Owner: {api_user.owner}")
        
        # Note: This method is typically used by authentication systems
        # to validate API keys and retrieve associated user information


if __name__ == "__main__":
    main()
