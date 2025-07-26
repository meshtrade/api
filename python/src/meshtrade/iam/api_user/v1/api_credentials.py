"""
API Credentials loading functionality for Meshtrade SDK.
"""

import json
import os

from .api_credentials_pb2 import APICredentials

MESH_API_CREDENTIALS_ENV_VAR = "MESH_API_CREDENTIALS"


def load_api_credentials_from_file(path: str) -> APICredentials:
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
        raise FileNotFoundError(f"Failed to read API credentials file: {path}") from e
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse API credentials file: {e}") from e

    api_key = data.get("api_key")
    group = data.get("group")

    if not api_key:
        raise ValueError("api_key is required in API credentials file")

    if not group:
        raise ValueError("group is required in API credentials file")

    if not group.startswith("groups/"):
        raise ValueError(f"group must be in format groups/{{group_id}}, got: {group}")

    creds = APICredentials()
    creds.api_key = api_key
    creds.group = group

    return creds


def api_credentials_from_environment() -> APICredentials | None:
    """Load API credentials from the file path specified in MESH_API_CREDENTIALS environment variable.

    Returns:
        APICredentials object if environment variable is set and file exists, None otherwise

    Raises:
        ValueError: If the credentials file is invalid
    """
    path = os.getenv(MESH_API_CREDENTIALS_ENV_VAR)
    if not path:
        return None

    return load_api_credentials_from_file(path)


def default_credentials_path() -> str:
    """Return the OS-specific default path for Mesh API credentials.
    
    Returns:
        Default credential file path based on OS conventions:
        - Linux/macOS: $HOME/.config/mesh/credentials.json  
        - Windows: %APPDATA%/mesh/credentials.json
    """
    if os.name == 'nt':  # Windows
        app_data = os.environ.get('APPDATA')
        if app_data:
            return os.path.join(app_data, 'mesh', 'credentials.json')
        # Fallback if APPDATA not set
        return os.path.expanduser('~/.config/mesh/credentials.json')
    else:  # Linux/macOS/Unix
        # Try XDG_CONFIG_HOME first, fallback to ~/.config
        config_home = os.environ.get('XDG_CONFIG_HOME')
        if config_home:
            return os.path.join(config_home, 'mesh', 'credentials.json')
        return os.path.expanduser('~/.config/mesh/credentials.json')


def load_default_credentials() -> APICredentials | None:
    """Load API credentials from the default location if the file exists.

    Returns:
        APICredentials object if default file exists and is valid, None otherwise

    Raises:
        ValueError: If the credentials file exists but is invalid
    """
    path = default_credentials_path()

    # Check if file exists before attempting to load
    if not os.path.isfile(path):
        return None

    return load_api_credentials_from_file(path)


def find_credentials() -> APICredentials | None:
    """Search for API credentials using the standard discovery hierarchy.
    
    Discovery order:
    1. MESH_API_CREDENTIALS environment variable (if set)
    2. Default credential file location
    
    Returns:
        APICredentials object if found using any method, None if no credentials found

    Raises:
        ValueError: If a credentials file is found but is invalid
    """
    # Try environment variable first (existing behavior)
    creds = api_credentials_from_environment()
    if creds:
        return creds

    # Try default file location
    creds = load_default_credentials()
    if creds:
        return creds

    return None
