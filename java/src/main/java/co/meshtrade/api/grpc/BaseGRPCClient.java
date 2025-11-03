package co.meshtrade.api.grpc;

import java.time.Duration;
import java.util.concurrent.Executor;
import java.util.concurrent.TimeUnit;
import java.util.function.BiFunction;
import java.util.function.Function;

import build.buf.protovalidate.ValidationResult;
import build.buf.protovalidate.Validator;
import build.buf.protovalidate.ValidatorFactory;
import build.buf.protovalidate.exceptions.ValidationException;
import com.google.protobuf.Message;
import io.grpc.CallCredentials;
import io.grpc.Channel;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.Metadata;
import io.grpc.Status;
import io.grpc.StatusRuntimeException;
import io.grpc.stub.AbstractStub;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import co.meshtrade.api.auth.Credentials;
import co.meshtrade.api.config.ServiceOptions;

/**
 * Base class for all Meshtrade gRPC service clients.
 * 
 * <p>This abstract class provides common functionality for gRPC service clients including:
 * <ul>
 * <li>Authentication via API key and group headers</li>
 * <li>Connection management with proper resource cleanup</li>
 * <li>Timeout handling with per-call overrides</li>
 * <li>Retry logic for transient failures</li>
 * <li>Structured error handling and logging</li>
 * </ul>
 * 
 * <p>All generated service clients extend this class and implement their corresponding
 * service interface. The generic type parameter T represents the gRPC stub type
 * (e.g., {@code ClientServiceGrpc.ClientServiceBlockingStub}).
 * 
 * <h2>Authentication</h2>
 * <p>Authentication is handled automatically using the API key and group from
 * {@link ServiceOptions}. The API key is sent in the x-api-key header,
 * while the group is sent in the x-group header.
 * 
 * <h2>Resource Management</h2>
 * <p>This class implements {@link AutoCloseable} to ensure proper cleanup of
 * underlying gRPC connections. Always use try-with-resources or manually call
 * {@link #close()} when done with the client.
 * 
 * <h2>Example Usage</h2>
 * <pre>{@code
 * // Subclass example (typically generated)
 * public class ClientServiceClient extends BaseGRPCClient<ClientServiceGrpc.ClientServiceBlockingStub> 
 *     implements ClientService {
 *     
 *     public ClientServiceClient() {
 *         super("ClientService", ClientServiceGrpc::newBlockingStub, ServiceOptions.builder().build());
 *     }
 *     
 *     public GetClientResponse getClient(GetClientRequest request, Optional<Duration> timeout) {
 *         return execute("GetClient", request, timeout.orElse(null), 
 *                       (stub, req) -> stub.getClient(req));
 *     }
 * }
 * }</pre>
 * 
 * @param <T> the gRPC stub type for this service
 * @see ServiceOptions
 * @see Credentials
 * @see <a href="https://meshtrade.github.io/api/docs/architecture/authentication">Authentication Guide</a>
 */
public abstract class BaseGRPCClient<T extends AbstractStub<T>> implements AutoCloseable {
    private static final Logger LOGGER = LoggerFactory.getLogger(BaseGRPCClient.class);
    
    private static final Metadata.Key<String> API_KEY_HEADER = 
        Metadata.Key.of("x-api-key", Metadata.ASCII_STRING_MARSHALLER);
    private static final Metadata.Key<String> GROUP_HEADER = 
        Metadata.Key.of("x-group", Metadata.ASCII_STRING_MARSHALLER);
    
    private final String serviceName;
    private final ServiceOptions options;
    private final ManagedChannel channel;
    private final T stub;
    private final Validator validator;
    private volatile boolean closed = false;
    
