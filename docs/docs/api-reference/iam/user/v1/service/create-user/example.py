from meshtrade.iam.user.v1 import (
    CreateUserRequest,
    UserService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserService()

    with service:
        # Create request with service-specific parameters
        request = CreateUserRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the CreateUser method
        user = service.create_user(request)

        # FIXME: Add relevant response object usage
        print("CreateUser successful:", user)


if __name__ == "__main__":
    main()
