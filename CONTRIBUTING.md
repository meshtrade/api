# Contributing to Mesh API

This guide covers how to contribute to the Mesh API codebase.

## Repository Overview

The API uses Protocol Buffers as the source of truth and generates client libraries for:

- Go (with interfaces and mocks)
- Python (with authentication utilities)
- TypeScript/JavaScript
- Documentation (MDX files)

Architecture follows Google's API Improvement Proposals (AIPs) with resource-oriented design and role-based access control.

## 1. Understanding Our API Design (Protobuf + AIP)

### 1.1 Resource-Oriented Design Patterns

Our APIs follow Google's [API Improvement Proposals (AIPs)](https://google.aip.dev/), specifically:

#### Core Resource Patterns
- **Resources** have unique names like `api_users/{api_user_id}` or `groups/{group_id}`
- **Collections** contain resources: `ListApiUsers()`, `SearchApiUsers()`
- **Standard methods** follow consistent patterns: `GetX()`, `CreateX()`, `ListX()`, `SearchX()`
- **Custom methods** for business operations: `ActivateApiUser()`, `DeactivateApiUser()`

#### Example: API User Service Structure
```protobuf
// Resource name pattern: api_users/{api_user_id}
service ApiUserService {
  // Standard Methods (AIP-131, AIP-132, AIP-133)
  rpc GetApiUser(GetApiUserRequest) returns (APIUser);
  rpc CreateApiUser(CreateApiUserRequest) returns (APIUser);  
  rpc ListApiUsers(ListApiUsersRequest) returns (ListApiUsersResponse);
  rpc SearchApiUsers(SearchApiUsersRequest) returns (SearchApiUsersResponse);
  
  // Custom Methods (AIP-136) 
  rpc ActivateApiUser(ActivateApiUserRequest) returns (APIUser);
  rpc DeactivateApiUser(DeactivateApiUserRequest) returns (APIUser);
}
```

#### Resource Naming Conventions
- **Singular** for resource types: `APIUser`, `Group`, `Account`
- **Plural** for collections: `api_users`, `groups`, `accounts`  
- **Snake_case** for proto field names: `display_name`, `created_at`
- **PascalCase** for message names: `CreateApiUserRequest`
- **SCREAMING_SNAKE_CASE** for enums: `API_USER_STATE_ACTIVE`

### 1.2 Authorization Model

Every RPC method must specify:

#### Method Type Classification
```protobuf
import "meshtrade/option/v1/method_type.proto";

rpc GetApiUser(GetApiUserRequest) returns (APIUser) {
  option (meshtrade.option.v1.method_type) = METHOD_TYPE_READ;  // or METHOD_TYPE_WRITE
}
```

#### Role-Based Access Control
```protobuf
import "meshtrade/iam/role/v1/role.proto";

rpc CreateApiUser(CreateApiUserRequest) returns (APIUser) {
  option (meshtrade.iam.role.v1.roles) = {
    roles: [ROLE_IAM_ADMIN]  // Only IAM admins can create API users
  };
}
```

#### Role Hierarchy
Our authorization follows domain-based role patterns:
- `ROLE_IAM_ADMIN` / `ROLE_IAM_VIEWER` - Identity & Access Management
- `ROLE_COMPLIANCE_ADMIN` / `ROLE_COMPLIANCE_VIEWER` - KYC/AML operations  
- `ROLE_TRADING_ADMIN` / `ROLE_TRADING_VIEWER` - Trading operations
- `ROLE_WALLET_ADMIN` / `ROLE_WALLET_VIEWER` - Account management
- `ROLE_STUDIO_ADMIN` / `ROLE_STUDIO_VIEWER` - Instrument management

### 1.3 Validation and Type Safety

We use `buf/validate` for comprehensive input validation:

```protobuf
message ActivateApiUserRequest {
  string name = 1 [(buf.validate.field) = {
    string: {
      min_len: 1
      pattern: "^api_users/[0-9A-HJKMNP-TV-Z]{26}$"  // ULID format
    }
    cel: {
      id: "name.required"
      message: "name is required and must be in format api_users/{id}"
      expression: "this.matches('^api_users/[0-9A-HJKMNP-TV-Z]{26}$')"
    }
  }];
}
```

### 1.4 Common Types

