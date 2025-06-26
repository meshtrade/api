package funding

func CanPerformActionAtState(state FundingState, action FundingAction) bool {

	switch state {

	case FundingState_AWAITING_APPROVAL_FUNDING_ORDER_STATE,
		FundingState_UNDER_INVESTIGATION_FUNDING_ORDER_STATE,
		FundingState_CANCELLED_FUNDING_ORDER_STATE,
		FundingState_FAILED_FUNDING_ORDER_STATE,
		FundingState_SETTLED_FUNDING_ORDER_STATE,
		FundingState_SETTLEMENT_IN_PROGRESS_FUNDING_ORDER_STATE:
		switch action {
		case FundingAction_DO_NOTHING_FUNDING_ACTION:
			return true
		default:
			return false
		}

	case FundingState_PENDING_CONFIRMATION_FUNDING_ORDER_STATE:
		switch action {
		case FundingAction_MARK_AWAITING_CONFIRMATION_ACTION:
			return true
		default:
			return false
		}

	default:
		return false
	}
}
