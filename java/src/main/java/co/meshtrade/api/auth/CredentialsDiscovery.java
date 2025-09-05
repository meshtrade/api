package co.meshtrade.api.auth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

/**
 * Utility class for discovering Meshtrade API credentials using a standardized hierarchy.
 * 
 * <p>This class implements automatic credential discovery following the same pattern
 * as the Go and Python SDKs. It searches for credentials in the following order:
 * 
 * <ol>
 * <li><strong>Environment Variable:</strong> {@code MESH_API_CREDENTIALS} containing the path to a JSON credentials file</li>
 * <li><strong>Platform-specific files:</strong>
 *     <ul>
 *     <li>Linux: {@code $XDG_CONFIG_HOME/mesh/credentials.json} or {@code ~/.config/mesh/credentials.json}</li>
 *     <li>macOS: {@code ~/Library/Application Support/mesh/credentials.json}</li>
 *     <li>Windows: {@code %APPDATA%\mesh\credentials.json}</li>
 *     </ul>
 * </li>
 * </ol>
 * 
 * <h2>Credential Format</h2>
 * <p>Credentials are expected in JSON format:
 * <pre>{@code
 * {
 *   "api_key": "your-43-character-api-key-here",
 *   "group": "groups/your-group-id"
 * }
 * }</pre>
 * 
 * <h2>Example Usage</h2>
 * <pre>{@code
 * Optional<Credentials> credentials = CredentialsDiscovery.findCredentials();
 * if (credentials.isPresent()) {
 *     String apiKey = credentials.get().apiKey();
 *     String group = credentials.get().group();
 *     // Use credentials
 * } else {
 *     // Handle missing credentials
 *     throw new IllegalStateException("No API credentials found");
 * }
 * }</pre>
 * 
 * @see Credentials
 * @see <a href="https://meshtrade.github.io/api/docs/architecture/authentication">Authentication Guide</a>
 */
public final class CredentialsDiscovery {
    private static final Logger logger = LoggerFactory.getLogger(CredentialsDiscovery.class);
    
    private static final String ENV_VAR_NAME = "MESH_API_CREDENTIALS";
    private static final String CREDENTIALS_FILENAME = "credentials.json";
    private static final ObjectMapper objectMapper = new ObjectMapper();
    
