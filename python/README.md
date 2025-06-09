# Python Mesh API Integration SDKs
Here you Find the mesh python sdks.

# Development Guide

The Core Concept: A Shared "Editable" Environment.

The foundational technique here is to create one single virtual environment for the entire repository and install all your local packages into it in "editable" mode.

1. Create One Virtual Environment at the Root
From your top-level python/ directory, create a single virtual environment.
```shell
cd python
python3 -m venv .venv
source .venv/bin/activate

pip install -e ./lib/account/v1
pip install -e ./lib/iam/v1
```