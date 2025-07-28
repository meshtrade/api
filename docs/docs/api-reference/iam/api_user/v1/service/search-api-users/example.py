from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    SearchApiUsersRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Create request with service-specific parameters
        request = SearchApiUsersRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the SearchApiUsers method
        response = service.search_api_users(request)

        # FIXME: Add relevant response object usage
        print("SearchApiUsers successful:", response)


if __name__ == "__main__":
    main()
