package meshtrade.iam.internal_auth.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 * <pre>
 * InternalAuthorizationService provides authorization services for internal communication
 * between microservices within the mesh. This service receives authorization requests
 * from the api-gateway-sidecar and delegates to the main authoriser app's business logic.
 * This protocol is designed specifically for internal service-to-service communication
 * and should not be exposed to external clients.
 * </pre>
 */
@io.grpc.stub.annotations.GrpcGenerated
public final class InternalAuthorizationServiceGrpc {

  private InternalAuthorizationServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "meshtrade.iam.internal_auth.v1.InternalAuthorizationService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest,
      meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse> getCheckAuthorizationMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CheckAuthorization",
      requestType = meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest.class,
      responseType = meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest,
      meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse> getCheckAuthorizationMethod() {
    io.grpc.MethodDescriptor<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest, meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse> getCheckAuthorizationMethod;
    if ((getCheckAuthorizationMethod = InternalAuthorizationServiceGrpc.getCheckAuthorizationMethod) == null) {
      synchronized (InternalAuthorizationServiceGrpc.class) {
        if ((getCheckAuthorizationMethod = InternalAuthorizationServiceGrpc.getCheckAuthorizationMethod) == null) {
          InternalAuthorizationServiceGrpc.getCheckAuthorizationMethod = getCheckAuthorizationMethod =
              io.grpc.MethodDescriptor.<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest, meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CheckAuthorization"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse.getDefaultInstance()))
              .setSchemaDescriptor(new InternalAuthorizationServiceMethodDescriptorSupplier("CheckAuthorization"))
              .build();
        }
      }
    }
    return getCheckAuthorizationMethod;
  }

