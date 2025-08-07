package co.meshtrade.api.config;

import co.meshtrade.api.auth.Credentials;
import org.junit.jupiter.api.Test;
import java.time.Duration;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the ServiceOptions builder pattern.
 * 
 * Tests configuration validation and default value handling
 * for Meshtrade API service connections.
 */
class ServiceOptionsTest {

    @Test
    void testDefaultConfigurationWithCredentials() {
        // Test default configuration when credentials are provided
        String apiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        String group = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        ServiceOptions options = ServiceOptions.builder()
            .apiKey(apiKey)
            .group(group)
            .build();
        
        assertEquals("api.mesh.dev", options.getUrl());
        assertEquals(443, options.getPort());
        assertTrue(options.isTls());
        assertEquals(Duration.ofSeconds(30), options.getTimeout());
        assertEquals(apiKey, options.getApiKey());
        assertEquals(group, options.getGroup());
    }

    @Test
    void testCustomConfiguration() {
        String apiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        String group = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        ServiceOptions options = ServiceOptions.builder()
            .url("api.staging.mesh.dev")
            .port(8443)
            .tls(false)
            .timeout(Duration.ofSeconds(60))
            .apiKey(apiKey)
            .group(group)
            .build();
        
        assertEquals("api.staging.mesh.dev", options.getUrl());
        assertEquals(8443, options.getPort());
        assertFalse(options.isTls());
        assertEquals(Duration.ofSeconds(60), options.getTimeout());
        
        assertEquals(apiKey, options.getApiKey());
        assertEquals(group, options.getGroup());
    }

    @Test
    void testCredentialsFromBuilder() {
        String apiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        String group = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        ServiceOptions options = ServiceOptions.builder()
            .apiKey(apiKey)
            .group(group)
            .build();
        
        assertEquals(apiKey, options.getApiKey());
        assertEquals(group, options.getGroup());
    }

    @Test
    void testInvalidUrl() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            ServiceOptions.builder()
                .url("");
        });
        assertTrue(exception.getMessage().contains("URL cannot be empty"));
    }

    @Test
    void testInvalidPort() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            ServiceOptions.builder()
                .port(-1)
                .build();
        });
        assertTrue(exception.getMessage().contains("Port must be between 1 and 65535"));
    }

    @Test
    void testInvalidPortTooHigh() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            ServiceOptions.builder()
                .port(70000)
                .build();
        });
        assertTrue(exception.getMessage().contains("Port must be between 1 and 65535"));
    }

    @Test
    void testInvalidTimeout() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            ServiceOptions.builder()
                .timeout(Duration.ofSeconds(-1))
                .build();
        });
        assertTrue(exception.getMessage().contains("Timeout must be positive"));
    }

    @Test
    void testNullTimeout() {
        NullPointerException exception = assertThrows(NullPointerException.class, () -> {
            ServiceOptions.builder()
                .timeout(null);
        });
        assertTrue(exception.getMessage().contains("Timeout cannot be null"));
    }

    @Test
    void testBuilderImmutability() {
        String apiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        String group = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        ServiceOptions.Builder builder = ServiceOptions.builder()
            .apiKey(apiKey)
            .group(group);
        builder.url("api.staging.mesh.dev");
        
        ServiceOptions options1 = builder.build();
        builder.url("api.prod.mesh.dev");
        ServiceOptions options2 = builder.build();
        
        // Second build should not affect first options
        assertEquals("api.staging.mesh.dev", options1.getUrl());
        assertEquals("api.prod.mesh.dev", options2.getUrl());
    }

    @Test
    void testToString() {
        String apiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        String group = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        ServiceOptions options = ServiceOptions.builder()
            .url("api.test.mesh.dev")
            .apiKey(apiKey)
            .group(group)
            .build();
        
        String toString = options.toString();
        
        // Should contain URL and group but not the full API key for security
        assertTrue(toString.contains("api.test.mesh.dev"));
        assertFalse(toString.contains(apiKey));
        assertTrue(toString.contains("groups/01HQXH5S8NPQR0QVMJ3NV9KWX8"));
    }

    @Test
    void testCredentialValues() {
        String apiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG"; // Exactly 43 chars
        String group = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        ServiceOptions options = ServiceOptions.builder()
            .apiKey(apiKey)
            .group(group)
            .build();
        
        assertEquals(apiKey, options.getApiKey());
        assertEquals(group, options.getGroup());
    }
}