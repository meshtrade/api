# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Mesh API repository containing protobuf definitions and multi-language SDK generation for Mesh's trading platform APIs. The repository follows a schema-first approach where protobuf definitions are the source of truth, with generated client libraries in Go, Python, and TypeScript.

## Key Commands

### Documentation Site
- `cd docs && bundle install` - Install Jekyll dependencies
- `cd docs && bundle exec jekyll serve` - Run Jekyll development server (http://127.0.0.1:4000)
- `cd docs && bundle exec jekyll build` - Build static Jekyll site
- Site URL: https://meshtrade.github.io/api

### Code Generation
- `./scripts/generate.sh` - Main build script that cleans and regenerates all client libraries from protobuf definitions
- `./scripts/generate.sh -v` - Same as above with verbose output
- `buf generate` - Generate code from protobuf definitions using buf

### Language-Specific Commands

#### Go
- `go test ./...` - Run all Go tests
- `go mod tidy` - Clean up Go module dependencies

#### Python
- `cd python && pip install -e .[dev]` - Install Python package in development mode
- `cd python && pytest` - Run Python tests
- `cd python && ruff check . --fix` - Lint Python code (CRITICAL: Always run after Python changes)
- `cd python && ruff format` - Format Python code
- `cd python && tox` - Run full test suite with tox

### Python Environment Setup

**CRITICAL**: Python code must run in the virtual environment with proper PYTHONPATH setup:

```bash
# go to python directory
cd python

# Setup virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements-dev.txt

# Run tests (required PYTHONPATH)
PYTHONPATH="./common/python/lib:./common/python/tests" pytest ./common/python/tests -v

# Run linting (CRITICAL: Always run after Python changes)
ruff check . --fix
ruff format .
```

### Python Linting Standards

**Configuration**: Uses `ruff` with 150-character line limit (see `pyproject.toml`)

**Key Linting Rules**:
- **E501**: Line length (150 chars max)
- **E711**: Use `is`/`is not` for None comparisons (never `== None`)
- **F401**: Remove unused imports OR add proper `__all__` lists to modules
- **SIM112**: Environment variables must use UPPER_CASE naming

**Critical Python Module Organization Rule**:
- **NEVER put code other than imports in `__init__.py` files** - use dedicated modules instead. This ensures clean module structure and prevents import issues.

**Best Practices for Line Length**:
1. Use parentheses for implicit line continuation on function calls
2. Break long docstrings across multiple lines
3. Use `# noqa: E501` ONLY for extreme cases (300+ chars) like malformed test data
4. Break long f-strings using multiple f-string concatenation

**Example Good Line Breaking**:
```python
# Good - function call with parentheses
result = (
    some_long_function_name_that_exceeds_limit(
        parameter_one=value,
        parameter_two=other_value,
    )
)

# Good - docstring breaking
def function():
    """
    This is a long docstring that needs to be broken across multiple lines
    to respect the line length limit while maintaining readability.
    """

# Good - f-string breaking
message = (
    f"This is a long message with {variable_one} and "
    f"another {variable_two} that spans multiple lines"
)
```

#### TypeScript
- `cd ts && yarn install` - Install dependencies
- `cd ts && yarn build` - Build TypeScript library
- `cd ts && yarn test` - Run TypeScript tests
- `cd ts && yarn lint` - Lint TypeScript code

## Architecture

### Directory Structure
- `/proto/` - Protobuf API definitions (source of truth)
  - `/meshtrade/` - All API services organized by domain
  - Each service follows pattern: `domain/resource/v1/`
- `/go/` - Generated Go client libraries and utilities
- `/python/` - Generated Python packages with additional utilities
- `/ts/` - Generated TypeScript modules
- `/docs/` - Jekyll-based documentation site
  - `index.md` - Home page with complete API documentation (no external includes)
  - `pages/` - Individual documentation pages with Jekyll front matter
  - `assets/` - Site assets (images, logos, etc.)
  - `_sass/` - Custom Sass stylesheets for Jekyll theme customization
  - `Gemfile` - Jekyll dependencies
  - `_config.yml` - Jekyll site configuration
- `/scripts/` - Build and generation scripts
- `/tool/protoc-gen-meshgo/` - Custom protobuf generator for Go

### API Services Structure
Services are organized by business domain:
- `compliance/client/v1` - Client compliance and KYC
- `iam/role/v1` & `iam/group/v1` - Identity and access management
- `issuance_hub/instrument/v1` - Financial instrument management  
- `trading/direct_order/v1`, `trading/limit_order/v1`, `trading/spot/v1` - Trading services
- `wallet/account/v1` - Account and wallet management
- `type/v1` - Shared types used across services (Amount, Decimal, Token, etc.)

### Code Generation Flow
1. Protobuf definitions in `/proto/` define the API contracts
2. `buf generate` processes these using `buf.gen.yaml` configuration
3. Multiple protobuf plugins generate language-specific code:
   - Go: Standard protobuf + gRPC + custom meshgo generator
   - Python: Standard protobuf generators
   - TypeScript: protobuf-js + grpc-web generators
4. Language-specific build processes create final packages

### Shared Types
The `/proto/meshtrade/type/v1/` directory contains foundational types used across multiple services:
- `Decimal` - High-precision decimal arithmetic
- `Amount` - Monetary amounts with currency
- `Token` - Blockchain token representations
- `Ledger` - Ledger-related types
- Custom Go and TypeScript utilities extend these with helper functions

## Development Workflow

1. **Making API Changes**: Always modify protobuf files in `/proto/` first
2. **Code Generation**: Run `./scripts/generate.sh` to regenerate all client libraries
3. **Testing**: Each language has its own test suite - run them after generation
4. **Version Management**: API versions are managed through protobuf package paths (v1, v2, etc.)

## Documentation Site Workflow

### Structure and Organization
- **Root README.md**: Simplified overview with link to full documentation site
- **docs/index.md**: Complete documentation content (mermaid diagrams, API philosophy, etc.)
- **docs/pages/**: Individual pages for Go, Python, TypeScript, and Proto documentation
- **Stub READMEs**: Language directories contain minimal READMEs linking to docs/pages

### Jekyll Configuration
- Uses `just-the-docs` theme with custom `wider` color scheme
- Configured to exclude all non-docs directories (go/, ts/, python/, proto/, etc.)
- Mermaid diagrams supported (v11.6.0)
- Custom Sass styling in `_sass/` directory

### Adding Documentation Pages
1. Create markdown files in `docs/pages/` with Jekyll front matter:
   ```yaml
   ---
   title: Page Title
   layout: page
   nav_order: 2
   parent: Parent Page (optional)
   ---
   ```
2. Jekyll automatically includes them in site navigation
3. Use `{% include_relative filename.md %}` for including other markdown files within docs/

### Documentation Maintenance
- **docs/pages/api_doc.md**: Auto-generated API reference (copied from proto/api_doc.md)
- **Language-specific pages**: Go, Python, TypeScript documentation moved from language directories
- **Navigation**: Managed through Jekyll front matter `nav_order` and `parent` properties

## Important Notes

### Code Generation
- All generated files (*.pb.go, *_pb2.py, *pb.js, etc.) should not be manually edited
- The repository uses buf for protobuf management and linting
- Each language SDK is independently packaged and versioned
- Breaking changes require new API versions (e.g., v1 -> v2)
- Custom protobuf generator `protoc-gen-meshgo` creates additional Go utilities

### Documentation Site
- Jekyll site is self-contained in `/docs/` directory
- Do not use `../` paths in Jekyll includes - copy files to docs/ instead
- API documentation (api_doc.md) must be copied from proto/ to docs/pages/ when updated
- Theme deprecation warnings are non-blocking (related to Sass @import usage)
- Site builds successfully despite warnings and serves on http://127.0.0.1:4000

### Protobuf Service Patterns
- **Resource Service Naming**: All resource services follow consistent pattern:
  - Method names include resource name (e.g., `GetAccount`, `CreateClient`, `MintInstrument`)
  - Request/Response messages include resource name (e.g., `GetAccountRequest`, `ListClientsResponse`)
  - Get/Create methods return the resource directly, not a response wrapper
- **Authorization Model**: Uses Role enum from `meshtrade/option/v1/role.proto`:
  - File-level `standard_roles` option declares all roles used by service
  - Method-level `roles` option specifies which roles can access each method
  - Extension tags: `standard_roles` = 50003, `roles` = 50005, `method_type` = 50004
  - Role definitions follow pattern: `ROLE_{DOMAIN}_{ADMIN|VIEWER}` (e.g., `ROLE_COMPLIANCE_ADMIN`, `ROLE_IAM_VIEWER`)
  - Each service domain has both admin and viewer roles with appropriate permissions
- **Method Type Classification**: Uses MethodType enum from `meshtrade/option/v1/method_type.proto`:
  - All RPC methods must specify `method_type` option as either `METHOD_TYPE_READ` or `METHOD_TYPE_WRITE`
  - Read operations (Get, List, Search) use `METHOD_TYPE_READ`
  - Write operations (Create, Update, Delete, Mint, Burn) use `METHOD_TYPE_WRITE`
- **Extension Tag Management**: Be careful with protobuf extension tag conflicts across option files
- **Response Message Cleanup**: Remove unused response messages when methods return resources directly

### TypeScript Hand-Written Code Maintenance
- **Post-Generation Updates**: After running `./scripts/generate.sh`, hand-written TypeScript client wrappers may need updates:
  - Method name changes: `get()` → `getResource()`, `create()` → `createResource()`
  - Return type changes: Get/Create methods return resources directly, not response wrappers
  - Import statement updates: Remove imports for deleted response message types
  - Add imports for resource types (e.g., `import { Client } from "./client_pb"`)
  - **Missing Method Detection**: Compare wrapper methods to generated service interface to ensure all RPC methods are exposed
- **Breaking Change Detection**: TypeScript compilation errors after generation indicate needed updates:
  - Missing exported members = removed response types that need import cleanup
  - Missing properties on service clients = method name changes
  - Use `yarn build` and `yarn lint` in `/ts` to validate all changes
- **Hand-Written Client Pattern**: Client wrapper classes in `*_grpc_web.ts` files should:
  - Mirror the generated gRPC service interface exactly
  - Use consistent method naming with resource names included
  - Return the same types as the generated service (resources directly for Get/Create)
  - Maintain proper JSDoc documentation with updated parameter and return types
  - Include ALL methods from the corresponding protobuf service definition
- **Client Wrapper Validation Process**:
  1. After protobuf changes, run `./scripts/generate.sh` to regenerate code
  2. Check each `*_grpc_web.ts` file to ensure all service methods are wrapped
  3. Update imports to include all required request/response types
  4. Run `yarn build` and `yarn lint` in `/ts` to verify compilation
  5. Look for methods in `service_grpc_web_pb.d.ts` that aren't in the wrapper client
- **Orphaned File Cleanup**: Remove hand-written files when their corresponding proto services are deleted

## Protobuf Refactoring Best Practices

### Role and Method Type Management
- **Always run `./scripts/generate.sh`** after protobuf changes to regenerate all language bindings
- **Use `buf lint`** to validate protobuf syntax and style before generation
- **Role definitions** must be added to `meshtrade/option/v1/role.proto` following the `ROLE_{DOMAIN}_{ADMIN|VIEWER}` pattern
- **Method type annotations** are mandatory for all RPC methods using `METHOD_TYPE_READ` or `METHOD_TYPE_WRITE`
- **File-level role declarations** ensure service authorization model is self-documenting
- **Method-level role assignments** control granular access permissions per operation

### Code Generation Workflow
1. Modify protobuf files in `/proto/` directory
2. Run `buf lint` to validate changes
3. Run `./scripts/generate.sh` to regenerate all client libraries
4. Check TypeScript client wrappers for missing methods or imports
5. Run language-specific tests and linting to verify correctness

### Protobuf Syntax for Options

When adding options to protobuf files, keep the following in mind:

- **Option Syntax:** Custom options for services or methods should be declared directly. The correct syntax is `option (custom.option) = VALUE;` and not `option (custom.option) = { key: VALUE };`.
- **Enum Scopes:** When referencing enums from an imported `.proto` file (like `method_type.proto` or `role.proto`), you should use the enum value directly (e.g., `METHOD_TYPE_READ`) without the fully qualified package path, as long as the necessary import statement is present.
- **Option Scopes (`FileOptions` vs. `ServiceOptions`):** It's critical to apply options at the correct level. For example, `standard_roles` is a `FileOption` and must be declared at the top level of the file, not within a `service` definition, which uses `ServiceOptions`.
- **TypeScript Wrapper Dependencies:** When adding new RPC methods, you must manually update any hand-written client wrappers. This includes not only adding the new client method but also importing the newly generated request/response message types (e.g., `GetApiUserByKeyHashRequest` from `service_pb.ts`).