import {
  State as FeeState,
  Category as FeeCategory,
} from "./fee_pb";

// ---- FEE STATE ----
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

// ---- FEE CATEGORY ----
// Get all fee category as enum values
export const allFeeCategories: FeeCategory[] = Object.values(FeeCategory).filter(
  (value) => typeof value === "number",
) as FeeCategory[];

// Define explicit mappings between FeeCategory enums and custom string representations
const feeCategoryToStringMapping: {
  [key in FeeCategory]: string;
} = {
  [FeeCategory.UNDEFINED_CATEGORY]: "-",
  [FeeCategory.LISTING_CATEGORY]: "Listing",
  [FeeCategory.PRIMARY_MARKET_SETTLEMENT_CATEGORY]: "Primary Market Settlement",
  [FeeCategory.TOKENISATION_CATEGORY]: "Tokenisation",
  [FeeCategory.AUM_CATEGORY]: "AUM",
};

// Reverse mapping from string to FeeCategory enum
const stringToFeeCategoryMapping: Record<string, FeeCategory> = {};
for (const [key, value] of Object.entries(feeCategoryToStringMapping)) {
  stringToFeeCategoryMapping[value] = Number(key);
}

class UnsupportedFeeCategoryError extends Error {
  feeCategory: FeeCategory;

  constructor(feeCategory: FeeCategory) {
    const message = `Unsupported FeeCategory: ${feeCategory}`;
    super(message);
    this.feeCategory = feeCategory;
  }
}

/**
 * Converts a FeeCategory enum instance to a custom string representation.
 * @param {FeeCategory} feeCategory - The fee category to convert.
 * @returns {string} The custom string representation of the fee category.
 */
export function feeCategoryToString(feeCategory: FeeCategory): string {
  if (feeCategory in feeCategoryToStringMapping) {
    return feeCategoryToStringMapping[feeCategory];
  } else {
    throw new UnsupportedFeeCategoryError(feeCategory);
  }
}

class UnsupportedFeeCategoryStringError extends Error {
  feeCategoryStr: string;

  constructor(feeCategoryStr: string) {
    const message = `Unsupported fee category string: ${feeCategoryStr}`;
    super(message);
    this.feeCategoryStr = feeCategoryStr;
  }
}

/**
 * Converts a custom string representation to a FeeCategory enum instance.
 * @param {string} feeCategoryStr - The custom string representation of the fee category.
 * @returns {FeeCategory} The corresponding FeeCategory enum instance.
 */
export function stringToFeeCategory(feeCategoryStr: string): FeeCategory {
  if (feeCategoryStr in stringToFeeCategoryMapping) {
    return stringToFeeCategoryMapping[feeCategoryStr];
  } else {
    throw new UnsupportedFeeCategoryStringError(feeCategoryStr);
  }
}
