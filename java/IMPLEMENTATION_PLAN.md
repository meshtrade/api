# Java SDK Implementation Plan for Meshtrade API

## Project Overview

This document outlines the comprehensive implementation plan for adding a Java SDK to the Meshtrade API repository. The Java SDK will follow the same patterns as the existing Go and Python SDKs, with code generation, authentication, and deployment to Maven Central.

**Final Artifact**: `co.meshtrade:api`

## Project Structure Overview

Create a Maven multi-module workspace at the repository root with two modules:
1. **java** - The main SDK for users to consume (`co.meshtrade.api`)
2. **protoc-gen-meshjava** - The protobuf code generator tool

Root structure:
```
/pom.xml                              # Parent POM managing both modules
/java/                                # SDK module
    ├── pom.xml
    ├── README.md                     # Initial SDK documentation
    ├── IMPLEMENTATION_PLAN.md        # This document
    └── src/main/java/co/meshtrade/api/
/tool/protoc-gen-meshjava/           # Generator module (keeps existing tool pattern)
    ├── pom.xml
    ├── README.md
    └── src/main/java/co/meshtrade/protoc/
```

## Environment Setup Plan

### Prerequisites & Installation
1. **Java Development Kit (JDK)**
   - Install JDK 17 or later (LTS version)
   - Options: OpenJDK, Amazon Corretto, Oracle JDK
   - Set `JAVA_HOME` environment variable
   - Add `$JAVA_HOME/bin` to PATH

2. **Maven**
   - Install Apache Maven 3.9.x or later
   - Add `mvn` to PATH
   - Verify: `mvn --version`

3. **IDE Setup** (Optional but recommended)
   - IntelliJ IDEA Community Edition (recommended)
   - Or VS Code with Extension Pack for Java
   - Or Eclipse IDE for Java Developers

4. **Java Version Management** (Optional)
   - SDKMAN for Linux/macOS: `curl -s "https://get.sdkman.io" | bash`
   - jenv for version switching
   - Allows switching between Java versions for different projects

5. **Maven Local Repository**
   - Maven automatically creates `~/.m2/repository` for dependencies
   - No virtual environment needed (Maven handles dependency isolation)

### Development Environment Commands
```bash
# Install Java (example with SDKMAN)
sdk install java 17.0.7-amzn
sdk use java 17.0.7-amzn

# Install Maven
sdk install maven 3.9.5

# Verify setup
java --version
mvn --version

# Build entire workspace
mvn clean compile

# Run tests
mvn test

# Build generator JAR
cd tool/protoc-gen-meshjava
mvn clean package
```

## Detailed TODO List

### Phase 1: Multi-Module Maven Workspace Setup ✅ COMPLETED

- [x] **TODO 1.1: Create Parent POM**
  - Location: `/pom.xml` ✅
  - Group ID: `co.meshtrade` ✅
  - Artifact ID: `meshtrade-api-parent` ✅
  - Packaging: `pom` ✅
  - Modules: `java`, `tool/protoc-gen-meshjava` ✅
  - Manage versions for common dependencies (protobuf, grpc, etc.) ✅
  - Configure plugins (compiler, surefire, etc.) ✅
  - Set Java target version: 17 ✅

- [x] **TODO 1.2: Create SDK Module Structure**
  - Location: `/java/` ✅
  - Create `java/pom.xml` with parent reference ✅
  - Group ID: `co.meshtrade` ✅
  - Artifact ID: `api` ✅
  - Final artifact: `co.meshtrade:api` ✅
  - Packaging: `jar` ✅
  - Create directory structure: `src/main/java/co/meshtrade/api/` ✅
  - Create directory structure: `src/test/java/co/meshtrade/api/` ✅
  - Package documentation files created ✅

- [x] **TODO 1.3: Create Initial SDK README**
  - Location: `/java/README.md` ✅
  - Include:
    - Introduction to Meshtrade Java SDK ✅
    - Installation instructions (Maven dependency) ✅
    - Java version requirements (JDK 17+) ✅
    - Quick start guide with basic authentication ✅
    - Simple service usage example ✅
    - API credentials setup (environment variable and file-based) ✅
    - Links to full documentation ✅
    - Contributing guidelines for SDK development ✅
    - Build instructions for developers ✅

