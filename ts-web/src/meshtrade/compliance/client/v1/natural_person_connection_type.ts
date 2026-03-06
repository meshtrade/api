import { NaturalPersonConnectionType } from "./natural_person_connection_type_pb";

// Get all natural person connection types as enum values
export const allNaturalPersonConnectionTypes: NaturalPersonConnectionType[] =
  Object.values(NaturalPersonConnectionType).filter(
    (value) => typeof value === "number"
  ) as NaturalPersonConnectionType[];

// Define explicit mappings between NaturalPersonConnectionType enums and custom string representations
const naturalPersonConnectionTypeToStringMapping: {
  [key in NaturalPersonConnectionType]: string;
} = {
  [NaturalPersonConnectionType.UNSPECIFIED]: "Unspecified",
  [NaturalPersonConnectionType.ULTIMATE_BENEFICIAL_OWNER]:
    "Ultimate Beneficial Owner",
  [NaturalPersonConnectionType.SHAREHOLDER]: "Shareholder",
  [NaturalPersonConnectionType.DIRECTOR]: "Director",
  [NaturalPersonConnectionType.SENIOR_MANAGEMENT]: "Senior Management",
  [NaturalPersonConnectionType.AUTHORIZED_SIGNATORY]: "Authorized Signatory",
  [NaturalPersonConnectionType.FOUNDER]: "Founder",
  [NaturalPersonConnectionType.SPOUSE]: "Spouse",
  [NaturalPersonConnectionType.DOMESTIC_PARTNER]: "Domestic Partner",
  [NaturalPersonConnectionType.PARENT]: "Parent",
  [NaturalPersonConnectionType.CHILD]: "Child",
  [NaturalPersonConnectionType.SIBLING]: "Sibling",
  [NaturalPersonConnectionType.BUSINESS_PARTNER]: "Business Partner",
  [NaturalPersonConnectionType.CLOSE_ASSOCIATE]: "Close Associate",
  [NaturalPersonConnectionType.GUARANTOR]: "Guarantor",
  [NaturalPersonConnectionType.BENEFICIARY_OF_TRUST]: "Beneficiary of Trust",
};

// Reverse mapping from string to NaturalPersonConnectionType enum
const stringToNaturalPersonConnectionTypeMapping: Record<
  string,
  NaturalPersonConnectionType
> = {};
for (const [key, value] of Object.entries(
  naturalPersonConnectionTypeToStringMapping
)) {
  stringToNaturalPersonConnectionTypeMapping[value] = Number(key);
}

class UnsupportedNaturalPersonConnectionTypeError extends Error {
  naturalPersonConnectionType: NaturalPersonConnectionType;

  constructor(naturalPersonConnectionType: NaturalPersonConnectionType) {
    const message = `Unsupported NaturalPersonConnectionType: ${naturalPersonConnectionType}`;
    super(message);
    this.naturalPersonConnectionType = naturalPersonConnectionType;
  }
}

/**
 * Converts a NaturalPersonConnectionType enum instance to a custom string representation.
 * @param {NaturalPersonConnectionType} naturalPersonConnectionType - The connection type to convert.
 * @returns {string} The custom string representation of the connection type.
 */
export function naturalPersonConnectionTypeToString(
  naturalPersonConnectionType: NaturalPersonConnectionType
): string {
  if (
    naturalPersonConnectionType in naturalPersonConnectionTypeToStringMapping
  ) {
    return naturalPersonConnectionTypeToStringMapping[
      naturalPersonConnectionType
    ];
  } else {
    throw new UnsupportedNaturalPersonConnectionTypeError(
      naturalPersonConnectionType
    );
  }
}

class UnsupportedNaturalPersonConnectionTypeStringError extends Error {
  naturalPersonConnectionTypeStr: string;

  constructor(naturalPersonConnectionTypeStr: string) {
    const message = `Unsupported natural person connection type string: ${naturalPersonConnectionTypeStr}`;
    super(message);
    this.naturalPersonConnectionTypeStr = naturalPersonConnectionTypeStr;
  }
}

/**
 * Converts a custom string representation to a NaturalPersonConnectionType enum instance.
 * @param {string} naturalPersonConnectionTypeStr - The custom string representation.
 * @returns {NaturalPersonConnectionType} The corresponding NaturalPersonConnectionType enum instance.
 */
export function stringToNaturalPersonConnectionType(
  naturalPersonConnectionTypeStr: string
): NaturalPersonConnectionType {
  if (
    naturalPersonConnectionTypeStr in stringToNaturalPersonConnectionTypeMapping
  ) {
    return stringToNaturalPersonConnectionTypeMapping[
      naturalPersonConnectionTypeStr
    ];
  } else {
    throw new UnsupportedNaturalPersonConnectionTypeStringError(
      naturalPersonConnectionTypeStr
    );
  }
}
