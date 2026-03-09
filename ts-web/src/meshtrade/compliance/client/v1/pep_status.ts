import { PepStatus } from "./pep_status_pb";

// Get all PEP statuses as enum values
export const allPepStatuses: PepStatus[] = Object.values(PepStatus).filter(
  (value) => typeof value === "number"
) as PepStatus[];

// Define explicit mappings between PepStatus enums and custom string representations
const pepStatusToStringMapping: { [key in PepStatus]: string } = {
  [PepStatus.UNSPECIFIED]: "Unspecified",
  [PepStatus.IS_NOT_PEP]: "Is Not PEP",
  [PepStatus.IS_PEP]: "Is PEP",
  [PepStatus.IS_ASSOCIATE]: "Is Associate",
};

// Reverse mapping from string to PepStatus enum
const stringToPepStatusMapping: Record<string, PepStatus> = {};
for (const [key, value] of Object.entries(pepStatusToStringMapping)) {
  stringToPepStatusMapping[value] = Number(key);
}

class UnsupportedPepStatusError extends Error {
  pepStatus: PepStatus;

  constructor(pepStatus: PepStatus) {
    const message = `Unsupported PepStatus: ${pepStatus}`;
    super(message);
    this.pepStatus = pepStatus;
  }
}

/**
 * Converts a PepStatus enum instance to a custom string representation.
 * @param {PepStatus} pepStatus - The PEP status to convert.
 * @returns {string} The custom string representation of the PEP status.
 */
export function pepStatusToString(pepStatus: PepStatus): string {
  if (pepStatus in pepStatusToStringMapping) {
    return pepStatusToStringMapping[pepStatus];
  } else {
    throw new UnsupportedPepStatusError(pepStatus);
  }
}

class UnsupportedPepStatusStringError extends Error {
  pepStatusStr: string;

  constructor(pepStatusStr: string) {
    const message = `Unsupported PEP status string: ${pepStatusStr}`;
    super(message);
    this.pepStatusStr = pepStatusStr;
  }
}

/**
 * Converts a custom string representation to a PepStatus enum instance.
 * @param {string} pepStatusStr - The custom string representation of the PEP status.
 * @returns {PepStatus} The corresponding PepStatus enum instance.
 */
export function stringToPepStatus(pepStatusStr: string): PepStatus {
  if (pepStatusStr in stringToPepStatusMapping) {
    return stringToPepStatusMapping[pepStatusStr];
  } else {
    throw new UnsupportedPepStatusStringError(pepStatusStr);
  }
}
