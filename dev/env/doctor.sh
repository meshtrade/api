#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."

cd "$ROOT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                 🏥 Meshtrade API Environment Doctor               ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════╝${NC}"
echo
echo "This tool performs a comprehensive health check of your development environment."
echo "It validates all required tools, dependencies, and configurations needed for"
echo "Meshtrade API development across Go, Python, TypeScript, and Java."
echo

# Track results using regular variables instead of associative arrays
result_general=""
result_go=""
result_python=""
result_typescript=""
result_java=""
detail_general=""
detail_go=""
detail_python=""
detail_typescript=""
detail_java=""

# Function to store results
store_result() {
    local env_name="$1"
    local status="$2"
    local output="$3"
    
    case "$env_name" in
        "general") result_general="$status"; detail_general="$output" ;;
        "go") result_go="$status"; detail_go="$output" ;;
        "python") result_python="$status"; detail_python="$output" ;;
        "typescript") result_typescript="$status"; detail_typescript="$output" ;;
        "java") result_java="$status"; detail_java="$output" ;;
    esac
}

# Function to get result
get_result() {
    local env_name="$1"
    case "$env_name" in
        "general") echo "$result_general" ;;
        "go") echo "$result_go" ;;
        "python") echo "$result_python" ;;
        "typescript") echo "$result_typescript" ;;
        "java") echo "$result_java" ;;
    esac
}

# Function to run environment check
run_env_check() {
    local env_name="$1"
    local script_path="$SCRIPT_DIR/${env_name}.sh"
    
    local env_display=$(echo "$env_name" | tr '[:lower:]' '[:upper:]')
    echo -e "${BLUE}┌─ ${env_display} Environment Check ─────────────────────────────────────${NC}"
    
    if [[ -f "$script_path" ]]; then
        if output=$(bash "$script_path" 2>&1); then
            store_result "$env_name" "✅" "$output"
            echo -e "${GREEN}✅ ${env_display} environment: HEALTHY${NC}"
        else
            store_result "$env_name" "❌" "$output"
            echo -e "${RED}❌ ${env_display} environment: ISSUES FOUND${NC}"
        fi
    else
        store_result "$env_name" "⚠️" "Environment check script not found: $script_path"
        echo -e "${YELLOW}⚠️  ${env_display} environment: CHECK SCRIPT MISSING${NC}"
    fi
    echo -e "${BLUE}└────────────────────────────────────────────────────────────────${NC}"
    echo
}

# Function to check general prerequisites  
check_general_prereqs() {
    echo -e "${BLUE}┌─ General Prerequisites ──────────────────────────────────────────${NC}"
    
    local all_good=true
    
    # Check buf CLI
    if command -v buf &> /dev/null; then
        BUF_VERSION=$(buf --version 2>&1 | head -1 || echo "unknown")
        echo -e "${GREEN}✅ buf CLI: $BUF_VERSION${NC}"
    else
        echo -e "${RED}❌ buf CLI: NOT FOUND${NC}"
        echo "   Install with: brew install bufbuild/buf/buf"
        all_good=false
    fi
    
    # Check git
    if command -v git &> /dev/null; then
        GIT_VERSION=$(git --version | cut -d' ' -f3)
        echo -e "${GREEN}✅ git: $GIT_VERSION${NC}"
    else
        echo -e "${RED}❌ git: NOT FOUND${NC}"
        all_good=false
    fi
    
    # Check basic directories
    if [[ -d "$ROOT_DIR/proto/meshtrade" ]]; then
        echo -e "${GREEN}✅ protobuf definitions: FOUND${NC}"
    else
        echo -e "${RED}❌ protobuf definitions: NOT FOUND${NC}"
        echo "   Expected: $ROOT_DIR/proto/meshtrade/"
        all_good=false
    fi
    
    if [[ -d "$ROOT_DIR/tool" ]]; then
        echo -e "${GREEN}✅ code generators: FOUND${NC}"
    else
        echo -e "${RED}❌ code generators: NOT FOUND${NC}"
        echo "   Expected: $ROOT_DIR/tool/"
        all_good=false
    fi
    
    if $all_good; then
        store_result "general" "✅" "All general prerequisites are satisfied"
    else
        store_result "general" "❌" "Some general prerequisites are missing"
    fi
    
    echo -e "${BLUE}└────────────────────────────────────────────────────────────────${NC}"
    echo
}

