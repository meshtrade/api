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
echo "Python Post Process: Renaming .py files to _pb.py in ./python_build/"
find ./python_build -type f -name "*.py" -not -name "__init__.py" -exec bash -c 'mv "$0" "${0%.py}_pb.py"' {} \;

echo "Python Post Process: remove generated __init__.py files"
find ./python_build -name '__init__.py' -print0 | xargs -0 -P 4 -n 1 rm -v

# This script finds all files ending matching v*_pb.py within the python_build/mesh
# directory and its subdirectories. For each file found, it performs the
# following actions:
# 1. Create a versioned directory (e.g., "/python_build/mesh/account/v1").
# 2. Ensure a README.md file exists in the version directory (e.g., "/python_build/mesh/account/v1/README.md").
# 3. Creates an additional subdirectory inside the versioned directory with the
#    format: "mesh_{parent_directory_name}_{version}"
#    (e.g., "/python_build/mesh/account/v1/mesh_account_v1").
# 4. Move the original file into the new subdirectory
#    (e.g. /python_build/mesh/account/v1/mesh_account_v1/v1_pb.py)
echo "Python Post Process: correct directory structure"
find python_build/mesh -type f -name "v*_pb.py" -exec sh -c '
    # This inline script is executed for each file found by `find`.
    # The full path to the file is passed in as the first argument, "$0".
    file_path="$0"

    # --- 1. Determine Paths and Names ---
    parent_dir=$(dirname "$file_path")      # e.g., "python_build/mesh/account"
    filename=$(basename "$file_path")       # e.g., "v1_pb.py"
    version_name=${filename%_pb.py}         # e.g., "v1"
    
    # This is the primary version directory, e.g., "python_build/mesh/account/v1"
    version_dir_path="$parent_dir/$version_name"
    
    echo "Processing: $file_path"

    # --- 2. Create Version Directory ---
    # The -p flag ensures that the command does not fail if the directory already exists.
    mkdir -p "$version_dir_path"
    echo "  -> Ensured version directory exists: $version_dir_path"

    # --- 3. Add README File ---
    # `touch` creates the file but does not overwrite it if it already exists.
    touch "$version_dir_path/README.md"
    echo "  -> Ensured README.md exists."

    # --- 4. Create Additional Subdirectory ---
    # Get the immediate parent directory name, e.g., "account"
    parent_dir_name=$(basename "$parent_dir")

    # Construct the new subdirectory name, e.g., "mesh_account_v1"
    new_sub_dir_name="mesh_${parent_dir_name}_${version_name}"
    
    # Construct the full path for the new subdirectory
    new_sub_dir_path="$version_dir_path/$new_sub_dir_name"

    # Create the new subdirectory
    mkdir -p "$new_sub_dir_path"
    echo "  -> Created subdirectory: $new_sub_dir_path"
    
    # --- 5. Move File into New Subdirectory ---
    mv "$file_path" "$new_sub_dir_path/"
    echo "  -> Moved file to $new_sub_dir_path/"


' {} \;

# Use rsync to recursively copy files (-a for archive mode, -v for verbose).
# The --exclude flag prevents any file named '__init__.py' from being copied.
echo "Python Post Process: Syncing compiled python files back into source directory..."
rsync -av --ignore-existing ./python_build/mesh/ ./python/lib/

echo "Python Post Process: Cleaning up build directory..."
rm -rf ./python_build

##                                  ##
## Other. generation post processig ##
##                                  ##

echo "Build and sync process finished successfully."

