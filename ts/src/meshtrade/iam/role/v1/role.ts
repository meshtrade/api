import { Role } from "./role_pb";

// Get all roles as enum values
export const allRoles: Role[] = Object.values(Role).filter(
  (value) => typeof value === "number"
) as Role[];

// Define explicit mappings between Role enums and custom string representations
const roleToStringMapping: { [key in Role]: string } = {
  [Role.ROLE_UNSPECIFIED]: "Unspecified",
  [Role.ROLE_WALLET_ADMIN]: "Wallet Admin",
  [Role.ROLE_WALLET_VIEWER]: "Wallet Viewer",
  [Role.ROLE_COMPLIANCE_ADMIN]: "Compliance Admin",
  [Role.ROLE_COMPLIANCE_VIEWER]: "Compliance Viewer",
  [Role.ROLE_IAM_ADMIN]: "IAM Admin",
  [Role.ROLE_IAM_VIEWER]: "IAM Viewer",
  [Role.ROLE_IAM_GROUP_ADMIN]: "IAM Group Admin",
  [Role.ROLE_IAM_GROUP_VIEWER]: "IAM Group Viewer",
  [Role.ROLE_ISSUANCE_HUB_ADMIN]: "Issuance Hub Admin",
  [Role.ROLE_ISSUANCE_HUB_VIEWER]: "Issuance Hub Viewer",
  [Role.ROLE_TRADING_ADMIN]: "Trading Admin",
  [Role.ROLE_TRADING_VIEWER]: "Trading Viewer",
  [Role.ROLE_REPORTING_ADMIN]: "Reporting Admin",
  [Role.ROLE_REPORTING_VIEWER]: "Reporting Viewer",
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
