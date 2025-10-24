package co.meshtrade.api.auth;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

/**
 * Unit tests for AuthConstants.
 */
class AuthConstantsTest {

    @Test
    void apiKeyHeaderHasExpectedValue() {
        assertEquals("x-api-key", AuthConstants.API_KEY_HEADER);
        assertNotNull(AuthConstants.API_KEY_HEADER);
        assertFalse(AuthConstants.API_KEY_HEADER.isEmpty());
    }

    @Test
    void groupHeaderKeyHasExpectedValue() {
        assertEquals("x-group", AuthConstants.GROUP_HEADER_KEY);
        assertNotNull(AuthConstants.GROUP_HEADER_KEY);
        assertFalse(AuthConstants.GROUP_HEADER_KEY.isEmpty());
    }

    @Test
    void meshApiCredentialsEnvVarHasExpectedValue() {
        assertEquals("MESH_API_CREDENTIALS", AuthConstants.MESH_API_CREDENTIALS_ENV_VAR);
        assertNotNull(AuthConstants.MESH_API_CREDENTIALS_ENV_VAR);
        assertFalse(AuthConstants.MESH_API_CREDENTIALS_ENV_VAR.isEmpty());
    }

    @Test
    void constructorThrowsUnsupportedOperationException() {
        try {
            // Use reflection to invoke private constructor
            var constructor = AuthConstants.class.getDeclaredConstructor();
            constructor.setAccessible(true);
            constructor.newInstance();
            fail("Constructor should throw UnsupportedOperationException");
        } catch (Exception e) {
            // Reflection wraps the exception in InvocationTargetException
            assertTrue(e.getCause() instanceof UnsupportedOperationException,
                "Constructor should throw UnsupportedOperationException, got: " + e.getCause());
        }
    }

    @Test
    void constantsAreNotNull() {
        assertNotNull(AuthConstants.API_KEY_HEADER, "API_KEY_HEADER should not be null");
        assertNotNull(AuthConstants.GROUP_HEADER_KEY, "GROUP_HEADER_KEY should not be null");
        assertNotNull(AuthConstants.MESH_API_CREDENTIALS_ENV_VAR, "MESH_API_CREDENTIALS_ENV_VAR should not be null");
    }

    @Test
    void constantsAreLowerCaseForHeaders() {
        // gRPC metadata keys should be lowercase
        assertEquals(AuthConstants.API_KEY_HEADER.toLowerCase(), AuthConstants.API_KEY_HEADER,
            "API_KEY_HEADER should be lowercase for gRPC metadata");
        assertEquals(AuthConstants.GROUP_HEADER_KEY.toLowerCase(), AuthConstants.GROUP_HEADER_KEY,
            "GROUP_HEADER_KEY should be lowercase for gRPC metadata");
    }

    @Test
    void constantsAreUpperCaseForEnvVar() {
        // Environment variables should be uppercase
        assertEquals(AuthConstants.MESH_API_CREDENTIALS_ENV_VAR.toUpperCase(),
                AuthConstants.MESH_API_CREDENTIALS_ENV_VAR,
                "MESH_API_CREDENTIALS_ENV_VAR should be uppercase for environment variable");
    }
}
