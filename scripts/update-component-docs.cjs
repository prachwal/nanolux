#!/usr/bin/env node

/**
 * Component Documentation Updater
 * Aktualizuje dokumentację komponentów łącząc API docs, examples i metrics
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
 * Ładuje dane z różnych źródeł dokumentacji
 */
function loadDocumentationSources() {
  const sources = {
    api: {},
    examples: {},
    metrics: null
  };
  
  try {
    // Ładuj API docs
    const apiFiles = glob.sync('docs/api/*.md', { cwd: process.cwd() });
    apiFiles.forEach(file => {
      const componentName = path.basename(file, '.md');
      if (componentName !== 'README') {
        const content = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
        sources.api[componentName] = content;
      }
    });
    
    // Ładuj examples
    const exampleFiles = glob.sync('docs/examples/*.md', { cwd: process.cwd() });
    exampleFiles.forEach(file => {
      const componentName = path.basename(file, '.md');
      if (componentName !== 'README') {
        const content = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
        sources.examples[componentName] = content;
      }
    });
    
    // Ładuj metrics
    const metricsPath = path.join(process.cwd(), 'docs/metrics/bundle-report.json');
    if (fs.existsSync(metricsPath)) {
      sources.metrics = JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
    }
    
  } catch (error) {
    log(`Error loading documentation sources: ${error.message}`, 'red');
  }
  
  return sources;
}

/**
 * Ekstraktuje sekcje z markdown content
 */
