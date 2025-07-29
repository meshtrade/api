package co.meshtrade.protoc;

import com.google.protobuf.compiler.PluginProtos.CodeGeneratorRequest;
import com.google.protobuf.compiler.PluginProtos.CodeGeneratorResponse;
import co.meshtrade.protoc.generator.ServiceGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Arrays;

/**
 * Main entry point for the protoc-gen-meshjava plugin.
 * 
 * <p>This class implements the protoc plugin protocol by reading a 
 * {@link CodeGeneratorRequest} from stdin and writing a {@link CodeGeneratorResponse}
 * to stdout. It processes protobuf service definitions and generates enhanced
 * Java gRPC clients using JavaPoet.
 * 
 * <p>The plugin generates:
 * <ul>
 * <li>Service interfaces for each protobuf service</li>
 * <li>Client implementations extending BaseGRPCClient</li>
 * <li>Configuration classes for service options</li>
 * <li>Comprehensive JavaDoc documentation</li>
 * </ul>
 * 
 * @see <a href="https://developers.google.com/protocol-buffers/docs/reference/other">Protoc Plugin Protocol</a>
 */
public final class Main {
    private static final Logger logger = LoggerFactory.getLogger(Main.class);
    
    /**
     * Plugin entry point.
     * 
     * <p>Reads CodeGeneratorRequest from stdin, processes protobuf definitions,
     * and writes CodeGeneratorResponse to stdout following the protoc plugin protocol.
     * 
     * @param args command line arguments (not used by protoc plugins)
     */
    public static void main(String[] args) {
        try {
            // Enable debug logging if requested
            if (isDebugEnabled()) {
                logger.debug("protoc-gen-meshjava starting with debug enabled");
                logger.debug("Command line args: {}", Arrays.toString(args));
            }
            
            // Read CodeGeneratorRequest from stdin (protoc plugin protocol)
            // CRITICAL: stdin/stdout must be used for binary protobuf data only
            logger.debug("Reading CodeGeneratorRequest from stdin");
            CodeGeneratorRequest request;
            try {
                request = CodeGeneratorRequest.parseFrom(System.in);
            } catch (Exception e) {
                logger.error("Failed to parse CodeGeneratorRequest from stdin", e);
                writeErrorResponse("Failed to parse protobuf input: " + e.getMessage());
                return;
            }
            
            logger.debug("Processing {} proto files with {} services total", 
                request.getProtoFileCount(),
                request.getProtoFileList().stream()
                    .mapToInt(file -> file.getServiceCount())
                    .sum());
            
            // Create response builder
            CodeGeneratorResponse.Builder responseBuilder = CodeGeneratorResponse.newBuilder();
            responseBuilder.setSupportedFeatures(CodeGeneratorResponse.Feature.FEATURE_PROTO3_OPTIONAL_VALUE);
            
            // Process each proto file with services
            ServiceGenerator generator = new ServiceGenerator();
            int generatedFiles = 0;
            boolean hasError = false;
            
            for (var protoFile : request.getProtoFileList()) {
                if (protoFile.getServiceCount() > 0) {
                    logger.debug("Processing proto file: {} with {} services", 
                        protoFile.getName(), protoFile.getServiceCount());
                    
                    try {
                        var generatedCode = generator.generateForFile(protoFile);
                        responseBuilder.addAllFile(generatedCode);
                        generatedFiles += generatedCode.size();
                        
                        logger.debug("Generated {} files for {}", generatedCode.size(), protoFile.getName());
                    } catch (Exception e) {
                        String errorMsg = String.format("Failed to generate code for %s: %s", 
                            protoFile.getName(), e.getMessage());
                        logger.error(errorMsg, e);
                        responseBuilder.setError(errorMsg);
                        hasError = true;
                        break;
                    }
                }
            }
            
            if (!hasError) {
                logger.debug("Successfully generated {} Java files", generatedFiles);
            }
            
            // Write CodeGeneratorResponse to stdout (protoc plugin protocol)
            // CRITICAL: This must be the ONLY thing written to stdout
            CodeGeneratorResponse response = responseBuilder.build();
            logger.debug("Writing CodeGeneratorResponse to stdout");
            
            // Ensure we flush any remaining stderr output before writing to stdout
            System.err.flush();
            response.writeTo(System.out);
            System.out.flush();
            
        } catch (IOException e) {
            logger.error("I/O error during plugin execution", e);
            writeErrorResponse("I/O error: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during plugin execution", e);
            writeErrorResponse("Unexpected error: " + e.getMessage());
        }
    }
    
    /**
     * Safely writes an error response to stdout.
     * 
     * @param errorMessage the error message to include in the response
     */
    private static void writeErrorResponse(String errorMessage) {
        try {
            System.err.flush();
            CodeGeneratorResponse.newBuilder()
                .setError(errorMessage)
                .build()
                .writeTo(System.out);
            System.out.flush();
        } catch (IOException e) {
            logger.error("Failed to write error response to stdout", e);
            System.exit(1);
        }
    }
    
    /**
     * Checks if debug logging is enabled via system property.
     * 
     * @return true if debug logging should be enabled
     */
    private static boolean isDebugEnabled() {
        return Boolean.parseBoolean(System.getProperty("co.meshtrade.protoc.debug", "false"));
    }
}