import { IdentificationDocumentType } from "./identification_document_type_pb";

export const allIdentificationDocumentTypes: IdentificationDocumentType[] = Object.values(
  IdentificationDocumentType,
).filter((value) => typeof value === "number") as IdentificationDocumentType[];

// Define explicit mappings between IdentificationDocumentType enums and custom string representations
const identificationDocumentTypeToStringMapping: {
  [key in IdentificationDocumentType]: string;
} = {
  [IdentificationDocumentType.IDENTIFICATION_DOCUMENT_TYPE_UNSPECIFIED]: "-",
  [IdentificationDocumentType.IDENTIFICATION_DOCUMENT_TYPE_PASSPORT]: "Passport",
  [IdentificationDocumentType.IDENTIFICATION_DOCUMENT_TYPE_NATIONAL_ID]: "National ID",
  [IdentificationDocumentType.IDENTIFICATION_DOCUMENT_TYPE_RESIDENCE_PERMIT]: "Residence Permit",
  [IdentificationDocumentType.IDENTIFICATION_DOCUMENT_TYPE_DRIVERS_LICENSE]: "Drivers Liscence",
};

// Reverse mapping from string to IdentificationDocumentType enum
const stringToIdentificationDocumentTypeMapping: Record<string, IdentificationDocumentType> = {};
for (const [key, value] of Object.entries(identificationDocumentTypeToStringMapping)) {
  stringToIdentificationDocumentTypeMapping[value] = Number(key);
}

class UnsupportedIdentificationDocumentTypeError extends Error {
  identificationDocumentType: IdentificationDocumentType;

  constructor(identificationDocumentType: IdentificationDocumentType) {
    const message = `Unsupported IdentificationDocumentType: ${identificationDocumentType}`;
    super(message);
    this.identificationDocumentType = identificationDocumentType;
  }
}

/**
 * Converts a IdentificationDocumentType enum instance to a custom string representation.
 * @param {IdentificationDocumentType} identificationDocumentType - The company client type to convert.
 * @returns {string} The custom string representation of the company client type.
 */
export function identificationDocumentTypeToString(
  identificationDocumentType: IdentificationDocumentType,
): string {
  if (identificationDocumentType in identificationDocumentTypeToStringMapping) {
    return identificationDocumentTypeToStringMapping[identificationDocumentType];
  } else {
    throw new UnsupportedIdentificationDocumentTypeError(identificationDocumentType);
  }
}

class UnsupportedIdentificationDocumentTypeStringError extends Error {
  identificationDocumentTypeStr: string;

  constructor(identificationDocumentTypeStr: string) {
    const message = `Unsupported company client type string: ${identificationDocumentTypeStr}`;
    super(message);
    this.identificationDocumentTypeStr = identificationDocumentTypeStr;
  }
}

/**
 * Converts a custom string representation to a IdentificationDocumentType enum instance.
 * @param {string} identificationDocumentTypeStr - The custom string representation of the company client type.
 * @returns {IdentificationDocumentType} The corresponding IdentificationDocumentType enum instance.
 */
export function stringToIdentificationDocumentType(
  identificationDocumentTypeStr: string,
): IdentificationDocumentType {
  if (identificationDocumentTypeStr in stringToIdentificationDocumentTypeMapping) {
    return stringToIdentificationDocumentTypeMapping[identificationDocumentTypeStr];
  } else {
    throw new UnsupportedIdentificationDocumentTypeStringError(identificationDocumentTypeStr);
  }
}
