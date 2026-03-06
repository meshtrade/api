import { VerificationStatus } from "./verification_status_pb";

// Get all verification statuses as enum values
export const allVerificationStatuses: VerificationStatus[] = Object.values(
  VerificationStatus
).filter((value) => typeof value === "number") as VerificationStatus[];

// Define explicit mappings between VerificationStatus enums and custom string representations
const verificationStatusToStringMapping: {
  [key in VerificationStatus]: string;
} = {
  [VerificationStatus.UNSPECIFIED]: "Unspecified",
  [VerificationStatus.NOT_STARTED]: "Not Started",
  [VerificationStatus.PENDING]: "Pending",
  [VerificationStatus.VERIFIED]: "Verified",
  [VerificationStatus.FAILED]: "Failed",
};

// Reverse mapping from string to VerificationStatus enum
const stringToVerificationStatusMapping: Record<string, VerificationStatus> =
  {};
for (const [key, value] of Object.entries(verificationStatusToStringMapping)) {
  stringToVerificationStatusMapping[value] = Number(key);
}

class UnsupportedVerificationStatusError extends Error {
  verificationStatus: VerificationStatus;

  constructor(verificationStatus: VerificationStatus) {
    const message = `Unsupported VerificationStatus: ${verificationStatus}`;
    super(message);
    this.verificationStatus = verificationStatus;
  }
}

/**
 * Converts a VerificationStatus enum instance to a custom string representation.
 * @param {VerificationStatus} verificationStatus - The verification status to convert.
 * @returns {string} The custom string representation of the verification status.
 */
export function verificationStatusToString(
  verificationStatus: VerificationStatus
): string {
  if (verificationStatus in verificationStatusToStringMapping) {
    return verificationStatusToStringMapping[verificationStatus];
  } else {
    throw new UnsupportedVerificationStatusError(verificationStatus);
  }
}

class UnsupportedVerificationStatusStringError extends Error {
  verificationStatusStr: string;

  constructor(verificationStatusStr: string) {
    const message = `Unsupported verification status string: ${verificationStatusStr}`;
    super(message);
    this.verificationStatusStr = verificationStatusStr;
  }
}

/**
 * Converts a custom string representation to a VerificationStatus enum instance.
 * @param {string} verificationStatusStr - The custom string representation of the verification status.
 * @returns {VerificationStatus} The corresponding VerificationStatus enum instance.
 */
export function stringToVerificationStatus(
  verificationStatusStr: string
): VerificationStatus {
  if (verificationStatusStr in stringToVerificationStatusMapping) {
    return stringToVerificationStatusMapping[verificationStatusStr];
  } else {
    throw new UnsupportedVerificationStatusStringError(verificationStatusStr);
  }
}