Shared types in `/proto/meshtrade/type/v1/` ensure consistency:

- **`Amount`** - Precise financial amounts with currency
- **`Decimal`** - High-precision arithmetic (no float precision issues)
- **`Token`** - Universal Token Identifier for blockchain assets
- **`Ledger`** - Blockchain transaction references
- **`Date`** / **`TimeOfDay`** - Timezone-aware temporal types

## 2. Code Generation Architecture Deep Dive

### 2.1 Generation Workflow

Run `./dev/tool.sh all` to:

1. Clean generated files
2. Build custom generators
3. Run `buf generate`
4. Post-process (format, build)

### 2.1.1 Testing

```bash
# Check environment
./dev/tool.sh doctor

# Run all tests
./dev/tool.sh test

# Test specific languages
./dev/tool.sh test --targets=python,java --verbose

# Individual language tests
./dev/test/go.sh
./dev/test/python.sh
./dev/test/java.sh
./dev/test/typescript.sh
```

### 2.2 Custom Protobuf Generators

#### protoc-gen-meshgo
Location: `/tool/protoc-gen-meshgo/`

Generates:
- `service.meshgo.go` - Enhanced gRPC clients
- `service_interface.meshgo.go` - Service interfaces 
- `serviceMock.meshgo.go` - Mock implementations

#### protoc-gen-meshpy  
Location: `/tool/protoc-gen-meshpy/`

Generates:
- `service_meshpy.py` - Service wrappers
- `service_options_meshpy.py` - Configuration options
- `__init__.py` - Package exports

#### protoc-gen-meshts
Location: `/tool/protoc-gen-meshts/`

Generates TypeScript utilities and `index.ts` files.

#### protoc-gen-meshdoc
Location: `/tool/protoc-gen-meshdoc/`

Generates:
- `index.mdx` - Service overview pages
- `type/{type}_meshdoc.mdx` - Message documentation  
- `service/{method}/index_meshdoc.mdx` - Method documentation
- `sidebar_meshdoc.ts` - Navigation structure

### 2.3 Generation Dependencies and Flow

```mermaid
graph TD
    A[proto/*.proto files] --> B[buf lint validation]
    B --> C[buf generate]
    C --> D[protoc-gen-meshgo]
    C --> E[protoc-gen-meshpy] 
    C --> F[protoc-gen-meshts]
    C --> G[protoc-gen-meshdoc]
    D --> H[Go: *.meshgo.go files]
    E --> I[Python: *_meshpy.py files]
    F --> J[TypeScript: enhanced files]
    G --> K[Documentation: *.mdx files]
    I --> L[Python: ruff formatting]
    J --> M[TypeScript: yarn build]
    K --> N[Docusaurus: ready for docs]
```

## 3. Development Environment Setup

### Required Tools

| Tool | Version | Install Command |
| :--- | :--- | :--- |
| Go | `1.24.3` | `brew install go` |
| Node.js | `^18.0.0` | `brew install node` |
| Yarn | `1.22.22` | `corepack enable && corepack prepare yarn@1.22.22 --activate` |
| Python | `>3.12` | `brew install python` |
| Java | `21` | `brew install openjdk@21` |
| Maven | `latest` | `brew install maven` |
| Buf CLI | `latest` | `brew install bufbuild/buf/buf` |

### 3.3 Go Development Setup

#### Installation & Dependencies
```bash
# Install Go (macOS)
brew install go

# Install dependencies
go mod tidy

# Install linting tools  
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
```

#### Critical Go Files
- **`go.mod`** / **`go.sum`** - Module dependency management
- **`go/`** - All generated Go client libraries
  - `go/{domain}/{resource}/v1/*.meshgo.go` - Enhanced gRPC clients
  - `go/{domain}/{resource}/v1/*_interface.meshgo.go` - Service interfaces
  - `go/{domain}/{resource}/v1/*Mock.meshgo.go` - Mock implementations
- **`tool/protoc-gen-meshgo/`** - Custom Go generator source code
- **`go/grpc/`** - BaseGRPCClient implementation and configuration

#### Running Go Tests & Linting
```bash
# Run all tests
go test ./...

# Run linting with security checks
golangci-lint run -v --timeout 10m -E gosec

# Clean module dependencies  
go mod tidy
```

