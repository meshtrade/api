---
sidebar_position: 2
---

# Go SDK

Go Mesh API Integration SDK

## Overview

The Go SDK provides type-safe access to Mesh APIs with full gRPC support and context-based cancellation.

## Status

🚧 **Under Development** - The Go SDK is currently in development and may be subject to change.

## Installation

```bash
go get github.com/meshtrade/api/go
```

## Quick Start

```go
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

## Features

- **Type Safety** - Generated from protobuf definitions
- **Context Support** - Built-in timeout and cancellation
- **gRPC Native** - Optimized for high-performance gRPC communication
- **Error Handling** - Standard Go error patterns

## For Developers

This SDK is automatically generated from protobuf definitions. For development and contribution guidelines, see the main repository documentation.
