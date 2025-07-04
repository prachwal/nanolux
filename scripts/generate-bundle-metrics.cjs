#!/usr/bin/env node

/**
 * Bundle Metrics Generator
 * Generuje metryki rozmiaru bundli i dokumentację performance
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { execSync } = require('child_process');

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
 * Formatuje rozmiar w bajtach do czytelnej formy
 */
function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Analizuje bundle stats z Vite build
 */
function analyzeBundleStats() {
  try {
    log('🔍 Analyzing bundle statistics...', 'blue');
    
    // Uruchom build z bundle analyzer
    log('Building project for analysis...', 'yellow');
    execSync('npm run build 2>/dev/null', { stdio: 'pipe' });
    
    // Sprawdź czy dist istnieje
    const distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      throw new Error('Dist directory not found. Build failed?');
    }
    
    // Analizuj pliki w dist
    const assets = [];
    const assetFiles = glob.sync('**/*', { cwd: distPath });
    
    for (const file of assetFiles) {
      const fullPath = path.join(distPath, file);
      const stats = fs.statSync(fullPath);
      
      if (stats.isFile()) {
        assets.push({
          name: file,
          size: stats.size,
          type: getAssetType(file)
        });
      }
    }
    
    return assets;
    
  } catch (error) {
    log(`Error analyzing bundle: ${error.message}`, 'red');
    return [];
  }
}

/**
 * Określa typ asset'a na podstawie rozszerzenia
 */
function getAssetType(filename) {
  const ext = path.extname(filename).toLowerCase();
  
  if (['.js', '.mjs', '.ts'].includes(ext)) return 'javascript';
  if (['.css'].includes(ext)) return 'css';
  if (['.html'].includes(ext)) return 'html';
  if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext)) return 'image';
  if (['.woff', '.woff2', '.ttf', '.eot'].includes(ext)) return 'font';
  
  return 'other';
}

/**
 * Analizuje rozmiary poszczególnych komponentów
 */
function analyzeComponentSizes() {
  try {
    log('📊 Analyzing component sizes...', 'yellow');
    
    const components = [];
    const componentDirs = glob.sync('src/components/*', { 
      cwd: process.cwd(),
      ignore: ['src/examples/**', '**/examples/**']
    });
    
    for (const componentDir of componentDirs) {
      const componentName = path.basename(componentDir);
      const componentPath = path.join(process.cwd(), componentDir);
      
      if (!fs.statSync(componentPath).isDirectory()) continue;
      
      // Znajdź główny plik komponentu
      const mainFile = path.join(componentPath, `${componentName}.tsx`);
      if (!fs.existsSync(mainFile)) continue;
      
      // Oblicz rozmiar kodu (bez zależności)
      const size = calculateComponentCodeSize(componentPath);
      
      components.push({
        name: componentName,
        path: componentDir,
        size: size
      });
    }
    
    return components;
    
  } catch (error) {
    log(`Error analyzing components: ${error.message}`, 'red');
    return [];
  }
}

/**
 * Oblicza rozmiar kodu komponentu
 */
function calculateComponentCodeSize(componentPath) {
  try {
    let totalSize = 0;
    const files = glob.sync('*', { cwd: componentPath });
    
    for (const file of files) {
      const filePath = path.join(componentPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile() && ['.tsx', '.ts', '.css'].includes(path.extname(file))) {
        totalSize += stats.size;
      }
    }
    
    return totalSize;
  } catch (error) {
    return 0;
  }
}

/**
 * Generuje performance report
 */
function generatePerformanceReport(bundleAssets, components) {
  const report = {
    timestamp: new Date().toISOString(),
    bundle: {
      total: bundleAssets.reduce((sum, asset) => sum + asset.size, 0),
      javascript: bundleAssets.filter(a => a.type === 'javascript').reduce((sum, asset) => sum + asset.size, 0),
      css: bundleAssets.filter(a => a.type === 'css').reduce((sum, asset) => sum + asset.size, 0),
      assets: bundleAssets.length
    },
    components: components.map(comp => ({
      name: comp.name,
      size: comp.size,
      sizeFormatted: formatSize(comp.size)
    })),
    recommendations: generateRecommendations(bundleAssets, components)
  };
  
  return report;
}

/**
 * Generuje rekomendacje optymalizacji
 */
function generateRecommendations(bundleAssets, components) {
  const recommendations = [];
  
  // Sprawdź rozmiar głównego bundle
  const totalSize = bundleAssets.reduce((sum, asset) => sum + asset.size, 0);
  if (totalSize > 100 * 1024) { // 100KB
    recommendations.push({
      type: 'warning',
      message: `Total bundle size (${formatSize(totalSize)}) exceeds 100KB target`,
      action: 'Consider code splitting or removing unused dependencies'
    });
  }
  
  // Sprawdź duże komponenty
  const largeComponents = components.filter(comp => comp.size > 5 * 1024); // 5KB
  largeComponents.forEach(comp => {
    recommendations.push({
      type: 'info',
      message: `Component ${comp.name} (${formatSize(comp.size)}) is relatively large`,
      action: 'Consider splitting into smaller components'
    });
  });
  
  // Sprawdź CSS size
  const cssSize = bundleAssets.filter(a => a.type === 'css').reduce((sum, asset) => sum + asset.size, 0);
  if (cssSize > 20 * 1024) { // 20KB
    recommendations.push({
      type: 'warning',
      message: `CSS bundle size (${formatSize(cssSize)}) is large`,
      action: 'Consider CSS purging or atomic CSS approach'
    });
  }
  
  return recommendations;
}