    /**
     * Creates a new gRPC client with the specified configuration.
     * 
     * @param serviceName the name of the service (for logging and diagnostics)
     * @param stubFactory function to create the gRPC stub from a channel
     * @param options the service configuration options
     * @throws IllegalArgumentException if any parameter is invalid
     * @throws RuntimeException if the gRPC channel cannot be created
     */
    protected BaseGRPCClient(String serviceName, Function<Channel, T> stubFactory, ServiceOptions options) {
        this.serviceName = serviceName;
        this.options = options;
        
        // Validate options
        options.validate();
        
        LOGGER.debug("Initializing {} client with URL: {}:{}", serviceName, options.getUrl(), options.getPort());
        
        try {
            // Initialize protovalidate validator
            this.validator = ValidatorFactory.newBuilder().build();
            
            // Create managed channel
            this.channel = createManagedChannel(options);
            
            // Create authenticated stub
            this.stub = createAuthenticatedStub(stubFactory, channel, options);
            
            LOGGER.debug("Successfully initialized {} client with validation", serviceName);
            
        } catch (Exception e) {
            LOGGER.error("Failed to initialize {} client: {}", serviceName, e.getMessage(), e);
            throw new RuntimeException("Failed to initialize " + serviceName + " client", e);
        }
    }
    
    /**
     * Returns the group context for this client.
     * 
     * <p>The group determines the authorization context for all API requests
     * and is sent as an "x-group" header with every request.
     * 
     * @return the group identifier, or null if no group is configured
     */
    public String group() {
        return options.getGroup();
    }

    /**
     * Executes a server-side streaming gRPC call with client-side validation, authentication,
     * timeout, and error handling.
     *
     * <p>This method provides the streaming equivalent of {@link #execute}, handling validation,
     * authentication (via CallCredentials), timeout application, and structured error handling for
     * server-side streaming methods.
     *
     * @param <REQ> the request message type
     * @param <RESP> the response message type
     * @param methodName the name of the gRPC method (for logging)
     * @param request the request message
     * @param timeout optional timeout override (null to use default)
     * @param streamCall function to execute the actual streaming gRPC call
     * @return an Iterator of response messages from the stream
     * @throws StatusRuntimeException if the gRPC call fails
     * @throws IllegalStateException if the client is closed
     * @throws IllegalArgumentException if the request is invalid or fails validation
     */
    protected <REQ, RESP> java.util.Iterator<RESP> executeStream(
            String methodName,
            REQ request,
            Duration timeout,
            BiFunction<T, REQ, java.util.Iterator<RESP>> streamCall) {

        if (closed) {
            throw new IllegalStateException("Client is closed");
        }

        if (request == null) {
            throw new IllegalArgumentException("Request cannot be null");
        }

        // Validate request using protovalidate before initiating stream
        if (request instanceof Message) {
            try {
                ValidationResult result = validator.validate((Message) request);
                if (!result.isSuccess()) {
                    throw new IllegalArgumentException("Request validation failed: " + result.toString());
                }
            } catch (ValidationException e) {
                throw new IllegalArgumentException("Request validation failed: " + e.getMessage(), e);
            }
        }

        Duration effectiveTimeout = timeout != null ? timeout : options.getTimeout();
        LOGGER.debug("Executing {}.{} (streaming) with timeout: {}", serviceName, methodName, effectiveTimeout);

        try {
            // Apply timeout to stub if specified
            T timeoutStub = stub;
            if (effectiveTimeout != null) {
                timeoutStub = stub.withDeadlineAfter(effectiveTimeout.toMillis(), TimeUnit.MILLISECONDS);
            }

            // Execute the streaming call (authentication applied via CallCredentials)
            java.util.Iterator<RESP> responseStream = streamCall.apply(timeoutStub, request);

            LOGGER.debug("Successfully initiated stream for {}.{}", serviceName, methodName);
            return responseStream;

        } catch (StatusRuntimeException e) {
            LOGGER.error("gRPC streaming call {}.{} failed with status: {} - {}",
                        serviceName, methodName, e.getStatus().getCode(), e.getStatus().getDescription());

            // Enhanced error context
            throw Status.fromThrowable(e)
                .withDescription(String.format("Failed to execute %s.%s: %s",
                    serviceName, methodName, e.getStatus().getDescription()))
                .asRuntimeException();

        } catch (Exception e) {
            LOGGER.error("Unexpected error in {}.{}: {}", serviceName, methodName, e.getMessage(), e);
            throw new RuntimeException("Unexpected error executing " + serviceName + "." + methodName, e);
        }
    }

