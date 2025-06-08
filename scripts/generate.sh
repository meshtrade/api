#!/usr/bin/env bash
set -Eeuo pipefail

# go clean
find ./go \
  \( -name '*.pb.go' \) \
  -print0 | xargs -0 -P 4 -n 1 rm -v

# python clean
rm -rf python_build || true
find ./python/lib \
  \( -name '*_pb.py' \) \
  -print0 | xargs -0 -P 4 -n 1 rm -v

# full buf generate
buf generate

##                                  ##
## Python generation post processig ##
##                                  ##

# Find all files in the python_build directory that end with .py
# For each file found, execute the 'mv' command to rename it.
# The new name is created by removing the original '.py' suffix and appending '_pb.py'.
echo "Python Post Process: 1. Renaming .py files to _pb.py in ./python_build/"
find ./python_build -type f -name "*.py" -not -name "__init__.py" -exec bash -c 'mv "$0" "${0%.py}_pb.py"' {} \;
echo "Python Post Process: File renaming complete."

# - find each file matching v*_pb.py
# - use version to create version directory
# - put versioned file in that directory
find python_build/mesh -type f -name "v*_pb.py" -exec sh -c '
    # For each file found, this script is executed.
    # The full path to the file is passed in as the first argument "$0".
    file_path="$0"

    # --- 1. Determine Paths ---
    parent_dir=$(dirname "$file_path")      # e.g., "python_build/mesh/account"
    filename=$(basename "$file_path")       # e.g., "v1_pb.py"
    version_dir_name=${filename%_pb.py}     # e.g., "v1"
    new_dir_path="$parent_dir/$version_dir_name" # e.g., "python_build/mesh/account/v1"
    
    echo "Processing: $file_path"

    # --- 2. Create Directory and Move File ---
    mkdir -p "$new_dir_path"
    mv "$file_path" "$new_dir_path/"
    echo "  -> Moved to $new_dir_path/"

    # --- 3. Add Standard Files ---
    # `touch` creates empty files but does not overwrite them if they already exist.
    touch "$new_dir_path/__init__.py"
    touch "$new_dir_path/README.md"
    echo "  -> Ensured __init__.py and README.md exist."

' {} \;

echo -e "\nDirectory reorganization complete. ✨"

# Use rsync to recursively copy files (-a for archive mode, -v for verbose).
# The --exclude flag prevents any file named '__init__.py' from being copied.
echo "Python Post Process: 2. Syncing compiled python files back into source directory..."
rsync -av --ignore-existing ./python_build/mesh/ ./python/lib/

echo "Python Post Process: 3. Cleaning up build directory..."
# rm -rf ./python_build

##                                  ##
## Other. generation post processig ##
##                                  ##

echo "Build and sync process finished successfully."

