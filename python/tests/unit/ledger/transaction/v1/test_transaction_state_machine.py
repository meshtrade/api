"""Tests for transaction state machine validation and transition logic."""

from meshtrade.ledger.transaction.v1.transaction_action_pb2 import TransactionAction
from meshtrade.ledger.transaction.v1.transaction_state_machine import (
    transaction_state_can_perform_action_at_state,
)
from meshtrade.ledger.transaction.v1.transaction_state_pb2 import TransactionState


class TestTransactionStateCanPerformActionAtState:
    """Tests for transaction_state_can_perform_action_at_state function."""

    def test_draft_can_build(self):
        """Test that DRAFT state can perform BUILD action."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_DRAFT,
                TransactionAction.TRANSACTION_ACTION_BUILD,
            )
            is True
        )

    def test_draft_can_commit(self):
        """Test that DRAFT state can perform COMMIT action."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_DRAFT,
                TransactionAction.TRANSACTION_ACTION_COMMIT,
            )
            is True
        )

    def test_draft_cannot_sign(self):
        """Test that DRAFT state cannot perform SIGN action."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_DRAFT,
                TransactionAction.TRANSACTION_ACTION_SIGN,
            )
            is False
        )

    def test_signing_in_progress_can_sign(self):
        """Test that SIGNING_IN_PROGRESS state can perform SIGN action."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS,
                TransactionAction.TRANSACTION_ACTION_SIGN,
            )
            is True
        )

    def test_signing_in_progress_can_mark_pending(self):
        """Test that SIGNING_IN_PROGRESS state can perform MARK_PENDING action."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS,
                TransactionAction.TRANSACTION_ACTION_MARK_PENDING,
            )
            is True
        )

    def test_signing_in_progress_cannot_submit(self):
        """Test that SIGNING_IN_PROGRESS state cannot perform SUBMIT action."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS,
                TransactionAction.TRANSACTION_ACTION_SUBMIT,
            )
            is False
        )

    def test_pending_can_submit(self):
        """Test that PENDING state can perform SUBMIT action."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_PENDING,
                TransactionAction.TRANSACTION_ACTION_SUBMIT,
            )
            is True
        )

    def test_pending_cannot_build(self):
        """Test that PENDING state cannot perform BUILD action."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_PENDING,
                TransactionAction.TRANSACTION_ACTION_BUILD,
            )
            is False
        )

    def test_submission_in_progress_can_submit(self):
        """Test that SUBMISSION_IN_PROGRESS state can perform SUBMIT action (retry)."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_SUBMISSION_IN_PROGRESS,
                TransactionAction.TRANSACTION_ACTION_SUBMIT,
            )
            is True
        )

    def test_indeterminate_can_submit(self):
        """Test that INDETERMINATE state can perform SUBMIT action (retry)."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_INDETERMINATE,
                TransactionAction.TRANSACTION_ACTION_SUBMIT,
            )
            is True
        )

    def test_failed_cannot_perform_any_action(self):
        """Test that FAILED state is terminal and cannot perform any actions."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_FAILED,
                TransactionAction.TRANSACTION_ACTION_SUBMIT,
            )
            is False
        )
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_FAILED,
                TransactionAction.TRANSACTION_ACTION_BUILD,
            )
            is False
        )

    def test_successful_cannot_perform_any_action(self):
        """Test that SUCCESSFUL state is terminal and cannot perform any actions."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_SUCCESSFUL,
                TransactionAction.TRANSACTION_ACTION_SUBMIT,
            )
            is False
        )
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_SUCCESSFUL,
                TransactionAction.TRANSACTION_ACTION_BUILD,
            )
            is False
        )

    def test_none_state_returns_false(self):
        """Test that None state returns False."""
        assert (
            transaction_state_can_perform_action_at_state(
                None,
                TransactionAction.TRANSACTION_ACTION_BUILD,
            )
            is False
        )

    def test_none_action_returns_false(self):
        """Test that None action returns False."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_DRAFT,
                None,
            )
            is False
        )

    def test_unspecified_state_returns_false(self):
        """Test that UNSPECIFIED state returns False for all actions."""
        assert (
            transaction_state_can_perform_action_at_state(
                TransactionState.TRANSACTION_STATE_UNSPECIFIED,
                TransactionAction.TRANSACTION_ACTION_BUILD,
            )
            is False
        )
