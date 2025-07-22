"""
Common configuration utilities and constants for Meshtrade gRPC clients.
"""

import json
import os
from dataclasses import dataclass

DEFAULT_GRPC_URL = "production-service-mesh-api-gateway-lb-frontend.mesh.trade"
DEFAULT_GRPC_PORT = 443
DEFAULT_TLS = True

MESH_API_CREDENTIALS_ENV_VAR = "MESH_API_CREDENTIALS"

# gRPC metadata constants
AUTHORIZATION_HEADER_KEY = "authorization"
COOKIE_HEADER_KEY = "cookie"
GROUP_ID_HEADER_KEY = "x-group-id"
BEARER_PREFIX = "Bearer "
ACCESS_TOKEN_PREFIX = "AccessToken="


@dataclass
class APICredentials:
    """Represents the structure of the credentials file."""

    api_key: str
    group_id: str


def load_credentials_from_file(path: str) -> APICredentials:
    """Load API credentials from a JSON file.

    Args:
        path: Path to the credentials JSON file

    Returns:
        APICredentials object with loaded credentials

    Raises:
        FileNotFoundError: If the credentials file doesn't exist
        ValueError: If the credentials file is invalid or missing required fields
    """
    try:
        with open(path) as f:
            data = json.load(f)
    except FileNotFoundError as e:
        raise FileNotFoundError(f"Failed to read credentials file: {path}") from e
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse credentials file: {e}") from e

    api_key = data.get("api_key")
    group_id = data.get("group_id")

    if not api_key:
        raise ValueError("api_key is required in credentials file")

    if not group_id:
        raise ValueError("group_id is required in credentials file")

    return APICredentials(api_key=api_key, group_id=group_id)


def credentials_from_environment() -> APICredentials | None:
    """Load API credentials from the file path specified in MESH_API_CREDENTIALS environment variable.

    Returns:
        APICredentials object if environment variable is set and file exists, None otherwise

    Raises:
        ValueError: If the credentials file is invalid
    """
    path = os.getenv(MESH_API_CREDENTIALS_ENV_VAR)
    if not path:
        return None

    return load_credentials_from_file(path)


def create_auth_metadata(api_key: str, group_id: str) -> dict[str, str]:
    """Create authentication metadata for gRPC requests.

    Args:
        api_key: The API key (without Bearer prefix)
        group_id: The group ID

    Returns:
        Dictionary of metadata headers for authentication
    """
    return {
        AUTHORIZATION_HEADER_KEY: f"{BEARER_PREFIX}{api_key}",
        GROUP_ID_HEADER_KEY: group_id,
    }
