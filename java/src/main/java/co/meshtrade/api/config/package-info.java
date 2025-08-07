/**
 * Configuration classes for Meshtrade API service clients.
 * 
 * <p>This package provides configuration options for customizing the behavior
 * of Meshtrade API service clients, including connection settings, timeouts,
 * authentication parameters, and more.
 * 
 * <p>The main configuration class is {@link co.meshtrade.api.config.ServiceOptions}
 * which uses the builder pattern for easy and flexible configuration.
 * 
 * <h2>Example</h2>
 * <pre>{@code
 * ServiceOptions options = ServiceOptions.builder()
 *     .url("api.staging.mesh.dev")
 *     .port(443)
 *     .apiKey("your-api-key")
 *     .group("groups/your-group-id")
 *     .timeout(Duration.ofSeconds(60))
 *     .build();
 * 
 * try (ApiUserServiceClient client = new ApiUserServiceClient(options)) {
 *     // Use configured client
 * }
 * }</pre>
 * 
 * @see co.meshtrade.api.config.ServiceOptions
 */
package co.meshtrade.api.config;