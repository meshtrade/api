#!/usr/bin/env bash
set -Eeuo pipefail

# CI/CD-optimized deployment script for Maven Central
# Designed for GitHub Actions and other CI systems

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/.."

trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: CI deployment failed!"
  exit "$exit_code"
}

cd "$ROOT_DIR"

echo "🚀 Maven Central CI/CD Deployment"
echo "=================================="
echo

# Validate required environment variables
REQUIRED_VARS=("MAVEN_CENTRAL_USERNAME" "MAVEN_CENTRAL_PASSWORD" "GPG_PASSPHRASE")
for var in "${REQUIRED_VARS[@]}"; do
    if [[ -z "${!var:-}" ]]; then
        echo "❌ ERROR: Required environment variable $var is not set!"
        echo "   Set all required variables: ${REQUIRED_VARS[*]}"
        exit 1
    fi
done

echo "✅ All required environment variables are set"

# Import GPG key from environment if available
if [[ -n "${GPG_PRIVATE_KEY:-}" ]]; then
    echo "🔑 Importing GPG key from environment..."
    echo "$GPG_PRIVATE_KEY" | base64 -d | gpg --batch --import --quiet
    gpg --list-secret-keys --keyid-format LONG
    echo "✅ GPG key imported successfully"
else
    echo "⚠️  No GPG_PRIVATE_KEY found in environment"
    echo "   Assuming GPG key is already configured"
fi

# Check GPG is available
if ! command -v gpg &> /dev/null; then
    echo "❌ ERROR: GPG is not installed!"
    echo "   Install with: apt-get install gnupg (Ubuntu) or yum install gnupg2 (RHEL)"
    exit 1
fi

# Ensure code is generated
echo
echo "🔍 Checking for generated Java code..."
if [[ ! -d "java/src/main/java/co/meshtrade/api/iam" ]]; then
    echo "⚠️  Generated code not found, running generation..."
    ./dev/tool.sh generate --targets=java
else
    echo "✅ Generated Java code found"
fi

# Run tests first (fail fast)
echo
echo "🧪 Running tests..."
if ! ./dev/test/java.sh; then
    echo "❌ Tests failed! Cannot deploy failing code."
    exit 1
fi

# Create temporary Maven settings
echo
echo "🔧 Creating Maven settings with environment credentials..."
TEMP_SETTINGS=$(mktemp -t maven-settings-ci-XXXXXX.xml)
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

echo "📝 Temporary settings created: $TEMP_SETTINGS"

# Deploy to Maven Central
echo
echo "📤 Deploying to Maven Central Portal..."

# Enable automatic publishing for CI/CD (can be overridden with AUTO_PUBLISH=false)
AUTO_PUBLISH_FLAG=""
if [[ "${AUTO_PUBLISH:-true}" == "true" ]]; then
    echo "🤖 Automatic publishing enabled"
    AUTO_PUBLISH_FLAG="-Dauto.publish=true"
else
    echo "👤 Manual publishing mode (will require portal review)"
fi

mvn clean deploy -Prelease \
    --settings "$TEMP_SETTINGS" \
    -Dgpg.passphrase="$GPG_PASSPHRASE" \
    -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn \
    -B \
    $AUTO_PUBLISH_FLAG

# Cleanup
rm -f "$TEMP_SETTINGS"
echo "🧹 Cleaned up temporary settings"

echo
echo "✅ CI/CD Deployment successful!"
echo
if [[ "${AUTO_PUBLISH:-true}" == "true" ]]; then
    echo "🎉 Artifacts automatically published to Maven Central!"
    echo "📦 Available at: https://repo1.maven.org/maven2/co/meshtrade/api/"
    echo "🔍 Search: https://search.maven.org/artifact/co.meshtrade/api"
    echo ""
    echo "Note: May take 10-30 minutes to appear in search results"
else
    echo "📋 Next steps:"
    echo "   1. Log into https://central.sonatype.com/"
    echo "   2. Navigate to 'Publishing' → 'Deployments'"
    echo "   3. Find your deployment and click 'Publish'"
fi

echo
echo "############################################################"
echo "#                                                          #"
echo "#  🎉 Maven Central deployment complete!  📦             #"
echo "#                                                          #"
echo "############################################################"