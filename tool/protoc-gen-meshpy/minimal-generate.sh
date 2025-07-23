#!/usr/bin/env bash
set -Eeuo pipefail

# Change to api directory
cd "$(dirname "$0")/../.."

echo "🧹 Cleaning Python meshpy generated files..."
find ./python/src/meshtrade -type f -name '*_meshpy.py' -delete 2>/dev/null || true

echo "🚀 Running protoc-gen-meshpy (full generation)..."
buf generate

echo "✅ Generation complete! Check python/src/meshtrade/*/v1/ for *_meshpy.py files"
