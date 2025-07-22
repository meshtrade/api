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
        request = service_pb2.ActivateApiUserRequest(
            name="api_users/01HPQR2S3T4U5V6W7X8Y9Z0123"  # Replace with actual API user name
        )
        
        # Make the API call
        response = client.ActivateApiUser(request, metadata=metadata)
        
        print(f"Activated API user: {response.name}")
        print(f"State: {response.state}")
        
    except grpc.RpcError as e:
        print(f"Failed to activate API user: {e}")
    
    finally:
        channel.close()


if __name__ == "__main__":
    main()
