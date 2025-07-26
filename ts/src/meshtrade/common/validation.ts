/**
 * Generic validation utilities for Meshtrade API resource names and identifiers.
 */

/**
 * Validates if a string is a valid ULID (Universally Unique Lexicographically Sortable Identifier).
 *
 * Note: This implementation uses a simplified character set for ULIDs that includes
 * all uppercase letters A-Z and digits 0-9, unlike the standard ULID specification
 * which excludes certain ambiguous characters (I, L, O, U).
 *
 * ULIDs in this system are 26-character identifiers that are:
 * - Lexicographically sortable
 * - Uppercase alphanumeric only
 * - Contain timestamp information for natural ordering
 *
 * @param ulid - The string to validate as a ULID
 * @returns true if the string is a valid ULID format, false otherwise
 *
 * @example
 * ```typescript
 * isValidULID('01ARZ3NDEKTSV4YWVF8F5BH32'); // true
 * isValidULID('invalid'); // false
 * isValidULID('01arz3ndektsv4ywvf8f5bh32'); // false (lowercase)
 * ```
 */
export function isValidULID(ulid: string): boolean {
  return /^[0-9A-Z]{26}$/.test(ulid);
}

/**
 * Validates if a resource name follows the groups/{ulid} format.
 *
 * Group resource names in the Meshtrade API follow the pattern "groups/{ulid}"
 * where {ulid} is a 26-character ULID identifier.
 *
 * @param resourceName - The resource name string to validate
 * @returns true if the resource name is a valid group resource name, false otherwise
 *
 * @example
 * ```typescript
 * isValidGroupResourceName('groups/01ARZ3NDEKTSV4YWVF8F5BH32'); // true
 * isValidGroupResourceName('groups/invalid'); // false
 * isValidGroupResourceName('users/01ARZ3NDEKTSV4YWVF8F5BH32'); // false
 * isValidGroupResourceName('01ARZ3NDEKTSV4YWVF8F5BH32'); // false
 * ```
 */
export function isValidGroupResourceName(resourceName: string): boolean {
  return /^groups\/[0-9A-Z]{26}$/.test(resourceName);
}
