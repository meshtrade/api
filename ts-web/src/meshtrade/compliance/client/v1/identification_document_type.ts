import { IdentificationDocumentType } from "./identification_document_type_pb";

// Get all identification document types as enum values
export const allIdentificationDocumentTypes: IdentificationDocumentType[] =
  Object.values(IdentificationDocumentType).filter(
    (value) => typeof value === "number"
  ) as IdentificationDocumentType[];

// Define explicit mappings between IdentificationDocumentType enums and custom string representations
const identificationDocumentTypeToStringMapping: {
  [key in IdentificationDocumentType]: string;
} = {
  [IdentificationDocumentType.UNSPECIFIED]: "Unspecified",
  [IdentificationDocumentType.PASSPORT]: "Passport",
  [IdentificationDocumentType.NATIONAL_ID]: "National ID",
  [IdentificationDocumentType.DRIVERS_LICENSE]: "Driver's License",
  [IdentificationDocumentType.RESIDENCE_PERMIT]: "Residence Permit",
};

// Reverse mapping from string to IdentificationDocumentType enum
const stringToIdentificationDocumentTypeMapping: Record<
  string,
  IdentificationDocumentType
> = {};
for (const [key, value] of Object.entries(
  identificationDocumentTypeToStringMapping
)) {
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
 * Converts an IdentificationDocumentType enum instance to a custom string representation.
 * @param {IdentificationDocumentType} identificationDocumentType - The document type to convert.
 * @returns {string} The custom string representation of the document type.
 */
export function identificationDocumentTypeToString(
  identificationDocumentType: IdentificationDocumentType
): string {
  if (identificationDocumentType in identificationDocumentTypeToStringMapping) {
    return identificationDocumentTypeToStringMapping[
      identificationDocumentType
    ];
  } else {
    throw new UnsupportedIdentificationDocumentTypeError(
      identificationDocumentType
    );
  }
}

class UnsupportedIdentificationDocumentTypeStringError extends Error {
  identificationDocumentTypeStr: string;

  constructor(identificationDocumentTypeStr: string) {
    const message = `Unsupported identification document type string: ${identificationDocumentTypeStr}`;
    super(message);
    this.identificationDocumentTypeStr = identificationDocumentTypeStr;
  }
}

/**
 * Converts a custom string representation to an IdentificationDocumentType enum instance.
 * @param {string} identificationDocumentTypeStr - The custom string representation.
 * @returns {IdentificationDocumentType} The corresponding IdentificationDocumentType enum instance.
 */
export function stringToIdentificationDocumentType(
  identificationDocumentTypeStr: string
): IdentificationDocumentType {
  if (
    identificationDocumentTypeStr in stringToIdentificationDocumentTypeMapping
  ) {
    return stringToIdentificationDocumentTypeMapping[
      identificationDocumentTypeStr
    ];
  } else {
    throw new UnsupportedIdentificationDocumentTypeStringError(
      identificationDocumentTypeStr
    );
  }
}
