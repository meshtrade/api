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
        # Create request (empty for list all)
        request = service_pb2.ListApiUsersRequest()
        
        # Make the API call
        response = client.ListApiUsers(request, metadata=metadata)
        
        print(f"Found {len(response.api_users)} API users:")
        for api_user in response.api_users:
            print(f"- {api_user.name} ({api_user.display_name}) - State: {api_user.state}")
        
    except grpc.RpcError as e:
        print(f"Failed to list API users: {e}")
    
    finally:
        channel.close()


if __name__ == "__main__":
    main()
