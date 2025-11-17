# TypeScript SDK

This directory contains the TypeScript SDK for interacting with the Mesh API.

## Overview

The TypeScript SDK provides a modern and type-safe client library, generated from our schema-first protobuf definitions, designed for seamless integration with the Mesh trading platform in web and Node.js environments.

## Development Setup

This package is part of a Yarn workspace. Install dependencies from the repository root:

```bash
# From repository root
yarn install
```

## Testing

Run comprehensive TypeScript tests including Jest, type checking, and linting:

```bash
# From repository root - recommended
./dev/test/typescript.sh

# Or run tests manually
yarn test
yarn build
yarn lint
```

## Code Generation

This directory contains generated code. To regenerate from protobuf definitions:

```bash
# From repository root
./dev/tool.sh generate --targets=typescript
```

## Documentation

For complete documentation, including installation, usage examples, and API reference, please visit the main documentation site:

**[meshtrade.github.io/api](https://meshtrade.github.io/api)**
