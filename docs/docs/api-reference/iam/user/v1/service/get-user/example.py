from meshtrade.iam.user.v1 import (
    GetUserRequest,
    UserService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserService()

    with service:
        # Create request to get a specific user by name (resource identifier)
        request = GetUserRequest(
            name="users/01HN2ZXQJ8K9M0L1N3P2Q4R5T6"  # User resource name
        )

        # Call the GetUser method
        user = service.get_user(request)

        # Use the retrieved user information
        print("Retrieved user successfully:")
        print(f"  Name: {user.name}")  # System-generated identifier
        print(f"  Email: {user.email}")  # Email address for identification
        print(f"  Owner: {user.owner}")  # Direct group owner
        print(f"  Owners: {user.owners}")  # Full ownership hierarchy
        print(f"  Roles: {user.roles}")  # Assigned roles across groups

        # User information can be used for profile display or access validation
        print(f"User {user.email} profile loaded for management interface")


if __name__ == "__main__":
    main()
