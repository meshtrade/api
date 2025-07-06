# Mesh API Documentation

This directory contains the Docusaurus-based documentation site for the Mesh API.

## Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Build for production
yarn build
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

## Deployment

The site is configured for GitHub Pages deployment:

```bash
# Build and deploy
yarn build
yarn deploy
```

## Migration from Jekyll

This Docusaurus site replaces the previous Jekyll-based documentation with:

- Better performance and SEO
- Modern React-based architecture
- Enhanced search capabilities
- Improved mobile experience
- Interactive code examples
