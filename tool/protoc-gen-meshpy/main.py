#!/usr/bin/env python3
"""
protoc-gen-meshpy: Python gRPC client generator for Meshtrade services

This protoc plugin generates Python gRPC clients with the _meshpy.py suffix.
"""

import ast
import re
import sys
from pathlib import Path

from google.protobuf.compiler import plugin_pb2 as plugin
from jinja2 import Environment, FileSystemLoader


def validate_python_syntax(code: str, filename: str) -> None:
    """Validate Python code syntax using ast.parse()"""
    try:
        ast.parse(code)
    except SyntaxError as e:
        raise SyntaxError(f"Generated Python code has syntax error in {filename}: {e}") from e


def camel_to_snake(name: str) -> str:
    """Convert CamelCase to snake_case."""
    # Insert underscore before uppercase letters that follow lowercase letters
    s1 = re.sub("([a-z0-9])([A-Z])", r"\1_\2", name)
    return s1.lower()


def get_proto_file_base(proto_file_name: str) -> str:
    """Get the base name for protobuf imports (e.g., 'service.proto' -> 'service')."""
    return Path(proto_file_name).stem


def analyze_service_methods(service):
    """Analyze service methods and extract metadata."""
    methods = []
    for method in service.method:
        method_info = {
            "name": method.name,
            "snake_name": camel_to_snake(method.name),
            "input_type": method.input_type,
            "output_type": method.output_type,
            "client_streaming": method.client_streaming,
            "server_streaming": method.server_streaming,
        }
        methods.append(method_info)
    return methods


def extract_imports_from_proto(proto_file, service):
    """Extract required imports for the service."""
    imports = set()

    # Add the main proto file imports
    proto_base = get_proto_file_base(proto_file.name)
    imports.add(f"{proto_base}_pb2")
    imports.add(f"{proto_base}_pb2_grpc")

    # Note: Message type imports are handled separately in process_service
    # to avoid duplication with the imported_types logic

    return sorted(imports)


def setup_jinja_environment():
    """Set up Jinja2 environment with template directory"""
    # Get the directory where this script is located
    script_dir = Path(__file__).parent
    template_dir = script_dir / "templates"

    if not template_dir.exists():
        raise FileNotFoundError(f"Template directory not found: {template_dir}")

    # Create Jinja2 environment
    env = Environment(loader=FileSystemLoader(template_dir), trim_blocks=True, lstrip_blocks=True, keep_trailing_newline=True)

    return env


def render_template(template_env, template_name: str, context: dict) -> str:
    """Render a Jinja2 template with the given context"""
    try:
        template = template_env.get_template(template_name)
        code = template.render(**context)

        # Validate syntax before returning
        validate_python_syntax(code, template_name)
        return code
    except Exception as e:
        raise RuntimeError(f"Error rendering template {template_name}: {e}") from e


def get_import_to_module_mapping(proto_file):
    """Create mapping from imported proto files to their pb2 module names."""
    import_mapping = {}

    for dependency in proto_file.dependency:
        # Convert proto file path to pb2 module name
        # e.g., "meshtrade/iam/group/v1/group.proto" -> "group_pb2"
        if dependency.endswith('.proto'):
            # Get the base name of the proto file
            proto_basename = dependency.split('/')[-1][:-6]  # Remove .proto extension
            pb2_module = f"{proto_basename}_pb2"
            import_mapping[dependency] = pb2_module

    return import_mapping


def analyze_external_types(proto_file, methods):
    """Analyze which types come from external proto files vs the service proto file."""
    service_types = set()  # Types defined in this service proto file
    external_types = {}    # Types from other proto files (type_name -> import_module)

    # Collect all types defined in this service proto file
    for message in proto_file.message_type:
        service_types.add(message.name)

    # Get mapping of imported proto files to pb2 modules
    import_mapping = get_import_to_module_mapping(proto_file)

    # Analyze method input/output types
    all_referenced_types = set()
    for method in methods:
        input_type = method["input_type"].split(".")[-1]
        output_type = method["output_type"].split(".")[-1]
        all_referenced_types.add(input_type)
        all_referenced_types.add(output_type)

    # Categorize types
    for type_name in all_referenced_types:
        if type_name in service_types:
            # Type is defined in the service proto file
            continue
        else:
            # Type must come from an imported proto file
            # Try to find which import it belongs to by matching naming patterns
            type_found = False
            for proto_path, pb2_module in import_mapping.items():
                # Extract the resource name from the proto path
                # e.g., "meshtrade/iam/group/v1/group.proto" -> "group"
                resource_name = proto_path.split('/')[-1][:-6]  # Remove .proto

                # Check if type name matches the resource pattern
                if type_name.lower() == resource_name.lower() or type_name == "APIUser" and resource_name == "api_user":
                    external_types[type_name] = pb2_module
                    type_found = True
                    break

            if not type_found:
                # If we can't find the type in imports, assume it's in service_pb2
                service_types.add(type_name)

    return service_types, external_types


