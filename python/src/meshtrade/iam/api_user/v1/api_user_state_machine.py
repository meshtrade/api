"""API User state machine validation and transition logic.

This module provides validation and state machine functions for API User states
and actions, implementing the API User lifecycle management logic.
"""

from meshtrade.iam.api_user.v1.api_user_pb2 import APIUserAction, APIUserState


def api_user_state_is_valid(state: APIUserState | None) -> bool:
    """Check if the APIUserState is a valid enum value.

    Args:
        state: The APIUserState to validate (can be None)

    Returns:
        True if the state is a valid enum value, False otherwise

    None Safety:
        Returns False if state is None

    Example:
        >>> api_user_state_is_valid(APIUserState.API_USER_STATE_ACTIVE)
        True
        >>> api_user_state_is_valid(999)  # Invalid enum value
        False
        >>> api_user_state_is_valid(None)
        False
    """
    if state is None:
        return False
    return state in APIUserState.values()


def api_user_state_is_valid_and_defined(state: APIUserState) -> bool:
    """Check if the APIUserState is valid and not unspecified.

    Args:
        state: The APIUserState to validate

    Returns:
        True if the state is valid and not UNSPECIFIED, False otherwise

    Example:
        >>> api_user_state_is_valid_and_defined(APIUserState.API_USER_STATE_ACTIVE)
        True
        >>> api_user_state_is_valid_and_defined(APIUserState.API_USER_STATE_UNSPECIFIED)
        False
    """
    return api_user_state_is_valid(state) and state != APIUserState.API_USER_STATE_UNSPECIFIED


def api_user_state_can_perform_action_at_state(state: APIUserState | None, action: APIUserAction | None) -> bool:
    """Check if the given action can be performed at the current state.

    This implements the state machine logic for API User lifecycle management.

    State Transitions:
    - INACTIVE -> ACTIVATE -> ACTIVE
    - ACTIVE -> DEACTIVATE -> INACTIVE
    - UPDATE action allowed in any state

    Args:
        state: The current APIUserState (can be None)
        action: The APIUserAction to perform (can be None)

    Returns:
        True if the action can be performed at the given state, False otherwise

    None Safety:
        Returns False if either state or action is None

    Example:
        >>> can_perform_action_at_state(
        ...     APIUserState.API_USER_STATE_INACTIVE,
        ...     APIUserAction.API_USER_ACTION_ACTIVATE
        ... )
        True
        >>> can_perform_action_at_state(
        ...     APIUserState.API_USER_STATE_INACTIVE,
        ...     APIUserAction.API_USER_ACTION_DEACTIVATE
        ... )
        False
    """
    if state is None or action is None:
        return False

    # Define actions that are allowed regardless of state (update operations)
    general_update_actions = {
        APIUserAction.API_USER_ACTION_UPDATE: True,
    }

    if state == APIUserState.API_USER_STATE_INACTIVE:
        if action == APIUserAction.API_USER_ACTION_ACTIVATE:
            return True
        return general_update_actions.get(action, False)

    elif state == APIUserState.API_USER_STATE_ACTIVE:
        if action == APIUserAction.API_USER_ACTION_DEACTIVATE:
            return True
        return general_update_actions.get(action, False)

    else:
        return False
