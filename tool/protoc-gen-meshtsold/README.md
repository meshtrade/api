# protoc-gen-meshts

TypeScript gRPC-web client code generator for the mesh trading platform.

## Purpose

This generator creates TypeScript client wrappers around gRPC-web generated code, providing:
- Clean, typed interfaces for service methods
- Multi-tenant group context support via `withGroup()` method
- Proper error handling and interceptor integration
- JSDoc documentation for all methods

## Usage

This generator is automatically invoked during TypeScript code generation:

```bash
# Generate TypeScript SDK (includes this plugin)
./dev/tool.sh generate --targets=typescript

# Generate all SDKs
./dev/tool.sh all
```

Input/Output pattern:
- Input: `proto/meshtrade/iam/api_user/v1/service.proto`
- Output: `ts/src/meshtrade/iam/api_user/v1/client_grpc_web_meshts.ts`

## Build

```bash
cd api/tool/protoc-gen-meshts/cmd
yarn install
yarn build
```

## Development

The generator is built using the `@bufbuild/protoplugin` framework and generates TypeScript code that follows the same patterns as the existing handwritten clients.
