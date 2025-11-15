# TypeScript SDK (Legacy)

> **⚠️ DEPRECATED - LEGACY VERSION ONLY**
>
> **This is the deprecated legacy version of the Mesh TypeScript SDK (`@meshtrade/api-old`).**
>
> **🚨 DO NOT USE FOR NEW PROJECTS! 🚨**
>
> **For new projects, use the current version: [`@meshtrade/api`](../ts/)**
>
> This legacy version is maintained only for backward compatibility with existing projects. It will not receive new features and will only receive critical security updates.

---

## Overview

This directory contains the **DEPRECATED** TypeScript SDK for interacting with the Mesh API. This legacy version is frozen at the last stable state before breaking changes were introduced to the main SDK.

**Migration Notice:** If you are using this legacy SDK, please plan to migrate to `@meshtrade/api` as soon as possible.

## Development Setup

This package is part of a Yarn workspace. Install dependencies from the repository root:

```bash
# From repository root
yarn install
```

## Installation (Legacy Projects Only)

```bash
# npm
npm install @meshtrade/api-old

# yarn
yarn add @meshtrade/api-old
```

> **⚠️ WARNING:** Only install this package if you have an existing project that depends on the legacy SDK. New projects should use `@meshtrade/api` instead.

## Testing (Maintainers Only)

Run comprehensive TypeScript tests including Jest, type checking, and linting:

```bash
# From repository root - recommended
./dev/test/tsold.sh

# Or using the orchestration tool
./dev/tool.sh test --targets=tsold

# Or run tests manually from ts-old directory
cd ts-old
yarn test
yarn build
yarn lint
```

## Code Generation (Maintainers Only)

This directory contains generated code. To regenerate from protobuf definitions:

```bash
# From repository root
./dev/tool.sh generate --targets=tsold

# Full cycle (clean, generate, build, test)
./dev/tool.sh all --targets=ts-old
```

## Migration Guide

**This legacy SDK will be deprecated completely in the future.** Please migrate to the current SDK:

### Steps to Migrate

1. Update your `package.json`:
   ```diff
   - "@meshtrade/api-old": "^1.29.0"
   + "@meshtrade/api": "^2.0.0"
   ```

2. Update your imports (if necessary - most imports should remain the same):
   ```typescript
   // Both versions use the same import paths
   import { SomeService } from '@meshtrade/api/iam/role/v1';
   ```

3. Review the [migration guide](https://meshtrade.github.io/api) for breaking changes

4. Test thoroughly before deploying to production

## Documentation

> **⚠️ Note:** The documentation site primarily covers the current SDK (`@meshtrade/api`), not this legacy version.

For documentation on the current SDK (recommended for migration planning), please visit:

**[meshtrade.github.io/api](https://meshtrade.github.io/api)**

## Support

- **Legacy SDK (`@meshtrade/api-old`)**: Critical security fixes only, no new features
- **Current SDK (`@meshtrade/api`)**: Full support and active development

## Publishing (Maintainers Only)

To publish this legacy package to npm:

```bash
cd ts-old
yarn build
yarn publish --access public
```

> **Note:** Version bumps should be coordinated with the main SDK and clearly marked as legacy releases.
