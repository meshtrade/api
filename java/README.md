# Meshtrade Java SDK

The official Java SDK for the Meshtrade API, providing type-safe access to all Meshtrade services.

[![Maven Central](https://img.shields.io/maven-central/v/co.meshtrade/api.svg)](https://search.maven.org/artifact/co.meshtrade/api)
[![License](https://img.shields.io/badge/license-Custom-blue.svg)](https://github.com/meshtrade/api/blob/master/LICENSE)

## Requirements

- **Java 21** or later (LTS recommended)
- **Maven 3.9** or later

## Installation

### Maven

Add the following dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>co.meshtrade</groupId>
    <artifactId>api</artifactId>
    <version>0.0.8</version>
</dependency>
```

### Gradle

Add the following to your `build.gradle`:

```gradle
implementation 'co.meshtrade:api:0.0.8'
```

## Quick Start

### 1. Set up API credentials

The SDK supports multiple ways to configure your API credentials:

#### Option A: Credentials File (Recommended)

Create a credentials file in the platform-specific location:

- **Linux**: `~/.config/mesh/credentials.json` (or `$XDG_CONFIG_HOME/mesh/credentials.json`)
- **macOS**: `~/Library/Application Support/mesh/credentials.json`
- **Windows**: `%APPDATA%\mesh\credentials.json`

```json
{
    "api_key": "your-api-key-here",
    "group": "groups/your-group-id"
}
```

#### Option B: Environment Variable

Set the `MESH_API_CREDENTIALS` environment variable:

```bash
export MESH_API_CREDENTIALS='{"api_key":"your-api-key","group":"groups/your-group-id"}'
```

#### Option C: Programmatic Configuration

Configure credentials directly in your code:

```java
import co.meshtrade.api.config.ServiceOptions;

ServiceOptions options = ServiceOptions.builder()
    .apiKey("your-api-key")
    .group("groups/your-group-id")
    .build();
```

### 2. Use a service

Here's a simple example using the API User service:

```java
import co.meshtrade.api.iam.api_user.v1.*;

public class Example {
    public static void main(String[] args) {
        // Using default configuration (auto-discovers credentials)
        try (ApiUserServiceClient client = new ApiUserServiceClient()) {

            GetApiUserRequest request = GetApiUserRequest.newBuilder()
                .setName("iam/api_users/01ABCDEFG123456789ABCDEFGH")
                .build();

            APIUser user = client.getApiUser(request);
            System.out.println("User: " + user.getDisplayName());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### 3. Custom configuration

For advanced use cases, you can customize the client configuration:

```java
import co.meshtrade.api.config.ServiceOptions;
import java.time.Duration;

public class CustomConfigExample {
    public static void main(String[] args) {
        ServiceOptions options = ServiceOptions.builder()
            .url("api.staging.mesh.dev")
            .port(443)
            .apiKey("your-api-key")
            .group("groups/your-group-id")
            .timeout(Duration.ofSeconds(60))
            .tls(true)
            .build();

        try (ApiUserServiceClient client = new ApiUserServiceClient(options)) {
            // Use configured client
            GetApiUserRequest request = GetApiUserRequest.newBuilder()
                .setName("iam/api_users/01ABCDEFG123456789ABCDEFGH")
                .build();

            APIUser user = client.getApiUser(request);
            System.out.println("User: " + user.getDisplayName());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## Available Services

The SDK provides client libraries for all Meshtrade API services:

### Identity & Access Management (IAM)
- **API User Service** - Manage API users and authentication
- **Group Service** - Manage groups and organizational structure
- **User Service** - Manage end users
- **Role Service** - Access role definitions and permissions

### Compliance
- **Client Service** - Client onboarding and KYC/AML compliance

### Trading
- **Direct Order Service** - Direct order execution
- **Limit Order Service** - Limit order management
- **Spot Service** - Spot trading operations

### Wallet & Accounts
- **Account Service** - Account and wallet management

### Issuance Hub
- **Instrument Service** - Financial instrument management

### Shared Types
- **Common Types** - Shared data types (Amount, Decimal, Token, etc.)

## Error Handling

The SDK uses standard gRPC error handling patterns:

```java
import io.grpc.StatusRuntimeException;
import io.grpc.Status;

try (ApiUserServiceClient client = new ApiUserServiceClient()) {
    // ... service call
} catch (StatusRuntimeException e) {
    Status.Code code = e.getStatus().getCode();
    String message = e.getStatus().getDescription();

    switch (code) {
        case NOT_FOUND:
            System.err.println("Resource not found: " + message);
            break;
        case PERMISSION_DENIED:
            System.err.println("Access denied: " + message);
            break;
        case UNAUTHENTICATED:
            System.err.println("Authentication failed: " + message);
            break;
        default:
            System.err.println("gRPC error: " + code + " - " + message);
    }
}
```

## Resource Management

All service clients implement `AutoCloseable` and should be used with try-with-resources:

```java
// Good - automatic resource cleanup
try (ApiUserServiceClient client = new ApiUserServiceClient()) {
    // Use client
}

// Also good - manual cleanup
ApiUserServiceClient client = new ApiUserServiceClient();
try {
    // Use client
} finally {
    client.close();  // Important: always close to prevent resource leaks
}
```

## Logging

The SDK uses SLF4J for logging. To see debug information, configure your logging framework:

### Logback Configuration (logback.xml)

```xml
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <logger name="co.meshtrade.api" level="DEBUG"/>
    <logger name="io.grpc" level="INFO"/>

    <root level="INFO">
        <appender-ref ref="STDOUT"/>
    </root>
</configuration>
```

## Documentation

- **[Full API Documentation](https://meshtrade.github.io/api/)** - Complete API reference and guides
- **[Java SDK Examples](https://meshtrade.github.io/api/docs/examples/java/)** - More detailed examples
- **[Authentication Guide](https://meshtrade.github.io/api/docs/architecture/authentication)** - Authentication setup
- **[SDK Configuration](https://meshtrade.github.io/api/docs/architecture/sdk-configuration)** - Advanced configuration

## Development

### Building from Source

To build the SDK from source:

```bash
# Clone the repository
git clone https://github.com/meshtrade/api.git
cd api

# Check development environment
./dev/tool.sh doctor

# Build the entire workspace (requires JDK 21+)
mvn clean compile

# Run comprehensive tests (includes coverage, security analysis)
./dev/test/java.sh

# Or run basic tests manually
mvn test

# Generate code from protobuf definitions
./dev/tool.sh all

# Build just the Java SDK
./dev/tool.sh build --targets=java
```

### Code Generation

The SDK is generated from protobuf definitions. To regenerate after protobuf changes:

```bash
# This will clean and regenerate all language SDKs including Java
./dev/tool.sh all

# Run comprehensive Java tests
./dev/test/java.sh
```

### Project Structure

```
java/
├── pom.xml                           # Maven configuration
├── README.md                         # This file
├── IMPLEMENTATION_PLAN.md            # Development roadmap
└── src/
    ├── main/java/co/meshtrade/api/
    │   ├── auth/                     # Authentication utilities
    │   ├── config/                   # Configuration classes
    │   ├── grpc/                     # Base gRPC client
    │   ├── common/                   # Common utilities
    │   └── [generated services]/     # Generated service clients
    └── test/java/co/meshtrade/api/   # Test cases
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/meshtrade/api/blob/master/CONTRIBUTING.md) for details.

### Development Setup

1. **Install Prerequisites**:
   - JDK 21+ (OpenJDK recommended)
   - Maven 3.9+
   - Git

2. **Clone and Setup**:
   ```bash
   git clone https://github.com/meshtrade/api.git
   cd api

   # Check your development environment
   ./dev/tool.sh doctor

   mvn clean compile
   ```

3. **Run Tests**:
   ```bash
   # Comprehensive testing (recommended)
   ./dev/test/java.sh

   # Or basic tests
   mvn test
   ```

4. **Code Generation**:
   ```bash
   ./dev/tool.sh all
   ```

## Support

- **Issues**: [GitHub Issues](https://github.com/meshtrade/api/issues)
- **Documentation**: [https://meshtrade.github.io/api/](https://meshtrade.github.io/api/)
- **Email**: [support@meshtrade.co](mailto:support@meshtrade.co)

## License

This project is licensed under a custom license. See the [LICENSE](https://github.com/meshtrade/api/blob/master/LICENSE) file for details.

---

**Artifact Coordinates**: `co.meshtrade:api:0.0.8`
**Minimum Java Version**: 17
**Documentation**: [https://meshtrade.github.io/api/](https://meshtrade.github.io/api/)
