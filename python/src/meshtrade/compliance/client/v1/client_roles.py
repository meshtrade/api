"""Client roles utility functions."""

from meshtrade.iam.role.v1.role_pb2 import Role


def get_client_default_roles() -> list[Role]:
    """Get default roles for a client.

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

    Returns:
        List of default Role values for clients

    Raises:
        ValueError: If default roles cannot be determined
    """
    return [
        Role.ROLE_TRADING_VIEWER,
        Role.ROLE_WALLET_VIEWER,
    ]


def get_client_default_role_index() -> dict[Role, bool]:
    """Get default roles as a lookup index.

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

    Returns:
        Dictionary mapping Role to True for default roles

    Raises:
        ValueError: If default roles cannot be determined
    """
    roles = must_get_client_default_roles()
    return dict.fromkeys(roles, True)