# Run all checks
echo "🔍 Checking general prerequisites..."
check_general_prereqs

echo "🔍 Checking language-specific environments..."
echo

# Check each environment
run_env_check "go"
run_env_check "python"
run_env_check "typescript"
run_env_check "java"

# Summary
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                           📋 Health Summary                       ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════╝${NC}"
echo

# Count results
healthy=0
issues=0
warnings=0

# Count each result
for env in "general" "go" "python" "typescript" "java"; do
    result=$(get_result "$env")
    case "$result" in
        "✅") ((healthy++)) ;;
        "❌") ((issues++)) ;;
        "⚠️") ((warnings++)) ;;
    esac
done

echo "Environment Health Report:"
echo "├─ $(get_result "general") General Prerequisites"
echo "├─ $(get_result "go") Go Environment"  
echo "├─ $(get_result "python") Python Environment"
echo "├─ $(get_result "typescript") TypeScript Environment"
echo "└─ $(get_result "java") Java Environment"
echo

if [[ $issues -eq 0 && $warnings -eq 0 ]]; then
    echo -e "${GREEN}🎉 ALL SYSTEMS GREEN! Your environment is ready for development.${NC}"
    exit_code=0
elif [[ $issues -eq 0 ]]; then
    echo -e "${YELLOW}⚠️  MOSTLY HEALTHY with $warnings warnings. Development should work fine.${NC}"
    exit_code=0
else
    echo -e "${RED}💥 ISSUES DETECTED! $issues environments have problems that need attention.${NC}"
    exit_code=1
fi

echo
echo "Environment Statistics:"
echo "├─ 🟢 Healthy: $healthy"
echo "├─ 🟡 Warnings: $warnings"  
echo "└─ 🔴 Issues: $issues"

# Show detailed output for failed checks if requested
if [[ "${1:-}" == "--verbose" ]] || [[ "${1:-}" == "-v" ]] || [[ $issues -gt 0 ]]; then
    echo
    echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                         📝 Detailed Results                       ║${NC}"
    echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════╝${NC}"
    
    # Function to get detail
    get_detail() {
        local env_name="$1"
        case "$env_name" in
            "general") echo "$detail_general" ;;
            "go") echo "$detail_go" ;;
            "python") echo "$detail_python" ;;
            "typescript") echo "$detail_typescript" ;;
            "java") echo "$detail_java" ;;
        esac
    }
    
    for env in "general" "go" "python" "typescript" "java"; do
        result=$(get_result "$env")
        if [[ "$result" != "✅" ]] || [[ "${1:-}" == "--verbose" ]] || [[ "${1:-}" == "-v" ]]; then
            echo
            env_upper=$(echo "$env" | tr '[:lower:]' '[:upper:]')
            echo -e "${BLUE}▼ ${env_upper} Environment Details:${NC}"
            get_detail "$env" | sed 's/^/  /'
        fi
    done
fi

echo
if [[ $exit_code -eq 0 ]]; then
    echo -e "${GREEN}✅ Environment check completed successfully!${NC}"
    echo "You can now run code generation and builds:"
    echo "  ./dev/tool.sh all"
else
    echo -e "${RED}❌ Environment check failed!${NC}"
    echo "Please fix the issues above before proceeding."
    echo
    echo "💡 Quick fixes:"
    echo "  • Missing tools: Check install commands above"
    echo "  • Python env: source .venv/bin/activate && pip install -e \".[dev]\""
    echo "  • Node deps: yarn install"
    echo "  • Java setup: export JAVA_HOME and PATH (see messages above)"
fi

exit $exit_code