package co.meshtrade.api.ledger.transaction.v1;

import java.util.EnumSet;
import java.util.Set;

import co.meshtrade.api.ledger.transaction.v1.TransactionActionOuterClass.TransactionAction;
import co.meshtrade.api.ledger.transaction.v1.TransactionStateOuterClass.TransactionState;

/**
 * State machine utilities for Transaction lifecycle management.
 *
 * <p>This class provides state validation and action permission checking for
 * transactions.
 *
 * <p><b>Thread-safety:</b> All methods are thread-safe as they are stateless utility functions.
 *
 */
public final class TransactionStateMachine {

    private TransactionStateMachine() {
        throw new UnsupportedOperationException("Utility class - cannot be instantiated");
    }

    /**
     * Checks if the given action can be performed at the current transaction state.
     *
     * <p>This method implements the transaction state machine transition rules:
     * <ul>
     *   <li>DRAFT: Allows BUILD and COMMIT actions</li>
     *   <li>SIGNING_IN_PROGRESS: Allows SIGN and MARK_PENDING actions</li>
     *   <li>PENDING: Allows SUBMIT action</li>
     *   <li>SUBMISSION_IN_PROGRESS: Allows SUBMIT action</li>
     *   <li>INDETERMINATE: Allows SUBMIT action</li>
     *   <li>FAILED: No actions allowed (terminal state)</li>
     *   <li>SUCCESSFUL: No actions allowed (terminal state)</li>
     * </ul>
     *
         *
     * @param state The current transaction state
     * @param action The action to perform
     * @return true if the action is allowed at this state, false otherwise
     */
    public static boolean transactionStateCanPerformActionAtState(TransactionState state, TransactionAction action) {
        if (state == null || action == null) {
            return false;
        }

        return switch (state) {
            case TRANSACTION_STATE_DRAFT ->
                action == TransactionAction.TRANSACTION_ACTION_BUILD ||
                action == TransactionAction.TRANSACTION_ACTION_COMMIT;

            case TRANSACTION_STATE_SIGNING_IN_PROGRESS ->
                action == TransactionAction.TRANSACTION_ACTION_SIGN ||
                action == TransactionAction.TRANSACTION_ACTION_MARK_PENDING;

            case TRANSACTION_STATE_PENDING,
                 TRANSACTION_STATE_SUBMISSION_IN_PROGRESS,
                 TRANSACTION_STATE_INDETERMINATE ->
                action == TransactionAction.TRANSACTION_ACTION_SUBMIT;

            case TRANSACTION_STATE_FAILED, TRANSACTION_STATE_SUCCESSFUL -> false;

            default -> false;
        };
    }

    /**
     * Returns the set of valid actions that can be performed at the given transaction state.
     *
     * <p>This method provides a complete list of actions allowed at a specific state,
     * useful for UI generation or API validation.
     *
     * @param state The current transaction state
     * @return Set of valid actions, or empty set if state is invalid or terminal
     */
    public static Set<TransactionAction> transactionStateGetValidActions(TransactionState state) {
        if (state == null) {
            return EnumSet.noneOf(TransactionAction.class);
        }

        return switch (state) {
            case TRANSACTION_STATE_DRAFT ->
                EnumSet.of(
                    TransactionAction.TRANSACTION_ACTION_BUILD,
                    TransactionAction.TRANSACTION_ACTION_COMMIT
                );

            case TRANSACTION_STATE_SIGNING_IN_PROGRESS ->
                EnumSet.of(
                    TransactionAction.TRANSACTION_ACTION_SIGN,
                    TransactionAction.TRANSACTION_ACTION_MARK_PENDING
                );

            case TRANSACTION_STATE_PENDING,
                 TRANSACTION_STATE_SUBMISSION_IN_PROGRESS,
                 TRANSACTION_STATE_INDETERMINATE ->
                EnumSet.of(TransactionAction.TRANSACTION_ACTION_SUBMIT);

            case TRANSACTION_STATE_FAILED, TRANSACTION_STATE_SUCCESSFUL ->
                EnumSet.noneOf(TransactionAction.class);

            default -> EnumSet.noneOf(TransactionAction.class);
        };
    }
}
