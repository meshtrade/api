package co.meshtrade.api.auth;

/**
 * Authentication constants for gRPC metadata headers and environment variables.
 *
 * <p>These constants define the standard header keys used for authentication
 * and authorization in Mesh API gRPC calls, as well as environment variable names
 * for credentials configuration.
 */
public final class AuthConstants {

    private AuthConstants() {
        throw new UnsupportedOperationException("Constants class cannot be instantiated");
    }

    /**
     * The gRPC metadata header key for API key authentication.
     *
     * <p>Clients should include their API key in this header when making authenticated requests.
     */
    public static final String API_KEY_HEADER = "x-api-key";

    /**
     * The gRPC metadata header key for specifying the group context.
     *
     * <p>This header is used to specify which group the request is being made on behalf of.
     */
    public static final String GROUP_HEADER_KEY = "x-group";

    /**
     * The environment variable name for Mesh API credentials file path.
     *
     * <p>This environment variable can be used to specify the location of
     * API credentials configuration for client authentication. The credentials
     * file should be a JSON file containing api_key and group fields.
     *
     * <p><b>Example usage:</b>
     * <pre>{@code
     * export MESH_API_CREDENTIALS=/path/to/credentials.json
     * }</pre>
     */
    public static final String MESH_API_CREDENTIALS_ENV_VAR = "MESH_API_CREDENTIALS";
}
