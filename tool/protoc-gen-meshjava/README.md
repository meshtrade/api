# protoc-gen-meshjava

A Protocol Buffer compiler plugin for generating Meshtrade Java SDK client code.

## Overview

This tool is a custom protoc plugin written in Java that generates enhanced gRPC client code for the Meshtrade API. It creates type-safe, well-documented Java client classes that extend the common BaseGRPCClient infrastructure.

## Features

- **Type-Safe Code Generation**: Uses JavaPoet for generating valid, type-safe Java code
- **AST Validation**: Validates generated code using JavaParser to ensure correctness
- **Comprehensive Documentation**: Generates complete JavaDoc with links to API documentation
- **Base Client Integration**: Generated clients extend BaseGRPCClient for common functionality
- **Error Handling**: Provides detailed error messages and validation feedback
- **Modern Java**: Targets Java 17+ with modern language features

## Architecture

The generator follows a modular architecture:

```
co.meshtrade.protoc/
├── Main.java                    # Entry point for protoc plugin protocol
├── generator/
│   ├── ServiceGenerator.java    # Main orchestrator
│   ├── ClientGenerator.java     # Client class generation
│   ├── InterfaceGenerator.java  # Service interface generation
│   └── OptionsGenerator.java    # Configuration class generation
├── model/
│   ├── ServiceModel.java        # Service metadata model
│   └── MethodModel.java         # Method metadata model
├── ast/
│   └── JavaValidator.java       # AST validation with JavaParser
└── util/
    ├── JavaNames.java           # Java naming conventions
    └── ProtoTypeMapper.java     # Proto to Java type mapping
```

## Building

To build the plugin:

```bash
# Build using the development tool (recommended)
./dev/tool.sh generate --targets=java

# Or build manually from the repository root
mvn -f tool/protoc-gen-meshjava/pom.xml clean package

# Or from this directory
mvn clean package
```

This creates:
- `target/protoc-gen-meshjava-jar-with-dependencies.jar` - Executable JAR
- `protoc-gen-meshjava` - Unix shell script wrapper (made executable)
- `protoc-gen-meshjava.bat` - Windows batch file wrapper

## Usage

The plugin is designed to be used via the buf code generation pipeline:

```yaml
# In buf.gen.yaml
plugins:
  - local: ["./tool/protoc-gen-meshjava/protoc-gen-meshjava"]
    out: ./java/src/main/java
    strategy: all
```

### Manual Usage

You can also run the plugin manually with protoc:

```bash
# Generate code for a single proto file
protoc \
  --plugin=protoc-gen-meshjava=./tool/protoc-gen-meshjava/protoc-gen-meshjava \
  --meshjava_out=./java/src/main/java \
  --proto_path=./proto \
  ./proto/meshtrade/iam/api_user/v1/service.proto
```

## Generated Code Structure

For each protobuf service, the plugin generates:

### Service Interface
```java
package co.meshtrade.api.iam.api_user.v1;

public interface ApiUserService extends AutoCloseable {
    APIUser getApiUser(GetApiUserRequest request);
    APIUser createApiUser(CreateApiUserRequest request);
    // ... other methods
}
```

### Client Implementation
```java
package co.meshtrade.api.iam.api_user.v1;

public final class ApiUserServiceClient 
    extends BaseGRPCClient<ApiUserServiceGrpc.ApiUserServiceStub> 
    implements ApiUserService {
    
    public ApiUserServiceClient() { /* default config */ }
    public ApiUserServiceClient(ServiceOptions options) { /* custom config */ }
    
    @Override
    public APIUser getApiUser(GetApiUserRequest request) {
        return execute("GetApiUser", request, Duration.ofSeconds(30), 
            (stub, req) -> stub.getApiUser(req));
    }
}
```

## Code Generation Process

