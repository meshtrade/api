#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."

cd "$ROOT_DIR"

echo "🧹 Cleaning Python generated files..."
find ./python/src/meshtrade -type f \( -name '*_meshpy.py' -o -name '*_pb2_grpc.py' -o -name '*_pb2.py' -o -name '*_pb2.pyi' \) -print0 | xargs -0 -r -P 4 rm

echo "🧹 Cleaning Python duplicate nested structure..."
rm -rf ./python/src/meshtrade/meshtrade

echo "✅ Python cleanup complete"