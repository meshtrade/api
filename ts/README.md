# TypeScript Mesh API Integration SDKs

This repository contains the TypeScript SDKs for interacting with the various Mesh API services. The services are organized by `module/product/version`.

## Installation

To use the SDK, you can install it from npm:

```bash
npm install @meshtrade/api
```

## Usage

To use a specific API client, you import it from its corresponding package path. For example, to use the `iam/group/v1` client:

```typescript
import { GroupGrpcWebClientV1 } from "@meshtrade/api/iam/group/v1";
import { GetRequest } from "@meshtrade/api/iam/group/v1";

// Construct the client, optionally providing the API server URL
const groupClient = new GroupGrpcWebClientV1({
  apiServerURL: "http://localhost:10000",
});

// Create a request
const request = new GetRequest();
// Set request parameters if needed

// Call the service method
async function getGroup() {
  try {
    const response = await groupClient.get(request);
    console.log("Got group:", response.getGroup()?.toObject());
  } catch (error) {
    console.error("Error getting group:", error);
  }
}

getGroup();
```

## API Products

The following table lists the available API products and their current status.

| Module | Product | Version | Status |
| :--- | :--- | :--- | :--- |
| compliance | client | v1 | 🚧 Under Construction |
| iam | group | v1 | 🚧 Under Construction |
| iam | role | v1 | 🚧 Under Construction |
| issuance_hub | instrument | v1 | 🚧 Under Construction |
| ledger | transaction | v1 | 🚧 Under Construction |
| trading | direct_order | v1 | 🚧 Under Construction |
| trading | limit_order | v1 | 🚧 Under Construction |
| trading | spot | v1 | 🚧 Under Construction |
| wallet | account | v1 | 🚧 Under Construction |
| type | - | v1 | 🚧 Under Construction |
| option | - | v1 | 🚧 Under Construction |

**Status Key:**
*   🚧 **Under Construction**: The API is currently under development and may change.