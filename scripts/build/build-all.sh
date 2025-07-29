#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: BUILD ALL FAILED!!"
  exit "$exit_code"
}

echo "🏗️  Building all SDKs..."
echo

# Ensure we're in the root directory
cd "$ROOT_DIR"

# Track build results
PYTHON_SUCCESS=false
TYPESCRIPT_SUCCESS=false
JAVA_SUCCESS=false

# Build Python SDK
echo "🐍 Starting Python SDK build..."
if "$SCRIPT_DIR/build-python.sh"; then
    PYTHON_SUCCESS=true
    echo "✅ Python SDK build successful"
else
    echo "❌ Python SDK build failed"
fi
echo

# Build TypeScript SDK
echo "📦 Starting TypeScript SDK build..."
if "$SCRIPT_DIR/build-typescript.sh"; then
    TYPESCRIPT_SUCCESS=true
    echo "✅ TypeScript SDK build successful"
else
    echo "❌ TypeScript SDK build failed"
fi
echo

# Build Java SDK
echo "☕ Starting Java SDK build..."
if "$SCRIPT_DIR/build-java.sh"; then
    JAVA_SUCCESS=true
    echo "✅ Java SDK build successful"
else
    echo "❌ Java SDK build failed"
fi
echo

# Summary
echo "############################################################"
echo "#                                                          #"
echo "#                  🏗️  BUILD SUMMARY                       #"
echo "#                                                          #"
echo "############################################################"

if [ "$PYTHON_SUCCESS" = true ]; then
    echo "✅ Python SDK:     SUCCESS"
else
    echo "❌ Python SDK:     FAILED"
fi

if [ "$TYPESCRIPT_SUCCESS" = true ]; then
    echo "✅ TypeScript SDK: SUCCESS"
else
    echo "❌ TypeScript SDK: FAILED"
fi

if [ "$JAVA_SUCCESS" = true ]; then
    echo "✅ Java SDK:       SUCCESS"
else
    echo "❌ Java SDK:       FAILED"
fi

echo

# Exit with error if any build failed
if [ "$PYTHON_SUCCESS" = true ] && [ "$TYPESCRIPT_SUCCESS" = true ] && [ "$JAVA_SUCCESS" = true ]; then
    echo "🎉 All SDK builds completed successfully!"
    exit 0
else
    echo "💥 One or more SDK builds failed. Check the logs above for details."
    exit 1
fi