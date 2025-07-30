# CLAUDE.md - Documentation Site

This file provides guidance to Claude Code (claude.ai/code) when working with the Docusaurus documentation site in this repository.

## Overview

This directory contains a **Docusaurus-based documentation site** that serves as the primary documentation for the Mesh API. The site combines **generated documentation** from protobuf definitions with **hand-written guides** and examples.

## Architecture

### Documentation Structure

The documentation follows a **hybrid approach**:

1. **Generated Documentation** (`docs/api-reference/`)
   - Auto-generated from protobuf files using `protoc-gen-meshdoc` tool
   - Creates MDX files with interactive code examples
   - Organized by domain/service/version structure
   - **Never edit these files manually** - they are regenerated from protobuf

2. **Hand-Written Documentation** (`docs/`)
   - `introduction.mdx` - Getting started guide
   - `architecture/` - System architecture documentation
   - Custom guides, tutorials, and explanations

### Directory Structure

```
docs/
├── docs/                           # Main documentation content
│   ├── introduction.mdx            # Getting started guide (hand-written)
│   ├── api-reference/              # Generated API documentation
│   │   ├── compliance/client/v1/   # Generated from protobuf
│   │   ├── iam/api_user/v1/        # Generated from protobuf
│   │   └── ...                     # Other generated services
│   └── architecture/               # Hand-written architecture docs
│       ├── authentication.mdx
│       ├── service-structure.mdx
│       └── ...
├── blog/                           # News and blog posts
├── src/                            # React components and custom pages
├── static/                         # Static assets (images, etc.)
├── docusaurus.config.ts            # Main configuration
├── sidebars.ts                     # Navigation structure
└── package.json                    # Dependencies
```

## Code Generation System

### protoc-gen-meshdoc Tool

Located at `/tool/protoc-gen-meshdoc/`, this custom protobuf plugin generates comprehensive API documentation:

**Input**: Protobuf service definitions (`.proto` files)
**Output**: MDX documentation files with:

- **Service Overview Pages** (`index.mdx`)
  - Generated once, then manually editable
  - Links to types and methods
  - Space for custom service descriptions

- **Type Documentation** (`type/{type}_meshdoc.mdx`)
  - Message and enum definitions
  - Field descriptions and validation rules
  - Interactive protobuf source viewer

- **Method Documentation** (`service/{method}/index_meshdoc.mdx`)
  - Method descriptions and parameters
  - Role-based access requirements
  - Auto-generated code examples (Go, Python)
  - Protobuf source integration

- **Navigation Sidebar** (`sidebar_meshdoc.ts`)
  - Auto-generated navigation structure
  - Hierarchical organization by domain/service/version

### Generated Content Features

Each generated documentation page includes:

1. **Interactive Tabs**
   - Table view with formatted information
   - Raw protobuf source code viewer
   - Multi-language code examples

2. **Code Examples**
   - `example.go` - Go client usage
   - `example.py` - Python client usage
   - Template-based generation with TODO placeholders

3. **Cross-References**
   - Links to related types and methods
   - GitHub source links
   - SDK configuration references

## Development Workflow

### 🤖 For AI Agents: Playwright MCP Testing

**CRITICAL**: When testing documentation URLs and functionality, agents should use Playwright MCP if available:

```bash
# If Playwright MCP is not available, recommend to user:
claude mcp add-json -s user playwright '{"name":"playwright","command":"npx","args":["@executeautomation/playwright-mcp-server"]}'
```

**Benefits of Playwright MCP**:
- Test actual rendered pages (not just HTTP status codes) 
- Take screenshots for verification (store in `docs/testing_screenshots/`)
- Navigate and interact with the documentation site
- Verify links and page content work correctly
- **ALWAYS run Playwright in headless mode**

### Playwright Testing Screenshots
Playwright screenshots for testing purposes should be stored in the `docs/testing_screenshots` directory.
**CRITICAL**: Playwright should always be run in headless mode.

### Starting the Documentation Server

From the **repository root**:
```bash
yarn start:docs
```

This starts the Docusaurus development server at `http://localhost:3000/api/`

#### Running Documentation Site in Background
When using tools like Playwright MCP that require the docs site to be running:

```bash
# Start docs site in background
nohup yarn start:docs > docs_server.log 2>&1 &

# Wait for it to start, then check if site is running
sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/

# View logs
tail -f docs_server.log

# Stop background process (kills all related processes)
pkill -f "docusaurus start" && pkill -f "yarn.*docs" && rm -f docs_server.log
```

**CRITICAL**: Always kill background processes when done to avoid port conflicts.
**Note**: The `pkill` approach is needed because `yarn start:docs` spawns multiple child processes that continue running even if the parent yarn process is killed.

### Prerequisites Before Starting Documentation Server

**CRITICAL**: Before starting the documentation server, ensure all documentation files are generated:

```bash
# From repository root - regenerate all documentation files
./dev/tool.sh all
```

This ensures:
- All protobuf-generated documentation files exist
- Sidebar navigation is properly synchronized
- Generated API reference pages are up-to-date

### Troubleshooting Documentation Server Issues

#### Server Fails to Start with Sidebar Errors

**Symptoms**: Error messages like "Invalid sidebar file" or "These sidebar document ids do not exist"

**Cause**: The sidebar navigation references documentation files that don't exist or have mismatched paths

