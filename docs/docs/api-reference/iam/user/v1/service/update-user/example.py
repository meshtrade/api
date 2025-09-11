from meshtrade.iam.user.v1 import (
    UpdateUserRequest,
    UserService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserService()

    with service:
        # Create request with service-specific parameters
        request = UpdateUserRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the UpdateUser method
        user = service.update_user(request)

        # FIXME: Add relevant response object usage
        print("UpdateUser successful:", user)


if __name__ == "__main__":
    main()
