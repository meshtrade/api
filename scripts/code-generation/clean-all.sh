#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo "🧽 Starting comprehensive cleanup of all generated files..."
echo

# Run all individual cleanup scripts
"$SCRIPT_DIR/clean-go.sh"
echo

"$SCRIPT_DIR/clean-python.sh"
echo

"$SCRIPT_DIR/clean-typescript.sh"
echo

"$SCRIPT_DIR/clean-java.sh"
echo

"$SCRIPT_DIR/clean-docs.sh"
echo

echo "🎉 All cleanup scripts completed successfully!"