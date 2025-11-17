# Meshtrade API Development Tools

This directory contains all development tools for the Meshtrade API project, including code generation, building, testing, and deployment scripts.

## 🚀 Quick Start

```bash
# Generate and build all SDKs
./dev/tool.sh all

# Generate TypeScript and Python SDKs only
./dev/tool.sh generate --targets=typescript,python

# Test Python and Java SDKs
./dev/tool.sh test --targets=python,java

# Check development environment health
./dev/tool.sh doctor

# Build Java SDK
./dev/tool.sh build --targets=java

# Clean all generated files
./dev/tool.sh clean
```

## 📋 Prerequisites

### Required Tools

| Tool | Version | Installation | Purpose |
|------|---------|--------------|---------|
| Go | 1.21+ | `brew install go` | Go SDK & protoc plugins |
| Python | 3.12+ | `brew install python` | Python SDK |
| Node.js | 18+ | `brew install node` | TypeScript SDK |
| Java | 21 | `brew install openjdk@21` | Java SDK |
| Maven | 3.8+ | `brew install maven` | Java builds |
| Yarn | 1.22.22 | `corepack enable && corepack prepare yarn@1.22.22 --activate` | TypeScript builds |
| buf | latest | `brew install bufbuild/buf/buf` | Protobuf tooling |

### Environment Setup

#### Python Setup
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
source .venv/bin/activate

# Install development dependencies
pip install -e ".[dev]"
```

#### Java Setup
```bash
# Set JAVA_HOME (add to ~/.zshrc or ~/.bashrc)
export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"
```

#### TypeScript Setup
```bash
# Install dependencies from repository root
yarn install
```

## 🏗️ Architecture

### Directory Structure

```
/dev/
├── tool.sh              # Main orchestration script
├── README.md            # This file
├── generate/            # Code generation scripts
│   ├── go.sh           # Go code generation
│   ├── python.sh       # Python code generation
│   ├── ts-web.sh   # TypeScript code generation
│   ├── ts-old.sh        # TypeScript (Legacy) code generation
│   ├── java.sh         # Java code generation
│   ├── docs.sh         # Documentation generation
│   ├── all.sh          # Generate all languages
│   └── buf/            # Buf configuration files
│       ├── buf.gen.go.yaml
│       ├── buf.gen.python.yaml
│       ├── buf.gen.typescript.yaml
│       ├── buf.gen.java.yaml
│       └── buf.gen.docs.yaml
├── build/               # Build scripts
│   ├── python.sh       # Python package build
│   ├── ts-web.sh   # TypeScript compilation
│   ├── ts-old.sh        # TypeScript (Legacy) compilation
│   ├── java.sh         # Java compilation
│   └── all.sh          # Build all SDKs
├── clean/               # Cleanup scripts
│   ├── go.sh           # Clean Go generated files
│   ├── python.sh       # Clean Python generated files
│   ├── ts-web.sh   # Clean TypeScript generated files
│   ├── ts-old.sh        # Clean TypeScript (Legacy) generated files
│   ├── java.sh         # Clean Java generated files
│   ├── docs.sh         # Clean documentation files
│   └── all.sh          # Clean all generated files
├── test/                # Test execution scripts
│   ├── go.sh           # Go tests with coverage and linting
│   ├── python.sh       # Python tests with pytest
│   ├── ts-web.sh   # TypeScript tests with Jest
│   ├── ts-old.sh        # TypeScript (Legacy) tests with Jest
│   ├── java.sh         # Java tests with Maven
│   └── all.sh          # Unified test orchestration
├── env/                 # Environment validation scripts
│   ├── general.sh      # General prerequisites check
│   ├── go.sh           # Go environment validation
│   ├── python.sh       # Python environment validation
│   ├── ts-web.sh   # TypeScript environment validation
│   ├── java.sh         # Java environment validation
│   └── doctor.sh       # Comprehensive health check
└── deploy/              # Deployment scripts (future)
```

### Code Generation Flow

1. **Protobuf Sources**: All API definitions in `/proto/meshtrade/`
2. **Buf Generation**: Uses `buf generate` with language-specific configurations
3. **Custom Generators**: Enhanced functionality via `protoc-gen-mesh*` plugins
4. **Post-Processing**: Language-specific formatting and index generation

### Testing Infrastructure

The testing system provides comprehensive validation for all SDK languages:

1. **Environment Checks**: Validate prerequisites before testing
2. **Individual Tests**: Language-specific test suites with detailed output
3. **Unified Orchestration**: Run tests across multiple languages
4. **Coverage Analysis**: Code coverage reporting where available
5. **Linting Integration**: Style and security checks alongside tests

### Environment Validation

The `doctor` command and individual environment scripts ensure:

- **Tool Versions**: Verify required tool versions are installed
- **Dependencies**: Check language-specific dependencies are available
- **Configuration**: Validate environment variables and paths
- **Connectivity**: Test network connectivity for external dependencies

## 📖 Command Reference

### Main Tool (`tool.sh`)

```bash
./dev/tool.sh <command> [options]
```

#### Commands

| Command | Description | Example |
|---------|-------------|---------|
| `generate` | Generate code from protobuf definitions | `./dev/tool.sh generate --targets=go,python` |
| `build` | Build SDK packages | `./dev/tool.sh build --targets=typescript` |
| `test` | Run tests for specified targets | `./dev/tool.sh test --targets=python,java` |
| `clean` | Clean generated files | `./dev/tool.sh clean --targets=java` |
| `all` | Run clean → generate → build | `./dev/tool.sh all` |
| `doctor` | Check development environment health | `./dev/tool.sh doctor` |
| `help` | Show help message | `./dev/tool.sh help` |

#### Options

| Option | Description | Default |
|--------|-------------|---------|
| `-t, --targets=LIST` | Comma-separated list of targets | All targets |
| `-v, --verbose` | Enable verbose output | Disabled |

#### Targets

| Target | Alias | Description |
|--------|-------|-------------|
| `go` | - | Go SDK (generation only) |
| `python` | - | Python SDK with gRPC |
| `typescript` | `ts` | TypeScript/JavaScript SDK |
| `tsold` | `ts-old` | TypeScript/JavaScript SDK (Legacy) |
| `java` | - | Java SDK with gRPC |
| `docs` | - | API documentation |

## 🔍 Advanced Usage

### Selective Generation

Generate only specific languages to save time during development:

```bash
# Generate only Go and Python
./dev/tool.sh generate --targets=go,python

