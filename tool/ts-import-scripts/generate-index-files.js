#!/usr/bin/env node
/**
 * Script to generate index.ts files for TypeScript SDK packages.
 * This script scans the generated TypeScript files and creates/updates
 * index.ts files with auto-generated exports and preserved manual sections.
 *
 * Updated for Connect-ES pure TypeScript clients.
 */

const fs = require('fs');
const path = require('path');

// Find the API root directory (where ts-web/src, ts-node/src, and ts-old/src live)
// Script is in tool/ts-import-scripts/, so go up 2 directories to reach API root
const API_ROOT = path.resolve(__dirname, '..', '..');

// Support command-line argument for target directory (ts-web, ts-node, ts-old)
// Usage: node generate-index-files.js [ts-web|ts-node|ts-old|all]
const target = process.argv[2] || 'all';
const TARGET_DIRS = {
  'ts-web': [path.join(API_ROOT, 'ts-web', 'src')],
  'ts-node': [path.join(API_ROOT, 'ts-node', 'src')],
  'ts-old': [path.join(API_ROOT, 'ts-old', 'src')],
  'all': [
    path.join(API_ROOT, 'ts-web', 'src'),
    path.join(API_ROOT, 'ts-node', 'src'),
    path.join(API_ROOT, 'ts-old', 'src'),
  ],
};

function main() {
  const dirsToProcess = TARGET_DIRS[target] || TARGET_DIRS['all'];

  // console.log('🔍 Scanning for TypeScript packages to generate index.ts files...');

  for (const srcDir of dirsToProcess) {
    if (!fs.existsSync(srcDir)) {
      // console.log(`⏭️  Skipping non-existent directory: ${srcDir}`);
      continue;
    }

    // Find all packages that need index.ts files
    const packages = findPackagesWithGeneratedFiles(srcDir);

    // console.log(`📦 Found ${packages.length} packages with generated files in ${srcDir}`);

    for (const packagePath of packages) {
      // Skip external packages (buf, google)
      if (packagePath.startsWith('buf') || packagePath.startsWith('google')) {
        // console.log(`⏭️  Skipping external package: ${packagePath}`);
        continue;
      }

      generateIndexFile(srcDir, packagePath);
    }
  }

  // console.log('✅ Index.ts generation complete!');
}

/**
 * Find all packages that contain generated TypeScript files.
 */
function findPackagesWithGeneratedFiles(srcDir) {
  const packages = [];

  function scanDirectory(dir, relativePath = '') {
    if (!fs.existsSync(dir)) {
      return;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let hasGeneratedFiles = false;

    // Check if this directory has generated TypeScript files
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.ts')) {
        const fileName = entry.name;
        // Look for generated protobuf files or custom client files
        if (fileName.endsWith('_pb.ts') ||
            fileName.endsWith('_connect_client_meshts.ts') ||
            fileName.endsWith('_web_meshts.ts') ||
            fileName.endsWith('_node_meshts.ts') ||
            fileName.endsWith('_grpc_web_client_meshts.ts')) {
          hasGeneratedFiles = true;
          break;
        }
      }
    }

    if (hasGeneratedFiles && relativePath) {
      packages.push(relativePath);
    }

    // Recursively scan subdirectories
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subPath = path.join(dir, entry.name);
        const subRelativePath = relativePath ? path.join(relativePath, entry.name) : entry.name;
        scanDirectory(subPath, subRelativePath);
      }
    }
  }

  scanDirectory(srcDir);
  return packages;
}

/**
 * Generate an index.ts file for a specific package.
 */
function generateIndexFile(srcDir, packagePath) {
  const fullPath = path.join(srcDir, packagePath);
  const indexPath = path.join(fullPath, 'index.ts');

  // console.log(`📝 Generating index.ts for: ${packagePath}`);

  try {
    // Collect generated files in the directory
    const generatedExports = collectGeneratedExports(fullPath);

    // Read existing manual section if the file exists
    const existingManualSection = readExistingManualSection(indexPath);

    // Generate the new index.ts content
    const indexContent = generateIndexContent(generatedExports, existingManualSection);

    // Write the file
    fs.writeFileSync(indexPath, indexContent, 'utf8');

    // console.log(`   ✓ Generated ${generatedExports.length} exports`);
  } catch (error) {
    console.error(`   ❌ Error generating index.ts for ${packagePath}:`, error.message);
  }
}

/**
 * Collect all generated TypeScript files that should be exported.
 * Returns an array of export statements.
 */
