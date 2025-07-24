from meshtrade.iam.api_user.v1 import (
    ApiUserServiceGRPCClient,
    ClientOptions,
    CreateApiUserRequest,
    APIUser,
)
from meshtrade.iam.role.v1 import Role, full_resource_name_from_group_name


def main():
    # Create client (loads credentials from MESH_API_CREDENTIALS)
    options = ClientOptions()
    client = ApiUserServiceGRPCClient(options)
    
    with client:
        # Create API user with IAM admin role
        api_user = APIUser(
            owner=client.group(),
            display_name="My API User",
            roles=[full_resource_name_from_group_name(Role.ROLE_IAM_ADMIN, client.group())],
        )
        
        created_user = client.create_api_user(CreateApiUserRequest(api_user=api_user))
        
        print(f"Created API user: {created_user.name}")
        print(f"API key (save this!): {created_user.api_key}")
        print(f"State: {created_user.state}")


if __name__ == "__main__":
    main()