  private static volatile io.grpc.MethodDescriptor<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest,
      meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse> getHealthCheckMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "HealthCheck",
      requestType = meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest.class,
      responseType = meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest,
      meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse> getHealthCheckMethod() {
    io.grpc.MethodDescriptor<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest, meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse> getHealthCheckMethod;
    if ((getHealthCheckMethod = InternalAuthorizationServiceGrpc.getHealthCheckMethod) == null) {
      synchronized (InternalAuthorizationServiceGrpc.class) {
        if ((getHealthCheckMethod = InternalAuthorizationServiceGrpc.getHealthCheckMethod) == null) {
          InternalAuthorizationServiceGrpc.getHealthCheckMethod = getHealthCheckMethod =
              io.grpc.MethodDescriptor.<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest, meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "HealthCheck"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse.getDefaultInstance()))
              .setSchemaDescriptor(new InternalAuthorizationServiceMethodDescriptorSupplier("HealthCheck"))
              .build();
        }
      }
    }
    return getHealthCheckMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static InternalAuthorizationServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<InternalAuthorizationServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<InternalAuthorizationServiceStub>() {
        @java.lang.Override
        public InternalAuthorizationServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new InternalAuthorizationServiceStub(channel, callOptions);
        }
      };
    return InternalAuthorizationServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports all types of calls on the service
   */
  public static InternalAuthorizationServiceBlockingV2Stub newBlockingV2Stub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<InternalAuthorizationServiceBlockingV2Stub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<InternalAuthorizationServiceBlockingV2Stub>() {
        @java.lang.Override
        public InternalAuthorizationServiceBlockingV2Stub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new InternalAuthorizationServiceBlockingV2Stub(channel, callOptions);
        }
      };
    return InternalAuthorizationServiceBlockingV2Stub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static InternalAuthorizationServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<InternalAuthorizationServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<InternalAuthorizationServiceBlockingStub>() {
        @java.lang.Override
        public InternalAuthorizationServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new InternalAuthorizationServiceBlockingStub(channel, callOptions);
        }
      };
    return InternalAuthorizationServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static InternalAuthorizationServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<InternalAuthorizationServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<InternalAuthorizationServiceFutureStub>() {
        @java.lang.Override
        public InternalAuthorizationServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new InternalAuthorizationServiceFutureStub(channel, callOptions);
        }
      };
    return InternalAuthorizationServiceFutureStub.newStub(factory, channel);
  }

  /**
   * <pre>
   * InternalAuthorizationService provides authorization services for internal communication
   * between microservices within the mesh. This service receives authorization requests
   * from the api-gateway-sidecar and delegates to the main authoriser app's business logic.
   * This protocol is designed specifically for internal service-to-service communication
   * and should not be exposed to external clients.
   * </pre>
   */
  public interface AsyncService {

    /**
     * <pre>
     * CheckAuthorization performs authorization checks for internal service requests.
     * This method receives authorization requests from the sidecar and returns
     * authorization decisions from the main authoriser application's business logic.
     * </pre>
     */
    default void checkAuthorization(meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest request,
        io.grpc.stub.StreamObserver<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCheckAuthorizationMethod(), responseObserver);
    }

    /**
     * <pre>
     * HealthCheck provides health checking for the internal authorization service.
     * This allows the sidecar to verify connectivity and readiness of the main
     * authoriser application.
     * </pre>
     */
    default void healthCheck(meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest request,
        io.grpc.stub.StreamObserver<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getHealthCheckMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service InternalAuthorizationService.
   * <pre>
   * InternalAuthorizationService provides authorization services for internal communication
   * between microservices within the mesh. This service receives authorization requests
   * from the api-gateway-sidecar and delegates to the main authoriser app's business logic.
   * This protocol is designed specifically for internal service-to-service communication
   * and should not be exposed to external clients.
   * </pre>
   */
  public static abstract class InternalAuthorizationServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return InternalAuthorizationServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service InternalAuthorizationService.
   * <pre>
   * InternalAuthorizationService provides authorization services for internal communication
   * between microservices within the mesh. This service receives authorization requests
   * from the api-gateway-sidecar and delegates to the main authoriser app's business logic.
   * This protocol is designed specifically for internal service-to-service communication
   * and should not be exposed to external clients.
   * </pre>
   */
  public static final class InternalAuthorizationServiceStub
      extends io.grpc.stub.AbstractAsyncStub<InternalAuthorizationServiceStub> {
    private InternalAuthorizationServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected InternalAuthorizationServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new InternalAuthorizationServiceStub(channel, callOptions);
    }

    /**
     * <pre>
     * CheckAuthorization performs authorization checks for internal service requests.
     * This method receives authorization requests from the sidecar and returns
     * authorization decisions from the main authoriser application's business logic.
     * </pre>
     */
    public void checkAuthorization(meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest request,
        io.grpc.stub.StreamObserver<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCheckAuthorizationMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * HealthCheck provides health checking for the internal authorization service.
     * This allows the sidecar to verify connectivity and readiness of the main
     * authoriser application.
     * </pre>
     */
    public void healthCheck(meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest request,
        io.grpc.stub.StreamObserver<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getHealthCheckMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service InternalAuthorizationService.
   * <pre>
   * InternalAuthorizationService provides authorization services for internal communication
   * between microservices within the mesh. This service receives authorization requests
   * from the api-gateway-sidecar and delegates to the main authoriser app's business logic.
   * This protocol is designed specifically for internal service-to-service communication
   * and should not be exposed to external clients.
   * </pre>
   */
  public static final class InternalAuthorizationServiceBlockingV2Stub
      extends io.grpc.stub.AbstractBlockingStub<InternalAuthorizationServiceBlockingV2Stub> {
    private InternalAuthorizationServiceBlockingV2Stub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected InternalAuthorizationServiceBlockingV2Stub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new InternalAuthorizationServiceBlockingV2Stub(channel, callOptions);
    }

    /**
     * <pre>
     * CheckAuthorization performs authorization checks for internal service requests.
     * This method receives authorization requests from the sidecar and returns
     * authorization decisions from the main authoriser application's business logic.
     * </pre>
     */
    public meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse checkAuthorization(meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest request) throws io.grpc.StatusException {
      return io.grpc.stub.ClientCalls.blockingV2UnaryCall(
          getChannel(), getCheckAuthorizationMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * HealthCheck provides health checking for the internal authorization service.
     * This allows the sidecar to verify connectivity and readiness of the main
     * authoriser application.
     * </pre>
     */
    public meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse healthCheck(meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest request) throws io.grpc.StatusException {
      return io.grpc.stub.ClientCalls.blockingV2UnaryCall(
          getChannel(), getHealthCheckMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do limited synchronous rpc calls to service InternalAuthorizationService.
   * <pre>
   * InternalAuthorizationService provides authorization services for internal communication
   * between microservices within the mesh. This service receives authorization requests
   * from the api-gateway-sidecar and delegates to the main authoriser app's business logic.
   * This protocol is designed specifically for internal service-to-service communication
   * and should not be exposed to external clients.
   * </pre>
   */
  public static final class InternalAuthorizationServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<InternalAuthorizationServiceBlockingStub> {
    private InternalAuthorizationServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected InternalAuthorizationServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new InternalAuthorizationServiceBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * CheckAuthorization performs authorization checks for internal service requests.
     * This method receives authorization requests from the sidecar and returns
     * authorization decisions from the main authoriser application's business logic.
     * </pre>
     */
    public meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse checkAuthorization(meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCheckAuthorizationMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * HealthCheck provides health checking for the internal authorization service.
     * This allows the sidecar to verify connectivity and readiness of the main
     * authoriser application.
     * </pre>
     */
    public meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse healthCheck(meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getHealthCheckMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service InternalAuthorizationService.
   * <pre>
   * InternalAuthorizationService provides authorization services for internal communication
   * between microservices within the mesh. This service receives authorization requests
   * from the api-gateway-sidecar and delegates to the main authoriser app's business logic.
   * This protocol is designed specifically for internal service-to-service communication
   * and should not be exposed to external clients.
   * </pre>
   */
  public static final class InternalAuthorizationServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<InternalAuthorizationServiceFutureStub> {
    private InternalAuthorizationServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected InternalAuthorizationServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new InternalAuthorizationServiceFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * CheckAuthorization performs authorization checks for internal service requests.
     * This method receives authorization requests from the sidecar and returns
     * authorization decisions from the main authoriser application's business logic.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse> checkAuthorization(
        meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCheckAuthorizationMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * HealthCheck provides health checking for the internal authorization service.
     * This allows the sidecar to verify connectivity and readiness of the main
     * authoriser application.
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse> healthCheck(
        meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getHealthCheckMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_CHECK_AUTHORIZATION = 0;
  private static final int METHODID_HEALTH_CHECK = 1;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final AsyncService serviceImpl;
    private final int methodId;

    MethodHandlers(AsyncService serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_CHECK_AUTHORIZATION:
          serviceImpl.checkAuthorization((meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest) request,
              (io.grpc.stub.StreamObserver<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse>) responseObserver);
          break;
        case METHODID_HEALTH_CHECK:
          serviceImpl.healthCheck((meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest) request,
              (io.grpc.stub.StreamObserver<meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  public static final io.grpc.ServerServiceDefinition bindService(AsyncService service) {
    return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
        .addMethod(
          getCheckAuthorizationMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationRequest,
              meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.CheckAuthorizationResponse>(
                service, METHODID_CHECK_AUTHORIZATION)))
        .addMethod(
          getHealthCheckMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckRequest,
              meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.HealthCheckResponse>(
                service, METHODID_HEALTH_CHECK)))
        .build();
  }

  private static abstract class InternalAuthorizationServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    InternalAuthorizationServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return meshtrade.iam.internal_auth.v1.InternalAuthorizationServiceOuterClass.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("InternalAuthorizationService");
    }
  }

  private static final class InternalAuthorizationServiceFileDescriptorSupplier
      extends InternalAuthorizationServiceBaseDescriptorSupplier {
    InternalAuthorizationServiceFileDescriptorSupplier() {}
  }

  private static final class InternalAuthorizationServiceMethodDescriptorSupplier
      extends InternalAuthorizationServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    InternalAuthorizationServiceMethodDescriptorSupplier(java.lang.String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (InternalAuthorizationServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new InternalAuthorizationServiceFileDescriptorSupplier())
              .addMethod(getCheckAuthorizationMethod())
              .addMethod(getHealthCheckMethod())
              .build();
        }
      }
    }
    return result;
  }
}
