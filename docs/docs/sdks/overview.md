---
sidebar_position: 1
---

# SDK Overview

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Mesh provides official SDKs for Go, Python, and TypeScript, all generated from the same protobuf definitions
to ensure consistency across languages.

## SDK Features

### ✅ Type Safety

- **Generated from protobuf** - All SDKs maintain strict type safety
- **IDE support** - Full autocomplete and IntelliSense
- **Compile-time validation** - Catch errors before runtime

### ✅ Consistent API

- **Same method signatures** - Consistent across all languages
- **Identical request/response** - Same data structures everywhere
- **Unified documentation** - One source of truth

### ✅ Modern Async Support

- **Go** - Context-based cancellation and timeouts
- **Python** - async/await with asyncio support
- **TypeScript** - Promise-based with async/await

### ✅ Production Ready

- **Error handling** - Comprehensive error types and codes
- **Retry logic** - Built-in exponential backoff
- **Connection pooling** - Efficient resource management
- **TLS/SSL** - Secure by default

## Quick Comparison

| Feature             | Go           | Python          | TypeScript         |
| ------------------- | ------------ | --------------- | ------------------ |
| **Package Manager** | Go modules   | pip             | npm/yarn           |
| **Async Support**   | Context      | asyncio         | Promises           |
| **Type System**     | Static       | Dynamic + hints | Static             |
| **Error Handling**  | error values | Exceptions      | Promises/try-catch |
| **Streaming**       | ✅           | ✅              | ✅                 |
| **Middleware**      | ✅           | ✅              | ✅                 |

## Installation

<Tabs>
<TabItem value="go" label="Go">

```bash
go get github.com/meshtrade/api/go
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install meshtrade-api
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```bash
npm install @meshtrade/api
```

</TabItem>
</Tabs>

## Basic Usage Examples

<Tabs>
<TabItem value="go" label="Go">

```go title="Go Client Example"
package main

import (
    "context"
    "log"

    "github.com/meshtrade/api/go/wallet/account/v1"
)

func main() {
    ctx := context.Background()

    // Create client with API key
    client, err := account.NewClient(ctx, account.Config{
        APIKey: "your-api-key",
        Endpoint: "api.mesh.dev:443",
    })
    if err != nil {
        log.Fatal(err)
    }
    defer client.Close()

    // Make API call
    resp, err := client.GetAccount(ctx, &account.GetAccountRequest{
        AccountId: "acc_123",
    })
    if err != nil {
        log.Fatal(err)
    }

    log.Printf("Account: %v", resp.Id)
}
```

</TabItem>
<TabItem value="python" label="Python">

```python title="Python Client Example"
import asyncio
from meshtrade.wallet.account.v1 import AccountServiceClient

async def main():
    # Create client with API key
    client = AccountServiceClient(
        api_key="your-api-key",
        endpoint="api.mesh.dev:443"
    )

    try:
        # Make API call
        response = await client.get_account(
            account_id="acc_123"
        )

        print(f"Account: {response.id}")

    finally:
        await client.close()

# Run async function
asyncio.run(main())
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript title="TypeScript Client Example"
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

</TabItem>
</Tabs>

## Advanced Features

### Connection Management

All SDKs support connection pooling and reuse:

<Tabs>
<TabItem value="go" label="Go">

```go title="Go Connection Pool"
// Configure connection pool
config := account.Config{
    APIKey: "your-api-key",
    MaxConnections: 10,
    KeepAlive: 30 * time.Second,
}

client, err := account.NewClient(ctx, config)
```

</TabItem>
<TabItem value="python" label="Python">

```python title="Python Connection Pool"
# Configure connection pool
client = AccountServiceClient(
    api_key="your-api-key",
    max_connections=10,
    keep_alive=30
)
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript title="TypeScript Connection Pool"
// Configure connection pool
const client = new AccountServiceClient({
  apiKey: 'your-api-key',
  maxConnections: 10,
  keepAlive: 30000,
});
```

