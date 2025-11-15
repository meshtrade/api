#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
ROOT_DIR="$SCRIPT_DIR/../.."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

cd "$ROOT_DIR"

# Parse command line arguments
TARGETS="go,python,typescript,java"
VERBOSE=false
FAIL_FAST=false

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
        --fail-fast)
            FAIL_FAST=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [options]"
            echo
            echo "Options:"
            echo "  -t, --targets=LIST    Comma-separated list of targets to test"
            echo "                        Available: go, python, typescript, java"
            echo "                        Default: all targets"
            echo "  -v, --verbose         Enable verbose output"
            echo "      --fail-fast       Stop on first test failure"
            echo "  -h, --help           Show this help message"
            echo
            echo "Examples:"
            echo "  $0                                    # Test all languages"
            echo "  $0 --targets=python,java             # Test only Python and Java"
            echo "  $0 --targets=typescript --verbose    # Test TypeScript with verbose output"
            echo "  $0 --fail-fast                       # Stop on first failure"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Convert targets to array
IFS=',' read -ra TARGET_ARRAY <<< "$TARGETS"

# Normalize target names (handle aliases)
declare -a NORMALIZED_TARGETS
for target in "${TARGET_ARRAY[@]}"; do
    target=$(echo "$target" | xargs) # trim whitespace
    case "$target" in
        "ts") NORMALIZED_TARGETS+=("typescript") ;;
        "ts-old") NORMALIZED_TARGETS+=("tsold") ;;
        "py") NORMALIZED_TARGETS+=("python") ;;
        *) NORMALIZED_TARGETS+=("$target") ;;
    esac
done

echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    🧪 Meshtrade API Test Suite                   ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════╝${NC}"
echo
echo "Running comprehensive test suite for the Meshtrade API"
echo "Testing targets: ${NORMALIZED_TARGETS[*]}"
echo

# Track results using regular variables
result_go=""
duration_go=""
result_python=""
duration_python=""
result_typescript=""
duration_typescript=""
result_tsold=""
duration_tsold=""
result_java=""
duration_java=""
failed_targets=""
start_time=$(date +%s)

# Functions to store and retrieve results
store_result() {
    local target="$1"
    local status="$2"
    local duration="$3"

    case "$target" in
        "go") result_go="$status"; duration_go="$duration" ;;
        "python") result_python="$status"; duration_python="$duration" ;;
        "typescript") result_typescript="$status"; duration_typescript="$duration" ;;
        "tsold") result_tsold="$status"; duration_tsold="$duration" ;;
        "java") result_java="$status"; duration_java="$duration" ;;
    esac
}

get_result() {
    local target="$1"
    case "$target" in
        "go") echo "$result_go" ;;
        "python") echo "$result_python" ;;
        "typescript") echo "$result_typescript" ;;
        "tsold") echo "$result_tsold" ;;
        "java") echo "$result_java" ;;
    esac
}

get_duration() {
    local target="$1"
    case "$target" in
        "go") echo "$duration_go" ;;
        "python") echo "$duration_python" ;;
        "typescript") echo "$duration_typescript" ;;
        "tsold") echo "$duration_tsold" ;;
        "java") echo "$duration_java" ;;
    esac
}

add_failed_target() {
    local target="$1"
    if [[ -z "$failed_targets" ]]; then
        failed_targets="$target"
    else
        failed_targets="$failed_targets $target"
    fi
}