### 3.4 Python Development Setup

#### Virtual Environment (CRITICAL)
```bash
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # or python/.venv/bin/activate on macOS/Linux

# Install in development mode
pip install -r requirements-dev.txt
```

#### Critical Python Files
- **`pyproject.toml`** - Project configuration, dependencies, ruff settings
- **`python/src/meshtrade/`** - Generated Python SDK
  - `python/src/meshtrade/common/grpc_client.py` - BaseGRPCClient implementation
  - `python/src/meshtrade/{domain}/{resource}/v1/*_meshpy.py` - Service clients
  - `python/src/meshtrade/{domain}/{resource}/v1/__init__.py` - Auto-managed exports
- **`tool/protoc-gen-meshpy/`** - Custom Python generator source
- **`python/tests/`** - Test suites

#### Python Linting (150-char line limit)
```bash
# Always run after Python changes
ruff check python/src --fix
ruff format python/src

# Check specific rules
ruff check . --select E501,E711,F401,SIM112
```

Key Ruff Rules:
- E501: Line length (150 chars max)
- E711: Use `is`/`is not` for None comparisons
- F401: Remove unused imports or add `__all__` lists  
- SIM112: Environment variables use UPPER_CASE naming

#### Running Python Tests
```bash
# Activate virtual environment first!
source python/.venv/bin/activate

# Run with correct PYTHONPATH
PYTHONPATH="./python/src:./python/tests" pytest ./python/tests -v

# Or use tox for comprehensive testing
tox
```

### 3.5 TypeScript Development Setup

#### Installation & Dependencies
```bash
# Install from repository root (yarn workspace)
yarn install

# Build TypeScript SDK
yarn build  # or yarn workspace @meshtrade/api build

# Build documentation site
yarn build:docs
```

#### Critical TypeScript Files  
- **`package.json`** (root) - Yarn workspace configuration
- **`ts/package.json`** - TypeScript SDK dependencies  
- **`ts/tsconfig.json`** - TypeScript compiler configuration
- **`ts/src/meshtrade/`** - Generated TypeScript modules
- **`tool/protoc-gen-meshts/`** - Custom TypeScript generator
- **`docs/`** - Docusaurus documentation site

#### Running TypeScript Tests & Linting
```bash
# Run tests
yarn test  # or yarn workspace @meshtrade/api test

# Run linting  
yarn lint  # or yarn workspace @meshtrade/api lint

# Start documentation server
yarn start:docs  # opens http://localhost:3000/api/
```

#### Hand-Written Client Maintenance
After protobuf changes, update hand-written TypeScript clients:

1. Check for compilation errors: `yarn build` will show missing types/methods
2. Update method signatures: Get/Create methods return resources directly
3. Update imports: Remove deleted response types, add new resource types
4. Verify all methods exposed: Compare `*_grpc_web.ts` wrappers to `*_pb.d.ts` interfaces

### 3.6 Java Development Setup

#### Installation & Dependencies
```bash
# Install Java 21 (macOS - REQUIRED: Use OpenJDK LTS version)
brew install openjdk@21

# Add Java to PATH (CRITICAL: Required for Maven and compilation)
echo 'export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"' >> ~/.zshrc

# Reload shell configuration (or restart terminal)
source ~/.zshrc

# Verify Java installation
java -version  # Should show OpenJDK 21.x.x

# Install Maven for Java builds
brew install maven

# Verify Maven installation  
mvn -version   # Should show Maven 3.x.x with Java 21
```

#### Environment Configuration

Configure Java environment:

```bash
# Add to PATH
export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"

# Set JAVA_HOME (required for Maven)
export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"

# Verify
java -version  # Should show openjdk 21.x.x
mvn -version   # Should show Java 21.x.x
```

Add to `~/.zshrc` or `~/.bash_profile`:
```bash
export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"
export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
```

#### Critical Java Files

- **`pom.xml`** (root) - Multi-module Maven workspace configuration
- **`java/pom.xml`** - Java SDK module with dependencies
- **`java/src/main/java/co/meshtrade/api/`** - Core Java SDK implementation
  - `auth/` - Credentials and credential discovery (Credentials.java, CredentialsDiscovery.java)
  - `config/` - Service configuration (ServiceOptions.java with builder pattern)
  - `grpc/` - Base gRPC client implementation (BaseGRPCClient.java)
  - `{domain}/{resource}/v1/` - Generated service interfaces and clients
