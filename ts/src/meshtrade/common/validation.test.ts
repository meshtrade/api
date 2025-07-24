/**
 * @jest-environment node
 */

import {
  isValidULID,
  isValidGroupResourceName,
} from './validation';

/**
 * Extracts the ULID from a group resource name.
 * 
 * @param groupResourceName - The group resource name in format "groups/{ulid}"
 * @returns the ULID portion if valid, null if the format is invalid
 * 
 * @example
 * ```typescript
 * extractULIDFromGroupName('groups/01ARZ3NDEKTSV4YWVF8F5BH32'); // '01ARZ3NDEKTSV4YWVF8F5BH32'
 * extractULIDFromGroupName('invalid'); // null
 * ```
 */
function extractULIDFromGroupName(groupResourceName: string): string | null {
  if (!isValidGroupResourceName(groupResourceName)) {
    return null;
  }
  return groupResourceName.substring(7); // Remove "groups/" prefix
}

/**
 * Creates a group resource name from a ULID.
 * 
 * @param ulid - The ULID to convert to a group resource name
 * @returns the group resource name in format "groups/{ulid}", or null if ULID is invalid
 * 
 * @example
 * ```typescript
 * createGroupResourceName('01ARZ3NDEKTSV4YWVF8F5BH32'); // 'groups/01ARZ3NDEKTSV4YWVF8F5BH32'
 * createGroupResourceName('invalid'); // null
 * ```
 */
function createGroupResourceName(ulid: string): string | null {
  if (!isValidULID(ulid)) {
    return null;
  }
  return `groups/${ulid}`;
}

/**
 * Generic resource name validation for patterns like "{resourceType}/{ulid}".
 * 
 * @param resourceName - The resource name to validate
 * @param resourceType - The expected resource type (e.g., "groups", "api_users", "roles")
 * @returns true if the resource name matches the expected pattern, false otherwise
 * 
 * @example
 * ```typescript
 * isValidResourceName('groups/01ARZ3NDEKTSV4YWVF8F5BH32', 'groups'); // true
 * isValidResourceName('api_users/01ARZ3NDEKTSV4YWVF8F5BH32', 'api_users'); // true
 * isValidResourceName('groups/invalid', 'groups'); // false
 * ```
 */
function isValidResourceName(resourceName: string, resourceType: string): boolean {
  const pattern = new RegExp(`^${resourceType}\\/[0-9A-Z]{26}$`);
  return pattern.test(resourceName);
}

