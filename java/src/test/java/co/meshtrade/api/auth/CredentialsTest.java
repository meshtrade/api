package co.meshtrade.api.auth;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for the Credentials record class.
 * 
 * Tests validation of API key and group formats according to
 * the Meshtrade API credential requirements.
 */
class CredentialsTest {

    @Test
    void testValidCredentials() {
        // Valid API key (43 characters, base64 URL-safe) and group (groups/{26-char-ULID})
        String validApiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        String validGroup = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        assertDoesNotThrow(() -> {
            Credentials credentials = new Credentials(validApiKey, validGroup);
            assertEquals(validApiKey, credentials.apiKey());
            assertEquals(validGroup, credentials.group());
        });
    }

    @Test
    void testInvalidApiKeyTooShort() {
        String shortApiKey = "short";
        String validGroup = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            new Credentials(shortApiKey, validGroup);
        });
        assertTrue(exception.getMessage().contains("API key must be exactly 43 characters"));
    }

    @Test
    void testInvalidApiKeyTooLong() {
        String longApiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGtoolong";
        String validGroup = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            new Credentials(longApiKey, validGroup);
        });
        assertTrue(exception.getMessage().contains("API key must be exactly 43 characters"));
    }

    @Test
    void testInvalidGroupFormat() {
        String validApiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        String invalidGroup = "invalid-group-format";
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            new Credentials(validApiKey, invalidGroup);
        });
        assertTrue(exception.getMessage().contains("Group must be in format 'groups/{group_id}'"));
    }

    @Test
    void testNullApiKey() {
        String validGroup = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        NullPointerException exception = assertThrows(NullPointerException.class, () -> {
            new Credentials(null, validGroup);
        });
        assertTrue(exception.getMessage().contains("API key cannot be null"));
    }

    @Test
    void testEmptyApiKey() {
        String validGroup = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            new Credentials("", validGroup);
        });
        assertTrue(exception.getMessage().contains("API key cannot be empty"));
    }

    @Test
    void testNullGroup() {
        String validApiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        
        NullPointerException exception = assertThrows(NullPointerException.class, () -> {
            new Credentials(validApiKey, null);
        });
        assertTrue(exception.getMessage().contains("Group cannot be null"));
    }

    @Test
    void testEmptyGroup() {
        String validApiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            new Credentials(validApiKey, "");
        });
        assertTrue(exception.getMessage().contains("Group cannot be empty"));
    }

    @Test
    void testToString() {
        String validApiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        String validGroup = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        Credentials credentials = new Credentials(validApiKey, validGroup);
        String toString = credentials.toString();
        
        // toString should not expose the full API key for security
        assertFalse(toString.contains(validApiKey));
        assertTrue(toString.contains("abcdefgh...DEFG"));  // Masked format
        assertTrue(toString.contains(validGroup));
    }

    @Test
    void testEquals() {
        String apiKey = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG";
        String group = "groups/01HQXH5S8NPQR0QVMJ3NV9KWX8";
        
        Credentials credentials1 = new Credentials(apiKey, group);
        Credentials credentials2 = new Credentials(apiKey, group);
        
        assertEquals(credentials1, credentials2);
        assertEquals(credentials1.hashCode(), credentials2.hashCode());
    }
}