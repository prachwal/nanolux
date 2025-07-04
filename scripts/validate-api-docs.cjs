#!/usr/bin/env node

/**
 * API Documentation Validator
 * Sprawdza czy dokumentacja API jest zsynchronizowana z TypeScript interfaces
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
    const propMatches = interfaceBody.matchAll(/\s*\/\*\*\s*([^*]*)\*\/\s*(\w+)\?\?:\s*([^;]+);?/gs);
    
    for (const match of propMatches) {
      const [, comment, propName, propType] = match;
      properties.push({
        name: propName,
        type: propType.trim(),
        comment: comment.trim(),
        optional: match[0].includes('?:')
      });
    }
    
    return {
      name: interfaceName,
      properties
    };
  } catch (error) {
    log(`❌ Error reading component file: ${componentPath}`, 'red');
    return null;
  }
}

/**
 * Ekstraktuje dokumentowane API z pliku markdown
 */
function extractDocumentedAPI(docPath) {
  try {
    if (!fs.existsSync(docPath)) {
      return null;
    }
    
    const content = fs.readFileSync(docPath, 'utf8');
    
    // Znajdź sekcję API Reference
    const apiSectionMatch = content.match(/## 💡 API Reference\s*```tsx\s*interface \w+Props\s*{([^`]*)```/s);
    if (!apiSectionMatch) {
      return null;
    }
    
    const interfaceBody = apiSectionMatch[1];
    
    // Ekstraktuj properties z dokumentacji
    const properties = [];
    const propMatches = interfaceBody.matchAll(/\s*\/\*\*\s*([^*]*)\*\/\s*(\w+)\?\?:\s*([^;]+);?/gs);
    
    for (const match of propMatches) {
      const [, comment, propName, propType] = match;
      properties.push({
        name: propName,
        type: propType.trim(),
        comment: comment.trim(),
        optional: match[0].includes('?:')
      });
    }
    
    return { properties };
  } catch (error) {
    log(`❌ Error reading documentation file: ${docPath}`, 'red');
    return null;
  }
}

/**
 * Porównuje interface z dokumentacją
 */
function interfacesMatch(tsInterface, docAPI) {
  if (!tsInterface || !docAPI) {
    return false;
  }
  
  const tsProps = new Map(tsInterface.properties.map(p => [p.name, p]));
  const docProps = new Map(docAPI.properties.map(p => [p.name, p]));
  
  // Sprawdź czy wszystkie props z TypeScript są w dokumentacji
  for (const [name, tsProp] of tsProps) {
    const docProp = docProps.get(name);
    if (!docProp) {
      log(`❌ Property '${name}' missing in documentation`, 'red');
      return false;
    }
    
    if (tsProp.type !== docProp.type) {
      log(`❌ Property '${name}' type mismatch: TS='${tsProp.type}' vs Doc='${docProp.type}'`, 'red');
      return false;
    }
    
    if (tsProp.optional !== docProp.optional) {
      log(`❌ Property '${name}' optionality mismatch`, 'red');
      return false;
    }
  }
  
  // Sprawdź czy w dokumentacji nie ma extra props
  for (const [name] of docProps) {
    if (!tsProps.has(name)) {
      log(`❌ Extra property '${name}' in documentation`, 'red');
      return false;
    }
  }
  
  return true;
}

/**
 * Pobiera listę wszystkich komponentów
 */
function getComponentList() {
  const componentPaths = glob.sync('src/components/*/index.ts', {
    ignore: ['src/examples/**', '**/examples/**']
  });
  return componentPaths.map(p => {
    const componentName = path.basename(path.dirname(p));
    return {
      name: componentName,
      componentPath: path.join(path.dirname(p), `${componentName}.tsx`),
      docPath: `docs/components/${componentName}.md`
    };
  });
}

/**
 * Główna funkcja walidacji
 */
function validateAPIDocumentation() {
  log('🔍 Validating API Documentation...', 'blue');
  
  const components = getComponentList();
  let allValid = true;
  
  for (const component of components) {
    log(`\n📋 Checking ${component.name}...`, 'yellow');
    
    const tsInterface = extractTypeScriptInterface(component.componentPath);
    const docAPI = extractDocumentedAPI(component.docPath);
    
    if (!tsInterface) {
      log(`⚠️  No TypeScript interface found for ${component.name}`, 'yellow');
      continue;
    }
    
    if (!docAPI) {
      log(`❌ No API documentation found for ${component.name}`, 'red');
      allValid = false;
      continue;
    }
    
    if (interfacesMatch(tsInterface, docAPI)) {
      log(`✅ ${component.name} API documentation is synchronized`, 'green');
    } else {
      log(`❌ ${component.name} API documentation is out of sync`, 'red');
      allValid = false;
    }
  }
  
  if (allValid) {
    log('\n🎉 All API documentation is synchronized!', 'green');
    process.exit(0);
  } else {
    log('\n💥 API documentation validation failed!', 'red');
    log('Please update the documentation to match TypeScript interfaces.', 'yellow');
    process.exit(1);
  }
}

// Uruchom walidację
if (require.main === module) {
  validateAPIDocumentation();
}

module.exports = {
  validateAPIDocumentation,
  extractTypeScriptInterface,
  extractDocumentedAPI,
  interfacesMatch
};
