---
sidebar_position: 2
---

# Service Structure

Understanding how Mesh APIs are organized and the common patterns used across all services.

## Resource-Oriented Design

Mesh APIs follow a resource-oriented design pattern where each service manages a specific type of resource (like accounts, clients, or orders) and exposes a consistent set of operations.

### Standard Resource Operations

Every resource service provides these standard operations:

```protobuf
service ExampleService {
  // Create a new resource
  rpc CreateExample(CreateExampleRequest) returns (CreateExampleResponse);
  
  // Get a single resource by ID
  rpc GetExample(GetExampleRequest) returns (GetExampleResponse);
  
  // List multiple resources with optional filtering
  rpc ListExamples(ListExamplesRequest) returns (ListExamplesResponse);
  
  // Update an existing resource
  rpc UpdateExample(UpdateExampleRequest) returns (UpdateExampleResponse);
  
  // Delete a resource
  rpc DeleteExample(DeleteExampleRequest) returns (DeleteExampleResponse);
}
```

### Resource Names

All resources use hierarchical naming that establishes clear ownership and scope:

```
groups/{group_id}/clients/{client_id}
groups/{group_id}/accounts/{account_id}
groups/{group_id}/orders/{order_id}
```

This pattern ensures:
- **Clear Ownership**: Every resource belongs to a group
- **Unique Identification**: Resource names are globally unique
- **Hierarchical Organization**: Resources are logically organized

## Service Categories

Mesh APIs are organized into logical service categories:

### 🏢 **Compliance Services**
Handle regulatory requirements and client onboarding:
- **Client Service** - KYC/KYB client management
- **Verification Service** - Document and identity verification
- **Risk Assessment Service** - AML and risk scoring

### 💰 **Trading Services**  
Manage trading operations and order execution:
- **Direct Order Service** - Immediate execution orders
- **Limit Order Service** - Conditional execution orders
- **Spot Service** - Current market pricing

### 💳 **Wallet Services**
Handle account and balance management:
- **Account Service** - Account creation and management
- **Balance Service** - Real-time balance tracking
- **Transaction Service** - Transaction history and details

### 🔐 **Identity & Access Management**
Control authentication and authorization:
- **Group Service** - Organization and tenant management
- **Role Service** - Permission and role definitions
- **API Key Service** - Authentication credential management

### 🏦 **Issuance Services**
Manage financial instruments and tokenization:
- **Instrument Service** - Financial instrument definitions
- **Issuance Service** - Token minting and burning
- **Registry Service** - Instrument registration and metadata

## Common Patterns

### Request/Response Structure

All service methods follow consistent request/response patterns:

```protobuf
// Get requests include the resource name
message GetClientRequest {
  string name = 1; // "groups/{group_id}/clients/{client_id}"
}

// List requests support pagination and filtering
message ListClientsRequest {
  string parent = 1;     // "groups/{group_id}"
  int32 page_size = 2;   // Maximum results per page
  string page_token = 3; // Token for pagination
  string filter = 4;     // Optional filtering criteria
}

// Create requests include the resource and parent
message CreateClientRequest {
  string parent = 1; // "groups/{group_id}"
  Client client = 2; // The resource to create
}
```

### Error Handling

All services use standard gRPC status codes:

- `NOT_FOUND` - Resource doesn't exist
- `ALREADY_EXISTS` - Resource already exists (for creates)
- `PERMISSION_DENIED` - Insufficient permissions
- `INVALID_ARGUMENT` - Invalid request parameters
- `FAILED_PRECONDITION` - Operation not allowed in current state

### Field Behavior

Fields follow consistent behavior patterns:

```protobuf
message Client {
  // System-controlled fields (read-only)
  string name = 1;                    // Set by system
  google.protobuf.Timestamp create_time = 2;  // Set by system
  google.protobuf.Timestamp update_time = 3;  // Set by system
  
  // User-controlled fields
  string display_name = 4;            // User can set/update
  NaturalPerson natural_person = 5;   // User data
}
```

## Versioning Strategy

### API Versions

Services use semantic versioning in their package paths:

```
meshtrade.compliance.client.v1    // Stable v1 API
meshtrade.compliance.client.v2    // Future v2 API (if needed)
```

### Backward Compatibility

- **v1 APIs are stable** - No breaking changes will be made
- **Additive changes only** - New fields and methods can be added
- **Deprecation process** - Features marked deprecated before removal
- **Migration support** - Clear upgrade paths for new versions

## Service Discovery

Services are organized in a predictable directory structure:

```
proto/meshtrade/
├── compliance/
│   ├── client/v1/
│   └── verification/v1/
├── trading/
│   ├── direct_order/v1/
│   ├── limit_order/v1/
│   └── spot/v1/
├── wallet/
│   └── account/v1/
├── iam/
│   ├── group/v1/
│   └── role/v1/
└── type/v1/          # Shared types used across services
```

## Best Practices

### Client Implementation

When implementing clients, follow these patterns:

```typescript
// ✅ Good - Use resource names for operations
const client = await clientService.getClient({
  name: "groups/group123/clients/client456"
});

// ✅ Good - Handle standard errors
try {
  const client = await clientService.getClient({ name: clientName });
} catch (error) {
  if (error.code === 'NOT_FOUND') {
    // Handle missing client
  } else if (error.code === 'PERMISSION_DENIED') {
    // Handle access denied
  }
}

// ✅ Good - Use pagination for lists
let pageToken = '';
do {
  const response = await clientService.listClients({
    parent: "groups/group123",
    pageSize: 50,
    pageToken: pageToken
  });
  
  // Process clients
  for (const client of response.clients) {
    console.log(client.displayName);
  }
  
  pageToken = response.nextPageToken;
} while (pageToken);
```

### Resource Management

```typescript
// ✅ Good - Use consistent naming
const clientName = `groups/${groupId}/clients/${clientId}`;
const accountName = `groups/${groupId}/accounts/${accountId}`;

// ✅ Good - Create resources with proper parents
const newClient = await clientService.createClient({
  parent: `groups/${groupId}`,
  client: {
    displayName: "ACME Corp",
    // ... other client data
  }
});
```

## Next Steps

- **[Group Ownership](./group-ownership)** - Learn about multi-tenancy and resource isolation
- **[Schema-Driven Authorization](./schema-driven-authorization)** - Understand permissions and RBAC
- **[API Reference](../api/reference)** - Explore specific service definitions
