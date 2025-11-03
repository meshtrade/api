package co.meshtrade.api.ledger.transaction.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.Test;

import co.meshtrade.api.ledger.transaction.v1.TransactionActionOuterClass.TransactionAction;
import co.meshtrade.api.ledger.transaction.v1.TransactionStateOuterClass.TransactionState;

/**
 * Comprehensive tests for TransactionStateMachine utility methods.
 */
class TransactionStateMachineTest {

    // Test DRAFT state transitions
    @Test
    void canPerformActionDraftStateBuildActionReturnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_DRAFT,
            TransactionAction.TRANSACTION_ACTION_BUILD
        ));
    }

    @Test
    void canPerformActionDraftStateCommitActionReturnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_DRAFT,
            TransactionAction.TRANSACTION_ACTION_COMMIT
        ));
    }

    @Test
    void canPerformActionDraftStateSignActionReturnsFalse() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_DRAFT,
            TransactionAction.TRANSACTION_ACTION_SIGN
        ));
    }

    // Test SIGNING_IN_PROGRESS state transitions
    @Test
    void canPerformActionSigningStateSignActionReturnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS,
            TransactionAction.TRANSACTION_ACTION_SIGN
        ));
    }

    @Test
    void canPerformActionSigningStateMarkPendingActionReturnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS,
            TransactionAction.TRANSACTION_ACTION_MARK_PENDING
        ));
    }

    @Test
    void canPerformActionSigningStateSubmitActionReturnsFalse() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS,
            TransactionAction.TRANSACTION_ACTION_SUBMIT
        ));
    }

    // Test PENDING state transitions
    @Test
    void canPerformActionPendingStateSubmitActionReturnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_PENDING,
            TransactionAction.TRANSACTION_ACTION_SUBMIT
        ));
    }

    @Test
    void canPerformActionPendingStateBuildActionReturnsFalse() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_PENDING,
            TransactionAction.TRANSACTION_ACTION_BUILD
        ));
    }

    // Test SUBMISSION_IN_PROGRESS state transitions
    @Test
    void canPerformActionSubmissionInProgressStateSubmitActionReturnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_SUBMISSION_IN_PROGRESS,
            TransactionAction.TRANSACTION_ACTION_SUBMIT
        ));
    }

    // Test INDETERMINATE state transitions
    @Test
    void canPerformActionIndeterminateStateSubmitActionReturnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_INDETERMINATE,
            TransactionAction.TRANSACTION_ACTION_SUBMIT
        ));
    }

    // Test terminal states
    @Test
    void canPerformActionFailedStateNoActionsAllowed() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_FAILED,
            TransactionAction.TRANSACTION_ACTION_BUILD
        ));
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_FAILED,
            TransactionAction.TRANSACTION_ACTION_SUBMIT
        ));
    }

    @Test
    void canPerformActionSuccessfulStateNoActionsAllowed() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_SUCCESSFUL,
            TransactionAction.TRANSACTION_ACTION_BUILD
        ));
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_SUCCESSFUL,
            TransactionAction.TRANSACTION_ACTION_SUBMIT
        ));
    }

    // Test null handling
    @Test
    void canPerformActionNullStateReturnsFalse() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            null,
            TransactionAction.TRANSACTION_ACTION_BUILD
        ));
    }

    @Test
    void canPerformActionNullActionReturnsFalse() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_DRAFT,
            null
        ));
    }

    // Test transactionStateGetValidActions
    @Test
    void getValidActionsDraftStateIncludesBuildAndCommit() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_DRAFT
        );

        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_BUILD));
        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_COMMIT));
        assertFalse(actions.contains(TransactionAction.TRANSACTION_ACTION_SUBMIT));
        assertEquals(2, actions.size());
    }

    @Test
    void getValidActionsSigningStateIncludesSignAndMarkPending() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS
        );

        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_SIGN));
        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_MARK_PENDING));
        assertFalse(actions.contains(TransactionAction.TRANSACTION_ACTION_BUILD));
        assertEquals(2, actions.size());
    }

    @Test
    void getValidActionsPendingStateIncludesOnlySubmit() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_PENDING
        );

        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_SUBMIT));
        assertEquals(1, actions.size());
    }

    @Test
    void getValidActionsSubmissionInProgressStateIncludesOnlySubmit() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_SUBMISSION_IN_PROGRESS
        );

        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_SUBMIT));
        assertEquals(1, actions.size());
    }

    @Test
    void getValidActionsIndeterminateStateIncludesOnlySubmit() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_INDETERMINATE
        );

        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_SUBMIT));
        assertEquals(1, actions.size());
    }

    @Test
    void getValidActionsFailedStateReturnsEmptySet() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_FAILED
        );

        assertTrue(actions.isEmpty());
    }

    @Test
    void getValidActionsSuccessfulStateReturnsEmptySet() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_SUCCESSFUL
        );

        assertTrue(actions.isEmpty());
    }

    @Test
    void getValidActionsNullStateReturnsEmptySet() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(null);
        assertTrue(actions.isEmpty());
    }

    // Integration test - transaction lifecycle
    @Test
    void integrationTransactionLifecycleWorkCorrectly() {
        // Start in DRAFT
        TransactionState currentState = TransactionState.TRANSACTION_STATE_DRAFT;

        // Can build and commit
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            currentState, TransactionAction.TRANSACTION_ACTION_BUILD));
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            currentState, TransactionAction.TRANSACTION_ACTION_COMMIT));

        // Move to SIGNING_IN_PROGRESS
        currentState = TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS;

        // Can sign and mark pending
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            currentState, TransactionAction.TRANSACTION_ACTION_SIGN));
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            currentState, TransactionAction.TRANSACTION_ACTION_MARK_PENDING));

        // Move to PENDING
        currentState = TransactionState.TRANSACTION_STATE_PENDING;

        // Can only submit
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            currentState, TransactionAction.TRANSACTION_ACTION_SUBMIT));

        // Move to SUCCESSFUL (terminal)
        currentState = TransactionState.TRANSACTION_STATE_SUCCESSFUL;

        // No actions allowed
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            currentState, TransactionAction.TRANSACTION_ACTION_BUILD));
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            currentState, TransactionAction.TRANSACTION_ACTION_SUBMIT));
    }
}
