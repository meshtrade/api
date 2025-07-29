#!/usr/bin/env bash
set -e

# Simple Maven Central deployment script
VERSION="${1:-}"

if [ -z "$VERSION" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 0.0.8"
    exit 1
fi

echo "Deploying Meshtrade API Java SDK version $VERSION to Maven Central"
echo

# Check current version in pom
CURRENT_VERSION=$(grep -oP '<version>\K[^<]+' pom.xml | head -1)
if [ "$CURRENT_VERSION" != "$VERSION" ]; then
    echo "Warning: POM version ($CURRENT_VERSION) doesn't match requested version ($VERSION)"
    read -p "Continue with POM version $CURRENT_VERSION? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    VERSION="$CURRENT_VERSION"
fi

# Run tests
echo "Running tests..."
mvn clean test

# Deploy to Central
echo
echo "Deploying to Maven Central..."
mvn clean deploy -P release

echo
echo "Deployment complete!"
echo
echo "Next steps:"
echo "1. Go to https://central.sonatype.com/publishing/deployments"
echo "2. Find your deployment (should show as VALIDATED)"
echo "3. Review and click 'Publish'"
echo
echo "Your artifacts will be available at:"
echo "https://central.sonatype.com/artifact/co.meshtrade/api"