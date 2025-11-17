# TypeScript SDK for Node.js (Server)

**Package:** `@meshtrade/api-node`

This is the **server-optimized** TypeScript SDK for the Mesh API, built with Connect-ES and native gRPC transport.

## When to Use This SDK

- ✅ **Node.js backend services**
- ✅ **Server-side applications** (Next.js API routes, Express, etc.)
- ✅ **Microservices** that need API key or JWT authentication
- ✅ **Scripts and automation** requiring programmatic API access

## Key Differences from Other SDKs

| Feature | Node SDK | Web SDK | Legacy SDK |
|---------|----------|---------|------------|
| **Environment** | Node.js/Server | Browser | Browser (deprecated) |
| **Transport** | Native gRPC (HTTP/2) | gRPC-Web | gRPC-Web (old) |
| **Authentication** | API Key, JWT, Cookie | Browser cookies only | Manual headers |
| **Package** | `@meshtrade/api-node` | `@meshtrade/api-web` | `@meshtrade/api-old` |
| **Use Case** | Backend/server-side | Frontend apps | Legacy support only |

## Authentication Modes

This SDK supports **three authentication modes**:

### 1. No Authentication (Public APIs)
```typescript
const client = new APIUserServiceNode({
  apiServerURL: "http://localhost:10000"
});
```

### 2. API Key Authentication (Backend Services)
```typescript
const client = new APIUserServiceNode({
  apiServerURL: "https://api.example.com",
  apiKey: "your-api-key",
  group: "groups/01ARZ3NDEKTSV4YWVF8F5BH32"
});
```

### 3. JWT Token Authentication (Next.js with User Session)
```typescript
const client = new APIUserServiceNode({
  apiServerURL: "https://api.example.com",
  jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
});
```

For browser/frontend applications, use `@meshtrade/api-web` instead, which uses cookie-based authentication.

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
./dev/test/ts-node.sh

# Or using the orchestration tool
./dev/tool.sh test --targets=ts-node

# Or run tests manually
yarn test:node
yarn build:node
yarn lint:node
```

## Code Generation

This directory contains generated code. To regenerate from protobuf definitions:

```bash
# From repository root
./dev/tool.sh generate --targets=ts-node
```

## Documentation

For complete documentation, including installation, usage examples, and API reference, please visit the main documentation site:

**[meshtrade.github.io/api](https://meshtrade.github.io/api)**
