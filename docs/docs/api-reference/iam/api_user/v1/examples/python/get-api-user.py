from meshtrade.iam.api_user.v1 import (
    ApiUserServiceGRPCClient,
    ClientOptions,
    GetApiUserRequest,
)


def main():
    # Create client (loads credentials from MESH_API_CREDENTIALS)
    options = ClientOptions()
    client = ApiUserServiceGRPCClient(options)
    
    with client:
        # Create request
        request = GetApiUserRequest(
            name="api_users/01HPQR2S3T4U5V6W7X8Y9Z0123"  # Replace with actual API user name
        )
        
        # Make the API call
        response = client.get_api_user(request)
        
        print(f"API User: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Owner: {response.owner}")
        print(f"State: {response.state}")
        print(f"Roles: {response.roles}")


if __name__ == "__main__":
    main()
