---
applyTo: '**'
---
# NanoLux Components - Standards i Best Practices

Specyficzne wytyczne dla rozwoju komponentów w NanoLux framework.

## 🏗️ Struktura Komponentów

### Zasady Organizacji
- **Folder per component**: Wszystkie pliki komponentu w jednym folderze
- **Co-located files**: Kod, style, testy, stories razem
- **Automatyczna dokumentacja**: Z TypeScript types i JSDoc
- **Stories jako testy**: Storybook z testing utilities
- **Zero config**: Automatyczne wykrywanie i ładowanie

### Struktura Plików
```
src/
  components/                    # Core komponenty (production-ready)
    Button/
      Button.tsx                 # Główny komponent
      Button.css                 # Atomic CSS styles
      Button.stories.tsx         # Storybook stories
      Button.test.tsx            # Vitest tests
      index.ts                   # Re-export
    Card/
      Card.tsx
      Card.css
      Card.stories.tsx
      Card.test.tsx
      index.ts
  examples/                      # Demo & showcase komponenty (excluded from docs)
    CounterDemo/
    ButtonShowcase/
    FeatureList/
```

### WAŻNE: Separacja Core vs Examples
- **`src/components/`** - Tylko production-ready komponenty
- **`src/examples/`** - Demo, showcase, i example komponenty
- **Dokumentacja** - Przetwarza TYLKO `src/components/`
- **Eksporty** - `src/components/index.ts` nie eksportuje examples

## 📝 Component Template

### TypeScript Interface + JSDoc
```tsx
// Button/Button.tsx
import { ComponentChildren, JSX } from 'preact'

interface ButtonProps {
  /** Wariant przycisku */
  variant?: 'primary' | 'secondary' | 'danger'
  /** Rozmiar przycisku */
  size?: 'sm' | 'md' | 'lg'
  /** Custom kolor tła */
  bg?: string
  /** Custom kolor tekstu */
  color?: string
  /** Czy przycisk jest disabled */
  disabled?: boolean
  /** Zawartość przycisku */
  children: ComponentChildren
  /** Callback onClick */
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>
}

/**
 * Uniwersalny przycisk z pełną parametryzacją
 * @example
 * <Button variant="primary" size="lg">Click me</Button>
 * <Button bg="#ff6b6b" color="white">Custom</Button>
 */
export default function Button({ 
  variant, 
  size = 'md', 
  bg, 
  color, 
  disabled,
  children, 
  ...props 
}: ButtonProps) {
  const baseClass = `btn btn-${size}`
  const variantClass = variant ? ` btn-${variant}` : ''
  const customStyle = bg || color ? `--btn-bg: ${bg}; --btn-color: ${color}` : ''
  
  return (
    <button 
      class={`${baseClass}${variantClass}`}
      style={customStyle}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// Eksportuj typy dla dokumentacji
export type { ButtonProps }
```

### CSS z Atomic + Variables
```css
/* Button/Button.css */
.btn {
  padding: var(--btn-padding, 8px 16px);
  background: var(--btn-bg, #007bff);
  color: var(--btn-color, white);
  border: var(--btn-border, none);
  border-radius: var(--btn-radius, 4px);
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  transition: opacity 0.2s ease;
}

.btn:hover:not(:disabled) {
  opacity: 0.9;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Rozmiary */
.btn-sm { --btn-padding: 4px 8px; font-size: 0.875rem; }
.btn-lg { --btn-padding: 12px 24px; font-size: 1.125rem; }

/* Warianty */
.btn-primary { --btn-bg: #007bff; --btn-color: white; }
.btn-secondary { --btn-bg: #6c757d; --btn-color: white; }
.btn-danger { --btn-bg: #dc3545; --btn-color: white; }
```

### Storybook Stories + Tests
```tsx
// Button/Button.stories.tsx
import Button from './Button'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Uniwersalny przycisk z pełną parametryzacją i atomic CSS'
      }
    }
  }
}

// Stories służą jako dokumentacja wizualna
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

export const AllSizes = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  )
}

export const CustomColors = {
  render: () => (
    <div class="flex gap-8">
      <Button bg="#ff6b6b" color="white">Custom Red</Button>
      <Button bg="#4ecdc4" color="white">Custom Teal</Button>
      <Button bg="#45b7d1" color="white">Custom Blue</Button>
    </div>
  )
}

// Interactive stories z testami - działają w Storybook i Vitest
export const InteractiveTest = {
  args: {
    variant: 'primary',
    children: 'Click me'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    
    // Test: przycisk jest widoczny
    await expect(button).toBeInTheDocument()
    
    // Test: przycisk ma odpowiednie klasy
    await expect(button).toHaveClass('btn', 'btn-md', 'btn-primary')
    
    // Test: przycisk reaguje na klik
    await userEvent.click(button)
    
    // Test: przycisk może być disabled
    button.disabled = true
    await expect(button).toBeDisabled()
  }
}
```

