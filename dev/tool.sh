#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/.."

# Default values
COMMAND=""
TARGETS=""
VERBOSE=false

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Help function
show_help() {
    cat << EOF
╔══════════════════════════════════════════════════════════════════════════════╗
║                       Meshtrade API Development Tool                         ║
╚══════════════════════════════════════════════════════════════════════════════╝

USAGE:
    $0 <command> [options]

COMMANDS:
    generate    Generate code from protobuf definitions
    build       Build SDK packages
    clean       Clean generated files
    all         Run generate + build
    help        Show this help message

OPTIONS:
    -t, --targets=LIST     Comma-separated list of targets
                          Available: go, python, typescript (or ts), java, docs
                          Default: all targets
    -v, --verbose         Enable verbose output

EXAMPLES:
    # Generate code for TypeScript and Python
    $0 generate --targets=typescript,python

    # Build Java SDK only
    $0 build --targets=java

    # Clean all generated files
    $0 clean

    # Generate and build everything
    $0 all

    # Clean, generate, and build TypeScript
    $0 all --targets=ts

TARGETS:
    go         Go SDK (generation only, no build required)
    python     Python SDK with gRPC support
    typescript TypeScript/JavaScript SDK (alias: ts)
    java       Java SDK with gRPC support
    docs       API documentation (MDX format)

ENVIRONMENT REQUIREMENTS:
    Go:         1.21+ (brew install go)
    Python:     3.12+ with active venv (python -m venv .venv)
    Node.js:    18+ with Yarn (brew install node)
    Java:       21 with Maven (brew install openjdk@21 maven)
    Tools:      buf (brew install bufbuild/buf/buf)

DIRECTORY STRUCTURE:
    /dev/
    ├── tool.sh          This orchestration script
    ├── generate/        Code generation scripts
    ├── build/           Build scripts
    ├── clean/           Cleanup scripts
    └── README.md        Detailed documentation

For more information, see: /dev/README.md

EOF
    exit 0
}

# Parse command
if [[ $# -eq 0 ]]; then
    show_help
fi

COMMAND=$1
shift

# Parse remaining arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--targets)
            TARGETS="$2"
            shift 2
            ;;
        --targets=*)
            TARGETS="${1#*=}"
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -h|--help|help)
            show_help
            ;;
        *)
            echo -e "${RED}❌ ERROR: Unknown option: $1${NC}"
            echo
            show_help
            ;;
    esac
done

# Convert targets to array and normalize
NORMALIZED_TARGETS=()

if [[ -n "$TARGETS" ]]; then
    IFS=',' read -ra TARGET_ARRAY <<< "$TARGETS"
    
    for target in "${TARGET_ARRAY[@]}"; do
        # Normalize ts -> typescript
        if [[ "$target" == "ts" ]]; then
            NORMALIZED_TARGETS+=("typescript")
        else
            NORMALIZED_TARGETS+=("$target")
        fi
    done
fi

# If no targets specified, use all
if [[ ${#NORMALIZED_TARGETS[@]} -eq 0 ]]; then
    NORMALIZED_TARGETS=("go" "python" "typescript" "java" "docs")
fi

# Validate targets
VALID_TARGETS=("go" "python" "typescript" "java" "docs")
for target in "${NORMALIZED_TARGETS[@]}"; do
    if [[ ! " ${VALID_TARGETS[@]} " =~ " ${target} " ]]; then
        echo -e "${RED}❌ ERROR: Invalid target: $target${NC}"
        echo "Valid targets: ${VALID_TARGETS[*]}"
        exit 1
    fi
done

# Header
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║               Meshtrade API Development Tool                     ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════╝${NC}"
echo
echo -e "${YELLOW}Command:${NC} $COMMAND"
echo -e "${YELLOW}Targets:${NC} ${NORMALIZED_TARGETS[*]}"
echo

# Execute command
case $COMMAND in
    generate)
        echo -e "${GREEN}🚀 Starting code generation...${NC}"
        echo
        
        for target in "${NORMALIZED_TARGETS[@]}"; do
            if "$SCRIPT_DIR/generate/$target.sh"; then
                echo -e "${GREEN}✅ $target generation complete${NC}"
            else
                echo -e "${RED}❌ $target generation failed${NC}"
                exit 1
            fi
            echo
        done
        
        echo -e "${GREEN}🎉 All code generation completed successfully!${NC}"
        ;;
        
    build)
        echo -e "${GREEN}🏗️  Starting build process...${NC}"
        echo
        
        for target in "${NORMALIZED_TARGETS[@]}"; do
            case $target in
                go)
                    echo -e "${BLUE}ℹ️  Go does not require a separate build step${NC}"
                    ;;
                docs)
                    echo -e "${BLUE}📚 Building documentation site...${NC}"
                    cd "$ROOT_DIR"
                    if yarn build:docs; then
                        echo -e "${GREEN}✅ Documentation build complete${NC}"
                    else
                        echo -e "${RED}❌ Documentation build failed${NC}"
                        exit 1
                    fi
                    ;;
                *)
                    if "$SCRIPT_DIR/build/$target.sh"; then
                        echo -e "${GREEN}✅ $target build complete${NC}"
                    else
                        echo -e "${RED}❌ $target build failed${NC}"
                        exit 1
                    fi
                    ;;
            esac
            echo
        done
        
        echo -e "${GREEN}🎉 All builds completed successfully!${NC}"
        ;;
        
    clean)
        echo -e "${YELLOW}🧹 Starting cleanup process...${NC}"
        echo
        
        if [[ ${#NORMALIZED_TARGETS[@]} -eq 5 ]]; then
            # All targets - use the all.sh script
            if "$SCRIPT_DIR/clean/all.sh"; then
                echo -e "${GREEN}✅ All cleanup complete${NC}"
            else
                echo -e "${RED}❌ Cleanup failed${NC}"
                exit 1
            fi
        else
            # Specific targets
            for target in "${NORMALIZED_TARGETS[@]}"; do
                if "$SCRIPT_DIR/clean/$target.sh"; then
                    echo -e "${GREEN}✅ $target cleanup complete${NC}"
                else
                    echo -e "${RED}❌ $target cleanup failed${NC}"
                    exit 1
                fi
                echo
            done
        fi
        
        echo -e "${GREEN}🎉 Cleanup completed successfully!${NC}"
        ;;
        
    all)
        echo -e "${GREEN}🔄 Running full cycle: clean → generate → build${NC}"
        echo
        
        # Clean
        echo -e "${YELLOW}Step 1/3: Cleaning...${NC}"
        "$0" clean --targets="$TARGETS"
        echo
        
        # Generate
        echo -e "${YELLOW}Step 2/3: Generating...${NC}"
        "$0" generate --targets="$TARGETS"
        echo
        
        # Build
        echo -e "${YELLOW}Step 3/3: Building...${NC}"
        "$0" build --targets="$TARGETS"
        echo
        
        echo -e "${GREEN}🎉 Full cycle completed successfully!${NC}"
        ;;
        
    help)
        show_help
        ;;
        
    *)
        echo -e "${RED}❌ ERROR: Unknown command: $COMMAND${NC}"
        echo
        show_help
        ;;
esac