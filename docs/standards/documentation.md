# Documentation Standards for NanoLux

> **Cel**: Auto-generowana dokumentacja z maksymalną jakością przy minimalnym wysiłku

## 🎯 Filozofia Dokumentacji

### Documentation-Driven Development
1. **Code as Documentation**: TypeScript interfaces + JSDoc = API docs
2. **Stories as Examples**: Storybook stories = interactive examples  
3. **Tests as Specs**: Test cases = behavior specification
4. **Auto-Generation**: Minimalna ręczna praca, maksymalna automatyzacja

### Hierarchy of Documentation
```
┌─ Auto-Generated (80%) ─────────────────────┐
│ • API Reference (TypeScript)               │
│ • Props Tables (JSDoc)                     │  
│ • Examples (Storybook Stories)             │
│ • Bundle Analysis (Webpack)                │
└────────────────────────────────────────────┘
┌─ Manual Content (20%) ─────────────────────┐
│ • Guides & Tutorials                       │
│ • Best Practices                           │
│ • Migration Guides                         │
│ • Architecture Decisions                   │
└────────────────────────────────────────────┘
```

---

## 📚 Documentation Structure

```
docs/
├── INDEX.md                    # Main documentation hub
├── IMPLEMENTATION_ROADMAP.md   # Master checklist  
├── phases/                     # Implementation phases
│   ├── phase-1-foundation.md
│   ├── phase-2-forms-navigation.md
│   ├── phase-3-interaction.md
│   └── phase-4-advanced.md
├── templates/                  # Code templates
│   ├── component-template.md
│   └── story-template.md
├── standards/                  # Quality standards
│   ├── documentation.md        # This file
│   ├── testing.md
│   ├── performance.md
│   └── accessibility.md
├── guides/                     # Manual guides
│   ├── getting-started.md
│   ├── customization.md
│   ├── migration-from-react.md
│   └── best-practices.md
├── api/                        # Auto-generated API docs
│   ├── components/
│   │   ├── Button.md
│   │   ├── Card.md
│   │   └── ...
│   └── utilities/
├── examples/                   # Usage examples
│   ├── basic-usage/
│   ├── advanced-patterns/
│   └── real-world-apps/
└── generated/                  # Auto-generated content
    ├── bundle-analysis.md
    ├── performance-metrics.md
    └── test-coverage.md
```

---

## 🤖 Auto-Generated Documentation

### 1. API Reference (TypeScript → Markdown)

**Source**: TypeScript interfaces + JSDoc
**Tool**: `typedoc` + custom templates
**Output**: `docs/api/components/*.md`

```tsx
/**
 * Props dla komponentu Button
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 * ```
 * 
 * @example
 * ```tsx
 * // Custom colors
 * <Button bg="#ff6b6b" color="white">
 *   Custom Red Button
 * </Button>
 * ```
 */
export interface ButtonProps {
  /** 
   * Wariant przycisku
   * @default 'default'
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
  
  /** 
   * Rozmiar przycisku
   * @default 'md' 
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  /** 
   * Czy przycisk jest disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Custom kolor tła (CSS variable)
   * @example "#ff6b6b"
   */
  bg?: string
  
  /**
   * Custom kolor tekstu (CSS variable)  
   * @example "white"
   */
  color?: string
  
  /** Zawartość przycisku */
  children: ComponentChildren
  
  /** Callback onClick */
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>
}
```

**Generated Output**:
```markdown
# Button API

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'danger' \| 'outline' \| 'ghost'` | `'default'` | Wariant przycisku |
| size | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Rozmiar przycisku |
| disabled | `boolean` | `false` | Czy przycisk jest disabled |
| bg | `string` | - | Custom kolor tła (CSS variable) |
| color | `string` | - | Custom kolor tekstu (CSS variable) |
| children | `ComponentChildren` | - | Zawartość przycisku |
| onClick | `JSX.MouseEventHandler<HTMLButtonElement>` | - | Callback onClick |

## Examples

### Basic Usage
```tsx
<Button variant="primary" size="lg">
  Click me
