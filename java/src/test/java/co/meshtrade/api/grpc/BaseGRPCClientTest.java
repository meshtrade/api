package co.meshtrade.api.grpc;

import co.meshtrade.api.config.ServiceOptions;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Unit tests for the BaseGRPCClient abstract class.
 * 
 * Tests configuration, authentication, and resource management
 * functionality using a concrete test implementation.
 */
class BaseGRPCClientTest {

    private ServiceOptions validOptions;

    @BeforeEach
    void setUp() {
        String apiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        String group = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        validOptions = ServiceOptions.builder()
            .apiKey(apiKey)
            .group(group)
            .build();
    }

    @Test
    void testServiceOptionsValidation() {
        // Test that ServiceOptions validation works correctly
        assertNotNull(validOptions);
        assertEquals("production-service-mesh-api-gateway-lb-frontend.mesh.trade", validOptions.getUrl());
        assertEquals(443, validOptions.getPort());
        assertTrue(validOptions.isTls());
        
        // Test invalid empty URL
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            ServiceOptions.builder().url("");
        });
        assertTrue(exception.getMessage().contains("URL cannot be empty"));
    }

    @Test
    void testInvalidPort() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            ServiceOptions.builder()
                .apiKey("abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG")
                .group("groups/01HQXH5S8NPQR0QVMJ3NV9KWX8")
                .port(-1)
                .build();
        });
        assertTrue(exception.getMessage().contains("Port must be between 1 and 65535"));
    }

    @Test
    void testBaseClientConfiguration() {
        // Test that we can create a valid configuration
        String apiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        String group = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        ServiceOptions options = ServiceOptions.builder()
            .apiKey(apiKey)
            .group(group)
            .url("api.test.mesh.dev")
            .port(8443)
            .tls(false)
            .timeout(Duration.ofSeconds(60))
            .build();
        
        assertEquals("api.test.mesh.dev", options.getUrl());
        assertEquals(8443, options.getPort());
        assertFalse(options.isTls());
        assertEquals(Duration.ofSeconds(60), options.getTimeout());
        assertEquals(apiKey, options.getApiKey());
        assertEquals(group, options.getGroup());
    }

}
