import { CompanyRepresentativeRole } from "./company_representative_role_pb";

// Get all company representative roles as enum values
export const allCompanyRepresentativeRoles: CompanyRepresentativeRole[] =
  Object.values(CompanyRepresentativeRole).filter(
    (value) => typeof value === "number"
  ) as CompanyRepresentativeRole[];

// Define explicit mappings between CompanyRepresentativeRole enums and custom string representations
const companyRepresentativeRoleToStringMapping: {
  [key in CompanyRepresentativeRole]: string;
} = {
  [CompanyRepresentativeRole.UNSPECIFIED]: "Unspecified",
  [CompanyRepresentativeRole.ULTIMATE_BENEFICIAL_OWNER]:
    "Ultimate Beneficial Owner",
  [CompanyRepresentativeRole.SHAREHOLDER]: "Shareholder",
  [CompanyRepresentativeRole.SOLE_PROPRIETOR]: "Sole Proprietor",
  [CompanyRepresentativeRole.PARTNER]: "Partner",
  [CompanyRepresentativeRole.DIRECTOR]: "Director",
  [CompanyRepresentativeRole.MANAGER]: "Manager",
  [CompanyRepresentativeRole.AUTHORIZED_SIGNATORY]: "Authorized Signatory",
  [CompanyRepresentativeRole.PRIMARY_CONTACT]: "Primary Contact",
};

// Reverse mapping from string to CompanyRepresentativeRole enum
const stringToCompanyRepresentativeRoleMapping: Record<
  string,
  CompanyRepresentativeRole
> = {};
for (const [key, value] of Object.entries(
  companyRepresentativeRoleToStringMapping
)) {
  stringToCompanyRepresentativeRoleMapping[value] = Number(key);
}

class UnsupportedCompanyRepresentativeRoleError extends Error {
  companyRepresentativeRole: CompanyRepresentativeRole;

  constructor(companyRepresentativeRole: CompanyRepresentativeRole) {
    const message = `Unsupported CompanyRepresentativeRole: ${companyRepresentativeRole}`;
    super(message);
    this.companyRepresentativeRole = companyRepresentativeRole;
  }
}

/**
 * Converts a CompanyRepresentativeRole enum instance to a custom string representation.
 * @param {CompanyRepresentativeRole} companyRepresentativeRole - The role to convert.
 * @returns {string} The custom string representation of the role.
 */
export function companyRepresentativeRoleToString(
  companyRepresentativeRole: CompanyRepresentativeRole
): string {
  if (companyRepresentativeRole in companyRepresentativeRoleToStringMapping) {
    return companyRepresentativeRoleToStringMapping[companyRepresentativeRole];
  } else {
    throw new UnsupportedCompanyRepresentativeRoleError(
      companyRepresentativeRole
    );
  }
}

class UnsupportedCompanyRepresentativeRoleStringError extends Error {
  companyRepresentativeRoleStr: string;

  constructor(companyRepresentativeRoleStr: string) {
    const message = `Unsupported company representative role string: ${companyRepresentativeRoleStr}`;
    super(message);
    this.companyRepresentativeRoleStr = companyRepresentativeRoleStr;
  }
}

/**
 * Converts a custom string representation to a CompanyRepresentativeRole enum instance.
 * @param {string} companyRepresentativeRoleStr - The custom string representation of the role.
 * @returns {CompanyRepresentativeRole} The corresponding CompanyRepresentativeRole enum instance.
 */
export function stringToCompanyRepresentativeRole(
  companyRepresentativeRoleStr: string
): CompanyRepresentativeRole {
  if (
    companyRepresentativeRoleStr in stringToCompanyRepresentativeRoleMapping
  ) {
    return stringToCompanyRepresentativeRoleMapping[
      companyRepresentativeRoleStr
    ];
  } else {
    throw new UnsupportedCompanyRepresentativeRoleStringError(
      companyRepresentativeRoleStr
    );
  }
}