- **`tool/protoc-gen-meshjava/`** - Custom Java code generator source
  - `src/main/java/co/meshtrade/protoc/` - Plugin implementation
  - `target/protoc-gen-meshjava-jar-with-dependencies.jar` - Compiled plugin JAR

#### Generated Files Structure

The Java SDK follows the same domain-based structure as Go/Python:
```
java/src/main/java/co/meshtrade/api/
├── auth/                           # Core authentication
│   ├── Credentials.java            # API key + group validation
│   └── CredentialsDiscovery.java   # Auto-discovery hierarchy
├── config/
│   └── ServiceOptions.java        # Builder pattern configuration
├── grpc/
│   └── BaseGRPCClient.java        # Generic gRPC client base class
├── iam/api_user/v1/               # Generated from protobuf
│   ├── ApiUserService.java        # Service interface (extends AutoCloseable)
│   └── ApiUserServiceClient.java  # Client implementation (extends BaseGRPCClient)
├── compliance/client/v1/          # Generated from protobuf
├── trading/direct_order/v1/       # Generated from protobuf
└── ...                            # Other generated services
```

#### Quick Setup

```bash
# Install dependencies
brew install openjdk@21 maven

# Configure environment
echo 'export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"' >> ~/.zshrc
echo 'export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"' >> ~/.zshrc
source ~/.zshrc

# Verify
java -version
mvn -version

# Build Java SDK
cd java && mvn clean compile

# Build protoc plugin
cd ../tool/protoc-gen-meshjava && mvn clean package

# Test generation
cd ../.. && buf generate --template dev/generate/buf/buf.gen.yaml
```

#### One-Line Environment Setup

For convenience, add Java environment to your shell configuration:

```bash
# Quick Java 21 setup
cat >> ~/.zshrc << 'EOF'
export PATH="/opt/homebrew/opt/openjdk@21/bin:$PATH"
export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
EOF
source ~/.zshrc
```

#### Running Java Builds & Tests

```bash
# Build Java SDK (from java/ directory)
cd java
mvn clean compile

# Build with all checks
mvn clean compile test

# Build Java protoc plugin (from tool/protoc-gen-meshjava/ directory)  
cd tool/protoc-gen-meshjava
mvn clean package

# Run full code generation (from repository root)
./dev/tool.sh all
```

#### Java Code Generation

```bash
# Build protoc plugin
cd tool/protoc-gen-meshjava && mvn clean package -q

# Run generation
cd ../.. && buf generate --template dev/generate/buf/buf.gen.yaml

# Verify files generated
find java/src/main/java -name "*Service.java" -o -name "*Client.java"
```

#### Authentication Hierarchy
1. `MESH_API_CREDENTIALS` environment variable (JSON format)
2. Platform-specific credential files:
   - Linux: `~/.config/mesh/credentials.json`
   - macOS: `~/Library/Application Support/mesh/credentials.json`  
   - Windows: `%APPDATA%\mesh\credentials.json`

#### Configuration Example
```java
// Default with auto-discovery
ServiceOptions options = ServiceOptions.builder().build();

// Custom configuration
ServiceOptions options = ServiceOptions.builder()
    .url("api.staging.mesh.dev")  
    .apiKey("your-api-key")
    .group("groups/your-group-id")
    .timeout(Duration.ofSeconds(60))
    .tls(true)
    .build();
```

#### Usage Example
```java
try (ApiUserServiceClient client = new ApiUserServiceClient()) {
    GetApiUserRequest request = GetApiUserRequest.newBuilder()
        .setName("api_users/01HQXH5S8NPQR0QVMJ3NV9KWX8")
        .build();
    APIUser user = client.getApiUser(request, Optional.empty());
}
```

#### Maven Structure

Multi-module setup:
- `java/` - Main SDK
- `tool/protoc-gen-meshjava/` - Code generator

Build both with `mvn clean package` from repository root.

#### Java Troubleshooting