# Generate and build only TypeScript (using alias)
./dev/tool.sh all --targets=ts
```

### Custom Workflows

```bash
# Clean and regenerate Python after protobuf changes
./dev/tool.sh clean --targets=python
./dev/tool.sh generate --targets=python
./dev/tool.sh build --targets=python

# Full rebuild for production release
./dev/tool.sh clean
./dev/tool.sh generate
./dev/tool.sh build
```

### Debugging Failed Generations

Each generation script includes comprehensive error checking:

```bash
# Run individual scripts for detailed error messages
./dev/generate/python.sh     # Shows Python environment issues
./dev/generate/java.sh       # Shows Java/Maven configuration issues
./dev/generate/ts-web.sh # Shows Node/Yarn dependency issues
./dev/generate/ts-old.sh      # Shows Node/Yarn dependency issues (Legacy)
```

## 🧪 Testing & Validation

### Running Tests

The testing infrastructure supports both individual and unified testing:

```bash
# Test all languages
./dev/tool.sh test

# Test specific languages
./dev/tool.sh test --targets=python,java

# Test with verbose output
./dev/tool.sh test --targets=typescript --verbose

# Run individual test suites
./dev/test/python.sh    # Python tests with pytest
./dev/test/java.sh      # Java tests with Maven
./dev/test/go.sh        # Go tests with coverage
./dev/test/ts-web.sh # TypeScript tests with Jest
./dev/test/ts-old.sh     # TypeScript (Legacy) tests with Jest
```

### Environment Health Checks

Validate your development environment before testing:

```bash
# Comprehensive health check
./dev/tool.sh doctor

