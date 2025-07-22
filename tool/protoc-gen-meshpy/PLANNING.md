# protoc-gen-meshpy: Python gRPC Client Generator

## Project Overview

This document outlines the development plan for `protoc-gen-meshpy`, a protoc plugin that generates Python gRPC clients for Meshtrade services. The generator will mirror the functionality of the existing Go generator (`protoc-gen-meshgo`) but produce Python clients with the same features and patterns.

## Architecture Decision

**Language Choice: Python** (revised after research)
- **Python-native approach**: Use `google.protobuf.compiler.plugin_pb2` for protoc plugin interface
- **Native Python templating**: Use Jinja2 templates with Python AST parsing
- **Built-in syntax validation**: Use `ast.parse()` for real-time Python syntax checking
- **Simpler development**: No cross-language complexity, direct Python code generation
- **Better debugging**: Python stack traces and error handling throughout

**Rationale for change from Go**:
- Python protobuf ecosystem provides native plugin support via `plugin_pb2`
- `ast.parse()` gives immediate syntax validation during generation
- Python templates generating Python code eliminates Go→Python impedance mismatch
- Easier to debug and extend since everything is in Python
- Virtual environment isolation prevents global package pollution

## Current State Analysis

### Hand-written Reference Implementation
We have completed Python client files for `api_user/v1` service with **backup copies**:
- `service.py` + `service.handwritten.py` - Abstract service interface (22 lines)
- `service_grpc_client_options.py` + `service_grpc_client_options.handwritten.py` - Configuration options (196 lines) 
- `service_grpc_client.py` + `service_grpc_client.handwritten.py` - Main client implementation (321 lines)
- `meshtrade.common/` - Shared utilities and base classes

### Generated File Naming Convention
All generated Python client files will use the `_meshpy.py` suffix:
- `service_meshpy.py` - Generated abstract service interface
- `service_grpc_client_options_meshpy.py` - Generated configuration options
- `service_grpc_client_meshpy.py` - Generated main client implementation

**Critical**: 
- Always use `.handwritten.py` files as the golden reference for comparison testing
- Generated files use `_meshpy.py` suffix for easy identification and cleanup

### Key Patterns to Replicate
1. **Resource Management**: `with client:` context manager pattern
2. **Dual Authentication**: API key + cookie-based tokens
3. **Configuration Options**: 8 functional options (timeouts, TLS, tracing, etc.)
4. **Error Handling**: Proper gRPC exception handling
5. **OpenTelemetry Integration**: Automatic tracing support

## Development Flow

### Core Development Cycle (Use for ALL phases)
```bash
# 1. Activate virtual environment
source api/tool/protoc-gen-meshpy/.venv/bin/activate

# 2. Update plugin code (main.py, templates, etc.)

# 3. Run minimal generation script
./api/tool/protoc-gen-meshpy/minimal-generate.sh

# 4. Check syntax validity
python -c "import ast; ast.parse(open('api/python/src/meshtrade/iam/api_user/v1/service_meshpy.py').read())"

# 5. Compare with reference files
diff api/python/src/meshtrade/iam/api_user/v1/service_meshpy.py api/python/src/meshtrade/iam/api_user/v1/service.handwritten.py

# 6. Identify necessary changes, repeat from step 2
```

### Minimal Generate Script (`tool/protoc-gen-meshpy/minimal-generate.sh`)
```bash
#!/usr/bin/env bash
set -Eeuo pipefail

echo "🧹 Cleaning Python meshpy generated files..."
find ../python/src/meshtrade -type f -name '*_meshpy.py' -delete

echo "🚀 Running protoc-gen-meshpy..."
cd .. && buf generate --include-imports --type meshtrade.iam.api_user.v1.ApiUserService
```

## Development Plan

### Phase 1: Foundation & Infrastructure (Milestone 1)
**Goal**: Establish basic plugin infrastructure and verify it works

