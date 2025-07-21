---
sidebar_position: 4
---

# TypeScript SDK

TypeScript/JavaScript SDK for Mesh APIs with full type safety and modern async support.

## Overview

The TypeScript SDK provides a fully typed interface to Mesh APIs with:

- **Full Type Safety** - Complete TypeScript definitions for all APIs
- **Promise-based** - Modern async/await support
- **Tree Shaking** - Import only what you need
- **Node.js Support** - Works in Node.js environments
- **gRPC Native** - Direct gRPC protocol communication

## Status

🚧 **Under Development** - The TypeScript SDK is currently in development and may be subject to change.

## Installation

```bash
npm install @meshtrade/api
# or
yarn add @meshtrade/api
```

## Quick Start

```typescript
import { AccountServiceClient } from '@meshtrade/api/wallet/account/v1';

async function main() {
  // Create client with API key
  const client = new AccountServiceClient({
    apiKey: 'your-api-key',
    endpoint: 'api.mesh.dev:443',
  });

  try {
    // Make API call
    const response = await client.getAccount({
      accountId: 'acc_123',
    });

    console.log(`Account: ${response.id}`);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
```

## Features

### Type Safety

All request and response types are automatically generated from protobuf definitions:

```typescript
import { GetAccountRequest, GetAccountResponse } from '@meshtrade/api/wallet/account/v1';

// Full IntelliSense support
const request: GetAccountRequest = {
  accountId: 'acc_123',
};

// Type-safe response handling
const response: GetAccountResponse = await client.getAccount(request);
```

### Error Handling

```typescript
import { AccountNotFoundError, PermissionDeniedError } from '@meshtrade/api/errors';

try {
  const response = await client.getAccount({ accountId: 'acc_123' });
} catch (error) {
  if (error instanceof AccountNotFoundError) {
    console.log('Account not found');
  } else if (error instanceof PermissionDeniedError) {
    console.log('Access denied');
  } else {
    console.error('API error:', error.message);
  }
}
```

### Service Integration

```typescript
// Multiple service integration
import { AccountServiceClient } from '@meshtrade/api/wallet/account/v1';
import { ComplianceServiceClient } from '@meshtrade/api/compliance/client/v1';

const accountClient = new AccountServiceClient(config);
const complianceClient = new ComplianceServiceClient(config);

// Use multiple services together
const account = await accountClient.getAccount({ accountId: 'acc_123' });
const client = await complianceClient.getClient({ clientId: account.clientId });
```

## Configuration

### Environment Variables

```bash
export MESH_API_KEY=your-api-key
export MESH_API_ENDPOINT=api.mesh.dev:443
```

### Configuration Object

```typescript
const client = new AccountServiceClient({
  apiKey: process.env.MESH_API_KEY,
  endpoint: process.env.MESH_API_ENDPOINT,
  timeout: 30000,
  maxConnections: 10,
  keepAlive: 30000,
});
```

## Advanced Configuration

Advanced client configuration options:

```typescript
import { AccountServiceClient } from '@meshtrade/api/wallet/account/v1';

const client = new AccountServiceClient({
  apiKey: 'your-api-key',
  endpoint: 'api.mesh.dev:443',
  timeout: 30000,
  retries: 3,
});
```

## Package Structure

The TypeScript SDK is organized as a monorepo with separate packages for each service:

```
@meshtrade/api/
├── compliance/client/v1/
├── iam/group/v1/
├── iam/role/v1/
├── trading/direct-order/v1/
├── trading/limit-order/v1/
├── trading/spot/v1/
├── wallet/account/v1/
└── types/v1/
```

## For Developers

This SDK is automatically generated from protobuf definitions. The build process includes:

1. **Code Generation** - TypeScript types and clients generated from `.proto` files
2. **Type Checking** - Full TypeScript compilation
3. **Testing** - Unit and integration tests
4. **Bundling** - Optimized bundles for different environments

### Development Commands

```bash
# Install dependencies
yarn install

# Run type checking
yarn typecheck

# Run tests
yarn test

# Build packages
yarn build
```

## Best Practices

### Connection Reuse

```typescript
// ✅ Good - Reuse client connections
const client = new AccountServiceClient(config);

// Make multiple calls with same client
for (let i = 0; i < 100; i++) {
  await client.getAccount({ accountId: `acc_${i}` });
}

await client.close();
```

### Resource Cleanup

```typescript
// ✅ Good - Always clean up resources
const client = new AccountServiceClient(config);

try {
  const response = await client.getAccount({ accountId: 'acc_123' });
  // Process response
} finally {
  await client.close();
}
```

### Error Handling

```typescript
// ✅ Good - Handle specific errors
try {
  const response = await client.getAccount({ accountId: 'acc_123' });
} catch (error) {
  if (error instanceof AccountNotFoundError) {
    // Handle missing account
  } else if (error instanceof RateLimitError) {
    // Handle rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Retry logic
  } else {
    // Handle other errors
    console.error('Unexpected error:', error);
  }
}
```

## Next Steps

- 🐍 **[Python SDK](./python)** - Python SDK documentation
- 🔧 **[Go SDK](./go)** - Go SDK documentation
- 📖 **[API Reference](../api/reference)** - Complete API documentation
