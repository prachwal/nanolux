---
applyTo: '**'
---
Coding standards, domain knowledge, and preferences that AI should follow.---
mode: agent
---

# NanoLux - Minimalistyczny Framework dla Preact

## Założenia Projektu
- **Ultra-małe bundly**: <1KB runtime, ekstremalna optymalizacja rozmiaru
- **Zero config**: działa out-of-the-box, minimal setup
- **Preact-first**: wykorzystuje zalety Preact (3KB vs 45KB React)
- **Modern tooling**: Vite, esbuild, TypeScript support

## Cele Techniczne
- Compile-time optimizations > runtime features
- Automatyczny tree-shaking i dead code elimination
- CSS-in-JS z atomic approach (tylko używane style)
- Lazy loading komponentów z intelligent splitting
- Brotli compression dla produkcji

## Preferowane Metody Developmentu
- **Component-first**: jeden plik = jeden komponent
- **Build-time magic**: maksimum pracy w build time
- **TypeScript optional**: pełne wsparcie, ale nie wymagane
- **HMR**: szybki development loop
- **Performance budgets**: monitoring rozmiaru bundli

## Preact - Podstawowe Zasady

### Dlaczego Preact?
- **Rozmiar**: 3KB vs 45KB React - 15x mniejszy!
- **Kompatybilność**: Preact/compat dla istniejących React komponentów
- **Performance**: Szybszy rendering, mniej overhead
- **Modern API**: Hooks, Context, Suspense out-of-the-box
- **Bundle size**: Krytyczne dla NanoLux - każdy KB ma znaczenie

### Preact vs React - Kluczowe Różnice
```jsx
// ✅ Preact - używaj 'class' zamiast 'className'
<div class="btn btn-primary">Button</div>

// ❌ React syntax
<div className="btn btn-primary">Button</div>

// ✅ Preact - import z preact
import { render } from 'preact'
import { useState, useEffect } from 'preact/hooks'

// ❌ React imports
import { render } from 'react-dom'
import { useState, useEffect } from 'react'
```

### Preact Hooks - Najważniejsze API
```jsx
import { useState, useEffect, useContext, useReducer } from 'preact/hooks'
import { createContext, ComponentChildren } from 'preact'

// useState - identyczny jak React
const [count, setCount] = useState(0)

// useEffect - identyczny jak React
useEffect(() => {
  console.log('Component mounted')
}, [])

// Custom hooks - preferowane dla logiki biznesowej
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  return { count, increment, decrement }
}

// Context - dla współdzielonych danych
const ThemeContext = createContext('light')

function ThemeProvider({ children }: { children: ComponentChildren }) {
  const [theme, setTheme] = useState('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### Preact TypeScript - Typy i Interfejsy
```tsx
import { ComponentChildren, JSX } from 'preact'
import { useState } from 'preact/hooks'

// Standardowe typy dla props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: ComponentChildren
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>
}

