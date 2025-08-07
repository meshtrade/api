#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Java generation failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "☕ Java Code Generation"
echo "======================"

# Check if Java is installed
echo "🔍 Checking Java installation..."
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

echo "✅ Java environment validated (Java $JAVA_VERSION, Maven with Java $MVN_JAVA_VERSION)"
echo

# Build protoc-gen-meshjava plugin if needed
echo "🛠 Checking protoc-gen-meshjava plugin..."
PLUGIN_DIR="$ROOT_DIR/tool/protoc-gen-meshjava"
PLUGIN_JAR="$PLUGIN_DIR/target/protoc-gen-meshjava-jar-with-dependencies.jar"

cd "$PLUGIN_DIR"

# Check if plugin JAR needs to be built
NEEDS_BUILD=false

if [[ ! -f "$PLUGIN_JAR" ]]; then
    echo "   Plugin JAR not found, building..."
    NEEDS_BUILD=true
else
    # Check if source files are newer than the JAR
    SOURCE_FILES=$(find src -name "*.java" -newer "$PLUGIN_JAR" 2>/dev/null | wc -l || echo "0")
    if [[ "$SOURCE_FILES" -gt 0 ]] || [[ pom.xml -nt "$PLUGIN_JAR" ]]; then
        echo "   Source files newer than JAR, rebuilding..."
        NEEDS_BUILD=true
    else  
        echo "   Plugin JAR is up to date"
    fi
fi

if [[ "$NEEDS_BUILD" == "true" ]]; then
    echo "   Building protoc-gen-meshjava..."
    mvn clean package -q || {
        echo "❌ ERROR: Failed to build protoc-gen-meshjava"
        echo "   Check the build output above for details"
        exit 1
    }
    echo "   ✅ Plugin built successfully"
fi

cd "$ROOT_DIR"

# Clean Java generated files
echo "🧹 Cleaning Java generated files..."
"$SCRIPT_DIR/../clean/java.sh"

echo "☕ Generating Java code from protobuf definitions..."
buf generate --template "$SCRIPT_DIR/buf/buf.gen.java.yaml"

echo "✅ Java code generation complete!"