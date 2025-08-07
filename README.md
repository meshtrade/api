# Mesh API

Mesh API is a comprehensive gRPC-based [Mesh](https://www.mesh.trade) platform API with multi-language SDK support.

## Overview

This repository contains:

- **Protobuf API definitions** - Schema-first API specifications in `/proto`
- **Multi-language SDKs** - Generated client libraries for Go, Python, and TypeScript
- **Documentation** - Complete API documentation and integration guides

## Quick Start

- Browse the complete documentation: **[meshtrade.github.io/api](https://meshtrade.github.io/api)**
- View API definitions: `/proto` directory

## Repository Structure

```
proto/     # Protobuf API definitions (source of truth)
go/        # Go SDK  
python/    # Python SDK
ts/        # TypeScript (web) SDK
java/      # Java SDK
dev/       # Development tools (generation, testing, etc.)
docs/      # Documentation site (Docusaurus)
```

## Development

For contributors and maintainers, this repository includes comprehensive development tools:

```bash
# Generate all SDKs from protobuf definitions
./dev/tool.sh all

# Run comprehensive tests across all languages
./dev/tool.sh test

# Check development environment health
./dev/tool.sh doctor

# Generate specific language SDKs
./dev/tool.sh generate --targets=go,python

# View all available commands
./dev/tool.sh help
```

See the [Contributor Guide](https://meshtrade.github.io/api/contributors/) for detailed development instructions.

## Documentation

Visit documentation site at **[meshtrade.github.io/api](https://meshtrade.github.io/api)** for:

- API Integration SDKs and usage examples
- Complete API reference documentation  
- Development guides and best practices
- Architecture details & more

## License

See LICENSE file for details.