function collectGeneratedExports(dirPath) {
  const exports = [];
  const seenExports = new Set(); // Track exports to avoid duplicates

  if (!fs.existsSync(dirPath)) {
    return exports;
  }

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    // Skip index.ts itself
    if (file === 'index.ts' || file === 'index.d.ts') {
      continue;
    }

    // Only process TypeScript files (.ts or .d.ts)
    if (!file.endsWith('.ts')) {
      continue;
    }

    // Get the base name without extension (.ts or .d.ts)
    const baseName = file.replace(/\.d\.ts$/, '').replace(/\.ts$/, '');

    // Only include generated files (protobuf generated or custom clients)
    // Patterns: *_pb.ts, *_web_meshts.ts, *_node_meshts.ts, *_grpc_web_client_meshts.ts
    if (baseName.endsWith('_pb') ||
        baseName.endsWith('_web_meshts') ||
        baseName.endsWith('_node_meshts') ||
        baseName.endsWith('_grpc_web_client_meshts') ||
        baseName.endsWith('_grpc_web_pb')) {
      // Avoid duplicates
      if (!seenExports.has(baseName)) {
        exports.push(`export * from "./${baseName}";`);
        seenExports.add(baseName);
      }
    }
  }

  return exports.sort();
}

/**
 * Read the existing manual exports section from an index.ts file.
 * Preserves user-added exports across regeneration.
 */
function readExistingManualSection(indexPath) {
  if (!fs.existsSync(indexPath)) {
    return '';
  }

  try {
    const content = fs.readFileSync(indexPath, 'utf8');

    // Find the manual section marker
    const manualMarker = '// MANUAL EXPORTS - ADD YOUR CUSTOM EXPORTS BELOW';
    const manualStart = content.indexOf(manualMarker);

    if (manualStart === -1) {
      // No manual section found, check if this is an old-style index.ts
      // If it has export statements that are not generated, preserve them in the manual section
      const lines = content.split('\n');
      const exportLines = lines.filter(line => {
        const trimmed = line.trim();
        return trimmed.startsWith('export ') &&
               !trimmed.includes('_pb') &&
               !trimmed.includes('_connect_client_meshts') &&
               !trimmed.includes('_web_meshts') &&
               !trimmed.includes('_node_meshts') &&
               !trimmed.includes('_grpc_web_client_meshts') &&
               !trimmed.includes('_grpc_web_pb') &&
               !trimmed.includes('AUTO-GENERATED') &&
               !trimmed.includes('END OF AUTO-GENERATED');
      });

      if (exportLines.length > 0) {
        // console.log(`   📋 Preserving ${exportLines.length} existing manual exports`);
        return exportLines.join('\n');
      }

      return '';
    }

    // Find the end of the comment block after the marker
    const lines = content.substring(manualStart).split('\n');
    let contentStartIdx = 0;

    // Skip the marker line and any following comment lines
    for (let i = 0; i < lines.length; i++) {
      const stripped = lines[i].trim();
      if (stripped && !stripped.startsWith('//') && !stripped.startsWith('===')) {
        contentStartIdx = i;
        break;
      }
    }

    // Extract the manual section, but only the first instance to avoid duplication
    const manualLines = lines.slice(contentStartIdx);
    const manualContent = manualLines.join('\n').trim();

    // Remove duplicate manual section headers that might have been included
    const cleanedContent = manualContent
      .replace(/\/\/ MANUAL EXPORTS - ADD YOUR CUSTOM EXPORTS BELOW[\s\S]*?={3,}/g, '')
      .replace(/\/\/ You can safely add your own export statements[\s\S]*?Example:[\s\S]*?\/\/ ===*/g, '')
      .trim();

    return cleanedContent;
  } catch (error) {
    console.error(`Error reading existing manual section from ${indexPath}:`, error);
    return '';
  }
}

/**
 * Generate the complete index.ts file content with auto-generated and manual sections.
 */
function generateIndexContent(generatedExports, existingManualSection) {
  const lines = [];

  // Add header comment
  lines.push('// ===================================================================');
  lines.push('// AUTO-GENERATED SECTION - ONLY EDIT BELOW THE CLOSING COMMENT BLOCK');
  lines.push('// ===================================================================');
  lines.push('// This section is automatically managed by protoc-gen-meshts.');
  lines.push('//');
  lines.push('// DO NOT EDIT ANYTHING IN THIS SECTION MANUALLY!');
  lines.push('// Your changes will be overwritten during code generation.');
  lines.push('//');
  lines.push('// To add custom exports, scroll down to the');
  lines.push('// "MANUAL EXPORTS" section indicated below.');
  lines.push('// ===================================================================');
  lines.push('');

  // Add generated exports
  if (generatedExports.length > 0) {
    lines.push('// Generated exports');
    lines.push(...generatedExports);
    lines.push('');
  }

  // Add closing comment
  lines.push('// ===================================================================');
  lines.push('// END OF AUTO-GENERATED SECTION');
  lines.push('// ===================================================================');
  lines.push('//');
  lines.push('// MANUAL EXPORTS - ADD YOUR CUSTOM EXPORTS BELOW');
  lines.push('//');
  lines.push('// You can safely add your own export statements in this section.');
  lines.push('// They will be preserved across code generation.');
  lines.push('//');
  lines.push('// Example:');
  lines.push('//   export * from "./my_custom_module";');
  lines.push('//   export { MyCustomClass } from "./another_module";');
  lines.push('// ===================================================================');

  // Add existing manual section if it exists
  if (existingManualSection && existingManualSection.trim()) {
    lines.push('');
    lines.push(existingManualSection);
  }

  return lines.join('\n') + '\n';
}

// Run the script
if (require.main === module) {
  main();
}
