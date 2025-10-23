package co.meshtrade.api.ledger.transaction.v1;

import co.meshtrade.api.ledger.transaction.v1.TransactionStateOuterClass.TransactionState;
import co.meshtrade.api.ledger.transaction.v1.TransactionActionOuterClass.TransactionAction;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Comprehensive tests for TransactionStateMachine utility methods.
 */
class TransactionStateMachineTest {

    // Test DRAFT state transitions
    @Test
    void canPerformAction_draftStateBuildAction_returnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_DRAFT,
            TransactionAction.TRANSACTION_ACTION_BUILD
        ));
    }

    @Test
    void canPerformAction_draftStateCommitAction_returnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_DRAFT,
            TransactionAction.TRANSACTION_ACTION_COMMIT
        ));
    }

    @Test
    void canPerformAction_draftStateSignAction_returnsFalse() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_DRAFT,
            TransactionAction.TRANSACTION_ACTION_SIGN
        ));
    }

    // Test SIGNING_IN_PROGRESS state transitions
    @Test
    void canPerformAction_signingStateSignAction_returnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS,
            TransactionAction.TRANSACTION_ACTION_SIGN
        ));
    }

    @Test
    void canPerformAction_signingStateMarkPendingAction_returnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS,
            TransactionAction.TRANSACTION_ACTION_MARK_PENDING
        ));
    }

    @Test
    void canPerformAction_signingStateSubmitAction_returnsFalse() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS,
            TransactionAction.TRANSACTION_ACTION_SUBMIT
        ));
    }

    // Test PENDING state transitions
    @Test
    void canPerformAction_pendingStateSubmitAction_returnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_PENDING,
            TransactionAction.TRANSACTION_ACTION_SUBMIT
        ));
    }

    @Test
    void canPerformAction_pendingStateBuildAction_returnsFalse() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_PENDING,
            TransactionAction.TRANSACTION_ACTION_BUILD
        ));
    }

    // Test SUBMISSION_IN_PROGRESS state transitions
    @Test
    void canPerformAction_submissionInProgressStateSubmitAction_returnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_SUBMISSION_IN_PROGRESS,
            TransactionAction.TRANSACTION_ACTION_SUBMIT
        ));
    }

    // Test INDETERMINATE state transitions
    @Test
    void canPerformAction_indeterminateStateSubmitAction_returnsTrue() {
        assertTrue(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_INDETERMINATE,
            TransactionAction.TRANSACTION_ACTION_SUBMIT
        ));
    }

    // Test terminal states
    @Test
    void canPerformAction_failedState_noActionsAllowed() {
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
    void canPerformAction_successfulState_noActionsAllowed() {
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
    void canPerformAction_nullState_returnsFalse() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            null,
            TransactionAction.TRANSACTION_ACTION_BUILD
        ));
    }

    @Test
    void canPerformAction_nullAction_returnsFalse() {
        assertFalse(TransactionStateMachine.transactionStateCanPerformActionAtState(
            TransactionState.TRANSACTION_STATE_DRAFT,
            null
        ));
    }

    // Test transactionStateGetValidActions
    @Test
    void getValidActions_draftState_includesBuildAndCommit() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_DRAFT
        );

        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_BUILD));
        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_COMMIT));
        assertFalse(actions.contains(TransactionAction.TRANSACTION_ACTION_SUBMIT));
        assertEquals(2, actions.size());
    }

    @Test
    void getValidActions_signingState_includesSignAndMarkPending() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS
        );

        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_SIGN));
        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_MARK_PENDING));
        assertFalse(actions.contains(TransactionAction.TRANSACTION_ACTION_BUILD));
        assertEquals(2, actions.size());
    }

    @Test
    void getValidActions_pendingState_includesOnlySubmit() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_PENDING
        );

        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_SUBMIT));
        assertEquals(1, actions.size());
    }

    @Test
    void getValidActions_submissionInProgressState_includesOnlySubmit() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_SUBMISSION_IN_PROGRESS
        );

        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_SUBMIT));
        assertEquals(1, actions.size());
    }

    @Test
    void getValidActions_indeterminateState_includesOnlySubmit() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_INDETERMINATE
        );

        assertTrue(actions.contains(TransactionAction.TRANSACTION_ACTION_SUBMIT));
        assertEquals(1, actions.size());
    }

    @Test
    void getValidActions_failedState_returnsEmptySet() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_FAILED
        );

        assertTrue(actions.isEmpty());
    }

    @Test
    void getValidActions_successfulState_returnsEmptySet() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(
            TransactionState.TRANSACTION_STATE_SUCCESSFUL
        );

        assertTrue(actions.isEmpty());
    }

    @Test
    void getValidActions_nullState_returnsEmptySet() {
        Set<TransactionAction> actions = TransactionStateMachine.transactionStateGetValidActions(null);
        assertTrue(actions.isEmpty());
    }

    // Integration test - transaction lifecycle
    @Test
    void integration_transactionLifecycle_workCorrectly() {
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
