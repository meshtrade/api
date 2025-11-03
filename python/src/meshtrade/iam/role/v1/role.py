"""Role utility functions for Mesh API.

This module provides helper functions for working with Role enums and their resource names.
All functions use the 4-part integer format: groups/{groupID}/roles/{roleNumber}
for cross-language compatibility.
"""

from meshtrade.iam.role.v1.role_pb2 import Role


def role_is_valid(role: Role) -> bool:
    """Check if role value is valid (within enum range).

    Args:
        role: Role enum value (integer)

    Returns:
        True if role is a valid enum value

    Example:
        >>> role_is_valid(Role.ROLE_IAM_ADMIN)
        True
        >>> role_is_valid(99999999)
        False
    """
    return role in Role.values()


def role_is_valid_and_specified(role: Role) -> bool:
    """Check if role is valid and not UNSPECIFIED.

    Args:
        role: Role enum value (integer)

    Returns:
        True if role is valid and not ROLE_UNSPECIFIED

    Example:
        >>> role_is_valid_and_specified(Role.ROLE_IAM_ADMIN)
        True
        >>> role_is_valid_and_specified(Role.ROLE_UNSPECIFIED)
        False
    """
    return role_is_valid(role) and role != Role.ROLE_UNSPECIFIED


def role_full_resource_name_from_group_id(role: Role, group_id: str) -> str:
    """Generate full resource name from role and group ID.

    Format: groups/{group_id}/roles/{role_int}

    Args:
        role: Role enum value (integer)
        group_id: Group ID (UUID)

    Returns:
        Full resource name string using integer format

    Example:
        >>> role_full_resource_name_from_group_id(Role.ROLE_IAM_ADMIN, "01DD32GZ7R0000000000000001")
        'groups/01DD32GZ7R0000000000000001/roles/3000000'
    """
    return f"groups/{group_id}/roles/{int(role)}"


def role_full_resource_name_from_group(role: Role, group: str) -> str:
    """Generate full resource name from role and group resource name.

    Args:
        role: Role enum value (integer)
        group: Group resource name (e.g., "groups/{id}")

    Returns:
        Full resource name string using integer format

    Raises:
        ValueError: If group format is invalid

    Example:
        >>> role_full_resource_name_from_group(Role.ROLE_IAM_ADMIN, "groups/01DD32GZ7R0000000000000001")
        'groups/01DD32GZ7R0000000000000001/roles/3000000'
    """
    if not group.startswith("groups/"):
        raise ValueError(f"invalid group format, expected groups/{{groupID}}, got: {group}")

    group_id = group[len("groups/") :]
    if not group_id:
        raise ValueError(f"group ID cannot be empty in group resource name: {group}")

    return role_full_resource_name_from_group_id(role, group_id)


def role_from_full_resource_name(full_resource_name: str) -> Role:
    """Extract Role from full resource name.

    Args:
        full_resource_name: Full resource name (e.g., "groups/{id}/roles/{role_int}")

    Returns:
        Role enum value (integer), or ROLE_UNSPECIFIED if parsing fails

    Example:
        >>> role_from_full_resource_name("groups/01DD32GZ7R0000000000000001/roles/3000000")
        3000000
        >>> role_from_full_resource_name("invalid/format")
        0
    """
    from typing import cast

    try:
        _, role_int = parse_role_parts(full_resource_name)
        # Python protobuf enums are integers, safe to cast
        return cast(Role, role_int)
    except ValueError:
        return Role.ROLE_UNSPECIFIED


def parse_role_parts(role_full_resource_name: str) -> tuple[str, int]:
    """Parse full resource name into group ID and Role.

    Expected format: groups/{group_id}/roles/{role_int}

    Args:
        role_full_resource_name: Full resource name

    Returns:
        Tuple of (group_id, role_int)

    Raises:
        ValueError: If format is invalid or role number cannot be parsed

    Example:
        >>> parse_role_parts("groups/01DD32GZ7R0000000000000001/roles/3000000")
        ('01DD32GZ7R0000000000000001', 3000000)
    """
    parts = role_full_resource_name.split("/")
    if len(parts) != 4 or parts[0] != "groups" or parts[2] != "roles":
        raise ValueError(f"invalid role format, expected groups/{{groupID}}/roles/{{role}}, got {role_full_resource_name}")

    group_id = parts[1]
    if not group_id:
        raise ValueError("group ID cannot be empty")

    try:
        role_int = int(parts[3])
    except ValueError as e:
        raise ValueError(f"error parsing role enum value '{parts[3]}'") from e

    if role_int < 0:
        raise ValueError(f"invalid role number in full resource name: {role_full_resource_name}")

    return group_id, role_int


def must_parse_role_parts(role_full_resource_name: str) -> tuple[str, int]:
    """Parse role parts, raising error on failure.

    This is an alias for parse_role_parts.
    Both functions raise ValueError on parsing errors.

    Args:
        role_full_resource_name: Full resource name

    Returns:
        Tuple of (group_id, role_int)

    Raises:
        ValueError: If format is invalid

    Example:
        >>> must_parse_role_parts("groups/01DD32GZ7R0000000000000001/roles/3000000")
        ('01DD32GZ7R0000000000000001', 3000000)
    """
    return parse_role_parts(role_full_resource_name)
