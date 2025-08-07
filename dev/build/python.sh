#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: PYTHON BUILD FAILED!!"
  exit "$exit_code"
}

echo "🐍 Building Python SDK..."

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo "🔧 Creating Python virtual environment..."
    python -m venv .venv
    echo
fi

echo "🔧 Activating virtual environment..."
source .venv/bin/activate

echo "📦 Installing Python dependencies..."
pip install -e .[dev] --quiet

echo "🧪 Running Python tests..."
export PYTHONPATH="./python/src:./python/tests"
pytest python/tests --quiet

echo "🚀 Python linting and formatting..."
ruff check . --fix --quiet
ruff format . --quiet

echo "############################################################"
echo "#                                                          #"
echo "#  🎉 Python SDK build complete!  🐍                      #"
echo "#                                                          #"
echo "############################################################"