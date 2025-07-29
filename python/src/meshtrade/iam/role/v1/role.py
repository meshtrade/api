"""Role helper functions for IAM role management."""

from .role_pb2 import Role


def full_resource_name_from_group_name(role: Role, group_name: str) -> str:
    """
    Create a full resource name for a role within a specific group.

    This function provides the Python equivalent of Go's Role.FullResourceNameFromGroupName() method.

    Args:
        role: The Role enum value (e.g., Role.ROLE_IAM_ADMIN)
        group_name: The group name (e.g., "groups/01DD32GZ7R0000000000000001")

    Returns:
        The full resource name string (e.g., "groups/01DD32GZ7R0000000000000001/5")

    Example:
        >>> full_resource_name_from_group_name(Role.ROLE_IAM_ADMIN, "groups/01DD32GZ7R0000000000000001")
        "groups/01DD32GZ7R0000000000000001/5"
    """
    return f"{group_name}/{role}"
