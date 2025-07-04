#!/usr/bin/env node

/**
 * Storybook Stories to Documentation Examples Extractor
 * Ekstraktuje examples ze Storybook stories i generuje dokumentację examples
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
 * Ekstraktuje stories z pliku .stories.tsx
 */
function extractStoriesFromFile(storiesPath) {
  try {
    const content = fs.readFileSync(storiesPath, 'utf8');
    
    // Ekstraktuj export default (meta)
    const metaMatch = content.match(/export default\s*{([^}]*)}/s);
    const meta = metaMatch ? parseMeta(metaMatch[1]) : {};
    
    // Znajdź wszystkie named exports (stories)
    const storyMatches = [...content.matchAll(/export const (\w+)\s*=\s*{([^}]*(?:{[^}]*}[^}]*)*)}/gs)];
    
    const stories = [];
    
    for (const match of storyMatches) {
      const [, storyName, storyBody] = match;
      
      // Skip jeśli to nie jest story
      if (storyName === 'default') continue;
      
      const story = parseStoryObject(storyBody, storyName, content);
      if (story) {
        stories.push(story);
      }
    }
    
    // Znajdź inline stories (render functions)
    const renderMatches = [...content.matchAll(/export const (\w+)\s*=\s*{\s*render:\s*\(\)\s*=>\s*\(([\s\S]*?)\)\s*}/gs)];
    
    for (const match of renderMatches) {
      const [, storyName, renderContent] = match;
      stories.push({
        name: storyName,
        type: 'render',
        code: renderContent.trim(),
        description: extractStoryDescription(content, storyName)
      });
    }
    
    return {
      meta,
      stories
    };
    
  } catch (error) {
    log(`Error reading stories file ${storiesPath}: ${error.message}`, 'red');
    return null;
  }
}

/**
 * Parsuje meta object z export default
 */
