package co.meshtrade.api.config;

import java.time.Duration;
import java.util.Objects;

import co.meshtrade.api.auth.Credentials;
import co.meshtrade.api.auth.CredentialsDiscovery;

/**
 * Configuration options for Meshtrade API service clients.
 * 
 * <p>This class provides a builder pattern for configuring gRPC service clients
 * with custom connection settings, authentication parameters, timeouts, and other
 * options. If authentication parameters are not explicitly provided, the builder
 * will attempt to discover them automatically using {@link CredentialsDiscovery}.
 * 
 * <h2>Default Values</h2>
 * <ul>
 * <li><strong>URL:</strong> {@code production-service-mesh-api-gateway-lb-frontend.mesh.trade}</li>
 * <li><strong>Port:</strong> {@code 443}</li>
 * <li><strong>TLS:</strong> {@code true}</li>
 * <li><strong>Timeout:</strong> {@code 30 seconds}</li>
 * <li><strong>API Key:</strong> Auto-discovered</li>
 * <li><strong>Group:</strong> Auto-discovered</li>
 * </ul>
 * 
 * <h2>Example Usage</h2>
 * <pre>{@code
 * // Using defaults (auto-discovery)
 * ServiceOptions options = ServiceOptions.builder().build();
 * 
 * // Custom configuration
 * ServiceOptions options = ServiceOptions.builder()
 *     .url("api.staging.mesh.dev")
 *     .port(443)
 *     .apiKey("your-api-key")
 *     .group("groups/your-group-id")
 *     .timeout(Duration.ofSeconds(60))
 *     .tls(true)
 *     .build();
 * }</pre>
 * 
 * @see co.meshtrade.api.auth.CredentialsDiscovery
 * @see co.meshtrade.api.grpc.BaseGRPCClient
 */
public final class ServiceOptions {
    private final String url;
    private final int port;
    private final boolean tls;
    private final Duration timeout;
    private final String apiKey;
    private final String group;
    
    /**
     * Private constructor - use builder() to create instances.
     */
    private ServiceOptions(Builder builder) {
        this.url = builder.url;
        this.port = builder.port;
        this.tls = builder.tls;
        this.timeout = builder.timeout;
        this.apiKey = builder.apiKey;
        this.group = builder.group;
    }
    
    /**
     * Creates a new builder for service options.
     * 
     * @return a new builder instance with default values
     */
    public static Builder builder() {
        return new Builder();
    }
    
    /**
     * Gets the gRPC server URL.
     *
     * @return the gRPC server URL (default: "production-service-mesh-api-gateway-lb-frontend.mesh.trade")
     */
    public String getUrl() {
        return url;
    }

    /**
     * Gets the gRPC server port.
     *
     * @return the gRPC server port (default: 443)
     */
    public int getPort() {
        return port;
    }

    /**
     * Checks whether TLS is enabled.
     *
     * @return whether TLS is enabled (default: true)
     */
    public boolean isTls() {
        return tls;
    }

    /**
     * Gets the request timeout.
     *
     * @return the request timeout (default: 30 seconds)
     */
    public Duration getTimeout() {
        return timeout;
    }

    /**
     * Gets the API key for authentication.
     *
     * @return the API key for authentication
     */
    public String getApiKey() {
        return apiKey;
    }

    /**
     * Gets the group resource name for organizational context.
     *
     * @return the group resource name for organizational context
     */
    public String getGroup() {
        return group;
    }
    
    /**
     * Validates that all required options are set and valid.
     * 
     * @throws IllegalStateException if any required options are missing or invalid
     */
    public void validate() {
        if (url == null || url.trim().isEmpty()) {
            throw new IllegalStateException("URL cannot be null or empty");
        }
        
        if (port <= 0 || port > 65535) {
            throw new IllegalStateException("Port must be between 1 and 65535, got: " + port);
        }
        
        if (timeout == null || timeout.isZero() || timeout.isNegative()) {
            throw new IllegalStateException("Timeout must be positive, got: " + timeout);
        }
        
        if (apiKey == null || apiKey.trim().isEmpty()) {
            throw new IllegalStateException("API key cannot be null or empty. " +
                "Provide via builder or ensure credentials can be discovered automatically.");
        }
        
        if (group == null || group.trim().isEmpty()) {
            throw new IllegalStateException("Group cannot be null or empty. " +
                "Provide via builder or ensure credentials can be discovered automatically.");
        }
        
        // Validate credentials format
        try {
            new Credentials(apiKey, group);
        } catch (Exception e) {
            throw new IllegalStateException("Invalid credentials: " + e.getMessage(), e);
        }
    }
    
    @Override
    public String toString() {
        return String.format("ServiceOptions{url=%s, port=%d, tls=%s, timeout=%s, group=%s}", 
            url, port, tls, timeout, group);
    }
    
    /**
     * Builder for creating ServiceOptions instances.
     * 
     * <p>The builder provides a fluent API for configuring service options.
     * If authentication parameters are not explicitly set, the builder will
     * attempt to discover them automatically when {@link #build()} is called.
     */
    public static final class Builder {
        private String url = "production-service-mesh-api-gateway-lb-frontend.mesh.trade";
        private int port = 443;
        private boolean tls = true;
        private Duration timeout = Duration.ofSeconds(30);
        private String apiKey;
        private String group;
        
        private Builder() {}
        
