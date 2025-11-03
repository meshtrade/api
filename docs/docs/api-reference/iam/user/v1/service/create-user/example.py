from meshtrade.api.iam.role.v1.role import full_resource_name_from_group_name
from meshtrade.api.iam.role.v1.role_pb2 import Role
from meshtrade.iam.user.v1 import (
    CreateUserRequest,
    User,
    UserService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserService()

    with service:
        # Create request with user configuration
        request = CreateUserRequest(
            user=User(
                owner=service.group(),  # Current authenticated group becomes the owner
                email="sarah.thompson@company.com",  # Unique email address
                roles=[
                    full_resource_name_from_group_name(Role.ROLE_IAM_VIEWER, service.group()),
                    full_resource_name_from_group_name(Role.ROLE_TRADING_VIEWER, service.group()),
                ],
            )
        )

        # Call the CreateUser method
        user = service.create_user(request)

        # Use the newly created user
        print("User created successfully:")
        print(f"  Name: {user.name}")
        print(f"  Email: {user.email}")
        print(f"  Owner: {user.owner}")
        print(f"  Roles: {user.roles}")
        print(f"User is ready for authentication with {len(user.roles)} assigned roles")


if __name__ == "__main__":
    main()