// Functional component z pełną typizacją
function Button({ variant, size = 'md', disabled, children, onClick }: ButtonProps) {
  return (
    <button 
      class={`btn btn-${size} ${variant ? `btn-${variant}` : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// Event handlers - używaj JSX namespace
const handleClick: JSX.MouseEventHandler<HTMLButtonElement> = (e) => {
  e.preventDefault()
  console.log('Button clicked')
}

// Ref types
import { useRef } from 'preact/hooks'

const inputRef = useRef<HTMLInputElement>(null)
```

### Preact Performance - Optymalizacje
```jsx
import { memo } from 'preact/compat'
import { useMemo, useCallback } from 'preact/hooks'

// Memoization - unikaj niepotrzebnych re-renderów
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({ ...item, processed: true }))
  }, [data])
  
  return <div>{processedData.length} items</div>
})

// useCallback - stabilne referencje funkcji
function Parent() {
  const [count, setCount] = useState(0)
  
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1)
  }, [])
  
  return <Child onIncrement={handleIncrement} />
}
```

### Preact/compat - Kompatybilność z React
```jsx
// vite.config.js - alias dla React kompatybilności
export default {
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
}

// Umożliwia używanie React bibliotek
import { Component } from 'react' // faktycznie preact/compat
import ReactMarkdown from 'react-markdown' // działa z preact
```

### Preact Patterns - Najlepsze Praktyki
```jsx
// ✅ Conditional rendering
{isVisible && <div>Content</div>}

// ✅ Lists z kluczami
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}

// ✅ Error boundaries (tylko class components)
class ErrorBoundary extends Component {
  state = { hasError: false }
  
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>
    }
    return this.props.children
  }
}

// ✅ Portals
import { createPortal } from 'preact/compat'

function Modal({ children }) {
  return createPortal(
    <div class="modal">{children}</div>,
    document.body
  )
}
```

### Preact Bundle Optimization
```jsx
// ✅ Dynamic imports - code splitting
const LazyComponent = lazy(() => import('./LazyComponent'))

// ✅ Conditional imports
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  import('./devtools').then(({ setupDevtools }) => setupDevtools())
}

// ✅ Tree-shaking friendly exports
export { Button } from './Button'
export { Card } from './Card'
// Zamiast: export * from './components'
```

### Migracja z React do Preact
1. **Zamień importy**: `react` → `preact`, `react-dom` → `preact`
2. **Użyj `class`**: `className` → `class`
3. **Dodaj preact/compat**: Dla React bibliotek
4. **Sprawdź bundle size**: Powinien być znacznie mniejszy
5. **Testuj**: Większość kodu działa bez zmian

### Preact DevTools
```bash
# Instalacja
npm install --save-dev preact/devtools

# Użycie w developmencie
if (process.env.NODE_ENV === 'development') {
  require('preact/devtools')
}
```

## Styling CSS
- **CSS Variables + Atomic**: Hybrid approach dla parametryzacji
- **Build-time purging**: Tylko używane klasy trafiają do bundla
- **Zero runtime overhead**: Brak JavaScript dla stylów
- **Custom properties**: Dynamiczne wartości przez CSS variables
- **Predefiniowane warianty**: Atomic classes dla częstych przypadków
- **Atomic-first**: Preferuj klasy CSS zamiast inline styles
- **Unikaj**: runtime CSS-in-JS, styled-components, emotion, inline styles

## Zasady Atomic CSS
- **Komponuj przez klasy**: Łącz atomic classes zamiast pisać custom CSS
- **Semantyczne nazwy**: `text-left`, `max-w-400`, `mx-auto` zamiast długich opisów
- **Reusable patterns**: Klasy które można używać w wielu miejscach
- **Performance**: CSS classes są bardziej wydajne niż inline styles
- **Consistency**: Spójny design system przez atomic classes
- **Tree-shaking**: Tylko używane klasy trafiają do bundla

```js
// ✅ Preferowane - atomic classes
<div class="flex gap-12 mt-16 flex-wrap">
  <Button variant="primary">Click me</Button>
</div>

// ✅ Kompozycje klas
<ul class="text-left max-w-400 mx-auto">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

// ✅ Semantyczne wzorce
<div class="content-center">
  <h1>Centered content</h1>
</div>

// ✅ Dla dynamicznych wartości - CSS variables
<div style="--dynamic-width: ${width}px" class="dynamic-container">
  Content
</div>

// ❌ Unikaj - inline styles
<div style="display: flex; gap: 12px; margin: 16px 0;">
  <Button variant="primary">Click me</Button>
</div>

// ❌ Unikaj - custom CSS dla prostych układów
.my-custom-flexbox {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}
```

```css
/* Przykłady atomic classes w NanoLux */

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

/* Colors */
.text-white, .text-black, .text-gray-400
.bg-transparent, .bg-white

/* Effects */
.shadow, .shadow-md, .shadow-lg
.rounded, .rounded-md, .rounded-lg
.opacity-50, .opacity-75

/* Composable patterns */
.content-center, .stack, .cluster, .sidebar
```

```css
/* CSS z pełną parametryzacją */
.btn {
  padding: var(--btn-padding, 8px 16px);
  background: var(--btn-bg, #007bff);
  color: var(--btn-color, white);
  border: var(--btn-border, none);
  border-radius: var(--btn-radius, 4px);
  cursor: pointer;
}

.btn-sm { --btn-padding: 4px 8px; font-size: 0.875rem; }
.btn-lg { --btn-padding: 12px 24px; font-size: 1.125rem; }

/* Predefiniowane warianty nadal dostępne */
.btn-primary { --btn-bg: #007bff; --btn-color: white; }
.btn-danger { --btn-bg: #dc3545; --btn-color: white; }
```

## Struktura Komponentów
- **Folder per component**: Wszystkie pliki komponentu w jednym folderze
- **Co-located files**: Kod, style, testy, stories razem
- **Automatyczna dokumentacja**: Z TypeScript types i JSDoc
- **Stories jako testy**: Storybook z testing utilities
- **Zero config**: Automatyczne wykrywanie i ładowanie

```
src/
  components/
    Button/
      Button.tsx          # Główny komponent
      Button.css          # Style (opcjonalnie)
      Button.stories.tsx  # Stories + visual tests
      Button.test.tsx     # Unit tests (opcjonalnie)
      index.ts           # Re-export
    Card/
      Card.tsx
      Card.css
      Card.stories.tsx
      index.ts
```

```tsx
// Button/Button.tsx
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
  onClick?: (e: MouseEvent) => void
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
      class={baseClass + variantClass} 
      style={customStyle}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
```

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
        component: 'Uniwersalny przycisk z pełną parametryzacją stylów'
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
    <div style="display: flex; gap: 8px; align-items: center;">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  )
}

export const CustomColors = {
  render: () => (
    <div style="display: flex; gap: 8px;">
      <Button bg="#ff6b6b" color="white">Custom Red</Button>
      <Button bg="#4ecdc4" color="white">Custom Teal</Button>
      <Button bg="#45b7d1" color="white">Custom Blue</Button>
    </div>
  )
}

// Stories z testami - automatyczne testy wizualne
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

// Performance test - rozmiar bundla
export const BundleSize = {
  parameters: {
    docs: {
      description: {
        story: 'Komponent powinien mieć minimalny wpływ na rozmiar bundla'
      }
    }
  }
}
```

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

.btn-sm { --btn-padding: 4px 8px; font-size: 0.875rem; }
.btn-lg { --btn-padding: 12px 24px; font-size: 1.125rem; }

.btn-primary { --btn-bg: #007bff; --btn-color: white; }
.btn-secondary { --btn-bg: #6c757d; --btn-color: white; }
.btn-danger { --btn-bg: #dc3545; --btn-color: white; }
```

```ts
// Button/index.ts
export { default } from './Button'
export type { ButtonProps } from './Button'
```

## Narzędzia Build-time
- **Storybook**: Automatyczna dokumentacja + visual testing
- **TypeScript**: Automatyczne generowanie docs z types
- **Vite**: Automatyczne code splitting per component
- **Bundle analyzer**: Monitoring rozmiaru każdego komponentu

## System Testów - Lekki i Zintegrowany

### Filozofia Testowania w NanoLux
- **Build-time first**: Większość błędów wyłapujemy podczas budowania
- **Stories jako testy**: Minimalizujemy boilerplate
- **Performance testing**: Każdy test sprawdza bundle size
- **User-centric**: Testujemy jak użytkownik, nie implementację
- **Zero config**: Testy działają od razu, bez konfiguracji

### Stack Testowy

#### 1. **Vitest + Storybook Integration** - Najlepsze z dwóch światów
```bash
# Instalacja
npm install --save-dev vitest @storybook/test-runner @storybook/testing-library
npm install --save-dev @preact/testing-library jsdom
```

```js
// vitest.config.js
import { defineConfig } from 'vitest/config'
import { storybookTest } from '@storybook/test/vitest-plugin'

export default defineConfig({
  plugins: [storybookTest()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: true,
    // Integracja ze Storybook
    include: ['**/*.stories.?(m)[jt]s?(x)', '**/*.test.?(m)[jt]s?(x)']
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
})
```

```ts
// src/test/setup.ts
import { expect, afterEach } from 'vitest'
import { cleanup } from '@preact/testing-library'
import * as matchers from '@testing-library/jest-dom/matchers'
import { setProjectAnnotations } from '@storybook/preact'
import * as projectAnnotations from '../.storybook/preview'

// Storybook integration
setProjectAnnotations(projectAnnotations)

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

#### 2. **Stories jako Testy Vitest** - Podwójne wykorzystanie
```tsx
// Button/Button.stories.tsx
import Button from './Button'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'
import { test, describe } from 'vitest'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Uniwersalny przycisk z pełną parametryzacją stylów'
      }
    }
  }
}