1. **Input Processing**: Reads CodeGeneratorRequest from stdin (protoc plugin protocol)
2. **Model Creation**: Parses protobuf definitions into internal model objects
3. **Code Generation**: Uses JavaPoet to generate type-safe Java source code
4. **AST Validation**: Validates generated code using JavaParser
5. **Output**: Writes CodeGeneratorResponse to stdout with generated files

## Dependencies

The plugin uses several key libraries:

- **[JavaPoet](https://github.com/square/javapoet)** - Type-safe Java source file generation
- **[JavaParser](https://github.com/javaparser/javaparser)** - Java AST parsing and validation
- **protobuf-java** - Protocol Buffer Java runtime for plugin protocol
- **SLF4J + Logback** - Logging framework

## Testing

The plugin includes comprehensive tests:

```bash
# Run comprehensive tests using development tool (recommended)
./dev/test/java.sh

# Or run tests manually
mvn test                                    # Unit tests only
mvn verify                                  # Integration tests (requires built JAR)
mvn clean verify jacoco:report             # All tests with coverage
```

### Test Structure

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test the complete plugin with real protobuf input
- **AST Validation Tests**: Verify generated code compiles and is valid

## Configuration

The plugin follows these conventions:

### Naming Conventions
- **Interfaces**: Service name (e.g., `ApiUserService`)
- **Clients**: Service name + "Client" (e.g., `ApiUserServiceClient`)
- **Packages**: Mirror protobuf package structure under `co.meshtrade.api`

### Documentation Generation
- **Service Documentation**: Links to https://meshtrade.github.io/api/docs/api-reference/
- **Method Documentation**: Comprehensive JavaDoc with parameter and return documentation
- **Package Documentation**: Overview of each service domain

### Error Handling
- **Validation Errors**: Detailed error messages with line numbers and suggestions
- **Generation Errors**: Clear error reporting for debugging
- **Plugin Protocol**: Proper error reporting via protoc plugin protocol

## Development

### Adding New Features

1. **Model Changes**: Update model classes in `co.meshtrade.protoc.model`
2. **Generation Logic**: Modify generators in `co.meshtrade.protoc.generator`
3. **Validation**: Update AST validation in `co.meshtrade.protoc.ast`
4. **Tests**: Add comprehensive tests for new functionality

### Code Style

- Follow Google Java Style Guide
- Use JavaPoet's fluent API for code generation
- Comprehensive JavaDoc for all public APIs
- Prefer immutable objects and builder patterns

### Debugging

To debug the plugin:

```bash
# Enable debug logging
export JAVA_OPTS="-Dco.meshtrade.protoc.debug=true"

# Run with verbose output
mvn clean package -X

# Test with sample protobuf
./protoc-gen-meshjava < test-input.pb > test-output.pb
```

## Integration with Build System

The plugin integrates with the repository's build system:

1. **dev/tool.sh**: Builds plugin before running code generation
2. **buf.gen.yaml**: Configures plugin as part of generation pipeline
3. **Maven Build**: Ensures plugin is built before SDK compilation

## Troubleshooting

### Common Issues

**Plugin not found**: Ensure the JAR is built and shell script is executable
```bash
mvn -f tool/protoc-gen-meshjava/pom.xml clean package
chmod +x tool/protoc-gen-meshjava/protoc-gen-meshjava
```

**Java version errors**: Plugin requires Java 21+
```bash
java -version  # Should show 21 or higher
```

**Generation failures**: Check plugin logs and validate protobuf input
```bash
# Run with debug logging
JAVA_OPTS="-Dco.meshtrade.protoc.debug=true" ./protoc-gen-meshjava
```

## Contributing

When contributing to the plugin:

1. **Follow the architecture**: Keep generators modular and focused
2. **Add tests**: All new functionality must have comprehensive tests
3. **Validate output**: Ensure generated code compiles and follows conventions
4. **Update documentation**: Keep this README and JavaDoc up to date

---

This plugin is part of the Meshtrade API Java SDK and generates the client code that users interact with. Quality and reliability are paramount since any issues directly affect SDK users.