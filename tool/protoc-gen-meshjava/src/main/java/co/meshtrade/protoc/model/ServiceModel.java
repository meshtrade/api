package co.meshtrade.protoc.model;

import com.google.protobuf.DescriptorProtos.FileDescriptorProto;
import com.google.protobuf.DescriptorProtos.ServiceDescriptorProto;
import co.meshtrade.protoc.util.JavaNames;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Model representing a protobuf service and its metadata for code generation.
 * 
 * <p>This class extracts and normalizes information from protobuf descriptors
 * to provide a clean, type-safe model for the code generators to work with.
 * It handles package name conversions, service documentation, and method
 * information extraction.
 */
public class ServiceModel {
    private final String protoPackage;
    private final String javaPackage;
    private final String packagePath;
    private final String serviceName;
    private final String serviceDescription;
    private final String protoFileName;
    private final List<MethodModel> methods;
    private final String documentationUrl;
    
    /**
     * Creates a service model from protobuf descriptors.
     * 
     * @param fileDescriptor the proto file containing the service
     * @param serviceDescriptor the service descriptor
     */
    private ServiceModel(FileDescriptorProto fileDescriptor, ServiceDescriptorProto serviceDescriptor) {
        this.protoPackage = fileDescriptor.getPackage();
        this.javaPackage = JavaNames.protoPackageToJavaPackage(protoPackage);
        this.packagePath = javaPackage.replace('.', '/');
        this.serviceName = serviceDescriptor.getName();
        this.serviceDescription = extractServiceDescription(serviceDescriptor);
        this.protoFileName = fileDescriptor.getName();
        this.methods = serviceDescriptor.getMethodList().stream()
            .map(method -> MethodModel.fromProto(method, protoPackage))
            .collect(Collectors.toList());
        this.documentationUrl = generateDocumentationUrl();
    }
    
    /**
     * Creates a ServiceModel from protobuf descriptors.
     * 
     * @param fileDescriptor the proto file containing the service
     * @param serviceDescriptor the service descriptor
     * @return a new ServiceModel instance
     * @throws IllegalArgumentException if descriptors are invalid
     */
    public static ServiceModel fromProto(FileDescriptorProto fileDescriptor, 
                                       ServiceDescriptorProto serviceDescriptor) {
        if (fileDescriptor == null) {
            throw new IllegalArgumentException("FileDescriptorProto cannot be null");
        }
        if (serviceDescriptor == null) {
            throw new IllegalArgumentException("ServiceDescriptorProto cannot be null");
        }
        if (fileDescriptor.getPackage().isEmpty()) {
            throw new IllegalArgumentException("Proto package cannot be empty");
        }
        if (serviceDescriptor.getName().isEmpty()) {
            throw new IllegalArgumentException("Service name cannot be empty");
        }
        
        return new ServiceModel(fileDescriptor, serviceDescriptor);
    }
    
    /**
     * @return the original protobuf package name (e.g., "meshtrade.iam.api_user.v1")
     */
    public String getProtoPackage() {
        return protoPackage;
    }
    
    /**
     * @return the Java package name (e.g., "co.meshtrade.api.iam.api_user.v1")
     */
    public String getJavaPackage() {
        return javaPackage;
    }
    
    /**
     * @return the package path for file generation (e.g., "co/meshtrade/api/iam/api_user/v1")
     */
    public String getPackagePath() {
        return packagePath;
    }
    
    /**
     * @return the service name (e.g., "ApiUserService")
     */
    public String getServiceName() {
        return serviceName;
    }
    
    /**
     * @return the service description extracted from comments
     */
    public String getServiceDescription() {
        return serviceDescription;
    }
    
    /**
     * @return the original proto file name
     */
    public String getProtoFileName() {
        return protoFileName;
    }
    
    /**
     * @return list of methods in this service
     */
    public List<MethodModel> getMethods() {
        return methods;
    }
    
    /**
     * @return URL to the service documentation
     */
    public String getDocumentationUrl() {
        return documentationUrl;
    }
    
    /**
     * @return the gRPC stub class name (e.g., "ApiUserServiceGrpc.ApiUserServiceBlockingStub")
     */
    public String getGrpcStubClassName() {
        return serviceName + "Grpc." + serviceName + "BlockingStub";
    }
    
    /**
     * @return the gRPC stub factory method reference (e.g., "ApiUserServiceGrpc::newBlockingStub")
     */
    public String getGrpcStubFactoryMethodRef() {
        return serviceName + "Grpc::newBlockingStub";
    }
    
    /**
     * @return the client class name (e.g., "ApiUserServiceClient")
     */
    public String getClientClassName() {
        return serviceName + "Client";
    }
    
    /**
     * Extracts service description from protobuf comments.
     * 
     * @param serviceDescriptor the service descriptor
     * @return extracted description or default text
     */
    private String extractServiceDescription(ServiceDescriptorProto serviceDescriptor) {
        // TODO: Extract from source code info when available
        // For now, provide a default description
        return String.format("gRPC service for %s operations", serviceName);
    }
    
    /**
     * Generates the documentation URL for this service.
     * 
     * @return URL to the service documentation
     */
    private String generateDocumentationUrl() {
        // Convert proto package to documentation path
        // e.g., "meshtrade.iam.api_user.v1" -> "iam/api_user/v1"
        String docPath = protoPackage
            .replace("meshtrade.", "")
            .replace(".", "/");
        
        return "https://meshtrade.github.io/api/docs/api-reference/" + docPath;
    }
    
    @Override
    public String toString() {
        return String.format("ServiceModel{service=%s, package=%s, methods=%d}", 
            serviceName, javaPackage, methods.size());
    }
}