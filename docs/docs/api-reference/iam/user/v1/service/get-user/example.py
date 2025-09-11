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
        # Create request with service-specific parameters
        request = GetUserRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetUser method
        user = service.get_user(request)

        # FIXME: Add relevant response object usage
        print("GetUser successful:", user)


if __name__ == "__main__":
    main()
