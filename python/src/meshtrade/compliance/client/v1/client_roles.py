"""Client roles utility functions."""

from meshtrade.compliance.client.v1.client_pb2 import Client
from meshtrade.iam.role.v1 import role_pb2
from meshtrade.iam.role.v1.role_pb2 import Role

# Cache for client default roles extracted from protobuf
_client_default_roles: list[Role] | None = None
_client_default_roles_error: str | None = None


def _initialize_client_default_roles() -> None:
    """Initialize client default roles from protobuf extensions.

    This function is called once to extract roles from the Client message's
    message_roles extension. Results are cached for subsequent calls.
    """
    global _client_default_roles, _client_default_roles_error

    if _client_default_roles is not None or _client_default_roles_error is not None:
        return

    try:
        # Get the Client message descriptor
        client_descriptor = Client.DESCRIPTOR

        # Get message options
        options = client_descriptor.GetOptions()

        # Get the message_roles extension descriptor
        message_roles_ext = role_pb2.message_roles

        # Check if extension is present
        # Type ignore: protobuf extension API has overly strict type stubs
        if not options.HasExtension(message_roles_ext):  # type: ignore[arg-type]
            _client_default_roles_error = f"proto message {client_descriptor.full_name} does not define extension {message_roles_ext.full_name}"
            return

        # Get the RoleList from the extension
        # Type ignore: protobuf extension API has overly strict type stubs
        role_list = options.Extensions[message_roles_ext]  # type: ignore[arg-type]

        # Extract roles and make a copy
        _client_default_roles = list(role_list.roles)

    except Exception as e:
        _client_default_roles_error = f"failed to extract roles from Client message: {e}"


def get_client_default_roles() -> list[Role]:
    """Get default roles for a client.

    Returns the roles declared on the meshtrade.compliance.client.v1.Client
    message via the meshtrade.iam.role.v1.message_roles option. The returned
    list is a copy so callers can safely mutate it without affecting subsequent reads.

    Returns:
        List of default Role values for clients
        Empty list if retrieval fails
    """
    try:
        return must_get_client_default_roles()
    except ValueError:
        return []


def must_get_client_default_roles() -> list[Role]:
    """Get default roles for a client, raising error on failure.

    Returns the roles declared on the meshtrade.compliance.client.v1.Client
    message via the meshtrade.iam.role.v1.message_roles option. The returned
    list is a copy so callers can safely mutate it without affecting subsequent reads.

    Returns:
        List of default Role values for clients

    Raises:
        ValueError: If default roles cannot be determined
    """
    _initialize_client_default_roles()

    if _client_default_roles_error is not None:
        raise ValueError(_client_default_roles_error)

    if _client_default_roles is None:
        raise ValueError("client default roles not initialized")

    # Return a copy to prevent mutation
    return list(_client_default_roles)


def get_client_default_role_index() -> dict[Role, bool]:
    """Get default roles as a lookup index.

    Builds a set-like map keyed by roles declared on the
    meshtrade.compliance.client.v1.Client message. The map's values are always
    True; the structure is intended for efficient membership checks.

    Returns:
        Dictionary mapping Role to True for default roles
        Empty dict if retrieval fails
    """
    try:
        return must_get_client_default_role_index()
    except ValueError:
        return {}


def must_get_client_default_role_index() -> dict[Role, bool]:
    """Get default roles as lookup index, raising error on failure.

    Builds a set-like map keyed by roles declared on the
    meshtrade.compliance.client.v1.Client message. The map's values are always
    True; the structure is intended for efficient membership checks.

    Returns:
        Dictionary mapping Role to True for default roles

    Raises:
        ValueError: If default roles cannot be determined
    """
    roles = must_get_client_default_roles()
    return dict.fromkeys(roles, True)