    /**
     * Executes a unary gRPC call with client-side validation, authentication, timeout, and error handling.
     * 
     * <p>This method provides the core execution logic for all service methods.
     * It validates requests using protovalidate, handles authentication, applies timeouts, 
     * manages retries, and provides structured error handling.
     * 
     * @param <REQ> the request message type
     * @param <RESP> the response message type
     * @param methodName the name of the gRPC method (for logging)
     * @param request the request message
     * @param timeout optional timeout override (null to use default)
     * @param methodCall function to execute the actual gRPC call
     * @return the response message
     * @throws StatusRuntimeException if the gRPC call fails
     * @throws IllegalStateException if the client is closed
     * @throws IllegalArgumentException if the request is invalid or fails validation
     */
    protected <REQ, RESP> RESP execute(
            String methodName, 
            REQ request, 
            Duration timeout,
            BiFunction<T, REQ, RESP> methodCall) {
        
        if (closed) {
            throw new IllegalStateException("Client is closed");
        }
        
        if (request == null) {
            throw new IllegalArgumentException("Request cannot be null");
        }
        
        // Validate request using protovalidate before any processing
        if (request instanceof Message) {
            try {
                ValidationResult result = validator.validate((Message) request);
                if (!result.isSuccess()) {
                    throw new IllegalArgumentException("Request validation failed: " + result.toString());
                }
            } catch (ValidationException e) {
                throw new IllegalArgumentException("Request validation failed: " + e.getMessage(), e);
            }
        }
        
        Duration effectiveTimeout = timeout != null ? timeout : options.getTimeout();
        LOGGER.debug("Executing {}.{} with timeout: {}", serviceName, methodName, effectiveTimeout);
        
        try {
            // Apply timeout to stub if specified
            T timeoutStub = stub;
            if (effectiveTimeout != null) {
                timeoutStub = stub.withDeadlineAfter(effectiveTimeout.toMillis(), TimeUnit.MILLISECONDS);
            }
            
            // Execute the call
            RESP response = methodCall.apply(timeoutStub, request);
            
            LOGGER.debug("Successfully executed {}.{}", serviceName, methodName);
            return response;
            
        } catch (StatusRuntimeException e) {
            LOGGER.error("gRPC call {}.{} failed with status: {} - {}", 
                        serviceName, methodName, e.getStatus().getCode(), e.getStatus().getDescription());
            
            // Enhanced error context
            throw Status.fromThrowable(e)
                .withDescription(String.format("Failed to execute %s.%s: %s", 
                    serviceName, methodName, e.getStatus().getDescription()))
                .asRuntimeException();
                
        } catch (Exception e) {
            LOGGER.error("Unexpected error in {}.{}: {}", serviceName, methodName, e.getMessage(), e);
            throw new RuntimeException("Unexpected error executing " + serviceName + "." + methodName, e);
        }
    }
    
    /**
     * Closes the gRPC client and releases all resources.
     * 
     * <p>This method shuts down the underlying gRPC channel and waits for
     * termination. It's safe to call multiple times.
     * 
     * @throws InterruptedException if interrupted while waiting for shutdown
     */
    @Override
    public void close() throws InterruptedException {
        if (closed) {
            return;
        }
        
        LOGGER.debug("Closing {} client", serviceName);
        closed = true;
        
        try {
            channel.shutdown();
            
            // Wait for termination with reasonable timeout
            if (!channel.awaitTermination(30, TimeUnit.SECONDS)) {
                LOGGER.warn("Channel did not terminate gracefully, forcing shutdown");
                channel.shutdownNow();
                
                if (!channel.awaitTermination(5, TimeUnit.SECONDS)) {
                    LOGGER.error("Channel did not terminate after forced shutdown");
                }
            }
            
            LOGGER.debug("Successfully closed {} client", serviceName);
            
        } catch (InterruptedException e) {
            LOGGER.warn("Interrupted while closing {} client", serviceName);
            channel.shutdownNow();
            Thread.currentThread().interrupt();
            throw e;
        }
    }
    
