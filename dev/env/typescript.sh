#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: TypeScript environment check failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "🔷 TypeScript Environment Check"
echo "==============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed. Please install Node.js 18+:"
    echo "   brew install node"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | sed 's/v//')
NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d'.' -f1)

echo "📍 Found Node.js v$NODE_VERSION"

if [[ "$NODE_MAJOR" -lt 18 ]]; then
    echo "❌ ERROR: Node.js 18+ is required, but found Node.js v$NODE_VERSION"
    echo "   Please upgrade Node.js:"
    echo "   brew upgrade node"
    exit 1
fi

# Check if Yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ ERROR: Yarn is not installed. Please install Yarn:"
    echo "   corepack enable && corepack prepare yarn@1.22.22 --activate"
    exit 1
fi

# Check Yarn version
YARN_VERSION=$(yarn --version)
echo "📍 Found Yarn v$YARN_VERSION"

# Check for expected Yarn version (1.22.22)
if [[ "$YARN_VERSION" != "1.22.22" ]]; then
    echo "⚠️  WARNING: Expected Yarn 1.22.22, but found v$YARN_VERSION"
    echo "   Consider using the expected version:"
    echo "   corepack prepare yarn@1.22.22 --activate"
fi

# Check if node_modules exists
if [[ ! -d "$ROOT_DIR/node_modules" ]]; then
    echo "❌ ERROR: node_modules directory not found!"
    echo "   Please install dependencies first:"
    echo "   yarn install"
    exit 1
fi

# Check if TypeScript SDK directory exists
if [[ ! -d "$ROOT_DIR/ts/src/meshtrade" ]]; then
    echo "❌ ERROR: TypeScript source directory not found at ts/src/meshtrade/"
    echo "   Please run code generation first:"
    echo "   ./dev/tool.sh generate --targets=typescript"
    exit 1
fi

# Check TypeScript installation in the workspace
if ! yarn list typescript &> /dev/null; then
    echo "❌ ERROR: TypeScript is not installed in the workspace"
    echo "   Please install dependencies:"
    echo "   yarn install"
    exit 1
fi

# Check if TypeScript can compile
echo "🔧 Checking TypeScript compilation..."
if ! yarn build &> /dev/null; then
    echo "❌ ERROR: TypeScript compilation failed"
    echo "   Run yarn build for details, or regenerate code:"
    echo "   ./dev/tool.sh generate --targets=typescript"
    exit 1
fi

# Check protoc-gen-mesh_ts_web plugin
PLUGIN_DIR="$ROOT_DIR/tool/protoc-gen-mesh_ts_web"
if [[ ! -d "$PLUGIN_DIR/node_modules" ]]; then
    echo "⚠️  WARNING: protoc-gen-mesh_ts_web dependencies not found"
    echo "   This will be installed automatically during code generation"
fi

echo "✅ TypeScript environment validated successfully!"
echo "   Node.js: v$NODE_VERSION"
echo "   Yarn: v$YARN_VERSION"
echo "   TypeScript: $(yarn list typescript 2>/dev/null | grep typescript@ | head -1 | cut -d'@' -f2 || echo 'unknown')"
echo "   Compilation: ✅ Passes"