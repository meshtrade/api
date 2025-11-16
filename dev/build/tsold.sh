#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: TYPESCRIPT (LEGACY) BUILD FAILED!!"
  exit "$exit_code"
}

echo "📦 Building TypeScript (Legacy) SDK..."

# Parse command line arguments
BUMP_VERSION=false
while [[ $# -gt 0 ]]; do
    case $1 in
        --bump-version)
            BUMP_VERSION=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [--bump-version]"
            exit 1
            ;;
    esac
done

# Ensure we're in the root directory
cd "$ROOT_DIR"

echo "📦 Installing TypeScript (Legacy) dependencies..."
cd ts-old
yarn install --frozen-lockfile

# Version bumping logic
if [ "$BUMP_VERSION" = true ]; then
    echo "📝 Bumping version..."
    CURRENT_VERSION=$(grep '"version":' package.json | head -1 | cut -d'"' -f4)
    echo "  Current version: $CURRENT_VERSION"

    # Split version into parts
    IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
    MAJOR=${VERSION_PARTS[0]}
    MINOR=${VERSION_PARTS[1]}
    PATCH=${VERSION_PARTS[2]}

    # Increment patch version
    NEW_PATCH=$((PATCH + 1))
    NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"

    echo "  New version: $NEW_VERSION"

    # Update package.json
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" package.json
    else
        # Linux
        sed -i "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" package.json
    fi

    echo "  ✅ Version updated to $NEW_VERSION"
fi

echo "🚀 Building TypeScript (Legacy) library..."
yarn build

echo "🧪 Running TypeScript (Legacy) tests..."
yarn test

echo "🚀 Linting TypeScript (Legacy) code..."
yarn lint

echo "✅ Build artifacts ready in ./dist/"
ls -la dist/ | head -10

cd ..

echo
echo "############################################################"
echo "#                                                          #"
echo "#  🎉 TypeScript (Legacy) SDK build complete!  📦        #"
echo "#                                                          #"
echo "#  Build artifacts in ./ts-old/dist/                      #"
echo "#                                                          #"
echo "#  To publish to npm:                                     #"
echo "#  1. Bump version: ./dev/build/tsold.sh --bump-version   #"
echo "#  2. Publish: cd ts-old && yarn publish --access public  #"
echo "#                                                          #"
echo "############################################################"
