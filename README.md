# Mesh API Monorepo

Welcome to the official source repository for Mesh's Protobuf API definitions and their corresponding generated client libraries for Go, Python, and TypeScript. This monorepo is the single source of truth for how our services communicate.

This document provides a high-level overview of the repository's structure, philosophy, and development workflow. For language-specific details, please see the README in the corresponding directory:

* **[Proto Client README](./proto/README.md)**
* **[Go Client README](./go/README.md)**
* **[Python Client README](./python/README.md)**
* **[TypeScript Client README](./ts/README.md)**

The repository is managed using the [Buf](https://buf.build) toolchain to enforce a consistent style, prevent breaking changes, and automate code generation.

## Core Philosophy

* **Schema-First Design**: The Protobuf definitions in the `/proto` directory are the source of truth. All code is generated from them.
* **Clear Separation**: A strict separation is maintained between the API definitions (`/proto`) and the language-specific generated code (`/go`, `/python`, `/ts`).
* **Independent Modules**: Each API product and shared type collection is treated as a distinct, versionable module. This allows consumers to import only the code they need for their specific language.
* **Backward Compatibility**: We enforce backward compatibility using `buf`. A `v1` API is a stable contract. Breaking changes require a new version.

## Repository Structure

The following diagram illustrates the relationship between our source Protobuf files and the generated client libraries for each language:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'background': '#ffffff' }}}%%
graph TD
%% Main direction is Top Down for better vertical layout

    subgraph proto ["/proto (Source of Truth)"]
        direction TB
        subgraph p_iam ["iam/v1"]
            p_iam_files("*.proto")
        end
        subgraph p_instrument ["instrument/v1"]
            p_instrument_files("*.proto")
        end
        subgraph p_type ["type/v1"]
            p_type_files("*.proto")
        end
    end

    subgraph generated_code ["Generated Client Libraries"]
        direction LR %% Arrange language blocks side-by-side
        
        subgraph go ["/go"]
            direction TB
            go_workspace("go.work")
            subgraph go_iam ["iam/v1"]
                go_iam_files("*.pb.go")
            end
            subgraph go_instrument ["instrument/v1"]
                go_instrument_files("*.pb.go")
            end
            subgraph go_type ["type/v1"]
                go_type_files("*.pb.go")
            end
        end

        subgraph python ["/python"]
            direction TB
            py_mod("pyproject.toml")
            subgraph py_iam ["iam/v1"]
                py_iam_files("*_pb2.py")
            end
            subgraph py_instrument ["instrument/v1"]
                py_instrument_files("*_pb2.py")
            end
            subgraph py_type ["type/v1"]
                py_type_files("*_pb2.py")
            end
        end

        subgraph ts ["/ts"]
            direction TB
            ts_mod("package.json")
            subgraph ts_iam ["iam/v1"]
                ts_iam_files("*.ts")
            end
            subgraph ts_instrument ["instrument/v1"]
                ts_instrument_files("*.ts")
            end
            subgraph ts_type ["type/v1"]
                ts_type_files("*.ts")
            end
        end
    end

    proto -- "buf generate" --> generated_code


    %% Styling for Light Mode with Black Text/Lines
    classDef default stroke:#000,color:#000;
    
    style proto fill:#f8f9fa,stroke:#000
    style generated_code fill:#f8f9fa,stroke:#000

    %% API Product Modules
    style p_iam fill:#e9f2fa,stroke:#000
    style p_instrument fill:#e9f2fa,stroke:#000
    style go_iam fill:#e9f2fa,stroke:#000
    style go_instrument fill:#e9f2fa,stroke:#000
    style py_iam fill:#e9f2fa,stroke:#000
    style py_instrument fill:#e9f2fa,stroke:#000
    style ts_iam fill:#e9f2fa,stroke:#000
    style ts_instrument fill:#e9f2fa,stroke:#000

    %% Shared Type Modules
    style p_type fill:#e7f5e8,stroke:#000
    style go_type fill:#e7f5e8,stroke:#000
    style py_type fill:#e7f5e8,stroke:#000
    style ts_type fill:#e7f5e8,stroke:#000

    %% Language-specific containers
    style go fill:#fdf1e8,stroke:#000
    style python fill:#fff9e6,stroke:#000
    style ts fill:#e8f3ff,stroke:#000
```

### Directory Breakdown

#### `/proto` (The Source of Truth)

This directory contains all our master Protobuf definitions. It is divided into two conceptual categories:

* **API Products** (`iam`, `instrument`, `legal`, etc.): These are self-contained functional domains that represent a capability of our system. They often contain `service` definitions.
* **Shared Types** (`type`): These are the foundational "bricks"—reusable messages like `Amount` or `Decimal`—that are used across multiple API products. They never contain `service` definitions.

#### Generated Code Directories (`/go`, `/python`, `/ts`)

These directories contain the generated client libraries, each tailored to the conventions of its language ecosystem. For detailed usage, local development, and testing instructions, see the README inside each directory.

* **/go**: Contains Go modules structured as a **Go workspace**. See the **[Go README](./go/README.md)** for more information.
* **/python**: Contains Python packages managed by a central `pyproject.toml`. See the **[Python README](./python/README.md)** for more information.
* **/ts**: Contains TypeScript/JavaScript packages managed as a monorepo. See the **[TypeScript README](./ts/README.md)** for more information.

---

## Consumer Guides

To use our API clients, you do not need to clone this repository. You can install them directly from their respective package managers.

### Go

For example, to get the `iam/v1` client:

```sh
go get [github.com/meshtrade/api/go/iam/v1@latest](https://github.com/meshtrade/api/go/iam/v1@latest)
```

Then, import it:

```go
import "[github.com/meshtrade/api/go/iam/v1](https://github.com/meshtrade/api/go/iam/v1)"
```

### Python

To install the `iam` client package:

```sh
pip install meshtrade-api-iam
```

Then, import it:

```python
from meshtrade.api.iam.v1 import role_pb2
```

### TypeScript

To install the `iam` client package:

```sh
npm install @meshtrade/api-iam-v1
```

Then, import it:

```typescript
import { Role } from '@meshtrade/api-iam-v1';
```

*(Note: Exact package names for Python and TS may vary based on final configuration).*

## Developer Workflow

1.  **Modify Protobuf**: Make your desired changes to the files within the `/proto` directory.
2.  **Lint & Check**: From the repository root, run `buf lint` and `buf breaking` to ensure your changes are valid and don't break compatibility.

    ```sh
    # Lint your changes
    buf lint
    
    # Check for breaking changes against the main branch
    buf breaking --against .git#branch=main
    ```

3.  **Generate Code**: Once validation passes, run `buf generate` to update the corresponding client libraries in the `/go`, `/python`, and `/ts` directories.

    ```sh
    buf generate
    ```

4.  **Commit**: Commit the changes to both the `/proto` files and the newly generated code in the same commit.