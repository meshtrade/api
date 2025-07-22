"""
ApiUserService gRPC client wrapper with authentication, timeouts, and resource management.

This module provides a high-level gRPC client for the ApiUserService service that combines
the service interface with resource management capabilities, providing authentication,
timeouts, and proper connection handling.
"""

import contextlib
from datetime import timedelta

import grpc

from meshtrade.common import (
    DEFAULT_GRPC_PORT,
    DEFAULT_GRPC_URL,
    DEFAULT_TLS,
    GRPCClient,
    create_auth_metadata,
    credentials_from_environment,
)

from .api_user_pb2 import APIUser
from .service import ApiUserService
from .service_grpc_client_options import ClientOptions
from .service_pb2 import (
    ActivateApiUserRequest,
    CreateApiUserRequest,
    DeactivateApiUserRequest,
    GetApiUserByKeyHashRequest,
    GetApiUserRequest,
    ListApiUsersRequest,
    ListApiUsersResponse,
    SearchApiUsersRequest,
    SearchApiUsersResponse,
)
from .service_pb2_grpc import ApiUserServiceStub


class ApiUserServiceGRPCClientInterface(ApiUserService, GRPCClient):
    """Interface combining ApiUserService functionality with gRPC client resource management.

    This interface defines the contract for gRPC clients that implement the ApiUserService
    while also providing proper resource cleanup capabilities.
    """

    pass


