#!/usr/bin/env node

/**
 * API Documentation Generator
 * Generuje dokumentację API z TypeScript interfaces i JSDoc komentarzy
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Kolory dla konsoli
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

/**
 * Ekstraktuje TypeScript interface z pliku komponentu
 */
function extractTypeScriptInterface(componentPath) {
  try {
    const content = fs.readFileSync(componentPath, 'utf8');
    
    // Znajdź interface Props
    const interfaceMatch = content.match(/export interface (\w+Props)\s*{([^}]*)}/s);
    if (!interfaceMatch) {
      return null;
    }
    
    const [, interfaceName, interfaceBody] = interfaceMatch;
    
    // Ekstraktuj properties z interface
    const properties = [];
    const propRegex = /\s*\/\*\*\s*([^*]*?)\s*\*\/\s*(\w+)(\?)?\s*:\s*([^;\n]+)/gs;
    
    let match;
    while ((match = propRegex.exec(interfaceBody)) !== null) {
      const [, comment, propName, optional, propType] = match;
      properties.push({
        name: propName,
        type: propType.trim(),
        comment: comment.trim(),
        optional: !!optional
      });
    }
    
    return {
      name: interfaceName,
      properties
    };
  } catch (error) {
    log(`Error reading ${componentPath}: ${error.message}`, 'red');
    return null;
  }
}

/**
 * Ekstraktuje JSDoc z głównej funkcji komponentu
 */
function extractComponentJSDoc(componentPath) {
  try {
    const content = fs.readFileSync(componentPath, 'utf8');
    
    // Znajdź JSDoc przed export default function
    const jsDocMatch = content.match(/\/\*\*\s*([\s\S]*?)\*\/\s*export\s+default\s+function/);
    if (!jsDocMatch) {
      return null;
    }
    
    const jsDocContent = jsDocMatch[1];
    
    // Ekstraktuj description
    const descMatch = jsDocContent.match(/^\s*\*\s*(.+?)(?:\s*\*\s*@|$)/s);
    const description = descMatch ? descMatch[1].replace(/\s*\*\s*/g, ' ').trim() : '';
    
    // Ekstraktuj @example
    const exampleMatch = jsDocContent.match(/@example\s*([\s\S]*?)(?:\s*@|$)/);
    const example = exampleMatch ? exampleMatch[1].replace(/^\s*\*\s?/gm, '').trim() : '';
    
    return { description, example };
  } catch (error) {
    log(`Error extracting JSDoc from ${componentPath}: ${error.message}`, 'red');
    return null;
  }
}

/**
 * Generuje markdown dla API dokumentacji komponentu
 */
function generateComponentAPIMarkdown(componentName, interfaceData, jsDocData) {
  let markdown = `# ${componentName} API Reference\n\n`;
  
  // Opis komponentu z JSDoc
  if (jsDocData?.description) {
    markdown += `## Description\n\n${jsDocData.description}\n\n`;
  }
  
  // Przykład użycia z JSDoc
  if (jsDocData?.example) {
    markdown += `## Example\n\n\`\`\`tsx\n${jsDocData.example}\n\`\`\`\n\n`;
  }
  
  // Props interface
  if (interfaceData?.properties?.length > 0) {
    markdown += `## Props\n\n`;
    markdown += `| Property | Type | Required | Description |\n`;
    markdown += `|----------|------|----------|-------------|\n`;
    
    interfaceData.properties.forEach(prop => {
      const required = prop.optional ? 'No' : 'Yes';
      const description = prop.comment || 'No description';
      markdown += `| \`${prop.name}\` | \`${prop.type}\` | ${required} | ${description} |\n`;
    });
    
    markdown += '\n';
  }
  
  // Bundle info placeholder (will be updated by metrics script)
  markdown += `## Bundle Information\n\n`;
  markdown += `<!-- AUTO-GENERATED: Bundle size will be updated by metrics script -->\n`;
  markdown += `**Bundle Size**: TBD\n\n`;
  
  // Test coverage placeholder
  markdown += `## Test Coverage\n\n`;
  markdown += `<!-- AUTO-GENERATED: Coverage will be updated by test script -->\n`;
  markdown += `**Coverage**: TBD\n\n`;
  
  // Footer
  markdown += `---\n\n`;
  markdown += `*This documentation is auto-generated from TypeScript interfaces and JSDoc comments.*\n`;
  markdown += `*Last updated: ${new Date().toISOString()}*\n`;
  
  return markdown;
}

