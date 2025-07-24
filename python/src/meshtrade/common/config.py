"""
Common configuration utilities and constants for Meshtrade gRPC clients.
"""

from meshtrade.iam.api_user.v1.api_credentials_pb2 import APICredentials

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


def extract_group_id(group: str) -> str:
    """Extract the group ID from a group resource name in the format groups/{group_id}.

    Args:
        group: Group resource name in format groups/{group_id}

    Returns:
        The group ID portion

    Raises:
        ValueError: If the group is not in the correct format
    """
    if not group.startswith("groups/"):
        raise ValueError(f"group must be in format groups/{{group_id}}, got: {group}")

    group_id = group.removeprefix("groups/")
    if not group_id:
        raise ValueError(f"group ID cannot be empty in group resource name: {group}")

    return group_id


def group_id_for_header(credentials: APICredentials) -> str:
    """Extract the group ID from credentials for use in the x-group header.

    Args:
        credentials: APICredentials object

    Returns:
        The group ID for use in headers

    Raises:
        ValueError: If the group format is invalid
    """
    return extract_group_id(credentials.group)
