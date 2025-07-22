"""
ApiUserService gRPC client wrapper with authentication, timeouts, and resource management.

This module provides a high-level gRPC client for the ApiUserService service that combines
the service interface with resource management capabilities, providing authentication,
timeouts, and proper connection handling.
"""

import asyncio
from abc import ABC, abstractmethod
from typing import Optional, Union, List
from datetime import timedelta

import grpc

from .service_pb2_grpc import ApiUserServiceStub
from .service_pb2 import (
    GetApiUserRequest, CreateApiUserRequest, ListApiUsersRequest,
    SearchApiUsersRequest, ActivateApiUserRequest, DeactivateApiUserRequest,
    GetApiUserByKeyHashRequest, ListApiUsersResponse, SearchApiUsersResponse
)
from .api_user_pb2 import APIUser
from .service_grpc_client_options import ClientOptions
from .common import (
    DEFAULT_GRPC_URL, DEFAULT_GRPC_PORT, DEFAULT_TLS,
    credentials_from_environment, create_auth_metadata
)


class GRPCClient(ABC):
    """Base interface that all gRPC clients should implement to ensure proper resource cleanup."""
    
    @abstractmethod
    def close(self) -> None:
        """Close the gRPC client connection and release all associated resources."""
        pass


class ApiUserService(ABC):
    """Abstract base class defining the ApiUserService interface."""
    
    @abstractmethod
    async def get_api_user(self, request: GetApiUserRequest, timeout: Optional[timedelta] = None) -> APIUser:
        """Get an API user by name."""
        pass
    
    @abstractmethod
    async def create_api_user(self, request: CreateApiUserRequest, timeout: Optional[timedelta] = None) -> APIUser:
        """Create a new API user."""
        pass
    
    @abstractmethod
    async def list_api_users(self, request: ListApiUsersRequest, timeout: Optional[timedelta] = None) -> ListApiUsersResponse:
        """List API users."""
        pass
    
    @abstractmethod
    async def search_api_users(self, request: SearchApiUsersRequest, timeout: Optional[timedelta] = None) -> SearchApiUsersResponse:
        """Search API users by display name."""
        pass
    
    @abstractmethod
    async def activate_api_user(self, request: ActivateApiUserRequest, timeout: Optional[timedelta] = None) -> APIUser:
        """Activate an API user."""
        pass
    
    @abstractmethod
    async def deactivate_api_user(self, request: DeactivateApiUserRequest, timeout: Optional[timedelta] = None) -> APIUser:
        """Deactivate an API user."""
        pass
    
    @abstractmethod
    async def get_api_user_by_key_hash(self, request: GetApiUserByKeyHashRequest, timeout: Optional[timedelta] = None) -> APIUser:
        """Get an API user by key hash."""
        pass


class ApiUserServiceGRPCClient(ApiUserService, GRPCClient):
    """ApiUserService gRPC client interface combining service and resource management."""
    pass


