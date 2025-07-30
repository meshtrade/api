#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Go generation failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "🏃 Go Code Generation"
echo "===================="

# Check if Go is installed
echo "🔍 Checking Go installation..."
if ! command -v go &> /dev/null; then
    echo "❌ ERROR: Go is not installed. Please install Go:"
    echo "   brew install go"
    exit 1
fi

# Check Go version (should be 1.21+)
GO_VERSION=$(go version | cut -d' ' -f3 | cut -d'o' -f2)
GO_MAJOR=$(echo "$GO_VERSION" | cut -d'.' -f1)
GO_MINOR=$(echo "$GO_VERSION" | cut -d'.' -f2)

if [[ "$GO_MAJOR" -lt 1 ]] || [[ "$GO_MAJOR" -eq 1 && "$GO_MINOR" -lt 21 ]]; then
    echo "❌ ERROR: Go 1.21+ is required, but found Go $GO_VERSION"
    exit 1
fi

# Check if buf is installed
if ! command -v buf &> /dev/null; then
    echo "❌ ERROR: buf is not installed. Please install buf:"
    echo "   brew install bufbuild/buf/buf"
    exit 1
fi

# Check if protoc-gen-meshgo exists
if [[ ! -d "$ROOT_DIR/tool/protoc-gen-meshgo" ]]; then
    echo "❌ ERROR: protoc-gen-meshgo not found at expected location"
    exit 1
fi

echo "✅ Go environment validated (Go $GO_VERSION)"
echo

# Clean Go generated files
echo "🧹 Cleaning Go generated files..."
"$SCRIPT_DIR/../clean/go.sh"

echo "🏃 Generating Go code from protobuf definitions..."
buf generate --template "$SCRIPT_DIR/buf/buf.gen.go.yaml"

echo "✅ Go code generation complete!"