#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Python environment check failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "🐍 Python Environment Check"
echo "==========================="

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ ERROR: Python is not installed. Please install Python 3.12+:"
    echo "   brew install python"
    exit 1
fi

# Check Python version (should be 3.12+)
PYTHON_VERSION=$(python --version 2>&1 | cut -d' ' -f2)
PYTHON_MAJOR=$(echo "$PYTHON_VERSION" | cut -d'.' -f1)
PYTHON_MINOR=$(echo "$PYTHON_VERSION" | cut -d'.' -f2)

echo "📍 Found Python $PYTHON_VERSION"

if [[ "$PYTHON_MAJOR" -lt 3 ]] || [[ "$PYTHON_MAJOR" -eq 3 && "$PYTHON_MINOR" -lt 12 ]]; then
    echo "❌ ERROR: Python 3.12+ is required, but found Python $PYTHON_VERSION"
    echo "   Please upgrade Python:"
    echo "   brew install python"
    exit 1
fi

# Check if virtual environment is active
PYTHON_PATH=$(which python)
if [[ -n "${VIRTUAL_ENV:-}" ]]; then
    # Standard virtual environment is active
    EXPECTED_VENV="$(realpath "$ROOT_DIR/.venv")"
    ACTUAL_VENV="$(realpath "$VIRTUAL_ENV")"
    if [[ "$ACTUAL_VENV" != "$EXPECTED_VENV" ]]; then
        echo "⚠️  WARNING: Active virtual environment is not the project's .venv"
        echo "   Active:   $VIRTUAL_ENV"
        echo "   Expected: $EXPECTED_VENV"
        echo "   This is okay if you're using a different virtual environment setup"
    else
        echo "📍 Using project virtual environment: $(basename "$VIRTUAL_ENV")"
    fi
elif [[ "$PYTHON_PATH" == */.venv/* ]] || [[ "$PYTHON_PATH" == */venv/* ]]; then
    # Detected virtual environment from path
    echo "📍 Detected virtual environment from Python path: $PYTHON_PATH"
elif [[ "$PYTHON_PATH" == */.pyenv/* ]]; then
    # pyenv managed Python - check if it's in project-specific mode or has a virtual environment
    echo "📍 Using pyenv-managed Python: $PYTHON_PATH"
    if command -v pyenv &> /dev/null; then
        PYENV_VERSION=$(pyenv version-name 2>/dev/null || echo "unknown")
        echo "📍 Active pyenv version: $PYENV_VERSION"
        # pyenv virtual environments are acceptable
    fi
elif [[ "$PYTHON_PATH" == */anaconda*/* ]] || [[ "$PYTHON_PATH" == */miniconda*/* ]] || [[ "$PYTHON_PATH" == */conda/* ]]; then
    # Conda environment
    echo "📍 Using conda-managed Python: $PYTHON_PATH"
    if [[ -n "${CONDA_DEFAULT_ENV:-}" ]]; then
        echo "📍 Active conda environment: $CONDA_DEFAULT_ENV"
    fi
else
    # No virtual environment detected
    echo "⚠️  WARNING: No virtual environment detected!"
    echo "   Python path: $PYTHON_PATH"
    echo "   Consider using a virtual environment for better dependency isolation:"
    echo "   python -m venv .venv && source .venv/bin/activate"
    echo "   Or use pyenv: pyenv virtualenv 3.12.5 mesh-api && pyenv local mesh-api"
fi

echo "📦 Checking Python dependencies..."
MISSING_DEPS=()

# Check for critical dependencies
if ! python -c "import grpc" 2>/dev/null; then
    MISSING_DEPS+=("grpcio")
fi

if ! python -c "import grpc_tools" 2>/dev/null; then
    MISSING_DEPS+=("grpcio-tools")
fi

if ! python -c "import google.protobuf" 2>/dev/null; then
    MISSING_DEPS+=("protobuf")
fi

if ! command -v ruff &> /dev/null; then
    MISSING_DEPS+=("ruff")
fi

if ! python -c "import pytest" 2>/dev/null; then
    MISSING_DEPS+=("pytest")
fi

if [[ ${#MISSING_DEPS[@]} -gt 0 ]]; then
    echo "❌ ERROR: Missing required Python dependencies: ${MISSING_DEPS[*]}"
    echo "   Please install development dependencies:"
    echo "   pip install -e \".[dev]\""
    exit 1
fi

# Check if Python source directory exists (informational only)
if [[ -d "$ROOT_DIR/python/src/meshtrade" ]]; then
    echo "📍 Generated Python code: FOUND"
else
    echo "📍 Generated Python code: NOT FOUND (run generation when ready)"
fi

echo "✅ Python environment validated successfully!"
echo "   Python: $PYTHON_VERSION"
if [[ -n "${VIRTUAL_ENV:-}" ]]; then
    echo "   Virtual environment: $(basename "$VIRTUAL_ENV")"
else
    echo "   Virtual environment: DETECTED via path"
fi
echo "   Dependencies: All required packages installed"