class _ApiUserServiceGRPCClientImpl(ApiUserServiceGRPCClient):
    """Internal implementation of the ApiUserServiceGRPCClient interface.
    
    This class maintains the gRPC connection state, authentication credentials,
    and configuration options for the client.
    
    Features:
    - Automatic authentication via API key with group ID support
    - Credentials file loading from MESH_API_CREDENTIALS environment variable
    - Configurable request timeouts with deadline handling
    - TLS support with configurable transport credentials
    - Proper resource cleanup with close() method
    - Proper connection management
    
    Thread Safety:
        This client uses gRPC's thread-safe underlying connections.
    """
    
    def __init__(
        self,
        url: str,
        port: int,
        tls: bool,
        api_key: str,
        group_id: str,
        timeout: timedelta
    ):
        """Initialize the internal gRPC client implementation.
        
        Args:
            url: Server URL/hostname
            port: Server port
            tls: Whether to use TLS
            api_key: API key for authentication
            group_id: Group ID for requests
            timeout: Default timeout for requests
        """
        self._url = url
        self._port = port
        self._tls = tls
        self._api_key = api_key
        self._group_id = group_id
        self._timeout = timeout
        self._channel: Optional[grpc.aio.Channel] = None
        self._client: Optional[ApiUserServiceStub] = None
        self._closed = False
    
    async def _ensure_connected(self) -> None:
        """Ensure the gRPC connection is established."""
        if self._channel is None or self._client is None:
            target = f"{self._url}:{self._port}"
            
            if self._tls:
                credentials = grpc.ssl_channel_credentials()
                self._channel = grpc.aio.secure_channel(target, credentials)
            else:
                self._channel = grpc.aio.insecure_channel(target)
            
            self._client = ApiUserServiceStub(self._channel)
    
    def _create_metadata(self) -> List[tuple]:
        """Create gRPC metadata for authentication."""
        metadata_dict = create_auth_metadata(self._api_key, self._group_id)
        return [(key, value) for key, value in metadata_dict.items()]
    
    async def _call_with_timeout(self, coro, method_timeout: Optional[timedelta] = None):
        """Execute a gRPC call with timeout handling."""
        timeout_seconds = (method_timeout or self._timeout).total_seconds()
        return await asyncio.wait_for(coro, timeout=timeout_seconds)
    
    async def get_api_user(self, request: GetApiUserRequest, timeout: Optional[timedelta] = None) -> APIUser:
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
            asyncio.TimeoutError: If the request times out
            
        Example:
            resp = await client.get_api_user(GetApiUserRequest(name="api_users/123"))
        """
        if self._closed:
            raise RuntimeError("Client has been closed")
        
        await self._ensure_connected()
        metadata = self._create_metadata()
        
        coro = self._client.GetApiUser(request, metadata=metadata)
        return await self._call_with_timeout(coro, timeout)
    
    async def create_api_user(self, request: CreateApiUserRequest, timeout: Optional[timedelta] = None) -> APIUser:
        """Execute the CreateApiUser RPC method on the ApiUserService service.
        
        This method automatically handles authentication, timeouts, and connection management.
        
        Args:
            request: The CreateApiUserRequest containing the method parameters
            timeout: Optional timeout override for this specific call
            
        Returns:
            APIUser: The successful response from the service
            
        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
            asyncio.TimeoutError: If the request times out
        """
        if self._closed:
            raise RuntimeError("Client has been closed")
        
        await self._ensure_connected()
        metadata = self._create_metadata()
        
        coro = self._client.CreateApiUser(request, metadata=metadata)
        return await self._call_with_timeout(coro, timeout)
    
    async def list_api_users(self, request: ListApiUsersRequest, timeout: Optional[timedelta] = None) -> ListApiUsersResponse:
        """Execute the ListApiUsers RPC method on the ApiUserService service.
        
        This method automatically handles authentication, timeouts, and connection management.
        
        Args:
            request: The ListApiUsersRequest containing the method parameters
            timeout: Optional timeout override for this specific call
            
        Returns:
            ListApiUsersResponse: The successful response from the service
            
        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
            asyncio.TimeoutError: If the request times out
        """
        if self._closed:
            raise RuntimeError("Client has been closed")
        
        await self._ensure_connected()
        metadata = self._create_metadata()
        
        coro = self._client.ListApiUsers(request, metadata=metadata)
        return await self._call_with_timeout(coro, timeout)
    
    async def search_api_users(self, request: SearchApiUsersRequest, timeout: Optional[timedelta] = None) -> SearchApiUsersResponse:
        """Execute the SearchApiUsers RPC method on the ApiUserService service.
        
        This method automatically handles authentication, timeouts, and connection management.
        
        Args:
            request: The SearchApiUsersRequest containing the method parameters
            timeout: Optional timeout override for this specific call
            
        Returns:
            SearchApiUsersResponse: The successful response from the service
            
        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
            asyncio.TimeoutError: If the request times out
        """
        if self._closed:
            raise RuntimeError("Client has been closed")
        
        await self._ensure_connected()
        metadata = self._create_metadata()
        
        coro = self._client.SearchApiUsers(request, metadata=metadata)
        return await self._call_with_timeout(coro, timeout)
    
    async def activate_api_user(self, request: ActivateApiUserRequest, timeout: Optional[timedelta] = None) -> APIUser:
        """Execute the ActivateApiUser RPC method on the ApiUserService service.
        
        This method automatically handles authentication, timeouts, and connection management.
        
        Args:
            request: The ActivateApiUserRequest containing the method parameters
            timeout: Optional timeout override for this specific call
            
        Returns:
            APIUser: The successful response from the service
            
        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
            asyncio.TimeoutError: If the request times out
        """
        if self._closed:
            raise RuntimeError("Client has been closed")
        
        await self._ensure_connected()
        metadata = self._create_metadata()
        
        coro = self._client.ActivateApiUser(request, metadata=metadata)
        return await self._call_with_timeout(coro, timeout)
    
    async def deactivate_api_user(self, request: DeactivateApiUserRequest, timeout: Optional[timedelta] = None) -> APIUser:
        """Execute the DeactivateApiUser RPC method on the ApiUserService service.
        
        This method automatically handles authentication, timeouts, and connection management.
        
        Args:
            request: The DeactivateApiUserRequest containing the method parameters
            timeout: Optional timeout override for this specific call
            
        Returns:
            APIUser: The successful response from the service
            
        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
            asyncio.TimeoutError: If the request times out
        """
        if self._closed:
            raise RuntimeError("Client has been closed")
        
        await self._ensure_connected()
        metadata = self._create_metadata()
        
        coro = self._client.DeactivateApiUser(request, metadata=metadata)
        return await self._call_with_timeout(coro, timeout)
    
    async def get_api_user_by_key_hash(self, request: GetApiUserByKeyHashRequest, timeout: Optional[timedelta] = None) -> APIUser:
        """Execute the GetApiUserByKeyHash RPC method on the ApiUserService service.
        
        This method automatically handles authentication, timeouts, and connection management.
        
        Args:
            request: The GetApiUserByKeyHashRequest containing the method parameters
            timeout: Optional timeout override for this specific call
            
        Returns:
            APIUser: The successful response from the service
            
        Raises:
            grpc.RpcError: Any gRPC error that occurred during the request
            asyncio.TimeoutError: If the request times out
        """
        if self._closed:
            raise RuntimeError("Client has been closed")
        
        await self._ensure_connected()
        metadata = self._create_metadata()
        
        coro = self._client.GetApiUserByKeyHash(request, metadata=metadata)
        return await self._call_with_timeout(coro, timeout)
    
    def close(self) -> None:
        """Gracefully shut down the gRPC client connection and release all associated resources.
        
        This method should be called when the client is no longer needed to prevent resource leaks.
        It's safe to call close() multiple times - subsequent calls will be no-ops.
        
        Best Practices:
        - Always call close() when done with the client
        - Use async with statement for automatic cleanup
        - Do not use the client after calling close()
        
        Example:
            client = await create_api_user_service_grpc_client(...)
            try:
                # Use client
                pass
            finally:
                client.close()
        """
        if not self._closed:
            self._closed = True
            if self._channel:
                # Note: In async gRPC, channel.close() should be awaited,
                # but we can't make this method async. In practice, the channel
                # will be cleaned up by the garbage collector.
                try:
                    # Try to close synchronously if possible
                    asyncio.get_event_loop().run_until_complete(self._channel.close())
                except:
                    # If we can't close properly, the GC will handle it
                    pass
    
    async def __aenter__(self):
        """Async context manager entry."""
        await self._ensure_connected()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit with automatic cleanup."""
        self.close()


