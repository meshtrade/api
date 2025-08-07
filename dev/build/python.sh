#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."
trap 'handle_error $LINENO' ERR

handle_error() {
  local exit_code=$?
  local line_number=$1
  echo
  echo "❌ ERROR in $(basename "$0") on line $line_number: PYTHON BUILD FAILED!!"
  exit "$exit_code"
}

echo "🐍 Building Python SDK..."

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

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo "🔧 Creating Python virtual environment..."
    python -m venv .venv
    echo
fi

echo "🔧 Activating virtual environment..."
source .venv/bin/activate

echo "📦 Installing Python dependencies..."
pip install -e .[dev] --quiet

# Version bumping logic
if [ "$BUMP_VERSION" = true ]; then
    echo "📝 Bumping version..."
    CURRENT_VERSION=$(grep '^version = ' pyproject.toml | cut -d'"' -f2)
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
    
    # Update pyproject.toml
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/^version = \".*\"/version = \"$NEW_VERSION\"/" pyproject.toml
    else
        # Linux
        sed -i "s/^version = \".*\"/version = \"$NEW_VERSION\"/" pyproject.toml
    fi
    
    echo "  ✅ Version updated to $NEW_VERSION"
fi

echo "🧪 Running Python tests..."
export PYTHONPATH="./python/src:./python/tests"
pytest python/tests --quiet

echo "🚀 Python linting and formatting..."
ruff check . --fix --quiet
ruff format . --quiet

echo "📦 Building distribution packages..."
# Clean ALL previous builds (including any in root dist/)
echo "  🧹 Cleaning previous builds..."
rm -rf ./dist ./build ./python/dist ./python/build ./python/src/*.egg-info ./src/*.egg-info *.egg-info

# Build source distribution and wheel
echo "  🔨 Creating distribution packages..."
python -m build --outdir ./python/dist

echo "  ✅ Distribution packages created:"
ls -la ./python/dist/

echo
echo "############################################################"
echo "#                                                          #"
echo "#  🎉 Python SDK build complete!  🐍                      #"
echo "#                                                          #"
echo "#  Distribution packages ready in ./python/dist/          #"
echo "#                                                          #"
echo "#  To publish to PyPI:                                    #"
echo "#  1. Bump version: ./dev/build/python.sh --bump-version  #"
echo "#  2. Upload: twine upload ./python/dist/*                #"
echo "#                                                          #"
echo "############################################################"