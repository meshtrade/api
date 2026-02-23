/**
 * Meshtrade API Java SDK.
 *
 * <p>This package provides a comprehensive Java SDK for the Meshtrade API, offering type-safe
 * access to all Meshtrade services including IAM, compliance, trading, wallet, and more.
 *
 * <p>The SDK follows a schema-first approach where all client libraries are generated from
 * protobuf definitions, ensuring consistency and type safety across all operations.
 *
 * <h2>Key Features</h2>
 * <ul>
 * <li>Type-safe gRPC clients for all Meshtrade services</li>
 * <li>Automatic credential discovery and authentication</li>
 * <li>Connection management with retry logic and timeouts</li>
 * <li>Comprehensive error handling and logging</li>
 * <li>Resource management with AutoCloseable support</li>
 * </ul>
 *
 * <h2>Quick Start</h2>
 * <pre>{@code
 * // Using default configuration (auto-discovers credentials)
 * try (ApiUserServiceClient client = new ApiUserServiceClient()) {
 *     GetApiUserRequest request = GetApiUserRequest.newBuilder()
 *         .setName("iam/api_users/your-user-id")
 *         .build();
 *     APIUser user = client.getApiUser(request);
 *     System.out.println("User: " + user.getDisplayName());
 * }
 * }</pre>
 *
 * @see <a href="https://meshtrade.github.io/api/">Full API Documentation</a>
 * @see <a href="https://meshtrade.github.io/api/docs/architecture/authentication">Authentication Guide</a>
 */
package co.meshtrade.api;
