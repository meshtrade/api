package api_userv1

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAPIUserState_IsValid(t *testing.T) {
	tests := []struct {
		name  string
		state APIUserState
		want  bool
	}{
		{
			name:  "valid active state",
			state: APIUserState_API_USER_STATE_ACTIVE,
			want:  true,
		},
		{
			name:  "valid inactive state",
			state: APIUserState_API_USER_STATE_INACTIVE,
			want:  true,
		},
		{
			name:  "valid unspecified state",
			state: APIUserState_API_USER_STATE_UNSPECIFIED,
			want:  true,
		},
		{
			name:  "invalid state",
			state: APIUserState(999),
			want:  false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.state.IsValid()
			assert.Equal(t, tt.want, got)
		})
	}
}

func TestAPIUserState_IsValidAndDefined(t *testing.T) {
	tests := []struct {
		name  string
		state APIUserState
		want  bool
	}{
		{
			name:  "valid and defined active state",
			state: APIUserState_API_USER_STATE_ACTIVE,
			want:  true,
		},
		{
			name:  "valid and defined inactive state",
			state: APIUserState_API_USER_STATE_INACTIVE,
			want:  true,
		},
		{
			name:  "valid but unspecified state",
			state: APIUserState_API_USER_STATE_UNSPECIFIED,
			want:  false,
		},
		{
			name:  "invalid state",
			state: APIUserState(999),
			want:  false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.state.IsValidAndDefined()
			assert.Equal(t, tt.want, got)
		})
	}
}

func TestAPIUserState_CanPerformActionAtState(t *testing.T) {
	tests := []struct {
		name   string
		state  APIUserState
		action APIUserAction
		want   bool
	}{
		// Inactive state transitions
		{
			name:   "inactive state can activate",
			state:  APIUserState_API_USER_STATE_INACTIVE,
			action: APIUserAction_API_USER_ACTION_ACTIVATE,
			want:   true,
		},
		{
			name:   "inactive state cannot deactivate",
			state:  APIUserState_API_USER_STATE_INACTIVE,
			action: APIUserAction_API_USER_ACTION_DEACTIVATE,
			want:   false,
		},
		{
			name:   "inactive state can update",
			state:  APIUserState_API_USER_STATE_INACTIVE,
			action: APIUserAction_API_USER_ACTION_UPDATE,
			want:   true,
		},
		{
			name:   "inactive state cannot create",
			state:  APIUserState_API_USER_STATE_INACTIVE,
			action: APIUserAction_API_USER_ACTION_CREATE,
			want:   false,
		},

		// Active state transitions
		{
			name:   "active state cannot activate",
			state:  APIUserState_API_USER_STATE_ACTIVE,
			action: APIUserAction_API_USER_ACTION_ACTIVATE,
			want:   false,
		},
		{
			name:   "active state can deactivate",
			state:  APIUserState_API_USER_STATE_ACTIVE,
			action: APIUserAction_API_USER_ACTION_DEACTIVATE,
			want:   true,
		},
		{
			name:   "active state can update",
			state:  APIUserState_API_USER_STATE_ACTIVE,
			action: APIUserAction_API_USER_ACTION_UPDATE,
			want:   true,
		},
		{
			name:   "active state cannot create",
			state:  APIUserState_API_USER_STATE_ACTIVE,
			action: APIUserAction_API_USER_ACTION_CREATE,
			want:   false,
		},

		// Unspecified state (should reject all actions)
		{
			name:   "unspecified state cannot activate",
			state:  APIUserState_API_USER_STATE_UNSPECIFIED,
			action: APIUserAction_API_USER_ACTION_ACTIVATE,
			want:   false,
		},
		{
			name:   "unspecified state cannot deactivate",
			state:  APIUserState_API_USER_STATE_UNSPECIFIED,
			action: APIUserAction_API_USER_ACTION_DEACTIVATE,
			want:   false,
		},
		{
			name:   "unspecified state cannot update",
			state:  APIUserState_API_USER_STATE_UNSPECIFIED,
			action: APIUserAction_API_USER_ACTION_UPDATE,
			want:   false,
		},
		{
			name:   "unspecified state cannot create",
			state:  APIUserState_API_USER_STATE_UNSPECIFIED,
			action: APIUserAction_API_USER_ACTION_CREATE,
			want:   false,
		},

		// Unspecified action (should always return false)
		{
			name:   "inactive state with unspecified action",
			state:  APIUserState_API_USER_STATE_INACTIVE,
			action: APIUserAction_API_USER_ACTION_UNSPECIFIED,
			want:   false,
		},
		{
			name:   "active state with unspecified action",
			state:  APIUserState_API_USER_STATE_ACTIVE,
			action: APIUserAction_API_USER_ACTION_UNSPECIFIED,
			want:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := tt.state.CanPerformActionAtState(tt.action)
			assert.Equal(t, tt.want, got, "State %v should %s perform action %v", 
				tt.state, map[bool]string{true: "be able to", false: "NOT be able to"}[tt.want], tt.action)
		})
	}
}

// Test comprehensive state machine transitions
func TestAPIUserState_StateMachineComprehensive(t *testing.T) {
	// Test all possible state/action combinations
	states := []APIUserState{
		APIUserState_API_USER_STATE_UNSPECIFIED,
		APIUserState_API_USER_STATE_ACTIVE,
		APIUserState_API_USER_STATE_INACTIVE,
	}
	
	actions := []APIUserAction{
		APIUserAction_API_USER_ACTION_UNSPECIFIED,
		APIUserAction_API_USER_ACTION_ACTIVATE,
		APIUserAction_API_USER_ACTION_DEACTIVATE,
		APIUserAction_API_USER_ACTION_CREATE,
		APIUserAction_API_USER_ACTION_UPDATE,
	}

	// Expected valid transitions map
	validTransitions := map[APIUserState]map[APIUserAction]bool{
		APIUserState_API_USER_STATE_INACTIVE: {
			APIUserAction_API_USER_ACTION_ACTIVATE: true,
			APIUserAction_API_USER_ACTION_UPDATE:   true,
		},
		APIUserState_API_USER_STATE_ACTIVE: {
			APIUserAction_API_USER_ACTION_DEACTIVATE: true,
			APIUserAction_API_USER_ACTION_UPDATE:     true,
		},
	}

	for _, state := range states {
		for _, action := range actions {
			t.Run(state.String()+"_"+action.String(), func(t *testing.T) {
				got := state.CanPerformActionAtState(action)
				
				var expected bool
				if stateTransitions, exists := validTransitions[state]; exists {
					expected = stateTransitions[action]
				}
				
				assert.Equal(t, expected, got, 
					"State %v + Action %v should return %v", state, action, expected)
			})
		}
	}
}