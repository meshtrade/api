import grpc
from meshtrade.iam.api_user.v1 import service_pb2, service_pb2_grpc


def create_client_and_metadata():
    """Create client and authentication metadata."""
    channel = grpc.insecure_channel('localhost:8080')
    client = service_pb2_grpc.ApiUserServiceStub(channel)
    metadata = [
        ('authorization', 'Bearer your-api-key'),
        ('x-group-id', 'your-group-id'),
    ]
    return client, channel, metadata


def main():
    # Create client and metadata
    client, channel, metadata = create_client_and_metadata()
    
    try:
        # Create request
        request = service_pb2.GetApiUserByKeyHashRequest(
            key_hash="abcd1234hash5678"  # Replace with actual key hash
        )
        
        # Make the API call
        response = client.GetApiUserByKeyHash(request, metadata=metadata)
        
        print(f"Found API User: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"State: {response.state}")
        
    except grpc.RpcError as e:
        print(f"Failed to get API user by key hash: {e}")
    
    finally:
        channel.close()


if __name__ == "__main__":
    main()
