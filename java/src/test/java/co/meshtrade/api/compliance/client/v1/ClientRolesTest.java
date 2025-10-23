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

        // Should contain at least one compliance-related role
        boolean hasComplianceRole = roles.stream()
            .anyMatch(role -> role.name().contains("COMPLIANCE"));

        assertTrue(hasComplianceRole,
            "Client should have at least one compliance-related role. Found: " + roles);

        // Should not contain UNSPECIFIED
        assertFalse(roles.contains(RoleOuterClass.Role.ROLE_UNSPECIFIED),
            "Client roles should not contain ROLE_UNSPECIFIED");
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

    // Thread-safety test
    @Test
    void threadSafety_concurrentAccess_cachesCorrectly() throws Exception {
        int threadCount = 10;
        java.util.concurrent.CountDownLatch startLatch = new java.util.concurrent.CountDownLatch(1);
        java.util.concurrent.CountDownLatch doneLatch = new java.util.concurrent.CountDownLatch(threadCount);
        java.util.concurrent.ExecutorService executor = java.util.concurrent.Executors.newFixedThreadPool(threadCount);

        java.util.List<java.util.concurrent.Future<List<RoleOuterClass.Role>>> futures = new java.util.ArrayList<>();

        try {
            for (int i = 0; i < threadCount; i++) {
                futures.add(executor.submit(() -> {
                    try {
                        startLatch.await(); // All threads start simultaneously
                        return ClientRoles.getClientDefaultRoles();
                    } finally {
                        doneLatch.countDown();
                    }
                }));
            }

            // Release all threads at once
            startLatch.countDown();

            // Wait for all threads to complete
            assertTrue(doneLatch.await(5, java.util.concurrent.TimeUnit.SECONDS),
                "All threads should complete within 5 seconds");

            // All threads should get the same cached instance
            List<RoleOuterClass.Role> first = futures.get(0).get();
            assertNotNull(first, "First result should not be null");

            for (java.util.concurrent.Future<List<RoleOuterClass.Role>> future : futures) {
                List<RoleOuterClass.Role> result = future.get();
                assertSame(first, result, "All threads should get same cached instance");
            }
        } finally {
            executor.shutdown();
            assertTrue(executor.awaitTermination(5, java.util.concurrent.TimeUnit.SECONDS),
                "Executor should terminate within 5 seconds");
        }
    }

    // Thread-safety test for role set
    @Test
    void threadSafety_concurrentAccessRoleSet_cachesCorrectly() throws Exception {
        int threadCount = 10;
        java.util.concurrent.CountDownLatch startLatch = new java.util.concurrent.CountDownLatch(1);
        java.util.concurrent.CountDownLatch doneLatch = new java.util.concurrent.CountDownLatch(threadCount);
        java.util.concurrent.ExecutorService executor = java.util.concurrent.Executors.newFixedThreadPool(threadCount);

        java.util.List<java.util.concurrent.Future<Set<RoleOuterClass.Role>>> futures = new java.util.ArrayList<>();

        try {
            for (int i = 0; i < threadCount; i++) {
                futures.add(executor.submit(() -> {
                    try {
                        startLatch.await(); // All threads start simultaneously
                        return ClientRoles.getClientDefaultRoleSet();
                    } finally {
                        doneLatch.countDown();
                    }
                }));
            }

            // Release all threads at once
            startLatch.countDown();

            // Wait for all threads to complete
            assertTrue(doneLatch.await(5, java.util.concurrent.TimeUnit.SECONDS),
                "All threads should complete within 5 seconds");

            // All threads should get the same cached instance
            Set<RoleOuterClass.Role> first = futures.get(0).get();
            assertNotNull(first, "First result should not be null");

            for (java.util.concurrent.Future<Set<RoleOuterClass.Role>> future : futures) {
                Set<RoleOuterClass.Role> result = future.get();
                assertSame(first, result, "All threads should get same cached instance");
            }
        } finally {
            executor.shutdown();
            assertTrue(executor.awaitTermination(5, java.util.concurrent.TimeUnit.SECONDS),
                "Executor should terminate within 5 seconds");
        }
    }
}
