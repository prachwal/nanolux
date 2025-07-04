#!/usr/bin/env node

/**
 * Component Creator
 * Tworzy nowy komponent z pełnym szablonem dokumentacji
 */

const fs = require('fs');
const path = require('path');

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
 * Tworzy szablon komponentu
 */
function createComponentTemplate(componentName) {
  const componentDir = path.join(__dirname, '../src/components', componentName);
  
  if (fs.existsSync(componentDir)) {
    log(`❌ Component ${componentName} already exists!`, 'red');
    process.exit(1);
  }
  
  // Utwórz folder komponentu
  fs.mkdirSync(componentDir, { recursive: true });
  
  // 1. Główny plik komponentu
  const componentTemplate = `import { ComponentChildren, JSX } from 'preact'

/**
 * Props dla komponentu ${componentName}
 */
export interface ${componentName}Props {
  /** Wariant komponentu */
  variant?: 'default' | 'primary' | 'secondary'
  
  /** Rozmiar komponentu */
  size?: 'sm' | 'md' | 'lg'
  
  /** Czy komponent jest disabled */
  disabled?: boolean
  
  /** Zawartość komponentu */
  children: ComponentChildren
  
  /** Custom CSS class */
  class?: string
  
  /** Click handler */
  onClick?: JSX.MouseEventHandler<HTMLDivElement>
}

/**
 * ${componentName} component
 * @example
 * <${componentName} variant="primary" size="lg">Content</${componentName}>
 */
export default function ${componentName}({ 
  variant = 'default',
  size = 'md',
  disabled = false,
  children,
  class: className,
  onClick,
  ...props 
}: ${componentName}Props) {
  const classes = [
    '${componentName.toLowerCase()}',
    \`\${componentName.toLowerCase()}-\${size}\`,
    variant !== 'default' && \`\${componentName.toLowerCase()}-\${variant}\`,
    disabled && \`\${componentName.toLowerCase()}-disabled\`,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <div 
      class={classes}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </div>
  )
}`;

  // 2. Style CSS
  const cssTemplate = `.${componentName.toLowerCase()} {
  padding: var(--${componentName.toLowerCase()}-padding, 12px 16px);
  background: var(--${componentName.toLowerCase()}-bg, transparent);
  color: var(--${componentName.toLowerCase()}-color, inherit);
  border: var(--${componentName.toLowerCase()}-border, 1px solid #e9ecef);
  border-radius: var(--${componentName.toLowerCase()}-radius, 4px);
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.${componentName.toLowerCase()}:hover:not(.${componentName.toLowerCase()}-disabled) {
  opacity: 0.9;
}

.${componentName.toLowerCase()}-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Sizes */
.${componentName.toLowerCase()}-sm { --${componentName.toLowerCase()}-padding: 8px 12px; font-size: 0.875rem; }
.${componentName.toLowerCase()}-lg { --${componentName.toLowerCase()}-padding: 16px 24px; font-size: 1.125rem; }

/* Variants */
.${componentName.toLowerCase()}-primary { 
  --${componentName.toLowerCase()}-bg: #007bff; 
  --${componentName.toLowerCase()}-color: white; 
  --${componentName.toLowerCase()}-border: none;
}

.${componentName.toLowerCase()}-secondary { 
  --${componentName.toLowerCase()}-bg: #6c757d; 
  --${componentName.toLowerCase()}-color: white; 
  --${componentName.toLowerCase()}-border: none;
}`;

  // 3. Stories
  const storiesTemplate = `import ${componentName} from './${componentName}'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    docs: {
      description: {
        component: '${componentName} component with customizable variants and sizes'
      }
    }
  }
}

export const Default = {
  args: {
    children: 'Default ${componentName}'
  }
}

export const Variants = {
  render: () => (
    <div class="flex gap-8">
      <${componentName} variant="default">Default</${componentName}>
      <${componentName} variant="primary">Primary</${componentName}>
      <${componentName} variant="secondary">Secondary</${componentName}>
    </div>
  )
}

export const Sizes = {
  render: () => (
    <div class="flex gap-8 items-center">
      <${componentName} variant="primary" size="sm">Small</${componentName}>
      <${componentName} variant="primary" size="md">Medium</${componentName}>
      <${componentName} variant="primary" size="lg">Large</${componentName}>
    </div>
  )
}

export const States = {
  render: () => (
    <div class="flex gap-8">
      <${componentName} variant="primary">Enabled</${componentName}>
      <${componentName} variant="primary" disabled>Disabled</${componentName}>
    </div>
  )
}

export const InteractiveTest = {
  args: {
    variant: 'primary',
    children: 'Click me'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const component = canvas.getByRole('generic')
    
    await expect(component).toBeInTheDocument()
    await expect(component).toHaveClass('${componentName.toLowerCase()}', '${componentName.toLowerCase()}-md', '${componentName.toLowerCase()}-primary')
    
    await userEvent.click(component)
  }
}`;

  // 4. Unit Tests
  const testTemplate = `import { render } from '@preact/testing-library'
import ${componentName} from './${componentName}'

describe('${componentName}', () => {
  it('renders with default props', () => {
    const { container } = render(<${componentName}>Test content</${componentName}>)
    const component = container.firstChild
    
    expect(component).toHaveClass('${componentName.toLowerCase()}')
    expect(component).toHaveClass('${componentName.toLowerCase()}-md')
    expect(component).toHaveTextContent('Test content')
  })
  
  it('applies variant classes correctly', () => {
    const { container } = render(<${componentName} variant="primary">Test</${componentName}>)
    const component = container.firstChild
    
    expect(component).toHaveClass('${componentName.toLowerCase()}-primary')
  })
  
  it('applies size classes correctly', () => {
    const { container } = render(<${componentName} size="lg">Test</${componentName}>)
    const component = container.firstChild
    
    expect(component).toHaveClass('${componentName.toLowerCase()}-lg')
  })
  
  it('handles disabled state', () => {
    const { container } = render(<${componentName} disabled>Test</${componentName}>)
    const component = container.firstChild
    
    expect(component).toHaveClass('${componentName.toLowerCase()}-disabled')
  })
  
  it('handles click events', () => {
    const handleClick = vi.fn()
    const { container } = render(<${componentName} onClick={handleClick}>Test</${componentName}>)
    const component = container.firstChild
    
    component.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('does not handle click when disabled', () => {
    const handleClick = vi.fn()
    const { container } = render(<${componentName} onClick={handleClick} disabled>Test</${componentName}>)
    const component = container.firstChild
    
    component.click()
    expect(handleClick).not.toHaveBeenCalled()
  })
})`;

  // 5. Index file
  const indexTemplate = `export { default } from './${componentName}'
export type { ${componentName}Props } from './${componentName}'`;

  // Zapisz pliki
  fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentTemplate);
  fs.writeFileSync(path.join(componentDir, `${componentName}.css`), cssTemplate);
  fs.writeFileSync(path.join(componentDir, `${componentName}.stories.tsx`), storiesTemplate);
  fs.writeFileSync(path.join(componentDir, `${componentName}.test.tsx`), testTemplate);
  fs.writeFileSync(path.join(componentDir, 'index.ts'), indexTemplate);
  
  log(`✅ Created component files in ${componentDir}`, 'green');
  
  return componentDir;
}

