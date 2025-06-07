# Mesh API Monorepo

Welcome to the Mesh API monorepo - the central hub containing our API definitions and integration SDKs.

Our APIs are exposed over [gRPC](https://grpc.io/). To facilitate seamless integration we provide [API integration SDKs](#api-integration-sdks) in a number of languages that can be used to integrate with them.

The following sections cover:
1.  [API Integration SDKs](#api-integration-sdks) - *API integration SDKs in our supported languages.*
2.  [API Philosophy](#api-philosophy) - *A description of the principles behind our API design.*
3.  [Repository Structure](#repository-structure) - *An overview of this repositorys structure.*

## API Integration SDKs
Integration SDKs for our API services are available in the following languages:

* **[Go](./go/README.md)**
* **[Python](./python/README.md)**
* **[TypeScript](./ts/README.md)**

If an SDK in another language is required the protobuf API definitions in the [proto](./proto) directory of this repository can be used to generate a new integration library using a protobuf compiler with the appropriate plug-ins. (We use [buf](https://github.com/bufbuild/buf)).

## API Philosophy
* **Schema-First Design**: The [protobuf](https://github.com/protocolbuffers/protobuf) definitions in the [proto](./proto) directory are the source of truth describing our API. The types and gRPC clients in our [integration SDKs](#client-libraries-for-api-access) are generated directly from these definitions.
* **Resource-Oriented Design**: Our APIs are designed around _resource services_ - each providing methods from the following stanard verb list: Create, Get, List, Update, Delete. Services may also provide custom methods when appropriate. A full verb list with documentation can be found alongside the associated API in the proto directory.
* **Backward Compatibility**: We are committed to API stability. Following semantic versioning principles, a `v1` API is a stable contract; any breaking changes will necessitate a new major version (e.g., `v2`). These will be published in the form of another version DIRECTORY in `/proto/service/vX`.
* **Independent Modules**: Each API service and shared type collection is treated as a distinct, versionable module. This allows consumers to import only the code they need for their specific language.

## Repository Structure

The following diagram illustrates the relationship between our source protobuf files and the generated client libraries for each language:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'background': '#ffffff' }}}%%
graph TD
%% Main direction is Top Down for better vertical layout

    subgraph proto ["/proto"]
        direction TB
        subgraph p_api_services ["API Services"]
             direction TB
            subgraph p_account ["/proto/account/v1"]
                p_account_files("*.proto")
            end
             subgraph p_iam ["/proto/iam/v1"]
                p_iam_files("*.proto")
            end
            subgraph p_auth ["/proto/auth/v1"]
                p_auth_files("*.proto")
            end
        end
        subgraph p_type ["/proto/type/v1"]
            p_type_files("*.proto")
        end
    end

    subgraph generated_code ["Generated Client Libraries"]
        direction LR
        subgraph ts ["/ts"]
            direction TB
            subgraph ts_api_services ["API Services"]
                direction TB
                subgraph ts_account ["ts/account/v1"]
                    ts_account_files("*.pb.ts")
                end
                subgraph ts_iam ["ts/iam/v1"]
                    ts_iam_files("*.pb.ts")
                end
                subgraph ts_auth ["ts/auth/v1"]
                    ts_auth_files("*.pb.ts")
                end
            end
            subgraph ts_type ["ts/type/v1"]
                ts_type_files("*.pb.ts")
            end
        end
        subgraph go ["/go"]
            direction TB
            subgraph go_api_services ["API Services"]
                direction TB
                subgraph go_account ["go/account/v1"]
                    go_account_files("*.pb.go")
                end
                subgraph go_iam ["go/iam/v1"]
                    go_iam_files("*.pb.go")
                end
                subgraph go_auth ["go/auth/v1"]
                    go_auth_files("*.pb.go")
                end
            end
            subgraph go_type ["go/type/v1"]
                go_type_files("*.pb.go")
            end
        end
        subgraph python ["/python"]
            direction TB
            subgraph python_api_services ["API Services"]
                direction TB
                subgraph python_account ["python/account/v1"]
                    python_account_files("*.pb.py")
                end
                subgraph python_iam ["python/iam/v1"]
                    python_iam_files("*.pbpy")
                end
                subgraph python_auth ["python/auth/v1"]
                    python_auth_files("*.pb.py")
                end
            end
            subgraph python_type ["python/type/v1"]
                python_type_files("*.pb.py")
            end
        end
    end

    proto -- "buf generate" --> generated_code


    %% Styling for Light Mode with Black Text/Lines
    classDef default stroke:#000,color:#000;
    
    style proto fill:#f8f9fa,stroke:#000
    style generated_code fill:#f8f9fa,stroke:#000

    %% API Service Modules
    style p_auth fill:#e9f2fa,stroke:#000
    style p_iam fill:#e9f2fa,stroke:#000
    style p_account fill:#e9f2fa,stroke:#000

    style go_auth fill:#e9f2fa,stroke:#000
    style go_iam fill:#e9f2fa,stroke:#000
    style go_account fill:#e9f2fa,stroke:#000

    style python_auth fill:#e9f2fa,stroke:#000
    style python_iam fill:#e9f2fa,stroke:#000
    style python_account fill:#e9f2fa,stroke:#000

    style ts_auth fill:#e9f2fa,stroke:#000
    style ts_iam fill:#e9f2fa,stroke:#000
    style ts_account fill:#e9f2fa,stroke:#000

    %% Shared Type Modules
    style p_type fill:#e7f5e8,stroke:#000
    style go_type fill:#e7f5e8,stroke:#000
    style python_type fill:#e7f5e8,stroke:#000
    style ts_type fill:#e7f5e8,stroke:#000

    %% Language-specific containers
    style go fill:#fdf1e8,stroke:#000
    style python fill:#fff9e6,stroke:#000
    style ts fill:#e8f3ff,stroke:#000

    %% Dotted line block for API Services
    style p_api_services fill:none,stroke:#000,stroke-width:2px,stroke-dasharray: 5 5
    style go_api_services fill:none,stroke:#000,stroke-width:2px,stroke-dasharray: 5 5
    style python_api_services fill:none,stroke:#000,stroke-width:2px,stroke-dasharray: 5 5
    style ts_api_services fill:none,stroke:#000,stroke-width:2px,stroke-dasharray: 5 5
```

### Directory Breakdown

#### `/proto`

This directory our [protobuf](https://github.com/protocolbuffers/protobuf) definitions. It is divided into two conceptual categories:

* **API Services** (`auth`, `iam`, `account`, etc.): These are the type and service definitions that describe our APIs. A combination of protobuf `service` and `message` definitions.
* **Shared Types** (`type`): These are the foundational "bricks"—reusable messages like `Amount` or `Decimal`—that are used across multiple API services. They never contain `service` definitions.

#### Generated Code Directories (`/go`, `/python`, `/ts`)

These directories contain the generated client libraries, each tailored to the conventions of its language ecosystem. For detailed usage, local development, and testing instructions, see the README inside each directory.

* **/go**: Contains Go modules structured as a **Go workspace**. See the **[Go README](./go/README.md)** for more information.
* **/python**: Contains Python packages managed by a central `pythonproject.toml`. See the **[Python README](./python/README.md)** for more information.
* **/ts**: Contains TypeScript/JavaScript packages managed as a monorepo. See the **[TypeScript README](./ts/README.md)** for more information.

---