#!/usr/bin/env node

/**
 * Examples Validator
 * Sprawdza czy wszystkie examples w dokumentacji są valid i kompilują się
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
 * Ekstraktuje code examples z markdown
 */
function extractExamplesFromMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const examples = [];
  
  // Znajdź wszystkie bloki kodu TSX/JSX
  const codeBlockRegex = /```tsx?\s*\n([\s\S]*?)\n```/g;
  let match;
  let lineNumber = 1;
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const code = match[1];
    
    // Policz numer linii
    const beforeMatch = content.substring(0, match.index);
    lineNumber = (beforeMatch.match(/\n/g) || []).length + 1;
    
    // Sprawdź czy to example komponentu (zawiera JSX)
    if (code.includes('<') && code.includes('>')) {
      // Pomiń przykłady które są komentarzami, zawierają tylko komentarze, lub są definicjami funkcji
      const codeWithoutComments = code.replace(/\/\/.*$/gm, '').trim();
      if (codeWithoutComments.length > 0 && 
          !codeWithoutComments.startsWith('//') &&
          !codeWithoutComments.startsWith('function ') &&
          !codeWithoutComments.startsWith('interface ') &&
          !codeWithoutComments.includes('❌')) {
        examples.push({
          code: code.trim(),
          line: lineNumber,
          file: filePath
        });
      }
    }
  }
  
  return examples;
}

/**
 * Sprawdza czy example kompiluje się
 */
function validateExample(example) {
  const tempFile = path.join(__dirname, '../temp-example.tsx');
  
  try {
    // Przygotuj pełny kod z importami
    const fullCode = `
import { ComponentChildren } from 'preact';
import Button from './src/components/Button/Button';
import Input from './src/components/Input/Input';
import Card from './src/components/Card/Card';
import Flex from './src/components/Flex/Flex';
import Stack from './src/components/Stack/Stack';
import { Heading, Text } from './src/components/Typography/Typography';

function ExampleComponent() {
  return (
    <div>
      ${example.code}
    </div>
  );
}
`;
    
    // Debug: Pokaż pełny kod który będzie kompilowany
    if (process.env.VERBOSE_DEBUG) {
      log(`\n🔧 DEBUG: Full code for example at line ${example.line}:`, 'blue');
      log('--- START OF GENERATED CODE ---', 'yellow');
      console.log(fullCode);
      log('--- END OF GENERATED CODE ---', 'yellow');
    }
    
    // Zapisz tymczasowy plik
    fs.writeFileSync(tempFile, fullCode);
    
    // Debug: Sprawdź czy plik został zapisany
    if (process.env.VERBOSE_DEBUG) {
      log(`📁 Temp file created: ${tempFile}`, 'blue');
      log(`📏 File size: ${fs.statSync(tempFile).size} bytes`, 'blue');
    }
    
    // Sprawdź TypeScript compilation z dokładnymi flagami
    const tscCommand = `npx tsc --noEmit --jsx react-jsx --jsxImportSource preact --skipLibCheck --moduleResolution node --target ES2020 --lib ES2020,DOM,DOM.Iterable ${tempFile}`;
    if (process.env.VERBOSE_DEBUG) {
      log(`🛠️  Running TypeScript command: ${tscCommand}`, 'blue');
    }
    
    const result = execSync(tscCommand, { 
      stdio: 'pipe',
      cwd: path.join(__dirname, '..')
    });
    
    // Usuń tymczasowy plik
    fs.unlinkSync(tempFile);
    if (process.env.VERBOSE_DEBUG) {
      log(`✅ Example compiled successfully!`, 'green');
    }
    
    return true;
  } catch (error) {
    // Usuń tymczasowy plik w przypadku błędu
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
    
    // Bardzo szczegółowe logowanie błędów
    log(`\n💥 COMPILATION ERROR for example at line ${example.line}:`, 'red');
    log(`📁 File: ${example.file}`, 'red');
    log(`📝 Original code:`, 'red');
    log('--- START OF ORIGINAL CODE ---', 'yellow');
    console.log(example.code);
    log('--- END OF ORIGINAL CODE ---', 'yellow');
    
    if (error.stdout) {
      log(`\n📜 TypeScript stdout:`, 'red');
      console.log(error.stdout.toString());
    }
    
    if (error.stderr) {
      log(`\n⚠️  TypeScript stderr:`, 'red');
      console.log(error.stderr.toString());
    }
    
    if (error.message) {
      log(`\n💬 Error message:`, 'red');
      console.log(error.message);
    }
    
    log(`\n🔍 Error details:`, 'red');
    log(`   - Exit code: ${error.status || 'unknown'}`, 'red');
    log(`   - Signal: ${error.signal || 'none'}`, 'red');
    log(`   - Command: ${error.cmd || 'unknown'}`, 'red');
    
    return false;
  }
}

/**
 * Sprawdza wszystkie examples w dokumentacji
 */
function validateAllExamples() {
  log('🔍 Validating documentation examples...', 'blue');
  
  const docFiles = [
    'docs/components/Button.md',
    'docs/components/Input.md', 
    'docs/components/Card.md',
    'docs/components/Layout.md',
    'docs/components/Typography.md',
    'docs/components/Logo.md'
  ];
  
  let allValid = true;
  let totalExamples = 0;
  
  for (const docFile of docFiles) {
    if (!fs.existsSync(docFile)) {
      log(`⚠️  Documentation file not found: ${docFile}`, 'yellow');
      continue;
    }
    
    log(`\n📋 Checking examples in ${docFile}...`, 'yellow');
    
    const examples = extractExamplesFromMarkdown(docFile);
    log(`📊 Found ${examples.length} TSX/JSX examples in ${docFile}`, 'blue');
    
    if (examples.length === 0) {
      log(`ℹ️  No examples to validate in ${docFile}`, 'yellow');
      continue;
    }
    
    totalExamples += examples.length;
    
    for (const example of examples) {
      if (process.env.VERBOSE_DEBUG) {
        log(`\n🔍 Processing example ${examples.indexOf(example) + 1}/${examples.length} at line ${example.line}:`, 'blue');
        log(`📄 Code preview: ${example.code.substring(0, 80).replace(/\n/g, '\\n')}...`, 'blue');
      }
      
      if (validateExample(example)) {
        log(`✅ Example at line ${example.line} is valid`, 'green');
      } else {
        log(`❌ Example at line ${example.line} has compilation errors`, 'red');
        log(`   Code: ${example.code.substring(0, 50)}...`, 'red');
        allValid = false;
        
        // Zatrzymaj się po pierwszym błędzie dla szczegółowego debugowania
        if (process.env.DEBUG_FIRST_ERROR) {
          log('\n🛑 Stopping after first error due to DEBUG_FIRST_ERROR flag', 'yellow');
          break;
        }
      }
    }
  }
  
  if (allValid) {
    log(`\n🎉 All ${totalExamples} examples are valid!`, 'green');
    process.exit(0);
  } else {
    log('\n💥 Some examples have validation errors!', 'red');
    log('Please fix the examples to ensure they compile correctly.', 'yellow');
    process.exit(1);
  }
}

// Uruchom walidację
if (require.main === module) {
  validateAllExamples();
}

module.exports = {
  validateAllExamples,
  extractExamplesFromMarkdown,
  validateExample
};