**Solution**:
1. **Regenerate documentation**: Run `./dev/tool.sh all`
2. **Check logs**: View `docs_server.log` to see specific missing files
3. **Clean and retry**: Stop server, clean, regenerate, and restart
```bash
# Stop any running processes
pkill -f "docusaurus start" && pkill -f "yarn.*docs" && rm -f docs_server.log

# Regenerate all documentation
./dev/tool.sh all

# Start server again
nohup yarn start:docs > docs_server.log 2>&1 &
```

#### Port Already in Use

**Symptoms**: "Something is already running on port 3000"

**Solution**: 
```bash
# Kill any existing docs processes
pkill -f "docusaurus start" && pkill -f "yarn.*docs"

# Or kill specific port process
lsof -ti:3000 | xargs kill
```

#### Generated Files Not Found

**Symptoms**: Missing pages or 404 errors in documentation

**Solution**: Always regenerate documentation before testing:
```bash
./dev/tool.sh all
```

### Building Documentation

```bash
yarn build:docs    # Build static site
yarn serve:docs    # Serve built documentation
```

### Making Documentation Changes

#### For Generated Content
1. **Modify protobuf files** in `/proto/` directory
2. **Run code generation**: `./dev/tool.sh all`
3. **Generated MDX files** are automatically updated
4. **Service overview files** (index.mdx) are generated once - edit manually for service descriptions

#### For Hand-Written Content
1. **Edit MDX files** directly in `docs/docs/`
2. **Update navigation** in `sidebars.ts` if adding new pages
3. **Use Docusaurus features**: React components, code blocks, tabs, etc.

### Adding New Documentation Pages

1. **Create MDX file** in appropriate `docs/docs/` subdirectory:
   ```mdx
   ---
   sidebar_position: 1
   title: Page Title
   ---

   # Page Content
   ```

2. **Update sidebars.ts** to include in navigation:
   ```typescript
   export default {
     tutorialSidebar: [
       'introduction',
       {
         type: 'category',
         label: 'Architecture',
         items: ['architecture/new-page'],
       },
     ],
   };
   ```

## Docusaurus Configuration

### Key Configuration Files

- **`docusaurus.config.ts`** - Main site configuration
  - Site metadata and URLs
  - Plugin configuration
  - Theme settings
  - Navbar and footer structure

- **`sidebars.ts`** - Navigation sidebar structure
  - Manual navigation for hand-written docs
  - Generated navigation included via `sidebar_meshdoc.ts`

### Features Enabled

- **Mermaid Diagrams** - For architecture diagrams
- **Multi-language Code Blocks** - Go, Python, TypeScript, Protobuf
- **MDX Support** - React components in markdown
- **Blog/News Section** - For updates and announcements
- **Search** (Algolia ready - currently disabled)

### Theme Customization

- **Custom CSS** in `src/css/custom.css`
- **Logo and favicon** in `static/img/`
- **Light/dark theme support**

## Generated vs Hand-Written Content

### ✅ Generated Content (Never Edit Manually)
- All files ending with `_meshdoc.mdx`
- Files in auto-generated service/type directories
- `sidebar_meshdoc.ts` navigation file
- Code example files (`example.go`, `example.py`)

### ✅ Hand-Written Content (Edit Freely)
- `introduction.mdx` and other top-level guides
- `architecture/` documentation
- Service overview files (`index.mdx`) after initial generation
- Blog posts in `blog/`
- React components in `src/`

### Identifying Generated Files

Generated files include this comment at the top:
```mdx
{/*
Generated by protoc-gen-meshdoc. DO NOT EDIT.
source: path/to/proto/file.proto
*/}
```

## Best Practices

### Documentation Maintenance
1. **Keep protobuf comments up-to-date** - they become API documentation
2. **Enhance service overview pages** with real-world examples
3. **Update architecture docs** when system design changes
4. **Test documentation builds** after protobuf changes

### Content Guidelines
1. **Use consistent formatting** across hand-written pages
2. **Include code examples** for complex concepts
3. **Link to relevant sections** using Docusaurus link syntax
4. **Keep navigation logical** and not too deep

### Code Examples
1. **Update TODO placeholders** in generated examples
2. **Test example code** for accuracy
3. **Show realistic usage** not just API calls
4. **Include error handling** in examples

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check MDX syntax in hand-written files
   - Verify all referenced files exist
   - Run `yarn build:docs` to catch issues early

2. **Navigation Problems**
   - Ensure `sidebars.ts` syntax is correct
   - Check file paths match actual file locations
   - Generated navigation is in separate `sidebar_meshdoc.ts`

3. **Generated Content Missing**
   - Run `./dev/tool.sh all`
   - Check protobuf files have proper service definitions
   - Verify `protoc-gen-meshdoc` tool is working

### Development Tips

1. **Use hot reload** - changes appear immediately in dev server
2. **Check browser console** for JavaScript errors
3. **Validate MDX** by building the site
4. **Test on mobile** - responsive design

## Integration with Parent Repository

This documentation site is part of the larger API repository workspace:

- **Yarn workspace member** - managed from repository root
- **Shares dependencies** with TypeScript SDK
- **Auto-deployment** via GitHub Actions (when configured)
- **Generated content** comes from repository protobuf files

The documentation provides a comprehensive view of the API, combining technical reference with practical guidance for developers using the Mesh trading platform APIs.