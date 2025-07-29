package co.meshtrade.protoc.model;

import com.google.protobuf.DescriptorProtos.MethodDescriptorProto;
import co.meshtrade.protoc.util.JavaNames;

/**
 * Model representing a protobuf service method and its metadata for code generation.
 * 
 * <p>This class extracts method information from protobuf descriptors and provides
 * a clean interface for code generators to access method names, parameter types,
 * return types, and other metadata needed for generating Java client methods.
 */
public class MethodModel {
    private final String methodName;
    private final String inputType;
    private final String outputType;
    private final String inputTypeName;
    private final String outputTypeName;
    private final String description;
    private final boolean clientStreaming;
    private final boolean serverStreaming;
    
    /**
     * Creates a method model from a protobuf method descriptor.
     * 
     * @param methodDescriptor the protobuf method descriptor
     * @param protoPackage the proto package containing this method
     */
    private MethodModel(MethodDescriptorProto methodDescriptor, String protoPackage) {
        this.methodName = methodDescriptor.getName();
        this.inputType = methodDescriptor.getInputType();
        this.outputType = methodDescriptor.getOutputType();
        this.inputTypeName = extractTypeName(inputType);
        this.outputTypeName = extractTypeName(outputType);
        this.description = extractMethodDescription(methodDescriptor);
        this.clientStreaming = methodDescriptor.getClientStreaming();
        this.serverStreaming = methodDescriptor.getServerStreaming();
    }
    
    /**
     * Creates a MethodModel from a protobuf method descriptor.
     * 
     * @param methodDescriptor the protobuf method descriptor
     * @param protoPackage the proto package containing this method
     * @return a new MethodModel instance
     * @throws IllegalArgumentException if the descriptor is invalid
     */
    public static MethodModel fromProto(MethodDescriptorProto methodDescriptor, String protoPackage) {
        if (methodDescriptor == null) {
            throw new IllegalArgumentException("MethodDescriptorProto cannot be null");
        }
        if (methodDescriptor.getName().isEmpty()) {
            throw new IllegalArgumentException("Method name cannot be empty");
        }
        if (methodDescriptor.getInputType().isEmpty()) {
            throw new IllegalArgumentException("Input type cannot be empty");
        }
        if (methodDescriptor.getOutputType().isEmpty()) {
            throw new IllegalArgumentException("Output type cannot be empty");
        }
        
        return new MethodModel(methodDescriptor, protoPackage);
    }
    
    /**
     * @return the method name (e.g., "GetApiUser")
     */
    public String getMethodName() {
        return methodName;
    }
    
    /**
     * @return the full input type name (e.g., ".meshtrade.iam.api_user.v1.GetApiUserRequest")
     */
    public String getInputType() {
        return inputType;
    }
    
    /**
     * @return the full output type name (e.g., ".meshtrade.iam.api_user.v1.APIUser")
     */
    public String getOutputType() {
        return outputType;
    }
    
    /**
     * @return the simple input type name (e.g., "GetApiUserRequest")
     */
    public String getInputTypeName() {
        return inputTypeName;
    }
    
    /**
     * @return the simple output type name (e.g., "APIUser")
     */
    public String getOutputTypeName() {
        return outputTypeName;
    }
    
    /**
     * @return the fully qualified input type name for Java imports
     */
    public String getInputTypeQualifiedName() {
        return getFullQualifiedTypeName(inputType);
    }
    
    /**
     * @return the fully qualified output type name for Java imports
     */
    public String getOutputTypeQualifiedName() {
        return getFullQualifiedTypeName(outputType);
    }
    
    /**
     * @return the method description
     */
    public String getDescription() {
        return description;
    }
    
    /**
     * @return true if this method uses client streaming
     */
    public boolean isClientStreaming() {
        return clientStreaming;
    }
    
    /**
     * @return true if this method uses server streaming
     */
    public boolean isServerStreaming() {
        return serverStreaming;
    }
    
    /**
     * @return true if this is a unary method (no streaming)
     */
    public boolean isUnary() {
        return !clientStreaming && !serverStreaming;
    }
    
    /**
     * @return the Java method name in camelCase (e.g., "getApiUser")
     */
    public String getJavaMethodName() {
        return JavaNames.toCamelCase(methodName);
    }
    
    /**
     * Extracts the simple type name from a fully qualified protobuf type.
     * 
     * @param fullTypeName the full type name (e.g., ".meshtrade.iam.api_user.v1.APIUser")
     * @return the simple type name (e.g., "APIUser")
     */
    private String extractTypeName(String fullTypeName) {
        // Remove leading dot and extract the last component
        String withoutDot = fullTypeName.startsWith(".") ? fullTypeName.substring(1) : fullTypeName;
        int lastDotIndex = withoutDot.lastIndexOf('.');
        return lastDotIndex >= 0 ? withoutDot.substring(lastDotIndex + 1) : withoutDot;
    }
    
    /**
     * Converts a protobuf type name to a Java qualified class name.
     * 
     * @param protoTypeName the proto type name (e.g., ".meshtrade.iam.api_user.v1.APIUser")
     * @return the Java qualified class name (e.g., "meshtrade.iam.api_user.v1.Service.APIUser")
     */
    private String getFullQualifiedTypeName(String protoTypeName) {
        // Remove leading dot
        String withoutDot = protoTypeName.startsWith(".") ? protoTypeName.substring(1) : protoTypeName;
        
        // Extract package and type name
        int lastDotIndex = withoutDot.lastIndexOf('.');
        if (lastDotIndex >= 0) {
            String packageName = withoutDot.substring(0, lastDotIndex);
            String typeName = withoutDot.substring(lastDotIndex + 1);
            // For generated protobuf classes, they are nested in the Service class
            return packageName + ".Service." + typeName;
        } else {
            return "Service." + withoutDot;
        }
    }
    
    /**
     * Extracts method description from protobuf comments.
     * 
     * @param methodDescriptor the method descriptor
     * @return extracted description or default text
     */
    private String extractMethodDescription(MethodDescriptorProto methodDescriptor) {
        // TODO: Extract from source code info when available
        // For now, provide a default description
        return String.format("Executes the %s RPC method", methodName);
    }
    
    @Override
    public String toString() {
        return String.format("MethodModel{name=%s, input=%s, output=%s, streaming=%s}", 
            methodName, inputTypeName, outputTypeName, 
            clientStreaming || serverStreaming ? "yes" : "no");
    }
}