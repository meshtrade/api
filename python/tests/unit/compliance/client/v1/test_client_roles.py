"""Unit tests for client roles utility functions."""

from meshtrade.compliance.client.v1.client_roles import (
    get_client_default_role_index,
    get_client_default_roles,
    must_get_client_default_role_index,
    must_get_client_default_roles,
)
from meshtrade.iam.role.v1.role_pb2 import Role


def test_must_get_client_default_roles():
    """Test getting client default roles."""
    roles = must_get_client_default_roles()
    assert isinstance(roles, list)
    assert len(roles) == 2
    assert Role.ROLE_TRADING_VIEWER in roles
    assert Role.ROLE_WALLET_VIEWER in roles


def test_get_client_default_roles():
    """Test getting client default roles with error handling."""
    roles = get_client_default_roles()
    assert isinstance(roles, list)
    assert len(roles) == 2
    assert Role.ROLE_TRADING_VIEWER in roles
    assert Role.ROLE_WALLET_VIEWER in roles


def test_must_get_client_default_role_index():
    """Test getting client default role index."""
    role_index = must_get_client_default_role_index()
    assert isinstance(role_index, dict)
    assert len(role_index) == 2
    assert role_index[Role.ROLE_TRADING_VIEWER] is True
    assert role_index[Role.ROLE_WALLET_VIEWER] is True


def test_get_client_default_role_index():
    """Test getting client default role index with error handling."""
    role_index = get_client_default_role_index()
    assert isinstance(role_index, dict)
    assert len(role_index) == 2
    assert role_index[Role.ROLE_TRADING_VIEWER] is True
    assert role_index[Role.ROLE_WALLET_VIEWER] is True


def test_role_index_matches_roles_list():
    """Test that role index contains exactly the roles in the list."""
    roles = must_get_client_default_roles()
    role_index = must_get_client_default_role_index()

    # Check that all roles in list are in index
    for role in roles:
        assert role in role_index
        assert role_index[role] is True

    # Check that index has no extra roles
    assert len(role_index) == len(roles)


def test_role_index_lookup():
    """Test using role index for fast lookup."""
    role_index = get_client_default_role_index()

    # Should be able to check membership efficiently
    assert role_index.get(Role.ROLE_TRADING_VIEWER, False) is True
    assert role_index.get(Role.ROLE_WALLET_VIEWER, False) is True
    assert role_index.get(Role.ROLE_IAM_ADMIN, False) is False
    assert role_index.get(Role.ROLE_COMPLIANCE_ADMIN, False) is False