/**
 * Główna funkcja generująca API dokumentację
 */
async function generateAPIDocumentation() {
  log('🚀 Generating API documentation...', 'blue');
  
  // Znajdź wszystkie komponenty (wyklucz examples)
  const componentFiles = glob.sync('src/components/**/[A-Z]*.tsx', { 
    cwd: process.cwd(),
    ignore: ['src/examples/**', '**/examples/**']
  });
  
  // Upewnij się, że katalog docs/api istnieje
  const apiDocsDir = path.join(process.cwd(), 'docs', 'api');
  if (!fs.existsSync(apiDocsDir)) {
    fs.mkdirSync(apiDocsDir, { recursive: true });
    log(`Created directory: ${apiDocsDir}`, 'green');
  }
  
  let processedCount = 0;
  let errorCount = 0;
  
  for (const componentFile of componentFiles) {
    try {
      const fullPath = path.join(process.cwd(), componentFile);
      const componentName = path.basename(componentFile, '.tsx');
      
      log(`Processing ${componentName}...`, 'yellow');
      
      // Ekstraktuj dane z pliku komponentu
      const interfaceData = extractTypeScriptInterface(fullPath);
      const jsDocData = extractComponentJSDoc(fullPath);
      
      if (!interfaceData && !jsDocData) {
        log(`  ⚠️  No TypeScript interface or JSDoc found in ${componentName}`, 'yellow');
        continue;
      }
      
      // Generuj markdown
      const markdown = generateComponentAPIMarkdown(componentName, interfaceData, jsDocData);
      
      // Zapisz do pliku
      const outputPath = path.join(apiDocsDir, `${componentName}.md`);
      fs.writeFileSync(outputPath, markdown);
      
      log(`  ✅ Generated API docs for ${componentName}`, 'green');
      processedCount++;
      
    } catch (error) {
      log(`  ❌ Error processing ${componentFile}: ${error.message}`, 'red');
      errorCount++;
    }
  }
  
  // Generuj index dokumentacji API
  const indexContent = generateAPIIndex(componentFiles);
  fs.writeFileSync(path.join(apiDocsDir, 'README.md'), indexContent);
  
  // Summary
  log(`\n📊 API Documentation Generation Summary:`, 'blue');
  log(`✅ Processed: ${processedCount} components`, 'green');
  if (errorCount > 0) {
    log(`❌ Errors: ${errorCount}`, 'red');
  }
  log(`📁 Output directory: docs/api/`, 'blue');
  
  return errorCount === 0;
}

/**
 * Generuje index dokumentacji API
 */
function generateAPIIndex(componentFiles) {
  let content = `# API Reference\n\n`;
  content += `Auto-generated API documentation for all NanoLux components.\n\n`;
  content += `## Components\n\n`;
  
  componentFiles.forEach(file => {
    const componentName = path.basename(file, '.tsx');
    content += `- [${componentName}](./${componentName}.md)\n`;
  });
  
  content += `\n---\n\n`;
  content += `*Last updated: ${new Date().toISOString()}*\n`;
  
  return content;
}

// Uruchom jeśli wywołane bezpośrednio
if (require.main === module) {
  generateAPIDocumentation()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      log(`Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  generateAPIDocumentation,
  extractTypeScriptInterface,
  extractComponentJSDoc
};
