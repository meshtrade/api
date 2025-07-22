---
sidebar_position: 3
---

# Group Ownership Structure

Understanding how groups provide ownership and isolation boundaries for your resources in the Mesh API.

## What are Groups?

Groups are the fundamental unit of organization and ownership in Mesh. Every resource (clients, accounts, orders, etc.) belongs to exactly one group, providing:

- **Multi-tenancy** - Logical separation between different organizations
- **Resource Isolation** - Resources in one group cannot access resources in another
- **Permission Boundaries** - Access control is enforced at the group level
- **Billing Isolation** - Usage and costs are tracked per group

## Group Hierarchy

Groups follow a simple, flat structure:

```
groups/{group_id}
├── clients/{client_id}
├── accounts/{account_id}  
├── orders/{order_id}
└── api_keys/{api_key_id}
```

### Resource Naming Convention

All resources use the group as their parent in their resource name:

```
groups/org-acme-corp/clients/client-john-doe
groups/org-acme-corp/accounts/acc-usd-primary
groups/org-acme-corp/orders/order-12345
```

This ensures:
- **Clear Ownership** - Every resource belongs to exactly one group
- **Global Uniqueness** - Resource names are unique across the entire system
- **Access Control** - Permissions can be granted per group

## Group Management

### Group Creation

Groups are created through the IAM Group Service:

```typescript
import { GroupServiceClient } from '@meshtrade/api/iam/group/v1';

const groupService = new GroupServiceClient(config);

const newGroup = await groupService.createGroup({
  groupId: 'org-acme-corp',
  group: {
    displayName: 'ACME Corporation',
    description: 'Main organization group for ACME Corp',
  }
});
```

### Group Properties

Each group has the following properties:

```protobuf
message Group {
  // System-generated resource name
  string name = 1; // "groups/{group_id}"
  
  // User-friendly display name
  string display_name = 2;
  
  // Optional description
  string description = 3;
  
  // System timestamps
  google.protobuf.Timestamp create_time = 4;
  google.protobuf.Timestamp update_time = 5;
}
```

## Resource Isolation

### Data Isolation

Resources within a group are completely isolated from other groups:

```typescript
// These resources are in different groups and cannot access each other
const clientA = "groups/company-a/clients/client-1";
const clientB = "groups/company-b/clients/client-1"; 

// ✅ company-a can access their client
const clientService = new ClientServiceClient(companyAApiKey);
await clientService.getClient({ name: clientA });

// ❌ company-a CANNOT access company-b's client
await clientService.getClient({ name: clientB }); // PERMISSION_DENIED
```

### API Key Scope

API keys are scoped to a specific group and can only access resources within that group:

```typescript
// API key belongs to groups/company-a
const apiKey = "mesh_key_company_a_xyz123";

// ✅ Can access company-a resources
await clientService.listClients({ 
  parent: "groups/company-a" 
});

// ❌ Cannot access company-b resources  
await clientService.listClients({ 
  parent: "groups/company-b" 
}); // PERMISSION_DENIED
```

## Multi-Tenant Use Cases

### Software Vendors

SaaS platforms can use groups to isolate customer data:

```typescript
// Each customer gets their own group
const customers = [
  { id: 'customer-acme', name: 'ACME Corp' },
  { id: 'customer-xyz', name: 'XYZ Industries' },
];

for (const customer of customers) {
  // Create isolated group for each customer
  await groupService.createGroup({
    groupId: customer.id,
    group: {
      displayName: customer.name,
      description: `Isolated environment for ${customer.name}`
    }
  });
  
  // Create API key for customer's group
  const apiKey = await apiKeyService.createApiKey({
    parent: `groups/${customer.id}`,
    apiKey: {
      displayName: `${customer.name} API Key`
    }
  });
}
```

### Enterprise Organizations

Large organizations can use groups for department or subsidiary isolation:

```typescript
const departments = [
  'groups/acme-trading-desk',
  'groups/acme-compliance', 
  'groups/acme-operations'
];

// Each department manages their own resources
await clientService.createClient({
  parent: 'groups/acme-trading-desk',
  client: { displayName: 'Trading Client 1' }
});

await clientService.createClient({
  parent: 'groups/acme-compliance',
  client: { displayName: 'Compliance Review Client' }
});
```

