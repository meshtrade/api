"""
Base gRPC client interface and implementation for resource management.
"""

from abc import ABC, abstractmethod
from collections.abc import Callable
from datetime import timedelta
from typing import Any, TypeVar

import grpc
from protovalidate import Validator

from .config import (
    DEFAULT_GRPC_PORT,
    DEFAULT_GRPC_URL,
    DEFAULT_TLS,
    create_auth_metadata,
)

T = TypeVar("T")


class GRPCClient(ABC):
    """Base interface that all gRPC clients should implement to ensure proper resource cleanup."""

    @abstractmethod
    def close(self) -> None:
        """Close the gRPC client connection and release all associated resources."""
        pass

    @abstractmethod
    def group(self) -> str:
        """Get the group resource name used by this service."""
        pass


class BaseGRPCClient(GRPCClient):
    """Base gRPC client providing common functionality for all service clients.

    This class handles connection management, authentication, timeouts, and provides
    a common method execution pattern similar to the Go BaseGRPCClient architecture.

    Individual service clients should inherit from this class and implement minimal
    wrapper methods that call _execute_method().
    """

    def __init__(
        self,
        service_name: str,
        stub_factory: Callable[[grpc.Channel], Any],
        find_credentials_func: Callable[[], Any],
        url: str | None = None,
        port: int | None = None,
        api_key: str | None = None,
        group: str | None = None,
        timeout: timedelta | None = None,
        tls: bool | None = None,
    ):
        """Initialize the base gRPC client.

        Args:
            service_name: Name of the service for tracing/debugging
            stub_factory: Function that creates the gRPC stub from a channel
            find_credentials_func: Function to discover credentials from environment
            url: gRPC server URL (uses default if None)
            port: gRPC server port (uses default if None)
            api_key: API key for authentication (discovered if None)
            group: Group resource name (discovered if None)
            timeout: Request timeout (uses 30s default if None)
            tls: Enable TLS (uses default if None)
        """
        self._service_name = service_name
        self._stub_factory = stub_factory

        # Configuration
        self._url = url or DEFAULT_GRPC_URL
        self._port = port or DEFAULT_GRPC_PORT
        self._timeout = timeout or timedelta(seconds=30)
        self._tls = tls if tls is not None else DEFAULT_TLS

        # gRPC components (initialized lazily)
        self._channel: grpc.Channel | None = None
        self._stub: Any | None = None

        # Request validation
        self._validator = Validator()

        # Authentication - try provided credentials first, then discovery
        if api_key and group:
            self._api_key = api_key
            self._group = group
        else:
            # Try credential discovery (similar to Go pattern)
            try:
                creds = find_credentials_func()
                self._api_key = creds.api_key if creds else api_key
                self._group = creds.group if creds else group
            except Exception:
                self._api_key = api_key
                self._group = group

    def __enter__(self):
        """Enter the runtime context for the gRPC service."""
        self._ensure_connected()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Exit the runtime context and cleanup resources."""
        self.close()

    def _ensure_connected(self):
        """Ensure the gRPC channel and stub are properly initialized."""
        if self._channel is not None:
            return

        # Build target URL
        target = f"{self._url}:{self._port}"

        # Create appropriate credentials based on TLS setting
        if self._tls:
            credentials = grpc.ssl_channel_credentials()
            self._channel = grpc.secure_channel(target, credentials)
        else:
            self._channel = grpc.insecure_channel(target)

        # Create the service-specific stub
        self._stub = self._stub_factory(self._channel)

    def close(self) -> None:
        """Close the gRPC channel and cleanup resources."""
        if self._channel is not None:
            self._channel.close()
            self._channel = None
            self._stub = None

    def group(self) -> str:
        """Get the group resource name used by this service.

        Returns:
            The group resource name in format groups/{group_id}

        Raises:
            ValueError: If no group is configured
        """
        if not self._group:
            raise ValueError("Group not configured. Provide via constructor or set MESH_API_CREDENTIALS environment variable.")
        return self._group

    def validator(self) -> Validator:
        """Get the protovalidate validator for request validation.

        Returns:
            The protovalidate Validator instance for client-side request validation
        """
        return self._validator

    def _execute_method(self, method_name: str, request: Any, timeout: timedelta | None = None) -> Any:
        """Execute a gRPC method with authentication and error handling.

        This is the equivalent of the Go Execute() function - it handles all common
        patterns like connection setup, authentication, timeouts, and error handling.

        Args:
            method_name: The name of the gRPC stub method to call
            request: The request message
            timeout: Optional timeout override

        Returns:
            The response message

        Raises:
            grpc.RpcError: If the gRPC call fails
            ValueError: If authentication credentials are missing or request validation fails
        """
        # Validate request using protovalidate
        try:
            self._validator.validate(request)
        except Exception as e:
            raise ValueError(f"Request validation failed: {e}") from e

        self._ensure_connected()

        if not self._api_key or not self._group:
            raise ValueError(
                "API key and group are required for authentication. Provide them via constructor or set MESH_API_CREDENTIALS environment variable."
            )

        if self._stub is None:
            raise RuntimeError("gRPC stub not initialized. Call _ensure_connected() first.")

        # Get the method from the stub
        method = getattr(self._stub, method_name)

        # Create authentication metadata
        metadata = create_auth_metadata(self._api_key, self._group)

        # Use provided timeout or default
        call_timeout = timeout or self._timeout
        timeout_seconds = call_timeout.total_seconds()

        # Make the authenticated call
        return method(request, metadata=metadata, timeout=timeout_seconds)
