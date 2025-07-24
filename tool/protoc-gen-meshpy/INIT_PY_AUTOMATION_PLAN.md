# __init__.py Automation Plan for protoc-gen-meshpy

## Overview
This document outlines the plan to update the `protoc-gen-meshpy` code generator to automatically generate and maintain `__init__.py` files in Python SDK packages. The goal is to eliminate manual maintenance of exports while preserving the ability to add custom handwritten imports.

## Problem Statement

### Current Issues
1. **Manual Maintenance**: `__init__.py` files are entirely handwritten, requiring manual updates when protobuf definitions change
2. **Per-File Processing**: Code generator processes each `.proto` file independently, but multiple proto files contribute to the same package directory
3. **Export Synchronization**: Risk of forgetting to update exports when generated code changes
4. **Inconsistent Patterns**: Different services have different export patterns and styles

### Current State Analysis
- **Code Generator**: `protoc-gen-meshpy` generates 3 files per service: `service_meshpy.py`, `service_grpc_client_meshpy.py`, `service_grpc_client_options_meshpy.py`
- **Generated Files**: Also have `*_pb2.py` files from protoc
- **Package Structure**: Services organized as `meshtrade/{domain}/{service}/v1/`
- **Current __init__.py Types**:
  - **Simple services** (spot, wallet, etc.): Only generated imports, can be fully automated
  - **Complex services** (api_user): Mix of generated + handwritten imports, need manual section preservation

## Solution: Hybrid Auto-Generated + Manual __init__.py Files

### File Structure Pattern
```python
"""Package description."""

# ===========================================
# AUTO-GENERATED EXPORTS - DO NOT EDIT ABOVE
# ===========================================

# Generated protobuf imports
from .entity_pb2 import Entity, EntityState
from .service_pb2 import (
    GetEntityRequest,
    CreateEntityRequest,
    ListEntitysRequest,
    ListEntitysResponse,
)

# Generated client imports (if service exists)
from .service_meshpy import EntityService
from .service_grpc_client_meshpy import (
    EntityServiceGRPCClient,
    EntityServiceGRPCClientInterface,
)
from .service_grpc_client_options_meshpy import ClientOptions

# Auto-generated __all__ exports
__all__ = [
    # Generated protobuf types
    "Entity",
    "EntityState",
    # Generated request/response types
    "GetEntityRequest",
    "CreateEntityRequest",
    "ListEntitysRequest",
    "ListEntitysResponse",
    # Generated client classes (if service exists)
    "EntityService",
    "EntityServiceGRPCClient",
    "EntityServiceGRPCClientInterface",
    "ClientOptions",
]

# ===========================================
# MANUAL EXPORTS - ADD CUSTOM IMPORTS BELOW
# ===========================================

# Custom handwritten imports go here
from meshtrade.common import (
    DEFAULT_GRPC_PORT,
    DEFAULT_GRPC_URL,
    GRPCClient,
)

from .custom_module import custom_function

# Extend __all__ with manual exports
__all__.extend([
    "DEFAULT_GRPC_PORT",
    "DEFAULT_GRPC_URL", 
    "GRPCClient",
    "custom_function",
])
```

### Key Design Decisions

1. **Clear Boundaries**: Comment markers separate auto-generated from manual sections
2. **Preservation**: Manual section is preserved across regeneration
3. **Extension Pattern**: Manual exports extend the auto-generated `__all__` list
4. **Package Aggregation**: One `__init__.py` per package, regardless of number of proto files
5. **Safety**: Auto-generated section clearly marked "DO NOT EDIT"

## Implementation Plan

### Phase 1: Clean Up Existing __init__.py Files

**Goal**: Restructure existing files to the new format before implementing automation

#### Step 1.1: Categorize Existing Files
- **Simple files**: Only generated imports (can be fully automated)
  - `trading/spot/v1/__init__.py`
  - `trading/limit_order/v1/__init__.py`
  - `trading/direct_order/v1/__init__.py`
  - `wallet/account/v1/__init__.py`
  - `compliance/client/v1/__init__.py`
  - `type/v1/__init__.py`
  - `option/v1/__init__.py`
  - `iam/group/v1/__init__.py`
  - `ledger/transaction/v1/__init__.py`
  - `issuance_hub/instrument/v1/__init__.py`

- **Complex files**: Mixed imports (need manual section)
  - `iam/api_user/v1/__init__.py` - Has handwritten imports from `meshtrade.common` and `api_credentials.py`

#### Step 1.2: Restructure Simple Files
For each simple file:
1. Add new structure with comment markers
2. Move existing imports to auto-generated section (temporary)
3. Leave manual section empty initially

