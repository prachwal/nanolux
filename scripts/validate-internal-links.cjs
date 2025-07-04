#!/usr/bin/env node

/**
 * Internal Links Validator
 * Sprawdza czy wszystkie wewnętrzne linki w dokumentacji działają
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

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
 * Ekstraktuje wszystkie linki z pliku markdown
 */
function extractLinksFromMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const links = [];
  
  // Znajdź markdown linki [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = markdownLinkRegex.exec(content)) !== null) {
    const [, text, url] = match;
    
    // Tylko wewnętrzne linki (relative paths)
    if (!url.startsWith('http') && !url.startsWith('mailto:')) {
      links.push({
        text: text.trim(),
        url: url.trim(),
        file: filePath,
        line: getLineNumber(content, match.index)
      });
    }
  }
  
  return links;
}

/**
 * Pobiera numer linii dla pozycji w tekście
 */
function getLineNumber(content, position) {
  const beforeMatch = content.substring(0, position);
  return (beforeMatch.match(/\n/g) || []).length + 1;
}

/**
 * Sprawdza czy plik/ścieżka istnieje
 */
function validateLink(link, basePath) {
  const linkPath = link.url;
  
  // Usuń fragment (#section)
  const pathWithoutFragment = linkPath.split('#')[0];
  
  if (!pathWithoutFragment) {
    // To jest tylko fragment (anchor), sprawdź czy istnieje w tym samym pliku
    return validateAnchor(link.url, link.file);
  }
  
  // Resolve relative path
  const resolvedPath = path.resolve(path.dirname(link.file), pathWithoutFragment);
  
  // Sprawdź czy plik istnieje
  if (fs.existsSync(resolvedPath)) {
    // Jeśli jest fragment, sprawdź czy anchor istnieje
    if (linkPath.includes('#')) {
      const fragment = linkPath.split('#')[1];
      return validateAnchor(`#${fragment}`, resolvedPath);
    }
    return true;
  }
  
  return false;
}

/**
 * Sprawdza czy anchor (#heading) istnieje w pliku
 */
function validateAnchor(anchor, filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const anchorName = anchor.substring(1).toLowerCase();
    
    // Znajdź headingi w markdown
    const headingRegex = /^#+\s+(.*)$/gm;
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const headingText = match[1].trim();
      
      // Konwertuj heading na anchor format
      const headingAnchor = headingText
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // usuń znaki specjalne
        .replace(/\s+/g, '-')     // spacje na myślniki
        .replace(/-+/g, '-')      // usuń podwójne myślniki
        .replace(/^-|-$/g, '');   // usuń myślniki z początku/końca
      
      if (headingAnchor === anchorName) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Sprawdza wszystkie linki w dokumentacji
 */
function validateAllLinks() {
  log('🔍 Validating internal links...', 'blue');
  
  // Znajdź wszystkie pliki markdown
  const markdownFiles = glob.sync('docs/**/*.md').concat(glob.sync('*.md'));
  
  let allValid = true;
  let totalLinks = 0;
  
  for (const mdFile of markdownFiles) {
    log(`\n📋 Checking links in ${mdFile}...`, 'yellow');
    
    const links = extractLinksFromMarkdown(mdFile);
    totalLinks += links.length;
    
    for (const link of links) {
      if (validateLink(link, path.dirname(mdFile))) {
        log(`✅ Link '${link.text}' → '${link.url}' is valid`, 'green');
      } else {
        log(`❌ Broken link at line ${link.line}: '${link.text}' → '${link.url}'`, 'red');
        allValid = false;
      }
    }
    
    if (links.length === 0) {
      log('📝 No internal links found', 'blue');
    }
  }
  
  if (allValid) {
    log(`\n🎉 All ${totalLinks} internal links are valid!`, 'green');
    process.exit(0);
  } else {
    log('\n💥 Some links are broken!', 'red');
    log('Please fix the broken links in documentation.', 'yellow');
    process.exit(1);
  }
}

/**
 * Generuje raport wszystkich linków
 */
function generateLinkReport() {
  log('📊 Generating link report...', 'blue');
  
  const markdownFiles = glob.sync('docs/**/*.md').concat(glob.sync('*.md'));
  const report = {
    totalFiles: markdownFiles.length,
    totalLinks: 0,
    validLinks: 0,
    brokenLinks: [],
    files: {}
  };
  
  for (const mdFile of markdownFiles) {
    const links = extractLinksFromMarkdown(mdFile);
    report.files[mdFile] = {
      linkCount: links.length,
      validLinks: 0,
      brokenLinks: []
    };
    
    for (const link of links) {
      report.totalLinks++;
      
      if (validateLink(link, path.dirname(mdFile))) {
        report.validLinks++;
        report.files[mdFile].validLinks++;
      } else {
        report.brokenLinks.push({ ...link, file: mdFile });
        report.files[mdFile].brokenLinks.push(link);
      }
    }
  }
  
  // Zapisz raport
  const reportPath = path.join(__dirname, '../docs/generated/link-report.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  log(`📄 Link report saved to ${reportPath}`, 'green');
  
  // Wyświetl podsumowanie
  log(`\n📊 Link Report Summary:`, 'blue');
  log(`   Total files: ${report.totalFiles}`, 'blue');
  log(`   Total links: ${report.totalLinks}`, 'blue');
  log(`   Valid links: ${report.validLinks}`, 'green');
  log(`   Broken links: ${report.brokenLinks.length}`, report.brokenLinks.length > 0 ? 'red' : 'green');
  
  return report;
}

// Uruchom walidację lub generuj raport
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'report') {
    generateLinkReport();
  } else {
    validateAllLinks();
  }
}

module.exports = {
  validateAllLinks,
  generateLinkReport,
  extractLinksFromMarkdown,
  validateLink,
  validateAnchor
};
