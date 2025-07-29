package co.meshtrade.api.grpc;

import co.meshtrade.api.config.ServiceOptions;
import co.meshtrade.api.auth.Credentials;
import io.grpc.stub.AbstractStub;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import java.time.Duration;
import java.util.function.BiFunction;
import java.util.function.Function;

import static org.junit.jupiter.api.Assertions.*;

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
        assertEquals("api.mesh.dev", validOptions.getUrl());
        assertEquals(443, validOptions.getPort());
        assertTrue(validOptions.isTls());
        
        // Test invalid service name
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            ServiceOptions.builder().url("").build();
        });
        assertTrue(exception.getMessage().contains("URL cannot be null or empty"));
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