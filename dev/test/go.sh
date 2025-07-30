#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Go tests failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "🐹 Go Testing"
echo "============="

# Check environment first
echo "🔍 Checking Go environment..."
if ! "$SCRIPT_DIR/../env/go.sh"; then
    echo "❌ Go environment check failed. Please fix the issues above."
    exit 1
fi

echo
echo "🧪 Running Go tests..."

# Clean up go modules first
echo "📦 Ensuring Go modules are tidy..."
go mod tidy

# Run Go tests with verbose output
echo "🧪 Running go test..."
go test -v ./...

# Run tests with race detection
echo
echo "🏃 Running race condition detection..."
go test -race ./... || echo "⚠️  Race detection found issues (non-fatal)"

# Run tests with coverage
echo
echo "📊 Running test coverage analysis..."
go test -coverprofile=coverage.out ./...

# Show coverage report if available
if [[ -f "coverage.out" ]]; then
    echo
    echo "📊 Coverage Summary:"
    go tool cover -func=coverage.out | tail -1
    
    # Generate HTML coverage report (optional)
    go tool cover -html=coverage.out -o coverage.html
    echo "   Detailed coverage report: coverage.html"
fi

# Run linting if golangci-lint is available
echo
if command -v golangci-lint &> /dev/null; then
    echo "🎨 Running golangci-lint..."
    golangci-lint run -v --timeout 10m -E gosec || echo "⚠️  Linting found issues (non-fatal)"
else
    echo "⚠️  golangci-lint not found - skipping linting"
    echo "   Install with: go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest"
fi

# Check for potential security issues with gosec if available
if command -v gosec &> /dev/null; then
    echo
    echo "🔒 Running security analysis with gosec..."
    gosec ./... || echo "⚠️  Security scan found issues (non-fatal)"
fi

# Verify go mod is still tidy after tests
echo
echo "🔧 Verifying go.mod is still tidy..."
go mod tidy
if git diff --exit-code go.mod go.sum >/dev/null 2>&1; then
    echo "✅ go.mod and go.sum are tidy"
else
    echo "⚠️  go.mod or go.sum changed - consider committing changes"
fi

echo
echo "✅ Go tests completed successfully!"

# Show Go environment summary
echo
echo "📊 Go Environment Summary:"
echo "   Go version: $(go version | cut -d' ' -f3)"
echo "   Module: $(grep 'module ' go.mod | cut -d' ' -f2)"
echo "   Go directive: $(grep 'go [0-9]' go.mod | cut -d' ' -f2)"

echo
echo "############################################################"
echo "#                                                          #"
echo "#  🎉 Go testing complete!  🐹                           #"
echo "#                                                          #"
echo "############################################################"