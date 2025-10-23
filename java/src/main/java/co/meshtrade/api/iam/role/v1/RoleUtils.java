package co.meshtrade.api.iam.role.v1;

import co.meshtrade.api.iam.role.v1.RoleOuterClass;

/**
 * Utility methods for working with IAM roles.
 *
 * <p>This class provides helper methods for role resource name generation,
 * parsing, and validation.
 *
 * <p><b>Thread-safety:</b> All methods are thread-safe as they are stateless utility functions.
 *
 */
public final class RoleUtils {

    private RoleUtils() {
        throw new UnsupportedOperationException("Utility class - cannot be instantiated");
    }

    /**
     * Represents parsed components of a role full resource name.
     *
     * <p>This record holds the group identifier and role enum value extracted
     * from a full resource name like "groups/01DD32GZ7R0000000000000001/5".
     *
     * @param group The group identifier (e.g., "groups/01DD32GZ7R0000000000000001")
     * @param role The Role enum value
     */
    public static record RoleParts(String group, RoleOuterClass.Role role) {}

    /**
     * Checks if a Role enum value is valid (recognized).
     *
     * <p>A valid role is one that corresponds to a defined enum value in the protobuf definition.
     * This method returns false for null values and UNRECOGNIZED roles.
     *
         *
     * @param role The role to check
     * @return true if role is a recognized enum value, false otherwise
     *
     * @example
     * <pre>{@code
     * boolean valid = RoleUtils.roleIsValid(Role.ROLE_IAM_ADMIN);  // true
     * boolean invalid = RoleUtils.roleIsValid(null);               // false
     * }</pre>
     */
    public static boolean roleIsValid(RoleOuterClass.Role role) {
        return role != null && role != RoleOuterClass.Role.UNRECOGNIZED;
    }

    /**
     * Checks if a Role is valid and not ROLE_UNSPECIFIED.
     *
     * <p>This method combines validity checking with specification verification,
     * ensuring the role is both recognized and explicitly set to a meaningful value.
     *
         *
     * @param role The role to check
     * @return true if valid and specified (not ROLE_UNSPECIFIED), false otherwise
     *
     * @example
     * <pre>{@code
     * boolean validAndSpecified = RoleUtils.roleIsValidAndSpecified(Role.ROLE_IAM_ADMIN);        // true
     * boolean unspecified = RoleUtils.roleIsValidAndSpecified(Role.ROLE_UNSPECIFIED);            // false
     * }</pre>
     */
    public static boolean roleIsValidAndSpecified(RoleOuterClass.Role role) {
        return roleIsValid(role) && role != RoleOuterClass.Role.ROLE_UNSPECIFIED;
    }

    /**
     * Creates a full resource name for a role with validation.
     *
     * <p>This method validates that the role is valid and specified before constructing
     * the full resource name. The group parameter must be in the format "groups/{groupID}".
     *
         *
     * @param role The role enum value
     * @param group The group resource name (e.g., "groups/01DD32GZ7R0000000000000001")
     * @return Full resource name string (e.g., "groups/01DD32GZ7R0000000000000001/5")
     * @throws IllegalArgumentException if role is invalid/unspecified or group format is invalid
     *
     * @example
     * <pre>{@code
     * String resourceName = RoleUtils.roleFullResourceNameFromGroup(
     *     Role.ROLE_IAM_ADMIN,
     *     "groups/01DD32GZ7R0000000000000001"
     * );
     * // Result: "groups/01DD32GZ7R0000000000000001/5"
     * }</pre>
     */
    public static String roleFullResourceNameFromGroup(RoleOuterClass.Role role, String group) {
        if (!roleIsValidAndSpecified(role)) {
            throw new IllegalArgumentException("Role must be valid and specified, got: " + role);
        }
        if (group == null || group.isEmpty()) {
            throw new IllegalArgumentException("Group cannot be null or empty");
        }
        if (!group.startsWith("groups/")) {
            throw new IllegalArgumentException(
                String.format("Invalid group format, expected groups/{groupID}, got: %s", group)
            );
        }
        String groupId = group.substring(7); // Remove "groups/" prefix
        if (groupId.isEmpty()) {
            throw new IllegalArgumentException("Group ID cannot be empty in group resource name: " + group);
        }
        return String.format("%s/%d", group, role.getNumber());
    }

    /**
     * Parses a Role enum from a full resource name.
     *
     * <p>The full resource name should be in the format "groups/{groupID}/{roleNumber}".
     *
         *
     * @param fullResourceName The full resource name (e.g., "groups/01DD32GZ7R0000000000000001/5")
     * @return The Role enum value
     * @throws IllegalArgumentException if parsing fails or role is invalid
     *
     * @example
     * <pre>{@code
     * Role role = RoleUtils.roleFromFullResourceName("groups/01DD32GZ7R0000000000000001/5");
     * // Result: Role.ROLE_IAM_ADMIN (assuming 5 is IAM_ADMIN's enum number)
     * }</pre>
     */
    public static RoleOuterClass.Role roleFromFullResourceName(String fullResourceName) {
        RoleParts parts = parseRoleParts(fullResourceName);
        return parts.role();
    }

