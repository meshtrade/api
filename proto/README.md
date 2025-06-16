# Protobuf Definitions for the Mesh API
STILL UNDER DEVELOPMENT

## Developer Guide
This guide is for developers contributing to the proto files under this directory.

### 1. Prerequisites
The [buf cli](https://buf.build/docs/cli/installation/) needs to be installed.
```
brew install buf
```

### 2. Style guide
General style guidelines are as specified in the [buf style guide](https://buf.build/docs/best-practices/style-guide/) and are enforced with
the buf cli linting tool.
```
# run from repository root
buf lint
```

#### 2.1. Additional Style Rules
The following style rules are to be followed in addition to the basic linting rules enforced by the buf cli tool.

#### 2.1.1 Comments
Comments should be specified with block/multi-line comments instead of inline in order to not break [the auto doc generation tool](https://buf.build/community/pseudomuto-doc).
```
/*
   Block comment for this message.
*/ <--- GOOD STYLE
message Client {
  /*
    Block Comment for this field.
  */ <--- GOOD STYLE
  string name = 1;

  // Inline comment for this field. <--- BAD STYLE
  string email = 2;
}
```
