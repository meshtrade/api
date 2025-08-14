#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Python generation failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "🐍 Python Code Generation"
echo "========================"

# Check if virtual environment is active
if [[ -z "${VIRTUAL_ENV:-}" ]]; then
    echo "❌ ERROR: Python virtual environment is not active!"
    echo "   Please activate the virtual environment first:"
    echo "   source .venv/bin/activate"
    echo
    echo "   If you don't have a virtual environment, create one:"
    echo "   python -m venv .venv"
    echo "   source .venv/bin/activate"
    echo "   pip install -e \".[dev]\""
    exit 1
fi

# Check if we're in the correct virtual environment (should be .venv in project root)
EXPECTED_VENV="$(realpath "$ROOT_DIR/.venv")"
ACTUAL_VENV="$(realpath "$VIRTUAL_ENV")"
if [[ "$ACTUAL_VENV" != "$EXPECTED_VENV" ]]; then
    echo "⚠️  WARNING: Active virtual environment is not the project's .venv"
    echo "   Active:   $VIRTUAL_ENV"
    echo "   Expected: $EXPECTED_VENV"
    echo
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check Python version (should be 3.12+)
PYTHON_VERSION=$(python --version 2>&1 | cut -d' ' -f2)
PYTHON_MAJOR=$(echo "$PYTHON_VERSION" | cut -d'.' -f1)
PYTHON_MINOR=$(echo "$PYTHON_VERSION" | cut -d'.' -f2)

if [[ "$PYTHON_MAJOR" -lt 3 ]] || [[ "$PYTHON_MAJOR" -eq 3 && "$PYTHON_MINOR" -lt 12 ]]; then
    echo "❌ ERROR: Python 3.12+ is required, but found Python $PYTHON_VERSION"
    exit 1
fi

# Check if development dependencies are installed
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

# Check if protoc-gen-meshpy is accessible
if [[ ! -f "$ROOT_DIR/tool/protoc-gen-meshpy/main.py" ]]; then
    echo "❌ ERROR: protoc-gen-meshpy not found at expected location"
    exit 1
fi

if [[ ${#MISSING_DEPS[@]} -gt 0 ]]; then
    echo "❌ ERROR: Missing required Python dependencies: ${MISSING_DEPS[*]}"
    echo "   Please install development dependencies:"
    echo "   pip install -e \".[dev]\""
    exit 1
fi

echo "✅ Python environment validated"
echo

# Clean Python generated files
echo "🧹 Cleaning Python generated files..."
"$SCRIPT_DIR/../clean/python.sh"

echo "🐍 Generating Python code from protobuf definitions..."
buf generate --template "$SCRIPT_DIR/buf/buf.gen.python.yaml"

echo "🔍 Generating buf/validate Python files..."
buf generate buf.build/bufbuild/protovalidate --template "$SCRIPT_DIR/buf/buf.gen.validate.yaml"

echo "🎨 Formatting Python code with ruff..."
ruff check . --fix --quiet || true
ruff format . --quiet || true

echo "✅ Python code generation complete!"