import { TransactionState } from "./transaction_state_pb";

// Get all transactionStates as enum values
export const allTransactionStates: TransactionState[] = Object.values(
  TransactionState,
).filter((value) => typeof value === "number") as TransactionState[];

// Define explicit mappings between TransactionState enums and custom string representations
const networkToStringMapping: {
  [key in TransactionState]: string;
} = {
  [TransactionState.TRANSACTION_STATE_UNSPECIFIED]: "-",
  [TransactionState.TRANSACTION_STATE_DRAFT]: "Draft",
  [TransactionState.TRANSACTION_STATE_SIGNING_IN_PROGRESS]:"Signing in Progress",
  [TransactionState.TRANSACTION_STATE_PENDING]: "Pending",
  [TransactionState.TRANSACTION_STATE_SUBMISSION_IN_PROGRESS]:"Submission in Progress",
  [TransactionState.TRANSACTION_STATE_FAILED]: "Failed",
  [TransactionState.TRANSACTION_STATE_INDETERMINATE]: "Indeterminate",
  [TransactionState.TRANSACTION_STATE_SUCCESSFUL]: "Successful",
};

// Reverse mapping from string to TransactionState enum
const stringToTransactionStateMapping: Record<string, TransactionState> = {};
for (const [key, value] of Object.entries(networkToStringMapping)) {
  stringToTransactionStateMapping[value] = Number(key);
}

class UnsupportedTransactionStateError extends Error {
  transactionState: TransactionState;

  constructor(transactionState: TransactionState) {
    const message = `Unsupported TransactionState: ${transactionState}`;
    super(message);
    this.transactionState = transactionState;
  }
}

/**
 * Converts a TransactionState enum instance to a custom string representation.
 * @param {TransactionState} transactionState - The transactionState to convert.
 * @returns {string} The custom string representation of the transactionState.
 */
export function transactionStateToString(
  transactionState: TransactionState,
): string {
  if (transactionState in networkToStringMapping) {
    return networkToStringMapping[transactionState];
  } else {
    throw new UnsupportedTransactionStateError(transactionState);
  }
}

class UnsupportedTransactionStateStringError extends Error {
  transactionStateStr: string;

  constructor(transactionStateStr: string) {
    const message = `Unsupported transactionState string: ${transactionStateStr}`;
    super(message);
    this.transactionStateStr = transactionStateStr;
  }
}

/**
 * Converts a custom string representation to a TransactionState enum instance.
 * @param {string} transactionStateStr - The custom string representation of the transactionState.
 * @returns {TransactionState} The corresponding TransactionState enum instance.
 */
export function stringToTransactionState(
  transactionStateStr: string,
): TransactionState {
  if (transactionStateStr in stringToTransactionStateMapping) {
    return stringToTransactionStateMapping[transactionStateStr];
  } else {
    throw new UnsupportedTransactionStateStringError(transactionStateStr);
  }
}
