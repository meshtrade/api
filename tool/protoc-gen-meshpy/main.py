#!/usr/bin/env python3
"""
protoc-gen-meshpy: Python gRPC client generator for Meshtrade services

This protoc plugin generates Python gRPC clients with the _meshpy.py suffix.
"""

import sys
import ast
import os
import re
from pathlib import Path
from google.protobuf.compiler import plugin_pb2 as plugin
from google.protobuf import descriptor_pb2 as descriptor
from jinja2 import Environment, FileSystemLoader


def validate_python_syntax(code: str, filename: str) -> None:
    """Validate Python code syntax using ast.parse()"""
    try:
        ast.parse(code)
    except SyntaxError as e:
        raise SyntaxError(f"Generated Python code has syntax error in {filename}: {e}")


def camel_to_snake(name: str) -> str:
    """Convert CamelCase to snake_case."""
    # Insert underscore before uppercase letters that follow lowercase letters
    s1 = re.sub('([a-z0-9])([A-Z])', r'\1_\2', name)
    return s1.lower()


def get_proto_file_base(proto_file_name: str) -> str:
    """Get the base name for protobuf imports (e.g., 'service.proto' -> 'service')."""
    return Path(proto_file_name).stem


def analyze_service_methods(service):
    """Analyze service methods and extract metadata."""
    methods = []
    for method in service.method:
        method_info = {
            'name': method.name,
            'snake_name': camel_to_snake(method.name),
            'input_type': method.input_type,
            'output_type': method.output_type,
            'client_streaming': method.client_streaming,
            'server_streaming': method.server_streaming
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
    
    # Add imports for message types used in service methods
    for method in service.method:
        # Extract message type names from fully qualified names
        input_type = method.input_type.split('.')[-1] if method.input_type else None
        output_type = method.output_type.split('.')[-1] if method.output_type else None
        
        # For now, assume all types are in the same proto file
        # In Phase 4, we can enhance this to handle cross-file imports
    
    return sorted(list(imports))


def setup_jinja_environment():
    """Set up Jinja2 environment with template directory"""
    # Get the directory where this script is located
    script_dir = Path(__file__).parent
    template_dir = script_dir / "templates"
    
    if not template_dir.exists():
        raise FileNotFoundError(f"Template directory not found: {template_dir}")
    
    # Create Jinja2 environment
    env = Environment(
        loader=FileSystemLoader(template_dir),
        trim_blocks=True,
        lstrip_blocks=True,
        keep_trailing_newline=True
    )
    
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
        raise RuntimeError(f"Error rendering template {template_name}: {e}")


def process_service(proto_file, service, template_env):
    """Process a single service and generate files for it"""
    service_name = service.name
    package_name = proto_file.package
    
    files = []
    
    # Analyze service methods and extract metadata
    methods = analyze_service_methods(service)
    imports = extract_imports_from_proto(proto_file, service)
    
    # Create enhanced context for template rendering
    context = {
        'service_name': service_name,
        'package_name': package_name,
        'service': service,
        'proto_file': proto_file,
        'methods': methods,
        'imports': imports,
        'proto_base': get_proto_file_base(proto_file.name),
        'camel_to_snake': camel_to_snake
    }
    
    # Generate the three main files with _meshpy.py suffix
    file_configs = [
        ("service_meshpy.py.j2", "service"),
        ("service_grpc_client_options_meshpy.py.j2", "service_grpc_client_options"),
        ("service_grpc_client_meshpy.py.j2", "service_grpc_client")
    ]
    
    for template_name, file_type in file_configs:
        # Convert package name to path (e.g., "meshtrade.iam.api_user.v1" -> "meshtrade/iam/api_user/v1")
        package_path = package_name.replace('.', '/')
        filename = f"{package_path}/{file_type}_meshpy.py"
        content = render_template(template_env, template_name, context)
        
        files.append(plugin.CodeGeneratorResponse.File(
            name=filename,
            content=content
        ))
    
    return files


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
        
        # Process each proto file that contains services
        for proto_file in request.proto_file:
            if len(proto_file.service) > 0:
                # For now, only process files with exactly one service (matching Go generator)
                if len(proto_file.service) > 1:
                    response.error = f"File '{proto_file.name}' contains more than 1 service"
                    break
                
                service = proto_file.service[0]
                generated_files = process_service(proto_file, service, template_env)
                response.file.extend(generated_files)
        
        response.supported_features = plugin.CodeGeneratorResponse.FEATURE_PROTO3_OPTIONAL
        
    except Exception as e:
        response.error = f"Error in protoc-gen-meshpy: {e}"
    
    # Write response to stdout
    sys.stdout.buffer.write(response.SerializeToString())


if __name__ == "__main__":
    main()