def process_service(proto_file, service, template_env):
    """Process a single service and generate files for it"""
    service_name = service.name
    package_name = proto_file.package

    files = []

    # Analyze service methods and extract metadata
    methods = analyze_service_methods(service)
    imports = extract_imports_from_proto(proto_file, service)

    # Analyze which types are external vs service-defined using dynamic import analysis
    service_types, external_types = analyze_external_types(proto_file, methods)

    # Create documentation URL path from package name
    # Convert "meshtrade.iam.api_user.v1" -> "iam/api_user/v1"
    doc_url_path = package_name.replace("meshtrade.", "").replace(".", "/")

    # Create enhanced context for template rendering
    context = {
        "service_name": service_name,
        "package_name": package_name,
        "service": service,
        "proto_file": proto_file,
        "methods": methods,
        "imports": imports,
        "service_types": sorted(service_types),  # Types from service_pb2
        "external_types": external_types,        # Types from other pb2 files
        "imported_types": sorted(service_types),  # Keep for backward compatibility
        "proto_base": get_proto_file_base(proto_file.name),
        "camel_to_snake": camel_to_snake,
        "doc_url_path": doc_url_path,
    }

    # Generate the two main files with _meshpy.py suffix
    file_configs = [
        ("service_meshpy.py.j2", "service"),
        ("service_options_meshpy.py.j2", "service_options"),
    ]

    for template_name, file_type in file_configs:
        # Convert package name to path (e.g., "meshtrade.iam.api_user.v1" -> "meshtrade/iam/api_user/v1")
        package_path = package_name.replace(".", "/")
        filename = f"{package_path}/{file_type}_meshpy.py"
        content = render_template(template_env, template_name, context)

        files.append(plugin.CodeGeneratorResponse.File(name=filename, content=content))

    return files


def group_files_by_package(proto_files):
    """Group proto files by package path for __init__.py generation."""
    packages = {}
    for proto_file in proto_files:
        if not proto_file.package:
            continue

        package_path = proto_file.package.replace(".", "/")
        if package_path not in packages:
            packages[package_path] = {
                "proto_files": [],
                "has_service": False,
                "service_info": None,
            }

        packages[package_path]["proto_files"].append(proto_file)
        if proto_file.service:
            packages[package_path]["has_service"] = True
            # Take the first service (matching current generator logic)
            if not packages[package_path]["service_info"]:
                packages[package_path]["service_info"] = proto_file.service[0]

    return packages


def extract_protobuf_exports(proto_files):
    """Extract exportable types from protobuf files."""
    imports = []
    exports = []

    for proto_file in proto_files:
        proto_base = get_proto_file_base(proto_file.name)

        # Extract message types
        message_types = []
        for message in proto_file.message_type:
            message_types.append(message.name)
            # Handle nested types if needed in the future
            # for nested in message.nested_type:
            #     message_types.append(f"{message.name}_{nested.name}")

        # Extract enum types
        enum_types = []
        for enum in proto_file.enum_type:
            enum_types.append(enum.name)

        # Check if this proto file defines service request/response types
        service_types = []
        for message in proto_file.message_type:
            # Service request/response types typically end with Request/Response
            if message.name.endswith(("Request", "Response")):
                service_types.append(message.name)

        # Generate imports for this proto file
        all_types = message_types + enum_types
        if all_types:
            # Always use sorted imports for consistency
            sorted_types = sorted(all_types)

            if len(sorted_types) == 1:
                imports.append(f"from .{proto_base}_pb2 import {sorted_types[0]}")
            elif len(sorted_types) <= 3:
                # Short single-line import
                imports.append(f"from .{proto_base}_pb2 import {', '.join(sorted_types)}")
            else:
                # Multi-line import for readability
                imports.append(f"from .{proto_base}_pb2 import (")
                for type_name in sorted_types:
                    imports.append(f"    {type_name},")
                imports.append(")")

            exports.extend(all_types)

    return imports, exports


