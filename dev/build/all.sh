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

# Set JAVA_HOME to ensure Java 21 is used
export JAVA_HOME=/opt/homebrew/opt/openjdk@21

# Ensure we're in the root directory
cd "$ROOT_DIR"

# Track build results
PYTHON_SUCCESS=false
TS_WEB_SUCCESS=false
TS_NODE_SUCCESS=false
TSOLD_SUCCESS=false
JAVA_SUCCESS=false

# Build Python SDK
echo "🐍 Starting Python SDK build..."
if "$SCRIPT_DIR/python.sh"; then
    PYTHON_SUCCESS=true
    echo "✅ Python SDK build successful"
else
    echo "❌ Python SDK build failed"
fi
echo

# Build TypeScript (Web) SDK
echo "📦 Starting TypeScript (Web) SDK build..."
if "$SCRIPT_DIR/ts-web.sh"; then
    TS_WEB_SUCCESS=true
    echo "✅ TypeScript (Web) SDK build successful"
else
    echo "❌ TypeScript (Web) SDK build failed"
fi
echo

# Build TypeScript (Node.js) SDK
echo "📦 Starting TypeScript (Node.js) SDK build..."
if "$SCRIPT_DIR/ts-node.sh"; then
    TS_NODE_SUCCESS=true
    echo "✅ TypeScript (Node.js) SDK build successful"
else
    echo "❌ TypeScript (Node.js) SDK build failed"
fi
echo

# Build TypeScript (Web) (Legacy) SDK
echo "📦 Starting TypeScript (Web) (Legacy) SDK build..."
if "$SCRIPT_DIR/ts-old.sh"; then
    TSOLD_SUCCESS=true
    echo "✅ TypeScript (Web) (Legacy) SDK build successful"
else
    echo "❌ TypeScript (Web) (Legacy) SDK build failed"
fi
echo

# Build Java SDK
echo "☕ Starting Java SDK build..."
if "$SCRIPT_DIR/java.sh"; then
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

if [ "$TS_WEB_SUCCESS" = true ]; then
    echo "✅ TypeScript (Web) SDK: SUCCESS"
else
    echo "❌ TypeScript (Web) SDK: FAILED"
fi

if [ "$TS_NODE_SUCCESS" = true ]; then
    echo "✅ TypeScript (Node) SDK: SUCCESS"
else
    echo "❌ TypeScript (Node) SDK: FAILED"
fi

if [ "$TSOLD_SUCCESS" = true ]; then
    echo "✅ TypeScript (Legacy) SDK: SUCCESS"
else
    echo "❌ TypeScript (Legacy) SDK: FAILED"
fi

if [ "$JAVA_SUCCESS" = true ]; then
    echo "✅ Java SDK:       SUCCESS"
else
    echo "❌ Java SDK:       FAILED"
fi

echo

# Exit with error if any build failed
if [ "$PYTHON_SUCCESS" = true ] && [ "$TS_WEB_SUCCESS" = true ] && [ "$TS_NODE_SUCCESS" = true ] && [ "$TSOLD_SUCCESS" = true ] && [ "$JAVA_SUCCESS" = true ]; then
    echo "🎉 All SDK builds completed successfully!"
    exit 0
else
    echo "💥 One or more SDK builds failed. Check the logs above for details."
    exit 1
fi