- [x] **TODO 1.4: Create Generator Module Structure**
  - Location: `/tool/protoc-gen-meshjava/` ✅
  - Create `pom.xml` with parent reference ✅
  - Group ID: `co.meshtrade` ✅
  - Artifact ID: `protoc-gen-meshjava` ✅
  - Packaging: `jar` ✅
  - Create directory structure: `src/main/java/co/meshtrade/protoc/` ✅
  - Add JavaPoet, JavaParser, protobuf dependencies ✅
  - Shell script wrappers created (Unix + Windows) ✅
  - Generator README.md created ✅

- [x] **TODO 1.5: Create Planning Document**
  - Location: `/java/IMPLEMENTATION_PLAN.md` ✅
  - Document all TODOs with checkboxes ✅
  - Track progress and decisions ✅
  - Include architecture decisions and patterns ✅

### Phase 2: SDK Core Implementation

- [ ] **TODO 2.1: Authentication Module**
  - Package: `co.meshtrade.api.auth`
  - Create `Credentials.java` - immutable record for API key and group
  - Create `CredentialsDiscovery.java` - static methods for credential discovery
  - Implement discovery hierarchy:
    1. `MESH_API_CREDENTIALS` environment variable
    2. Platform-specific credential files (use Java's `System.getProperty("user.home")`)
  - Unit tests for all discovery scenarios

- [ ] **TODO 2.2: Configuration Module**
  - Package: `co.meshtrade.api.config`
  - Create `ServiceOptions.java` with builder pattern
  - Default values: url="api.mesh.dev", port=443, tls=true, timeout=30s
  - Integrate with CredentialsDiscovery for auto-configuration
  - Validation for required fields

- [ ] **TODO 2.3: Base gRPC Client**
  - Package: `co.meshtrade.api.grpc`
  - Create `BaseGRPCClient<T extends AbstractStub<T>>` abstract class
  - Implement `AutoCloseable` for resource management
  - Add authentication interceptor using gRPC ClientInterceptor
  - Implement retry logic for connection failures only
  - Add timeout handling per request
  - Connection health checking
  - Generic execute method for type-safe RPC calls

- [ ] **TODO 2.4: Common Types and Utilities**
  - Package: `co.meshtrade.api.common`
  - Create utility classes for common operations
  - Exception handling and mapping
  - Logging configuration (SLF4J)

### Phase 3: Protoc Generator Implementation

- [ ] **TODO 3.1: Generator Core**
  - Package: `co.meshtrade.protoc`
  - Create `Main.java` - entry point for protoc plugin protocol
  - Read `CodeGeneratorRequest` from stdin, write `CodeGeneratorResponse` to stdout
  - Error handling and proper exit codes

- [ ] **TODO 3.2: Code Generation Engine**
  - Package: `co.meshtrade.protoc.generator`
  - Create `ServiceGenerator.java` - main orchestrator
  - Create `ClientGenerator.java` - generates client classes using JavaPoet
  - Create `InterfaceGenerator.java` - generates service interfaces
  - Use JavaPoet for type-safe code generation
  - Generate proper JavaDoc with links to documentation

- [ ] **TODO 3.3: AST Validation**
  - Package: `co.meshtrade.protoc.ast`
  - Create `JavaValidator.java` using JavaParser
  - Validate generated code syntax and semantics
  - Check imports, method signatures, type safety
  - Report detailed errors with line numbers

- [ ] **TODO 3.4: Shell Script Wrapper**
  - Create `/tool/protoc-gen-meshjava/protoc-gen-meshjava` shell script
  - Execute: `java -jar target/protoc-gen-meshjava-jar-with-dependencies.jar`
  - Make executable with proper permissions
  - Windows batch file equivalent

### Phase 4: Build Integration

- [ ] **TODO 4.1: Update Code Generation Script**
  - Modify `/scripts/code-generation/generate-all.sh`
  - Add Java generation section:
    ```bash
    echo "🛠 Building protoc-gen-meshjava plugin..."
    mvn -f tool/protoc-gen-meshjava/pom.xml clean package -q
    
    echo "🧹 Cleaning Java generated files..."
    find ./java/src/main/java/co/meshtrade/api \
      \( -name '*Grpc.java' -o -name '*OuterClass.java' -o -name '*Client.java' \) \
      -type f -not -path "*/auth/*" -not -path "*/config/*" -not -path "*/grpc/*" \
      -print0 | xargs -0 -r -P 4 -n 1 rm
    ```

- [ ] **TODO 4.2: Update buf.gen.yaml**
  - Add Java generation plugins:
    ```yaml
    ### Java ###
      - remote: buf.build/protocolbuffers/java
        out: ./java/src/main/java
      - remote: buf.build/grpc/java
        out: ./java/src/main/java
      - local: ["./tool/protoc-gen-meshjava/protoc-gen-meshjava"]
        out: ./java/src/main/java
        strategy: all
    ```

- [ ] **TODO 4.3: Workspace Build Commands**
  - Add Maven commands to generate-all.sh
  - Ensure generated code compiles: `mvn -f java/pom.xml compile`
  - Run tests: `mvn -f java/pom.xml test`

### Phase 5: Documentation and Examples

- [ ] **TODO 5.1: Java Examples in Docs**
  - Location: `/docs/docs/examples/java/`
  - Create example files:
    - `BasicAuthentication.java`
    - `CustomConfiguration.java`
    - `ErrorHandling.java`
    - `ResourceManagement.java`
  - Show try-with-resources patterns
  - Demonstrate different service usage patterns

- [ ] **TODO 5.2: Update Documentation**
  - Add Java section to main `/README.md`
  - Update comprehensive `/java/README.md` with generated SDK details
  - Update API documentation to include Java code samples
  - Add Java to SDK comparison table in docs

- [ ] **TODO 5.3: JavaDoc Configuration**
  - Configure maven-javadoc-plugin in parent POM
  - Generate API documentation: `mvn javadoc:javadoc`
  - Link to external dependencies (protobuf, grpc)
  - Configure for GitHub Pages integration

### Phase 6: Testing Infrastructure

- [ ] **TODO 6.1: Unit Test Framework**
  - Add JUnit 5 and Mockito dependencies
  - Create base test classes in `src/test/java`
  - Test authentication discovery
  - Test configuration builder
  - Mock gRPC stubs for client testing

- [ ] **TODO 6.2: Integration Tests**
  - Create integration test suite
  - Test against real API endpoints (with test credentials)
  - Verify all generated code compiles and runs
  - Test error scenarios and retry logic

- [ ] **TODO 6.3: Test Coverage**
  - Configure JaCoCo plugin for coverage reports
  - Set minimum coverage thresholds
  - Generate coverage reports in CI

### Phase 7: Maven Central Publishing

- [ ] **TODO 7.1: POM Configuration for Publishing**
  - Add required metadata (description, url, licenses)
  - Configure developers section
  - Add SCM information (GitHub URLs)
  - Set up distribution management for OSSRH
  - Final artifact coordinates: `co.meshtrade:api:version`

- [ ] **TODO 7.2: Signing and GPG Setup**
  - Configure maven-gpg-plugin
  - Set up GitHub secrets for GPG key
  - Configure signing in CI/CD pipeline

- [ ] **TODO 7.3: OSSRH Account Setup**
  - Register `co.meshtrade` groupId with Sonatype OSSRH
  - Verify domain ownership (meshtrade.co)
  - Set up Nexus repository credentials

- [ ] **TODO 7.4: Release Automation**
  - Create GitHub Actions workflow for releases
  - Version synchronization with other SDKs
  - Automated SNAPSHOT deployments
  - Manual release promotion process

### Phase 8: CI/CD Integration

- [ ] **TODO 8.1: GitHub Actions Updates**
  - Add Java build steps to existing workflows
  - Install JDK 17 in CI environment
  - Cache Maven dependencies (.m2 repository)
  - Run tests and generate reports

- [ ] **TODO 8.2: Quality Gates**
  - Configure SonarQube or similar for code quality
  - Set up dependency vulnerability scanning
  - Ensure all tests pass before merge

- [ ] **TODO 8.3: Documentation Site Updates**
  - Update Docusaurus config for Java examples
  - Generate and publish JavaDoc to GitHub Pages
  - Add Java SDK to navigation

## Dependencies and Versions

### SDK Dependencies (`java/pom.xml`)
```xml
<!-- gRPC -->
<dependency>
    <groupId>io.grpc</groupId>
    <artifactId>grpc-stub</artifactId>
    <version>1.60.1</version>
</dependency>
<dependency>
    <groupId>io.grpc</groupId>
    <artifactId>grpc-protobuf</artifactId>
    <version>1.60.1</version>
</dependency>

<!-- Protobuf -->
<dependency>
    <groupId>com.google.protobuf</groupId>
    <artifactId>protobuf-java</artifactId>
    <version>3.25.1</version>
</dependency>

<!-- Annotations -->
<dependency>
    <groupId>javax.annotation</groupId>
    <artifactId>javax.annotation-api</artifactId>
    <version>1.3.2</version>
</dependency>
```

### Generator Dependencies (`protoc-gen-meshjava/pom.xml`)
```xml
<!-- Code Generation -->
<dependency>
    <groupId>com.squareup</groupId>
    <artifactId>javapoet</artifactId>
    <version>1.13.0</version>
</dependency>

<!-- AST Parsing -->
<dependency>
    <groupId>com.github.javaparser</groupId>
    <artifactId>javaparser-core</artifactId>
    <version>3.25.8</version>
</dependency>

<!-- Protobuf Compiler Protocol -->
<dependency>
    <groupId>com.google.protobuf</groupId>
    <artifactId>protobuf-java</artifactId>
    <version>3.25.1</version>
</dependency>
```

## Architecture Decisions

### 1. Multi-Module Maven Project
- **Decision**: Use Maven multi-module project with parent POM
- **Rationale**: Consistent dependency management, shared configuration, follows Java ecosystem standards
- **Alternative Considered**: Separate repositories (rejected for complexity)

### 2. Java-based Code Generator
- **Decision**: Write protoc-gen-meshjava in Java using JavaPoet
- **Rationale**: 
  - Follows repository pattern (Python generator in Python, TypeScript in TypeScript)
  - Native AST manipulation with JavaParser
  - Type-safe code generation with JavaPoet
  - Better error messages and validation
- **Alternative Considered**: Go-based generator (rejected for consistency)

### 3. Package Structure
- **Decision**: Use `co.meshtrade.api` as base package
- **Rationale**: Matches domain ownership (meshtrade.co), clear namespace separation
- **Final Artifact**: `co.meshtrade:api`

### 4. Base Client Pattern
- **Decision**: Generic BaseGRPCClient<T> with type parameter for stub
- **Rationale**: Type safety, consistent with Go generic pattern, enables compile-time checking
- **Alternative Considered**: Reflection-based approach (rejected for type safety)

### 5. Configuration Pattern
- **Decision**: Builder pattern for ServiceOptions
- **Rationale**: Java idiom, optional parameters, immutable objects, clear API
- **Alternative Considered**: Constructor with many parameters (rejected for usability)

### 6. Credential Discovery
- **Decision**: Hierarchy matching Go/Python SDKs
- **Rationale**: Consistent developer experience across SDKs
- **Order**: Environment variable → platform-specific files

### 7. Java Version Target
- **Decision**: Java 17 minimum
- **Rationale**: Current LTS, modern language features, good ecosystem support
- **Alternative Considered**: Java 11 (rejected for missing language features)

## Key Design Principles

1. **Consistency**: Match patterns from Go and Python SDKs
2. **Type Safety**: Leverage Java's type system throughout
3. **Developer Experience**: Clear APIs, good error messages, comprehensive documentation
4. **Resource Management**: Proper cleanup with AutoCloseable
5. **Modern Java**: Use current language features and idioms
6. **Validation**: AST validation during code generation
7. **Testing**: Comprehensive unit and integration tests

## Progress Tracking

Progress will be tracked by checking off TODO items in this document. Each completed task should be marked with `[x]` and include any relevant notes or decisions made during implementation.

## Notes and Decisions

This section will be updated during implementation to track important decisions, challenges encountered, and solutions implemented.

---

*Last Updated: 2025-07-29*
*Implementation Status: Planning Complete - Ready to Begin*