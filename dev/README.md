# Meshtrade API Development Tools

This directory contains all development tools for the Meshtrade API project, including code generation, building, testing, and deployment scripts.

## 🚀 Quick Start

```bash
# Generate and build all SDKs
./dev/tool.sh all

# Generate TypeScript and Python SDKs only
./dev/tool.sh generate --targets=typescript,python

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
│   ├── typescript.sh   # TypeScript code generation
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
│   ├── typescript.sh   # TypeScript compilation
│   ├── java.sh         # Java compilation
│   └── all.sh          # Build all SDKs
├── clean/               # Cleanup scripts
│   ├── go.sh           # Clean Go generated files
│   ├── python.sh       # Clean Python generated files
│   ├── typescript.sh   # Clean TypeScript generated files
│   ├── java.sh         # Clean Java generated files
│   ├── docs.sh         # Clean documentation files
│   └── all.sh          # Clean all generated files
├── test/                # Testing scripts (future)
└── deploy/              # Deployment scripts (future)
```

### Code Generation Flow

1. **Protobuf Sources**: All API definitions in `/proto/meshtrade/`
2. **Buf Generation**: Uses `buf generate` with language-specific configurations
3. **Custom Generators**: Enhanced functionality via `protoc-gen-mesh*` plugins
4. **Post-Processing**: Language-specific formatting and index generation

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
| `clean` | Clean generated files | `./dev/tool.sh clean --targets=java` |
| `all` | Run clean → generate → build | `./dev/tool.sh all` |
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
./dev/generate/typescript.sh # Shows Node/Yarn dependency issues
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

1. **Testing Framework** (`/dev/test/`)
   - Integration tests for generated code
   - API compatibility tests
   - Performance benchmarks

2. **Deployment Tools** (`/dev/deploy/`)
   - SDK publishing scripts
   - Version management
   - Release automation

3. **Developer Utilities**
   - Proto file validation
   - Breaking change detection
   - API documentation preview

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