# Check specific language environments
./dev/env/python.sh      # Python virtual env, dependencies
./dev/env/java.sh        # Java version, Maven configuration
./dev/env/go.sh          # Go version, module setup
./dev/env/ts-web.sh  # Node.js, Yarn, dependencies
./dev/env/general.sh     # General prerequisites (buf, git)
```

### Test Features by Language

#### Python Tests (`./dev/test/python.sh`)
- **pytest**: Comprehensive test discovery and execution
- **Coverage**: Test coverage reporting with coverage.py
- **Linting**: Ruff formatting and style checks
- **Virtual Environment**: Validates proper venv activation

#### Java Tests (`./dev/test/java.sh`)
- **Unit Tests**: Maven surefire plugin execution
- **Integration Tests**: Maven failsafe plugin execution
- **Coverage**: JaCoCo coverage analysis and reporting
- **Dependencies**: Dependency vulnerability scanning

#### Go Tests (`./dev/test/go.sh`)
- **Standard Tests**: `go test` with verbose output
- **Race Detection**: Concurrent access testing
- **Coverage**: Built-in Go coverage analysis
- **Linting**: golangci-lint with security checks (gosec)
- **Module Hygiene**: Validates go.mod tidiness

#### TypeScript Tests (`./dev/test/ts-web.sh`)
- **Jest**: Test framework with coverage reporting
- **Type Checking**: TypeScript compiler validation
- **Linting**: ESLint style and error checking
- **Build Verification**: Ensures TypeScript compilation succeeds

#### TypeScript (Legacy) Tests (`./dev/test/ts-old.sh`)
- **Jest**: Test framework with coverage reporting
- **Type Checking**: TypeScript compiler validation
- **Linting**: ESLint style and error checking
- **Build Verification**: Ensures TypeScript compilation succeeds

### CI/CD Integration

The testing infrastructure is designed for CI/CD pipeline integration:

```bash
# Fail-fast mode for CI pipelines
./dev/test/all.sh --fail-fast

# Environment validation before tests
./dev/tool.sh doctor && ./dev/tool.sh test

# Generate test reports
./dev/tool.sh test --targets=java  # Generates reports/
```

## 🛠️ Custom Protobuf Generators

### protoc-gen-meshgo
- **Location**: `/tool/protoc-gen-meshgo/`
- **Purpose**: Enhanced Go client generation
- **Features**: Resource management, authentication, functional options

### protoc-gen-meshpy
- **Location**: `/tool/protoc-gen-meshpy/`
- **Purpose**: Python client utilities
- **Features**: Template-based generation, helper functions

### protoc-gen-meshts
- **Location**: `/tool/protoc-gen-meshts/`
- **Purpose**: TypeScript enhancements
- **Features**: Index file generation, type utilities

### protoc-gen-meshjava
- **Location**: `/tool/protoc-gen-meshjava/`
- **Purpose**: Java client enhancements
- **Features**: Builder patterns, utility methods

### protoc-gen-meshdoc
- **Location**: `/tool/protoc-gen-meshdoc/`
- **Purpose**: Documentation generation
- **Features**: MDX output, API reference generation

## 🔧 Troubleshooting

### Common Issues

#### Python Virtual Environment Not Active
```
❌ ERROR: Python virtual environment is not active!
```
**Solution**: Activate virtual environment with `source .venv/bin/activate`

#### Missing Node Dependencies
```
❌ ERROR: node_modules directory not found!
```
**Solution**: Run `yarn install` from repository root

#### Java Version Mismatch
```
❌ ERROR: Java 21 is required, but found Java 17
```
**Solution**: Install Java 21 and set `JAVA_HOME` correctly

#### Maven Using Wrong Java Version
```
❌ ERROR: Maven is using Java 17, but Java 21 is required
```
**Solution**: Ensure `JAVA_HOME` is set before running Maven


### Environment Validation

Run these commands to validate your environment:

```bash
# Check all prerequisites
go version           # Should show 1.21+
python --version     # Should show 3.12+
node --version       # Should show v18+
java -version        # Should show 21
mvn -version         # Should show Java 21
yarn --version       # Should show 1.22.22
buf --version        # Should show latest
```

## 🚧 Future Enhancements

### Planned Features

1. **Deployment Tools** (`/dev/deploy/`)
   - SDK publishing scripts
   - Version management
   - Release automation

2. **Enhanced Testing**
   - API compatibility tests
   - Performance benchmarks
   - Cross-language integration tests

3. **Developer Utilities**
   - Proto file validation
   - Breaking change detection
   - API documentation preview
   - Automated dependency updates

### Contributing

When adding new features:

1. Follow the existing script patterns
2. Include comprehensive error checking
3. Update this README with new commands
4. Test on macOS and Linux environments
5. Ensure scripts are idempotent

## 📞 Support

For issues or questions:
- Check existing scripts for patterns
- Review error messages carefully
- Consult team leads for architectural decisions
- File issues in the project repository