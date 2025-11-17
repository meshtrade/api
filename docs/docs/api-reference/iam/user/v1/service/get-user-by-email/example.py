from meshtrade.iam.user.v1 import (
    GetUserByEmailRequest,
    UserService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserService()

    with service:
        # Create request with service-specific parameters
        request = GetUserByEmailRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the GetUserByEmail method
        user = service.get_user_by_email(request)

        # FIXME: Add relevant response object usage
        print("GetUserByEmail successful:", user)


if __name__ == "__main__":
    main()
