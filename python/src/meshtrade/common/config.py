"""
Common configuration utilities and constants for Meshtrade gRPC clients.
"""

DEFAULT_GRPC_URL = "production-service-mesh-api-gateway-lb-frontend.mesh.trade"
DEFAULT_GRPC_PORT = 443
DEFAULT_TLS = True

# gRPC metadata constants
AUTHORIZATION_HEADER_KEY = "authorization"
COOKIE_HEADER_KEY = "cookie"
GROUP_HEADER_KEY = "x-group"
BEARER_PREFIX = "Bearer "
ACCESS_TOKEN_PREFIX = "AccessToken="


def create_auth_metadata(api_key: str, group: str) -> list[tuple[str, str]]:
    """Create authentication metadata for gRPC requests.

    Args:
        api_key: The API key (without Bearer prefix)
        group: The group resource name in format groups/{group_id}

    Returns:
        List of metadata header tuples for authentication
    """
    return [
        (AUTHORIZATION_HEADER_KEY, f"{BEARER_PREFIX}{api_key}"),
        (GROUP_HEADER_KEY, group),  # Send full groups/uuid format in header
    ]
