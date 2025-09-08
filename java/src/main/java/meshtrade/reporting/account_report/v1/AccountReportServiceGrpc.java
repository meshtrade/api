package meshtrade.reporting.account_report.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 * <pre>
 *AccountReportService manages account report generation and export.
 *This service allows clients to retrieve structured income reports
 *and download them as Excel files. Reports are generated for a
 *specified account over a given time range and denominated in
 *a selected reporting currency.
 *All operations require access to financial reporting permissions.
 * </pre>
 */
@io.grpc.stub.annotations.GrpcGenerated
public final class AccountReportServiceGrpc {

  private AccountReportServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "meshtrade.reporting.account_report.v1.AccountReportService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest,
      meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport> getGetAccountReportMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetAccountReport",
      requestType = meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest.class,
      responseType = meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest,
      meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport> getGetAccountReportMethod() {
    io.grpc.MethodDescriptor<meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest, meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport> getGetAccountReportMethod;
    if ((getGetAccountReportMethod = AccountReportServiceGrpc.getGetAccountReportMethod) == null) {
      synchronized (AccountReportServiceGrpc.class) {
        if ((getGetAccountReportMethod = AccountReportServiceGrpc.getGetAccountReportMethod) == null) {
          AccountReportServiceGrpc.getGetAccountReportMethod = getGetAccountReportMethod =
              io.grpc.MethodDescriptor.<meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest, meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetAccountReport"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport.getDefaultInstance()))
              .setSchemaDescriptor(new AccountReportServiceMethodDescriptorSupplier("GetAccountReport"))
              .build();
        }
      }
    }
    return getGetAccountReportMethod;
  }

