#!/usr/bin/env bash
set -Eeuo pipefail

# go clean
find ./go \
  \( -name '*.pb.go' \) \
  -print0 | xargs -0 -P 4 -n 1 rm -v

# python clean
rm -rf python_build || true
find ./python/lib \
  \( -name '*_pb2*.py*' \) \
  -print0 | xargs -0 -P 4 -n 1 rm -v

# use buf to run code genration
buf generate

# post processing to organise directories
./scripts/python_post_processing.sh

echo "########################################################"
echo "#                                                      #"
echo "#  Done! All code generation is complete!   -\(^-^)/-  #"
echo "#                                                      #"
echo "########################################################"