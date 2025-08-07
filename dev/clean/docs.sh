#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."

cd "$ROOT_DIR"

echo "🧹 Cleaning Documentation generated files..."
find ./docs/docs/api-reference \
  \( -name '*_meshdoc.mdx' -o -name '*_meshdoc.ts' \) \
  -print0 | xargs -0 -r -P 4 rm

# Clean new generated index.mdx files
find ./docs/docs/api-reference -path "*/service/*/index.mdx" -print0 | xargs -0 -r -P 4 rm
find ./docs/docs/api-reference -path "*/service/index.mdx" -print0 | xargs -0 -r -P 4 rm
find ./docs/docs/api-reference -path "*/type/index.mdx" -print0 | xargs -0 -r -P 4 rm
find ./docs/docs/api-reference -path "*/type/*/index.mdx" -print0 | xargs -0 -r -P 4 rm

echo "✅ Documentation cleanup complete"