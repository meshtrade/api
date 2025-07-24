#!/bin/bash

set -euo pipefail

function handle_error() {
  local exit_code=$?
  local line_number=$1
  echo "❌ ERROR in $(basename "$0") on line $line_number: MESHTS CLEANUP FAILED!!"
  exit "$exit_code"
}
trap 'handle_error $LINENO' ERR

echo "🧹 Cleaning up generated _grpc_web_client_meshts files..."

# Remove all _grpc_web_client_meshts files in the ts source directory
find ts/src -name "*_grpc_web_client_meshts.*" -type f -delete 2>/dev/null || true

echo "✅ Cleanup complete"