function parseMeta(metaString) {
  const meta = {};
  
  // Ekstraktuj title
  const titleMatch = metaString.match(/title:\s*['"`]([^'"`]*)['"`]/);
  if (titleMatch) meta.title = titleMatch[1];
  
  // Ekstraktuj component
  const componentMatch = metaString.match(/component:\s*(\w+)/);
  if (componentMatch) meta.component = componentMatch[1];
  
  return meta;
}

/**
 * Parsuje story object
 */
function parseStoryObject(storyBody, storyName, fullContent) {
  const story = { name: storyName };
  
  // Ekstraktuj args
  const argsMatch = storyBody.match(/args:\s*{([^}]*)}/s);
  if (argsMatch) {
    story.args = parseArgs(argsMatch[1]);
  }
  
  // Ekstraktuj render function jeśli istnieje
  const renderMatch = storyBody.match(/render:\s*\(\)\s*=>\s*\(([\s\S]*?)\)/);
  if (renderMatch) {
    story.type = 'render';
    story.code = renderMatch[1].trim();
  } else if (story.args) {
    story.type = 'args';
  }
  
  // Ekstraktuj description
  story.description = extractStoryDescription(fullContent, storyName);
  
  return story;
}

/**
 * Parsuje args object
 */
function parseArgs(argsString) {
  try {
    // Prosta implementacja - dla złożonych przypadków można użyć AST parser
    const args = {};
    const argMatches = [...argsString.matchAll(/(\w+):\s*([^,}\n]*)/g)];
    
    for (const match of argMatches) {
      const [, key, value] = match;
      args[key] = value.trim().replace(/['"]/g, '');
    }
    
    return args;
  } catch (error) {
    return {};
  }
}

/**
 * Ekstraktuje description dla story z komentarzy
 */
function extractStoryDescription(content, storyName) {
  // Szukaj komentarza przed export const StoryName
  const beforeStoryRegex = new RegExp(`\\/\\*\\*\\s*([^*]*?)\\*\\/\\s*export const ${storyName}`, 's');
  const match = content.match(beforeStoryRegex);
  
  if (match) {
    return match[1].replace(/\s*\*\s*/g, ' ').trim();
  }
  
  return '';
}

/**
 * Generuje markdown z args
 */
function generateArgsExample(componentName, args) {
  const props = Object.entries(args)
    .map(([key, value]) => {
      // Sprawdź czy value jest stringiem
      if (typeof value === 'string' && !value.startsWith('{') && !value.match(/^\d+$/)) {
        return `${key}="${value}"`;
      }
      return `${key}={${value}}`;
    })
    .join(' ');
    
  return `<${componentName} ${props}>\n  Content\n</${componentName}>`;
}

/**
 * Generuje markdown dokumentację z stories
 */
function generateExamplesMarkdown(componentName, storiesData) {
  let markdown = `# ${componentName} Examples\n\n`;
  
  if (storiesData.meta.title) {
    markdown += `*From Storybook: ${storiesData.meta.title}*\n\n`;
  }
  
  if (storiesData.stories.length === 0) {
    markdown += `No examples found for this component.\n\n`;
    return markdown;
  }
  
  storiesData.stories.forEach((story, index) => {
    // Tytuł story
    markdown += `## ${story.name}\n\n`;
    
    // Opis jeśli istnieje
    if (story.description) {
      markdown += `${story.description}\n\n`;
    }
    
    // Kod przykładu
    markdown += `\`\`\`tsx\n`;
    
    if (story.type === 'render' && story.code) {
      markdown += story.code;
    } else if (story.type === 'args' && story.args) {
      markdown += generateArgsExample(componentName, story.args);
    } else {
      markdown += `// Example code not available`;
    }
    
    markdown += `\n\`\`\`\n\n`;
    
    // Args jeśli istnieją
    if (story.args && Object.keys(story.args).length > 0) {
      markdown += `**Props:**\n`;
      Object.entries(story.args).forEach(([key, value]) => {
        markdown += `- \`${key}\`: \`${value}\`\n`;
      });
      markdown += '\n';
    }
    
    // Separator między stories
    if (index < storiesData.stories.length - 1) {
      markdown += `---\n\n`;
    }
  });
  
  // Footer
  markdown += `---\n\n`;
  markdown += `*Examples extracted from Storybook stories.*\n`;
  markdown += `*Last updated: ${new Date().toISOString()}*\n`;
  
  return markdown;
}

/**
 * Główna funkcja ekstraktująca examples
 */
async function extractStoriesToDocs() {
  log('📚 Extracting examples from Storybook stories...', 'blue');
  
  // Znajdź wszystkie pliki stories (wyklucz examples)
  const storiesFiles = glob.sync('src/components/**/*.stories.tsx', { 
    cwd: process.cwd(),
    ignore: ['src/examples/**', '**/examples/**']
  });
  
  // Upewnij się, że katalog docs/examples istnieje
  const examplesDir = path.join(process.cwd(), 'docs', 'examples');
  if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir, { recursive: true });
    log(`Created directory: ${examplesDir}`, 'green');
  }
  
  let processedCount = 0;
  let errorCount = 0;
  
  for (const storiesFile of storiesFiles) {
    try {
      const fullPath = path.join(process.cwd(), storiesFile);
      const componentName = path.basename(storiesFile, '.stories.tsx');
      
      log(`Processing ${componentName} stories...`, 'yellow');
      
      // Ekstraktuj stories
      const storiesData = extractStoriesFromFile(fullPath);
      
      if (!storiesData || storiesData.stories.length === 0) {
        log(`  ⚠️  No valid stories found in ${componentName}`, 'yellow');
        continue;
      }
      
      // Generuj markdown
      const markdown = generateExamplesMarkdown(componentName, storiesData);
      
      // Zapisz do pliku
      const outputPath = path.join(examplesDir, `${componentName}.md`);
      fs.writeFileSync(outputPath, markdown);
      
      log(`  ✅ Generated examples for ${componentName} (${storiesData.stories.length} stories)`, 'green');
      processedCount++;
      
    } catch (error) {
      log(`  ❌ Error processing ${storiesFile}: ${error.message}`, 'red');
      errorCount++;
    }
  }
  
  // Generuj index examples
  const indexContent = generateExamplesIndex(storiesFiles);
  fs.writeFileSync(path.join(examplesDir, 'README.md'), indexContent);
  
  // Summary
  log(`\n📊 Examples Extraction Summary:`, 'blue');
  log(`✅ Processed: ${processedCount} components`, 'green');
  if (errorCount > 0) {
    log(`❌ Errors: ${errorCount}`, 'red');
  }
  log(`📁 Output directory: docs/examples/`, 'blue');
  
  return errorCount === 0;
}

/**
 * Generuje index examples
 */
function generateExamplesIndex(storiesFiles) {
  let content = `# Examples\n\n`;
  content += `Interactive examples extracted from Storybook stories.\n\n`;
  content += `## Components\n\n`;
  
  storiesFiles.forEach(file => {
    const componentName = path.basename(file, '.stories.tsx');
    content += `- [${componentName}](./${componentName}.md)\n`;
  });
  
  content += `\n## Usage\n\n`;
  content += `Each component example includes:\n`;
  content += `- Live code examples\n`;
  content += `- Props configuration\n`;
  content += `- Usage descriptions\n\n`;
  content += `Examples are automatically synchronized with Storybook stories.\n\n`;
  
  content += `---\n\n`;
  content += `*Last updated: ${new Date().toISOString()}*\n`;
  
  return content;
}

// Uruchom jeśli wywołane bezpośrednio
if (require.main === module) {
  extractStoriesToDocs()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      log(`Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  extractStoriesToDocs,
  extractStoriesFromFile,
  generateExamplesMarkdown
};
