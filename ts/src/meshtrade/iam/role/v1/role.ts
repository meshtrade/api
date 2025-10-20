import { Role } from "./role_pb";

// Get all roles as enum values
export const allRoles: Role[] = Object.values(Role).filter(
  (value) => typeof value === "number"
) as Role[];

// Define explicit mappings between Role enums and custom string representations
const roleToStringMapping: { [key in Role]: string } = {
  [Role.UNSPECIFIED]: "Unspecified",

  [Role.WALLET_ADMIN]: "Wallet Admin",
  [Role.WALLET_VIEWER]: "Wallet Viewer",
  [Role.WALLET_ACCOUNT_ADMIN]: "Wallet Account Admin",
  [Role.WALLET_ACCOUNT_VIEWER]: "Wallet Account Viewer",

  [Role.COMPLIANCE_ADMIN]: "Compliance Admin",
  [Role.COMPLIANCE_VIEWER]: "Compliance Viewer",
  [Role.COMPLIANCE_CLIENT_ADMIN]: "Compliance Client Admin",
  [Role.COMPLIANCE_CLIENT_VIEWER]: "Compliance Client Viewer",

  [Role.IAM_ADMIN]: "IAM Admin",
  [Role.IAM_VIEWER]: "IAM Viewer",
  [Role.IAM_API_USER_ADMIN]: "IAM API User Admin",
  [Role.IAM_API_USER_VIEWER]: "IAM API User Viewer",
  [Role.IAM_GROUP_ADMIN]: "IAM Group Admin",
  [Role.IAM_GROUP_VIEWER]: "IAM Group Viewer",
  [Role.IAM_USER_ADMIN]: "IAM User Admin",
  [Role.IAM_USER_VIEWER]: "IAM User Viewer",

  [Role.STUDIO_ADMIN]: "Studio Admin",
  [Role.STUDIO_VIEWER]: "Studio Viewer",
  [Role.STUDIO_INSTRUMENT_ADMIN]: "Studio Instrument Admin",
  [Role.STUDIO_INSTRUMENT_VIEWER]: "Studio Instrument Viewer",

  [Role.TRADING_ADMIN]: "Trading Admin",
  [Role.TRADING_VIEWER]: "Trading Viewer",

  [Role.REPORTING_ADMIN]: "Reporting Admin",
  [Role.REPORTING_VIEWER]: "Reporting Viewer",

  [Role.LEDGER_ADMIN]: "Ledger Admin",
  [Role.LEDGER_VIEWER]: "Ledger Viewer",
  [Role.LEDGER_TRANSACTION_ADMIN]: "Ledger Transaction Admin",
  [Role.LEDGER_TRANSACTION_VIEWER]: "Ledger Transaction Viewer",
};

// Reverse mapping from string to Role enum
const stringToRoleMapping: Record<string, Role> = {};
for (const [key, value] of Object.entries(roleToStringMapping)) {
  stringToRoleMapping[value] = Number(key);
}

class UnsupportedRoleError extends Error {
  role: Role;

  constructor(role: Role) {
    const message = `Unsupported Role: ${role}`;
    super(message);
    this.role = role;
  }
}

/**
 * Converts a Role enum instance to a custom string representation.
 * @param {Role} role - The role to convert.
 * @returns {string} The custom string representation of the role.
 */
export function roleToString(role: Role): string {
  if (role in roleToStringMapping) {
    return roleToStringMapping[role];
  } else {
    throw new UnsupportedRoleError(role);
  }
}

class UnsupportedRoleStringError extends Error {
  roleStr: string;

  constructor(roleStr: string) {
    const message = `Unsupported role string: ${roleStr}`;
    super(message);
    this.roleStr = roleStr;
  }
}

/**
 * Converts a custom string representation to a Role enum instance.
 * @param {string} roleStr - The custom string representation of the role.
 * @returns {Role} The corresponding Role enum instance.
 */
export function stringToRole(roleStr: string): Role {
  if (roleStr in stringToRoleMapping) {
    return stringToRoleMapping[roleStr];
  } else {
    throw new UnsupportedRoleStringError(roleStr);
  }
}
