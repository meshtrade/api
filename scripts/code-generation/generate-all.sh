#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: GENERATE ALL FAILED!!"
  exit "$exit_code"
}
trap 'handle_error $LINENO' ERR

# Run comprehensive cleanup of all generated files
"$SCRIPT_DIR/clean-all.sh"

echo "🛠 Building protoc-gen-meshts plugin..."
cd tool/protoc-gen-meshts/cmd
yarn build
cd ../../..
echo

echo "🚀 Generating new files from protobuf definitions..."
buf generate  --template "$SCRIPT_DIR/buf/buf.gen.yaml"
echo

echo "🚀 Generating buf/validate TypeScript files..."
buf generate buf.build/bufbuild/protovalidate --template "$SCRIPT_DIR/buf/buf.gen.validate.yaml"
echo

echo "📄 Generating TypeScript index.ts files..."
cd tool/protoc-gen-meshts/scripts
node generate-index-files.js
cd ../../..
echo

echo "🚀 Formatting Python code with ruff..."
ruff check . --fix --quiet || true
echo

echo "############################################################"
echo "#                                                          #"
echo "#  🎉 Done! All code generation is complete!  -\(^-^)/-    #"
echo "#                                                          #"
echo "############################################################"