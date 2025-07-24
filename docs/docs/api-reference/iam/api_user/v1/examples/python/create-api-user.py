import grpc

from meshtrade.iam.api_user.v1 import api_user_pb2, service_pb2, service_pb2_grpc
from meshtrade.option.v1 import role_pb2


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
        # Create API user configuration
        api_user = api_user_pb2.APIUser(owner="groups/your-group-id", display_name="My API User", roles=[role_pb2.Role.ROLE_IAM_ADMIN])

        # Create request
        request = service_pb2.CreateApiUserRequest(api_user=api_user)

        # Make the API call
        response = client.CreateApiUser(request, metadata=metadata)

        print(f"Created API user: {response.name}")
        print(f"Display name: {response.display_name}")
        print(f"API key: {response.api_key}")  # Only shown on creation

    except grpc.RpcError as e:
        print(f"Failed to create API user: {e}")

    finally:
        channel.close()


if __name__ == "__main__":
    main()
