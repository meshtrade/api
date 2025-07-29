#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: JAVA BUILD FAILED!!"
  exit "$exit_code"
}

echo "☕ Building Java SDK..."

# Set JAVA_HOME to ensure Java 21 is used
export JAVA_HOME=/opt/homebrew/opt/openjdk@21

# Ensure we're in the root directory
cd "$ROOT_DIR"

# Check if generated code exists
if [ ! -d "java/src/main/java/co/meshtrade/api/iam" ]; then
    echo "⚠️  Generated Java code not found. Please run generate-all.sh first."
    echo "   Expected: java/src/main/java/co/meshtrade/api/iam/"
    exit 1
fi

echo "🔧 Compiling Java SDK with Maven..."
cd java
mvn clean compile -q

echo "🧪 Running Java tests..."
mvn test -q

echo "📦 Packaging Java SDK..."
mvn package -q -DskipTests

echo "🚀 Running integration tests..."
mvn verify -q

cd ..

echo "############################################################"
echo "#                                                          #"
echo "#  🎉 Java SDK build complete!  ☕                        #"
echo "#                                                          #"
echo "############################################################"