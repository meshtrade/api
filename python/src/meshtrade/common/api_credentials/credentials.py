"""
API Credentials loading functionality for Meshtrade SDK.
"""

import json
import os

from meshtrade.iam.api_user.v1.api_credentials_pb2 import APICredentials

MESH_API_CREDENTIALS_ENV_VAR = "MESH_API_CREDENTIALS"


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
    group = data.get("group")

    if not api_key:
        raise ValueError("api_key is required in credentials file")

    if not group:
        raise ValueError("group is required in credentials file")

    if not group.startswith("groups/"):
        raise ValueError(f"group must be in format groups/{{group_id}}, got: {group}")

    creds = APICredentials()
    creds.api_key = api_key
    creds.group = group
    
    return creds


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
