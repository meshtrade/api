package co.meshtrade.protoc.util;

import java.util.regex.Pattern;

/**
 * Utility class for converting protobuf names to Java naming conventions.
 * 
 * <p>This class provides methods for converting between protobuf naming
 * conventions and Java naming conventions, including package names,
 * class names, method names, and other identifiers.
 */
public final class JavaNames {
    
    // Pattern for validating Java package names
    private static final Pattern JAVA_PACKAGE_PATTERN = 
        Pattern.compile("^[a-z][a-z0-9]*(?:\\.[a-z][a-z0-9]*)*$");
    
    // Pattern for validating Java class names
    private static final Pattern JAVA_CLASS_PATTERN = 
        Pattern.compile("^[A-Z][a-zA-Z0-9]*$");
    
    // Pattern for validating Java method names
    private static final Pattern JAVA_METHOD_PATTERN = 
        Pattern.compile("^[a-z][a-zA-Z0-9]*$");
    
    private JavaNames() {
        // Utility class - prevent instantiation
    }
    
    /**
     * Converts a protobuf package name to a Java package name.
     * 
     * <p>Examples:
     * <ul>
     * <li>"meshtrade.iam.api_user.v1" → "co.meshtrade.api.iam.api_user.v1"</li>
     * <li>"meshtrade.trading.spot.v1" → "co.meshtrade.api.trading.spot.v1"</li>
     * </ul>
     * 
     * @param protoPackage the protobuf package name
     * @return the equivalent Java package name
     * @throws IllegalArgumentException if the proto package is invalid
     */
    public static String protoPackageToJavaPackage(String protoPackage) {
        if (protoPackage == null || protoPackage.trim().isEmpty()) {
            throw new IllegalArgumentException("Proto package cannot be null or empty");
        }
        
        String trimmed = protoPackage.trim();
        
        // Handle meshtrade packages specially
        if (trimmed.startsWith("meshtrade.")) {
            // Replace "meshtrade." with "co.meshtrade.api."
            return "co.meshtrade.api." + trimmed.substring("meshtrade.".length());
        } else {
            // For non-meshtrade packages, just prepend co.meshtrade.api
            return "co.meshtrade.api." + trimmed;
        }
    }
    
    /**
     * Converts a protobuf service or message name to a Java class name.
     * 
     * <p>This method assumes the protobuf name is already in PascalCase,
     * which is the standard for protobuf service and message names.
     * 
     * <p>Examples:
     * <ul>
     * <li>"ApiUserService" → "ApiUserService"</li>
     * <li>"GetApiUserRequest" → "GetApiUserRequest"</li>
     * <li>"APIUser" → "APIUser"</li>
     * </ul>
     * 
     * @param protoName the protobuf service or message name
     * @return the equivalent Java class name
     * @throws IllegalArgumentException if the name is invalid
     */
    public static String toJavaClassName(String protoName) {
        if (protoName == null || protoName.trim().isEmpty()) {
            throw new IllegalArgumentException("Proto name cannot be null or empty");
        }
        
        String trimmed = protoName.trim();
        
        // Protobuf names should already be in PascalCase
        if (!Character.isUpperCase(trimmed.charAt(0))) {
            throw new IllegalArgumentException("Proto service/message names must start with uppercase: " + protoName);
        }
        
        return trimmed;
    }
    
    /**
     * Converts a protobuf method name to a Java method name.
     * 
     * <p>Converts from PascalCase (protobuf convention) to camelCase (Java convention).
     * 
     * <p>Examples:
     * <ul>
     * <li>"GetApiUser" → "getApiUser"</li>
     * <li>"CreateApiUser" → "createApiUser"</li>
     * <li>"ListApiUsers" → "listApiUsers"</li>
     * </ul>
     * 
     * @param protoMethodName the protobuf method name (PascalCase)
     * @return the equivalent Java method name (camelCase)
     * @throws IllegalArgumentException if the method name is invalid
     */
    public static String toCamelCase(String protoMethodName) {
        if (protoMethodName == null || protoMethodName.trim().isEmpty()) {
            throw new IllegalArgumentException("Proto method name cannot be null or empty");
        }
        
        String trimmed = protoMethodName.trim();
        
        if (!Character.isUpperCase(trimmed.charAt(0))) {
            throw new IllegalArgumentException("Proto method names must start with uppercase: " + protoMethodName);
        }
        
        // Convert first character to lowercase
        return Character.toLowerCase(trimmed.charAt(0)) + trimmed.substring(1);
    }
    
    /**
     * Converts a camelCase name to snake_case.
     * 
     * <p>Examples:
     * <ul>
     * <li>"getApiUser" → "get_api_user"</li>
     * <li>"createApiUser" → "create_api_user"</li>
     * <li>"APIUser" → "api_user"</li>
     * </ul>
     * 
     * @param camelCase the camelCase name
     * @return the equivalent snake_case name
     */
    public static String toSnakeCase(String camelCase) {
        if (camelCase == null || camelCase.trim().isEmpty()) {
            return "";
        }
        
        StringBuilder result = new StringBuilder();
        String trimmed = camelCase.trim();
        
        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            
            if (Character.isUpperCase(c)) {
                if (i > 0) {
                    result.append('_');
                }
                result.append(Character.toLowerCase(c));
            } else {
                result.append(c);
            }
        }
        
        return result.toString();
    }
    
    /**
     * Validates that a string is a valid Java package name.
     * 
     * @param packageName the package name to validate
     * @return true if valid, false otherwise
     */
    public static boolean isValidJavaPackage(String packageName) {
        if (packageName == null || packageName.trim().isEmpty()) {
            return false;
        }
        
        return JAVA_PACKAGE_PATTERN.matcher(packageName.trim()).matches();
    }
    
    /**
     * Validates that a string is a valid Java class name.
     * 
     * @param className the class name to validate
     * @return true if valid, false otherwise
     */
    public static boolean isValidJavaClassName(String className) {
        if (className == null || className.trim().isEmpty()) {
            return false;
        }
        
        return JAVA_CLASS_PATTERN.matcher(className.trim()).matches();
    }
    
    /**
     * Validates that a string is a valid Java method name.
     * 
     * @param methodName the method name to validate
     * @return true if valid, false otherwise
     */
    public static boolean isValidJavaMethodName(String methodName) {
        if (methodName == null || methodName.trim().isEmpty()) {
            return false;
        }
        
        return JAVA_METHOD_PATTERN.matcher(methodName.trim()).matches();
    }
    
    /**
     * Escapes a string for use in Java string literals.
     * 
     * @param str the string to escape
     * @return the escaped string
     */
    public static String escapeJavaString(String str) {
        if (str == null) {
            return "null";
        }
        
        return str.replace("\\", "\\\\")
                  .replace("\"", "\\\"")
                  .replace("\n", "\\n")
                  .replace("\r", "\\r")
                  .replace("\t", "\\t");
    }
}