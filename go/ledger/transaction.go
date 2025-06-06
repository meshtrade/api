package ledger

func (s TransactionState) CanPerformActionAtState(action TransactionAction) bool {
	switch s {
	case TransactionState_DRAFT_TRANSACTION_STATE:
		switch action {
		case TransactionAction_BUILD_TRANSACTION_ACTION,
			TransactionAction_COMMIT_TRANSACTION_ACTION:
			return true
		default:
			return false
		}

	case TransactionState_SIGNING_IN_PROGRESS_TRANSACTION_STATE:
		switch action {
		case TransactionAction_SIGN_TRANSACTION_ACTION,
			TransactionAction_MARK_PENDING_TRANSACTION_ACTION:
			return true
		default:
			return false
		}

	case TransactionState_PENDING_TRANSACTION_STATE:
		switch action {
		case TransactionAction_SUBMIT_TRANSACTION_ACTION:
			return true
		default:
			return false
		}

	case TransactionState_SUBMISSION_IN_PROGRESS_TRANSACTION_STATE:
		switch action {
		case TransactionAction_SUBMIT_TRANSACTION_ACTION:
			return true
		default:
			return false
		}

	case TransactionState_INDETERMINATE_TRANSACTION_STATE:
		switch action {
		case TransactionAction_SUBMIT_TRANSACTION_ACTION:
			return true
		default:
			return false
		}

	case TransactionState_FAILED_TRANSACTION_STATE:
		return false

	case TransactionState_SUCCESSFUL_TRANSACTION_STATE:
		return false

	default:
		return false
	}
}
