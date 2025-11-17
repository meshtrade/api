#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: TypeScript Web (Legacy) generation failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "📦 TypeScript Web (Legacy) Code Generation"
echo "============================="

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed. Please install Node.js:"
    echo "   brew install node"
    exit 1
fi

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ ERROR: Yarn is not installed. Please install Yarn:"
    echo "   corepack enable && corepack prepare yarn@1.22.22 --activate"
    exit 1
fi

# Check Node version (should be 18+)
NODE_VERSION=$(node --version | cut -d'v' -f2)
NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d'.' -f1)

if [[ "$NODE_MAJOR" -lt 18 ]]; then
    echo "❌ ERROR: Node.js 18+ is required, but found v$NODE_VERSION"
    exit 1
fi

# Check if yarn install has been run
echo "📦 Checking TypeScript dependencies..."
if [[ ! -d "$ROOT_DIR/node_modules" ]]; then
    echo "❌ ERROR: node_modules directory not found!"
    echo "   Please run 'yarn install' from the repository root first"
    exit 1
fi

# Check if key dependencies are installed
MISSING_DEPS=()

if [[ ! -d "$ROOT_DIR/node_modules/google-protobuf" ]]; then
    MISSING_DEPS+=("google-protobuf")
fi

if [[ ! -d "$ROOT_DIR/node_modules/grpc-web" ]]; then
    MISSING_DEPS+=("grpc-web")
fi

if [[ ${#MISSING_DEPS[@]} -gt 0 ]]; then
    echo "❌ ERROR: Missing required dependencies: ${MISSING_DEPS[*]}"
    echo "   Please run 'yarn install' from the repository root"
    exit 1
fi

# Check protoc-gen-meshtsold plugin
echo "🛠 Checking protoc-gen-meshtsold plugin..."
PLUGIN_DIR="$ROOT_DIR/tool/protoc-gen-meshtsold"
PLUGIN_DIST="$PLUGIN_DIR/dist/index.js"

cd "$PLUGIN_DIR"

# Check if plugin needs to be built
NEEDS_BUILD=false

if [[ ! -f "$PLUGIN_DIST" ]]; then
    echo "   Plugin not built, building..."
    NEEDS_BUILD=true
else
    # Check if source files are newer than the built plugin
    if [[ $(find "$PLUGIN_DIR/src" -name "*.ts" -newer "$PLUGIN_DIST" 2>/dev/null | wc -l) -gt 0 ]]; then
        echo "   Source files newer than built plugin, rebuilding..."
        NEEDS_BUILD=true
    else
        echo "   Plugin is up to date"
    fi
fi

if [[ "$NEEDS_BUILD" == "true" ]]; then
    echo "   Building protoc-gen-meshtsold..."
    yarn build
fi

cd "$ROOT_DIR"

echo "✅ TypeScript Web (Legacy) environment validated"
echo

# Clean TypeScript Web (Legacy) generated files
echo "🧹 Cleaning TypeScript Web (Legacy) generated files..."
"$SCRIPT_DIR/../clean/ts-old.sh"

echo "📦 Generating TypeScript Web (Legacy) code from protobuf definitions..."
buf generate --template "$SCRIPT_DIR/buf/buf.gen.ts-old.yaml"

echo "🔍 Generating buf/validate TypeScript Web (Legacy) files..."
buf generate buf.build/bufbuild/protovalidate --template "$ROOT_DIR/dev/generate/buf/buf.gen.ts-old.validate.yaml"

echo "📄 Generating TypeScript Web (Legacy) index.ts files..."
node tool/ts-import-scripts/generate-index-files.js ts-old

echo "✅ TypeScript Web (Legacy) code generation complete!"
