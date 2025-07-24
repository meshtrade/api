import grpc

from meshtrade.iam.api_user.v1 import service_pb2_grpc


def create_client():
    """Create a gRPC client for API User Service with authentication."""

    # Create gRPC channel
    channel = grpc.insecure_channel("localhost:8080")

    # Create service stub
    client = service_pb2_grpc.ApiUserServiceStub(channel)

    return client, channel


def create_metadata(api_key: str, group_id: str):
    """Create metadata for authentication and group context."""
    return [
        ("authorization", f"Bearer {api_key}"),
        ("x-group-id", group_id),
    ]


if __name__ == "__main__":
    # Create client
    client, channel = create_client()

    # Prepare authentication metadata
    metadata = create_metadata("your-api-key", "your-group-id")

    print("API User Service client created successfully")

    # Close channel when done
    channel.close()