class ApiUserServiceGRPCClient(ApiUserServiceGRPCClientInterface):
    """ApiUserService gRPC client implementation with authentication, timeouts, and resource management.

    This class provides a complete implementation of the ApiUserService interface over gRPC,
    with automatic handling of authentication, timeouts, connection management, and resource cleanup.

    Features:
    - Automatic authentication via API key with group ID support
    - Credentials file loading from MESH_API_CREDENTIALS environment variable
    - Configurable request timeouts with deadline handling
    - TLS support with configurable transport credentials
    - Proper resource cleanup with close() method
    - Proper connection management
    - Context manager support

    Thread Safety:
        This client uses gRPC's thread-safe underlying connections.

    Example:
        # Using with configuration options
        client = ApiUserServiceGRPCClient(
            with_api_key("your-api-key"),
            with_group("your-group-id"),
            with_timeout(timedelta(seconds=10)),
        )

        # Using context manager
        with client:
            user = client.get_api_user(GetApiUserRequest(name="api_users/123"))

        # Manual lifecycle management
        client = ApiUserServiceGRPCClient()
        try:
            client._ensure_connected()
            user = client.get_api_user(GetApiUserRequest(name="api_users/123"))
        finally:
            client.close()
    """

    def __init__(self, *options: ClientOptions):
        """Initialize the ApiUserService gRPC client.

        Args:
            *options: Variable number of ClientOptions to configure the client

        Raises:
            ValueError: Configuration error (missing auth, invalid options, etc.)

        Example:
            # With environment credentials (MESH_API_CREDENTIALS)
            client = ApiUserServiceGRPCClient()

            # With manual configuration
            client = ApiUserServiceGRPCClient(
                with_api_key("your-api-key"),
                with_group("your-group-id"),
                with_timeout(timedelta(seconds=10)),
                with_address("staging-api.example.com", 443),
            )
        """
        # Start with default configuration
        self._url = DEFAULT_GRPC_URL
        self._port = DEFAULT_GRPC_PORT
        self._tls = DEFAULT_TLS
        self._api_key: str | None = None
        self._group_id: str | None = None
        self._timeout = timedelta(seconds=30)

        # Connection state
        self._channel: grpc.Channel | None = None
        self._client: ApiUserServiceStub | None = None
        self._closed = False

        # Attempt to load credentials from environment file
        try:
            creds = credentials_from_environment()
            if creds:
                self._api_key = creds.api_key
                self._group_id = creds.group_id
        except (FileNotFoundError, ValueError):
            # Credentials from file are optional, will be validated later
            pass

        # Apply options to the configuration (these can override credentials from file)
        for option in options:
            if option.url is not None:
                self._url = option.url
            if option.port is not None:
                self._port = option.port
            if option.tls is not None:
                self._tls = option.tls
            if option.api_key is not None:
                self._api_key = option.api_key
            if option.group_id is not None:
                self._group_id = option.group_id
            if option.timeout is not None:
                self._timeout = option.timeout

        # Validate authentication credentials
        self._validate_auth()

    def _validate_auth(self) -> None:
        """Validate that authentication credentials and group ID are properly configured.

        This method is called during client initialization to prevent runtime authentication failures.

        Requirements:
        - At least one authentication method must be configured
        - Group ID must be set for all public API calls

        Supported Authentication Methods:
        - API Key: Set via options or MESH_API_CREDENTIALS file

        Raises:
            ValueError: If authentication method or group ID is missing
        """
        if not self._api_key:
            raise ValueError("api key not set. set credentials via MESH_API_CREDENTIALS file, or use with_api_key option")
        if not self._group_id:
            raise ValueError("group id not set. set via MESH_API_CREDENTIALS file or with_group option")

    def _ensure_connected(self) -> None:
        """Ensure the gRPC connection is established."""
        if self._channel is None or self._client is None:
            target = f"{self._url}:{self._port}"

            if self._tls:
                credentials = grpc.ssl_channel_credentials()
                self._channel = grpc.secure_channel(target, credentials)
            else:
                self._channel = grpc.insecure_channel(target)

            self._client = ApiUserServiceStub(self._channel)

    def _create_metadata(self) -> list[tuple]:
        """Create gRPC metadata for authentication."""
        metadata_dict = create_auth_metadata(self._api_key, self._group_id)
        return [(key, value) for key, value in metadata_dict.items()]

    def get_api_user(self, request: GetApiUserRequest, timeout: timedelta | None = None) -> APIUser:
        """Execute the GetApiUser RPC method on the ApiUserService service.

        This method automatically handles authentication, timeouts, and connection management.

        Timeout Behavior:
        - Uses the provided timeout or the client's configured default timeout
        - The method will be cancelled if the timeout is exceeded

        Authentication:
        - Automatically includes API key in request headers
        - Authentication is configured during client creation

        Args:
            request: The GetApiUserRequest containing the method parameters
            timeout: Optional timeout override for this specific call

        Returns:
            APIUser: The successful response from the service

        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request

        Example:
            resp = client.get_api_user(GetApiUserRequest(name="api_users/123"))
        """
        if self._closed:
            raise RuntimeError("Client has been closed")

        self._ensure_connected()

        # Assert that client is not None after connection
        assert self._client is not None, "Client should be initialized after _ensure_connected"

        metadata = self._create_metadata()
        timeout_seconds = (timeout or self._timeout).total_seconds()

        return self._client.GetApiUser(request, metadata=metadata, timeout=timeout_seconds)

    def create_api_user(self, request: CreateApiUserRequest, timeout: timedelta | None = None) -> APIUser:
        """Execute the CreateApiUser RPC method on the ApiUserService service.

        This method automatically handles authentication, timeouts, and connection management.

        Args:
            request: The CreateApiUserRequest containing the method parameters
            timeout: Optional timeout override for this specific call

        Returns:
            APIUser: The successful response from the service

        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
        """
        if self._closed:
            raise RuntimeError("Client has been closed")

        self._ensure_connected()
        assert self._client is not None, "Client should be initialized after _ensure_connected"

        metadata = self._create_metadata()
        timeout_seconds = (timeout or self._timeout).total_seconds()

        return self._client.CreateApiUser(request, metadata=metadata, timeout=timeout_seconds)

    def list_api_users(self, request: ListApiUsersRequest, timeout: timedelta | None = None) -> ListApiUsersResponse:
        """Execute the ListApiUsers RPC method on the ApiUserService service.

        This method automatically handles authentication, timeouts, and connection management.

        Args:
            request: The ListApiUsersRequest containing the method parameters
            timeout: Optional timeout override for this specific call

        Returns:
            ListApiUsersResponse: The successful response from the service

        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
        """
        if self._closed:
            raise RuntimeError("Client has been closed")

        self._ensure_connected()
        assert self._client is not None, "Client should be initialized after _ensure_connected"

        metadata = self._create_metadata()
        timeout_seconds = (timeout or self._timeout).total_seconds()

        return self._client.ListApiUsers(request, metadata=metadata, timeout=timeout_seconds)

    def search_api_users(self, request: SearchApiUsersRequest, timeout: timedelta | None = None) -> SearchApiUsersResponse:
        """Execute the SearchApiUsers RPC method on the ApiUserService service.

        This method automatically handles authentication, timeouts, and connection management.

        Args:
            request: The SearchApiUsersRequest containing the method parameters
            timeout: Optional timeout override for this specific call

        Returns:
            SearchApiUsersResponse: The successful response from the service

        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
        """
        if self._closed:
            raise RuntimeError("Client has been closed")

        self._ensure_connected()
        assert self._client is not None, "Client should be initialized after _ensure_connected"

        metadata = self._create_metadata()
        timeout_seconds = (timeout or self._timeout).total_seconds()

        return self._client.SearchApiUsers(request, metadata=metadata, timeout=timeout_seconds)

    def activate_api_user(self, request: ActivateApiUserRequest, timeout: timedelta | None = None) -> APIUser:
        """Execute the ActivateApiUser RPC method on the ApiUserService service.

        This method automatically handles authentication, timeouts, and connection management.

        Args:
            request: The ActivateApiUserRequest containing the method parameters
            timeout: Optional timeout override for this specific call

        Returns:
            APIUser: The successful response from the service

        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
        """
        if self._closed:
            raise RuntimeError("Client has been closed")

        self._ensure_connected()
        assert self._client is not None, "Client should be initialized after _ensure_connected"

        metadata = self._create_metadata()
        timeout_seconds = (timeout or self._timeout).total_seconds()

        return self._client.ActivateApiUser(request, metadata=metadata, timeout=timeout_seconds)

    def deactivate_api_user(self, request: DeactivateApiUserRequest, timeout: timedelta | None = None) -> APIUser:
        """Execute the DeactivateApiUser RPC method on the ApiUserService service.

        This method automatically handles authentication, timeouts, and connection management.

        Args:
            request: The DeactivateApiUserRequest containing the method parameters
            timeout: Optional timeout override for this specific call

        Returns:
            APIUser: The successful response from the service

        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
        """
        if self._closed:
            raise RuntimeError("Client has been closed")

        self._ensure_connected()
        assert self._client is not None, "Client should be initialized after _ensure_connected"

        metadata = self._create_metadata()
        timeout_seconds = (timeout or self._timeout).total_seconds()

        return self._client.DeactivateApiUser(request, metadata=metadata, timeout=timeout_seconds)

    def get_api_user_by_key_hash(self, request: GetApiUserByKeyHashRequest, timeout: timedelta | None = None) -> APIUser:
        """Execute the GetApiUserByKeyHash RPC method on the ApiUserService service.

        This method automatically handles authentication, timeouts, and connection management.

        Args:
            request: The GetApiUserByKeyHashRequest containing the method parameters
            timeout: Optional timeout override for this specific call

        Returns:
            APIUser: The successful response from the service

        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
        """
        if self._closed:
            raise RuntimeError("Client has been closed")

        self._ensure_connected()
        assert self._client is not None, "Client should be initialized after _ensure_connected"

        metadata = self._create_metadata()
        timeout_seconds = (timeout or self._timeout).total_seconds()

        return self._client.GetApiUserByKeyHash(request, metadata=metadata, timeout=timeout_seconds)

    def close(self) -> None:
        """Gracefully shut down the gRPC client connection and release all associated resources.

        This method should be called when the client is no longer needed to prevent resource leaks.
        It's safe to call close() multiple times - subsequent calls will be no-ops.

        Best Practices:
        - Always call close() when done with the client
        - Use with statement for automatic cleanup
        - Do not use the client after calling close()

        Example:
            client = ApiUserServiceGRPCClient(...)
            try:
                # Use client
                pass
            finally:
                client.close()
        """
        if not self._closed:
            self._closed = True
            if self._channel:
                with contextlib.suppress(Exception):
                    self._channel.close()

    def __enter__(self):
        """Context manager entry."""
        self._ensure_connected()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit with automatic cleanup."""
        self.close()


# Convenience factory function (optional - users can use constructor directly)
def create_api_user_service_grpc_client(*options: ClientOptions) -> ApiUserServiceGRPCClient:
    """Create a new gRPC client for the ApiUserService service (convenience function).

    This is a convenience function that creates and connects a client in one step.
    You can also use the ApiUserServiceGRPCClient constructor directly.

    Args:
        *options: Variable number of ClientOptions to configure the client

    Returns:
        ApiUserServiceGRPCClient: Configured and connected client instance

    Example:
        # Using factory function
        client = create_api_user_service_grpc_client(
            with_api_key("your-api-key"),
            with_group("your-group-id"),
        )

        # Equivalent using constructor
        client = ApiUserServiceGRPCClient(
            with_api_key("your-api-key"),
            with_group("your-group-id"),
        )
        client._ensure_connected()
    """
    client = ApiUserServiceGRPCClient(*options)
    client._ensure_connected()
    return client
