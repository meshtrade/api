package co.meshtrade.api.auth;

import java.util.Objects;

/**
 * Immutable record representing API credentials for Meshtrade services.
 * 
 * <p>This record encapsulates the API key and group ID required for authenticating
 * with Meshtrade services. Both fields are required and are used to generate
 * the appropriate authentication headers for gRPC requests.
 * 
 * <p>The API key is used for Bearer token authentication, while the group ID
 * specifies the organizational context for API operations and resource scoping.
 * 
 * <h2>Example</h2>
 * <pre>{@code
 * Credentials creds = new Credentials("your-api-key", "groups/your-group-id");
 * 
 * String apiKey = creds.apiKey();     // "your-api-key"
 * String group = creds.group();       // "groups/your-group-id"
 * }</pre>
 * 
 * @param apiKey the API key for Bearer token authentication (43 characters, base64 URL-safe)
 * @param group the group resource name in format "groups/{group_id}"
 * 
 * @see CredentialsDiscovery
 * @see <a href="https://meshtrade.github.io/api/docs/architecture/authentication">Authentication Guide</a>
 */
public record Credentials(String apiKey, String group) {
    
    /**
     * Creates a new Credentials instance with validation.
     * 
     * @param apiKey the API key for Bearer token authentication
     * @param group the group resource name
     * @throws NullPointerException if either parameter is null
     * @throws IllegalArgumentException if either parameter is empty or invalid
     */
    public Credentials {
        Objects.requireNonNull(apiKey, "API key cannot be null");
        Objects.requireNonNull(group, "Group cannot be null");
        
        if (apiKey.trim().isEmpty()) {
            throw new IllegalArgumentException("API key cannot be empty");
        }
        
        if (group.trim().isEmpty()) {
            throw new IllegalArgumentException("Group cannot be empty");
        }
        
        // Validate API key format (43 characters, base64 URL-safe)
        if (apiKey.length() != 43) {
            throw new IllegalArgumentException("API key must be exactly 43 characters long");
        }
        
        if (!apiKey.matches("^[A-Za-z0-9_-]{43}$")) {
            throw new IllegalArgumentException("API key must be base64 URL-safe encoded (A-Z, a-z, 0-9, _, -)");
        }
        
        // Validate group format (groups/{group_id})
        if (!group.startsWith("groups/")) {
            throw new IllegalArgumentException("Group must be in format 'groups/{group_id}'");
        }
        
        String groupId = group.substring("groups/".length());
        if (groupId.isEmpty()) {
            throw new IllegalArgumentException("Group ID cannot be empty");
        }
        
        // Validate group ID format (typically ULID - 26 characters)
        if (!groupId.matches("^[0-9A-Z]{26}$")) {
            throw new IllegalArgumentException("Group ID must be a valid ULID (26 uppercase alphanumeric characters)");
        }
    }
    
    /**
     * Returns the API key for Bearer token authentication.
     * 
     * <p>This key should be included in the Authorization header as:
     * {@code Authorization: Bearer {apiKey}}
     * 
     * @return the API key (43 characters, base64 URL-safe encoded)
     */
    @Override
    public String apiKey() {
        return apiKey;
    }
    
    /**
     * Returns the group resource name for organizational context.
     * 
     * <p>This value should be included in the x-group header for all requests
     * to specify the organizational context for API operations.
     * 
     * @return the group resource name in format "groups/{group_id}"
     */
    @Override
    public String group() {
        return group;
    }
    
    /**
     * Checks if these credentials are valid based on format requirements.
     * 
     * <p>This method performs the same validation as the constructor and
     * returns true if the credentials would pass validation.
     * 
     * @return true if credentials are valid, false otherwise
     */
    public boolean isValid() {
        try {
            // Create a new instance to trigger validation
            new Credentials(apiKey, group);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Returns a string representation suitable for debugging.
     * 
     * <p><strong>Security Note:</strong> This method masks the API key for security.
     * Only the first 8 and last 4 characters are shown.
     * 
     * @return a safe string representation for logging/debugging
     */
    @Override
    public String toString() {
        String maskedApiKey = apiKey.substring(0, 8) + "..." + apiKey.substring(39);
        return String.format("Credentials{apiKey=%s, group=%s}", maskedApiKey, group);
    }
    
    /**
     * Creates a new Credentials instance from individual components.
     * 
     * <p>This factory method provides an alternative to the record constructor
     * with more descriptive parameter names.
     * 
     * @param apiKey the API key for authentication
     * @param groupId the group ID (without the "groups/" prefix)
     * @return a new Credentials instance
     * @throws IllegalArgumentException if parameters are invalid
     */
    public static Credentials of(String apiKey, String groupId) {
        Objects.requireNonNull(groupId, "Group ID cannot be null");
        return new Credentials(apiKey, "groups/" + groupId);
    }
}