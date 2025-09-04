#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: Deployment failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "📦 Maven Central Deployment"
echo "==========================="
echo

# Check for environment variables first (CI/CD friendly)
if [[ -n "${MAVEN_CENTRAL_USERNAME:-}" && -n "${MAVEN_CENTRAL_PASSWORD:-}" ]]; then
    echo "🔧 Using credentials from environment variables"
    USE_ENV_CREDENTIALS=true
else
    USE_ENV_CREDENTIALS=false
    
    # Check if settings file exists
    if [[ ! -f "maven-settings.xml" ]]; then
        echo "❌ ERROR: maven-settings.xml not found and no environment credentials!"
        echo "   Either:"
        echo "   1. Set MAVEN_CENTRAL_USERNAME and MAVEN_CENTRAL_PASSWORD environment variables"
        echo "   2. Configure credentials in maven-settings.xml"
        echo "   See MAVEN_CENTRAL_DEPLOYMENT.md for instructions"
        exit 1
    fi

    # Check if credentials are configured
    if grep -q "YOUR_GENERATED_TOKEN" maven-settings.xml; then
        echo "❌ ERROR: maven-settings.xml contains placeholder values!"
        echo "   Please update with your actual generated token credentials"
        exit 1
    fi
fi

# Check GPG is available
if ! command -v gpg &> /dev/null; then
    echo "❌ ERROR: GPG is not installed!"
    echo "   Install with: brew install gnupg"
    exit 1
fi

# Check for GPG keys
if ! gpg --list-secret-keys | grep -q "sec"; then
    echo "❌ ERROR: No GPG keys found!"
    echo "   Generate one with: gpg --gen-key"
    exit 1
fi

# Ensure code is generated
echo "🔍 Checking for generated Java code..."
if [[ ! -d "java/src/main/java/co/meshtrade/api/iam" ]]; then
    echo "⚠️  Generated code not found, running generation..."
    ./dev/tool.sh generate --targets=java
fi

# Run tests first
echo
echo "🧪 Running tests..."
if ! ./dev/test/java.sh; then
    echo "❌ Tests failed! Fix tests before deploying."
    exit 1
fi

echo
echo "🚀 Starting Maven Central deployment..."
echo

# Check if GPG_PASSPHRASE is set as environment variable
if [[ -n "${GPG_PASSPHRASE:-}" ]]; then
    echo "📝 Using GPG passphrase from environment variable"
    PASSPHRASE_ARG="-Dgpg.passphrase=${GPG_PASSPHRASE}"
else
    # Check if passphrase is in settings file
    if grep -q "gpg.passphrase" maven-settings.xml && ! grep -q "YOUR_GPG_PASSPHRASE" maven-settings.xml; then
        echo "📝 Using GPG passphrase from maven-settings.xml"
        PASSPHRASE_ARG=""
    else
        echo "🔑 Enter your GPG passphrase:"
        read -s GPG_PASSPHRASE
        PASSPHRASE_ARG="-Dgpg.passphrase=${GPG_PASSPHRASE}"
    fi
fi

# Build Maven command based on authentication method
MAVEN_CMD="mvn clean deploy -Prelease"

if [[ "$USE_ENV_CREDENTIALS" == "true" ]]; then
    # Create temporary settings file with environment credentials
    TEMP_SETTINGS=$(mktemp -t maven-settings-XXXXXX.xml)
    cat > "$TEMP_SETTINGS" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0">
  <servers>
    <server>
      <id>central</id>
      <username>${MAVEN_CENTRAL_USERNAME}</username>
      <password>${MAVEN_CENTRAL_PASSWORD}</password>
    </server>
  </servers>
</settings>
EOF
    MAVEN_CMD="${MAVEN_CMD} --settings ${TEMP_SETTINGS}"
    echo "📝 Created temporary settings file with environment credentials"
else
    MAVEN_CMD="${MAVEN_CMD} --settings maven-settings.xml"
fi

# Add GPG passphrase
MAVEN_CMD="${MAVEN_CMD} ${PASSPHRASE_ARG}"

# Deploy to Maven Central
echo
echo "📤 Deploying to Maven Central Portal..."
echo "Command: ${MAVEN_CMD}"
eval "$MAVEN_CMD"

# Cleanup temporary settings file
if [[ "$USE_ENV_CREDENTIALS" == "true" && -f "$TEMP_SETTINGS" ]]; then
    rm -f "$TEMP_SETTINGS"
    echo "🧹 Cleaned up temporary settings file"
fi

echo
echo "✅ Deployment to Central Portal successful!"
echo
echo "📋 Next steps:"
echo "   1. Log into https://central.sonatype.com/"
echo "   2. Navigate to 'Publishing' → 'Deployments'"
echo "   3. Find your deployment (status: VALIDATED)"
echo "   4. Review and click 'Publish'"
echo
echo "   Or set autoPublish=true in pom.xml to publish automatically"
echo
echo "📦 Your artifacts will be available at:"
echo "   https://repo1.maven.org/maven2/co/meshtrade/api/"
echo "   https://search.maven.org/artifact/co.meshtrade/api"
echo
echo "Note: It may take 10-30 minutes for artifacts to appear in search"