</Button>
```

### Custom Colors
```tsx
// Custom colors
<Button bg="#ff6b6b" color="white">
  Custom Red Button
</Button>
```
```

### 2. Interactive Examples (Storybook → Docs)

**Source**: Storybook stories
**Tool**: `@storybook/addon-docs`
**Output**: Embedded w `docs/api/components/*.md`

```tsx
// Button.stories.tsx
export const AllVariants: Story = {
  render: () => (
    <div class="flex gap-8">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie dostępne warianty przycisku z różnymi kolorami'
      }
    }
  }
}
```

**Generated**: Interactive example w dokumentacji

### 3. Bundle Analysis (Webpack → Markdown)

**Source**: Webpack Bundle Analyzer
**Tool**: Custom script  
**Output**: `docs/generated/bundle-analysis.md`

```bash
# npm script
"docs:bundle": "webpack-bundle-analyzer dist/assets/*.js --mode static --report docs/generated/bundle-analysis.html && node scripts/bundle-to-md.js"
```

**Generated Output**:
```markdown
# Bundle Analysis

## Component Sizes

| Component | Size (Gzipped) | Size (Raw) | Dependencies |
|-----------|----------------|------------|--------------|
| Button    | 234B          | 456B       | preact       |
| Card      | 187B          | 298B       | preact       |
| Input     | 345B          | 567B       | preact       |

**Total Framework Size**: 1.2KB (gzipped)
```

### 4. Performance Metrics (Tests → Markdown)

**Source**: Vitest performance tests
**Tool**: Custom reporter
**Output**: `docs/generated/performance-metrics.md`

```tsx
// Performance test w stories
export const PerformanceTest = withPerformanceTest({
  args: { children: 'Performance test' }
}, 512) // max 512B bundle size
```

---

## ✍️ Manual Documentation

### 1. Guides & Tutorials

**Location**: `docs/guides/`
**Purpose**: Przewodniki dla developerów
**Style**: Step-by-step tutorials

```markdown
# Getting Started with NanoLux

## Installation

```bash
npm install nanolux
```

## Quick Start

1. Import components:
```tsx
import { Button, Card } from 'nanolux'
```

2. Use in your app:
```tsx
function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  )
}
```

## Next Steps
- Zobacz inne dokumenty w `/docs/standards/`
```

### 2. Architecture Decisions  

**Location**: `docs/adr/` (Architecture Decision Records)
**Purpose**: Dokumentacja decyzji technicznych
**Format**: Standardowy ADR format

```markdown
# ADR-001: CSS Variables over CSS-in-JS

## Status
Accepted

## Context
Potrzebujemy sposobu na customizację komponentów bez wpływu na bundle size.

## Decision
Używamy CSS Variables zamiast runtime CSS-in-JS.

## Consequences
**Positive:**
- Zero runtime overhead
- Lepsze performance
- Mniejszy bundle size

**Negative:**
- Ograniczona dynamika stylów
- Potrzeba fallback dla starszych przeglądarek
```

### 3. Migration Guides

**Location**: `docs/guides/migration/`
**Purpose**: Pomoc w migracji z innych frameworków

```markdown
# Migration from React to NanoLux

## Key Differences

| React | NanoLux | Reason |
|-------|---------|--------|
| `className` | `class` | Preact syntax |
| `styled-components` | CSS Variables | Bundle size |
| `@emotion/styled` | Atomic CSS | Performance |

## Step-by-Step Migration

### 1. Replace className with class
```tsx
// Before (React)
<div className="btn btn-primary">Button</div>

// After (NanoLux)  
<div class="btn btn-primary">Button</div>
```
```

---

## 🔄 Documentation Workflow

### 1. Development Phase
```bash
# Podczas developmentu
npm run dev:docs        # Live reload docs
npm run storybook       # Interactive examples
npm run test:watch      # Test coverage update
```