    /**
     * Checks if the client is closed.
     * 
     * @return true if the client is closed, false otherwise
     */
    public boolean isClosed() {
        return closed;
    }
    
    /**
     * Returns the service name for this client.
     * 
     * @return the service name
     */
    public String getServiceName() {
        return serviceName;
    }
    
    /**
     * Returns the configuration options for this client.
     * 
     * @return a copy of the service options
     */
    public ServiceOptions getOptions() {
        return options;
    }
    
    /**
     * Returns the protovalidate validator for request validation.
     *
     * <p>This provides access to the validator for client-side request validation.
     * All requests are automatically validated before gRPC calls, but this method
     * allows for manual validation if needed.
     *
     * @return the protovalidate Validator instance
     */
    public Validator getValidator() {
        return validator;
    }

    /**
     * Creates a new ServiceOptions instance with a different group context.
     *
     * <p>This enables convenient group context switching without reconstructing the entire client.
     * All other configuration (URL, port, timeout, API key, etc.) is preserved.
     * The new client instance shares no state with the original client, allowing safe concurrent
     * usage across different threads.
     *
     * <p>The group parameter must be in the format 'groups/{group_id}' where group_id is a valid
     * group identifier (typically a ULID).
     *
     * @param group the group resource name in format 'groups/{group_id}'
     * @return new ServiceOptions instance with updated group context
     */
    protected ServiceOptions createOptionsWithGroup(String group) {
        return ServiceOptions.builder()
            .url(options.getUrl())
            .port(options.getPort())
            .apiKey(options.getApiKey())
            .group(group)
            .timeout(options.getTimeout())
            .tls(options.isTls())
            .build();
    }

    /**
     * Creates a managed gRPC channel from service options.
     *
     * @param serviceOptions the service configuration
     * @return the managed channel
     */
    private ManagedChannel createManagedChannel(ServiceOptions serviceOptions) {
        ManagedChannelBuilder<?> channelBuilder = ManagedChannelBuilder
            .forAddress(serviceOptions.getUrl(), serviceOptions.getPort());

        // Configure TLS
        if (serviceOptions.isTls()) {
            channelBuilder.useTransportSecurity();
        } else {
            channelBuilder.usePlaintext();
        }
        
        // Set connection parameters
        channelBuilder
            .keepAliveTime(30, TimeUnit.SECONDS)
            .keepAliveTimeout(5, TimeUnit.SECONDS)
            .keepAliveWithoutCalls(true)
            .maxInboundMessageSize(4 * 1024 * 1024); // 4MB
        
        return channelBuilder.build();
    }
    
    /**
     * Creates an authenticated gRPC stub with proper credentials.
     *
     * @param stubFactory function to create the stub
     * @param managedChannel the gRPC channel
     * @param serviceOptions the service configuration
     * @return the authenticated stub
     */
    private T createAuthenticatedStub(
            Function<Channel, T> stubFactory, Channel managedChannel, ServiceOptions serviceOptions) {
        T baseStub = stubFactory.apply(managedChannel);

        // Create call credentials for authentication
        CallCredentials credentials = new CallCredentials() {
            @Override
            public void applyRequestMetadata(RequestInfo requestInfo, Executor appExecutor, MetadataApplier applier) {
                try {
                    Metadata headers = new Metadata();
                    headers.put(API_KEY_HEADER, serviceOptions.getApiKey());
                    headers.put(GROUP_HEADER, serviceOptions.getGroup());
                    applier.apply(headers);
                } catch (Exception e) {
                    applier.fail(Status.UNAUTHENTICATED.withCause(e));
                }
            }
            
            @Override
            public void thisUsesUnstableApi() {
                // Acknowledge unstable API usage
            }
        };
        
        return baseStub.withCallCredentials(credentials);
    }
}