/**
 * Tworzy dokumentację komponentu
 */
function createComponentDocumentation(componentName) {
  const docPath = path.join(__dirname, '../docs/components', `${componentName}.md`);
  
  const docTemplate = `# ${componentName} Component

> **Status**: 🚧 In Development  
> **Bundle Size**: ~TBD  
> **Coverage**: TBD unit tests, TBD interactive stories

## 🎯 Overview

${componentName} component description here.

## 📊 Metrics

- **Bundle Size**: ~TBD (TBD% of total)
- **Variants**: 3 visual styles
- **Stories**: TBD interactive examples
- **Tests**: TBD unit tests
- **Performance**: <16ms render time

## 🚀 Features

### Variants (3)
- \`default\` - Default styling
- \`primary\` - Primary variant
- \`secondary\` - Secondary variant

### Sizes (3)
- \`sm\` - Small size
- \`md\` - Medium size (default)
- \`lg\` - Large size

### States
- \`disabled\` - Non-interactive state

## 💡 API Reference

\`\`\`tsx
interface ${componentName}Props {
  /** Wariant komponentu */
  variant?: 'default' | 'primary' | 'secondary'
  /** Rozmiar komponentu */
  size?: 'sm' | 'md' | 'lg'
  /** Czy komponent jest disabled */
  disabled?: boolean
  /** Zawartość komponentu */
  children: ComponentChildren
  /** Custom CSS class */
  class?: string
  /** Click handler */
  onClick?: JSX.MouseEventHandler<HTMLDivElement>
}
\`\`\`

## 🔥 Usage Examples

### Basic Usage
\`\`\`tsx
<${componentName}>
  Basic ${componentName}
</${componentName}>
\`\`\`

### With Variant
\`\`\`tsx
<${componentName} variant="primary" size="lg">
  Primary ${componentName}
</${componentName}>
\`\`\`

### Disabled State
\`\`\`tsx
<${componentName} disabled>
  Disabled ${componentName}
</${componentName}>
\`\`\`

## 🏗️ Implementation Details

### CSS Architecture
- **Atomic CSS base** - Leverages atomic classes
- **CSS Variables** - Full customization support
- **Variant classes** - Modular styling approach

### Bundle Composition
\`\`\`
${componentName} Bundle (~TBD):
├── Core component: ~TBD
├── CSS styles: ~TBD
├── TypeScript types: ~TBD
└── Other: ~TBD
\`\`\`

## 📚 Storybook Stories

1. **Default** - Basic component
2. **Variants** - All variant types
3. **Sizes** - Size options
4. **States** - Disabled state
5. **InteractiveTest** - Automated testing

## 🧪 Testing Strategy

### Unit Tests (TBD)
- ✅ Renders with default props
- ✅ Applies variant classes
- ✅ Handles size options
- ✅ Manages disabled state
- ✅ Handles click events
- ✅ Prevents clicks when disabled

## ♿ Accessibility

- **Semantic HTML** - Proper element usage
- **Keyboard navigation** - Full keyboard support
- **Screen reader** - Accessible labels
- **Focus management** - Clear focus indicators

## 📈 Performance Benchmarks

- **Bundle size**: ~TBD
- **Render time**: <16ms target
- **Memory footprint**: Minimal
- **Tree-shaking**: 100% effective

---

*Part of NanoLux Component Library*`;

  fs.writeFileSync(docPath, docTemplate);
  log(`✅ Created documentation at ${docPath}`, 'green');
  
  return docPath;
}

