# Go SDK

This directory contains the Go SDK for interacting with the Mesh API.

## Overview

The Go SDK provides a robust, type-safe client library generated from our schema-first protobuf definitions, enabling seamless integration with the Mesh trading platform.

## Testing

Run comprehensive Go tests including coverage and security analysis:

```bash
# From repository root - recommended
./dev/test/go.sh

# Or run basic tests manually
go test ./...
```

## Code Generation

This directory contains generated code. To regenerate from protobuf definitions:

```bash
# From repository root
./dev/tool.sh generate --targets=go
```

## Documentation

For complete documentation, including installation, usage examples, and API reference, please visit the main documentation site:

**[meshtrade.github.io/api](https://meshtrade.github.io/api)**
