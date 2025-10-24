"""Tests for API User state machine validation and transition logic."""

from meshtrade.iam.api_user.v1.api_user_pb2 import APIUserAction, APIUserState
from meshtrade.iam.api_user.v1.api_user_state_machine import (
    api_user_state_can_perform_action_at_state,
    api_user_state_is_valid,
    api_user_state_is_valid_and_defined,
)


class TestAPIUserStateIsValid:
    """Tests for api_user_state_is_valid function."""

    def test_valid_states(self):
        """Test that valid enum values return True."""
        assert api_user_state_is_valid(APIUserState.API_USER_STATE_UNSPECIFIED) is True
        assert api_user_state_is_valid(APIUserState.API_USER_STATE_ACTIVE) is True
        assert api_user_state_is_valid(APIUserState.API_USER_STATE_INACTIVE) is True

    def test_invalid_state_none(self):
        """Test that None returns False."""
        assert api_user_state_is_valid(None) is False

    def test_invalid_state_out_of_range(self):
        """Test that out-of-range enum values return False."""
        assert api_user_state_is_valid(999) is False  # type: ignore
        assert api_user_state_is_valid(-1) is False  # type: ignore


class TestAPIUserStateIsValidAndDefined:
    """Tests for api_user_state_is_valid_and_defined function."""

    def test_valid_and_defined_states(self):
        """Test that valid non-unspecified states return True."""
        assert api_user_state_is_valid_and_defined(APIUserState.API_USER_STATE_ACTIVE) is True
        assert api_user_state_is_valid_and_defined(APIUserState.API_USER_STATE_INACTIVE) is True

    def test_unspecified_state_returns_false(self):
        """Test that UNSPECIFIED state returns False."""
        assert api_user_state_is_valid_and_defined(APIUserState.API_USER_STATE_UNSPECIFIED) is False

    def test_invalid_states_return_false(self):
        """Test that invalid states return False."""
        assert api_user_state_is_valid_and_defined(None) is False  # type: ignore
        assert api_user_state_is_valid_and_defined(999) is False  # type: ignore


class TestAPIUserStateCanPerformActionAtState:
    """Tests for api_user_state_can_perform_action_at_state function."""

    def test_inactive_can_activate(self):
        """Test that INACTIVE state can perform ACTIVATE action."""
        assert (
            api_user_state_can_perform_action_at_state(
                APIUserState.API_USER_STATE_INACTIVE,
                APIUserAction.API_USER_ACTION_ACTIVATE,
            )
            is True
        )

    def test_inactive_cannot_deactivate(self):
        """Test that INACTIVE state cannot perform DEACTIVATE action."""
        assert (
            api_user_state_can_perform_action_at_state(
                APIUserState.API_USER_STATE_INACTIVE,
                APIUserAction.API_USER_ACTION_DEACTIVATE,
            )
            is False
        )

    def test_active_can_deactivate(self):
        """Test that ACTIVE state can perform DEACTIVATE action."""
        assert (
            api_user_state_can_perform_action_at_state(
                APIUserState.API_USER_STATE_ACTIVE,
                APIUserAction.API_USER_ACTION_DEACTIVATE,
            )
            is True
        )

    def test_active_cannot_activate(self):
        """Test that ACTIVE state cannot perform ACTIVATE action."""
        assert (
            api_user_state_can_perform_action_at_state(
                APIUserState.API_USER_STATE_ACTIVE,
                APIUserAction.API_USER_ACTION_ACTIVATE,
            )
            is False
        )

    def test_update_allowed_in_inactive_state(self):
        """Test that UPDATE action is allowed in INACTIVE state."""
        assert (
            api_user_state_can_perform_action_at_state(
                APIUserState.API_USER_STATE_INACTIVE,
                APIUserAction.API_USER_ACTION_UPDATE,
            )
            is True
        )

    def test_update_allowed_in_active_state(self):
        """Test that UPDATE action is allowed in ACTIVE state."""
        assert (
            api_user_state_can_perform_action_at_state(
                APIUserState.API_USER_STATE_ACTIVE,
                APIUserAction.API_USER_ACTION_UPDATE,
            )
            is True
        )

    def test_create_not_allowed_in_inactive_state(self):
        """Test that CREATE action is not allowed in INACTIVE state."""
        assert (
            api_user_state_can_perform_action_at_state(
                APIUserState.API_USER_STATE_INACTIVE,
                APIUserAction.API_USER_ACTION_CREATE,
            )
            is False
        )

    def test_none_state_returns_false(self):
        """Test that None state returns False."""
        assert (
            api_user_state_can_perform_action_at_state(
                None,
                APIUserAction.API_USER_ACTION_ACTIVATE,
            )
            is False
        )

    def test_none_action_returns_false(self):
        """Test that None action returns False."""
        assert (
            api_user_state_can_perform_action_at_state(
                APIUserState.API_USER_STATE_ACTIVE,
                None,
            )
            is False
        )

    def test_unspecified_state_returns_false(self):
        """Test that UNSPECIFIED state returns False for all actions."""
        assert (
            api_user_state_can_perform_action_at_state(
                APIUserState.API_USER_STATE_UNSPECIFIED,
                APIUserAction.API_USER_ACTION_ACTIVATE,
            )
            is False
        )
        assert (
            api_user_state_can_perform_action_at_state(
                APIUserState.API_USER_STATE_UNSPECIFIED,
                APIUserAction.API_USER_ACTION_UPDATE,
            )
            is False
        )