// Stories - wizualna dokumentacja
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
    
    await expect(button).toBeInTheDocument()
    await expect(button).toHaveClass('btn', 'btn-md', 'btn-primary')
    await userEvent.click(button)
    
    button.disabled = true
    await expect(button).toBeDisabled()
  }
}

// Vitest tests bazujące na stories
describe('Button Stories', () => {
  test('Primary story renders correctly', async () => {
    const { component, args } = Primary
    // Test używa dokładnie tej samej konfiguracji co story
    const rendered = await component.render(args)
    expect(rendered).toBeTruthy()
  })
  
  test('Interactive test passes', async () => {
    // Uruchom play function ze story
    const mockCanvas = document.createElement('div')
    await InteractiveTest.play({ canvasElement: mockCanvas })
  })
})
```

#### 3. **Test Runner dla wszystkich Stories**
```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:stories": "test-storybook",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch",
    "test:all": "npm run test && npm run test:stories",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

#### 4. **Shared Test Utilities** - DRY principle
```ts
// src/test/story-utils.ts
import { render } from '@preact/testing-library'
import { composeStories } from '@storybook/testing-library'

// Funkcja do konwersji stories na testy
export function testStory(storyModule: any, storyName: string) {
  const stories = composeStories(storyModule)
  const Story = stories[storyName]
  
  return render(<Story />)
}

// Bundle size checker dla stories
export async function testBundleSize(componentName: string, maxSize: number) {
  const stats = await import('../utils/bundle-stats.json')
  const size = stats.components[componentName]?.size || 0
  
  expect(size).toBeLessThan(maxSize)
  return size
}

// Performance test wrapper
export function withPerformanceTest(story: any, maxBundleSize = 512) {
  return {
    ...story,
    play: async (...args: any[]) => {
      // Uruchom oryginalny test
      if (story.play) {
        await story.play(...args)
      }
      
      // Dodaj test bundle size
      await testBundleSize(story.component.name, maxBundleSize)
    }
  }
}
```

