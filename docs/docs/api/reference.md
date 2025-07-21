---
sidebar_position: 2
---

# API Reference

Complete Protocol Documentation for the Mesh API

:::note
This API reference is automatically generated from our protobuf definitions and updated during each build.
The content below is imported from the generated `api_doc.md` file.
:::

:::info
To view the latest API documentation, ensure you have run `scripts/generate.sh` to generate the latest protobuf documentation.
:::

:::warning
Generated API documentation will appear here after running `scripts/generate.sh` from the repository root.
:::

## Protobuf Style Guide

Our API definitions follow strict style guidelines to ensure consistency and maintainability.

### General Guidelines

- Use [buf style guide](https://buf.build/docs/best-practices/style-guide/) conventions
- Enforce linting with `buf lint`
- Follow semantic versioning for API versions

### Documentation Comments

For auto-generated documentation, follow these comment rules:

#### Use Block Comments
```protobuf
/*
   Block comment for this message.
*/ 
message Client {
  /*
    Block Comment for this field.
  */ 
  string name = 1;

  // ❌ Avoid inline comments for documentation
  string email = 2;
}
```

#### No Empty Lines in Comments
```protobuf
/*
   Line 1
   Line 2
   Line 3
*/ 
message Client {
  /*
   Line 1
   Line 2
   Line 3
  */ 
  string name = 1;

  /*
   ❌ Avoid empty lines in documentation comments
   
   Line 2
   
   Line 3
  */ 
  string email = 2;
}
```

## Development Commands

```bash
# Lint protobuf files
buf lint

# Generate documentation
buf generate
```

The API documentation above is generated using [buf.build/community/pseudomuto-doc](https://buf.build/community/pseudomuto-doc) and includes:

- Complete message definitions
- Service method signatures
- Field descriptions and validation rules
- Enum values and meanings
- Cross-references between types
