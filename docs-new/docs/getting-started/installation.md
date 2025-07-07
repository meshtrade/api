---
sidebar_position: 1
---

# Installation

Get started with the Mesh API by installing the SDK for your preferred programming language.

## System Requirements

- **Node.js** 18.0+ (for TypeScript SDK)
- **Go** 1.21+ (for Go SDK)
- **Python** 3.9+ (for Python SDK)

## SDK Installation

### Go SDK

```bash
# Install the Go SDK
go get github.com/meshtrade/api/go

# Install specific service packages
go get github.com/meshtrade/api/go/wallet/account/v1
go get github.com/meshtrade/api/go/trading/spot/v1
go get github.com/meshtrade/api/go/compliance/client/v1
```

Example `go.mod`:

```go title="go.mod"
module your-app

go 1.21

require (
    github.com/meshtrade/api/go v0.0.8
    google.golang.org/grpc v1.65.0
)
```

### Python SDK

```bash
# Install via pip
pip install meshtrade-api

# Install with development dependencies
pip install meshtrade-api[dev]

# Install from source
git clone https://github.com/meshtrade/api.git
cd api/python
pip install -e .
```

Example `requirements.txt`:

```txt title="requirements.txt"
meshtrade-api>=0.0.8
grpcio>=1.60.0
protobuf>=4.25.0
```

### TypeScript SDK

```bash
# Install via yarn (recommended)
yarn add @meshtrade/api

# Install via npm
npm install @meshtrade/api

# Install via pnpm
pnpm add @meshtrade/api
```

Example `package.json`:

```json title="package.json"
{
  "dependencies": {
    "@meshtrade/api": "^0.0.8",
    "@grpc/grpc-js": "^1.9.0",
    "@grpc/proto-loader": "^0.7.0"
  }
}
```

## Development Setup

### Local Development

For local development, you'll need to configure your environment:

```bash
# Set API endpoint (optional - defaults to production)
export MESH_API_ENDPOINT=https://api.mesh.dev

# Set API key (required)
export MESH_API_KEY=your-api-key-here
```

### Docker Development

Use our official Docker images for consistent development:

```dockerfile title="Dockerfile"
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Install Mesh API SDK
RUN yarn add @meshtrade/api

CMD ["yarn", "start"]
```

## Verification

Verify your installation with a simple test:

### Go

```go title="test.go"
package main

import (
    "context"
    "fmt"
    "log"

    "github.com/meshtrade/api/go/wallet/account/v1"
)

func main() {
    ctx := context.Background()

    // This will fail without proper credentials, but tests the import
    client, err := account.NewClient(ctx, "test-key")
    if err != nil {
        log.Printf("Expected error (no valid credentials): %v", err)
        return
    }

    fmt.Println("SDK imported successfully!")
}
```

### Python

```python title="test.py"
try:
    from meshtrade.wallet.account.v1 import AccountServiceClient
    print("✅ Python SDK imported successfully!")
except ImportError as e:
    print(f"❌ Import error: {e}")
```

### TypeScript

```typescript title="test.ts"
try {
  const { AccountServiceClient } = require('@meshtrade/api/wallet/account/v1');
  console.log('✅ TypeScript SDK imported successfully!');
} catch (error) {
  console.error('❌ Import error:', error);
}
```

## Common Issues

### Go Module Issues

If you encounter Go module resolution issues:

```bash
# Clear module cache
go clean -modcache

# Reinitialize modules
go mod tidy
go mod download
```

### Python Import Issues

For Python import problems:

```bash
# Upgrade pip
pip install --upgrade pip

# Clear pip cache
pip cache purge

# Reinstall package
pip uninstall meshtrade-api
pip install meshtrade-api
```

### Node.js Version Issues

Ensure you're using a compatible Node.js version:

```bash
# Check Node.js version
node --version

# Use nvm to switch versions
nvm use 18
nvm install 18
```

## Next Steps

- 🔐 **[Authentication](./authentication)** - Set up API authentication
- 🚀 **[First Request](./first-request)** - Make your first API call
- 📖 **[API Reference](../api/overview)** - Explore available endpoints