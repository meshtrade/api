#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."

cd "$ROOT_DIR"

echo "🧹 Cleaning TypeScript generated files..."
find ./ts-web/src -type f \( -name '*_meshts.*' -o -name '*_web_meshts.*' -o -name '*_pb.ts' \) -print0 | xargs -0 -r -P 4 rm
rm -rf ./ts-web/src/buf
rm -rf ./ts-web/src/validate
echo "✅ TypeScript cleanup complete"