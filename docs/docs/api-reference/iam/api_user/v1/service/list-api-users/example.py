from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    ListAPIUsersRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Create request with service-specific parameters
        request = ListAPIUsersRequest(
            # FIXME: Populate service-specific request fields
        )

        # Call the ListAPIUsers method
        response = service.list_api_users(request)

        # FIXME: Add relevant response object usage
        print("ListAPIUsers successful:", response)


if __name__ == "__main__":
    main()