#### 1.1 Project Setup & Buf Integration (Testable: Plugin responds to buf generate)
- [x] Create virtual environment in `tool/protoc-gen-meshpy` 
- [ ] Install Python dependencies in venv: `protobuf`, `jinja2`
- [ ] Create `main.py` entry point for protoc plugin interface
- [ ] Implement minimal plugin that reads stdin, outputs "Hello World" comment to `*_meshpy.py` files
- [ ] Create `minimal-generate.sh` script that cleans `*_meshpy.py` files and runs buf generate
- [ ] Test plugin integration with `buf generate` immediately
- [ ] Verify plugin is called for service files and creates `*_meshpy.py` output

**Validation**: Plugin runs via buf generate and creates `*_meshpy.py` files with comments
**Critical**: ALL development in virtual environment - `source .venv/bin/activate`

#### 1.2 Development Flow Setup (Testable: Iterative development cycle)
- [ ] Establish development cycle: code → run script → syntax check → compare → iterate
- [ ] Create syntax validation helper using `ast.parse()`
- [ ] Set up comparison with `.handwritten.py` files
- [ ] Test iterative development flow

**Validation**: Complete development cycle works end-to-end

#### 1.3 Basic File Generation (Testable: Creates Python files)
- [ ] Generate empty `*_meshpy.py` files with correct naming using buf integration
- [ ] Add proper headers and imports to `*_meshpy.py` files
- [ ] Test file creation for `api_user/v1` service via `minimal-generate.sh`
- [ ] Verify Python syntax with `ast.parse()` automatically

**Validation**: Empty but syntactically valid `*_meshpy.py` files are created via buf generate

### Phase 2: Template System (Milestone 2)
**Goal**: Establish templating infrastructure for generating Python code

#### 2.1 Template Engine Setup (Testable: Template renders)
- [ ] Set up Jinja2 templating environment in Python
- [ ] Create template directory structure (`templates/`)
- [ ] Implement template rendering with static test data
- [ ] Add real-time Python syntax validation using `ast.parse()`
- [ ] Create validation helper that catches and reports syntax errors

**Validation**: Templates render Python code that passes `ast.parse()` validation

#### 2.2 Base Templates (Testable: Basic class structure)
- [ ] Create `service_meshpy.py` template (abstract interface)
- [ ] Create `service_grpc_client_options_meshpy.py` template (configuration)
- [ ] Create `service_grpc_client_meshpy.py` template (main client)
- [ ] Test rendering with hardcoded service data via `minimal-generate.sh`
- [ ] Run development cycle: template → script → syntax check → compare → iterate

**Validation**: Generated `*_meshpy.py` files match basic structure of `.handwritten.py` files

### Phase 3: Protobuf Integration (Milestone 3)
**Goal**: Parse protobuf definitions and extract service information

#### 3.1 Service Analysis (Testable: Extracts service info)
- [ ] Parse protobuf service definitions using `plugin_pb2.CodeGeneratorRequest`
- [ ] Extract service name, package, and methods from `file_to_generate`
- [ ] Map protobuf message types to Python imports using `descriptor_pb2`
- [ ] Test with `api_user/v1/service.proto`

**Validation**: Correctly extracts service metadata (name: ApiUserService, methods: 6)

#### 3.2 Method Processing (Testable: Method signatures)
- [ ] Generate method signatures for each RPC
- [ ] Handle request/response message types
- [ ] Map protobuf field types to Python types
- [ ] Generate proper import statements

**Validation**: Method signatures match hand-written client methods

### Phase 4: Code Generation Implementation (Milestone 4)
**Goal**: Generate complete, functional Python clients

#### 4.1 Abstract Interface Generation (Testable: service.py)
- [ ] Generate abstract base class with service methods
- [ ] Add proper method signatures and docstrings
- [ ] Include abstract method decorators
- [ ] Test against hand-written `service.py`

**Validation**: Generated file is functionally equivalent to hand-written version

#### 4.2 Options Generation (Testable: service_grpc_client_options.py)
- [ ] Generate ClientOption type definitions
- [ ] Create 8 functional option methods (WithTLS, WithTimeout, etc.)
- [ ] Add proper type hints and documentation
- [ ] Test against hand-written options file

**Validation**: All 8 client options are generated correctly

#### 4.3 Client Implementation (Testable: service_grpc_client.py)
- [ ] Generate main client class with constructor
- [ ] Implement gRPC method calls for each service method
- [ ] Add resource management (`__enter__`, `__exit__`)
- [ ] Include authentication and error handling
- [ ] Test against hand-written client implementation