/**
 * Generuje markdown dokumentację metrics
 */
function generateMetricsMarkdown(report) {
  let markdown = `# Bundle Metrics\n\n`;
  
  // Overview
  markdown += `## Bundle Overview\n\n`;
  markdown += `| Metric | Value |\n`;
  markdown += `|--------|-------|\n`;
  markdown += `| **Total Size** | ${formatSize(report.bundle.total)} |\n`;
  markdown += `| **JavaScript** | ${formatSize(report.bundle.javascript)} |\n`;
  markdown += `| **CSS** | ${formatSize(report.bundle.css)} |\n`;
  markdown += `| **Assets Count** | ${report.bundle.assets} |\n`;
  markdown += `| **Last Updated** | ${new Date(report.timestamp).toLocaleString()} |\n\n`;
  
  // Performance targets
  markdown += `## Performance Targets\n\n`;
  markdown += `| Target | Current | Status |\n`;
  markdown += `|--------|---------|--------|\n`;
  
  const jsTarget = 50 * 1024; // 50KB
  const jsStatus = report.bundle.javascript <= jsTarget ? '✅ Pass' : '❌ Fail';
  markdown += `| JavaScript < 50KB | ${formatSize(report.bundle.javascript)} | ${jsStatus} |\n`;
  
  const cssTarget = 20 * 1024; // 20KB  
  const cssStatus = report.bundle.css <= cssTarget ? '✅ Pass' : '❌ Fail';
  markdown += `| CSS < 20KB | ${formatSize(report.bundle.css)} | ${cssStatus} |\n`;
  
  const totalTarget = 100 * 1024; // 100KB
  const totalStatus = report.bundle.total <= totalTarget ? '✅ Pass' : '❌ Fail';
  markdown += `| Total < 100KB | ${formatSize(report.bundle.total)} | ${totalStatus} |\n\n`;
  
  // Component sizes
  if (report.components.length > 0) {
    markdown += `## Component Sizes\n\n`;
    markdown += `| Component | Size | Performance |\n`;
    markdown += `|-----------|------|-------------|\n`;
    
    report.components
      .sort((a, b) => b.size - a.size)
      .forEach(comp => {
        const performance = comp.size > 5 * 1024 ? '⚠️ Large' : '✅ Good';
        markdown += `| ${comp.name} | ${comp.sizeFormatted} | ${performance} |\n`;
      });
    
    markdown += '\n';
  }
  
  // Recommendations
  if (report.recommendations.length > 0) {
    markdown += `## Recommendations\n\n`;
    
    report.recommendations.forEach(rec => {
      const icon = rec.type === 'warning' ? '⚠️' : 'ℹ️';
      markdown += `${icon} **${rec.message}**\n`;
      markdown += `   - ${rec.action}\n\n`;
    });
  }
  
  // Footer
  markdown += `---\n\n`;
  markdown += `*Metrics generated automatically from build output.*\n`;
  markdown += `*Last updated: ${new Date(report.timestamp).toLocaleString()}*\n`;
  
  return markdown;
}

/**
 * Główna funkcja generująca metryki
 */
async function generateBundleMetrics() {
  log('📈 Generating bundle metrics...', 'blue');
  
  try {
    // Analizuj bundle
    const bundleAssets = analyzeBundleStats();
    
    // Analizuj komponenty
    const components = analyzeComponentSizes();
    
    // Generuj report
    const report = generatePerformanceReport(bundleAssets, components);
    
    // Upewnij się, że katalog docs/metrics istnieje
    const metricsDir = path.join(process.cwd(), 'docs', 'metrics');
    if (!fs.existsSync(metricsDir)) {
      fs.mkdirSync(metricsDir, { recursive: true });
      log(`Created directory: ${metricsDir}`, 'green');
    }
    
    // Zapisz JSON report
    const jsonPath = path.join(metricsDir, 'bundle-report.json');
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    
    // Generuj i zapisz markdown
    const markdown = generateMetricsMarkdown(report);
    const markdownPath = path.join(metricsDir, 'bundle-metrics.md');
    fs.writeFileSync(markdownPath, markdown);
    
    // Summary
    log(`\n📊 Bundle Metrics Summary:`, 'blue');
    log(`📦 Total bundle size: ${formatSize(report.bundle.total)}`, 'green');
    log(`📄 JavaScript: ${formatSize(report.bundle.javascript)}`, 'green');
    log(`🎨 CSS: ${formatSize(report.bundle.css)}`, 'green');
    log(`🧩 Components analyzed: ${components.length}`, 'green');
    log(`📁 Reports saved to: docs/metrics/`, 'blue');
    
    if (report.recommendations.length > 0) {
      log(`⚠️  ${report.recommendations.length} optimization recommendations`, 'yellow');
    }
    
    return true;
    
  } catch (error) {
    log(`Error generating metrics: ${error.message}`, 'red');
    return false;
  }
}

// Uruchom jeśli wywołane bezpośrednio
if (require.main === module) {
  generateBundleMetrics()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      log(`Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  generateBundleMetrics,
  analyzeBundleStats,
  analyzeComponentSizes,
  formatSize
};
