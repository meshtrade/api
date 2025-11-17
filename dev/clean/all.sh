#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Cleanup failed!"
  exit "$exit_code"
}

echo "🧹 Running comprehensive cleanup of all generated files..."
echo "========================================================"
echo

# Run all clean scripts in parallel
(
  "$SCRIPT_DIR/go.sh" &
  GO_PID=$!

  "$SCRIPT_DIR/python.sh" &
  PYTHON_PID=$!

  "$SCRIPT_DIR/ts-web.sh" &
  TS_WEB_PID=$!

  "$SCRIPT_DIR/ts-node.sh" &
  TS_NODE_PID=$!

  "$SCRIPT_DIR/ts-old.sh" &
  TSOLD_PID=$!

  "$SCRIPT_DIR/java.sh" &
  JAVA_PID=$!

  "$SCRIPT_DIR/docs.sh" &
  DOCS_PID=$!

  # Wait for all processes
  wait $GO_PID $PYTHON_PID $TS_WEB_PID $TS_NODE_PID $TSOLD_PID $JAVA_PID $DOCS_PID
)

echo
echo "✅ All cleanup operations completed successfully!"