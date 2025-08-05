package co.meshtrade.api.iam.role.v1;

/**
 * Utility methods for working with IAM roles.
 * 
 * This class provides helper methods for role resource name generation,
 * following the same patterns as the Go and Python implementations.
 */
public final class RoleUtils {
    
    private RoleUtils() {
        // Utility class - prevent instantiation
    }
    
    /**
     * Creates a full resource name for a role within a specific group.
     * 
     * This method provides the Java equivalent of Go's Role.FullResourceNameFromGroupName() method
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
     * This method provides the Java equivalent of Go's Role.FullResourceNameFromGroupID() method.
     * 
     * @param role The Role enum value (e.g., Role.ROLE_IAM_ADMIN)
     * @param groupId The group ID (e.g., "01DD32GZ7R0000000000000001")
     * @return The full resource name string (e.g., "groups/01DD32GZ7R0000000000000001/5")
     */
    public static String fullResourceNameFromGroupId(RoleOuterClass.Role role, String groupId) {
        return String.format("groups/%s/%d", groupId, role.getNumber());
    }
}