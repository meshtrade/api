# TypeScript SDK for Web (Browser)

**Package:** `@meshtrade/api-web`

This is the **browser-optimized** TypeScript SDK for the Mesh API, built with Connect-ES and gRPC-Web.

## When to Use This SDK

- ✅ **Browser/frontend applications** (React, Vue, Angular, etc.)
- ✅ **Client-side JavaScript** that runs in the browser
- ✅ **Web applications** that need cookie-based authentication

## Key Differences from Other SDKs

| Feature | Web SDK | Node SDK | Legacy SDK |
|---------|---------|----------|------------|
| **Environment** | Browser | Node.js/Server | Browser (deprecated) |
| **Transport** | gRPC-Web | Native gRPC | gRPC-Web (old) |
| **Authentication** | Browser cookies (`credentials: 'include'`) | API Key, JWT, Cookie | Manual headers |
| **Package** | `@meshtrade/api-web` | `@meshtrade/api-node` | `@meshtrade/api-old` |
| **Use Case** | Frontend apps | Backend/server-side | Legacy support only |

## Authentication

This SDK uses **browser-native cookie authentication**. HTTP-only cookies (like `AccessToken`) are automatically sent with each request via the `credentials: 'include'` fetch option. You don't need to manually manage authentication tokens in browser environments.

For backend/server authentication with API keys or JWT tokens, use `@meshtrade/api-node` instead.

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
./dev/test/ts-web.sh

# Or using the orchestration tool
./dev/tool.sh test --targets=ts-web

# Or run tests manually
yarn test:web
yarn build:web
yarn lint:web
```

## Code Generation

This directory contains generated code. To regenerate from protobuf definitions:

```bash
# From repository root
./dev/tool.sh generate --targets=ts-web
```

## Documentation

For complete documentation, including installation, usage examples, and API reference, please visit the main documentation site:

**[meshtrade.github.io/api](https://meshtrade.github.io/api)**
