# Go Examples for API User Service

This directory contains working Go examples for each API User Service method. Each example is in its own directory to avoid main function conflicts.

## Structure

Each directory contains a complete, runnable Go program:

- `activate-api-user/` - Example for activating an API user
- `client-setup/` - Basic client setup and configuration
- `create-api-user/` - Example for creating a new API user
- `deactivate-api-user/` - Example for deactivating an API user
- `get-api-user/` - Example for retrieving an API user
- `get-api-user-by-key-hash/` - Example for getting an API user by key hash
- `list-api-users/` - Example for listing API users
- `search-api-users/` - Example for searching API users

## Running Examples

To run any example:

```bash
cd <example-directory>
go run main.go
```

For example:
```bash
cd create-api-user
go run main.go
```

## Prerequisites

1. Set up your API credentials:
   ```bash
   export MESH_API_CREDENTIALS=/path/to/your/credentials.json
   ```

2. Install the Go SDK:
   ```bash
   go get github.com/meshtrade/api/go
   ```

## Client Setup

Most examples reference the `client-setup` example for detailed client configuration. See `client-setup/main.go` for comprehensive client setup options including authentication, timeouts, and TLS configuration.