## Permission Model

### Group-Level Permissions

Permissions are granted at the group level:

```protobuf
// Example: Grant user access to a specific group
message RoleBinding {
  string user = 1;           // "users/john@acme.com"
  string group = 2;          // "groups/org-acme-corp" 
  repeated string roles = 3; // ["ClientAdmin", "AccountReader"]
}
```

### Cross-Group Access

By default, groups cannot access each other's resources. Special permissions can be granted for specific use cases:

```typescript
// ❌ By default, cross-group access is denied
const clientA = "groups/company-a/clients/client-1";
const orderService = new OrderServiceClient(companyBApiKey);

await orderService.createOrder({
  parent: "groups/company-b",
  order: {
    clientId: clientA // This will fail - cross-group reference
  }
}); // PERMISSION_DENIED

// ✅ Resources must be in the same group
await orderService.createOrder({
  parent: "groups/company-b", 
  order: {
    clientId: "groups/company-b/clients/client-1" // Same group - OK
  }
});
```

## Best Practices

### Group Design

#### ✅ Good Group Design

```typescript
// Logical business boundaries
const groups = [
  'groups/acme-corp',           // One organization
  'groups/xyz-industries',      // Another organization  
  'groups/abc-trading-llc'      // Third organization
];

// Clear naming convention
const departmentGroups = [
  'groups/acme-trading-desk',
  'groups/acme-compliance-team',
  'groups/acme-operations-center'
];
```

#### ❌ Poor Group Design

```typescript
// Don't create groups for every user
const badGroups = [
  'groups/user-john',
  'groups/user-jane',
  'groups/user-bob'
];

// Don't use random identifiers
const badNaming = [
  'groups/group-12345',
  'groups/g-xyz-987', 
  'groups/temp-group'
];
```

### Resource Organization

```typescript
// ✅ Good - All related resources in same group
const groupId = 'org-acme-corp';

// Create client
const client = await clientService.createClient({
  parent: `groups/${groupId}`,
  client: { displayName: 'ACME Trading Entity' }
});

// Create account for the same client
const account = await accountService.createAccount({
  parent: `groups/${groupId}`,
  account: {
    clientId: client.name, // Same group
    currency: 'USD'
  }
});

// Create order using the account
const order = await orderService.createOrder({
  parent: `groups/${groupId}`,
  order: {
    accountId: account.name, // Same group
    instrument: 'BTC/USD'
  }
});
```

### API Key Management

```typescript
// ✅ Good - One API key per group for service accounts
const tradingApiKey = await apiKeyService.createApiKey({
  parent: 'groups/acme-trading-desk',
  apiKey: {
    displayName: 'Trading System API Key',
    description: 'Used by automated trading system'
  }
});

// ✅ Good - Separate API keys for different purposes
const complianceApiKey = await apiKeyService.createApiKey({
  parent: 'groups/acme-compliance',
  apiKey: {
    displayName: 'Compliance Review API Key',
    description: 'Used by compliance team for client reviews'
  }
});
```

## Troubleshooting

### Common Permission Errors

#### PERMISSION_DENIED on Cross-Group Access
```typescript
// ❌ Error: Trying to access resource in different group
const error = {
  code: 'PERMISSION_DENIED',
  message: 'API key does not have access to groups/other-company'
};

// ✅ Solution: Ensure resources are in the same group as your API key
const correctRequest = await clientService.getClient({
  name: 'groups/your-company/clients/client-123' // Same group as API key
});
```

#### NOT_FOUND vs PERMISSION_DENIED
```typescript
// Different errors mean different things:

// Resource doesn't exist in your group
{ code: 'NOT_FOUND', message: 'Client not found' }

// Resource exists but in a different group you can't access  
{ code: 'PERMISSION_DENIED', message: 'Access denied to resource' }
```

## Next Steps

- **[Service Structure](./service-structure)** - Learn about API organization and patterns
- **[Schema-Driven Authorization](./schema-driven-authorization)** - Understand RBAC and permissions
- **[API Reference](../api/reference)** - Explore the Group Service API
