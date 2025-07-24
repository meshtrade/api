from meshtrade.iam.api_user.v1 import (
    ApiUserServiceGRPCClient,
    ClientOptions,
    GetApiUserByKeyHashRequest,
)


def main():
    # Create client (loads credentials from MESH_API_CREDENTIALS)
    options = ClientOptions()
    client = ApiUserServiceGRPCClient(options)
    
    with client:
        # Create request
        request = GetApiUserByKeyHashRequest(
            key_hash="abcd1234hash5678"  # Replace with actual key hash
        )
        
        # Make the API call
        response = client.get_api_user_by_key_hash(request)
        
        print(f"Found API User: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"State: {response.state}")


if __name__ == "__main__":
    main()