- `mvn command not found`: Install Maven with `brew install maven`
- `java.lang.module.FindException`: Ensure Java 21 is in PATH
- Generated Java files missing: Build protoc plugin first: `cd tool/protoc-gen-meshjava && mvn clean package`
- Compilation errors: Check protobuf definitions with `buf lint`
- Maven dependency conflicts: Clean and rebuild with `mvn clean compile`
- JAVA_HOME warnings: Set JAVA_HOME in shell profile
- Maven Guice warnings: `WARNING: sun.misc.Unsafe::staticFieldBase` is a known Maven issue (MNG-8760) - safe to ignore

## 4. Contributing Workflow

### 4.1 Development Process

1. Branch from master: `git checkout -b feature/your-feature-name`
2. Modify protobuf files in `/proto/meshtrade/`
3. Run buf lint: `buf lint` (must pass)
4. Regenerate code: `./dev/tool.sh all`
5. Update hand-written TypeScript clients if needed
6. Run tests: `./dev/tool.sh test`
7. Run linters (included in test scripts)
8. Update documentation if needed
9. Submit pull request

### 4.2 Protobuf Contribution Guidelines

#### Adding New Services
1. **Create service directory**: `/proto/meshtrade/{domain}/{resource}/v1/`
2. **Define resource proto**: `{resource}.proto` with message definitions
3. **Define service proto**: `service.proto` with RPC methods
4. **Add authorization**:
   ```protobuf
   option (meshtrade.iam.role.v1.standard_roles) = {
     roles: [ROLE_YOUR_DOMAIN_ADMIN, ROLE_YOUR_DOMAIN_VIEWER]
   };
   ```
5. **Add method types**: Every RPC method needs `method_type` option
6. **Add role restrictions**: Every RPC method needs `roles` option
7. **Use buf validation**: Add validation rules for all inputs
8. **Document thoroughly**: Comments become API documentation

#### Adding New Methods to Existing Services
1. **Follow AIP patterns**: Use standard method signatures when possible
2. **Choose appropriate method type**: `METHOD_TYPE_READ` vs `METHOD_TYPE_WRITE`
3. **Set proper authorization**: Who can call this method?
4. **Add validation rules**: Validate all inputs comprehensively
5. **Update service documentation**: Method comments become user-facing docs

#### Updating Existing APIs (Breaking Changes)
1. **Avoid breaking changes** in existing versions (v1, v2, etc.)
2. **For breaking changes**: Create new API version (e.g., v1 → v2)
3. **Deprecation process**: Mark old versions as deprecated, provide migration path
4. **Maintain backward compatibility**: Keep old versions working during transition period

### 4.3 Testing Infrastructure

#### Development Tool Testing Commands

The repository includes a comprehensive testing infrastructure accessible through the development tool:

```bash
# Environment health check (run first)
./dev/tool.sh doctor          # Validates all prerequisites and dependencies

# Comprehensive testing
./dev/tool.sh test            # Test all languages with full coverage
./dev/tool.sh test --targets=python,java  # Test specific languages
./dev/tool.sh test --verbose  # Detailed output for debugging

# Individual language tests
./dev/test/go.sh              # Go tests with coverage, race detection, linting  
./dev/test/python.sh          # Python with pytest, coverage, ruff linting
./dev/test/java.sh            # Java with Maven, JaCoCo coverage, SpotBugs security
./dev/test/typescript.sh      # TypeScript with Jest, type checking, ESLint

# Environment validation (troubleshooting)
./dev/env/go.sh               # Check Go version, modules
./dev/env/python.sh           # Check Python venv, dependencies  
./dev/env/java.sh             # Check Java 21, Maven setup
./dev/env/typescript.sh       # Check Node.js, Yarn, dependencies
./dev/env/general.sh          # Check buf, git, general tools
```

#### Test Features by Language

**Go Tests** (`./dev/test/go.sh`):
- Standard `go test ./...` with verbose output
- Race condition detection with `go test -race`
- Code coverage analysis with coverage report generation
- Security linting with `golangci-lint` and `gosec`
- Module hygiene validation (`go mod tidy`)

**Python Tests** (`./dev/test/python.sh`):
- Environment validation (virtual environment activation)
- Comprehensive `pytest` execution with coverage reporting
- Code formatting and linting with `ruff` (150-char line limit)
- Import validation and dependency checks

**Java Tests** (`./dev/test/java.sh`):
- Unit tests with Maven Surefire plugin
- Integration tests with Maven Failsafe plugin
- Code coverage analysis with JaCoCo
- Security analysis with SpotBugs
- Dependency vulnerability scanning