</TabItem>
</Tabs>

### Error Handling

Each SDK provides rich error information:

<Tabs>
<TabItem value="go" label="Go">

```go title="Go Error Handling"
resp, err := client.GetAccount(ctx, req)
if err != nil {
    if grpcErr, ok := status.FromError(err); ok {
        switch grpcErr.Code() {
        case codes.NotFound:
            log.Println("Account not found")
        case codes.PermissionDenied:
            log.Println("Access denied")
        default:
            log.Printf("Error: %v", grpcErr.Message())
        }
    }
}
```

</TabItem>
<TabItem value="python" label="Python">

```python title="Python Error Handling"
try:
    response = await client.get_account(account_id="acc_123")
except AccountNotFoundError:
    print("Account not found")
except PermissionDeniedError:
    print("Access denied")
except MeshAPIError as e:
    print(f"API error: {e.message}")
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript title="TypeScript Error Handling"
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

</TabItem>
</Tabs>

### Streaming Support

All SDKs support streaming for real-time updates:

<Tabs>
<TabItem value="go" label="Go">

```go title="Go Streaming"
stream, err := client.StreamAccountUpdates(ctx, &account.StreamRequest{
    AccountId: "acc_123",
})
if err != nil {
    log.Fatal(err)
}

for {
    update, err := stream.Recv()
    if err == io.EOF {
        break
    }
    if err != nil {
        log.Fatal(err)
    }

    log.Printf("Update: %v", update)
}
```

</TabItem>
<TabItem value="python" label="Python">

```python title="Python Streaming"
async for update in client.stream_account_updates(account_id="acc_123"):
    print(f"Update: {update}")
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript title="TypeScript Streaming"
const stream = client.streamAccountUpdates({ accountId: 'acc_123' });

for await (const update of stream) {
  console.log('Update:', update);
}
```

</TabItem>
</Tabs>

## Environment Configuration

### Environment Variables

All SDKs support environment variable configuration:

```bash
# API Configuration
export MESH_API_KEY=your-api-key
export MESH_API_ENDPOINT=api.mesh.dev:443

# TLS Configuration
export MESH_TLS_CERT_PATH=/path/to/cert.pem
export MESH_TLS_KEY_PATH=/path/to/key.pem

# Logging
export MESH_LOG_LEVEL=info
export MESH_LOG_FORMAT=json
```

### Configuration Files

```yaml title="mesh-config.yaml"
api:
  key: 'your-api-key'
  endpoint: 'api.mesh.dev:443'
  timeout: 30s

tls:
  cert_file: '/path/to/cert.pem'
  key_file: '/path/to/key.pem'

logging:
  level: 'info'
  format: 'json'
```

## Best Practices

### 1. Connection Reuse

```go
// ✅ Good - Reuse client connections
client, err := account.NewClient(ctx, config)
defer client.Close()

// Make multiple calls with same client
for i := 0; i < 100; i++ {
    client.GetAccount(ctx, &account.GetAccountRequest{...})
}
```

### 2. Context Timeouts

```go
// ✅ Good - Set appropriate timeouts
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

client.GetAccount(ctx, req)
```

### 3. Error Handling

```python
# ✅ Good - Handle specific errors
try:
    response = await client.get_account(account_id="acc_123")
except AccountNotFoundError:
    # Handle missing account
    pass
except RateLimitError:
    # Handle rate limiting
    await asyncio.sleep(1)
    # Retry logic
```

### 4. Resource Cleanup

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

## Next Steps

- 🔧 **[Go SDK](./go)** - Detailed Go SDK documentation
- 🐍 **[Python SDK](./python)** - Comprehensive Python guide
- 📝 **[TypeScript SDK](./typescript)** - TypeScript implementation details
- 💡 **[Examples](../examples/basic-usage)** - Real-world usage examples