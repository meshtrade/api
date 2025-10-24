/**
 * Base gRPC client infrastructure for the Meshtrade API.
 * 
 * <p>This package provides the foundational gRPC client classes that all
 * generated service clients extend. It includes connection management,
 * authentication, retry logic, timeout handling, and resource cleanup.
 * 
 * <p>The main class is {@link co.meshtrade.api.grpc.BaseGRPCClient} which
 * provides a generic, type-safe base implementation for all gRPC service clients.
 * 
 * <h2>Key Features</h2>
 * <ul>
 * <li>Generic type-safe base client with stub type parameters</li>
 * <li>Automatic authentication header injection</li>
 * <li>Connection health monitoring and retry logic</li>
 * <li>Configurable timeouts per request</li>
 * <li>Proper resource cleanup with AutoCloseable</li>
 * <li>Integration with credential discovery</li>
 * </ul>
 * 
 * <p>Generated service clients extend BaseGRPCClient and provide method-specific
 * implementations that leverage the common infrastructure.
 * 
 * @see co.meshtrade.api.grpc.BaseGRPCClient
 */
package co.meshtrade.api.grpc;
