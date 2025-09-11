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
                    "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU/1000001",  # ROLE_IAM_VIEWER
                    "groups/01HZ2XWFQ4QV2J5K8MN0PQRSTU/2000002",  # ROLE_TRADING_VIEWER
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
