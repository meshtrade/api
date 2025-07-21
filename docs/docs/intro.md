---
sidebar_position: 1
---

# Introduction

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome to the **Mesh API Documentation** - your comprehensive guide to integrating with the Mesh trading platform.

## What is Mesh API?

Mesh API is a modern, gRPC-based API that provides access to:

- **Compliance Services** - Client onboarding, KYC, and regulatory compliance
- **Trading Services** - Direct orders, limit orders, and spot trading
- **Wallet Management** - Account creation and balance management
- **Identity & Access Management** - Role-based access control
- **Issuance Hub** - Financial instrument creation and management

## Quick Start

Let's get you up and running with **Mesh API in less than 5 minutes**.

### 1. Installation

First, install the SDK for your preferred language:

<Tabs>
<TabItem value="go" label="Go">

```bash
# Install the Go SDK
go get github.com/meshtrade/api/go
```

Requirements: [Go](https://golang.org/dl/) version 1.21 or above

</TabItem>
<TabItem value="python" label="Python">

```bash
# Install the Python SDK
pip install meshtrade
```

Requirements: [Python](https://www.python.org/downloads/) version 3.9 or above

</TabItem>
<TabItem value="typescript" label="TypeScript">

```bash
# Install the TypeScript SDK
npm install @meshtrade/api
```

Requirements: [Node.js](https://nodejs.org/en/download/) version 18.0 or above

</TabItem>
</Tabs>

### 2. Getting Your API Key

To use the Mesh API, you'll need an API key:

1. **Sign up** for a Mesh developer account (coming soon)
2. **Navigate** to the API Keys section in your dashboard
3. **Create** a new API key with appropriate permissions
4. **Copy** your API key securely

:::tip
Keep your API key secure and never commit it to version control. Use environment variables or secure configuration management.
:::

### 3. Your First API Request

Let's test your setup by calling the version service to verify connectivity:

<Tabs>
<TabItem value="go" label="Go">

```go
package main

import (
    "context"
    "log"
    "os"

    "github.com/meshtrade/api/go/system/version/v1"
)

func main() {
    ctx := context.Background()

    // Create client with API key from environment
    client, err := version.NewClient(ctx, version.Config{
        APIKey:   os.Getenv("MESH_API_KEY"),
        Endpoint: "api.mesh.dev:443",
    })
    if err != nil {
        log.Fatal(err)
    }
    defer client.Close()

    // Make API call to check connectivity
    resp, err := client.GetVersion(ctx, &version.GetVersionRequest{})
    if err != nil {
        log.Fatal(err)
    }

    log.Printf("Connected to Mesh API version: %s", resp.Version)
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
import asyncio
import os
from meshtrade.system.version.v1 import VersionServiceClient

async def main():
    # Create client with API key from environment
    client = VersionServiceClient(
        api_key=os.getenv("MESH_API_KEY"),
        endpoint="api.mesh.dev:443"
    )

    try:
        # Make API call to check connectivity
        response = await client.get_version()
        print(f"Connected to Mesh API version: {response.version}")
    finally:
        await client.close()

# Run the example
asyncio.run(main())
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
import { VersionServiceClient } from '@meshtrade/api/system/version/v1';

async function main() {
  // Create client with API key from environment
  const client = new VersionServiceClient({
    apiKey: process.env.MESH_API_KEY,
    endpoint: 'api.mesh.dev:443',
  });

  try {
    // Make API call to check connectivity
    const response = await client.getVersion({});
    console.log(`Connected to Mesh API version: ${response.version}`);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
```

</TabItem>
</Tabs>

Set your API key as an environment variable:

```bash
export MESH_API_KEY=your-api-key-here
```

If everything is set up correctly, you should see a message confirming your connection to the Mesh API.

## Next Steps

Now that you have a working connection to the Mesh API, explore these key concepts:

### 📋 Learn About Service Structure
Understanding how our APIs are organized and the common patterns used across all services.

👉 **[Service Structure Guide](./guides/service-structure)** - Learn about resource-oriented design, standard verbs, and API patterns

### 🏢 Group Ownership Structure  
Learn how groups provide ownership and isolation boundaries for your resources.

👉 **[Group Ownership Guide](./guides/group-ownership)** - Understand multi-tenancy, resource isolation, and group management

### 🔐 Permissions Structure
Discover our schema-driven authorization system and role-based access control.

👉 **[Permissions Guide](./guides/schema-driven-authorization)** - Master RBAC, roles, and permission management

### 📚 Additional Resources

- **[API Reference](./api/reference)** - Complete API documentation
- **[Roadmap](./roadmap)** - Upcoming features and improvements

---

*Ready to build something amazing with Mesh API? Let's get started!*