#### Step 1.3: Restructure Complex Files  
For complex files (mainly `api_user/v1`):
1. Add new structure with comment markers
2. Move generated imports (`*_pb2.py`, `*_meshpy.py`) to auto-generated section
3. Move handwritten imports (`meshtrade.common`, `api_credentials.py`) to manual section
4. Split `__all__` appropriately

### Phase 2: Update Code Generator

**Goal**: Add package-level `__init__.py` generation to `protoc-gen-meshpy`

#### Step 2.1: Add Package Aggregation Logic

**Current Architecture**:
```python
def main():
    # Process each proto file individually
    for proto_file in request.proto_file:
        if proto_file.service:
            generated_files = process_service(proto_file, service, template_env)
            response.file.extend(generated_files)
```

**New Architecture**:
```python
def main():
    # Pre-process: Group proto files by package
    packages = {}
    for proto_file in request.proto_file:
        package_path = proto_file.package.replace('.', '/')
        if package_path not in packages:
            packages[package_path] = {
                'proto_files': [],
                'has_service': False,
                'service_info': None
            }
        packages[package_path]['proto_files'].append(proto_file)
        if proto_file.service:
            packages[package_path]['has_service'] = True
            packages[package_path]['service_info'] = proto_file.service[0]
    
    # Existing: Generate meshpy files per proto file
    for proto_file in request.proto_file:
        if proto_file.service:
            generated_files = process_service(proto_file, service, template_env)
            response.file.extend(generated_files)
    
    # NEW: Generate one __init__.py per package
    for package_path, package_info in packages.items():
        init_file = generate_package_init(package_path, package_info, template_env)
        if init_file:
            response.file.append(init_file)
```

#### Step 2.2: Create __init__.py Template

Create `templates/__init___py.j2`:
```jinja2
"""{{ package_description }}"""

# ===========================================
# AUTO-GENERATED EXPORTS - DO NOT EDIT ABOVE
# ===========================================

{% if protobuf_imports %}
# Generated protobuf imports
{% for import_stmt in protobuf_imports %}
{{ import_stmt }}
{% endfor %}
{% endif %}

{% if service_imports %}
# Generated service imports
{% for import_stmt in service_imports %}
{{ import_stmt }}
{% endfor %}
{% endif %}

# Auto-generated __all__ exports
__all__ = [
{% for export in auto_generated_exports %}
    "{{ export }}",
{% endfor %}
]

# ===========================================
# MANUAL EXPORTS - ADD CUSTOM IMPORTS BELOW
# ===========================================

{% if existing_manual_section %}
{{ existing_manual_section }}
{% endif %}
```

#### Step 2.3: Implement Core Functions

**New functions needed in `main.py`:**

```python
def extract_protobuf_exports(proto_files):
    """Extract exportable types from proto files."""
    exports = []
    imports = []
    
    for proto_file in proto_files:
        proto_base = get_proto_file_base(proto_file.name)
        
        # Extract message types
        message_types = []
        for message in proto_file.message_type:
            message_types.append(message.name)
            # Handle nested types
            for nested in message.nested_type:
                message_types.append(f"{message.name}_{nested.name}")
        
        # Extract enum types  
        enum_types = []
        for enum in proto_file.enum_type:
            enum_types.append(enum.name)
            
        if message_types or enum_types:
            all_types = message_types + enum_types
            imports.append(f"from .{proto_base}_pb2 import {', '.join(sorted(all_types))}")
            exports.extend(all_types)
    
    return imports, exports

def extract_service_exports(package_info):
    """Extract exports from generated service files."""
    if not package_info['has_service']:
        return [], []
        
    service = package_info['service_info']
    service_name = service.name
    
    imports = [
        f"from .service_meshpy import {service_name}",
        f"from .service_grpc_client_meshpy import (",
        f"    {service_name}GRPCClient,",
        f"    {service_name}GRPCClientInterface,",
        f")",
        f"from .service_grpc_client_options_meshpy import ClientOptions",
    ]
    
    exports = [
        service_name,
        f"{service_name}GRPCClient", 
        f"{service_name}GRPCClientInterface",
        "ClientOptions",
    ]
    
    return imports, exports

def parse_existing_manual_section(package_path):
    """Parse existing __init__.py and extract manual section."""
    init_file_path = f"{package_path}/__init__.py"
    
    # Try to read existing file (this would need to be implemented
    # by reading from the file system or tracking previous generation)
    try:
        # Read existing content
        # Find manual section marker
        # Extract everything after "MANUAL EXPORTS" marker
        return existing_manual_content
    except FileNotFoundError:
        return None

def generate_package_init(package_path, package_info, template_env):
    """Generate __init__.py for a package."""
    
    # Extract exports from all proto files in package
    protobuf_imports, protobuf_exports = extract_protobuf_exports(package_info['proto_files'])
    
    # Extract service exports if package has services
    service_imports, service_exports = extract_service_exports(package_info)
    
    # Parse existing manual section
    existing_manual_section = parse_existing_manual_section(package_path)
    
    # Generate package description
    package_description = f"{package_path.replace('/', '.')} package."
    
    # Prepare template context
    context = {
        'package_description': package_description,
        'protobuf_imports': protobuf_imports,
        'service_imports': service_imports, 
        'auto_generated_exports': sorted(protobuf_exports + service_exports),
        'existing_manual_section': existing_manual_section,
    }
    
    # Render template
    content = render_template(template_env, '__init___py.j2', context)
    
    # Create file entry
    return plugin.CodeGeneratorResponse.File(
        name=f"{package_path}/__init__.py",
        content=content
    )
```

