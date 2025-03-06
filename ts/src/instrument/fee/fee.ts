import { State as FeeState } from "./fee_pb";

// Get all fee state as enum values
export const allFeeStates: FeeState[] = Object.values(FeeState).filter(
  (value) => typeof value === "number",
) as FeeState[];

// Define explicit mappings between FeeState enums and custom string representations
const feeStateToStringMapping: {
  [key in FeeState]: string;
} = {
  [FeeState.UNDEFINED_STATE]: "-",
  [FeeState.UPCOMING_STATE]: "Upcoming",
  [FeeState.DUE_STATE]: "Due",
  [FeeState.PAYMENT_IN_PROGRESS_STATE]: "Payment in Progress",
  [FeeState.PAID_STATE]: "Paid",
  [FeeState.CANCELLED_STATE]: "Cancelled",
  [FeeState.FAILED_STATE]: "Failed",
};

// Reverse mapping from string to FeeState enum
const stringToFeeStateMapping: Record<string, FeeState> = {};
for (const [key, value] of Object.entries(feeStateToStringMapping)) {
  stringToFeeStateMapping[value] = Number(key);
}

class UnsupportedFeeStateError extends Error {
  feeState: FeeState;

  constructor(feeState: FeeState) {
    const message = `Unsupported FeeState: ${feeState}`;
    super(message);
    this.feeState = feeState;
  }
}

/**
 * Converts a FeeState enum instance to a custom string representation.
 * @param {FeeState} feeState - The fee state to convert.
 * @returns {string} The custom string representation of the fee state.
 */
export function feeStateToString(feeState: FeeState): string {
  if (feeState in feeStateToStringMapping) {
    return feeStateToStringMapping[feeState];
  } else {
    throw new UnsupportedFeeStateError(feeState);
  }
}

class UnsupportedFeeStateStringError extends Error {
  feeStateStr: string;

  constructor(feeStateStr: string) {
    const message = `Unsupported fee state string: ${feeStateStr}`;
    super(message);
    this.feeStateStr = feeStateStr;
  }
}

/**
 * Converts a custom string representation to a FeeState enum instance.
 * @param {string} feeStateStr - The custom string representation of the fee state.
 * @returns {FeeState} The corresponding FeeState enum instance.
 */
export function stringToFeeState(feeStateStr: string): FeeState {
  if (feeStateStr in stringToFeeStateMapping) {
    return stringToFeeStateMapping[feeStateStr];
  } else {
    throw new UnsupportedFeeStateStringError(feeStateStr);
  }
}
