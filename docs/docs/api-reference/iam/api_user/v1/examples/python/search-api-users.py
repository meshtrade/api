from meshtrade.iam.api_user.v1 import (
    ApiUserServiceGRPCClient,
    ClientOptions,
    SearchApiUsersRequest,
)


def main():
    # Create client (loads credentials from MESH_API_CREDENTIALS)
    options = ClientOptions()
    client = ApiUserServiceGRPCClient(options)
    
    with client:
        # Create request with search term
        request = SearchApiUsersRequest(
            display_name="test"  # Search for API users with "test" in display name
        )
        
        # Make the API call
        response = client.search_api_users(request)
        
        print(f"Found {len(response.api_users)} API users matching 'test':")
        for api_user in response.api_users:
            print(f"- {api_user.name} ({api_user.display_name})")


if __name__ == "__main__":
    main()
