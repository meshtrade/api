#!/usr/bin/env bash
set -Eeuo pipefail

# go clean
find ./go \
  \( -name '*.pb.go' \) \
  -print0 | xargs -0 -P 4 -n 1 rm -v

# python clean
find ./python/src/meshtrade \
  \( -name '*_pb2*.py*' \) \
  -print0 | xargs -0 -P 4 -n 1 rm -v

# use buf to run code genration
buf generate

echo "########################################################"
echo "#                                                      #"
echo "#  Done! All code generation is complete!   -\(^-^)/-  #"
echo "#                                                      #"
echo "########################################################"