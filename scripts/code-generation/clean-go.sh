#!/usr/bin/env bash
set -Eeuo pipefail

echo "🧹 Cleaning Go generated files..."
find ./go \
  \( -name '*.pb.go' -o -name '*.pb.gw.go' -o -name '*.meshgo.go' -o -name '*.validate.go' \) \
  -print0 | xargs -0 -r -P 4 -n 1 rm
echo "✅ Go cleanup complete"