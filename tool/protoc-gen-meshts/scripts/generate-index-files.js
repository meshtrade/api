#!/usr/bin/env node
/**
 * Script to generate index.ts files for TypeScript SDK packages.
 * This script scans the generated TypeScript files and creates/updates
 * index.ts files with auto-generated exports and preserved manual sections.
 */

const fs = require('fs');
const path = require('path');

// Find the API root directory (where ts/src lives)
const API_ROOT = path.resolve(__dirname, '../../..');
const TS_SRC_DIR = path.join(API_ROOT, 'ts', 'src');

function main() {
  // console.log('🔍 Scanning for TypeScript packages to generate index.ts files...');
  
  // Find all packages that need index.ts files
  const packages = findPackagesWithGeneratedFiles(TS_SRC_DIR);
  
  // console.log(`📦 Found ${packages.length} packages with generated files`);
  
  for (const packagePath of packages) {
    // Skip external packages (buf, google)
    if (packagePath.startsWith('buf') || packagePath.startsWith('google')) {
      // console.log(`⏭️  Skipping external package: ${packagePath}`);
      continue;
    }
    
    generateIndexFile(packagePath);
  }
  
  // console.log('✅ Index.ts generation complete!');
}

function findPackagesWithGeneratedFiles(srcDir) {
  const packages = [];
  
  function scanDirectory(dir, relativePath = '') {
    if (!fs.existsSync(dir)) {
      return;
    }
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let hasGeneratedFiles = false;
    
    // Check if this directory has generated files
    for (const entry of entries) {
      if (entry.isFile()) {
        const fileName = entry.name;
        if (fileName.endsWith('_pb.js') || 
            fileName.endsWith('_grpc_web_pb.js') || 
            fileName.endsWith('_grpc_web_client_meshts.js') ||
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

function generateIndexFile(packagePath) {
  const fullPath = path.join(TS_SRC_DIR, packagePath);
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

function collectGeneratedExports(dirPath) {
  const exports = [];
  
  if (!fs.existsSync(dirPath)) {
    return exports;
  }
  
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    // Skip index.ts itself
    if (file === 'index.ts') {
      continue;
    }
    
    // Add exports for generated files (both .js, .ts, and .d.ts files indicate generated content)
    let baseName = file;
    if (file.endsWith('.d.ts')) {
      baseName = file.replace('.d.ts', '');
    } else if (file.endsWith('.js')) {
      baseName = file.replace('.js', '');
    } else if (file.endsWith('.ts')) {
      baseName = file.replace('.ts', '');
    } else {
      continue;
    }
    
    // Only add if it's a generated file pattern and we haven't already added it
    if ((baseName.endsWith('_pb') || 
         baseName.endsWith('_grpc_web_pb') || 
         baseName.endsWith('_grpc_web_client_meshts')) &&
        !exports.some(exp => exp.includes(baseName))) {
      exports.push(`export * from "./${baseName}";`);
    }
  }
  
  return exports.sort();
}

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
               !trimmed.includes('_grpc_web') && 
               !trimmed.includes('_meshts') &&
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
