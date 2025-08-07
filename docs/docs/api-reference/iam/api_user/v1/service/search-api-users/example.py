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
            display_name="Integration"  # Search for API users with "Integration" in display name
        )

        # Call the SearchApiUsers method
        response = service.search_api_users(request)

        # Process search results
        print(f"Found {len(response.api_users)} API users matching search criteria")

        for i, api_user in enumerate(response.api_users, 1):
            print(f"Match {i}:")
            print(f"  Name: {api_user.name}")
            print(f"  Display Name: {api_user.display_name}")
            print(f"  State: {api_user.state}")
            print(f"  Owner: {api_user.owner}")

        if not response.api_users:
            print("No API users found matching the search criteria")


if __name__ == "__main__":
    main()
