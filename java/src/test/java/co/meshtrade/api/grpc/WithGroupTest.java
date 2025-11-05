package co.meshtrade.api.grpc;

import co.meshtrade.api.config.ServiceOptions;
import co.meshtrade.api.iam.group.v1.GroupService;
import co.meshtrade.api.iam.group.v1.GroupServiceInterface;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Integration tests for withGroup method functionality.
 *
 * Verifies that withGroup creates independent client instances
 * with correct group context switching while preserving other configuration.
 */
class WithGroupTest {

    private ServiceOptions initialOptions;
    private static final String INITIAL_GROUP = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
    private static final String ALTERNATIVE_GROUP = "groups/01ARZ3NDEKTSV4RRFFQ69G5FAV";

    @BeforeEach
    void setUp() {
        String apiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";

        initialOptions = ServiceOptions.builder()
            .apiKey(apiKey)
            .group(INITIAL_GROUP)
            .url("localhost")
            .port(50051)
            .timeout(Duration.ofSeconds(30))
            .tls(false)
            .build();
    }

    @Test
    void testWithGroupCreatesNewClientWithDifferentGroup() throws Exception {
        // Create initial client with default group
        GroupService service = new GroupService(initialOptions);

        // Verify initial group
        assertEquals(INITIAL_GROUP, service.getOptions().getGroup());

        // Create new client with different group
        GroupServiceInterface altService = service.withGroup(ALTERNATIVE_GROUP);

        // Verify new client has different group
        assertEquals(ALTERNATIVE_GROUP, ((GroupService) altService).getOptions().getGroup());

        // Verify original client unchanged
        assertEquals(INITIAL_GROUP, service.getOptions().getGroup());

        // Cleanup
        service.close();
        altService.close();
    }

    @Test
    void testWithGroupClientsAreIndependent() throws Exception {
        // Create initial client
        GroupService client1 = new GroupService(initialOptions);
        GroupServiceInterface client2 = client1.withGroup(ALTERNATIVE_GROUP);

        // Close client1 - should not affect client2
        client1.close();

        // Verify client2 still has correct configuration
        assertNotNull(((GroupService) client2).getOptions());
        assertEquals(ALTERNATIVE_GROUP, ((GroupService) client2).getOptions().getGroup());

        // Cleanup
        client2.close();
    }

    @Test
    void testWithGroupPreservesOtherConfiguration() throws Exception {
        // Create initial client with custom configuration
        // API key must be 43-44 characters (base64 URL-safe)
        String validApiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        ServiceOptions customOptions = ServiceOptions.builder()
            .url("custom.example.com")
            .port(8443)
            .apiKey(validApiKey)
            .group(INITIAL_GROUP)
            .timeout(Duration.ofSeconds(45))
            .tls(true)
            .build();

        GroupService service = new GroupService(customOptions);
        GroupServiceInterface altService = service.withGroup(ALTERNATIVE_GROUP);

        // Verify all configuration preserved except group
        ServiceOptions altOptions = ((GroupService) altService).getOptions();
        assertEquals("custom.example.com", altOptions.getUrl());
        assertEquals(8443, altOptions.getPort());
        assertEquals(validApiKey, altOptions.getApiKey());
        assertEquals(ALTERNATIVE_GROUP, altOptions.getGroup());
        assertEquals(Duration.ofSeconds(45), altOptions.getTimeout());
        assertTrue(altOptions.isTls());

        // Cleanup
        service.close();
        altService.close();
    }
}
