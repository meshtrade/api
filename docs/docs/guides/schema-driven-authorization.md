---
sidebar_position: 1
---

# Schema-Driven Authorization

## Overview

This document describes the authoritative pattern we use for defining and enforcing Role-Based Access Control (RBAC) within the Mesh API.

Our guiding principle is using the **Protobuf schema as the single source of truth** for all permissions and standard role definitions.

This approach ensures our authorization rules are self-documenting, automatically verifiable, and always in sync with the API contract itself.

## Core Concepts

Our authorization model is built on string-based permissions that are programmatically derived from the gRPC method path. This creates a highly consistent and predictable security model.

The system works by establishing a direct link between an RPC endpoint and the permission required to call it, using a clear, structured format.

The model is built on these components:

1.  **Permission Strings**: Permissions are strings that directly map to a service method. By convention, they are derived from the full gRPC method path (e.g., the path `/meshtrade.wallet.account.v1.Service/GetAccount` corresponds to the permission `meshtrade.wallet.account.v1.Service/GetAccount`).
2.  **`RoleDefinition` Messages**: A structure that defines a "Standard Role" (e.g., "AccountAdmin", "AccountReader") by grouping a set of these method-path permission strings.
3.  **Custom `MethodOptions`**: A special option we can attach to RPC methods to override the default behavior or assign roles.
    * `required_permissions`: Used to explicitly list required permission strings, overriding the default path-derived permission.
    * `required_roles`: Used to grant access based on a standard, high-level business role.

---

## How It Works

Our system achieves schema-driven authorization by following a clear, three-part pattern: defining the authorization model, decorating our services with explicit permissions, and enforcing these rules at runtime.

### 1. The Authorization Primitives Are Centrally Defined

The core options for decorating methods are defined in a central file.

**File Location:** `proto/meshtrade/auth/v1/authorization.proto`
```protobuf
// proto/meshtrade/auth/v1/authorization.proto
syntax = "proto3";

package meshtrade.auth.v1;

import "google/protobuf/descriptor.proto";

// A message to define the structure of a standard, hardcoded role.
// 'permissions' is a list of strings, where each string is a full gRPC method path.
message RoleDefinition {
  string name = 1;
  repeated string permissions = 2;
}

// --- Custom Options ---

// Option to explicitly list required permissions for a method.
extend google.protobuf.MethodOptions {
  repeated string required_permissions = 50001;
}

// Option to specify standard roles required for a method.
extend google.protobuf.MethodOptions {
  repeated string required_roles = 50002;
}

// File-level option to define a list of standard roles for a domain.
extend google.protobuf.FileOptions {
  repeated RoleDefinition standard_roles = 50003;
}
```

### 2. Standard Roles and Permissions Are Decorated in the Schema

Standard business roles are defined using a file-level option, grouping the full gRPC method paths as permission strings. This keeps the role definitions close to the service they govern.

When an RPC method is defined, it implicitly has a required permission corresponding to its full path. We can use our custom options to assign roles for simpler access control on sensitive methods.

**Example:** Here is how this pattern is applied within the Trading service.

**File Location:** `proto/meshtrade/trading/v1/service.proto`
```protobuf
// proto/meshtrade/trading/v1/service.proto
syntax = "proto3";

package meshtrade.trading.v1;

import "meshtrade/auth/v1/authorization.proto";

// --- Standard Role Definitions for the Trading Service ---
// Roles are defined locally, grouping permissions derived from full gRPC method paths.
option (meshtrade.auth.v1.standard_roles) = [
  {
    name: "TradingAdmin",
    permissions: [
      "meshtrade.trading.v1.TradingService/GetOrder",
      "meshtrade.trading.v1.TradingService/CreateOrder",
      "meshtrade.trading.v1.TradingService/DeleteOrder"
    ]
  },
  {
    name: "TradingAuditor",
    permissions: ["meshtrade.trading.v1.TradingService/GetOrder"]
  }
];

// ... message definitions ...

service TradingService {
  // Implicitly requires the "meshtrade.trading.v1.TradingService/GetOrder" permission.
  rpc GetOrder(GetOrderRequest) returns (GetOrderResponse) {}

  // Implicitly requires the "meshtrade.trading.v1.TradingService/CreateOrder" permission.
  rpc CreateOrder(CreateOrderRequest) returns (CreateOrderResponse) {}

  // This destructive action is restricted to a standard role for cleaner access control.
  rpc DeleteOrder(DeleteOrderRequest) returns (DeleteOrderResponse) {
    option (meshtrade.auth.v1.required_roles) = ["TradingAdmin"];
  }
}
```

