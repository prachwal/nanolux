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

## Zalety tego podejścia
- **Wszystko w jednym miejscu**: Łatwe zarządzanie
- **Automatyczna dokumentacja**: Z TypeScript + JSDoc
- **Stories jako testy**: Mniej boilerplate
- **Izolacja**: Każdy komponent jest niezależny
- **Tree-shaking**: Tylko używane komponenty w bundle

## Constraints