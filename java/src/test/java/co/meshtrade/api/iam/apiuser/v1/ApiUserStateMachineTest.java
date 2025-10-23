package co.meshtrade.api.iam.apiuser.v1;

import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUserState;
import co.meshtrade.api.iam.api_user.v1.ApiUser.APIUserAction;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Comprehensive tests for ApiUserStateMachine utility methods.
 */
class ApiUserStateMachineTest {

    // Test apiUserStateIsValid
    @Test
    void apiUserStateIsValid_validStates_returnsTrue() {
        assertTrue(ApiUserStateMachine.apiUserStateIsValid(APIUserState.API_USER_STATE_INACTIVE));
        assertTrue(ApiUserStateMachine.apiUserStateIsValid(APIUserState.API_USER_STATE_ACTIVE));
        assertTrue(ApiUserStateMachine.apiUserStateIsValid(APIUserState.API_USER_STATE_UNSPECIFIED));
    }

    @Test
    void apiUserStateIsValid_nullState_returnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateIsValid(null));
    }

    @Test
    void apiUserStateIsValid_unrecognizedState_returnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateIsValid(APIUserState.UNRECOGNIZED));
    }

    // Test apiUserStateIsValidAndDefined
    @Test
    void apiUserStateIsValidAndDefined_definedStates_returnsTrue() {
        assertTrue(ApiUserStateMachine.apiUserStateIsValidAndDefined(APIUserState.API_USER_STATE_INACTIVE));
        assertTrue(ApiUserStateMachine.apiUserStateIsValidAndDefined(APIUserState.API_USER_STATE_ACTIVE));
    }

    @Test
    void apiUserStateIsValidAndDefined_unspecifiedState_returnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateIsValidAndDefined(APIUserState.API_USER_STATE_UNSPECIFIED));
    }

    @Test
    void apiUserStateIsValidAndDefined_nullState_returnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateIsValidAndDefined(null));
    }

    // Test apiUserStateCanPerformActionAtState
    @Test
    void canPerformAction_inactiveStateActivateAction_returnsTrue() {
        assertTrue(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_INACTIVE,
            APIUserAction.API_USER_ACTION_ACTIVATE
        ));
    }

    @Test
    void canPerformAction_activeStateDeactivateAction_returnsTrue() {
        assertTrue(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_ACTIVE,
            APIUserAction.API_USER_ACTION_DEACTIVATE
        ));
    }

    @Test
    void canPerformAction_updateActionAllStates_returnsTrue() {
        // UPDATE action should be allowed in all states
        assertTrue(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_INACTIVE,
            APIUserAction.API_USER_ACTION_UPDATE
        ));
        assertTrue(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_ACTIVE,
            APIUserAction.API_USER_ACTION_UPDATE
        ));
    }

    @Test
    void canPerformAction_inactiveStateDeactivateAction_returnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_INACTIVE,
            APIUserAction.API_USER_ACTION_DEACTIVATE
        ));
    }

    @Test
    void canPerformAction_activeStateActivateAction_returnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_ACTIVE,
            APIUserAction.API_USER_ACTION_ACTIVATE
        ));
    }

    @Test
    void canPerformAction_nullState_returnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            null,
            APIUserAction.API_USER_ACTION_ACTIVATE
        ));
    }

    @Test
    void canPerformAction_nullAction_returnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_INACTIVE,
            null
        ));
    }

    // Test apiUserStateGetValidActions
    @Test
    void getValidActions_inactiveState_includesActivateAndUpdate() {
        Set<APIUserAction> actions = ApiUserStateMachine.apiUserStateGetValidActions(
            APIUserState.API_USER_STATE_INACTIVE
        );

        assertTrue(actions.contains(APIUserAction.API_USER_ACTION_ACTIVATE));
        assertTrue(actions.contains(APIUserAction.API_USER_ACTION_UPDATE));
        assertFalse(actions.contains(APIUserAction.API_USER_ACTION_DEACTIVATE));
        assertEquals(2, actions.size());
    }

    @Test
    void getValidActions_activeState_includesDeactivateAndUpdate() {
        Set<APIUserAction> actions = ApiUserStateMachine.apiUserStateGetValidActions(
            APIUserState.API_USER_STATE_ACTIVE
        );

        assertTrue(actions.contains(APIUserAction.API_USER_ACTION_DEACTIVATE));
        assertTrue(actions.contains(APIUserAction.API_USER_ACTION_UPDATE));
        assertFalse(actions.contains(APIUserAction.API_USER_ACTION_ACTIVATE));
        assertEquals(2, actions.size());
    }

    @Test
    void getValidActions_nullState_returnsEmptySet() {
        Set<APIUserAction> actions = ApiUserStateMachine.apiUserStateGetValidActions(null);
        assertTrue(actions.isEmpty());
    }

    @Test
    void getValidActions_unspecifiedState_returnsEmptySet() {
        Set<APIUserAction> actions = ApiUserStateMachine.apiUserStateGetValidActions(
            APIUserState.API_USER_STATE_UNSPECIFIED
        );
        assertTrue(actions.isEmpty());
    }

    // Integration test - state transitions
    @Test
    void integration_stateTransitions_workCorrectly() {
        // Start in INACTIVE state
        APIUserState currentState = APIUserState.API_USER_STATE_INACTIVE;

        // Check we can activate
        assertTrue(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            currentState,
            APIUserAction.API_USER_ACTION_ACTIVATE
        ));

        // Move to ACTIVE state
        currentState = APIUserState.API_USER_STATE_ACTIVE;

        // Check we can deactivate
        assertTrue(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            currentState,
            APIUserAction.API_USER_ACTION_DEACTIVATE
        ));

        // Check we can't activate again
        assertFalse(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            currentState,
            APIUserAction.API_USER_ACTION_ACTIVATE
        ));
    }
}
