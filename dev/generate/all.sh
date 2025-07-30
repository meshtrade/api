#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Generation failed!"
  exit "$exit_code"
}

echo "🚀 Running code generation for all languages..."
echo "============================================="
echo

# Track generation results
GO_SUCCESS=false
PYTHON_SUCCESS=false
JAVA_SUCCESS=false
TYPESCRIPT_SUCCESS=false
DOCS_SUCCESS=false

# Generate Go
echo "🏃 Starting Go code generation..."
if "$SCRIPT_DIR/go.sh"; then
    GO_SUCCESS=true
else
    echo "❌ Go code generation failed"
fi
echo

# Generate Python
echo "🐍 Starting Python code generation..."
if "$SCRIPT_DIR/python.sh"; then
    PYTHON_SUCCESS=true
else
    echo "❌ Python code generation failed"
fi
echo

# Generate Java
echo "☕ Starting Java code generation..."
if "$SCRIPT_DIR/java.sh"; then
    JAVA_SUCCESS=true
else
    echo "❌ Java code generation failed"
fi
echo

# Generate TypeScript
echo "📦 Starting TypeScript code generation..."
if "$SCRIPT_DIR/typescript.sh"; then
    TYPESCRIPT_SUCCESS=true
else
    echo "❌ TypeScript code generation failed"
fi
echo

# Generate Documentation
echo "📚 Starting documentation generation..."
if "$SCRIPT_DIR/docs.sh"; then
    DOCS_SUCCESS=true
else
    echo "❌ Documentation generation failed"
fi
echo

# Summary
echo "############################################################"
echo "#                                                          #"
echo "#               🚀 GENERATION SUMMARY                      #"
echo "#                                                          #"
echo "############################################################"

if [ "$GO_SUCCESS" = true ]; then
    echo "✅ Go:           SUCCESS"
else
    echo "❌ Go:           FAILED"
fi

if [ "$PYTHON_SUCCESS" = true ]; then
    echo "✅ Python:       SUCCESS"
else
    echo "❌ Python:       FAILED"
fi

if [ "$JAVA_SUCCESS" = true ]; then
    echo "✅ Java:         SUCCESS"
else
    echo "❌ Java:         FAILED"
fi

if [ "$TYPESCRIPT_SUCCESS" = true ]; then
    echo "✅ TypeScript:   SUCCESS"
else
    echo "❌ TypeScript:   FAILED"
fi

if [ "$DOCS_SUCCESS" = true ]; then
    echo "✅ Documentation: SUCCESS"
else
    echo "❌ Documentation: FAILED"
fi

echo

# Exit with error if any generation failed
if [ "$GO_SUCCESS" = true ] && [ "$PYTHON_SUCCESS" = true ] && [ "$JAVA_SUCCESS" = true ] && [ "$TYPESCRIPT_SUCCESS" = true ] && [ "$DOCS_SUCCESS" = true ]; then
    echo "🎉 All code generation completed successfully!"
    exit 0
else
    echo "💥 One or more code generations failed. Check the logs above for details."
    exit 1
fi