describe('validation utilities', () => {
  // Valid ULID examples (26 characters, uppercase alphanumeric)
  const validULIDs = [
    '01ARZ3NDEKTSV4YWVF8F5BH32Q', // Example ULID (26 chars)
    '01BX5ZZKBKACTAV9WEVGEMMVR0', // Another valid ULID (26 chars)
    '00000000000000000000000000', // All zeros (valid ULID)
    'ZZZZZZZZZZZZZZZZZZZZZZZZZZ', // All Z's (valid ULID)
  ];

  // Invalid ULID examples
  const invalidULIDs = [
    '', // Empty string
    '01ARZ3NDEKTSV4YWVF8F5BH3', // Too short (25 chars)
    '01ARZ3NDEKTSV4YWVF8F5BH321X', // Too long (27 chars)
    '01arz3ndektsv4ywvf8f5bh32q', // Lowercase (invalid)
    '01ARZ3NDEKTSV4YWVF8F5BH3!', // Contains special character
    '01ARZ3NDEKTSV4YWVF8F5BH3 ', // Contains space
    'invalid', // Random string
    '01ARZ3NDEKTSV4YWVF8F5BH3a', // Contains lowercase letter
    '01ARZ3NDEKTSV4YWVF8F5BH3-', // Contains hyphen
    '01ARZ3NDEKTSV4YWVF8F5BH3_', // Contains underscore
    '01ARZ3NDEKTSV4YWVF8F5BH3.', // Contains period
  ];

  describe('isValidULID', () => {
    test('should return true for valid ULIDs', () => {
      validULIDs.forEach(ulid => {
        expect(isValidULID(ulid)).toBe(true);
      });
    });

    test('should return false for invalid ULIDs', () => {
      invalidULIDs.forEach(ulid => {
        expect(isValidULID(ulid)).toBe(false);
      });
    });

    test('should handle edge cases', () => {
      expect(isValidULID('123456789012345678901234567')).toBe(false); // Numbers only but too long
      expect(isValidULID('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe(true); // All letters, 26 chars - valid
      expect(isValidULID('0123456789ABCDEFGHIJKLMNPQ')).toBe(true); // Valid mix, 26 chars
    });
  });

  describe('isValidGroupResourceName', () => {
    const validGroupNames = validULIDs.map(ulid => `groups/${ulid}`);
    
    test('should return true for valid group resource names', () => {
      validGroupNames.forEach(groupName => {
        expect(isValidGroupResourceName(groupName)).toBe(true);
      });
    });

    test('should return false for invalid group resource names', () => {
      const invalidGroupNames = [
        '', // Empty string
        'groups/', // Missing ULID
        'groups/invalid', // Invalid ULID
        '01ARZ3NDEKTSV4YWVF8F5BH32Q', // Missing "groups/" prefix
        'users/01ARZ3NDEKTSV4YWVF8F5BH32Q', // Wrong resource type
        'Groups/01ARZ3NDEKTSV4YWVF8F5BH32Q', // Wrong case
        'groups/01arz3ndektsv4ywvf8f5bh32q', // Lowercase ULID
        'groups/01ARZ3NDEKTSV4YWVF8F5BH3', // Too short ULID
        'groups/01ARZ3NDEKTSV4YWVF8F5BH321X', // Too long ULID
        'groups/01ARZ3NDEKTSV4YWVF8F5BH3!', // Invalid character in ULID
        'groups//01ARZ3NDEKTSV4YWVF8F5BH32Q', // Double slash
        '/groups/01ARZ3NDEKTSV4YWVF8F5BH32Q', // Leading slash
        'groups/01ARZ3NDEKTSV4YWVF8F5BH32Q/', // Trailing slash
      ];

      invalidGroupNames.forEach(groupName => {
        expect(isValidGroupResourceName(groupName)).toBe(false);
      });
    });
  });

  describe('extractULIDFromGroupName', () => {
    test('should extract ULID from valid group resource names', () => {
      validULIDs.forEach(ulid => {
        const groupName = `groups/${ulid}`;
        expect(extractULIDFromGroupName(groupName)).toBe(ulid);
      });
    });

    test('should return null for invalid group resource names', () => {
      const invalidGroupNames = [
        '', // Empty string
        'groups/', // Missing ULID
        'groups/invalid', // Invalid ULID
        '01ARZ3NDEKTSV4YWVF8F5BH32', // Missing prefix
        'users/01ARZ3NDEKTSV4YWVF8F5BH32', // Wrong resource type
      ];

      invalidGroupNames.forEach(groupName => {
        expect(extractULIDFromGroupName(groupName)).toBeNull();
      });
    });
  });

  describe('createGroupResourceName', () => {
    test('should create valid group resource names from valid ULIDs', () => {
      validULIDs.forEach(ulid => {
        const expected = `groups/${ulid}`;
        expect(createGroupResourceName(ulid)).toBe(expected);
      });
    });

    test('should return null for invalid ULIDs', () => {
      invalidULIDs.forEach(ulid => {
        expect(createGroupResourceName(ulid)).toBeNull();
      });
    });
  });

  describe('isValidResourceName', () => {
    test('should validate group resource names', () => {
      validULIDs.forEach(ulid => {
        expect(isValidResourceName(`groups/${ulid}`, 'groups')).toBe(true);
      });
    });

    test('should validate api_users resource names', () => {
      validULIDs.forEach(ulid => {
        expect(isValidResourceName(`api_users/${ulid}`, 'api_users')).toBe(true);
      });
    });

    test('should validate roles resource names', () => {
      validULIDs.forEach(ulid => {
        expect(isValidResourceName(`roles/${ulid}`, 'roles')).toBe(true);
      });
    });

    test('should return false for mismatched resource types', () => {
      const ulid = '01ARZ3NDEKTSV4YWVF8F5BH32Q';
      expect(isValidResourceName(`groups/${ulid}`, 'users')).toBe(false);
      expect(isValidResourceName(`api_users/${ulid}`, 'groups')).toBe(false);
      expect(isValidResourceName(`roles/${ulid}`, 'api_users')).toBe(false);
    });

    test('should return false for invalid ULIDs', () => {
      invalidULIDs.forEach(ulid => {
        expect(isValidResourceName(`groups/${ulid}`, 'groups')).toBe(false);
        expect(isValidResourceName(`api_users/${ulid}`, 'api_users')).toBe(false);
      });
    });

    test('should handle special characters in resource type', () => {
      const ulid = '01ARZ3NDEKTSV4YWVF8F5BH32Q';
      // Test with resource types that contain underscores
      expect(isValidResourceName(`api_users/${ulid}`, 'api_users')).toBe(true);
      expect(isValidResourceName(`some_resource/${ulid}`, 'some_resource')).toBe(true);
    });

    test('should be case sensitive for resource types', () => {
      const ulid = '01ARZ3NDEKTSV4YWVF8F5BH32Q';
      expect(isValidResourceName(`Groups/${ulid}`, 'groups')).toBe(false);
      expect(isValidResourceName(`groups/${ulid}`, 'Groups')).toBe(false);
    });
  });

  describe('integration tests', () => {
    test('should work together for complete workflow', () => {
      const ulid = '01ARZ3NDEKTSV4YWVF8F5BH32Q';
      
      // Validate the ULID
      expect(isValidULID(ulid)).toBe(true);
      
      // Create a group resource name
      const groupName = createGroupResourceName(ulid);
      expect(groupName).toBe(`groups/${ulid}`);
      
      // Validate the group resource name
      expect(isValidGroupResourceName(groupName!)).toBe(true);
      
      // Extract the ULID back
      const extractedULID = extractULIDFromGroupName(groupName!);
      expect(extractedULID).toBe(ulid);
      
      // Generic validation
      expect(isValidResourceName(groupName!, 'groups')).toBe(true);
    });

    test('should handle error cases in workflow', () => {
      const invalidULID = 'invalid';
      
      // Invalid ULID should fail validation
      expect(isValidULID(invalidULID)).toBe(false);
      
      // Creating group name should return null
      const groupName = createGroupResourceName(invalidULID);
      expect(groupName).toBeNull();
      
      // Manual invalid group name should fail validation
      const invalidGroupName = `groups/${invalidULID}`;
      expect(isValidGroupResourceName(invalidGroupName)).toBe(false);
      
      // Extraction should return null
      expect(extractULIDFromGroupName(invalidGroupName)).toBeNull();
    });
  });
});