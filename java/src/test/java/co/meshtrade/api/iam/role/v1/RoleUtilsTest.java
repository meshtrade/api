package co.meshtrade.api.iam.role.v1;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Comprehensive tests for RoleUtils utility methods.
 *
 * <p>Tests cover validation, parsing, and resource name generation methods
 * with happy paths, edge cases, and error conditions.
 */
class RoleUtilsTest {

    // Test roleIsValid
    @Test
    void roleIsValid_validRole_returnsTrue() {
        assertTrue(RoleUtils.roleIsValid(RoleOuterClass.Role.ROLE_IAM_ADMIN));
        assertTrue(RoleUtils.roleIsValid(RoleOuterClass.Role.ROLE_IAM_VIEWER));
        assertTrue(RoleUtils.roleIsValid(RoleOuterClass.Role.ROLE_UNSPECIFIED));
    }

    @Test
    void roleIsValid_nullRole_returnsFalse() {
        assertFalse(RoleUtils.roleIsValid(null));
    }

    @Test
    void roleIsValid_unrecognizedRole_returnsFalse() {
        assertFalse(RoleUtils.roleIsValid(RoleOuterClass.Role.UNRECOGNIZED));
    }

    // Test roleIsValidAndSpecified
    @Test
    void roleIsValidAndSpecified_validSpecifiedRole_returnsTrue() {
        assertTrue(RoleUtils.roleIsValidAndSpecified(RoleOuterClass.Role.ROLE_IAM_ADMIN));
        assertTrue(RoleUtils.roleIsValidAndSpecified(RoleOuterClass.Role.ROLE_IAM_VIEWER));
    }

    @Test
    void roleIsValidAndSpecified_unspecifiedRole_returnsFalse() {
        assertFalse(RoleUtils.roleIsValidAndSpecified(RoleOuterClass.Role.ROLE_UNSPECIFIED));
    }

    @Test
    void roleIsValidAndSpecified_nullRole_returnsFalse() {
        assertFalse(RoleUtils.roleIsValidAndSpecified(null));
    }

    @Test
    void roleIsValidAndSpecified_unrecognizedRole_returnsFalse() {
        assertFalse(RoleUtils.roleIsValidAndSpecified(RoleOuterClass.Role.UNRECOGNIZED));
    }

    // Test roleFullResourceNameFromGroup (new validated version)
    @Test
    void roleFullResourceNameFromGroup_validInputs_returnsCorrectFormat() {
        String result = RoleUtils.roleFullResourceNameFromGroup(
            RoleOuterClass.Role.ROLE_IAM_ADMIN,
            "groups/01DD32GZ7R0000000000000001"
        );
        assertTrue(result.startsWith("groups/01DD32GZ7R0000000000000001/"));
        assertTrue(result.contains("/"));
    }