/**
 * Aktualizuje główny index komponentów
 */
function updateComponentIndex(componentName) {
  const indexPath = path.join(__dirname, '../src/components/index.ts');
  
  if (!fs.existsSync(indexPath)) {
    // Utwórz nowy index
    const indexContent = `// NanoLux Components Export
export { default as ${componentName} } from './${componentName}'
export type { ${componentName}Props } from './${componentName}'
`;
    fs.writeFileSync(indexPath, indexContent);
  } else {
    // Dodaj do istniejącego index
    let content = fs.readFileSync(indexPath, 'utf8');
    
    if (!content.includes(componentName)) {
      content += `export { default as ${componentName} } from './${componentName}'\n`;
      content += `export type { ${componentName}Props } from './${componentName}'\n`;
      
      fs.writeFileSync(indexPath, content);
    }
  }
  
  log(`✅ Updated component index`, 'green');
}

/**
 * Aktualizuje dokumentację komponentów
 */
function updateComponentsREADME(componentName) {
  const readmePath = path.join(__dirname, '../docs/components/README.md');
  
  if (fs.existsSync(readmePath)) {
    let content = fs.readFileSync(readmePath, 'utf8');
    
    // Znajdź sekcję z komponentami i dodaj nowy
    const newComponentLine = `- **[${componentName}](./${componentName}.md)** - ${componentName} component description (~TBD)`;
    
    if (!content.includes(componentName)) {
      // Dodaj po ostatnim komponencie
      const logoLineMatch = content.match(/(- \*\*\[Logo\].*?\n)/);
      if (logoLineMatch) {
        content = content.replace(logoLineMatch[1], logoLineMatch[1] + newComponentLine + '\n');
        fs.writeFileSync(readmePath, content);
        log(`✅ Updated components README`, 'green');
      }
    }
  }
}

/**
 * Główna funkcja
 */
function createComponent() {
  const componentName = process.argv[2];
  
  if (!componentName) {
    log('❌ Please provide component name!', 'red');
    log('Usage: npm run component:create ComponentName', 'yellow');
    process.exit(1);
  }
  
  // Walidacja nazwy
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
    log('❌ Component name must start with uppercase letter and contain only alphanumeric characters!', 'red');
    process.exit(1);
  }
  
  log(`🚀 Creating new component: ${componentName}`, 'blue');
  
  try {
    // 1. Utwórz pliki komponentu
    const componentDir = createComponentTemplate(componentName);
    
    // 2. Utwórz dokumentację
    const docPath = createComponentDocumentation(componentName);
    
    // 3. Aktualizuj indeksy
    updateComponentIndex(componentName);
    updateComponentsREADME(componentName);
    
    log(`\n🎉 Component ${componentName} created successfully!`, 'green');
    log(`\n📁 Files created:`, 'blue');
    log(`   ${componentDir}/${componentName}.tsx`, 'green');
    log(`   ${componentDir}/${componentName}.css`, 'green');
    log(`   ${componentDir}/${componentName}.stories.tsx`, 'green');
    log(`   ${componentDir}/${componentName}.test.tsx`, 'green');
    log(`   ${componentDir}/index.ts`, 'green');
    log(`   ${docPath}`, 'green');
    
    log(`\n🔄 Next steps:`, 'yellow');
    log(`   1. Implement component logic in ${componentName}.tsx`, 'yellow');
    log(`   2. Customize styles in ${componentName}.css`, 'yellow');
    log(`   3. Update stories in ${componentName}.stories.tsx`, 'yellow');
    log(`   4. Fill documentation in docs/components/${componentName}.md`, 'yellow');
    log(`   5. Run: npm run storybook`, 'yellow');
    log(`   6. Run: npm run test`, 'yellow');
    
  } catch (error) {
    log(`❌ Error creating component: ${error.message}`, 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  createComponent();
}

module.exports = { createComponent, createComponentTemplate, createComponentDocumentation };
