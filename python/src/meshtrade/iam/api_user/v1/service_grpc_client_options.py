"""
Configuration options for ApiUserService gRPC client.
This module provides a clean, extensible way to configure the client with optional
parameters while maintaining backward compatibility and readability.
"""

from datetime import timedelta


class ClientOptions:
    """Configuration options for ApiUserService gRPC client.

    This class provides a clean, extensible way to configure the client with optional
    parameters while maintaining backward compatibility and readability.
    """

    def __init__(
        self,
        tls: bool = True,
        url: str | None = None,
        port: int | None = None,
        api_key: str | None = None,
        group_id: str | None = None,
        timeout: timedelta = timedelta(seconds=30),
    ):
        """Initialize client options.

        Args:
            tls: Whether to use TLS encryption for the gRPC connection.
                When True, establishes a secure connection using TLS.
                When False, uses an insecure connection.
                Default: True (secure connection)

            url: The server hostname or IP address (e.g., "api.example.com", "localhost").
                Default: Uses DEFAULT_GRPC_URL from common module

            port: The server port number (e.g., 443 for HTTPS, 8080 for development).
                Default: Uses DEFAULT_GRPC_PORT from common module

            api_key: The API key string (without "Bearer " prefix) for authentication.
                The API key will be sent as a Bearer token in the Authorization header.
                This is the primary authentication method for service-to-service communication.

            group_id: The group identifier string required for all API requests.
                The group ID determines the authorization context for operations
                and is sent as an "x-group-id" header with every request.

            timeout: The default timeout for all gRPC method calls.
                This timeout applies to individual method calls and helps prevent hanging requests.
                If a request takes longer than the specified timeout, it will be cancelled.
                Default: 30 seconds

        Note:
            When using API key authentication, you must also specify a group ID
            or load from credentials file via MESH_API_CREDENTIALS environment variable.
        """
        self.tls = tls
        self.url = url
        self.port = port
        self.api_key = api_key
        self.group_id = group_id
        self.timeout = timeout


def with_tls(enabled: bool) -> ClientOptions:
    """Configure whether to use TLS encryption for the gRPC connection.

    Args:
        enabled: When True, the client will establish a secure connection using TLS.
                When False, the client will use an insecure connection.

    Returns:
        ClientOptions with TLS configuration

    Example:
        client = ApiUserServiceGRPCClient(with_tls(True))  # Enable TLS encryption
    """
    return ClientOptions(tls=enabled)


def with_address(url: str, port: int) -> ClientOptions:
    """Configure the server address (URL and port) for the gRPC connection.

    This allows you to connect to different environments or custom deployments.

    Args:
        url: The server hostname or IP address (e.g., "api.example.com", "localhost")
        port: The server port number (e.g., 443 for HTTPS, 8080 for development)

    Returns:
        ClientOptions with address configuration

    Example:
        client = ApiUserServiceGRPCClient(
            with_address("staging-api.example.com", 443)  # Connect to staging
        )
    """
    return ClientOptions(url=url, port=port)


def with_url(url: str) -> ClientOptions:
    """Configure only the server URL/hostname for the gRPC connection.

    The port will remain unchanged (uses existing port or default).
    Use with_address() if you need to set both URL and port together.

    Args:
        url: The server hostname or IP address

    Returns:
        ClientOptions with URL configuration

    Example:
        client = ApiUserServiceGRPCClient(
            with_url("production-api.mesh.trade")  # Use production server
        )
    """
    return ClientOptions(url=url)


def with_port(port: int) -> ClientOptions:
    """Configure only the server port for the gRPC connection.

    The URL will remain unchanged (uses existing URL or default).
    Use with_address() if you need to set both URL and port together.

    Args:
        port: The server port number

    Returns:
        ClientOptions with port configuration

    Example:
        client = ApiUserServiceGRPCClient(
            with_port(9090)  # Connect to port 9090
        )
    """
    return ClientOptions(port=port)


def with_api_key(api_key: str) -> ClientOptions:
    """Configure API key authentication for the gRPC client.

    The API key will be sent as a Bearer token in the Authorization header.
    This is the primary authentication method for service-to-service communication.

    IMPORTANT: When using API key authentication, you must also specify a group ID
    using with_group() or load from credentials file via MESH_API_CREDENTIALS.

    Args:
        api_key: The API key string (without "Bearer " prefix)

    Returns:
        ClientOptions with API key configuration

    Example:
        client = ApiUserServiceGRPCClient(
            with_api_key("your-api-key-here"),
            with_group("your-group-id"),
        )
    """
    return ClientOptions(api_key=api_key)


def with_group(group_id: str) -> ClientOptions:
    """Configure the group ID for all API requests made by this client.

    The group ID is required for public API calls and determines the authorization context
    for operations. It will be sent as an "x-group-id" header with every request.

    This option is required when using manual authentication configuration.
    When loading from credentials file via MESH_API_CREDENTIALS, the group ID
    is automatically loaded and this option is optional (but will override the file value).

    Args:
        group_id: The group identifier string

    Returns:
        ClientOptions with group ID configuration

    Example:
        client = ApiUserServiceGRPCClient(
            with_api_key("your-api-key"),
            with_group("01ABCDEF123456789"),
        )
    """
    return ClientOptions(group_id=group_id)


def with_timeout(timeout: timedelta) -> ClientOptions:
    """Configure the default timeout for all gRPC method calls.

    This timeout applies to individual method calls and helps prevent hanging requests.
    If a request takes longer than the specified timeout, it will be cancelled.

    The timeout is implemented using asyncio timeout for each method call.

    Args:
        timeout: The maximum duration to wait for a method call to complete

    Returns:
        ClientOptions with timeout configuration

    Example:
        client = ApiUserServiceGRPCClient(
            with_timeout(timedelta(seconds=10))  # Set 10 second timeout
        )

    Note:
        Individual method calls can still override this timeout by providing
        custom timeout values in the method parameters.
    """
    return ClientOptions(timeout=timeout)
