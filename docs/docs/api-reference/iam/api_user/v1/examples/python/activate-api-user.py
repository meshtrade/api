from meshtrade.iam.api_user.v1 import (
    ApiUserServiceGRPCClient,
    ClientOptions,
    ActivateApiUserRequest,
)


def main():
    # Create client (loads credentials from MESH_API_CREDENTIALS)
    options = ClientOptions()
    client = ApiUserServiceGRPCClient(options)
    
    with client:
        # Create request
        request = ActivateApiUserRequest(
            name="api_users/01HPQR2S3T4U5V6W7X8Y9Z0123"  # Replace with actual API user name
        )
        
        # Make the API call
        response = client.activate_api_user(request)
        
        print(f"Activated API user: {response.name}")
        print(f"State: {response.state}")


if __name__ == "__main__":
    main()
