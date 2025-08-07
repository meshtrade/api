from meshtrade.iam.api_user.v1 import (
    ApiUserService,
    ListApiUsersRequest,
)


def main():
    # Default configuration is used and credentials come from MESH_API_CREDENTIALS
    # environment variable or default discovery methods. Zero config required
    # unless you want custom configuration.
    service = ApiUserService()

    with service:
        # Create request (no parameters needed for basic list)
        request = ListApiUsersRequest()

        # Call the ListApiUsers method
        response = service.list_api_users(request)

        # Process the list of API users
        print(f"Found {len(response.api_users)} API users")

        for i, api_user in enumerate(response.api_users, 1):
            print(f"API User {i}:")
            print(f"  Name: {api_user.name}")
            print(f"  Display Name: {api_user.display_name}")
            print(f"  State: {api_user.state}")
            print(f"  Owner: {api_user.owner}")


if __name__ == "__main__":
    main()
