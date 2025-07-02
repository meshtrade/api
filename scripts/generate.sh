#!/usr/bin/env bash
set -Eeuo pipefail

# --- Configuration ---
# A simple flag parser. If the first argument is -v or --verbose,
# the script will run in verbose mode.
VERBOSE_FLAG=""
if [[ "${1:-}" == "-v" || "${1:-}" == "--verbose" ]]; then
  echo "Running in verbose mode..."
  VERBOSE_FLAG="-v"
fi

echo "🧹 Cleaning Go generated files..."
# Find and remove all generated Go files in a single command.
find ./go \
  \( -name '*.pb.go' -o -name '*.pb.gw.go' -o -name '*.meshgo.go' -o -name '*.validate.go' \) \
  -print0 | xargs -0 -P 4 -n 1 rm $VERBOSE_FLAG
echo

echo "🧹 Cleaning Python generated files..."
find ./python/src/meshtrade -type f \( -name '*_pb2_grpc.py' -o -name '*_pb2.py' -o -name '*_pb2.pyi' \) -print0 | xargs -0 -r -P 4 rm $VERBOSE_FLAG
echo

echo "🧹 Cleaning Js + Ts generated files..."
rm -rf ./ts/dist
find ./ts/src \
  \( -name '*pb.d.ts' -o -name '*pb.js' -o -name '*Pb.ts' \) \
  -print0 | xargs -0 -P 4 -n 1 rm $VERBOSE_FLAG
echo  

echo "🚀 Generating new files from protobuf definitions..."
buf generate
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