package co.meshtrade.protoc.generator;

import com.google.protobuf.DescriptorProtos.FileDescriptorProto;
import com.google.protobuf.DescriptorProtos.ServiceDescriptorProto;
import com.google.protobuf.compiler.PluginProtos.CodeGeneratorResponse;
import co.meshtrade.protoc.model.ServiceModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * Main orchestrator for generating Java code from protobuf service definitions.
 * 
 * <p>This class coordinates the generation of Java interfaces, client implementations,
 * and mock implementations for gRPC services. It processes service models and delegates 
 * to specialized generators for interfaces, clients, and mocks, then packages the results 
 * into protoc-compatible output files.
 * 
 * <h2>Generated Files</h2>
 * <p>For each protobuf service, this generator creates:
 * <ul>
 * <li><strong>Service Interface:</strong> {@code {ServiceName}Interface.java} - Clean interface defining the service contract</li>
 * <li><strong>Client Implementation:</strong> {@code {ServiceName}.java} - Full client implementation extending BaseGRPCClient</li>
 * <li><strong>Mock Implementation:</strong> {@code Mock{ServiceName}.java} - Thread-safe mock for testing</li>
 * </ul>
 * 
 * <h2>Code Generation Process</h2>
 * <ol>
 * <li>Process service model to extract service information</li>
 * <li>Generate service interface using {@link InterfaceGenerator}</li>
 * <li>Generate client implementation using {@link ClientGenerator}</li>
 * <li>Generate mock implementation using {@link MockGenerator}</li>
 * <li>Package all files into protoc response format</li>
 * </ol>
 * 
 * @see InterfaceGenerator
 * @see ClientGenerator
 * @see MockGenerator
 * @see ServiceModel
 */
public class ServiceGenerator {
    private static final Logger logger = LoggerFactory.getLogger(ServiceGenerator.class);
    
    private final InterfaceGenerator interfaceGenerator;
    private final ClientGenerator clientGenerator;
    private final MockGenerator mockGenerator;
    
    /**
     * Creates a new service generator with default sub-generators.
     */
    public ServiceGenerator() {
        this.interfaceGenerator = new InterfaceGenerator();
        this.clientGenerator = new ClientGenerator();
        this.mockGenerator = new MockGenerator();
    }
    
    /**
     * Creates a new service generator with custom sub-generators.
     * 
     * @param interfaceGenerator the interface generator to use
     * @param clientGenerator the client generator to use
     * @param mockGenerator the mock generator to use
     */
    public ServiceGenerator(InterfaceGenerator interfaceGenerator, ClientGenerator clientGenerator, MockGenerator mockGenerator) {
        this.interfaceGenerator = interfaceGenerator;
        this.clientGenerator = clientGenerator;
        this.mockGenerator = mockGenerator;
    }
    
    /**
     * Generates Java client code for all services in a protobuf file.
     * 
     * <p>For each service in the file, this method generates:
     * <ul>
     * <li>A service interface defining the contract</li>
     * <li>A client implementation providing the actual gRPC functionality</li>
     * </ul>
     * 
     * @param fileDescriptor the protobuf file descriptor containing service definitions
     * @return list of generated code files to be written by protoc
     * @throws IllegalArgumentException if the file descriptor is invalid
     * @throws RuntimeException if code generation fails
     */
    public List<CodeGeneratorResponse.File> generateForFile(FileDescriptorProto fileDescriptor) {
        if (fileDescriptor == null) {
            throw new IllegalArgumentException("FileDescriptorProto cannot be null");
        }
        
        logger.debug("Generating code for file: {} with {} services", 
            fileDescriptor.getName(), fileDescriptor.getServiceCount());
        
        List<CodeGeneratorResponse.File> generatedFiles = new ArrayList<>();
        
        // Process each service in the file
        for (ServiceDescriptorProto serviceDescriptor : fileDescriptor.getServiceList()) {
            logger.debug("Processing service: {}", serviceDescriptor.getName());
            
            try {
                // Create service model from protobuf descriptor
                ServiceModel serviceModel = ServiceModel.fromProto(fileDescriptor, serviceDescriptor);
                
                // Generate both interface and client files for this service
                List<CodeGeneratorResponse.File> serviceFiles = generateService(serviceModel);
                generatedFiles.addAll(serviceFiles);
                
            } catch (Exception e) {
                String errorMsg = String.format("Failed to generate code for service %s in file %s", 
                    serviceDescriptor.getName(), fileDescriptor.getName());
                logger.error(errorMsg, e);
                throw new RuntimeException(errorMsg, e);
            }
        }
        
        logger.info("Generated {} files for {} services in {}", 
            generatedFiles.size(), fileDescriptor.getServiceCount(), fileDescriptor.getName());
        
        return generatedFiles;
    }
    
