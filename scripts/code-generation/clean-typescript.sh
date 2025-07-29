#!/usr/bin/env bash
set -Eeuo pipefail

echo "🧹 Cleaning TypeScript generated files..."
rm -rf ./ts/dist
find ./ts/src \
  \( -name '*pb.d.ts' -o -name '*pb.js' -o -name '*Pb.ts' -o -name '*_meshts.js' -o -name '*_meshts.d.ts' \) \
  -print0 | xargs -0 -r -P 4 -n 1 rm

echo "✅ TypeScript cleanup complete"