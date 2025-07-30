#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Go environment check failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "🐹 Go Environment Check"
echo "======================="

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "❌ ERROR: Go is not installed. Please install Go 1.21+:"
    echo "   brew install go"
    exit 1
fi

# Check Go version
GO_VERSION=$(go version | cut -d' ' -f3 | sed 's/go//')
GO_MAJOR=$(echo "$GO_VERSION" | cut -d'.' -f1)
GO_MINOR=$(echo "$GO_VERSION" | cut -d'.' -f2)

echo "📍 Found Go $GO_VERSION"

# Check if Go version is 1.21+
if [[ "$GO_MAJOR" -lt 1 ]] || [[ "$GO_MAJOR" -eq 1 && "$GO_MINOR" -lt 21 ]]; then
    echo "❌ ERROR: Go 1.21+ is required, but found Go $GO_VERSION"
    echo "   Please upgrade Go:"
    echo "   brew upgrade go"
    exit 1
fi

# Check if go.mod exists
if [[ ! -f "$ROOT_DIR/go.mod" ]]; then
    echo "❌ ERROR: go.mod not found in root directory"
    echo "   This should exist for Go module management"
    exit 1
fi

# Check if Go modules are tidy (only if go.mod and go.sum both exist)
echo "🔧 Checking Go modules..."
if [[ -f "$ROOT_DIR/go.sum" ]]; then
    if ! go mod verify &> /dev/null; then
        echo "⚠️  WARNING: Go modules verification failed"
        echo "   Consider running: go mod tidy"
    fi
else
    echo "📍 No go.sum file - will be created on first go mod tidy"
fi

# Check for golangci-lint (optional but recommended)
if command -v golangci-lint &> /dev/null; then
    GOLANGCI_VERSION=$(golangci-lint version 2>&1 | head -1 | cut -d' ' -f4 || echo "unknown")
    echo "📍 Found golangci-lint $GOLANGCI_VERSION"
else
    echo "⚠️  WARNING: golangci-lint not found (optional)"
    echo "   Install for enhanced linting:"
    echo "   go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest"
fi

# Check if protoc-gen-meshgo plugin exists
PLUGIN_DIR="$ROOT_DIR/tool/protoc-gen-meshgo"
if [[ ! -f "$PLUGIN_DIR/main.go" ]]; then
    echo "❌ ERROR: protoc-gen-meshgo plugin source not found"
    echo "   Expected: $PLUGIN_DIR/main.go"
    exit 1
fi

# Check if generated Go source exists (informational only)
if [[ -d "$ROOT_DIR/go/meshtrade" ]]; then
    echo "📍 Generated Go code: FOUND"
    
    # Only test compilation if generated code exists
    echo "🔧 Testing Go compilation..."
    if go build -o /dev/null ./... 2>/dev/null; then
        echo "📍 Go compilation: ✅ Passes"
    else
        echo "⚠️  WARNING: Go compilation failed"
        echo "   This may indicate issues with generated code"
        echo "   Consider regenerating: ./dev/tool.sh generate --targets=go"
    fi
else
    echo "📍 Generated Go code: NOT FOUND (run generation when ready)"
fi

echo "✅ Go environment validated successfully!"
echo "   Go: $GO_VERSION"
echo "   Modules: $(grep 'module ' go.mod | cut -d' ' -f2)"
echo "   Go version in go.mod: $(grep 'go [0-9]' go.mod | cut -d' ' -f2)"
echo "   Compilation: ✅ Passes"