### 2. Pre-commit Hooks
```bash
# Przed commitowaniem
npm run docs:lint       # Lint documentation
npm run docs:typecheck  # Check TypeScript in examples
npm run docs:build      # Test docs build
```

### 3. CI/CD Pipeline
```yaml
# .github/workflows/docs.yml
- name: Generate API Docs
  run: npm run docs:api

- name: Build Storybook
  run: npm run build-storybook

- name: Bundle Analysis  
  run: npm run docs:bundle

- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
```

### 4. Release Process
```bash
# Przy release
npm run docs:generate   # Regenerate all docs
npm run docs:deploy     # Deploy to production
npm run changelog       # Update CHANGELOG.md
```

---

## 📊 Documentation Metrics

### Quality Metrics
- **API Coverage**: 100% interfaces udokumentowane
- **Example Coverage**: 100% komponentów ma przykłady
- **Link Health**: 0 broken links
- **Spelling**: 0 spelling errors

### Performance Metrics  
- **Build Time**: <30s full docs build
- **Page Load**: <2s documentation pages
- **Search**: <100ms search results
- **Bundle Size**: <500KB docs bundle

### User Metrics
- **Bounce Rate**: <30% na docs pages
- **Time on Page**: >2min średnio
- **Search Success**: >80% searches find results
- **Feedback Score**: >4.5/5 helpfulness

---

## 🛠️ Documentation Tools

### Core Tools
```json
{
  "devDependencies": {
    "typedoc": "^0.25.0",              // TypeScript → API docs
    "@storybook/addon-docs": "^7.0.0", // Stories → examples
    "webpack-bundle-analyzer": "^4.0.0", // Bundle analysis
    "markdownlint": "^0.30.0",         // Markdown linting
    "alex": "^11.0.0",                 // Inclusive language
    "textlint": "^13.0.0"              // Text linting
  }
}
```

### Custom Scripts
```bash
# package.json scripts
"docs:api": "typedoc --out docs/api src/components",
"docs:bundle": "node scripts/generate-bundle-docs.js", 
"docs:performance": "node scripts/generate-perf-docs.js",
"docs:lint": "markdownlint docs/**/*.md",
"docs:spell": "cspell docs/**/*.md",
"docs:build": "vitepress build docs",
"docs:serve": "vitepress serve docs"
```

---

## 📝 Writing Guidelines

### Style Guide
- **Tone**: Profesjonalny ale przystępny
- **Language**: Polski dla komentarzy, angielski dla API
- **Length**: Krótkie paragrafy, bullet points
- **Examples**: Zawsze z working code

### Code Examples
```tsx
// ✅ Good example - complete and runnable
import { Button } from 'nanolux'

function MyApp() {
  return (
    <Button variant="primary" onClick={() => alert('Clicked!')}>
      Click me
    </Button>
  )
}

// ❌ Bad example - incomplete
<Button>Click me</Button>
```

### Markdown Standards
```markdown
<!-- ✅ Good structure -->
## Main Section
### Subsection
#### Details

**Bold for emphasis**
*Italic for terms*
`code` for inline code

<!-- ❌ Avoid -->
# Too many H1s
**Overuse** of **bold** text
```

---

## 🎯 Success Criteria

### Documentation Quality
- [ ] 100% API coverage w TypeScript
- [ ] 100% komponenty mają przykłady
- [ ] 0 broken links
- [ ] <30s full docs build time
- [ ] >4.5/5 user satisfaction

### Developer Experience
- [ ] Auto-completion w IDE
- [ ] Inline examples w JSDoc
- [ ] Live reload podczas developmentu
- [ ] Search w <100ms
- [ ] Mobile-friendly docs

### Maintenance
- [ ] Auto-update w CI/CD
- [ ] Version control dla docs
- [ ] Rollback capability
- [ ] Analytics tracking
- [ ] User feedback system

---

*Documentation Standards v1.0*  
*Last updated: July 4, 2025*