function extractMarkdownSections(content) {
  const sections = {};
  const lines = content.split('\n');
  let currentSection = '';
  let currentContent = [];
  
  for (const line of lines) {
    if (line.startsWith('# ') || line.startsWith('## ')) {
      // Zapisz poprzednią sekcję
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      
      // Rozpocznij nową sekcję
      currentSection = line.replace(/^#+\s*/, '').toLowerCase().replace(/\s+/g, '_');
      currentContent = [line];
    } else {
      currentContent.push(line);
    }
  }
  
  // Zapisz ostatnią sekcję
  if (currentSection) {
    sections[currentSection] = currentContent.join('\n').trim();
  }
  
  return sections;
}

/**
 * Generuje sekcję bundle metrics dla komponentu
 */
function generateComponentMetricsSection(componentName, metrics) {
  if (!metrics || !metrics.components) {
    return `## Bundle Information\n\n**Bundle Size**: Not available\n`;
  }
  
  const component = metrics.components.find(c => c.name === componentName);
  if (!component) {
    return `## Bundle Information\n\n**Bundle Size**: Not available\n`;
  }
  
  let section = `## Bundle Information\n\n`;
  section += `| Metric | Value |\n`;
  section += `|--------|-------|\n`;
  section += `| **Component Size** | ${component.sizeFormatted} |\n`;
  section += `| **Performance** | ${component.size > 5 * 1024 ? '⚠️ Large' : '✅ Optimized'} |\n`;
  section += `| **Last Analyzed** | ${new Date(metrics.timestamp).toLocaleDateString()} |\n\n`;
  
  return section;
}

/**
 * Generuje sekcję test coverage dla komponentu
 */
function generateTestCoverageSection(componentName) {
  // Placeholder - można rozszerzyć o prawdziwe dane coverage
  let section = `## Test Coverage\n\n`;
  section += `| Type | Coverage |\n`;
  section += `|------|----------|\n`;
  section += `| **Unit Tests** | TBD |\n`;
  section += `| **Integration** | TBD |\n`;
  section += `| **Visual Tests** | Available in Storybook |\n\n`;
  
  return section;
}

/**
 * Generuje kompletną dokumentację komponentu
 */
function generateCompleteComponentDocs(componentName, sources) {
  let markdown = `# ${componentName}\n\n`;
  
  // Overview section
  markdown += `## Overview\n\n`;
  markdown += `Complete documentation for the ${componentName} component.\n\n`;
  
  // API Reference z API docs
  if (sources.api[componentName]) {
    const apiSections = extractMarkdownSections(sources.api[componentName]);
    
    if (apiSections.description) {
      markdown += apiSections.description + '\n\n';
    }
    
    if (apiSections.props) {
      markdown += apiSections.props + '\n\n';
    }
  }
  
  // Examples z Storybook
  if (sources.examples[componentName]) {
    const exampleSections = extractMarkdownSections(sources.examples[componentName]);
    
    // Dodaj sekcję examples ale skip header
    Object.entries(exampleSections).forEach(([sectionName, content]) => {
      if (sectionName !== 'examples' && !content.startsWith('#')) {
        markdown += `### ${sectionName.replace(/_/g, ' ')}\n\n`;
        markdown += content + '\n\n';
      } else if (content.includes('```')) {
        markdown += content + '\n\n';
      }
    });
  }
  
  // Bundle metrics
  markdown += generateComponentMetricsSection(componentName, sources.metrics);
  
  // Test coverage
  markdown += generateTestCoverageSection(componentName);
  
  // Implementation notes (manual section)
  markdown += `## Implementation Notes\n\n`;
  markdown += `<!-- MANUAL SECTION: Add implementation details, best practices, etc. -->\n`;
  markdown += `*This section is for manual documentation of implementation details.*\n\n`;
  
  // Best practices (manual section)
  markdown += `## Best Practices\n\n`;
  markdown += `<!-- MANUAL SECTION: Add usage best practices -->\n`;
  markdown += `*Add best practices and usage guidelines here.*\n\n`;
  
  // Related components (manual section)
  markdown += `## Related Components\n\n`;
  markdown += `<!-- MANUAL SECTION: Link to related components -->\n`;
  markdown += `*List related components and how they work together.*\n\n`;
  
  // Footer
  markdown += `---\n\n`;
  markdown += `*This documentation is automatically updated from multiple sources.*\n`;
  markdown += `*Last updated: ${new Date().toISOString()}*\n`;
  
  return markdown;
}

/**
 * Aktualizuje lub tworzy dokumentację komponentu
 */
function updateComponentDocumentation(componentName, sources) {
  try {
    const componentDocsPath = path.join(process.cwd(), 'docs/components', `${componentName}.md`);
    
    // Sprawdź czy plik już istnieje i ma manual sections
    let existingManualSections = {};
    
    if (fs.existsSync(componentDocsPath)) {
      const existingContent = fs.readFileSync(componentDocsPath, 'utf8');
      
      // Ekstraktuj manual sections
      const manualSectionRegex = /<!-- MANUAL SECTION:.*?-->([\s\S]*?)(?=##|---|\n\n\*)/g;
      let match;
      
      while ((match = manualSectionRegex.exec(existingContent)) !== null) {
        const sectionContent = match[1].trim();
        if (sectionContent && !sectionContent.startsWith('*') && !sectionContent.includes('Add ')) {
          // Znajdź nazwę sekcji
          const prevLines = existingContent.substring(0, match.index).split('\n');
          const headerLine = prevLines[prevLines.length - 2];
          if (headerLine && headerLine.startsWith('#')) {
            const sectionName = headerLine.replace(/^#+\s*/, '');
            existingManualSections[sectionName] = sectionContent;
          }
        }
      }
    }
    
    // Generuj nową dokumentację
    let newContent = generateCompleteComponentDocs(componentName, sources);
    
    // Przywróć manual sections jeśli istnieją
    Object.entries(existingManualSections).forEach(([sectionName, content]) => {
      const regex = new RegExp(`(## ${sectionName}\\s+<!-- MANUAL SECTION:.*?-->\\s*)([\\s\\S]*?)(?=##|---|$)`, 'g');
      newContent = newContent.replace(regex, `$1${content}\n\n`);
    });
    
    // Zapisz aktualizowaną dokumentację
    fs.writeFileSync(componentDocsPath, newContent);
    
    return true;
    
  } catch (error) {
    log(`Error updating ${componentName} documentation: ${error.message}`, 'red');
    return false;
  }
}

/**
 * Główna funkcja aktualizująca dokumentację komponentów
 */
async function updateComponentDocs() {
  log('📝 Updating component documentation...', 'blue');
  
  try {
    // Upewnij się, że katalog docs/components istnieje
    const componentsDocsDir = path.join(process.cwd(), 'docs/components');
    if (!fs.existsSync(componentsDocsDir)) {
      fs.mkdirSync(componentsDocsDir, { recursive: true });
      log(`Created directory: ${componentsDocsDir}`, 'green');
    }
    
    // Ładuj źródła dokumentacji
    log('Loading documentation sources...', 'yellow');
    const sources = loadDocumentationSources();
    
    // Znajdź wszystkie komponenty (wyklucz examples)
    const componentDirs = glob.sync('src/components/*', { 
      cwd: process.cwd(),
      ignore: ['src/examples/**', '**/examples/**']
    });
    const componentNames = componentDirs
      .filter(dir => fs.statSync(path.join(process.cwd(), dir)).isDirectory())
      .map(dir => path.basename(dir));
    
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const componentName of componentNames) {
      log(`Updating ${componentName} documentation...`, 'yellow');
      
      const success = updateComponentDocumentation(componentName, sources);
      
      if (success) {
        log(`  ✅ Updated ${componentName}`, 'green');
        updatedCount++;
      } else {
        log(`  ❌ Failed to update ${componentName}`, 'red');
        errorCount++;
      }
    }
    
    // Generuj index komponentów
    generateComponentsIndex(componentNames);
    
    // Summary
    log(`\n📊 Component Documentation Update Summary:`, 'blue');
    log(`✅ Updated: ${updatedCount} components`, 'green');
    if (errorCount > 0) {
      log(`❌ Errors: ${errorCount}`, 'red');
    }
    log(`📁 Output directory: docs/components/`, 'blue');
    
    return errorCount === 0;
    
  } catch (error) {
    log(`Error updating component documentation: ${error.message}`, 'red');
    return false;
  }
}

/**
 * Generuje index dokumentacji komponentów
 */
function generateComponentsIndex(componentNames) {
  let content = `# Components Documentation\n\n`;
  content += `Complete documentation for all NanoLux components.\n\n`;
  content += `## Available Components\n\n`;
  
  componentNames.forEach(name => {
    content += `### [${name}](./${name}.md)\n\n`;
    content += `Complete documentation including API reference, examples, and performance metrics.\n\n`;
  });
  
  content += `## Documentation Structure\n\n`;
  content += `Each component documentation includes:\n\n`;
  content += `- **API Reference**: TypeScript interfaces and props\n`;
  content += `- **Examples**: Interactive examples from Storybook\n`;
  content += `- **Bundle Information**: Size and performance metrics\n`;
  content += `- **Test Coverage**: Testing information\n`;
  content += `- **Implementation Notes**: Best practices and usage guidelines\n\n`;
  
  content += `---\n\n`;
  content += `*This index is automatically maintained.*\n`;
  content += `*Last updated: ${new Date().toISOString()}*\n`;
  
  const indexPath = path.join(process.cwd(), 'docs/components/README.md');
  fs.writeFileSync(indexPath, content);
}

// Uruchom jeśli wywołane bezpośrednio
if (require.main === module) {
  updateComponentDocs()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      log(`Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  updateComponentDocs,
  loadDocumentationSources,
  generateCompleteComponentDocs
};
