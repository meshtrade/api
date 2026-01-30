#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Python tests failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "🐍 Python Testing"
echo "================="

# Check environment first
echo "🔍 Checking Python environment..."
if ! "$SCRIPT_DIR/../env/python.sh"; then
    echo "❌ Python environment check failed. Please fix the issues above."
    exit 1
fi

echo
echo "🧪 Running Python tests..."

# Run tests with proper PYTHONPATH
echo "📦 Setting PYTHONPATH and running pytest..."
export PYTHONPATH="./python/src:./python/tests"

# Check if there are any test files
if [[ ! -d "python/tests" ]] || [[ -z "$(find python/tests -name "test_*.py" -o -name "*_test.py" 2>/dev/null)" ]]; then
    echo "⚠️  No Python test files found in python/tests/"
    echo "   Looking for: test_*.py or *_test.py"
    echo "   Consider adding unit tests for the Python SDK"
    exit 0
fi

# Run pytest with verbose output
pytest python/tests -v --tb=short

# Check test results
if [[ $? -eq 0 ]]; then
    echo
    echo "✅ Python tests completed successfully!"
    
    # Optional: Run type checking if mypy is available
    if command -v mypy &> /dev/null; then
        echo
        echo "🔍 Running type checking with mypy..."
        if mypy python/src --ignore-missing-imports --follow-imports=skip; then
            echo "✅ Type checking passed!"
        else
            echo "⚠️  Type checking found issues (non-fatal)"
        fi
    fi
    
    # Optional: Run linting
    echo
    echo "🎨 Running code formatting and linting..."
    ruff check python/src --fix --quiet || true
    ruff format python/src --quiet || true
    echo "✅ Code formatting completed!"
    
else
    echo
    echo "❌ Python tests failed!"
    echo "   Check the test output above for details"
    exit 1
fi

echo
echo "############################################################"
echo "#                                                          #"
echo "#  🎉 Python testing complete!  🐍                         #"
echo "#                                                          #"
echo "############################################################"
