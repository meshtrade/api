#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Java tests failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "☕ Java Testing"
echo "==============="

# Check environment first
echo "🔍 Checking Java environment..."
if ! "$SCRIPT_DIR/../env/java.sh"; then
    echo "❌ Java environment check failed. Please fix the issues above."
    exit 1
fi

echo
echo "🧪 Running Java tests..."

# Set JAVA_HOME to ensure Java 21 is used
export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home

# Navigate to Java directory
cd java

# Run Maven tests
echo "📦 Running Maven Surefire tests..."
mvn test -q

# Check if integration tests exist and run them
echo
echo "🚀 Running integration tests..."
mvn verify -q -DskipUnitTests

# Run linting (mandatory)
echo
echo "🔍 Running code quality checks..."

echo "   📋 Checkstyle (code style)..."
mvn checkstyle:check -q

echo "✅ All code quality checks passed!"

cd ..

echo
echo "✅ Java tests completed successfully!"

# Show test summary if available
if [[ -f "java/target/surefire-reports/TEST-*.xml" ]]; then
    echo
    echo "📊 Test Summary:"
    # Parse test results from XML files
    TOTAL_TESTS=$(grep -h "tests=" java/target/surefire-reports/TEST-*.xml 2>/dev/null | sed 's/.*tests="\([0-9]*\)".*/\1/' | awk '{sum+=$1} END {print sum}' || echo "0")
    FAILED_TESTS=$(grep -h "failures=" java/target/surefire-reports/TEST-*.xml 2>/dev/null | sed 's/.*failures="\([0-9]*\)".*/\1/' | awk '{sum+=$1} END {print sum}' || echo "0")
    ERROR_TESTS=$(grep -h "errors=" java/target/surefire-reports/TEST-*.xml 2>/dev/null | sed 's/.*errors="\([0-9]*\)".*/\1/' | awk '{sum+=$1} END {print sum}' || echo "0")
    
    echo "   Total Tests: $TOTAL_TESTS"
    echo "   Failed: $FAILED_TESTS"
    echo "   Errors: $ERROR_TESTS"
    echo "   Passed: $((TOTAL_TESTS - FAILED_TESTS - ERROR_TESTS))"
fi

echo
echo "############################################################"
echo "#                                                          #"
echo "#  🎉 Java testing complete!  ☕                         #"
echo "#                                                          #"
echo "############################################################"