def _validate_auth(api_key: Optional[str], group_id: Optional[str]) -> None:
    """Validate that authentication credentials and group ID are properly configured.
    
    This function is called during client initialization to prevent runtime authentication failures.
    
    Requirements:
    - At least one authentication method must be configured
    - Group ID must be set for all public API calls
    
    Supported Authentication Methods:
    - API Key: Set via options or MESH_API_CREDENTIALS file
    
    Args:
        api_key: The API key (can be None)
        group_id: The group ID (can be None)
        
    Raises:
        ValueError: If authentication method or group ID is missing
    """
    if not api_key:
        raise ValueError(
            "api key not set. set credentials via MESH_API_CREDENTIALS file, "
            "or use with_api_key option"
        )
    if not group_id:
        raise ValueError(
            "group id not set. set via MESH_API_CREDENTIALS file or with_group option"
        )


async def create_api_user_service_grpc_client(*options: ClientOptions) -> ApiUserServiceGRPCClient:
    """Create a new gRPC client for the ApiUserService service.
    
    The client is configured using functional options and automatically handles connection
    management, authentication, timeouts, and resource management.
    
    Default Configuration:
    - Server: Uses DEFAULT_GRPC_URL and DEFAULT_GRPC_PORT
    - TLS: Enabled by default
    - Timeout: 30 seconds for all method calls
    - Authentication: Attempts to load credentials from MESH_API_CREDENTIALS file
    
    Args:
        *options: Variable number of ClientOptions to configure the client
        
    Returns:
        ApiUserServiceGRPCClient: Configured client instance
        
    Raises:
        ValueError: Configuration error (missing auth, invalid options, etc.)
        ConnectionError: Connection error
        
    Example:
        from .service_grpc_client_options import with_api_key, with_group, with_timeout
        from datetime import timedelta
        
        client = await create_api_user_service_grpc_client(
            with_api_key("your-api-key-here"),
            with_group("your-group-id"),
            with_timeout(timedelta(seconds=10)),
        )
        
        async with client:
            # Use client methods
            resp = await client.get_api_user(GetApiUserRequest(name="api_users/123"))
        
    Thread Safety:
        The returned client uses gRPC's thread-safe underlying connections.
    """
    # Start with default configuration
    url = DEFAULT_GRPC_URL
    port = DEFAULT_GRPC_PORT
    tls = DEFAULT_TLS
    api_key = None
    group_id = None
    timeout = timedelta(seconds=30)
    
    # Attempt to load credentials from environment file
    try:
        creds = credentials_from_environment()
        if creds:
            api_key = creds.api_key
            group_id = creds.group_id
    except (FileNotFoundError, ValueError):
        # Credentials from file are optional, will be validated later
        pass
    
    # Apply options to the configuration (these can override credentials from file)
    for option in options:
        if option.url is not None:
            url = option.url
        if option.port is not None:
            port = option.port
        if option.tls is not None:
            tls = option.tls
        if option.api_key is not None:
            api_key = option.api_key
        if option.group_id is not None:
            group_id = option.group_id
        if option.timeout is not None:
            timeout = option.timeout
    
    # Validate authentication credentials
    _validate_auth(api_key, group_id)
    
    # Create and return the client implementation
    return _ApiUserServiceGRPCClientImpl(
        url=url,
        port=port,
        tls=tls,
        api_key=api_key,
        group_id=group_id,
        timeout=timeout
    )