### 3. Rules Are Enforced at Runtime

These schema definitions translate into permission control in our services. You will need to have been assigned a with the required permissions to call services.

## Benefits

### ✅ Single Source of Truth
- Authorization rules live alongside the API definition
- No separate configuration files to keep in sync
- Permissions automatically derive from method paths

### ✅ Self-Documenting
- Roles and permissions are visible in the schema
- Generated documentation includes security information
- Clear relationship between endpoints and required access

### ✅ Type Safety
- Compile-time validation of role and permission names
- IDEs can provide autocomplete for available roles
- Breaking changes to authorization are caught early

### ✅ Automated Tooling
- Code generation can create enforcement middleware
- Static analysis can verify permission coverage
- CI/CD can validate authorization completeness

## Best Practices

### 1. Use Descriptive Role Names
```protobuf
// ✅ Good - Clear business intent
option (standard_roles) = [
  { name: "AccountReader", permissions: [...] },
  { name: "AccountAdmin", permissions: [...] }
];

// ❌ Bad - Generic names
option (standard_roles) = [
  { name: "Role1", permissions: [...] },
  { name: "SuperUser", permissions: [...] }
];
```

### 2. Group Related Permissions
```protobuf
// ✅ Good - Logical grouping
{
  name: "TradingOperator",
  permissions: [
    "meshtrade.trading.v1.TradingService/GetOrder",
    "meshtrade.trading.v1.TradingService/CreateOrder",
    "meshtrade.trading.v1.TradingService/UpdateOrder"
  ]
}
```

### 3. Use Roles for High-Level Access
```protobuf
// ✅ Good - Use roles for business functions
rpc DeleteOrder(DeleteOrderRequest) returns (DeleteOrderResponse) {
  option (required_roles) = ["TradingAdmin"];
}

// ✅ Also good - Use permissions for granular control
rpc GetOrderHistory(GetOrderHistoryRequest) returns (GetOrderHistoryResponse) {
  option (required_permissions) = ["custom.permission.name"];
}
```

### 4. Document Role Hierarchies
```protobuf
// Standard roles with clear hierarchy
option (standard_roles) = [
  // Read-only access
  { name: "TradingViewer", permissions: ["...GetOrder"] },
  
  // Operator can view and create
  { name: "TradingOperator", permissions: ["...GetOrder", "...CreateOrder"] },
  
  // Admin has full control
  { name: "TradingAdmin", permissions: ["...GetOrder", "...CreateOrder", "...DeleteOrder"] }
];
```

## Migration Guide

If you're moving from external authorization systems to schema-driven authorization:

1. **Audit existing permissions** - List all current roles and permissions
2. **Map to gRPC methods** - Create mapping from permissions to method paths
3. **Define standard roles** - Group related permissions into business roles
4. **Add schema annotations** - Decorate your proto files with the new options
5. **Update enforcement code** - Modify middleware to use schema-defined rules
6. **Validate coverage** - Ensure all methods have appropriate authorization

## Related Documentation

- **[API Reference](../api/reference)** - Complete API endpoint documentation
- **[Service Structure](./service-structure)** - Understanding API organization
- **[Group Ownership](./group-ownership)** - Multi-tenancy and resource isolation
