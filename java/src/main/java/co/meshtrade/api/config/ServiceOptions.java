package co.meshtrade.api.config;

import co.meshtrade.api.auth.Credentials;
import co.meshtrade.api.auth.CredentialsDiscovery;

import java.time.Duration;
import java.util.Objects;
import java.util.Optional;

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
 * <li><strong>URL:</strong> {@code api.mesh.dev}</li>
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
     * @return the gRPC server URL (default: "api.mesh.dev")
     */
    public String getUrl() {
        return url;
    }
    
    /**
     * @return the gRPC server port (default: 443)
     */
    public int getPort() {
        return port;
    }
    
    /**
     * @return whether TLS is enabled (default: true)
     */
    public boolean isTls() {
        return tls;
    }
    
    /**
     * @return the request timeout (default: 30 seconds)
     */
    public Duration getTimeout() {
        return timeout;
    }
    
    /**
     * @return the API key for authentication
     */
    public String getApiKey() {
        return apiKey;
    }
    
    /**
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
        private String url = "api.mesh.dev";
        private int port = 443;
        private boolean tls = true;
        private Duration timeout = Duration.ofSeconds(30);
        private String apiKey;
        private String group;
        
        private Builder() {}
        
        /**
         * Sets the gRPC server URL.
         * 
         * @param url the server URL (default: "api.mesh.dev")
         * @return this builder for method chaining
         * @throws NullPointerException if url is null
         * @throws IllegalArgumentException if url is empty
         */
        public Builder url(String url) {
            Objects.requireNonNull(url, "URL cannot be null");
            if (url.trim().isEmpty()) {
                throw new IllegalArgumentException("URL cannot be empty");
            }
            this.url = url.trim();
            return this;
        }
        
        /**
         * Sets the gRPC server port.
         * 
         * @param port the server port (default: 443)
         * @return this builder for method chaining
         * @throws IllegalArgumentException if port is not between 1 and 65535
         */
        public Builder port(int port) {
            if (port <= 0 || port > 65535) {
                throw new IllegalArgumentException("Port must be between 1 and 65535, got: " + port);
            }
            this.port = port;
            return this;
        }
        
        /**
         * Sets whether TLS is enabled for the connection.
         * 
         * @param tls true to enable TLS, false to use plaintext (default: true)
         * @return this builder for method chaining
         */
        public Builder tls(boolean tls) {
            this.tls = tls;
            return this;
        }
        
        /**
         * Sets the request timeout.
         * 
         * @param timeout the timeout duration (default: 30 seconds)
         * @return this builder for method chaining
         * @throws NullPointerException if timeout is null
         * @throws IllegalArgumentException if timeout is zero or negative
         */
        public Builder timeout(Duration timeout) {
            Objects.requireNonNull(timeout, "Timeout cannot be null");
            if (timeout.isZero() || timeout.isNegative()) {
                throw new IllegalArgumentException("Timeout must be positive, got: " + timeout);
            }
            this.timeout = timeout;
            return this;
        }
        
        /**
         * Sets the API key for authentication.
         * 
         * <p>If not set, the builder will attempt to discover the API key
         * automatically using {@link CredentialsDiscovery} when {@link #build()} is called.
         * 
         * @param apiKey the API key (43 characters, base64 URL-safe)
         * @return this builder for method chaining
         * @throws NullPointerException if apiKey is null
         * @throws IllegalArgumentException if apiKey is empty or invalid format
         */
        public Builder apiKey(String apiKey) {
            Objects.requireNonNull(apiKey, "API key cannot be null");
            if (apiKey.trim().isEmpty()) {
                throw new IllegalArgumentException("API key cannot be empty");
            }
            this.apiKey = apiKey.trim();
            return this;
        }
        
        /**
         * Sets the group resource name for organizational context.
         * 
         * <p>If not set, the builder will attempt to discover the group
         * automatically using {@link CredentialsDiscovery} when {@link #build()} is called.
         * 
         * @param group the group resource name in format "groups/{group_id}"
         * @return this builder for method chaining
         * @throws NullPointerException if group is null
         * @throws IllegalArgumentException if group is empty or invalid format
         */
        public Builder group(String group) {
            Objects.requireNonNull(group, "Group cannot be null");
            if (group.trim().isEmpty()) {
                throw new IllegalArgumentException("Group cannot be empty");
            }
            this.group = group.trim();
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
                Optional<Credentials> discoveredCredentials = CredentialsDiscovery.findCredentials();
                if (discoveredCredentials.isPresent()) {
                    Credentials creds = discoveredCredentials.get();
                    if (apiKey == null) {
                        apiKey = creds.apiKey();
                    }
                    if (group == null) {
                        group = creds.group();
                    }
                } else {
                    throw new IllegalStateException(
                        "API credentials not provided and could not be discovered automatically. " +
                        "Either provide credentials via builder methods or ensure they are available " +
                        "via environment variable or credential files. " +
                        "See CredentialsDiscovery.getCredentialSearchInfo() for details.");
                }
            }
            
            ServiceOptions options = new ServiceOptions(this);
            options.validate();
            return options;
        }
    }
}