  private static volatile io.grpc.MethodDescriptor<meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest,
      meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse> getGetExcelAccountReportMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetExcelAccountReport",
      requestType = meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest.class,
      responseType = meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest,
      meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse> getGetExcelAccountReportMethod() {
    io.grpc.MethodDescriptor<meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest, meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse> getGetExcelAccountReportMethod;
    if ((getGetExcelAccountReportMethod = AccountReportServiceGrpc.getGetExcelAccountReportMethod) == null) {
      synchronized (AccountReportServiceGrpc.class) {
        if ((getGetExcelAccountReportMethod = AccountReportServiceGrpc.getGetExcelAccountReportMethod) == null) {
          AccountReportServiceGrpc.getGetExcelAccountReportMethod = getGetExcelAccountReportMethod =
              io.grpc.MethodDescriptor.<meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest, meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetExcelAccountReport"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AccountReportServiceMethodDescriptorSupplier("GetExcelAccountReport"))
              .build();
        }
      }
    }
    return getGetExcelAccountReportMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static AccountReportServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AccountReportServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AccountReportServiceStub>() {
        @java.lang.Override
        public AccountReportServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AccountReportServiceStub(channel, callOptions);
        }
      };
    return AccountReportServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports all types of calls on the service
   */
  public static AccountReportServiceBlockingV2Stub newBlockingV2Stub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AccountReportServiceBlockingV2Stub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AccountReportServiceBlockingV2Stub>() {
        @java.lang.Override
        public AccountReportServiceBlockingV2Stub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AccountReportServiceBlockingV2Stub(channel, callOptions);
        }
      };
    return AccountReportServiceBlockingV2Stub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static AccountReportServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AccountReportServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AccountReportServiceBlockingStub>() {
        @java.lang.Override
        public AccountReportServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AccountReportServiceBlockingStub(channel, callOptions);
        }
      };
    return AccountReportServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static AccountReportServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AccountReportServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AccountReportServiceFutureStub>() {
        @java.lang.Override
        public AccountReportServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AccountReportServiceFutureStub(channel, callOptions);
        }
      };
    return AccountReportServiceFutureStub.newStub(factory, channel);
  }

  /**
   * <pre>
   *AccountReportService manages account report generation and export.
   *This service allows clients to retrieve structured income reports
   *and download them as Excel files. Reports are generated for a
   *specified account over a given time range and denominated in
   *a selected reporting currency.
   *All operations require access to financial reporting permissions.
   * </pre>
   */
  public interface AsyncService {

    /**
     * <pre>
     *Retrieves a structured income report for a specific account and time range.
     *Parameters:
     *- account_num: Unique account identifier
     *- from: Start timestamp for the report period
     *- to: End timestamp for the report period
     *- reporting_currency_token: Token in which report values are denominated
     *Returns:
     *- GetAccountReportRequest: Structured income report with earnings breakdown
     * </pre>
     */
    default void getAccountReport(meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest request,
        io.grpc.stub.StreamObserver<meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetAccountReportMethod(), responseObserver);
    }

    /**
     * <pre>
     *Exports an income report to Excel format for download.
     *Parameters:
     *- account_num: Unique account identifier
     *- from: Start timestamp for the report period
     *- to: End timestamp for the report period
     *- reporting_currency_token: Token in which report values are denominated
     *Returns:
     *- GetExcelAccountReportRequest: Base64-encoded Excel file containing the report
     * </pre>
     */
    default void getExcelAccountReport(meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest request,
        io.grpc.stub.StreamObserver<meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetExcelAccountReportMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service AccountReportService.
   * <pre>
   *AccountReportService manages account report generation and export.
   *This service allows clients to retrieve structured income reports
   *and download them as Excel files. Reports are generated for a
   *specified account over a given time range and denominated in
   *a selected reporting currency.
   *All operations require access to financial reporting permissions.
   * </pre>
   */
  public static abstract class AccountReportServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return AccountReportServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service AccountReportService.
   * <pre>
   *AccountReportService manages account report generation and export.
   *This service allows clients to retrieve structured income reports
   *and download them as Excel files. Reports are generated for a
   *specified account over a given time range and denominated in
   *a selected reporting currency.
   *All operations require access to financial reporting permissions.
   * </pre>
   */
  public static final class AccountReportServiceStub
      extends io.grpc.stub.AbstractAsyncStub<AccountReportServiceStub> {
    private AccountReportServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AccountReportServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AccountReportServiceStub(channel, callOptions);
    }

    /**
     * <pre>
     *Retrieves a structured income report for a specific account and time range.
     *Parameters:
     *- account_num: Unique account identifier
     *- from: Start timestamp for the report period
     *- to: End timestamp for the report period
     *- reporting_currency_token: Token in which report values are denominated
     *Returns:
     *- GetAccountReportRequest: Structured income report with earnings breakdown
     * </pre>
     */
    public void getAccountReport(meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest request,
        io.grpc.stub.StreamObserver<meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetAccountReportMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     *Exports an income report to Excel format for download.
     *Parameters:
     *- account_num: Unique account identifier
     *- from: Start timestamp for the report period
     *- to: End timestamp for the report period
     *- reporting_currency_token: Token in which report values are denominated
     *Returns:
     *- GetExcelAccountReportRequest: Base64-encoded Excel file containing the report
     * </pre>
     */
    public void getExcelAccountReport(meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest request,
        io.grpc.stub.StreamObserver<meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetExcelAccountReportMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service AccountReportService.
   * <pre>
   *AccountReportService manages account report generation and export.
   *This service allows clients to retrieve structured income reports
   *and download them as Excel files. Reports are generated for a
   *specified account over a given time range and denominated in
   *a selected reporting currency.
   *All operations require access to financial reporting permissions.
   * </pre>
   */
  public static final class AccountReportServiceBlockingV2Stub
      extends io.grpc.stub.AbstractBlockingStub<AccountReportServiceBlockingV2Stub> {
    private AccountReportServiceBlockingV2Stub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AccountReportServiceBlockingV2Stub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AccountReportServiceBlockingV2Stub(channel, callOptions);
    }

    /**
     * <pre>
     *Retrieves a structured income report for a specific account and time range.
     *Parameters:
     *- account_num: Unique account identifier
     *- from: Start timestamp for the report period
     *- to: End timestamp for the report period
     *- reporting_currency_token: Token in which report values are denominated
     *Returns:
     *- GetAccountReportRequest: Structured income report with earnings breakdown
     * </pre>
     */
    public meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport getAccountReport(meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest request) throws io.grpc.StatusException {
      return io.grpc.stub.ClientCalls.blockingV2UnaryCall(
          getChannel(), getGetAccountReportMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     *Exports an income report to Excel format for download.
     *Parameters:
     *- account_num: Unique account identifier
     *- from: Start timestamp for the report period
     *- to: End timestamp for the report period
     *- reporting_currency_token: Token in which report values are denominated
     *Returns:
     *- GetExcelAccountReportRequest: Base64-encoded Excel file containing the report
     * </pre>
     */
    public meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse getExcelAccountReport(meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest request) throws io.grpc.StatusException {
      return io.grpc.stub.ClientCalls.blockingV2UnaryCall(
          getChannel(), getGetExcelAccountReportMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do limited synchronous rpc calls to service AccountReportService.
   * <pre>
   *AccountReportService manages account report generation and export.
   *This service allows clients to retrieve structured income reports
   *and download them as Excel files. Reports are generated for a
   *specified account over a given time range and denominated in
   *a selected reporting currency.
   *All operations require access to financial reporting permissions.
   * </pre>
   */
  public static final class AccountReportServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<AccountReportServiceBlockingStub> {
    private AccountReportServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AccountReportServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AccountReportServiceBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     *Retrieves a structured income report for a specific account and time range.
     *Parameters:
     *- account_num: Unique account identifier
     *- from: Start timestamp for the report period
     *- to: End timestamp for the report period
     *- reporting_currency_token: Token in which report values are denominated
     *Returns:
     *- GetAccountReportRequest: Structured income report with earnings breakdown
     * </pre>
     */
    public meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport getAccountReport(meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetAccountReportMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     *Exports an income report to Excel format for download.
     *Parameters:
     *- account_num: Unique account identifier
     *- from: Start timestamp for the report period
     *- to: End timestamp for the report period
     *- reporting_currency_token: Token in which report values are denominated
     *Returns:
     *- GetExcelAccountReportRequest: Base64-encoded Excel file containing the report
     * </pre>
     */
    public meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse getExcelAccountReport(meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetExcelAccountReportMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service AccountReportService.
   * <pre>
   *AccountReportService manages account report generation and export.
   *This service allows clients to retrieve structured income reports
   *and download them as Excel files. Reports are generated for a
   *specified account over a given time range and denominated in
   *a selected reporting currency.
   *All operations require access to financial reporting permissions.
   * </pre>
   */
  public static final class AccountReportServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<AccountReportServiceFutureStub> {
    private AccountReportServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AccountReportServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AccountReportServiceFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     *Retrieves a structured income report for a specific account and time range.
     *Parameters:
     *- account_num: Unique account identifier
     *- from: Start timestamp for the report period
     *- to: End timestamp for the report period
     *- reporting_currency_token: Token in which report values are denominated
     *Returns:
     *- GetAccountReportRequest: Structured income report with earnings breakdown
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport> getAccountReport(
        meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetAccountReportMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     *Exports an income report to Excel format for download.
     *Parameters:
     *- account_num: Unique account identifier
     *- from: Start timestamp for the report period
     *- to: End timestamp for the report period
     *- reporting_currency_token: Token in which report values are denominated
     *Returns:
     *- GetExcelAccountReportRequest: Base64-encoded Excel file containing the report
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse> getExcelAccountReport(
        meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetExcelAccountReportMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_GET_ACCOUNT_REPORT = 0;
  private static final int METHODID_GET_EXCEL_ACCOUNT_REPORT = 1;

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
        case METHODID_GET_ACCOUNT_REPORT:
          serviceImpl.getAccountReport((meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest) request,
              (io.grpc.stub.StreamObserver<meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport>) responseObserver);
          break;
        case METHODID_GET_EXCEL_ACCOUNT_REPORT:
          serviceImpl.getExcelAccountReport((meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest) request,
              (io.grpc.stub.StreamObserver<meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse>) responseObserver);
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
          getGetAccountReportMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              meshtrade.reporting.account_report.v1.Service.GetAccountReportRequest,
              meshtrade.reporting.account_report.v1.AccountReportOuterClass.AccountReport>(
                service, METHODID_GET_ACCOUNT_REPORT)))
        .addMethod(
          getGetExcelAccountReportMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportRequest,
              meshtrade.reporting.account_report.v1.Service.GetExcelAccountReportResponse>(
                service, METHODID_GET_EXCEL_ACCOUNT_REPORT)))
        .build();
  }

  private static abstract class AccountReportServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    AccountReportServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return meshtrade.reporting.account_report.v1.Service.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("AccountReportService");
    }
  }

  private static final class AccountReportServiceFileDescriptorSupplier
      extends AccountReportServiceBaseDescriptorSupplier {
    AccountReportServiceFileDescriptorSupplier() {}
  }

  private static final class AccountReportServiceMethodDescriptorSupplier
      extends AccountReportServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    AccountReportServiceMethodDescriptorSupplier(java.lang.String methodName) {
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
      synchronized (AccountReportServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new AccountReportServiceFileDescriptorSupplier())
              .addMethod(getGetAccountReportMethod())
              .addMethod(getGetExcelAccountReportMethod())
              .build();
        }
      }
    }
    return result;
  }
}
