# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Mesh API repository containing protobuf definitions and multi-language SDK generation for Mesh's trading platform APIs. The repository follows a schema-first approach where protobuf definitions are the source of truth, with generated client libraries in Go, Python, and TypeScript.

## Key Commands

### Documentation Site
- `cd docs && bundle install` - Install Jekyll dependencies
- `cd docs && bundle exec jekyll serve` - Run Jekyll development server
- `cd docs && bundle exec jekyll build` - Build static Jekyll site

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
- `cd python && ruff check` - Lint Python code
- `cd python && ruff format` - Format Python code
- `cd python && tox` - Run full test suite with tox

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
  - `/pages/` - Documentation pages with Jekyll front matter
  - `/assets/` - Site assets (images, etc.)
  - `/_sass/` - Sass stylesheets for Jekyll theme
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

## Important Notes

- All generated files (*.pb.go, *_pb2.py, *pb.js, etc.) should not be manually edited
- The repository uses buf for protobuf management and linting
- Each language SDK is independently packaged and versioned
- Breaking changes require new API versions (e.g., v1 -> v2)
- Custom protobuf generator `protoc-gen-meshgo` creates additional Go utilities