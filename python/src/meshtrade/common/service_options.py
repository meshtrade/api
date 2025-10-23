"""
Shared configuration options for all gRPC services.

This module provides a clean, extensible way to configure services with optional
parameters while maintaining backward compatibility and readability.
"""

from datetime import timedelta


class ServiceOptions:
    """Configuration options for gRPC services.

    This class provides a clean, extensible way to configure services with optional
    parameters while maintaining backward compatibility and readability.
    """

    def __init__(
        self,
        tls: bool = True,
        url: str | None = None,
        port: int | None = None,
        api_key: str | None = None,
        group: str | None = None,
        timeout: timedelta = timedelta(seconds=30),
    ):
        """Initialize service options.

        Args:
            tls: Whether to use TLS encryption for the gRPC connection.
            url: The server hostname or IP address.
            port: The server port number.
            api_key: The API key for authentication.
            group: The group resource name in format groups/{group_id}.
            timeout: The default timeout for all gRPC method calls.
        """
        self.tls = tls
        self.url = url
        self.port = port
        self.api_key = api_key
        self.group = group
        self.timeout = timeout


# Create alias to match expected exports
ClientOptions = ServiceOptions
