/**
 * @jest-environment node
 */

import { Role } from "./role_pb";
import {
  createRolePath,
  isValidRolePath,
  extractRoleIdFromPath,
  extractGroupFromRolePath,
  roleToString,
  stringToRole,
} from "./role";

describe("Role path utilities", () => {
  const validGroupULID = "01ARZ3NDEKTSV4YWVF8F5BH32Q";
  const anotherValidULID = "01BX5ZZKBKACTAV9WEVGEMMVS0";

  describe("createRolePath", () => {
    describe("with valid inputs", () => {
      test("creates valid role path with 7-digit role ID", () => {
        const result = createRolePath(validGroupULID, Role.IAM_ADMIN);
        expect(result).toBe(`groups/${validGroupULID}/roles/${Role.IAM_ADMIN}`);
        expect(isValidRolePath(result)).toBe(true);
      });

      test("creates valid role path with 8-digit role ID", () => {
        const largeRoleId = 10000000;
        const result = createRolePath(validGroupULID, largeRoleId);
        expect(result).toBe(`groups/${validGroupULID}/roles/${largeRoleId}`);
        expect(isValidRolePath(result)).toBe(true);
      });

      test("works with different group ULIDs", () => {
        const result = createRolePath(anotherValidULID, Role.WALLET_ADMIN);
        expect(result).toBe(
          `groups/${anotherValidULID}/roles/${Role.WALLET_ADMIN}`
        );
      });

      test("works with all valid role enums", () => {
        const roleIds = [
          Role.IAM_ADMIN,
          Role.IAM_VIEWER,
          Role.WALLET_ADMIN,
          Role.COMPLIANCE_ADMIN,
          Role.TRADING_ADMIN,
        ];

        roleIds.forEach((roleId) => {
          const result = createRolePath(validGroupULID, roleId);
          expect(isValidRolePath(result)).toBe(true);
        });
      });
    });

    describe("with invalid inputs", () => {
      test("throws error for invalid group ULID - too short", () => {
        expect(() =>
          createRolePath("01ARZ3NDEKTSV4YWVF8F5BH3Q", Role.IAM_ADMIN)
        ).toThrow("Invalid group ULID");
      });

      test("throws error for invalid group ULID - too long", () => {
        expect(() =>
          createRolePath("01ARZ3NDEKTSV4YWVF8F5BH32QX", Role.IAM_ADMIN)
        ).toThrow("Invalid group ULID");
      });

      test("throws error for invalid group ULID - lowercase", () => {
        expect(() =>
          createRolePath("01arz3ndektsv4ywvf8f5bh32q", Role.IAM_ADMIN)
        ).toThrow("Invalid group ULID");
      });

      test("throws error for invalid group ULID - special characters", () => {
        expect(() =>
          createRolePath("01ARZ3NDEKTSV4YWVF8F5BH3Q!", Role.IAM_ADMIN)
        ).toThrow("Invalid group ULID");
      });

      test("throws error for invalid role ID - too small", () => {
        expect(() => createRolePath(validGroupULID, 999999)).toThrow(
          "Invalid role ID"
        );
      });

      test("throws error for invalid role ID - too large", () => {
        expect(() => createRolePath(validGroupULID, 100000000)).toThrow(
          "Invalid role ID"
        );
      });

      test("throws error for invalid role ID - zero", () => {
        expect(() => createRolePath(validGroupULID, 0)).toThrow(
          "Invalid role ID"
        );
      });

      test("throws error for invalid role ID - negative", () => {
        expect(() => createRolePath(validGroupULID, -1000000)).toThrow(
          "Invalid role ID"
        );
      });
    });
  });

  describe("isValidRolePath", () => {
    describe("accepts new format with /roles/", () => {
      test("accepts valid path with 7-digit role ID", () => {
        expect(isValidRolePath(`groups/${validGroupULID}/roles/1000000`)).toBe(
          true
        );
      });

      test("accepts valid path with 8-digit role ID", () => {
        expect(isValidRolePath(`groups/${validGroupULID}/roles/10000000`)).toBe(
          true
        );
      });

      test("accepts different valid ULIDs", () => {
        expect(
          isValidRolePath(`groups/${anotherValidULID}/roles/1000000`)
        ).toBe(true);
      });

      test("accepts boundary role IDs", () => {
        expect(isValidRolePath(`groups/${validGroupULID}/roles/1000000`)).toBe(
          true
        );
        expect(isValidRolePath(`groups/${validGroupULID}/roles/99999999`)).toBe(
          true
        );
      });
    });

    describe("rejects old format without /roles/", () => {
      test("rejects old format with 7-digit role ID", () => {
        expect(isValidRolePath(`groups/${validGroupULID}/1000000`)).toBe(false);
      });

      test("rejects old format with 8-digit role ID", () => {
        expect(isValidRolePath(`groups/${validGroupULID}/10000000`)).toBe(
          false
        );
      });
    });

    describe("rejects invalid formats", () => {
      test("rejects empty string", () => {
        expect(isValidRolePath("")).toBe(false);
      });

      test("rejects malformed paths", () => {
        expect(isValidRolePath("invalid/path")).toBe(false);
        expect(isValidRolePath("groups/roles/1000000")).toBe(false);
        expect(
          isValidRolePath("/groups/01ARZ3NDEKTSV4YWVF8F5BH32/roles/1000000")
        ).toBe(false);
        expect(
          isValidRolePath(
            "groups/01ARZ3NDEKTSV4YWVF8F5BH32/roles/1000000/extra"
          )
        ).toBe(false);
      });

      test("rejects invalid ULIDs", () => {
        expect(
          isValidRolePath("groups/01ARZ3NDEKTSV4YWVF8F5BH3Q/roles/1000000")
        ).toBe(false); // too short - 25 chars
        expect(
          isValidRolePath("groups/01arz3ndektsv4ywvf8f5bh32q/roles/1000000")
        ).toBe(false); // lowercase
        expect(
          isValidRolePath("groups/01ARZ3NDEKTSV4YWVF8F5BH3Q!/roles/1000000")
        ).toBe(false); // special char
        expect(
          isValidRolePath("groups/01ARZ3NDEKTSV4YWVF8F5BHIQ/roles/1000000")
        ).toBe(false); // contains 'I'
        expect(
          isValidRolePath("groups/01ARZ3NDEKTSV4YWVF8F5BHLQ/roles/1000000")
        ).toBe(false); // contains 'L'
        expect(
          isValidRolePath("groups/01ARZ3NDEKTSV4YWVF8F5BHOQ/roles/1000000")
        ).toBe(false); // contains 'O'
        expect(
          isValidRolePath("groups/01ARZ3NDEKTSV4YWVF8F5BHUQ/roles/1000000")
        ).toBe(false); // contains 'U'
      });

      test("rejects invalid role IDs", () => {
        expect(isValidRolePath(`groups/${validGroupULID}/roles/999999`)).toBe(
          false
        ); // too short
        expect(
          isValidRolePath(`groups/${validGroupULID}/roles/100000000`)
        ).toBe(false); // too long
        expect(isValidRolePath(`groups/${validGroupULID}/roles/0000000`)).toBe(
          false
        ); // starts with 0
        expect(isValidRolePath(`groups/${validGroupULID}/roles/abc1234`)).toBe(
          false
        ); // contains letters
      });

      test("rejects paths with wrong separator", () => {
        expect(
          isValidRolePath(`groups\\${validGroupULID}\\roles\\1000000`)
        ).toBe(false);
        expect(isValidRolePath(`groups.${validGroupULID}.roles.1000000`)).toBe(
          false
        );
      });
    });
  });

  describe("extractRoleIdFromPath", () => {
    test("extracts 7-digit role ID from valid path", () => {
      const roleId = 1000000;
      const path = `groups/${validGroupULID}/roles/${roleId}`;
      expect(extractRoleIdFromPath(path)).toBe(roleId);
    });

    test("extracts 8-digit role ID from valid path", () => {
      const roleId = 10000000;
      const path = `groups/${validGroupULID}/roles/${roleId}`;
      expect(extractRoleIdFromPath(path)).toBe(roleId);
    });

    test("extracts role ID from different valid paths", () => {
      expect(
        extractRoleIdFromPath(`groups/${validGroupULID}/roles/1234567`)
      ).toBe(1234567);
      expect(
        extractRoleIdFromPath(`groups/${anotherValidULID}/roles/9999999`)
      ).toBe(9999999);
    });

    test("returns null for invalid path", () => {
      expect(extractRoleIdFromPath("invalid/path")).toBeNull();
      expect(
        extractRoleIdFromPath(`groups/${validGroupULID}/1000000`)
      ).toBeNull(); // old format
      expect(extractRoleIdFromPath("")).toBeNull();
    });

    test("returns null for old format", () => {
      expect(
        extractRoleIdFromPath(`groups/${validGroupULID}/1000000`)
      ).toBeNull();
    });
  });

  describe("extractGroupFromRolePath", () => {
    test("extracts group resource name from valid path", () => {
      const path = `groups/${validGroupULID}/roles/1000000`;
      expect(extractGroupFromRolePath(path)).toBe(`groups/${validGroupULID}`);
    });

    test("extracts group from different valid paths", () => {
      expect(
        extractGroupFromRolePath(`groups/${anotherValidULID}/roles/1000000`)
      ).toBe(`groups/${anotherValidULID}`);
      expect(
        extractGroupFromRolePath(`groups/${validGroupULID}/roles/99999999`)
      ).toBe(`groups/${validGroupULID}`);
    });

    test("returns null for invalid path", () => {
      expect(extractGroupFromRolePath("invalid/path")).toBeNull();
      expect(
        extractGroupFromRolePath(`groups/${validGroupULID}/1000000`)
      ).toBeNull(); // old format
      expect(extractGroupFromRolePath("")).toBeNull();
    });

    test("returns null for old format", () => {
      expect(
        extractGroupFromRolePath(`groups/${validGroupULID}/1000000`)
      ).toBeNull();
    });
  });

  describe("integration with existing role utilities", () => {
    test("createRolePath works with Role enum values", () => {
      const path = createRolePath(validGroupULID, Role.IAM_ADMIN);
      const extractedRoleId = extractRoleIdFromPath(path);
      expect(extractedRoleId).toBe(Role.IAM_ADMIN);
    });

    test("round-trip conversion works correctly", () => {
      const originalGroupULID = validGroupULID;
      const originalRoleId = Role.WALLET_ADMIN;

      const path = createRolePath(originalGroupULID, originalRoleId);
      const extractedGroup = extractGroupFromRolePath(path);
      const extractedRoleId = extractRoleIdFromPath(path);

      expect(extractedGroup).toBe(`groups/${originalGroupULID}`);
      expect(extractedRoleId).toBe(originalRoleId);
    });

    test("roleToString and stringToRole still work", () => {
      expect(roleToString(Role.IAM_ADMIN)).toBe("IAM Admin");
      expect(stringToRole("IAM Admin")).toBe(Role.IAM_ADMIN);
    });
  });

  describe("edge cases", () => {
    test("handles maximum valid role ID", () => {
      const maxRoleId = 99999999;
      const path = createRolePath(validGroupULID, maxRoleId);
      expect(isValidRolePath(path)).toBe(true);
      expect(extractRoleIdFromPath(path)).toBe(maxRoleId);
    });

    test("handles minimum valid role ID", () => {
      const minRoleId = 1000000;
      const path = createRolePath(validGroupULID, minRoleId);
      expect(isValidRolePath(path)).toBe(true);
      expect(extractRoleIdFromPath(path)).toBe(minRoleId);
    });

    test("handles all zeros ULID", () => {
      const zeroULID = "00000000000000000000000000";
      const path = createRolePath(zeroULID, Role.IAM_ADMIN);
      expect(isValidRolePath(path)).toBe(true);
      expect(extractGroupFromRolePath(path)).toBe(`groups/${zeroULID}`);
    });

    test("handles all Z ULID", () => {
      const zULID = "ZZZZZZZZZZZZZZZZZZZZZZZZZZ";
      const path = createRolePath(zULID, Role.IAM_ADMIN);
      expect(isValidRolePath(path)).toBe(true);
      expect(extractGroupFromRolePath(path)).toBe(`groups/${zULID}`);
    });
  });
});