# Function to run tests for a specific target
run_target_tests() {
    local target="$1"
    local script_path="$SCRIPT_DIR/${target}.sh"
    
    local target_upper=$(echo "$target" | tr '[:lower:]' '[:upper:]')
    echo -e "${BLUE}┌─ Testing ${target_upper} ─────────────────────────────────────────────────${NC}"
    
    if [[ ! -f "$script_path" ]]; then
        echo -e "${RED}❌ Test script not found: $script_path${NC}"
        store_result "$target" "❌" "0s"
        add_failed_target "$target"
        return 1
    fi
    
    local target_start=$(date +%s)
    
    if $VERBOSE; then
        bash "$script_path"
        local exit_code=$?
    else
        local output
        if output=$(bash "$script_path" 2>&1); then
            local exit_code=0
        else
            local exit_code=$?
        fi
    fi
    
    local target_end=$(date +%s)
    local target_duration=$((target_end - target_start))
    
    if [[ $exit_code -eq 0 ]]; then
        store_result "$target" "✅" "${target_duration}s"
        echo -e "${GREEN}✅ ${target_upper} tests: PASSED${NC}"
    else
        store_result "$target" "❌" "${target_duration}s"
        add_failed_target "$target"
        echo -e "${RED}❌ ${target_upper} tests: FAILED${NC}"
        
        if ! $VERBOSE && [[ -n "${output:-}" ]]; then
            echo -e "${YELLOW}Last few lines of output:${NC}"
            echo "$output" | tail -10 | sed 's/^/  /'
            echo
        fi
        
        if $FAIL_FAST; then
            echo -e "${RED}💥 Stopping due to --fail-fast flag${NC}"
            return 1
        fi
    fi
    
    echo -e "${BLUE}└─────────────────────────────────────────────────────────────────${NC}"
    echo
    
    return $exit_code
}

# Run tests for each target
echo "🚀 Starting test execution..."
echo

overall_success=true

for target in "${NORMALIZED_TARGETS[@]}"; do
    case "$target" in
        "go"|"python"|"typescript"|"tsold"|"java")
            if ! run_target_tests "$target"; then
                overall_success=false
                if $FAIL_FAST; then
                    break
                fi
            fi
            ;;
        *)
            echo -e "${RED}❌ Unknown target: $target${NC}"
            echo "   Available targets: go, python, typescript, tsold, java"
            overall_success=false
            ;;
    esac
done

# Calculate total duration
end_time=$(date +%s)
total_duration=$((end_time - start_time))

# Summary
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                         📊 Test Results Summary                   ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════╝${NC}"
echo

echo "Test Results:"
for target in "${NORMALIZED_TARGETS[@]}"; do
    result=$(get_result "$target")
    duration=$(get_duration "$target")
    if [[ -n "$result" ]]; then
        target_upper=$(echo "$target" | tr '[:lower:]' '[:upper:]')
        echo "├─ $result $target_upper ($duration)"
    fi
done
echo

# Calculate statistics
passed=0
failed=0
for target in "${NORMALIZED_TARGETS[@]}"; do
    result=$(get_result "$target")
    if [[ "$result" == "✅" ]]; then
        ((passed++))
    elif [[ "$result" == "❌" ]]; then
        ((failed++))
    fi
done

echo "Statistics:"
echo "├─ 🟢 Passed: $passed"
echo "├─ 🔴 Failed: $failed"
echo "├─ ⏱️  Total Duration: ${total_duration}s"
echo "└─ 🎯 Success Rate: $(( passed * 100 / (passed + failed) ))%"

if $overall_success; then
    echo
    echo -e "${GREEN}🎉 ALL TESTS PASSED! Your code is ready for deployment.${NC}"
    echo
    echo "Next steps:"
    echo "  • Ready to build: ./dev/tool.sh build"
    echo "  • Ready to commit: git add -A && git commit"
    echo "  • Check deployment: ./dev/env/doctor.sh"
    exit_code=0
else
    echo
    echo -e "${RED}💥 SOME TESTS FAILED!${NC}"
    if [[ -n "$failed_targets" ]]; then
        echo "Failed targets: $failed_targets"
    fi
    echo
    echo "💡 Troubleshooting:"
    echo "  • Run individual tests: ./dev/test/<target>.sh"
    echo "  • Check environment: ./dev/env/doctor.sh"
    echo "  • View verbose output: $0 --targets=${TARGETS} --verbose"
    exit_code=1
fi

exit $exit_code