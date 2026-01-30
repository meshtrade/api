#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: TypeScript (Web) tests failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "🔷 TypeScript (Web) Testing"
echo "===================="

# Check environment first
echo "🔍 Checking TypeScript (Web) environment..."
if ! "$SCRIPT_DIR/../env/ts-web.sh"; then
    echo "❌ TypeScript (Web) environment check failed. Please fix the issues above."
    exit 1
fi

echo
echo "🧪 Running TypeScript (Web) tests..."

cd "$ROOT_DIR/ts-web"

# Ensure TypeScript (Web) compiles first
echo "🔧 Verifying TypeScript (Web) compilation..."
yarn build

# Run TypeScript (Web) tests
echo "📦 Running Jest tests..."
yarn test

# Run TypeScript (Web) linting
echo
echo "🎨 Running ESLint..."
yarn lint

# Optional: Type checking
echo
echo "🔍 Running type checking..."
yarn tsc --noEmit || echo "⚠️  Type checking found issues (non-fatal)"

# Check test coverage if available
if [[ -d "coverage" ]]; then
    echo
    echo "📊 Test Coverage:"
    if command -v lcov &> /dev/null && [[ -f "coverage/lcov.info" ]]; then
        lcov --summary coverage/lcov.info 2>/dev/null | tail -3 || echo "Coverage summary not available"
    else
        echo "   Coverage report generated in coverage/ directory"
    fi
fi

echo
echo "✅ TypeScript (Web) tests completed successfully!"

# Show package info
echo
echo "📊 Package Summary:"
echo "   Package: $(jq -r '.name' package.json)"
echo "   Version: $(jq -r '.version' package.json)"
echo "   Node.js: $(node --version)"
echo "   Yarn: $(yarn --version)"

echo
echo "############################################################"
echo "#                                                          #"
echo "#  🎉 TypeScript (Web) testing complete!  🔷               #"
echo "#                                                          #"
echo "############################################################"
