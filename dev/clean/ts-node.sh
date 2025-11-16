#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."

cd "$ROOT_DIR"

echo "🧹 Cleaning TypeScript Node generated files..."
find ./ts-node/src -type f \( -name '*_meshts.*' -o -name '*_pb.js' -o -name '*_pb.d.ts' -o -name '*_grpc_web_pb.js' -o -name '*_grpc_web_pb.d.ts' \) -print0 | xargs -0 -r -P 4 rm
rm -rf ./ts-node/src/buf
rm -rf ./ts-node/src/validate
echo "✅ TypeScript Node cleanup complete"
