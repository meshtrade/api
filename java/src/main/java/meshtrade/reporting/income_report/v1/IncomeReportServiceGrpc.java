package meshtrade.reporting.income_report.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.60.1)",
    comments = "Source: meshtrade/reporting/income_report/v1/service.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class IncomeReportServiceGrpc {

  private IncomeReportServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "meshtrade.reporting.income_report.v1.IncomeReportService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest,
      meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse> getGetIncomeReportMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetIncomeReport",
      requestType = meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest.class,
      responseType = meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest,
      meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse> getGetIncomeReportMethod() {
    io.grpc.MethodDescriptor<meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest, meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse> getGetIncomeReportMethod;
    if ((getGetIncomeReportMethod = IncomeReportServiceGrpc.getGetIncomeReportMethod) == null) {
      synchronized (IncomeReportServiceGrpc.class) {
        if ((getGetIncomeReportMethod = IncomeReportServiceGrpc.getGetIncomeReportMethod) == null) {
          IncomeReportServiceGrpc.getGetIncomeReportMethod = getGetIncomeReportMethod =
              io.grpc.MethodDescriptor.<meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest, meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetIncomeReport"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse.getDefaultInstance()))
              .setSchemaDescriptor(new IncomeReportServiceMethodDescriptorSupplier("GetIncomeReport"))
              .build();
        }
      }
    }
    return getGetIncomeReportMethod;
  }

  private static volatile io.grpc.MethodDescriptor<meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest,
      meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse> getGetExcelIncomeReportMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetExcelIncomeReport",
      requestType = meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest.class,
      responseType = meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest,
      meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse> getGetExcelIncomeReportMethod() {
    io.grpc.MethodDescriptor<meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest, meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse> getGetExcelIncomeReportMethod;
    if ((getGetExcelIncomeReportMethod = IncomeReportServiceGrpc.getGetExcelIncomeReportMethod) == null) {
      synchronized (IncomeReportServiceGrpc.class) {
        if ((getGetExcelIncomeReportMethod = IncomeReportServiceGrpc.getGetExcelIncomeReportMethod) == null) {
          IncomeReportServiceGrpc.getGetExcelIncomeReportMethod = getGetExcelIncomeReportMethod =
              io.grpc.MethodDescriptor.<meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest, meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetExcelIncomeReport"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse.getDefaultInstance()))
              .setSchemaDescriptor(new IncomeReportServiceMethodDescriptorSupplier("GetExcelIncomeReport"))
              .build();
        }
      }
    }
    return getGetExcelIncomeReportMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static IncomeReportServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<IncomeReportServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<IncomeReportServiceStub>() {
        @java.lang.Override
        public IncomeReportServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new IncomeReportServiceStub(channel, callOptions);
        }
      };
    return IncomeReportServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static IncomeReportServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<IncomeReportServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<IncomeReportServiceBlockingStub>() {
        @java.lang.Override
        public IncomeReportServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new IncomeReportServiceBlockingStub(channel, callOptions);
        }
      };
    return IncomeReportServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static IncomeReportServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<IncomeReportServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<IncomeReportServiceFutureStub>() {
        @java.lang.Override
        public IncomeReportServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new IncomeReportServiceFutureStub(channel, callOptions);
        }
      };
    return IncomeReportServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void getIncomeReport(meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest request,
        io.grpc.stub.StreamObserver<meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetIncomeReportMethod(), responseObserver);
    }

    /**
     */
    default void getExcelIncomeReport(meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest request,
        io.grpc.stub.StreamObserver<meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetExcelIncomeReportMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service IncomeReportService.
   */
  public static abstract class IncomeReportServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return IncomeReportServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service IncomeReportService.
   */
  public static final class IncomeReportServiceStub
      extends io.grpc.stub.AbstractAsyncStub<IncomeReportServiceStub> {
    private IncomeReportServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected IncomeReportServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new IncomeReportServiceStub(channel, callOptions);
    }

    /**
     */
    public void getIncomeReport(meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest request,
        io.grpc.stub.StreamObserver<meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetIncomeReportMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void getExcelIncomeReport(meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest request,
        io.grpc.stub.StreamObserver<meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetExcelIncomeReportMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service IncomeReportService.
   */
  public static final class IncomeReportServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<IncomeReportServiceBlockingStub> {
    private IncomeReportServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected IncomeReportServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new IncomeReportServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse getIncomeReport(meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetIncomeReportMethod(), getCallOptions(), request);
    }

    /**
     */
    public meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse getExcelIncomeReport(meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetExcelIncomeReportMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service IncomeReportService.
   */
  public static final class IncomeReportServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<IncomeReportServiceFutureStub> {
    private IncomeReportServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected IncomeReportServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new IncomeReportServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse> getIncomeReport(
        meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetIncomeReportMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse> getExcelIncomeReport(
        meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetExcelIncomeReportMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_GET_INCOME_REPORT = 0;
  private static final int METHODID_GET_EXCEL_INCOME_REPORT = 1;

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
        case METHODID_GET_INCOME_REPORT:
          serviceImpl.getIncomeReport((meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest) request,
              (io.grpc.stub.StreamObserver<meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse>) responseObserver);
          break;
        case METHODID_GET_EXCEL_INCOME_REPORT:
          serviceImpl.getExcelIncomeReport((meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest) request,
              (io.grpc.stub.StreamObserver<meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse>) responseObserver);
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
          getGetIncomeReportMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              meshtrade.reporting.income_report.v1.Service.GetIncomeReportRequest,
              meshtrade.reporting.income_report.v1.Service.GetIncomeReportResponse>(
                service, METHODID_GET_INCOME_REPORT)))
        .addMethod(
          getGetExcelIncomeReportMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportRequest,
              meshtrade.reporting.income_report.v1.Service.GetExcelIncomeReportResponse>(
                service, METHODID_GET_EXCEL_INCOME_REPORT)))
        .build();
  }

  private static abstract class IncomeReportServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    IncomeReportServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return meshtrade.reporting.income_report.v1.Service.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("IncomeReportService");
    }
  }

  private static final class IncomeReportServiceFileDescriptorSupplier
      extends IncomeReportServiceBaseDescriptorSupplier {
    IncomeReportServiceFileDescriptorSupplier() {}
  }

  private static final class IncomeReportServiceMethodDescriptorSupplier
      extends IncomeReportServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    IncomeReportServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (IncomeReportServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new IncomeReportServiceFileDescriptorSupplier())
              .addMethod(getGetIncomeReportMethod())
              .addMethod(getGetExcelIncomeReportMethod())
              .build();
        }
      }
    }
    return result;
  }
}
