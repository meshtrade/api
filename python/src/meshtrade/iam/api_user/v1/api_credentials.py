"""
API Credentials loading functionality for Meshtrade SDK.
"""

import json
import os
from pathlib import Path

import platformdirs

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
    """
    Calculates the OS-specific default path for Mesh API credentials.

    This function determines the standard user configuration directory based on
    the operating system's conventions and returns the full path to the
    'credentials.json' file within a 'mesh' subdirectory. It is a Pythonic
    implementation of the equivalent Go function.

    The target path is constructed as follows:
    - **Linux**:   `$XDG_CONFIG_HOME/mesh/credentials.json` or fallback to `$HOME/.config/mesh/credentials.json`
    - **macOS**:   `$HOME/Library/Application Support/mesh/credentials.json`
    - **Windows**: `C:\\Users\\<user>\\AppData\\Roaming\\mesh\\credentials.json`

    Returns:
        A string representing the full, absolute path to the credentials file.
        If the user's home or config directory cannot be determined, it returns
        an empty string to match the original Go function's behavior.
    """
    try:
        # Use platformdirs to find the appropriate user config directory for the 'mesh' app.
        # This correctly handles all OS-specific paths and environment variables.
        # e.g., on Linux, it returns '~/.config/mesh'
        mesh_config_dir = platformdirs.user_config_dir(appname="mesh")

        # Use the modern `pathlib` to reliably construct the final file path.
        # The '/' operator is overloaded for joining path components.
        credentials_path = Path(mesh_config_dir) / "credentials.json"

        # Return the path as a string.
        return str(credentials_path)

    except Exception as e:
        # If platformdirs raises an error (e.g., HOME directory not found),
        # catch it and return an empty string, mimicking the Go function's
        # behavior on failure.
        print(f"Warning: Could not determine credentials path. Error: {e}")
        return ""


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
    - **Linux**:   `$XDG_CONFIG_HOME/mesh/credentials.json` or fallback to `$HOME/.config/mesh/credentials.json`
    - **macOS**:   `$HOME/Library/Application Support/mesh/credentials.json`
    - **Windows**: `C:\\Users\\<user>\\AppData\\Roaming\\mesh\\credentials.json`

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
