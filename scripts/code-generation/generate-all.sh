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

echo "🧹 Cleaning Go generated files..."
find ./go \
  \( -name '*.pb.go' -o -name '*.pb.gw.go' -o -name '*.meshgo.go' -o -name '*.validate.go' \) \
  -print0 | xargs -0 -P 4 -n 1 rm
echo

echo "🧹 Cleaning Python generated files..."
find ./python/src/meshtrade -type f \( -name '*_meshpy.py' -o -name '*_pb2_grpc.py' -o -name '*_pb2.py' -o -name '*_pb2.pyi' \) -print0 | xargs -0 -r -P 4 rm
echo

echo "🧹 Cleaning Js + Ts generated files..."
rm -rf ./ts/dist
find ./ts/src \
  \( -name '*pb.d.ts' -o -name '*pb.js' -o -name '*Pb.ts' -o -name '*_meshts.js' -o -name '*_meshts.d.ts' \) \
  -print0 | xargs -0 -P 4 -n 1 rm
echo  

echo "🛠 Building protoc-gen-meshts plugin..."
cd tool/protoc-gen-meshts/cmd
yarn build
cd ../../..
echo

echo "🚀 Generating new files from protobuf definitions..."
buf generate  --template "$SCRIPT_DIR/buf/buf.gen.yaml"
echo

echo "🚀 Formatting Python code with ruff..."
ruff check ./python/src --fix --quiet || true
echo

echo "🚀 Generating buf/validate TypeScript files..."
buf generate buf.build/bufbuild/protovalidate --template "$SCRIPT_DIR/buf/buf.gen.validate.yaml"
echo

echo "⚙️ Typescript Library Build..."
cd ts
yarn build
cd ..
echo

echo "############################################################"
echo "#                                                          #"
echo "#  🎉 Done! All code generation is complete!  -\(^-^)/-    #"
echo "#                                                          #"
echo "############################################################"