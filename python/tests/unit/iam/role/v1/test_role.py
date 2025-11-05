"""Unit tests for role utility functions.

Tests validate the 4-part integer format: groups/{groupID}/roles/{roleNumber}
for cross-language compatibility.
"""

import pytest

from meshtrade.iam.role.v1.role import (
    must_parse_role_parts,
    parse_role_parts,
    role_from_full_resource_name,
    role_full_resource_name_from_group,
    role_full_resource_name_from_group_id,
    role_is_valid,
    role_is_valid_and_specified,
)
from meshtrade.iam.role.v1.role_pb2 import Role


def test_role_is_valid():
    """Test role validity check."""
    assert role_is_valid(Role.ROLE_IAM_ADMIN) is True
    assert role_is_valid(Role.ROLE_UNSPECIFIED) is True
    assert role_is_valid(Role.ROLE_WALLET_VIEWER) is True


def test_role_is_valid_invalid():
    """Test role validity check with invalid value."""
    assert role_is_valid(999999) is False  # type: ignore


def test_role_is_valid_and_specified():
    """Test role validity and specified check."""
    assert role_is_valid_and_specified(Role.ROLE_IAM_ADMIN) is True
    assert role_is_valid_and_specified(Role.ROLE_WALLET_VIEWER) is True


def test_role_is_valid_and_specified_unspecified():
    """Test that UNSPECIFIED is not considered specified."""
    assert role_is_valid_and_specified(Role.ROLE_UNSPECIFIED) is False


def test_role_is_valid_and_specified_invalid():
    """Test with invalid role value."""
    assert role_is_valid_and_specified(999999) is False  # type: ignore


def test_role_full_resource_name_from_group_id():
    """Test role full resource name generation from group ID using 4-part integer format."""
    result = role_full_resource_name_from_group_id(Role.ROLE_IAM_ADMIN, "test-group-id")
    assert result == "groups/test-group-id/roles/3000000"

    result = role_full_resource_name_from_group_id(Role.ROLE_WALLET_VIEWER, "01DD32GZ7R0000000000000001")
    assert result == "groups/01DD32GZ7R0000000000000001/roles/1000001"


def test_role_full_resource_name_from_group():
    """Test role full resource name generation from group resource name using 4-part integer format."""
    result = role_full_resource_name_from_group(Role.ROLE_IAM_ADMIN, "groups/test-group-id")
    assert result == "groups/test-group-id/roles/3000000"

    result = role_full_resource_name_from_group(Role.ROLE_WALLET_VIEWER, "groups/01DD32GZ7R0000000000000001")
    assert result == "groups/01DD32GZ7R0000000000000001/roles/1000001"


def test_role_full_resource_name_from_group_invalid_format():
    """Test role_full_resource_name_from_group with invalid group format."""
    with pytest.raises(ValueError, match="invalid group format"):
        role_full_resource_name_from_group(Role.ROLE_IAM_ADMIN, "invalid-format")

    with pytest.raises(ValueError, match="group ID cannot be empty"):
        role_full_resource_name_from_group(Role.ROLE_IAM_ADMIN, "groups/")


def test_parse_role_parts_success():
    """Test successful parsing of role parts using 4-part integer format."""
    group_id, role_int = parse_role_parts("groups/test-group-id/roles/3000000")
    assert group_id == "test-group-id"
    assert role_int == 3000000
    assert role_int == Role.ROLE_IAM_ADMIN

    group_id, role_int = parse_role_parts("groups/01DD32GZ7R0000000000000001/roles/1000001")
    assert group_id == "01DD32GZ7R0000000000000001"
    assert role_int == 1000001
    assert role_int == Role.ROLE_WALLET_VIEWER


def test_parse_role_parts_invalid_format():
    """Test parsing with invalid format."""
    with pytest.raises(ValueError, match="invalid role format"):
        parse_role_parts("invalid/format")

    with pytest.raises(ValueError, match="invalid role format"):
        parse_role_parts("groups/id")

    with pytest.raises(ValueError, match="invalid role format"):
        parse_role_parts("not-groups/id/roles/3000000")

    # Old 3-part format should be rejected
    with pytest.raises(ValueError, match="invalid role format"):
        parse_role_parts("groups/id/3000000")

    # String-based role names are invalid (we use integers)
    with pytest.raises(ValueError, match="error parsing role enum value"):
        parse_role_parts("groups/id/roles/ROLE_IAM_ADMIN")


