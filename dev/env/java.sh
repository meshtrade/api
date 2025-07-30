#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Java environment check failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "☕ Java Environment Check"
echo "========================"

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ ERROR: Java is not installed. Please install Java 21:"
    echo "   brew install openjdk@21"
    echo "   Then add to your shell profile:"
    echo "   export PATH=\"/opt/homebrew/opt/openjdk@21/bin:\$PATH\""
    echo "   export JAVA_HOME=\"/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home\""
    exit 1
fi

# Check Java version
JAVA_VERSION_OUTPUT=$(java -version 2>&1)
if echo "$JAVA_VERSION_OUTPUT" | grep -q "openjdk version"; then
    JAVA_VERSION=$(echo "$JAVA_VERSION_OUTPUT" | grep "openjdk version" | cut -d'"' -f2 | cut -d'.' -f1)
else
    # Try alternative format
    JAVA_VERSION=$(echo "$JAVA_VERSION_OUTPUT" | head -1 | sed 's/.*version "\([0-9]*\).*/\1/')
fi

echo "📍 Found Java $JAVA_VERSION"

if [[ "$JAVA_VERSION" != "21" ]]; then
    echo "❌ ERROR: Java 21 is required, but found Java $JAVA_VERSION"
    echo "   Current Java:"
    java -version 2>&1 | head -3
    echo
    echo "   Please install Java 21 and set JAVA_HOME:"
    echo "   brew install openjdk@21"
    echo "   export JAVA_HOME=\"/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home\""
    echo "   export PATH=\"\$JAVA_HOME/bin:\$PATH\""
    exit 1
fi

# Check JAVA_HOME
if [[ -z "${JAVA_HOME:-}" ]]; then
    echo "⚠️  WARNING: JAVA_HOME is not set"
    echo "   Attempting to set JAVA_HOME automatically..."
    
    # Try to find Java 21 installation
    if [[ -d "/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home" ]]; then
        export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
        echo "   Set JAVA_HOME=$JAVA_HOME"
    elif [[ -d "/usr/local/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home" ]]; then
        export JAVA_HOME="/usr/local/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
        echo "   Set JAVA_HOME=$JAVA_HOME"
    else
        echo "❌ ERROR: Could not find Java 21 installation"
        echo "   Please set JAVA_HOME manually"
        exit 1
    fi
fi

# Check if Maven is installed
echo "🔍 Checking Maven installation..."
if ! command -v mvn &> /dev/null; then
    echo "❌ ERROR: Maven is not installed. Please install Maven:"
    echo "   brew install maven"
    exit 1
fi

# Check Maven uses Java 21
MVN_JAVA_VERSION=$(mvn -version 2>&1 | grep "Java version" | sed 's/.*: \([0-9]*\)\..*/\1/')
if [[ "$MVN_JAVA_VERSION" != "21" ]]; then
    echo "❌ ERROR: Maven is using Java $MVN_JAVA_VERSION, but Java 21 is required"
    echo "   Maven version info:"
    mvn -version 2>&1 | head -5
    echo
    echo "   Please ensure JAVA_HOME points to Java 21:"
    echo "   export JAVA_HOME=\"/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home\""
    exit 1
fi

# Check if Java source directory exists
if [[ ! -d "$ROOT_DIR/java/src/main/java/co/meshtrade/api" ]]; then
    echo "❌ ERROR: Java source directory not found at java/src/main/java/co/meshtrade/api/"
    echo "   Please run code generation first:"
    echo "   ./dev/tool.sh generate --targets=java"
    exit 1
fi

# Check if protoc-gen-meshjava plugin exists
PLUGIN_JAR="$ROOT_DIR/tool/protoc-gen-meshjava/target/protoc-gen-meshjava-jar-with-dependencies.jar"
if [[ ! -f "$PLUGIN_JAR" ]]; then
    echo "⚠️  WARNING: protoc-gen-meshjava plugin JAR not found"
    echo "   This will be built automatically during code generation"
fi

echo "✅ Java environment validated successfully!"
echo "   Java: $JAVA_VERSION"
echo "   JAVA_HOME: $JAVA_HOME"
echo "   Maven: $(mvn -version 2>&1 | head -1 | cut -d' ' -f3)"
echo "   Maven Java: $MVN_JAVA_VERSION"