def extract_service_exports(service_info):
    """Extract exports from generated service files."""
    if not service_info:
        return [], []

    service_name = service_info.name

    imports = [
        "from .service_meshpy import (",
        f"    {service_name},",
        f"    {service_name}GRPCClient,",
        f"    {service_name}GRPCClientInterface,",
        ")",
        "from .service_options_meshpy import ClientOptions",
    ]

    exports = [
        f"{service_name}",
        f"{service_name}GRPCClient",
        f"{service_name}GRPCClientInterface",
        "ClientOptions",
    ]

    return imports, exports


def extract_exports_from_imports(manual_section):
    """Extract exports from manual import statements."""
    if not manual_section:
        return []

    manual_exports = []
    lines = manual_section.split("\n")

    # Track when we're inside a multi-line import
    in_multiline_import = False
    current_import_items = []

    for line in lines:
        stripped = line.strip()

        # Skip comment lines and empty lines
        if stripped.startswith("#") or not stripped:
            continue

        # Handle single-line imports like: from .module import Item
        if stripped.startswith("from ") and " import " in stripped and not stripped.endswith("("):
            # Extract items after "import"
            import_part = stripped.split(" import ", 1)[1]
            items = [item.strip() for item in import_part.split(",")]
            manual_exports.extend(items)
            continue

        # Handle start of multi-line imports: from .module import (
        if stripped.startswith("from ") and stripped.endswith("("):
            in_multiline_import = True
            current_import_items = []
            continue

        # Handle end of multi-line imports: )
        if in_multiline_import and stripped == ")":
            in_multiline_import = False
            manual_exports.extend(current_import_items)
            current_import_items = []
            continue

        # Handle items within multi-line imports
        if in_multiline_import:
            # Remove trailing comma and add to list
            item = stripped.rstrip(",").strip()
            if item:
                current_import_items.append(item)

    return sorted(manual_exports)


def extract_manual_exports(manual_section):
    """Extract manual exports from the existing manual section (legacy function for backward compatibility)."""
    if not manual_section:
        return []

    manual_exports = []
    lines = manual_section.split("\n")
    in_extend_block = False

    for line in lines:
        stripped = line.strip()

        # Skip comment lines and example text
        if stripped.startswith("#") or not stripped:
            continue

        # Look for __all__.extend([
        if "__all__.extend([" in stripped:
            in_extend_block = True
            continue

        # If we're in an extend block, look for string literals
        if in_extend_block:
            if "])" in stripped:
                in_extend_block = False
                continue
            elif '"' in stripped and not stripped.strip().startswith("#"):
                # Extract quoted strings, but skip commented examples
                import re

                matches = re.findall(r'"([^"]*)"', stripped)
                # Filter out common example names
                filtered_matches = [m for m in matches if m not in ["my_function", "my_custom_module"]]
                manual_exports.extend(filtered_matches)

    return sorted(manual_exports)


def read_existing_manual_section(package_path):
    """Read manual section from existing __init__.py file, splitting imports and exports."""
    init_file_path = f"python/src/{package_path}/__init__.py"

    try:
        with open(init_file_path, encoding="utf-8") as f:
            content = f.read()

        # Find the manual section marker (try new format first, then old format)
        manual_markers = [
            "# MANUAL SECTION - ADD YOUR CUSTOM IMPORTS AND EXPORTS BELOW",
            "# MANUAL EXPORTS - ADD CUSTOM IMPORTS BELOW",  # Legacy support
        ]

        manual_start = -1
        for marker in manual_markers:
            manual_start = content.find(marker)
            if manual_start != -1:
                break

        if manual_start == -1:
            return None

        # Find the end of the comment block after the marker
        lines = content[manual_start:].split("\n")
        content_start_idx = 0

        # Skip the marker line and any following comment lines that are part of the header
        for i, line in enumerate(lines):
            stripped = line.strip()
            # Skip empty lines, comment lines, and separator lines
            if stripped and not stripped.startswith("#") and not stripped.startswith("==="):
                content_start_idx = i
                break

        # Find where exports section or auto-generated content starts
        import_end_idx = len(lines)
        for i in range(content_start_idx, len(lines)):
            line = lines[i].strip()
            if (
                line.startswith("# Extend __all__")
                or "__all__.extend([" in line
                or "# MODULE EXPORTS" in line
                or "__all__ = [" in line
                or line.startswith("# Combined auto-generated")
                or
                # Stop at auto-generated imports that leaked into manual section
                line.startswith("from ._pb2 import")
                or line.startswith("from .service_")
                or "_pb2 import" in line
                or "_meshpy import" in line
                or line.startswith("# Generated")
            ):
                import_end_idx = i
                break

        # Extract just the import section (no exports or auto-generated content)
        manual_lines = lines[content_start_idx:import_end_idx]

        # Clean up trailing empty lines and any remaining auto-generated content
        filtered_lines = []
        for line in manual_lines:
            stripped = line.strip()
            # Skip auto-generated imports and separator lines that might have leaked in
            if stripped and not (
                "_pb2 import" in stripped
                or "_meshpy import" in stripped
                or stripped.startswith("from .service_")
                or stripped.startswith("# Generated")
                or stripped == "# ==================================================================="
            ):
                filtered_lines.append(line)

        # Clean up trailing empty lines
        while filtered_lines and not filtered_lines[-1].strip():
            filtered_lines.pop()

        manual_section = "\n".join(filtered_lines).strip()
        return manual_section if manual_section else None

    except (OSError, FileNotFoundError):
        # File doesn't exist or can't be read - this is OK for new packages
        return None