### Re-export Index
```ts
// Button/index.ts
export { default } from './Button'
export type { ButtonProps } from './Button'
```

## 🎨 Styling Guidelines

### Atomic CSS First
- **Preferuj atomic classes** zamiast custom CSS
- **Komponuj przez klasy**: `flex gap-12 mt-16 flex-wrap`
- **Semantyczne nazwy**: `text-left`, `max-w-400`, `mx-auto`
- **CSS Variables** dla dynamicznych wartości

### Przykłady Atomic Classes
```css
/* Layout */
.flex, .flex-col, .flex-row, .flex-wrap
.grid, .block, .inline, .hidden

/* Spacing */
.gap-4, .gap-8, .gap-12, .gap-16, .gap-20, .gap-24
.m-0, .m-4, .m-8, .m-12, .m-16, .m-20, .m-24
.mt-4, .mb-8, .ml-12, .mr-16
.mx-auto, .my-auto
.p-0, .p-4, .p-8, .px-12, .py-16

/* Sizing */
.w-full, .w-auto, .w-fit
.max-w-200, .max-w-400, .max-w-full
.h-full, .h-auto

/* Typography */
.text-xs, .text-sm, .text-base, .text-lg, .text-xl
.text-left, .text-center, .text-right
.font-normal, .font-medium, .font-bold

/* Effects */
.shadow, .shadow-md, .shadow-lg
.rounded, .rounded-md, .rounded-lg
.opacity-50, .opacity-75

/* Composable patterns */
.content-center, .stack, .cluster, .sidebar
```

### Zasady CSS
```jsx
// ✅ Preferowane - atomic classes
<div class="flex gap-12 mt-16 flex-wrap">
  <Button variant="primary">Click me</Button>
</div>

// ✅ Kompozycje klas
<ul class="text-left max-w-400 mx-auto">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

// ✅ Dla dynamicznych wartości - CSS variables
<div style="--dynamic-width: ${width}px" class="dynamic-container">
  Content
</div>

// ❌ Unikaj - inline styles
<div style="display: flex; gap: 12px; margin: 16px 0;">
  <Button variant="primary">Click me</Button>
</div>
```

## 📚 Strategia Dokumentacji Komponentów

### Auto-Generated Documentation (80%)
Każdy komponent w `src/components/` automatycznie generuje:

#### 1. API Reference (`docs/api/ComponentName.md`)
- TypeScript interfaces → API documentation
- JSDoc comments → descriptions
- Props types i default values
- Usage examples z JSDoc @example

#### 2. Component Documentation (`docs/components/ComponentName.md`)
```markdown
# ComponentName

## Overview
Auto-generated overview z JSDoc comments.

## Bundle Information
| Metric | Value |
|--------|-------|
| **Component Size** | X.X KB |
| **Performance** | ✅ Optimized |
| **Last Analyzed** | Date |

## Test Coverage
| Type | Coverage |
|------|----------|
| **Unit Tests** | X/X passing |
| **Integration** | Available |
| **Visual Tests** | Available in Storybook |

## Implementation Notes
<!-- MANUAL SECTION: Add implementation details -->
*This section is for manual documentation.*

## Best Practices
<!-- MANUAL SECTION: Add usage best practices -->
*Add best practices and usage guidelines here.*

## Related Components
<!-- MANUAL SECTION: Link to related components -->
*List related components and how they work together.*
```

### Semi-Manual Documentation (15%)
Sekcje w dokumentacji komponentów oznaczone `<!-- MANUAL SECTION -->`:
- Implementation Details
- Usage Best Practices
- Related Components
- Architecture decisions

### Validation & Synchronization
Cały system dokumentacji jest walidowany przez:

#### Pre-commit Hooks
```bash
# .husky/pre-commit
npm run docs:validate:api      # TypeScript interfaces → API docs
npm run docs:validate:examples # Storybook stories → Examples
npm run docs:validate:links    # Internal links validation
npm run docs:update:components # Auto-update component docs
```

#### CI/CD Pipeline
```yaml
# .github/workflows/docs-sync.yml
- name: Validate Documentation
  run: |
    npm run docs:validate
    npm run docs:generate
```

