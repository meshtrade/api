from meshtrade.iam.user.v1 import (
    SearchUsersRequest,
    UserService,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = UserService()

    with service:
        # Create request with service-specific parameters
        request = SearchUsersRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the SearchUsers method
        response = service.search_users(request)

        # FIXME: Add relevant response object usage
        print("SearchUsers successful:", response)


if __name__ == "__main__":
    main()