**TypeScript Tests** (`./dev/test/typescript.sh`):
- Jest test framework with coverage reporting
- TypeScript compilation verification (`yarn build`)
- ESLint linting with strict TypeScript rules
- Type checking validation

#### CI/CD Integration

The testing infrastructure is designed for continuous integration:

```bash
# Fail-fast mode for CI pipelines
./dev/test/all.sh --fail-fast

# Environment validation before tests
./dev/tool.sh doctor && ./dev/tool.sh test

# Selective testing for performance
./dev/tool.sh test --targets=python,java
```

### 4.4 Legacy Testing Commands

For reference, these individual commands still work but are less comprehensive than the unified testing infrastructure:

#### Go Testing
- **Unit tests**: Test business logic and validation
- **Integration tests**: Test with actual gRPC servers
- **Mock usage**: Use generated mocks for dependency injection
- **Security testing**: `golangci-lint run -E gosec`

#### Python Testing  
- **Always use virtual environment**: Tests will fail without proper Python setup
- **Set PYTHONPATH correctly**: `PYTHONPATH="./python/src:./python/tests"`
- **Test BaseGRPCClient pattern**: Verify all services inherit correctly
- **Test credential discovery**: Mock credential files and environment variables
- **Line length compliance**: Verify ruff rules are followed

#### TypeScript Testing
- **Jest configuration**: Tests in `ts/src/**/*.test.ts`
- **Type checking**: `yarn build` must pass (no TypeScript errors)
- **Linting compliance**: `yarn lint` must pass
- **Hand-written client validation**: Ensure all protobuf methods are exposed

### 4.5 Documentation Contributions

#### Auto-Generated Documentation
- **Never edit `*_meshdoc.mdx` files**: They're regenerated from protobuf
- **Edit protobuf comments**: They become the API documentation
- **Service overview pages**: `index.mdx` files are editable after first generation

#### Hand-Written Documentation  
- **Architecture docs**: Update `/docs/docs/architecture/` for system changes
- **Contributor guide**: Keep this guide updated with new patterns
- **Code examples**: Update TODO placeholders in generated examples

#### Documentation Testing
```bash
# Start development server
yarn start:docs

# Build static site (catches errors)
yarn build:docs

# Serve built site
yarn serve:docs
```

## 5. Common Pitfalls and Solutions

### 5.1 Protobuf Issues

**Problem**: `buf lint` failures
**Solution**: Follow naming conventions, add missing options, fix import paths

**Problem**: Breaking change detection failures  
**Solution**: Create new API version instead of modifying existing APIs

**Problem**: Missing authorization options
**Solution**: Every service needs `standard_roles`, every method needs `method_type` and `roles`

### 5.2 Code Generation Issues

**Problem**: Generated files not appearing
**Solution**: Check protobuf syntax, ensure service definitions are correct, run `buf generate` manually for debugging

**Problem**: Python import errors after generation
**Solution**: Check dynamic import analysis in `protoc-gen-meshpy`, ensure external types are properly categorized

**Problem**: TypeScript compilation errors
**Solution**: Update hand-written clients, remove deleted types, add new imports

### 5.3 Python-Specific Issues  

**Problem**: Import errors in tests
**Solution**: Always set `PYTHONPATH="./python/src:./python/tests"`

**Problem**: Ruff linting failures
**Solution**: Use 150-char line limit (not 80), fix E711 None comparisons, remove unused imports

**Problem**: Virtual environment not activated
**Solution**: Always run `source python/.venv/bin/activate` before Python commands

### 5.4 Go-Specific Issues

**Problem**: Module dependency conflicts
**Solution**: Run `go mod tidy`, check for version conflicts, update dependencies

**Problem**: Generic type compilation issues  
**Solution**: Ensure Go 1.24.3+, check BaseGRPCClient[T] usage patterns

### 5.5 TypeScript-Specific Issues

**Problem**: Hand-written clients missing methods
**Solution**: Compare `*_grpc_web.ts` files to generated `*_pb.d.ts` interfaces, add missing method wrappers

**Problem**: Yarn workspace dependency issues
**Solution**: Run `yarn install` from repository root, not from individual package directories

