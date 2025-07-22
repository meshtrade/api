# Meshtrade API Documentation Site Structure Plan

## Current State Analysis
The existing docs site has:
- ✅ **Introduction**: Comprehensive getting started guide with multi-language examples
- ✅ **Service Structure**: Excellent resource-oriented design documentation (~241 lines)
- ✅ **Group Ownership**: Comprehensive multi-tenancy guide (~347 lines)
- ✅ **Schema-Driven Authorization**: Detailed RBAC documentation (~174 lines)
- ❌ **API Reference**: Placeholder - needs full domain/service documentation
- ✅ **Roadmap**: Exists but needs expansion

## Proposed Documentation Structure

```
📖 Meshtrade API Documentation
├── 📄 Introduction
|   ├── Quickstart
│   │   ├── Get API Credentials
│   │   ├── Installation (Go, Python)
│   │   └── First API Request (tabbed examples: Go, Python)
│   └── Next Steps
│       ├── Learn: go through architecture overview to get knowledge that you need to understand the api
│       └── Use: go to API reference to get detailed docs of how to leverage each api in each supported language
|
├── 📄 Architecture Overview
│   ├── Service Structure
│   │   ├── Resource-Oriented Services
│   │   ├── Standard Verbs (Create, Get, List, Search)
│   │   └── Custom Verbs (Activate, Mint, Burn, etc.)
│   ├── Group Ownership & Multi-Tenancy
│   │   ├── Owner vs Owners Fields
│   │   ├── Group Hierarchy
│   │   └── Resource Access Rules
│   └── Role-Based Access Control
│       ├── Domain Roles (ROLE_{DOMAIN}_{ADMIN|VIEWER})
│       ├── API User Role Assignment
│       ├── Read Permissions (owner + owners hierarchy)
│       └── Write Permissions (direct owner only)
│
├── 📁 API Reference
│   ├── 📄 API Overview
│   │   ├── Domain Organization
│   │   ├── Reference to relevant knowledge: Architecture Overview
│   │   └── Domain/Service Table: which services & versions in which languages are ready
│   │
│   ├── 📁 IAM Domain
│   │   ├── 📄 API User Service (v1)
│   │   │   ├── GetApiUser
│   │   │   │   ├── 🔗 Go Example
│   │   │   │   └── 🔗 Python Example  
│   │   │   ├── CreateApiUser
│   │   │   │   ├── 🔗 Go Example
│   │   │   │   └── 🔗 Python Example
│   │   │   ├── ListApiUsers
│   │   │   │   ├── 🔗 Go Example
│   │   │   │   └── 🔗 Python Example
│   │   │   ├── SearchApiUsers
│   │   │   │   ├── 🔗 Go Example
│   │   │   │   └── 🔗 Python Example
│   │   │   ├── ActivateApiUser
│   │   │   │   ├── 🔗 Go Example
│   │   │   │   └── 🔗 Python Example
│   │   │   └── DeactivateApiUser
│   │   │       ├── 🔗 Go Example
│   │   │       └── 🔗 Python Example
│   │   ├── 📄 Group Service (v1) 
│   │   └── 📄 Role Service (v1)
│   │
│   ├── 📁 Trading Domain
│   │   ├── 📄 Direct Order Service (v1)
│   │   ├── 📄 Limit Order Service (v1)  
│   │   └── 📄 Spot Service (v1)
│   │
│   ├── 📁 Compliance Domain
│   │   ├── 📄 Client Service (v1)
│   │   └── 📄 KYC Service (v1)
│   │
│   ├── 📁 Wallet Domain  
│   │   └── 📄 Account Service (v1)
│   │
│   ├── 📁 Issuance Hub Domain
│   │   └── 📄 Instrument Service (v1)
│   │
│   └── 📁 Shared Types
│       ├── 📄 Common Types (Amount, Decimal, Token)
│       ├── 📄 Ledger Types
│       └── 📄 Time & Pagination Types
│
└── 📄 Roadmap
    ├── Upcoming Features
    ├── API Versioning Plans
    └── SDK Enhancements
```

## Implementation Strategy

### Phase 1: Content Restructuring
1. **Keep existing high-quality guides** - they are comprehensive and well-written
2. **Flatten guide structure** - move from `/guides/` subfolder to top-level architecture section
3. **Enhance API Reference placeholder** with domain-organized structure

### Phase 2: API Documentation Generation  
1. **Domain-by-domain approach** - organize by business domains (IAM, Trading, etc.)
2. **Method-level examples** - every API method gets Go and Python examples
3. **Tabbed code examples** - consistent UX across all API methods
4. **Generated + hand-written hybrid** - protobuf generates base docs, hand-written examples

### Phase 3: Enhanced User Experience
1. **Quick navigation** - clear domain/service hierarchy
2. **Code-first examples** - practical examples for every endpoint  
3. **Cross-references** - link related concepts (roles, groups, permissions)
4. **Search optimization** - ensure all content is searchable

## Key Improvements Over Current Plan

1. **Visual hierarchy**: Clear tree structure shows relationships and nesting
2. **Domain organization**: Groups related services together logically
3. **Consistent example pattern**: Every API method gets Go + Python examples
4. **Preserved quality content**: Builds on existing excellent guides
5. **Scalable structure**: Easy to add new domains/services as they're developed
6. **User-focused navigation**: Logical flow from concepts to practical examples

## Content Creation Priority

1. ✅ **High Priority**: API User Service (already has working examples)
2. 🔄 **Medium Priority**: Core trading services (Direct Order, Spot)
3. 📋 **Lower Priority**: Specialized services (KYC, Instrument)
4. 📋 **Future**: Additional domains as they mature