        /**
         * Sets the gRPC server URL.
         *
         * @param serverUrl the server URL (default: "production-service-mesh-api-gateway-lb-frontend.mesh.trade")
         * @return this builder for method chaining
         * @throws NullPointerException if serverUrl is null
         * @throws IllegalArgumentException if serverUrl is empty
         */
        public Builder url(String serverUrl) {
            Objects.requireNonNull(serverUrl, "URL cannot be null");
            if (serverUrl.trim().isEmpty()) {
                throw new IllegalArgumentException("URL cannot be empty");
            }
            this.url = serverUrl.trim();
            return this;
        }
        
        /**
         * Sets the gRPC server port.
         *
         * @param serverPort the server port (default: 443)
         * @return this builder for method chaining
         * @throws IllegalArgumentException if serverPort is not between 1 and 65535
         */
        public Builder port(int serverPort) {
            if (serverPort <= 0 || serverPort > 65535) {
                throw new IllegalArgumentException("Port must be between 1 and 65535, got: " + serverPort);
            }
            this.port = serverPort;
            return this;
        }
        
        /**
         * Sets whether TLS is enabled for the connection.
         *
         * @param enableTls true to enable TLS, false to use plaintext (default: true)
         * @return this builder for method chaining
         */
        public Builder tls(boolean enableTls) {
            this.tls = enableTls;
            return this;
        }
        
        /**
         * Sets the request timeout.
         *
         * @param requestTimeout the timeout duration (default: 30 seconds)
         * @return this builder for method chaining
         * @throws NullPointerException if requestTimeout is null
         * @throws IllegalArgumentException if requestTimeout is zero or negative
         */
        public Builder timeout(Duration requestTimeout) {
            Objects.requireNonNull(requestTimeout, "Timeout cannot be null");
            if (requestTimeout.isZero() || requestTimeout.isNegative()) {
                throw new IllegalArgumentException("Timeout must be positive, got: " + requestTimeout);
            }
            this.timeout = requestTimeout;
            return this;
        }
        
        /**
         * Sets the API key for authentication.
         *
         * <p>If not set, the builder will attempt to discover the API key
         * automatically using {@link CredentialsDiscovery} when {@link #build()} is called.
         *
         * @param authApiKey the API key (43 characters, base64 URL-safe)
         * @return this builder for method chaining
         * @throws NullPointerException if authApiKey is null
         * @throws IllegalArgumentException if authApiKey is empty or invalid format
         */
        public Builder apiKey(String authApiKey) {
            Objects.requireNonNull(authApiKey, "API key cannot be null");
            if (authApiKey.trim().isEmpty()) {
                throw new IllegalArgumentException("API key cannot be empty");
            }
            this.apiKey = authApiKey.trim();
            return this;
        }
        
        /**
         * Sets the group resource name for organizational context.
         *
         * <p>If not set, the builder will attempt to discover the group
         * automatically using {@link CredentialsDiscovery} when {@link #build()} is called.
         *
         * @param groupName the group resource name in format "groups/{group_id}"
         * @return this builder for method chaining
         * @throws NullPointerException if groupName is null
         * @throws IllegalArgumentException if groupName is empty or invalid format
         */
        public Builder group(String groupName) {
            Objects.requireNonNull(groupName, "Group cannot be null");
            if (groupName.trim().isEmpty()) {
                throw new IllegalArgumentException("Group cannot be empty");
            }
            this.group = groupName.trim();
            return this;
        }
        
        /**
         * Sets the group by group ID (without the "groups/" prefix).
         * 
         * <p>This is a convenience method that automatically adds the "groups/" prefix.
         * 
         * @param groupId the group ID (26-character ULID)
         * @return this builder for method chaining
         * @throws NullPointerException if groupId is null
         * @throws IllegalArgumentException if groupId is empty or invalid format
         */
        public Builder groupId(String groupId) {
            Objects.requireNonNull(groupId, "Group ID cannot be null");
            if (groupId.trim().isEmpty()) {
                throw new IllegalArgumentException("Group ID cannot be empty");
            }
            this.group = "groups/" + groupId.trim();
            return this;
        }
        
        /**
         * Sets authentication credentials.
         * 
         * <p>This is a convenience method for setting both API key and group
         * from a Credentials instance.
         * 
         * @param credentials the credentials to use
         * @return this builder for method chaining
         * @throws NullPointerException if credentials is null
         */
        public Builder credentials(Credentials credentials) {
            Objects.requireNonNull(credentials, "Credentials cannot be null");
            this.apiKey = credentials.apiKey();
            this.group = credentials.group();
            return this;
        }
        
        /**
         * Builds the ServiceOptions instance.
         * 
         * <p>If API key or group are not explicitly set, this method will attempt
         * to discover them automatically using {@link CredentialsDiscovery}.
         * 
         * @return a new ServiceOptions instance
         * @throws IllegalStateException if required options are missing or invalid,
         *                              or if credential discovery fails
         */
        public ServiceOptions build() {
            // Attempt credential discovery if not explicitly set
            if (apiKey == null || group == null) {
                Credentials creds = CredentialsDiscovery.findCredentials()
                    .orElseThrow(() -> new IllegalStateException(
                        "API credentials not provided and could not be discovered automatically. " +
                        "Either provide credentials via builder methods or ensure they are available " +
                        "via environment variable or credential files. " +
                        "See CredentialsDiscovery.getCredentialSearchInfo() for details."));
                if (apiKey == null) {
                    apiKey = creds.apiKey();
                }
                if (group == null) {
                    group = creds.group();
                }
            }

            ServiceOptions options = new ServiceOptions(this);
            options.validate();
            return options;
        }
    }
}
