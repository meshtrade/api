import grpc

from meshtrade.iam.api_user.v1 import service_pb2, service_pb2_grpc


def create_client_and_metadata():
    """Create client and authentication metadata."""
    channel = grpc.insecure_channel("localhost:8080")
    client = service_pb2_grpc.ApiUserServiceStub(channel)
    metadata = [
        ("authorization", "Bearer your-api-key"),
        ("x-group-id", "your-group-id"),
    ]
    return client, channel, metadata


def main():
    # Create client and metadata
    client, channel, metadata = create_client_and_metadata()

    try:
        # Create request with search term
        request = service_pb2.SearchApiUsersRequest(
            display_name="test"  # Search for API users with "test" in display name
        )

        # Make the API call
        response = client.SearchApiUsers(request, metadata=metadata)

        print(f"Found {len(response.api_users)} API users matching 'test':")
        for api_user in response.api_users:
            print(f"- {api_user.name} ({api_user.display_name})")

    except grpc.RpcError as e:
        print(f"Failed to search API users: {e}")

    finally:
        channel.close()


if __name__ == "__main__":
    main()