    /**
     * Generates Java code files for a single service.
     * 
     * <p>This method creates the service interface, client implementation, and
     * mock implementation files for the given service model. The generated files 
     * follow Java naming conventions and include comprehensive documentation.
     * 
     * @param serviceModel the service model to generate code for
     * @return list of generated files in protoc response format
     * @throws RuntimeException if code generation fails
     */
    public List<CodeGeneratorResponse.File> generateService(ServiceModel serviceModel) {
        logger.info("Generating Java code for service: {}", serviceModel.getServiceName());
        
        List<CodeGeneratorResponse.File> files = new ArrayList<>();
        
        try {
            // Generate service interface
            String interfaceCode = interfaceGenerator.generate(serviceModel);
            String interfacePath = getInterfaceFilePath(serviceModel);
            
            files.add(CodeGeneratorResponse.File.newBuilder()
                .setName(interfacePath)
                .setContent(interfaceCode)
                .build());
            
            logger.debug("Generated interface file: {}", interfacePath);
            
            // Generate client implementation
            String clientCode = clientGenerator.generate(serviceModel);
            String clientPath = getClientFilePath(serviceModel);
            
            files.add(CodeGeneratorResponse.File.newBuilder()
                .setName(clientPath)
                .setContent(clientCode)
                .build());
            
            logger.debug("Generated client file: {}", clientPath);
            
            // TODO: Temporarily disable mock generation while debugging
            // Generate mock implementation
            // String mockCode = mockGenerator.generate(serviceModel);
            // String mockPath = getMockFilePath(serviceModel);
            // 
            // files.add(CodeGeneratorResponse.File.newBuilder()
            //     .setName(mockPath)
            //     .setContent(mockCode)
            //     .build());
            // 
            // logger.debug("Generated mock file: {}", mockPath);
            
            logger.info("Successfully generated {} files for service: {}", files.size(), serviceModel.getServiceName());
            return files;
            
        } catch (Exception e) {
            String errorMsg = String.format("Failed to generate code for service %s", serviceModel.getServiceName());
            logger.error(errorMsg, e);
            throw new RuntimeException(errorMsg, e);
        }
    }
    
    /**
     * Generates Java code files for multiple services.
     * 
     * <p>This method processes multiple service models in batch, generating
     * all interface and client files. It's more efficient than calling
     * {@link #generateService(ServiceModel)} repeatedly.
     * 
     * @param serviceModels the service models to generate code for
     * @return list of all generated files in protoc response format
     * @throws RuntimeException if code generation fails for any service
     */
    public List<CodeGeneratorResponse.File> generateServices(List<ServiceModel> serviceModels) {
        logger.info("Generating Java code for {} services", serviceModels.size());
        
        List<CodeGeneratorResponse.File> allFiles = new ArrayList<>();
        
        for (ServiceModel serviceModel : serviceModels) {
            try {
                List<CodeGeneratorResponse.File> serviceFiles = generateService(serviceModel);
                allFiles.addAll(serviceFiles);
            } catch (Exception e) {
                String errorMsg = String.format("Failed to generate code for service %s in batch operation", 
                    serviceModel.getServiceName());
                logger.error(errorMsg, e);
                throw new RuntimeException(errorMsg, e);
            }
        }
        
        logger.info("Successfully generated {} total files for {} services", allFiles.size(), serviceModels.size());
        return allFiles;
    }
    
    /**
     * Constructs the file path for the service interface.
     * 
     * <p>The interface file path follows Java package conventions:
     * {@code {package_path}/{ServiceName}Interface.java}
     * 
     * @param serviceModel the service model
     * @return the relative file path for the interface
     */
    private String getInterfaceFilePath(ServiceModel serviceModel) {
        String packagePath = serviceModel.getJavaPackage().replace('.', '/');
        return String.format("%s/%sInterface.java", packagePath, serviceModel.getServiceName());
    }
    
    /**
     * Constructs the file path for the client implementation.
     * 
     * <p>The client file path follows Java package conventions:
     * {@code {package_path}/{ServiceName}.java}
     * 
     * @param serviceModel the service model
     * @return the relative file path for the client implementation
     */
    private String getClientFilePath(ServiceModel serviceModel) {
        String packagePath = serviceModel.getJavaPackage().replace('.', '/');
        return String.format("%s/%s.java", packagePath, serviceModel.getClientClassName());
    }
    
    /**
     * Constructs the file path for the mock implementation.
     * 
     * <p>The mock file path follows Java package conventions:
     * {@code {package_path}/Mock{ServiceName}.java}
     * 
     * @param serviceModel the service model
     * @return the relative file path for the mock implementation
     */
    private String getMockFilePath(ServiceModel serviceModel) {
        String packagePath = serviceModel.getJavaPackage().replace('.', '/');
        return String.format("%s/Mock%s.java", packagePath, serviceModel.getServiceName());
    }
    
    /**
     * Returns statistics about the code generation process.
     * 
     * @param serviceModels the service models that were processed
     * @return human-readable generation statistics
     */
    public String getGenerationStats(List<ServiceModel> serviceModels) {
        int totalServices = serviceModels.size();
        int totalMethods = serviceModels.stream()
            .mapToInt(service -> service.getMethods().size())
            .sum();
        int totalFiles = totalServices * 2; // interface + client for each service (mock disabled)
        
        return String.format(
            "Generation Statistics:\n" +
            "  Services: %d\n" +
            "  Methods: %d\n" +
            "  Generated Files: %d\n" +
            "  Files per Service: 2 (interface + client)",
            totalServices, totalMethods, totalFiles
        );
    }
}