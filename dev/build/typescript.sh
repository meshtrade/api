#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: TYPESCRIPT BUILD FAILED!!"
  exit "$exit_code"
}

echo "📦 Building TypeScript SDK..."

# Ensure we're in the root directory
cd "$ROOT_DIR"

echo "📦 Installing TypeScript dependencies..."
cd ts
yarn install --frozen-lockfile

echo "🚀 Building TypeScript library..."
yarn build

echo "🧪 Running TypeScript tests..."
yarn test

echo "🚀 Linting TypeScript code..."
yarn lint

cd ..

echo "############################################################"
echo "#                                                          #"
echo "#  🎉 TypeScript SDK build complete!  📦                  #"
echo "#                                                          #"
echo "############################################################"