import { TransactionState } from "./transaction_pb";

// Get all transactionStates as enum values
export const allTransactionStates: TransactionState[] = Object.values(
  TransactionState,
).filter((value) => typeof value === "number") as TransactionState[];

// Define explicit mappings between TransactionState enums and custom string representations
const networkToStringMapping: {
  [key in TransactionState]: string;
} = {
  [TransactionState.UNDEFINED_TRANSACTION_STATE]: "-",
  [TransactionState.DRAFT_TRANSACTION_STATE]: "Draft",
  [TransactionState.SIGNING_IN_PROGRESS_TRANSACTION_STATE]:
    "Signing in Progress",
  [TransactionState.PENDING_TRANSACTION_STATE]: "Pending",
  [TransactionState.SUBMISSION_IN_PROGRESS_TRANSACTION_STATE]:
    "Submission in Progress",
  [TransactionState.FAILED_TRANSACTION_STATE]: "Failed",
  [TransactionState.INDETERMINATE_TRANSACTION_STATE]: "Indeterminate",
  [TransactionState.SUCCESSFUL_TRANSACTION_STATE]: "Successful",
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