    @Test
    void roleFullResourceNameFromGroup_invalidRole_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.roleFullResourceNameFromGroup(
                RoleOuterClass.Role.ROLE_UNSPECIFIED,
                "groups/01DD32GZ7R0000000000000001"
            );
        });
        assertTrue(exception.getMessage().contains("Role must be valid and specified"));
    }

    @Test
    void roleFullResourceNameFromGroup_nullGroup_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.roleFullResourceNameFromGroup(
                RoleOuterClass.Role.ROLE_IAM_ADMIN,
                null
            );
        });
        assertTrue(exception.getMessage().contains("Group cannot be null or empty"));
    }

    @Test
    void roleFullResourceNameFromGroup_emptyGroup_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.roleFullResourceNameFromGroup(
                RoleOuterClass.Role.ROLE_IAM_ADMIN,
                ""
            );
        });
        assertTrue(exception.getMessage().contains("Group cannot be null or empty"));
    }

    @Test
    void roleFullResourceNameFromGroup_invalidGroupFormat_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.roleFullResourceNameFromGroup(
                RoleOuterClass.Role.ROLE_IAM_ADMIN,
                "invalid/format"
            );
        });
        assertTrue(exception.getMessage().contains("Invalid group format"));
    }

    @Test
    void roleFullResourceNameFromGroup_emptyGroupId_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.roleFullResourceNameFromGroup(
                RoleOuterClass.Role.ROLE_IAM_ADMIN,
                "groups/"
            );
        });
        assertTrue(exception.getMessage().contains("Group ID cannot be empty"));
    }

    // Test parseRoleParts
    @Test
    void parseRoleParts_validFullResourceName_returnsCorrectParts() {
        int roleNumber = RoleOuterClass.Role.ROLE_IAM_ADMIN.getNumber();
        String fullName = String.format("groups/01DD32GZ7R0000000000000001/%d", roleNumber);

        RoleUtils.RoleParts parts = RoleUtils.parseRoleParts(fullName);

        assertEquals("groups/01DD32GZ7R0000000000000001", parts.group());
        assertEquals(RoleOuterClass.Role.ROLE_IAM_ADMIN, parts.role());
    }

    @Test
    void parseRoleParts_nullInput_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts(null);
        });
        assertTrue(exception.getMessage().contains("cannot be null or empty"));
    }

    @Test
    void parseRoleParts_emptyInput_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts("");
        });
        assertTrue(exception.getMessage().contains("cannot be null or empty"));
    }

    @Test
    void parseRoleParts_invalidFormat_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts("invalid/format");
        });
        assertTrue(exception.getMessage().contains("Invalid role format"));
    }

    @Test
    void parseRoleParts_wrongPrefix_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts("users/01DD32GZ7R0000000000000001/5");
        });
        assertTrue(exception.getMessage().contains("Invalid role format"));
    }

    @Test
    void parseRoleParts_emptyGroupId_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts("groups//5");
        });
        assertTrue(exception.getMessage().contains("Group ID cannot be empty"));
    }

    @Test
    void parseRoleParts_invalidULIDFormat_throwsException() {
        // Test various invalid ULID formats for cross-SDK consistency
        Exception exception1 = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts("groups/NOT_A_VALID_ULID/5");
        });
        assertTrue(exception1.getMessage().contains("not a valid ULID"));

        // ULID too short
        Exception exception2 = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts("groups/TOOSHORT/5");
        });
        assertTrue(exception2.getMessage().contains("not a valid ULID"));

        // ULID too long
        Exception exception3 = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts("groups/01DD32GZ7R0000000000000001TOOLONG/5");
        });
        assertTrue(exception3.getMessage().contains("not a valid ULID"));

        // ULID with invalid characters (I, L, O, U are excluded from Crockford Base32)
        Exception exception4 = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts("groups/01DD32GZ7R000000000000IOLU/5");
        });
        assertTrue(exception4.getMessage().contains("not a valid ULID"));

        // ULID with special characters
        Exception exception5 = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts("groups/01DD32GZ7R00000000000000-1/5");
        });
        assertTrue(exception5.getMessage().contains("not a valid ULID"));
    }

    @Test
    void parseRoleParts_invalidRoleNumber_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts("groups/01DD32GZ7R0000000000000001/invalid");
        });
        assertTrue(exception.getMessage().contains("Error parsing role enum value"));
    }

    @Test
    void parseRoleParts_unspecifiedRole_throwsException() {
        int unspecifiedNumber = RoleOuterClass.Role.ROLE_UNSPECIFIED.getNumber();
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.parseRoleParts(String.format("groups/01DD32GZ7R0000000000000001/%d", unspecifiedNumber));
        });
        assertTrue(exception.getMessage().contains("is not valid"));
    }

    // Test roleFromFullResourceName
    @Test
    void roleFromFullResourceName_validInput_returnsRole() {
        int roleNumber = RoleOuterClass.Role.ROLE_IAM_ADMIN.getNumber();
        String fullName = String.format("groups/01DD32GZ7R0000000000000001/%d", roleNumber);

        RoleOuterClass.Role role = RoleUtils.roleFromFullResourceName(fullName);

        assertEquals(RoleOuterClass.Role.ROLE_IAM_ADMIN, role);
    }

    @Test
    void roleFromFullResourceName_invalidInput_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.roleFromFullResourceName("invalid");
        });
        assertTrue(exception.getMessage().contains("Invalid role format"));
    }

    // Test fullResourceNameFromGroupName
    @Test
    void fullResourceNameFromGroupName_validInputs_returnsCorrectFormat() {
        String result = RoleUtils.fullResourceNameFromGroupName(
            RoleOuterClass.Role.ROLE_IAM_ADMIN,
            "groups/01DD32GZ7R0000000000000001"
        );
        int roleNumber = RoleOuterClass.Role.ROLE_IAM_ADMIN.getNumber();
        assertEquals(String.format("groups/01DD32GZ7R0000000000000001/%d", roleNumber), result);
    }

    @Test
    void fullResourceNameFromGroupName_invalidRole_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.fullResourceNameFromGroupName(
                RoleOuterClass.Role.ROLE_UNSPECIFIED,
                "groups/01DD32GZ7R0000000000000001"
            );
        });
        assertTrue(exception.getMessage().contains("Role must be valid and specified"));
    }

    @Test
    void fullResourceNameFromGroupName_nullGroupName_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.fullResourceNameFromGroupName(
                RoleOuterClass.Role.ROLE_IAM_ADMIN,
                null
            );
        });
        assertTrue(exception.getMessage().contains("Group name cannot be null or empty"));
    }

    @Test
    void fullResourceNameFromGroupName_emptyGroupName_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.fullResourceNameFromGroupName(
                RoleOuterClass.Role.ROLE_IAM_ADMIN,
                ""
            );
        });
        assertTrue(exception.getMessage().contains("Group name cannot be null or empty"));
    }

    @Test
    void fullResourceNameFromGroupName_invalidFormat_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.fullResourceNameFromGroupName(
                RoleOuterClass.Role.ROLE_IAM_ADMIN,
                "invalid/format"
            );
        });
        assertTrue(exception.getMessage().contains("Invalid group format"));
    }

    @Test
    void fullResourceNameFromGroupName_emptyGroupId_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.fullResourceNameFromGroupName(
                RoleOuterClass.Role.ROLE_IAM_ADMIN,
                "groups/"
            );
        });
        assertTrue(exception.getMessage().contains("Group ID cannot be empty"));
    }

    // Test fullResourceNameFromGroupId
    @Test
    void fullResourceNameFromGroupId_validInputs_returnsCorrectFormat() {
        String result = RoleUtils.fullResourceNameFromGroupId(
            RoleOuterClass.Role.ROLE_IAM_ADMIN,
            "01DD32GZ7R0000000000000001"
        );
        int roleNumber = RoleOuterClass.Role.ROLE_IAM_ADMIN.getNumber();
        assertEquals(String.format("groups/01DD32GZ7R0000000000000001/%d", roleNumber), result);
    }

    @Test
    void fullResourceNameFromGroupId_invalidRole_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.fullResourceNameFromGroupId(
                RoleOuterClass.Role.ROLE_UNSPECIFIED,
                "01DD32GZ7R0000000000000001"
            );
        });
        assertTrue(exception.getMessage().contains("Role must be valid and specified"));
    }

    @Test
    void fullResourceNameFromGroupId_nullGroupId_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.fullResourceNameFromGroupId(
                RoleOuterClass.Role.ROLE_IAM_ADMIN,
                null
            );
        });
        assertTrue(exception.getMessage().contains("Group ID cannot be null or empty"));
    }

    @Test
    void fullResourceNameFromGroupId_emptyGroupId_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.fullResourceNameFromGroupId(
                RoleOuterClass.Role.ROLE_IAM_ADMIN,
                ""
            );
        });
        assertTrue(exception.getMessage().contains("Group ID cannot be null or empty"));
    }

    @Test
    void fullResourceNameFromGroupId_invalidULID_throwsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            RoleUtils.fullResourceNameFromGroupId(
                RoleOuterClass.Role.ROLE_IAM_ADMIN,
                "INVALID_ULID"
            );
        });
        assertTrue(exception.getMessage().contains("not a valid ULID"));
    }

    // Integration test - round trip
    @Test
    void integration_createAndParse_roundTrip() {
        RoleOuterClass.Role originalRole = RoleOuterClass.Role.ROLE_IAM_ADMIN;
        String group = "groups/01DD32GZ7R0000000000000001";

        // Create full resource name
        String fullResourceName = RoleUtils.roleFullResourceNameFromGroup(originalRole, group);

        // Parse it back
        RoleUtils.RoleParts parts = RoleUtils.parseRoleParts(fullResourceName);

        // Verify round trip
        assertEquals(group, parts.group());
        assertEquals(originalRole, parts.role());
    }

    // Test RoleParts record
    @Test
    void roleParts_creation_storesValues() {
        RoleOuterClass.Role role = RoleOuterClass.Role.ROLE_IAM_ADMIN;
        String group = "groups/01DD32GZ7R0000000000000001";

        RoleUtils.RoleParts parts = new RoleUtils.RoleParts(group, role);

        assertEquals(group, parts.group());
        assertEquals(role, parts.role());
    }

    @Test
    void roleParts_equality_worksCorrectly() {
        RoleOuterClass.Role role = RoleOuterClass.Role.ROLE_IAM_ADMIN;
        String group = "groups/01DD32GZ7R0000000000000001";

        RoleUtils.RoleParts parts1 = new RoleUtils.RoleParts(group, role);
        RoleUtils.RoleParts parts2 = new RoleUtils.RoleParts(group, role);

        assertEquals(parts1, parts2);
        assertEquals(parts1.hashCode(), parts2.hashCode());
    }
}