#### 5. **Kompleksowy Example**
```tsx
// Card/Card.stories.tsx
import Card from './Card'
import { expect } from '@storybook/test'
import { within } from '@storybook/testing-library'
import { test, describe } from 'vitest'
import { testStory, withPerformanceTest } from '../test/story-utils'

export default {
  title: 'Components/Card',
  component: Card
}

// Basic stories
export const Default = {
  args: {
    children: 'Default card content'
  }
}

export const WithHeader = {
  args: {
    header: 'Card Title',
    children: 'Card content with header'
  }
}

// Enhanced story z automatycznym testem performance
export const Performance = withPerformanceTest({
  args: {
    children: 'Performance tested card'
  }
}, 256) // max 256B bundle size

// Vitest tests używające stories
describe('Card Component', () => {
  test('Default story renders', async () => {
    const { getByText } = testStory(import('./Card.stories'), 'Default')
    expect(getByText('Default card content')).toBeInTheDocument()
  })
  
  test('WithHeader story has correct structure', async () => {
    const { getByText } = testStory(import('./Card.stories'), 'WithHeader')
    expect(getByText('Card Title')).toBeInTheDocument()
    expect(getByText('Card content with header')).toBeInTheDocument()
  })
})
```

#### 6. **CI/CD Integration**
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build-storybook
      - name: Run Vitest
        run: npm run test:coverage
      - name: Run Storybook Tests
        run: npm run test:stories
      - name: Check Bundle Size
        run: npm run build && npx bundlesize
