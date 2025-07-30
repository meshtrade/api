# Python SDK

This directory contains the Python SDK for interacting with the Mesh API.

## Overview

The Python SDK offers a comprehensive and idiomatic client library, generated from our schema-first protobuf definitions, to facilitate integration with the Mesh trading platform.

## Development Setup

**CRITICAL**: Python development requires a virtual environment:

```bash
# From repository root
python -m venv .venv
source .venv/bin/activate

# Install in development mode
pip install -e ".[dev]"
```

## Testing

Run comprehensive Python tests including pytest, coverage, and linting:

```bash
# From repository root - recommended
./dev/test/python.sh

# Or check environment and run tests manually
source .venv/bin/activate
pytest
ruff check . --fix && ruff format .
```

## Code Generation

This directory contains generated code. To regenerate from protobuf definitions:

```bash
# From repository root
./dev/tool.sh generate --targets=python
```

## Documentation

For complete documentation, including installation, usage examples, and API reference, please visit the main documentation site:

**[meshtrade.github.io/api](https://meshtrade.github.io/api)**