def generate_package_init(package_path, package_info, template_env):
    """Generate __init__.py file for a package."""

    # Extract exports from protobuf files
    protobuf_imports, protobuf_exports = extract_protobuf_exports(package_info["proto_files"])

    # Extract service exports if package has services
    service_imports, service_exports = extract_service_exports(package_info["service_info"])

    # Read existing manual section (imports only)
    existing_manual_section = read_existing_manual_section(package_path)

    # Extract manual exports by parsing the manual imports
    manual_exports = []
    if existing_manual_section:
        manual_exports = extract_exports_from_imports(existing_manual_section)

    # Generate package description
    package_name = package_path.replace("/", ".").split(".")[-2:]  # Get last 2 parts like "api_user v1"
    if len(package_name) >= 2:
        package_description = f"{package_name[0].replace('_', ' ').title()} {package_name[1]} package."
    else:
        package_description = f"{package_path.replace('/', '.')} package."

    # Prepare template context
    context = {
        "package_description": package_description,
        "protobuf_imports": protobuf_imports,
        "service_imports": service_imports,
        "auto_generated_exports": sorted(protobuf_exports + service_exports),
        "manual_exports": manual_exports,
        "existing_manual_section": existing_manual_section,
    }

    # Render template
    content = render_template(template_env, "__init___py.j2", context)

    # Create file entry
    return plugin.CodeGeneratorResponse.File(name=f"{package_path}/__init__.py", content=content)


def main():
    """Main entry point for the protoc plugin"""
    # Read the CodeGeneratorRequest from stdin
    request_data = sys.stdin.buffer.read()
    request = plugin.CodeGeneratorRequest()
    request.ParseFromString(request_data)

    # Create response
    response = plugin.CodeGeneratorResponse()

    try:
        # Set up Jinja2 template environment
        template_env = setup_jinja_environment()

        # Group proto files by package for __init__.py generation
        packages = group_files_by_package(request.proto_file)

        # Process each proto file that contains services (existing logic)
        for proto_file in request.proto_file:
            if len(proto_file.service) > 0:
                # For now, only process files with exactly one service (matching Go generator)
                if len(proto_file.service) > 1:
                    response.error = f"File '{proto_file.name}' contains more than 1 service"
                    break

                service = proto_file.service[0]
                generated_files = process_service(proto_file, service, template_env)
                response.file.extend(generated_files)

        # NEW: Generate __init__.py files for each package
        for package_path, package_info in packages.items():
            # Skip external packages (google, buf) - only generate for meshtrade packages
            if package_path.startswith("google") or package_path.startswith("buf"):
                continue

            init_file = generate_package_init(package_path, package_info, template_env)
            if init_file:
                response.file.append(init_file)

        response.supported_features = plugin.CodeGeneratorResponse.FEATURE_PROTO3_OPTIONAL

    except Exception as e:
        response.error = f"Error in protoc-gen-meshpy: {e}"

    # Write response to stdout
    sys.stdout.buffer.write(response.SerializeToString())


if __name__ == "__main__":
    main()