def test_parse_role_parts_invalid_role_number():
    """Test parsing with invalid role number."""
    with pytest.raises(ValueError, match="error parsing role enum value"):
        parse_role_parts("groups/test-id/roles/not-a-number")

    with pytest.raises(ValueError, match="invalid role number"):
        parse_role_parts("groups/test-id/roles/-1")


def test_parse_role_parts_empty_group_id():
    """Test parsing with empty group ID."""
    with pytest.raises(ValueError, match="group ID cannot be empty"):
        parse_role_parts("groups//roles/3000000")


def test_must_parse_role_parts():
    """Test must_parse_role_parts alias."""
    group_id, role_int = must_parse_role_parts("groups/test-group-id/roles/3000000")
    assert group_id == "test-group-id"
    assert role_int == 3000000

    with pytest.raises(ValueError):
        must_parse_role_parts("invalid/format")


def test_role_from_full_resource_name_success():
    """Test extracting role from full resource name using 4-part integer format."""
    role = role_from_full_resource_name("groups/test-id/roles/3000000")
    assert role == Role.ROLE_IAM_ADMIN

    role = role_from_full_resource_name("groups/01DD32GZ7R0000000000000001/roles/1000001")
    assert role == Role.ROLE_WALLET_VIEWER


def test_role_from_full_resource_name_invalid():
    """Test extracting role from invalid resource name returns ROLE_UNSPECIFIED."""
    role = role_from_full_resource_name("invalid/format")
    assert role == Role.ROLE_UNSPECIFIED

    role = role_from_full_resource_name("groups/id/roles/not-a-number")
    assert role == Role.ROLE_UNSPECIFIED

    # Old 3-part format should return UNSPECIFIED
    role = role_from_full_resource_name("groups/id/3000000")
    assert role == Role.ROLE_UNSPECIFIED

    # String-based role names should return UNSPECIFIED
    role = role_from_full_resource_name("groups/id/roles/ROLE_IAM_ADMIN")
    assert role == Role.ROLE_UNSPECIFIED


def test_round_trip_role_resource_name():
    """Test that we can generate and parse role resource names using 4-part integer format."""
    test_roles = [
        Role.ROLE_IAM_ADMIN,
        Role.ROLE_WALLET_VIEWER,
        Role.ROLE_COMPLIANCE_ADMIN,
        Role.ROLE_TRADING_ADMIN,
    ]

    group_id = "test-group-id"

    for original_role in test_roles:
        # Generate resource name (4-part integer format)
        resource_name = role_full_resource_name_from_group_id(original_role, group_id)

        # Verify format is correct (4 parts with "roles" segment and integer)
        parts = resource_name.split("/")
        assert len(parts) == 4
        assert parts[0] == "groups"
        assert parts[1] == group_id
        assert parts[2] == "roles"
        assert parts[3].isdigit()

        # Parse it back
        parsed_group_id, parsed_role_int = parse_role_parts(resource_name)

        # Verify round-trip
        assert parsed_group_id == group_id
        assert parsed_role_int == original_role


def test_cross_sdk_compatibility():
    """Test that resource names use the cross-language compatible format.

    Expected format: groups/{groupID}/roles/{roleNumber}
    Example: groups/01DD32GZ7R0000000000000001/roles/3000000
    """
    # Generate resource name
    resource_name = role_full_resource_name_from_group_id(Role.ROLE_IAM_ADMIN, "01DD32GZ7R0000000000000001")

    # Should use 4-part integer format
    assert resource_name == "groups/01DD32GZ7R0000000000000001/roles/3000000"

    # Should be parseable back to integer role value
    group_id, role_int = parse_role_parts(resource_name)
    assert group_id == "01DD32GZ7R0000000000000001"
    assert role_int == 3000000
