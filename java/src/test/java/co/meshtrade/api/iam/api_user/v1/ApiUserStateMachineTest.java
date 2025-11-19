package co.meshtrade.api.iam.api_user.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.Test;

import co.meshtrade.api.iam.api_user.v1.ApiUserStateMachine;
import co.meshtrade.api.iam.api_user.v1.ApiUserOuterClass.APIUserAction;
import co.meshtrade.api.iam.api_user.v1.ApiUserOuterClass.APIUserState;

/**
 * Comprehensive tests for ApiUserStateMachine utility methods.
 */
class ApiUserStateMachineTest {

    // Test apiUserStateIsValid
    @Test
    void apiUserStateIsValidValidStatesReturnsTrue() {
        assertTrue(ApiUserStateMachine.apiUserStateIsValid(APIUserState.API_USER_STATE_INACTIVE));
        assertTrue(ApiUserStateMachine.apiUserStateIsValid(APIUserState.API_USER_STATE_ACTIVE));
        assertTrue(ApiUserStateMachine.apiUserStateIsValid(APIUserState.API_USER_STATE_UNSPECIFIED));
    }

    @Test
    void apiUserStateIsValidNullStateReturnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateIsValid(null));
    }

    @Test
    void apiUserStateIsValidUnrecognizedStateReturnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateIsValid(APIUserState.UNRECOGNIZED));
    }

    // Test apiUserStateIsValidAndDefined
    @Test
    void apiUserStateIsValidAndDefinedDefinedStatesReturnsTrue() {
        assertTrue(ApiUserStateMachine.apiUserStateIsValidAndDefined(APIUserState.API_USER_STATE_INACTIVE));
        assertTrue(ApiUserStateMachine.apiUserStateIsValidAndDefined(APIUserState.API_USER_STATE_ACTIVE));
    }

    @Test
    void apiUserStateIsValidAndDefinedUnspecifiedStateReturnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateIsValidAndDefined(APIUserState.API_USER_STATE_UNSPECIFIED));
    }

    @Test
    void apiUserStateIsValidAndDefinedNullStateReturnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateIsValidAndDefined(null));
    }

    // Test apiUserStateCanPerformActionAtState
    @Test
    void canPerformActionInactiveStateActivateActionReturnsTrue() {
        assertTrue(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_INACTIVE,
            APIUserAction.API_USER_ACTION_ACTIVATE
        ));
    }

    @Test
    void canPerformActionActiveStateDeactivateActionReturnsTrue() {
        assertTrue(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_ACTIVE,
            APIUserAction.API_USER_ACTION_DEACTIVATE
        ));
    }

    @Test
    void canPerformActionUpdateActionAllStatesReturnsTrue() {
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
    void canPerformActionInactiveStateDeactivateActionReturnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_INACTIVE,
            APIUserAction.API_USER_ACTION_DEACTIVATE
        ));
    }

    @Test
    void canPerformActionActiveStateActivateActionReturnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_ACTIVE,
            APIUserAction.API_USER_ACTION_ACTIVATE
        ));
    }

    @Test
    void canPerformActionNullStateReturnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            null,
            APIUserAction.API_USER_ACTION_ACTIVATE
        ));
    }

    @Test
    void canPerformActionNullActionReturnsFalse() {
        assertFalse(ApiUserStateMachine.apiUserStateCanPerformActionAtState(
            APIUserState.API_USER_STATE_INACTIVE,
            null
        ));
    }

    // Test apiUserStateGetValidActions
    @Test
    void getValidActionsInactiveStateIncludesActivateAndUpdate() {
        Set<APIUserAction> actions = ApiUserStateMachine.apiUserStateGetValidActions(
            APIUserState.API_USER_STATE_INACTIVE
        );

        assertTrue(actions.contains(APIUserAction.API_USER_ACTION_ACTIVATE));
        assertTrue(actions.contains(APIUserAction.API_USER_ACTION_UPDATE));
        assertFalse(actions.contains(APIUserAction.API_USER_ACTION_DEACTIVATE));
        assertEquals(2, actions.size());
    }

    @Test
    void getValidActionsActiveStateIncludesDeactivateAndUpdate() {
        Set<APIUserAction> actions = ApiUserStateMachine.apiUserStateGetValidActions(
            APIUserState.API_USER_STATE_ACTIVE
        );

        assertTrue(actions.contains(APIUserAction.API_USER_ACTION_DEACTIVATE));
        assertTrue(actions.contains(APIUserAction.API_USER_ACTION_UPDATE));
        assertFalse(actions.contains(APIUserAction.API_USER_ACTION_ACTIVATE));
        assertEquals(2, actions.size());
    }

    @Test
    void getValidActionsNullStateReturnsEmptySet() {
        Set<APIUserAction> actions = ApiUserStateMachine.apiUserStateGetValidActions(null);
        assertTrue(actions.isEmpty());
    }

    @Test
    void getValidActionsUnspecifiedStateReturnsEmptySet() {
        Set<APIUserAction> actions = ApiUserStateMachine.apiUserStateGetValidActions(
            APIUserState.API_USER_STATE_UNSPECIFIED
        );
        assertTrue(actions.isEmpty());
    }

    // Integration test - state transitions
    @Test
    void integrationStateTransitionsWorkCorrectly() {
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
