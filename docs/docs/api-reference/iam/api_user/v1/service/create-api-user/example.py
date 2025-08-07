from meshtrade.iam.api_user.v1 import (
    APIUser,
    ApiUserService,
    CreateApiUserRequest,
)
from meshtrade.iam.role.v1 import Role, full_resource_name_from_group_name


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Create request with service-specific parameters
        api_user_to_create = APIUser(
            owner=service.group,  # Current group from service context
            display_name="My Integration API Key",
            roles=[full_resource_name_from_group_name(Role.ROLE_IAM_ADMIN, service.group)],
        )

        request = CreateApiUserRequest(api_user=api_user_to_create)

        # Call the CreateApiUser method
        api_user = service.create_api_user(request)

        # Access the created API user details
        print(f"Successfully created API user: {api_user.name}")
        print(f"API key: {api_user.api_key}")  # Only available in creation response
        print(f"Display name: {api_user.display_name}")
        print(f"State: {api_user.state}")  # Initially INACTIVE
        print(f"Owner: {api_user.owner}")

        # Note: Store the API key securely - it's only returned once during creation


if __name__ == "__main__":
    main()
