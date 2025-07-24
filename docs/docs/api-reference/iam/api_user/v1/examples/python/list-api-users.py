from meshtrade.iam.api_user.v1 import (
    ApiUserServiceGRPCClient,
    ClientOptions,
    ListApiUsersRequest,
)


def main():
    # Create client (loads credentials from MESH_API_CREDENTIALS)
    options = ClientOptions()
    client = ApiUserServiceGRPCClient(options)
    
    with client:
        # Create request (empty for list all)
        request = ListApiUsersRequest()
        
        # Make the API call
        response = client.list_api_users(request)
        
        print(f"Found {len(response.api_users)} API users:")
        for api_user in response.api_users:
            print(f"- {api_user.name} ({api_user.display_name}) - State: {api_user.state}")


if __name__ == "__main__":
    main()
