#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Documentation generation failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "📚 Documentation Generation"
echo "=========================="

# Check if Go is installed (required for protoc-gen-meshdoc)
echo "🔍 Checking dependencies..."
if ! command -v go &> /dev/null; then
    echo "❌ ERROR: Go is not installed. Please install Go (required for documentation generator):"
    echo "   brew install go"
    exit 1
fi

# Check if protoc-gen-meshdoc exists
if [[ ! -d "$ROOT_DIR/tool/protoc-gen-meshdoc" ]]; then
    echo "❌ ERROR: protoc-gen-meshdoc not found at expected location"
    exit 1
fi

# Check if docs directory exists
if [[ ! -d "$ROOT_DIR/docs" ]]; then
    echo "❌ ERROR: docs directory not found"
    echo "   Expected location: $ROOT_DIR/docs"
    exit 1
fi

echo "✅ Documentation environment validated"
echo

# Clean documentation generated files
echo "🧹 Cleaning documentation generated files..."
"$SCRIPT_DIR/../clean/docs.sh"

echo "📚 Generating documentation from protobuf definitions..."
buf generate --template "$SCRIPT_DIR/buf/buf.gen.docs.yaml"

echo "✅ Documentation generation complete!"