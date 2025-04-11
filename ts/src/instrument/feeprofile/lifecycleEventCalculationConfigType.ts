import { LifecycleEventCalculationConfigType } from "./lifecycleEventCalculationConfigType_pb";

// Get all calculation configuration types as enum values
export const allLifecycleEventCalculationConfigTypes: LifecycleEventCalculationConfigType[] =
  Object.values(LifecycleEventCalculationConfigType).filter(
    (value) => typeof value === "number",
  ) as LifecycleEventCalculationConfigType[];

// Define explicit mappings between LifecycleEventCalculationConfigType enums and custom string representations
const lifecycleEventCalculationConfigTypeToStringMapping: {
  [key in LifecycleEventCalculationConfigType]: string;
} = {
  [LifecycleEventCalculationConfigType.UNDEFINED_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE]:
    "-",
  [LifecycleEventCalculationConfigType.AMOUNT_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE]:
    "Amount",
  [LifecycleEventCalculationConfigType.RATE_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE]:
    "Rate",
};

// Reverse mapping from string to LifecycleEventCalculationConfigType enum
const stringToLifecycleEventCalculationConfigTypeMapping: Record<
  string,
  LifecycleEventCalculationConfigType
> = {};
for (const [key, value] of Object.entries(
  lifecycleEventCalculationConfigTypeToStringMapping,
)) {
  stringToLifecycleEventCalculationConfigTypeMapping[value] = Number(key);
}

class UnsupportedLifecycleEventCalculationConfigTypeError extends Error {
  lifecycleEventCalculationConfigType: LifecycleEventCalculationConfigType;

  constructor(
    lifecycleEventCalculationConfigType: LifecycleEventCalculationConfigType,
  ) {
    const message = `Unsupported LifecycleEventCalculationConfigType: ${lifecycleEventCalculationConfigType}`;
    super(message);
    this.lifecycleEventCalculationConfigType =
      lifecycleEventCalculationConfigType;
  }
}

/**
 * Converts a LifecycleEventCalculationConfigType enum instance to a custom string representation.
 * @param {LifecycleEventCalculationConfigType} lifecycleEventCalculationConfigType - The calculation configuration type to convert.
 * @returns {string} The custom string representation of the calculation configuration type.
 */
export function lifecycleEventCalculationConfigTypeToString(
  lifecycleEventCalculationConfigType: LifecycleEventCalculationConfigType,
): string {
  if (
    lifecycleEventCalculationConfigType in
    lifecycleEventCalculationConfigTypeToStringMapping
  ) {
    return lifecycleEventCalculationConfigTypeToStringMapping[
      lifecycleEventCalculationConfigType
    ];
  } else {
    throw new UnsupportedLifecycleEventCalculationConfigTypeError(
      lifecycleEventCalculationConfigType,
    );
  }
}

class UnsupportedLifecycleEventCalculationConfigTypeStringError extends Error {
  lifecycleEventCalculationConfigTypeStr: string;

  constructor(lifecycleEventCalculationConfigTypeStr: string) {
    const message = `Unsupported calculation configuration type string: ${lifecycleEventCalculationConfigTypeStr}`;
    super(message);
    this.lifecycleEventCalculationConfigTypeStr =
      lifecycleEventCalculationConfigTypeStr;
  }
}

/**
 * Converts a custom string representation to a LifecycleEventCalculationConfigType enum instance.
 * @param {string} lifecycleEventCalculationConfigTypeStr - The custom string representation of the calculation configuration type.
 * @returns {LifecycleEventCalculationConfigType} The corresponding LifecycleEventCalculationConfigType enum instance.
 */
export function stringToLifecycleEventCalculationConfigType(
  lifecycleEventCalculationConfigTypeStr: string,
): LifecycleEventCalculationConfigType {
  if (
    lifecycleEventCalculationConfigTypeStr in
    stringToLifecycleEventCalculationConfigTypeMapping
  ) {
    return stringToLifecycleEventCalculationConfigTypeMapping[
      lifecycleEventCalculationConfigTypeStr
    ];
  } else {
    throw new UnsupportedLifecycleEventCalculationConfigTypeStringError(
      lifecycleEventCalculationConfigTypeStr,
    );
  }
}