    // Private constructor to prevent instantiation
    private CredentialsDiscovery() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }
    
    /**
     * Discovers API credentials using the standard hierarchy.
     * 
     * <p>This method searches for credentials in the following order:
     * <ol>
     * <li>Environment variable: {@code MESH_API_CREDENTIALS} (path to credentials file)</li>
     * <li>Platform-specific credential files</li>
     * </ol>
     * 
     * @return credentials if found, or empty Optional if no valid credentials are discovered
     */
    public static Optional<Credentials> findCredentials() {
        logger.debug("Starting credential discovery");
        
        // 1. Check environment variable
        Optional<Credentials> envCredentials = findCredentialsFromEnvironment();
        if (envCredentials.isPresent()) {
            logger.debug("Found credentials in environment variable");
            return envCredentials;
        }
        
        // 2. Check platform-specific files
        Optional<Credentials> fileCredentials = findCredentialsFromFile();
        if (fileCredentials.isPresent()) {
            logger.debug("Found credentials in file");
            return fileCredentials;
        }
        
        logger.debug("No credentials found in any location");
        return Optional.empty();
    }
    
    /**
     * Attempts to find credentials from the MESH_API_CREDENTIALS environment variable.
     * 
     * <p>The environment variable should contain a file path to the credentials JSON file,
     * consistent with the Go and Python SDK behavior.
     * 
     * @return credentials if found and valid, empty Optional otherwise
     */
    static Optional<Credentials> findCredentialsFromEnvironment() {
        String envValue = System.getenv(ENV_VAR_NAME);
        if (envValue == null || envValue.trim().isEmpty()) {
            logger.debug("Environment variable {} not set or empty", ENV_VAR_NAME);
            return Optional.empty();
        }
        
        String credentialsPath = envValue.trim();
        logger.debug("Loading credentials from environment variable path: {}", credentialsPath);
        
        Path path = Paths.get(credentialsPath);
        if (!Files.exists(path) || !Files.isReadable(path)) {
            logger.warn("Credentials file not found or not readable: {}", credentialsPath);
            return Optional.empty();
        }
        
        try {
            String content = Files.readString(path);
            Optional<Credentials> credentials = parseCredentialsJson(content);
            if (credentials.isPresent()) {
                logger.debug("Successfully loaded credentials from environment variable path: {}", credentialsPath);
                return credentials;
            }
        } catch (IOException e) {
            logger.warn("Failed to read credentials file from environment variable {}: {}", credentialsPath, e.getMessage());
        } catch (Exception e) {
            logger.warn("Failed to parse credentials from environment variable file {}: {}", credentialsPath, e.getMessage());
        }
        
        return Optional.empty();
    }
    
    /**
     * Attempts to find credentials from platform-specific file locations.
     * 
     * @return credentials if found and valid, empty Optional otherwise
     */
    static Optional<Credentials> findCredentialsFromFile() {
        for (Path credentialsPath : getPlatformCredentialPaths()) {
            logger.debug("Checking for credentials file: {}", credentialsPath);
            
            if (Files.exists(credentialsPath) && Files.isReadable(credentialsPath)) {
                try {
                    String content = Files.readString(credentialsPath);
                    Optional<Credentials> credentials = parseCredentialsJson(content);
                    if (credentials.isPresent()) {
                        logger.debug("Successfully loaded credentials from: {}", credentialsPath);
                        return credentials;
                    }
                } catch (IOException e) {
                    logger.warn("Failed to read credentials file {}: {}", credentialsPath, e.getMessage());
                } catch (Exception e) {
                    logger.warn("Failed to parse credentials from file {}: {}", credentialsPath, e.getMessage());
                }
            }
        }
        
        return Optional.empty();
    }
    
    /**
     * Returns platform-specific paths where credential files might be located.
     * 
     * @return array of paths to check in order of preference
     */
    static Path[] getPlatformCredentialPaths() {
        String osName = System.getProperty("os.name").toLowerCase();
        String userHome = System.getProperty("user.home");
        
        if (osName.contains("mac")) {
            // macOS: ~/Library/Application Support/mesh/credentials.json
            return new Path[] {
                Paths.get(userHome, "Library", "Application Support", "mesh", CREDENTIALS_FILENAME)
            };
        } else if (osName.contains("win")) {
            // Windows: %APPDATA%\mesh\credentials.json
            String appData = System.getenv("APPDATA");
            if (appData != null) {
                return new Path[] {
                    Paths.get(appData, "mesh", CREDENTIALS_FILENAME)
                };
            } else {
                // Fallback if APPDATA is not set
                return new Path[] {
                    Paths.get(userHome, "AppData", "Roaming", "mesh", CREDENTIALS_FILENAME)
                };
            }
        } else {
            // Linux/Unix: $XDG_CONFIG_HOME/mesh/credentials.json or ~/.config/mesh/credentials.json
            String xdgConfigHome = System.getenv("XDG_CONFIG_HOME");
            if (xdgConfigHome != null && !xdgConfigHome.trim().isEmpty()) {
                return new Path[] {
                    Paths.get(xdgConfigHome, "mesh", CREDENTIALS_FILENAME),
                    Paths.get(userHome, ".config", "mesh", CREDENTIALS_FILENAME)
                };
            } else {
                return new Path[] {
                    Paths.get(userHome, ".config", "mesh", CREDENTIALS_FILENAME)
                };
            }
        }
    }
    
    /**
     * Parses JSON content and extracts credentials.
     * 
     * @param jsonContent the JSON content as a string
     * @return parsed credentials if valid, empty Optional otherwise
     * @throws IOException if JSON parsing fails
     * @throws IllegalArgumentException if credential format is invalid
     */
    static Optional<Credentials> parseCredentialsJson(String jsonContent) throws IOException {
        if (jsonContent == null || jsonContent.trim().isEmpty()) {
            return Optional.empty();
        }
        
        JsonNode root = objectMapper.readTree(jsonContent.trim());
        
        // Extract required fields
        JsonNode apiKeyNode = root.get("api_key");
        JsonNode groupNode = root.get("group");
        
        if (apiKeyNode == null || !apiKeyNode.isTextual()) {
            logger.warn("Missing or invalid 'api_key' field in credentials JSON");
            return Optional.empty();
        }
        
        if (groupNode == null || !groupNode.isTextual()) {
            logger.warn("Missing or invalid 'group' field in credentials JSON");
            return Optional.empty();
        }
        
        String apiKey = apiKeyNode.asText().trim();
        String group = groupNode.asText().trim();
        
        if (apiKey.isEmpty() || group.isEmpty()) {
            logger.warn("Empty api_key or group in credentials JSON");
            return Optional.empty();
        }
        
        try {
            Credentials credentials = new Credentials(apiKey, group);
            logger.debug("Successfully parsed credentials for group: {}", group);
            return Optional.of(credentials);
        } catch (Exception e) {
            logger.warn("Invalid credential format: {}", e.getMessage());
            return Optional.empty();
        }
    }
    
    /**
     * Checks if credentials can be discovered without actually retrieving them.
     * 
     * <p>This method is useful for validation and diagnostics. It performs the
     * same discovery process as {@link #findCredentials()} but only returns
     * whether credentials are available.
     * 
     * @return true if valid credentials can be discovered, false otherwise
     */
    public static boolean areCredentialsAvailable() {
        return findCredentials().isPresent();
    }
    
    /**
     * Returns information about where credentials would be searched.
     * 
     * <p>This method is useful for debugging and user guidance. It returns
     * a description of the credential discovery process without actually
     * attempting to load credentials.
     * 
     * @return human-readable description of credential search locations
     */
    public static String getCredentialSearchInfo() {
        StringBuilder info = new StringBuilder();
        info.append("Credential Discovery Hierarchy:\n");
        info.append("1. Environment Variable: ").append(ENV_VAR_NAME).append("\n");
        info.append("2. Platform-specific files:\n");
        
        Path[] paths = getPlatformCredentialPaths();
        for (int i = 0; i < paths.length; i++) {
            info.append("   ").append(i + 1).append(". ").append(paths[i]).append("\n");
        }
        
        return info.toString();
    }
}