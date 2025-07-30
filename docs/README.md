# Mesh API Documentation

This directory contains the Docusaurus-based documentation site for the Mesh API.

## Quick Start

```bash
# From repository root (yarn workspace)
yarn install

# Start development server 
yarn start:docs

# Build for production
yarn build:docs

# Serve built site
yarn serve:docs
```

## Testing

The documentation site includes comprehensive testing capabilities:

```bash
# Test documentation generation and build
./dev/tool.sh test --targets=docs

# Environment validation for docs development
./dev/tool.sh doctor

# Generate documentation from protobuf definitions
./dev/tool.sh generate --targets=docs
```

## Development

The documentation site will be available at `http://localhost:3000` when running in development mode.

### Directory Structure

```text
docs-new/
├── docs/                    # Documentation content
│   ├── intro.md            # Introduction page
│   ├── getting-started/    # Getting started guides
│   ├── api/               # API reference
│   ├── sdks/              # SDK documentation
│   └── examples/          # Code examples
├── blog/                  # Blog posts
├── src/                   # React components and pages
│   ├── components/        # Custom components
│   ├── css/              # Custom styles
│   └── pages/            # Custom pages
├── static/               # Static assets
└── docusaurus.config.js  # Site configuration
```

### Adding Documentation

1. Create markdown files in the `docs/` directory
2. Add front matter with `sidebar_position` to control ordering
3. Update `sidebars.js` if needed for custom sidebar structure

### Features

- **Mermaid Diagrams** - Add diagrams using mermaid code blocks
- **Multi-language Code Blocks** - Use tabs for Go, Python, TypeScript
- **MDX Support** - Mix JSX with markdown for interactive content
- **Search** - Algolia search integration (configure in docusaurus.config.js)
- **Dark Mode** - Built-in dark/light theme switching

### TODO

#### Introduction
- add to introduction quickstart how to get the credentials from the mesh web app
- make a better first api request example. immediately making an api key is a bit much. Maybe retrieving this api key!? This example is outdated anyway.
- next steps links are broken, actually all links at the end of this page are broken # agent to fix
- 
