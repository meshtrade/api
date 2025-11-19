package co.meshtrade.api.iam.api_user.v1;

import java.util.EnumSet;
import java.util.Set;

import co.meshtrade.api.iam.api_user.v1.ApiUserOuterClass.APIUserAction;
import co.meshtrade.api.iam.api_user.v1.ApiUserOuterClass.APIUserState;

/**
 * State machine utilities for API User lifecycle management.
 *
 * <p>This class provides state validation and action permission checking for
 * API users.
 *
 * <p><b>Thread-safety:</b> All methods are thread-safe as they are stateless utility functions.
 *
 */
public final class ApiUserStateMachine {

    private ApiUserStateMachine() {
        throw new UnsupportedOperationException("Utility class - cannot be instantiated");
    }

    /**
     * Checks if the APIUserState is a valid enum value.
     *
     * <p>A valid state is one that corresponds to a defined enum value in the protobuf definition.
     *
         *
     * @param state The state to check
     * @return true if state is a recognized enum value, false otherwise
     */
    public static boolean apiUserStateIsValid(APIUserState state) {
        return state != null && state != APIUserState.UNRECOGNIZED;
    }

    /**
     * Checks if the APIUserState is valid and not API_USER_STATE_UNSPECIFIED.
     *
         *
     * @param state The state to check
     * @return true if valid and defined (not UNSPECIFIED), false otherwise
     */
    public static boolean apiUserStateIsValidAndDefined(APIUserState state) {
        return apiUserStateIsValid(state) && state != APIUserState.API_USER_STATE_UNSPECIFIED;
    }

    /**
     * Checks if the given action can be performed at the current state.
     *
     * <p>This method implements the API user state machine transition rules:
     * <ul>
     *   <li>INACTIVE state: Allows ACTIVATE action</li>
     *   <li>ACTIVE state: Allows DEACTIVATE action</li>
     *   <li>All states: Allow UPDATE action (general update operations)</li>
     * </ul>
     *
         *
     * @param state The current state
     * @param action The action to perform
     * @return true if the action is allowed at this state, false otherwise
     */
    public static boolean apiUserStateCanPerformActionAtState(APIUserState state, APIUserAction action) {
        if (state == null || action == null) {
            return false;
        }

        // General update actions allowed regardless of state
        if (action == APIUserAction.API_USER_ACTION_UPDATE) {
            return true;
        }

        return switch (state) {
            case API_USER_STATE_INACTIVE -> action == APIUserAction.API_USER_ACTION_ACTIVATE;
            case API_USER_STATE_ACTIVE -> action == APIUserAction.API_USER_ACTION_DEACTIVATE;
            default -> false;
        };
    }

    /**
     * Returns the set of valid actions that can be performed at the given state.
     *
     * <p>This method provides a complete list of actions allowed at a specific state,
     * useful for UI generation or API validation.
     *
     * <p><b>Special Cases:</b>
     * <ul>
     *   <li>UNSPECIFIED state returns empty set (no actions allowed)</li>
     *   <li>UNRECOGNIZED state returns empty set (invalid state)</li>
     *   <li>Null state returns empty set</li>
     * </ul>
     *
     * @param state The current state (may be null or UNSPECIFIED)
     * @return Set of valid actions, or empty set if state is invalid, null, or UNSPECIFIED
     */
    public static Set<APIUserAction> apiUserStateGetValidActions(APIUserState state) {
        if (state == null || !apiUserStateIsValidAndDefined(state)) {
            return EnumSet.noneOf(APIUserAction.class);
        }

        Set<APIUserAction> actions = EnumSet.of(APIUserAction.API_USER_ACTION_UPDATE);

        switch (state) {
            case API_USER_STATE_INACTIVE:
                actions.add(APIUserAction.API_USER_ACTION_ACTIVATE);
                break;
            case API_USER_STATE_ACTIVE:
                actions.add(APIUserAction.API_USER_ACTION_DEACTIVATE);
                break;
            default:
                // Only UPDATE is available for other states
                break;
        }

        return actions;
    }
}
