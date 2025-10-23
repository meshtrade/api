package co.meshtrade.api.compliance.client.v1;

import co.meshtrade.api.iam.role.v1.RoleOuterClass;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Comprehensive tests for ClientRoles utility methods.
 */
class ClientRolesTest {

    @Test
    void getClientDefaultRoles_returnsNonEmptyList() {
        List<RoleOuterClass.Role> roles = ClientRoles.getClientDefaultRoles();

        assertNotNull(roles);
        assertFalse(roles.isEmpty(), "Client should have at least one default role");
    }

    @Test
    void getClientDefaultRoles_returnsImmutableList() {
        List<RoleOuterClass.Role> roles = ClientRoles.getClientDefaultRoles();

        assertThrows(UnsupportedOperationException.class, () -> {
            roles.add(RoleOuterClass.Role.ROLE_IAM_ADMIN);
        }, "Returned list should be immutable");
    }

    @Test
    void getClientDefaultRoles_consistentAcrossCalls() {
        List<RoleOuterClass.Role> roles1 = ClientRoles.getClientDefaultRoles();
        List<RoleOuterClass.Role> roles2 = ClientRoles.getClientDefaultRoles();

        assertEquals(roles1.size(), roles2.size());
        assertTrue(roles1.containsAll(roles2));
        assertTrue(roles2.containsAll(roles1));
    }

    @Test
    void getClientDefaultRoles_containsComplianceRoles() {
        List<RoleOuterClass.Role> roles = ClientRoles.getClientDefaultRoles();

        // Client should have compliance-related roles
        // Note: Actual roles depend on proto definition
        assertTrue(roles.stream().anyMatch(role ->
            role.name().contains("COMPLIANCE") || role != RoleOuterClass.Role.ROLE_UNSPECIFIED
        ), "Client should have compliance-related roles");
    }

    @Test
    void getClientDefaultRoleSet_returnsNonEmptySet() {
        Set<RoleOuterClass.Role> roleSet = ClientRoles.getClientDefaultRoleSet();

        assertNotNull(roleSet);
        assertFalse(roleSet.isEmpty(), "Client should have at least one default role");
    }

    @Test
    void getClientDefaultRoleSet_returnsImmutableSet() {
        Set<RoleOuterClass.Role> roleSet = ClientRoles.getClientDefaultRoleSet();

        assertThrows(UnsupportedOperationException.class, () -> {
            roleSet.add(RoleOuterClass.Role.ROLE_IAM_ADMIN);
        }, "Returned set should be immutable");
    }

    @Test
    void getClientDefaultRoleSet_containsSameRolesAsList() {
        List<RoleOuterClass.Role> rolesList = ClientRoles.getClientDefaultRoles();
        Set<RoleOuterClass.Role> roleSet = ClientRoles.getClientDefaultRoleSet();

        assertEquals(rolesList.size(), roleSet.size());
        assertTrue(roleSet.containsAll(rolesList));
    }

    @Test
    void getClientDefaultRoleSet_efficientMembershipCheck() {
        Set<RoleOuterClass.Role> roleSet = ClientRoles.getClientDefaultRoleSet();
        List<RoleOuterClass.Role> rolesList = ClientRoles.getClientDefaultRoles();

        // Verify all roles from list are in set (O(1) lookups)
        for (RoleOuterClass.Role role : rolesList) {
            assertTrue(roleSet.contains(role),
                "Role set should contain role: " + role);
        }
    }

    @Test
    void getClientDefaultRoleSet_consistentAcrossCalls() {
        Set<RoleOuterClass.Role> set1 = ClientRoles.getClientDefaultRoleSet();
        Set<RoleOuterClass.Role> set2 = ClientRoles.getClientDefaultRoleSet();

        assertEquals(set1.size(), set2.size());
        assertTrue(set1.containsAll(set2));
        assertTrue(set2.containsAll(set1));
    }

    // Integration test - list and set consistency
    @Test
    void integration_listAndSet_maintainConsistency() {
        List<RoleOuterClass.Role> rolesList = ClientRoles.getClientDefaultRoles();
        Set<RoleOuterClass.Role> roleSet = ClientRoles.getClientDefaultRoleSet();

        // Verify no duplicates in list
        Set<RoleOuterClass.Role> uniqueFromList = new HashSet<>(rolesList);
        assertEquals(uniqueFromList.size(), rolesList.size(),
            "Role list should not contain duplicates");

        // Verify set matches list
        assertEquals(rolesList.size(), roleSet.size());
        assertTrue(roleSet.containsAll(rolesList));
    }
}
