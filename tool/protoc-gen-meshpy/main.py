#!/usr/bin/env python3
"""
protoc-gen-meshpy: Generate Python gRPC client wrappers for Meshtrade services.

This is a minimal starting point that just proves the plugin can be called.
"""

import sys
import os

# Add the current directory to Python path so we can import meshpy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from meshpy.plugin import MeshPyPlugin

def main():
    """Entry point for protoc plugin."""
    try:
        plugin = MeshPyPlugin()
        plugin.run()
    except Exception as e:
        # Write error to stderr for debugging
        print(f"protoc-gen-meshpy error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