### Documentation Scripts
```json
{
  "scripts": {
    "docs:generate": "npm run docs:api && npm run docs:examples && npm run docs:metrics",
    "docs:validate": "npm run docs:validate:api && npm run docs:validate:examples && npm run docs:validate:links",
    "docs:validate:api": "node scripts/validate-api-docs.cjs",
    "docs:validate:examples": "node scripts/validate-examples.cjs", 
    "docs:validate:links": "node scripts/validate-internal-links.cjs",
    "docs:validate:metrics": "node scripts/validate-bundle-metrics.cjs"
  }
}
```

## 🔧 Component Creation Workflow

### 1. Automatyczne tworzenie komponentu
```bash
npm run component:create ComponentName
```

Auto-generuje:
- `src/components/ComponentName/ComponentName.tsx` (z template)
- `src/components/ComponentName/ComponentName.stories.tsx` (z template)  
- `src/components/ComponentName/ComponentName.css` (z template)
- `src/components/ComponentName/index.ts` (re-export)
- `docs/components/ComponentName.md` (z template)
- Aktualizuje `docs/components/README.md`
- Aktualizuje `src/components/index.ts`

### 2. Manual Development
- Implementuj komponent zgodnie z template
- Dodaj TypeScript interface z JSDoc
- Napisz Storybook stories (służą jako tests)
- Dodaj CSS z atomic approach + variables

### 3. Documentation
- **Auto-generated**: API Reference, Bundle Metrics, Test Coverage
- **Manual sections**: Implementation Notes, Best Practices, Related Components

### 4. Validation
```bash
npm run docs:validate:component ComponentName
git commit  # Triggers pre-commit validation
```

## 🎯 Quality Standards

### Bundle Size Limits
```javascript
const bundleLimits = {
  Button: 20480,    // 20KB max
  Input: 15360,     // 15KB max  
  Card: 15360,      // 15KB max
  Layout: 1024,     // 1KB max
  Typography: 15360, // 15KB max
  Logo: 30720,      // 30KB max
  Flex: 10240,      // 10KB max
  Stack: 10240      // 10KB max
}
```

### Documentation Requirements
- ✅ **100% API Coverage**: Każdy public interface dokumentowany
- ✅ **Code Examples**: Minimum 1 working example per component
- ✅ **TypeScript Types**: Pełna typizacja z JSDoc
- ✅ **Storybook Stories**: Visual documentation + tests
- ✅ **Performance Metrics**: Bundle size tracking

### Testing Requirements
- ✅ **Unit Tests**: Każdy komponent ma testy Vitest
- ✅ **Visual Tests**: Stories służą jako visual tests
- ✅ **Interactive Tests**: User interaction testing
- ✅ **Performance Tests**: Bundle size monitoring

## 🚨 WAŻNE: Komponenty vs Examples

### Production Components (`src/components/`)
- Przeznaczone do użycia przez end-users
- Pełna dokumentacja i API reference
- Eksportowane z `src/components/index.ts`
- Walidowane przez documentation system
- Bundle size monitoring
- Comprehensive testing

### Example Components (`src/examples/`)
- Demo, showcase, tutorial purposes
- **NIE są dokumentowane** przez automation
- **NIE są eksportowane** z main index
- **Ignorowane** przez wszystkie docs scripts
- Mogą używać production components
- Służą do demonstracji możliwości

### Scripts Configuration
Wszystkie automation scripts ignorują `src/examples/`:
```javascript
// scripts/generate-api-docs.cjs
const EXCLUDE_PATTERNS = [
  '**/examples/**',
  '**/demo/**',
  '**/showcase/**'
]

// scripts/validate-examples.cjs  
const COMPONENT_DIRS = ['docs/components/'] // Only production components

// scripts/update-component-docs.cjs
function getProductionComponents() {
  return getDirectories('src/components/')
    .filter(dir => !dir.includes('examples'))
}
```

## 📊 Success Metrics

### Developer Experience
- **Component Creation**: <5min z full documentation
- **Documentation Update**: <2min per component
- **Validation Feedback**: <30s per validation run
- **Discovery Time**: <1min finding component docs

### Documentation Quality
- **API Drift**: 0 outdated API descriptions
- **Example Health**: 100% working examples in docs  
- **Link Health**: 0 broken internal links
- **Bundle Accuracy**: <1% deviation w documented sizes

### Performance Standards
- **Bundle Size**: All components within defined limits
- **Runtime Performance**: <1KB runtime overhead
- **Build Time**: Fast component compilation
- **Tree Shaking**: Only used components in bundle

Ten system zapewnia że każdy komponent NanoLux ma kompletną, aktualną dokumentację i wysoką jakość kodu przy zachowaniu ultra-małych rozmiarów bundli.