package transactionv1

func (s TransactionState) CanPerformActionAtState(action TransactionAction) bool {
	switch s {
	case TransactionState_TRANSACTION_STATE_DRAFT:
		switch action {
		case TransactionAction_TRANSACTION_ACTION_BUILD,
			TransactionAction_TRANSACTION_ACTION_COMMIT:
			return true
		default:
			return false
		}

	case TransactionState_TRANSACTION_STATE_SIGNING_IN_PROGRESS:
		switch action {
		case TransactionAction_TRANSACTION_ACTION_SIGN,
			TransactionAction_TRANSACTION_ACTION_MARK_PENDING:
			return true
		default:
			return false
		}

	case TransactionState_TRANSACTION_STATE_PENDING:
		switch action {
		case TransactionAction_TRANSACTION_ACTION_SUBMIT:
			return true
		default:
			return false
		}

	case TransactionState_TRANSACTION_STATE_SUBMISSION_IN_PROGRESS:
		switch action {
		case TransactionAction_TRANSACTION_ACTION_SUBMIT:
			return true
		default:
			return false
		}

	case TransactionState_TRANSACTION_STATE_INDETERMINATE:
		switch action {
		case TransactionAction_TRANSACTION_ACTION_SUBMIT:
			return true
		default:
			return false
		}

	case TransactionState_TRANSACTION_STATE_FAILED:
		return false

	case TransactionState_TRANSACTION_STATE_SUCCESSFUL:
		return false

	default:
		return false
	}
}