    /**
     * Parses a full resource name into group and role components.
     *
     * <p>Validates the format "groups/{groupID}/{roleNumber}" and ensures the role
     * is a valid and specified enum value.
     *
         *
     * @param roleFullResourceName The full resource name
     * @return RoleParts containing group and role
     * @throws IllegalArgumentException if parsing fails or validation errors occur
     *
     * @example
     * <pre>{@code
     * RoleParts parts = RoleUtils.parseRoleParts("groups/01DD32GZ7R0000000000000001/5");
     * String group = parts.group();  // "groups/01DD32GZ7R0000000000000001"
     * Role role = parts.role();      // Role.ROLE_IAM_ADMIN
     * }</pre>
     */
    public static RoleParts parseRoleParts(String roleFullResourceName) {
        if (roleFullResourceName == null || roleFullResourceName.isEmpty()) {
            throw new IllegalArgumentException("Role full resource name cannot be null or empty");
        }

        String[] parts = roleFullResourceName.split("/");
        if (parts.length != 3 || !"groups".equals(parts[0])) {
            throw new IllegalArgumentException(
                String.format("Invalid role format, expected groups/{groupID}/{role}, got %s", roleFullResourceName)
            );
        }

        String groupId = parts[1];
        if (groupId.isEmpty()) {
            throw new IllegalArgumentException("Group ID cannot be empty in role resource name");
        }

        // Validate ULID format for proper validation
        if (!isValidULIDFormat(groupId)) {
            throw new IllegalArgumentException(
                String.format("Group ID is not a valid ULID format: %s", groupId)
            );
        }

        String group = "groups/" + groupId;
        String roleNumberStr = parts[2];

        int roleNumber;
        try {
            roleNumber = Integer.parseInt(roleNumberStr);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Error parsing role enum value '" + roleNumberStr + "'", e);
        }

        RoleOuterClass.Role role = RoleOuterClass.Role.forNumber(roleNumber);
        if (!roleIsValidAndSpecified(role)) {
            throw new IllegalArgumentException("Parsed role enum value '" + roleNumber + "' is not valid");
        }

        return new RoleParts(group, role);
    }

    /**
     * Creates a full resource name for a role within a specific group.
     * 
         * and Python's full_resource_name_from_group_name() function.
     * 
     * @param role The Role enum value (e.g., Role.ROLE_IAM_ADMIN)
     * @param groupName The group name (e.g., "groups/01DD32GZ7R0000000000000001")
     * @return The full resource name string (e.g., "groups/01DD32GZ7R0000000000000001/5")
     * 
     * @example
     * String roleName = RoleUtils.fullResourceNameFromGroupName(Role.ROLE_IAM_ADMIN, "groups/01DD32GZ7R0000000000000001");
     * // Result: "groups/01DD32GZ7R0000000000000001/5"
     */
    public static String fullResourceNameFromGroupName(RoleOuterClass.Role role, String groupName) {
        return String.format("%s/%d", groupName, role.getNumber());
    }
    
    /**
     * Creates a full resource name for a role within a specific group using group ID.
     * 
         * 
     * @param role The Role enum value (e.g., Role.ROLE_IAM_ADMIN)
     * @param groupId The group ID (e.g., "01DD32GZ7R0000000000000001")
     * @return The full resource name string (e.g., "groups/01DD32GZ7R0000000000000001/5")
     */
    public static String fullResourceNameFromGroupId(RoleOuterClass.Role role, String groupId) {
        return String.format("groups/%s/%d", groupId, role.getNumber());
    }

    /**
     * Validates whether a string conforms to ULID format specification.
     *
     * <p>ULIDs (Universally Unique Lexicographically Sortable Identifiers) must be:
     * <ul>
     *   <li>Exactly 26 characters long</li>
     *   <li>Contain only Crockford Base32 characters (0-9, A-Z excluding I, L, O, U)</li>
     * </ul>
     *
     * <p>This validation ensures proper ULID format compliance,
     * which uses {@code ulid.Parse()} for validation.
     *
     * @param ulid The string to validate as a ULID
     * @return true if the string is a valid ULID format, false otherwise
     */
    private static boolean isValidULIDFormat(String ulid) {
        if (ulid == null || ulid.length() != 26) {
            return false;
        }

        // Crockford Base32 alphabet (0-9, A-Z excluding I, L, O, U)
        // Case-insensitive validation as ULIDs can be uppercase or lowercase
        String validChars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
        for (char c : ulid.toUpperCase().toCharArray()) {
            if (validChars.indexOf(c) == -1) {
                return false;
            }
        }
        return true;
    }
}