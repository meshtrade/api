package api_userv1

// IsValid checks if the APIUserState is a valid enum value.
func (s APIUserState) IsValid() bool {
	_, ok := APIUserState_name[int32(s)]
	return ok
}

// IsValidAndDefined checks if the APIUserState is valid and not unspecified.
func (s APIUserState) IsValidAndDefined() bool {
	return s.IsValid() && s != APIUserState_API_USER_STATE_UNSPECIFIED
}

// CanPerformActionAtState checks if the given action can be performed at the current state.
func (s APIUserState) CanPerformActionAtState(action APIUserAction) bool {
	// Define actions that are allowed regardless of state (update operations)
	generalUpdateActions := map[APIUserAction]bool{
		APIUserAction_API_USER_ACTION_UPDATE: true,
	}

	switch s {
	case APIUserState_API_USER_STATE_INACTIVE:
		switch action {
		case APIUserAction_API_USER_ACTION_ACTIVATE:
			return true
		default:
			return generalUpdateActions[action]
		}

	case APIUserState_API_USER_STATE_ACTIVE:
		switch action {
		case APIUserAction_API_USER_ACTION_DEACTIVATE:
			return true
		default:
			return generalUpdateActions[action]
		}

	default:
		return false
	}
}