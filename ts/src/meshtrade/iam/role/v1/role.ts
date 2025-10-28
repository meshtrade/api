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
  [Role.ROLE_WALLET_ACCOUNT_ADMIN]: "Wallet Account Admin",
  [Role.ROLE_WALLET_ACCOUNT_VIEWER]: "Wallet Account Viewer",

  [Role.ROLE_COMPLIANCE_ADMIN]: "Compliance Admin",
  [Role.ROLE_COMPLIANCE_VIEWER]: "Compliance Viewer",
  [Role.ROLE_COMPLIANCE_CLIENT_ADMIN]: "Compliance Client Admin",
  [Role.ROLE_COMPLIANCE_CLIENT_VIEWER]: "Compliance Client Viewer",

  [Role.ROLE_IAM_ADMIN]: "IAM Admin",
  [Role.ROLE_IAM_VIEWER]: "IAM Viewer",
  [Role.ROLE_IAM_API_USER_ADMIN]: "IAM API User Admin",
  [Role.ROLE_IAM_API_USER_VIEWER]: "IAM API User Viewer",
  [Role.ROLE_IAM_GROUP_ADMIN]: "IAM Group Admin",
  [Role.ROLE_IAM_GROUP_VIEWER]: "IAM Group Viewer",
  [Role.ROLE_IAM_USER_ADMIN]: "IAM User Admin",
  [Role.ROLE_IAM_USER_VIEWER]: "IAM User Viewer",

  [Role.ROLE_STUDIO_ADMIN]: "Studio Admin",
  [Role.ROLE_STUDIO_VIEWER]: "Studio Viewer",
  [Role.ROLE_STUDIO_INSTRUMENT_ADMIN]: "Studio Instrument Admin",
  [Role.ROLE_STUDIO_INSTRUMENT_VIEWER]: "Studio Instrument Viewer",

  [Role.ROLE_TRADING_ADMIN]: "Trading Admin",
  [Role.ROLE_TRADING_VIEWER]: "Trading Viewer",

  [Role.ROLE_REPORTING_ADMIN]: "Reporting Admin",
  [Role.ROLE_REPORTING_VIEWER]: "Reporting Viewer",

  [Role.ROLE_LEDGER_ADMIN]: "Ledger Admin",
  [Role.ROLE_LEDGER_VIEWER]: "Ledger Viewer",
  [Role.ROLE_LEDGER_TRANSACTION_ADMIN]: "Ledger Transaction Admin",
  [Role.ROLE_LEDGER_TRANSACTION_VIEWER]: "Ledger Transaction Viewer",
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

/**
 * Validates whether a ULID string is in the correct format.
 * ULIDs use Crockford's base32 alphabet (0-9, A-Z excluding I, L, O, U) and are 26 characters long.
 * @param {string} ulid - The ULID to validate.
 * @returns {boolean} True if the ULID is valid, false otherwise.
 */
function isValidULID(ulid: string): boolean {
  return /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/.test(ulid);
}

/**
 * Validates whether a role ID is in the valid range.
 * Role IDs must be 7 or 8 digits and cannot start with 0.
 * @param {number} roleId - The role ID to validate.
 * @returns {boolean} True if the role ID is valid, false otherwise.
 */
function isValidRoleId(roleId: number): boolean {
  return roleId >= 1000000 && roleId <= 99999999;
}

/**
 * Creates a role path resource name from a group ULID and role ID.
 * @param {string} groupULID - The group ULID (26 characters).
 * @param {number} roleId - The role ID enum value.
 * @returns {string} The role path in format groups/{ULIDv2}/roles/{role_id}.
 * @throws {Error} If the group ULID is invalid.
 * @throws {Error} If the role ID is invalid.
 *
 * @example
 * ```typescript
 * createRolePath('01ARZ3NDEKTSV4YWVF8F5BH32', Role.ROLE_IAM_ADMIN);
 * // Returns: 'groups/01ARZ3NDEKTSV4YWVF8F5BH32/roles/1000000'
 * ```
 */
export function createRolePath(groupULID: string, roleId: number): string {
  if (!isValidULID(groupULID)) {
    throw new Error(
      `Invalid group ULID: ${groupULID}. Must be 26 uppercase alphanumeric characters.`
    );
  }

  if (!isValidRoleId(roleId)) {
    throw new Error(
      `Invalid role ID: ${roleId}. Must be between 1000000 and 99999999.`
    );
  }

  return `groups/${groupULID}/roles/${roleId}`;
}

/**
 * Validates whether a role path is in the correct format.
 * @param {string} rolePath - The role path to validate.
 * @returns {boolean} True if the role path is valid, false otherwise.
 *
 * @example
 * ```typescript
 * isValidRolePath('groups/01ARZ3NDEKTSV4YWVF8F5BH32Q/roles/1000000'); // true
 * isValidRolePath('groups/01ARZ3NDEKTSV4YWVF8F5BH32Q/1000000'); // false (old format)
 * ```
 */
export function isValidRolePath(rolePath: string): boolean {
  return /^groups\/[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}\/roles\/[1-9][0-9]{6,7}$/.test(
    rolePath
  );
}

/**
 * Extracts the role ID from a role path.
 * @param {string} rolePath - The role path in format groups/{ULIDv2}/roles/{role_id}.
 * @returns {number | null} The role ID if valid, null otherwise.
 *
 * @example
 * ```typescript
 * extractRoleIdFromPath('groups/01ARZ3NDEKTSV4YWVF8F5BH32/roles/1000000');
 * // Returns: 1000000
 *
 * extractRoleIdFromPath('invalid/path');
 * // Returns: null
 * ```
 */
export function extractRoleIdFromPath(rolePath: string): number | null {
  if (!isValidRolePath(rolePath)) {
    return null;
  }

  const parts = rolePath.split("/");
  return parseInt(parts[3], 10);
}

/**
 * Extracts the group resource name from a role path.
 * @param {string} rolePath - The role path in format groups/{ULIDv2}/roles/{role_id}.
 * @returns {string | null} The group resource name (groups/{ULIDv2}) if valid, null otherwise.
 *
 * @example
 * ```typescript
 * extractGroupFromRolePath('groups/01ARZ3NDEKTSV4YWVF8F5BH32/roles/1000000');
 * // Returns: 'groups/01ARZ3NDEKTSV4YWVF8F5BH32'
 *
 * extractGroupFromRolePath('invalid/path');
 * // Returns: null
 * ```
 */
export function extractGroupFromRolePath(rolePath: string): string | null {
  if (!isValidRolePath(rolePath)) {
    return null;
  }

  const parts = rolePath.split("/");
  return `${parts[0]}/${parts[1]}`;
}
