#!/usr/bin/env bash
set -Eeuo pipefail

# this script turns this (the output of the `buf generate` command with python plugin)...
#
# └── python_build
#     └── mesh
#         ├── account
#         │   └── v1
#         │       ├── account_pb2.py
#         │       ├── account_pb2.pyi
#         │       ├── service_pb2.py
#         │       └── service_pb2.pyi
#         └── iam
#             └── v1
#                 ├── permission_pb2.py
#                 ├── permission_pb2.pyi
#                 ├── role_pb2.py
#                 └── role_pb2.pyi
#
# ...into this (the layout of our distributable python sdk libraries)
# 
# └── python_build
#     └── mesh
#         ├── account
#         │   └── v1
#         │       └── mesh_account_v1
#         │           ├── account_pb2.py
#         │           ├── account_pb2.pyi
#         │           ├── service_pb2.py
#         │           └── service_pb2.pyi
#         └── iam
#             └── v1
#                 └── mesh_iam_v1
#                     ├── permission_pb2.py
#                     ├── permission_pb2.pyi
#                     ├── role_pb2.py
#                     └── role_pb2.pyi

# Define the base directory to start from.
BASE_DIR="python_build/mesh"

echo "Python Post Processing '$BASE_DIR'..."

# --- Safety Check ---
# Check if the base directory exists before proceeding.
if [ ! -d "$BASE_DIR" ]; then
    echo "Error: Base directory '$BASE_DIR' not found."
    echo "Please run this script from your project root after 'buf generate'."
    exit 1
fi

# --- Main Logic ---
# Loop through each service directory (e.g., 'account', 'iam') in the base directory.
# The trailing slash ensures that we only match directories.
for service_path in "$BASE_DIR"/*/; do
    # Extract just the directory name (e.g., 'account') from the full path.
    service_name=$(basename "$service_path")

    # Now, loop through each versioned subdirectory (e.g., 'v1', 'v2') inside the service path.
    # The 'v*' pattern matches any directory starting with 'v'.
    for version_path in "$service_path"v*/; do
        # Check if any versioned directories were found. If not, the loop might run once
        # with a non-existent path, so we check for that.
        if [ ! -d "$version_path" ]; then continue; fi

        # Extract just the version name (e.g., 'v1') from the version path.
        version_name=$(basename "$version_path")

        # --- 1. Create the new destination directory ---
        new_dir_name="mesh_${service_name}_${version_name}"
        full_new_path="${version_path}${new_dir_name}"
        mkdir -p "$full_new_path"
        echo "Created: $full_new_path"

        # --- 2. Move all other files into the new directory ---
        # Loop through all files and directories in the version path.
        for item_to_move in "$version_path"*; do
            # This check handles the case where a directory is empty (except for subdirs).
            if [ ! -e "$item_to_move" ]; then continue; fi

            item_basename=$(basename "$item_to_move")
            
            # Make sure we don't try to move the new directory into itself.
            if [ "$item_basename" != "$new_dir_name" ]; then
                mv "$item_to_move" "$full_new_path/"
                echo "  -> Moved '$item_basename' into '$new_dir_name'"
            fi
        done
        echo "Finished processing $version_path"
        echo "---"
    done
done

# Finally use rsync to recursively copy files (-a for archive mode, -v for verbose).
echo "Python Post Process: Syncing compiled python files back into source directory..."
rsync -av --ignore-existing ./python_build/mesh/ ./python/lib/

# and remove the temporary build directory
rm -rf python_build