**Validation**: Generated client can make actual gRPC calls

### Phase 5: Integration & Quality Assurance (Milestone 5)
**Goal**: Ensure generated code is production-ready

#### 5.1 Final Validation (Testable: Complete generation)
- [ ] Generate complete `*_meshpy.py` client files for `api_user/v1`
- [ ] Compare generated `*_meshpy.py` files with `.handwritten.py` reference files
- [ ] Validate syntax with `ast.parse()` during generation
- [ ] Confirm generated code structure matches hand-written versions

**Validation**: Generated `*_meshpy.py` files pass syntax validation and match `.handwritten.py` files

#### 5.2 Error Handling & Edge Cases
- [ ] Handle services with no methods
- [ ] Handle complex message types (nested, repeated fields)
- [ ] Add comprehensive error messages
- [ ] Test with malformed protobuf definitions

**Validation**: Generator handles edge cases gracefully without crashing

### Phase 6: Documentation & Expansion (Milestone 6)
**Goal**: Document the working generator

#### 6.1 Documentation
- [ ] Document generator usage and options
- [ ] Create example usage for generated clients
- [ ] Add troubleshooting guide
- [ ] Document template customization

**Validation**: Documentation covers basic usage patterns

#### 6.2 Multi-Service Support
- [ ] Test generator with other Meshtrade services
- [ ] Validate consistency across different service types
- [ ] Optimize for common patterns

**Validation**: Successfully generates clients for multiple services

## Success Criteria

### Functional Requirements
1. **Correctness**: Generated Python clients are functionally identical to `.handwritten.py` versions
2. **Syntax**: Generated code passes `ast.parse()` validation
3. **Usability**: Generated clients have the same API as hand-written clients
4. **Integration**: Seamless integration with existing buf generate workflow

### Non-Functional Requirements
1. **Maintainability**: Templates are readable and well-documented
2. **Extensibility**: Easy to add new client features
3. **Reliability**: Generator handles edge cases without crashing

## Risk Mitigation

### Technical Risks
1. **Complex Template Logic**: Mitigate by keeping templates simple, logic in Go
2. **Python Syntax Errors**: Mitigate with automated syntax validation
3. **Type Mapping Issues**: Mitigate with comprehensive test cases
4. **Performance**: Mitigate with benchmarking and optimization

### Process Risks
1. **Scope Creep**: Mitigate by focusing on replicating existing functionality first
2. **Integration Issues**: Mitigate with early buf generate testing
3. **Quality Degradation**: Mitigate with automated quality checks at each milestone

## Development Environment

### Prerequisites
- Go 1.24.3+ (for generator implementation)
- Python 3.12+ (for client validation)
- protoc and buf CLI tools
- Virtual environment at `tool/protoc-gen-meshpy/.venv`

### Key Dependencies
```bash
# CRITICAL: Always activate virtual environment first
source api/tool/protoc-gen-meshpy/.venv/bin/activate

# Core plugin dependencies
pip install protobuf jinja2

# For comparison testing only
pip install grpcio grpcio-tools opentelemetry-api

# Syntax validation built into Python stdlib (ast module)
```

### Validation Strategy
Each milestone has specific validation criteria:
1. **Generator Execution**: Plugin runs without errors
2. **Syntax Validation**: Generated code passes `ast.parse()`
3. **Comparison Validation**: Generated files match `.handwritten.py` structure and functionality

## Next Steps

1. **Immediate**: Phase 1.1 - Install dependencies, create `main.py`, create `minimal-generate.sh`
2. **First Validation**: Run `minimal-generate.sh` and ensure plugin responds to buf generate
3. **Establish Flow**: Complete development cycle (code → script → syntax → compare → iterate)
4. **First Milestone**: Complete Phase 1 with working buf integration
5. **Critical**: ALL work in virtual environment - verify with `which python`

This plan provides a clear roadmap with buf integration from day one and iterative development:
- **Development Flow**: code → `minimal-generate.sh` → syntax check → compare → iterate
- **Immediate Feedback**: Every change tested via buf generate
- **Continuous Validation**: Syntax and comparison checking at each step