#### Step 2.4: Handle Manual Section Preservation

**Challenge**: The generator doesn't have access to the existing file system during generation.

**Solutions**:
1. **Option A**: Two-pass generation
   - First pass: Read existing files and extract manual sections
   - Second pass: Generate with preserved sections
   
2. **Option B**: State tracking file
   - Maintain a `.meshpy_state.json` file with manual sections
   - Update on each generation
   
3. **Option C**: Git integration
   - Read manual sections from git worktree
   - Requires git dependency
   
**Recommended**: Start with Option A for simplicity

### Phase 3: Testing & Validation

#### Step 3.1: Test Current Services
- Run generator on existing services
- Verify generated `__init__.py` files are syntactically correct
- Verify imports work correctly
- Verify manual sections are preserved

#### Step 3.2: Regression Testing
- Ensure existing functionality unchanged
- Test import statements work from client code
- Verify `__all__` exports complete and accurate

#### Step 3.3: Integration Testing
- Test with `buf generate` workflow
- Verify multiple proto files in same package handled correctly
- Test manual section preservation across regeneration

## Implementation Checklist

### Phase 1: Cleanup (Manual)
- [ ] Analyze all existing `__init__.py` files  
- [ ] Restructure simple files to new format
- [ ] Restructure complex files with manual sections
- [ ] Test imports still work after restructuring
- [ ] Commit restructured files

### Phase 2: Generator Updates  
- [ ] Add package aggregation logic to `main.py`
- [ ] Create `__init___py.j2` template
- [ ] Implement `extract_protobuf_exports()`
- [ ] Implement `extract_service_exports()` 
- [ ] Implement `parse_existing_manual_section()`
- [ ] Implement `generate_package_init()`
- [ ] Add manual section preservation logic
- [ ] Test generator produces valid Python syntax

### Phase 3: Integration & Testing
- [ ] Test on simple services (spot, wallet, etc.)
- [ ] Test on complex service (api_user)
- [ ] Verify manual sections preserved across regeneration
- [ ] Test with `buf generate` workflow
- [ ] Regression test existing functionality
- [ ] Update documentation

## Success Criteria

1. **Automation**: Generated `__init__.py` files require no manual maintenance for protobuf exports
2. **Preservation**: Manual sections are preserved across regeneration
3. **Correctness**: All generated imports are syntactically correct and functional
4. **Completeness**: All appropriate exports are included in `__all__`
5. **Consistency**: All packages follow the same format and structure
6. **Integration**: Works seamlessly with existing `buf generate` workflow

## Risks & Mitigation

### Technical Risks
1. **Manual section parsing complexity** → Start with simple marker-based parsing
2. **Multiple proto files per package** → Package aggregation strategy addresses this
3. **Syntax errors in generated code** → Existing `ast.parse()` validation catches this
4. **Import conflicts** → Careful namespace management and testing

### Process Risks  
1. **Breaking existing imports** → Thorough testing and gradual rollout
2. **Manual section loss** → Backup strategy and careful testing
3. **Generator complexity** → Modular design with clear separation of concerns

## Current Status
- **Analysis**: Complete ✅
- **Planning**: Complete ✅  
- **Phase 1 Cleanup**: Ready to start 🔄
- **Phase 2 Generator**: Waiting for Phase 1 completion
- **Phase 3 Testing**: Waiting for Phase 2 completion

## Next Actions
1. Begin Phase 1: Clean up existing `__init__.py` files
2. Test restructured files work correctly
3. Proceed to Phase 2: Implement generator changes