```

### Zalety tej Integracji

#### 🎯 **Zero Duplikacji**
- Stories służą jako dokumentacja ORAZ testy
- Jeden kod, podwójne wykorzystanie
- Konsystentność między docs a testami

#### ⚡ **Performance First**
- Każdy story może testować bundle size
- Automatyczne limity rozmiaru
- Monitoring wpływu na bundle

#### 🔧 **Developer Experience**
- Vitest UI do debugowania
- Storybook do wizualnej inspekcji
- Hot reload dla testów i stories

#### 📊 **Comprehensive Testing**
- Visual testing w Storybook
- Unit testing w Vitest
- Integration testing przez stories
- Performance testing wbudowane

### Struktura Plików
```
src/
  components/
    Button/
      Button.tsx
      Button.stories.tsx    # Stories + Vitest tests
      Button.css
      index.ts
  test/
    setup.ts              # Vitest + Storybook setup
    story-utils.ts        # Shared utilities
    __mocks__/           # Mocks
  .storybook/
    main.ts              # Storybook config
    preview.ts           # Global decorators
```

## 📚 Podejście do Dokumentacji

### Documentation-Driven Development Philosophy
NanoLux stosuje **Documentation-First approach** gdzie dokumentacja jest:

1. **Auto-Generated (80%)**: 
   - API Reference z TypeScript interfaces + JSDoc
   - Interactive Examples z Storybook stories
   - Bundle Analysis z webpack stats
   - Performance Metrics z test results

2. **Manual Content (20%)**:
   - Implementation guides i best practices
   - Migration tutorials
   - Architecture decisions

### Dokumentacja jako System
```
docs/
├── IMPLEMENTATION_ROADMAP.md   # Master checklist z fazami
├── phases/                     # Szczegóły implementacji
│   ├── phase-1-foundation.md
│   ├── phase-2-forms-navigation.md
│   ├── phase-3-interaction.md
│   └── phase-4-advanced.md
├── templates/                  # Templates dla komponentów
│   └── component-template.md
├── standards/                  # Standardy jakości
│   ├── documentation.md
│   ├── testing.md
│   ├── performance.md
│   └── accessibility.md
└── generated/                  # Auto-generated content
    ├── api/                    # TypeScript → API docs
    ├── examples/               # Storybook → examples
    └── metrics/                # Performance data
```

### Documentation Workflow
1. **TypeScript Interface** + JSDoc → Auto-generated API docs
2. **Storybook Stories** → Interactive examples + visual tests
3. **Vitest Tests** → Behavior specifications
4. **Bundle Analysis** → Performance metrics
5. **Manual Guides** → Tutorials i best practices

### Auto-Generation Pipeline
- `npm run docs:api` - Generate API docs z TypeScript
- `npm run docs:examples` - Extract examples z Stories  
- `npm run docs:metrics` - Generate performance reports
- `npm run docs:build` - Complete documentation build
- `npm run docs:deploy` - Deploy to production

### Quality Standards
- **API Coverage**: 100% interfaces documented
- **Example Coverage**: 100% components mają interactive examples
- **Link Health**: 0 broken links w dokumentacji
- **Performance**: <2s load time dla docs pages
- **Accessibility**: WCAG 2.1 AA compliance dla docs

### Integration z Development
- **Pre-commit**: Validate docs consistency
- **CI/CD**: Auto-update docs on code changes
- **Stories**: Serve as both docs i tests
- **TypeScript**: Single source of truth dla API
- **Performance**: Automated bundle size tracking