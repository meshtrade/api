---
parent: API Integration SDKs
title: Python
layout: page
---
# Python SDKs for Mesh APIs

[![CI Status](https://img.shields.io/badge/ci-passing-brightgreen.svg)](https://github.com/meshtrade/api)

This directory is the Python Monorepo for all official Mesh API client SDKs.

## Quick Start for API Consumers

This guide is for developers who want to **use** these SDKs in their own applications.

### 1. Installation

Install the desired SDK integration library from PyPI using pip:

```bash
pip install meshtrade
```

### 2. Example Usage
Here is a basic example of how to use SDK clients:
```python
import asyncio
from meshtrade.account.v1 import AccountService
from meshtrade.iam.v1 import as IAMService

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
* **[Account v1](python/mesh/account/v1/README.md)**
* **[IAM v1](python/mesh/iam/v1/README.md)**

## Repository Structure
This directory is a workspace within a larger polyglot monorepo. It manages versioned Python packages for each integration SDK.

```
└── python
    ├── README.md               <-- You are HERE
    ├── pyproject.toml          <-- SDK workspace configuration
    ├── requirements-dev.txt    <-- SDK Workspace development requirements
    ├── tox.ini                 <-- Task automation configuration
    ├── src
    │   └── meshtrade
    │       ├── __init__.py
    │       └── account         <-- Defines the mesh account api service
    │           └── vX          <-- Defines the mesh account vX api SDK
    │               ├── __init__.py
    │               ├── account_pb2.py
    │               └── README.md
    └── tests
        ├── integration
        └── unit
```

## Developer Guide
This guide is for developers contributing to these SDKs. It explains how to set up the local development environment for this Python monorepo.

### 1. Prerequisites:
- Python 3.8+
- The `venv` module (usually included with Python)

### 2. Environment Setup
All commands should be run from within this `python/` directory.

Create and activate a single shared virtual environment for the workspace:
```
python3 -m venv .venv
source .venv/bin/activate
```
Your terminal prompt should now be prefixed with (.venv), indicating the environment is active.

<b>Tip:</b> If you are in an IDE that supports python you can point your IDE to the interpreter in this environment relative to the source of the repository: `./python/.venv/bin/python`. e.g. with VS code:

'cmd + shift + p' > 'Python: Select Interpreter' > 'Enter interpreter path...'  > './python/.venv/bin/python'



### 3. Install Dependencies

This project uses `pip-tools` to manage dependencies for a reproducible development environment.
The top-level `pyproject.toml` is the source of truth for our direct dependencies, and `requirements-dev.txt` is the "lock file" that guarantees identical setups for everyone.

**A) For a new setup (e.g. after a `git pull`):**

Install the locked dependencies from `requirements-dev.txt`:
```bash
pip install -r requirements-dev.txt
```
This synchronises the local virtual environment to match the exact versions in the lock file.

Once this is complete you are set up to begin programming in the sdk source code in: `./python/src/mesh`.

Next to make the SDK discoverable locally for tests do:
```
pip install -e .
```

**B) After a manual change to `pyproject.toml` (e.g. to install a new workspace level dependency or bump its version):**

If changes are made in the pyproject.toml then the lockfile must be regenerated:
```
# Step 1: Re-compile the dependencies to update the lock file
pip-compile --extra=dev --output-file=requirements-dev.txt pyproject.toml

# Step 2: Synchronise the local virtual environment again with the newly updated lock file
pip install -r requirements-dev.txt
```

### 4. Run Common Development Tasks
Tox is used as the as the main command runner for all common tasks like linting, testing, and building.

Tasks can be run from the command line (within the active virtual environment) as follows:


- The linter:
```
tox -e lint
```
- The unit tests:
```
tox -e unit-tests
```
- The integration tests:
```
MESH_API_KEY="your-secret-api-key" tox -e integration-tests
```
- All checks (linting and unit tests):
```
tox
```

### 5. Building and Publishing Packages
- *Build all packages:* The build task in tox will create the distributable wheel (.whl) and sdist (.tar.gz) files for all packages and place them in their respective dist/ folders.
```
tox -e build
```

- *Publish to PyPi:* The `twine` tool is used to securely upload the built packages to PyPI. This is done as part of the official release process.
```
twine upload ./dist/*
```