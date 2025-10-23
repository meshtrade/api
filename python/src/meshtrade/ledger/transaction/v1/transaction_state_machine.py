"""Transaction state machine validation and transition logic.

This module provides state machine functions for transaction states and actions,
implementing the transaction lifecycle management logic.
"""

from meshtrade.ledger.transaction.v1.transaction_action_pb2 import TransactionAction
from meshtrade.ledger.transaction.v1.transaction_state_pb2 import TransactionState


def transaction_state_can_perform_action_at_state(state: TransactionState | None, action: TransactionAction | None) -> bool:
    """Check if the given action can be performed at the current transaction state.

    This implements the state machine logic for transaction lifecycle management.

    State Transitions:
    - DRAFT -> BUILD/COMMIT -> SIGNING_IN_PROGRESS
    - SIGNING_IN_PROGRESS -> SIGN/MARK_PENDING -> PENDING
    - PENDING -> SUBMIT -> SUBMISSION_IN_PROGRESS
    - SUBMISSION_IN_PROGRESS -> SUBMIT (retry) -> INDETERMINATE or SUCCESS/FAILED
    - INDETERMINATE -> SUBMIT (retry) -> SUCCESS/FAILED
    - FAILED/SUCCESSFUL -> No further actions allowed (terminal states)

    Args:
        state: The current TransactionState (can be None)
        action: The TransactionAction to perform (can be None)

    Returns:
        True if the action can be performed at the given state, False otherwise

    None Safety:
        Returns False if either state or action is None

    Example:
        >>> transaction_state_can_perform_action_at_state(
        ...     TransactionState.TRANSACTION_STATE_DRAFT,
        ...     TransactionAction.TRANSACTION_ACTION_BUILD
        ... )
        True
        >>> transaction_state_can_perform_action_at_state(
        ...     TransactionState.TRANSACTION_STATE_SUCCESSFUL,
        ...     TransactionAction.TRANSACTION_ACTION_SUBMIT
        ... )
        False
    """
    if state is None or action is None:
        return False

    if state == TransactionState.TRANSACTION_STATE_DRAFT:
        return action in {
            TransactionAction.TRANSACTION_ACTION_BUILD,
            TransactionAction.TRANSACTION_ACTION_COMMIT,
        }

    elif state == TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS:
        return action in {
            TransactionAction.TRANSACTION_ACTION_SIGN,
            TransactionAction.TRANSACTION_ACTION_MARK_PENDING,
        }

    elif state in {
        TransactionState.TRANSACTION_STATE_PENDING,
        TransactionState.TRANSACTION_STATE_SUBMISSION_IN_PROGRESS,
        TransactionState.TRANSACTION_STATE_INDETERMINATE,
    }:
        return action == TransactionAction.TRANSACTION_ACTION_SUBMIT

    elif state in {
        TransactionState.TRANSACTION_STATE_FAILED,
        TransactionState.TRANSACTION_STATE_SUCCESSFUL,
    }:
        return False

    else:
        return False
