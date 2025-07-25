#!/usr/bin/env bash
set -Eeuo pipefail

# Script for testing protoc-gen-meshdoc during development
# Generates docs to a test directory to avoid breaking main docs

echo "🧹 Cleaning test docs..."
rm -rf ./docs/docs/api-reference-test

echo "🚀 Generating test documentation..."
buf generate --template ./scripts/code-generation/buf/buf.gen.meshdoc.yaml

echo "✅ Test generation complete - check ./docs/docs/api-reference-test/"