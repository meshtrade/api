import { LimitOrderState } from "./limit_order_pb";

// Get all limitOrderStates as enum values
export const allLimitOrderStates: LimitOrderState[] = Object.values(
  LimitOrderState
).filter((value) => typeof value === "number") as LimitOrderState[];

// Define explicit mappings between LimitOrderState enums and custom string representations
const stateToStringMapping: {
  [key in LimitOrderState]: string;
} = {
  [LimitOrderState.UNSPECIFIED]: "-",
  [LimitOrderState.SUBMISSION_IN_PROGRESS]: "Submission in Progress",
  [LimitOrderState.SUBMISSION_FAILED]: "Submission Failed",
  [LimitOrderState.OPEN]: "Open",
  [LimitOrderState.COMPLETE_IN_PROGRESS]: "Complete in Progress",
  [LimitOrderState.COMPLETE]: "Complete",
  [LimitOrderState.CANCELLATION_IN_PROGRESS]: "Cancellation in Progress",
  [LimitOrderState.CANCELLED]: "Cancelled",
};

// Reverse mapping from string to LimitOrderState enum
const stringToLimitOrderStateMapping: Record<string, LimitOrderState> = {};
for (const [key, value] of Object.entries(stateToStringMapping)) {
  stringToLimitOrderStateMapping[value] = Number(key);
}

class UnsupportedLimitOrderStateError extends Error {
  limitOrderState: LimitOrderState;

  constructor(limitOrderState: LimitOrderState) {
    const message = `Unsupported LimitOrderState: ${limitOrderState}`;
    super(message);
    this.limitOrderState = limitOrderState;
  }
}

/**
 * Converts a LimitOrderState enum instance to a custom string representation.
 * @param {LimitOrderState} limitOrderState - The limitOrderState to convert.
 * @returns {string} The custom string representation of the limitOrderState.
 */
export function limitOrderStateToString(
  limitOrderState: LimitOrderState
): string {
  if (limitOrderState in stateToStringMapping) {
    return stateToStringMapping[limitOrderState];
  } else {
    throw new UnsupportedLimitOrderStateError(limitOrderState);
  }
}

class UnsupportedLimitOrderStateStringError extends Error {
  limitOrderStateStr: string;

  constructor(limitOrderStateStr: string) {
    const message = `Unsupported limitOrderState string: ${limitOrderStateStr}`;
    super(message);
    this.limitOrderStateStr = limitOrderStateStr;
  }
}

/**
 * Converts a custom string representation to a LimitOrderState enum instance.
 * @param {string} limitOrderStateStr - The custom string representation of the limitOrderState.
 * @returns {LimitOrderState} The corresponding LimitOrderState enum instance.
 */
export function stringToLimitOrderState(
  limitOrderStateStr: string
): LimitOrderState {
  if (limitOrderStateStr in stringToLimitOrderStateMapping) {
    return stringToLimitOrderStateMapping[limitOrderStateStr];
  } else {
    throw new UnsupportedLimitOrderStateStringError(limitOrderStateStr);
  }
}
