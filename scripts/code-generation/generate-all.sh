#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: GENERATE ALL FAILED!!"
  exit "$exit_code"
}
trap 'handle_error $LINENO' ERR

# Run comprehensive cleanup of all generated files
"$SCRIPT_DIR/clean-all.sh"

echo "🔍 Checking Java prerequisites..."
if ! command -v java &> /dev/null; then
    echo "❌ ERROR: Java is not installed. Please install Java 21:"
    echo "   brew install openjdk@21"
    echo "   export PATH=\"/opt/homebrew/opt/openjdk@21/bin:\$PATH\""
    echo "   export JAVA_HOME=\"/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home\""
    exit 1
fi

if ! command -v mvn &> /dev/null; then
    echo "❌ ERROR: Maven is not installed. Please install Maven:"
    echo "   brew install maven"
    exit 1
fi

# Check Java version (should be 21)
JAVA_VERSION=$(java -version 2>&1 | grep "openjdk version" | cut -d'"' -f2 | cut -d'.' -f1)
if [[ "$JAVA_VERSION" != "21" ]]; then
    echo "❌ ERROR: Java 21 is required, but found Java $JAVA_VERSION"
    echo "   Please install Java 21 and set JAVA_HOME:"
    echo "   export JAVA_HOME=\"/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home\""
    exit 1
fi

# Check Maven uses Java 21
MVN_JAVA_VERSION=$(mvn -version 2>&1 | grep "Java version" | cut -d' ' -f3 | cut -d'.' -f1)
if [[ "$MVN_JAVA_VERSION" != "21" ]]; then
    echo "❌ ERROR: Maven is using Java $MVN_JAVA_VERSION, but Java 21 is required"
    echo "   Please set JAVA_HOME to Java 21:"
    echo "   export JAVA_HOME=\"/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home\""
    exit 1
fi
echo "✅ Java prerequisites check passed"
echo

echo "🛠 Building protoc-gen-meshjava plugin..."
cd tool/protoc-gen-meshjava

# Check if plugin JAR needs to be built
PLUGIN_JAR="target/protoc-gen-meshjava-jar-with-dependencies.jar"
NEEDS_BUILD=false

if [[ ! -f "$PLUGIN_JAR" ]]; then
    echo "   Plugin JAR not found, building..."
    NEEDS_BUILD=true
else
    # Check if source files are newer than the JAR
    if [[ $(find src -name "*.java" -newer "$PLUGIN_JAR" | wc -l) -gt 0 ]] || [[ pom.xml -nt "$PLUGIN_JAR" ]]; then
        echo "   Source files newer than JAR, rebuilding..."
        NEEDS_BUILD=true
    else  
        echo "   Plugin JAR is up to date, skipping build"
    fi
fi

if [[ "$NEEDS_BUILD" == "true" ]]; then
    mvn clean package -q
fi

cd ../..
echo

echo "🛠 Building protoc-gen-meshts plugin..."
cd tool/protoc-gen-meshts/cmd
yarn build
cd ../../..
echo

echo "🚀 Generating new files from protobuf definitions..."
buf generate  --template "$SCRIPT_DIR/buf/buf.gen.yaml"
echo

echo "🚀 Generating buf/validate TypeScript files..."
buf generate buf.build/bufbuild/protovalidate --template "$SCRIPT_DIR/buf/buf.gen.validate.yaml"
echo

echo "📄 Generating TypeScript index.ts files..."
cd tool/protoc-gen-meshts/scripts
node generate-index-files.js
cd ../../..
echo

echo "🚀 Formatting Python code with ruff..."
ruff check . --fix --quiet || true
echo

echo "############################################################"
echo "#                                                          #"
echo "#  🎉 Done! All code generation is complete!  -\(^-^)/-    #"
echo "#                                                          #"
echo "############################################################"