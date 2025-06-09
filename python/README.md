# Python SDKs for Mesh APIs

[![CI Status](https://img.shields.io/badge/ci-passing-brightgreen.svg)](https://github.com/meshtrade/api)

This directory is the Python workspace for all official Mesh API client SDKs. Each SDK is a separate, installable package designed to integrate with a specific Mesh API service.

## Published Packages

| Package Name | PyPI Link | Description |
| :--- | :--- | :--- |
| `mesh-account-v1` | [pypi.org/project/mesh-account-v1](https://pypi.org/project/mesh-account-v1/) | Integration SDK for the v1 Account Service |
| `mesh-iam-v1` | [pypi.org/project/mesh-iam-v1](https://pypi.org/project/mesh-iam-v1/) | Integration SDK for the v1 IAM Service |

## Quick Start for API Consumers

This guide is for developers who want to **use** these SDKs in their own applications.

### 1. Installation

Install the desired SDK integration library from PyPI using pip:

```bash
pip install mesh-iam-v1
pip install mesh-account-v1
```

### 2. Example Usage
Here is a basic example of how to use SDK clients:
```python
import asyncio
from mesh_account_v1 import AccountService
from mesh_iam_v1 import as IAMService

# NOTE: ensure that MESH_API_KEY="your-secret-api-key" is set

async def main():
    # Instantiate the client for the Account v1 service
    account_client = AccountService()

    # Call an RPC method
    try:
        response = await account_client.get(number="1000111")
        print("Successfully retrieved account:", response.account)
    except Exception as e:
        print(f"An error occurred: {e}")
    
    # You can similarly use other clients
    iam_client = IAMService()
    # ... use iam_client ...

if __name__ == "__main__":
    asyncio.run(main())
```

For more detailed information on each SDK, please see their individual READMEs:
* **[Account v1](python/lib/account/v1/README.md)**
* **[IAM v1](python/lib/iam/v1/README.md)**

# Developer Guide
This guide is for developers who want to contribute to these SDKs. It explains how to set up the local development environment for this Python monorepo.

### Prerequisites:
- Python 3.8+
- The `venv` module (usually included with Python)

## 1. Environment Setup
All commands should be run from within this `python/` directory.

Create and activate a single shared virtual environment for the workspace:
```
# Make sure you are in the `python/` directory
python3 -m venv .venv
source .venv/bin/activate
```
Your terminal prompt should now be prefixed with (.venv), indicating the environment is active.

## 2. Install All Dependencies
Our workspace is managed by the top-level pyproject.toml file. To install all local packages in editable mode along with all development tools (ruff, pytest, tox, etc.), run the following command:
```
# The quotes are important to prevent some shell errors (e.g., in zsh)
pip install -e '.[dev]'
```
This single command fully prepares your development environment.

## 3. Run Common Development Tasks
Tox is used as the as the main command runner for all common tasks like linting, testing, and building.
Tasks can be run from the command line (within the active virtual environment) as follows:


- To run the linter:
```
tox -e lint
```
- To run the unit tests:
```
tox -e unit-tests
```
- To run the integration tests:
```
MESH_API_KEY="your-secret-api-key" tox -e integration-tests
```
- To run all checks (linting and unit tests):
```
tox
```

## 4. Building and Publishing Packages
- *Build all packages:* The build task in tox will create the distributable wheel (.whl) and sdist (.tar.gz) files for all packages and place them in their respective dist/ folders.
```
tox -e build
```

- *Publish to PyPi:* The `twine` tool is used to securely upload the built packages to PyPI. This is done as part of the official release process.
```
twine upload lib/*/v*/dist/*
```

# Repository Structure
This directory is a workspace within a larger polyglot monorepo. It manages versioned Python packages for each integration SDK.

```
└── python
    ├── README.md       <-- You are HERE
    ├── pyproject.toml  <-- Workspace development configuration
    ├── tox.ini         <-- Task automation configuration
    ├── lib
    │   ├── __init__.py
    │   └── account
    │       ├── __init__.py
    │       └── vX
    │           ├── README.md
    │           ├── __init__.py
    │           ├── pyproject.toml     <-- Defines the 'mesh-account-vX' package
    │           └── vX_pb.py
    └── tests
        ├── integration
        └── unit
```