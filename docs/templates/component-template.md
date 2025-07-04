# Component Template

> **Standardowy template dla wszystkich komponentów NanoLux**

## 📁 Struktura Plików

```
src/components/ComponentName/
├── ComponentName.tsx          # Główny komponent
├── ComponentName.css          # Style (opcjonalnie)
├── ComponentName.stories.tsx  # Stories + visual tests
├── ComponentName.test.tsx     # Unit tests (opcjonalnie)
└── index.ts                   # Re-export
```

---

## 🧩 Template: ComponentName.tsx

```tsx
import { ComponentChildren, JSX } from 'preact'

/**
 * Props dla komponentu ComponentName
 */
export interface ComponentNameProps {
  /** Wariant komponentu */
  variant?: 'default' | 'primary' | 'secondary'
  
  /** Rozmiar komponentu */
  size?: 'sm' | 'md' | 'lg'
  
  /** Czy komponent jest disabled */
  disabled?: boolean
  
  /** Custom kolor tła (CSS variable) */
  bg?: string
  
  /** Custom kolor tekstu (CSS variable) */
  color?: string
  
  /** Zawartość komponentu */
  children: ComponentChildren
  
  /** Callback onClick */
  onClick?: JSX.MouseEventHandler<HTMLDivElement>
  
  /** Dodatkowe klasy CSS */
  class?: string
  
  /** Dodatkowe style inline */
  style?: string | JSX.CSSProperties
}

/**
 * ComponentName - opis komponentu
 * 
 * @example
 * ```tsx
 * <ComponentName variant="primary" size="lg">
 *   Content here
 * </ComponentName>
 * ```
 * 
 * @example
 * ```tsx
 * // Custom colors
 * <ComponentName bg="#ff6b6b" color="white">
 *   Custom styled
 * </ComponentName>
 * ```
 */
export default function ComponentName({
  variant = 'default',
  size = 'md',
  disabled = false,
  bg,
  color,
  children,
  onClick,
  class: className = '',
  style,
  ...props
}: ComponentNameProps) {
  // CSS classes composition
  const baseClass = 'component-name'
  const sizeClass = `component-name-${size}`
  const variantClass = variant !== 'default' ? `component-name-${variant}` : ''
  const disabledClass = disabled ? 'component-name-disabled' : ''
  
  const cssClasses = [
    baseClass,
    sizeClass,
    variantClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ')
  
  // Custom CSS variables
  const customStyle = {
    ...(bg && { '--component-bg': bg }),
    ...(color && { '--component-color': color }),
    ...(typeof style === 'object' ? style : {})
  }
  
  const finalStyle = typeof style === 'string' 
    ? `${Object.entries(customStyle).map(([k, v]) => `${k}: ${v}`).join('; ')}; ${style}`
    : customStyle

  return (
    <div
      class={cssClasses}
      style={finalStyle}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </div>
  )
}

// Named export dla re-exportu
export { ComponentName }
```

---

## 🎨 Template: ComponentName.css

```css
/**
 * ComponentName styles
 * Używa CSS Variables dla pełnej parametryzacji
 */

.component-name {
  /* Base styles z CSS variables */
  padding: var(--component-padding, 12px 16px);
  background: var(--component-bg, transparent);
  color: var(--component-color, inherit);
  border: var(--component-border, 1px solid #e2e8f0);
  border-radius: var(--component-radius, 6px);
  
  /* Typography */
  font-family: inherit;
  font-size: var(--component-font-size, 0.875rem);
  font-weight: var(--component-font-weight, 400);
  line-height: var(--component-line-height, 1.5);
  
  /* Transitions */
  transition: var(--component-transition, all 0.2s ease);
  
  /* Cursor */
  cursor: var(--component-cursor, default);
}

/* Size variants */
.component-name-sm {
  --component-padding: 8px 12px;
  --component-font-size: 0.75rem;
}

.component-name-md {
  --component-padding: 12px 16px;
  --component-font-size: 0.875rem;
}

.component-name-lg {
  --component-padding: 16px 24px;
  --component-font-size: 1rem;
}

/* Variant styles */
.component-name-primary {
  --component-bg: #3b82f6;
  --component-color: white;
  --component-border: 1px solid #3b82f6;
}

.component-name-secondary {
  --component-bg: #f1f5f9;
  --component-color: #475569;
  --component-border: 1px solid #e2e8f0;
}

/* State styles */
.component-name:hover:not(.component-name-disabled) {
  opacity: 0.9;
  transform: var(--component-hover-transform, none);
}

.component-name:focus {
  outline: 2px solid var(--component-focus-color, #3b82f6);
  outline-offset: 2px;
}

.component-name-disabled {
  --component-cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .component-name {
    --component-padding: 8px 12px;
    --component-font-size: 0.75rem;
  }
}
```

---

## 📖 Template: ComponentName.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/preact'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'
import ComponentName from './ComponentName'

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Opis komponentu ComponentName. Wspiera różne warianty i rozmiary z atomic CSS classes.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: { type: 'boolean' }
    },
    bg: {
      control: { type: 'color' }
    },
    color: {
      control: { type: 'color' }
    }
  }
}

export default meta
type Story = StoryObj<typeof ComponentName>

// Basic stories
export const Default: Story = {
  args: {
    children: 'Default ComponentName'
  }
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary ComponentName'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary ComponentName'
  }
}

// Size variations
export const AllSizes: Story = {
  render: () => (
    <div class="flex gap-16 items-center">
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie dostępne rozmiary komponentu'
      }
    }
  }
}

// Variant showcase
export const AllVariants: Story = {
  render: () => (
    <div class="flex gap-16 items-center">
      <ComponentName variant="default">Default</ComponentName>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie dostępne warianty komponentu'
      }
    }
  }
}

// Custom colors
export const CustomColors: Story = {
  render: () => (
    <div class="flex gap-16 items-center">
      <ComponentName bg="#ff6b6b" color="white">Custom Red</ComponentName>
      <ComponentName bg="#4ecdc4" color="white">Custom Teal</ComponentName>
      <ComponentName bg="#45b7d1" color="white">Custom Blue</ComponentName>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Komponenty z custom kolorami używającymi CSS variables'
      }
    }
  }
}

// States
export const States: Story = {
  render: () => (
    <div class="flex gap-16 items-center">
      <ComponentName>Normal</ComponentName>
      <ComponentName disabled>Disabled</ComponentName>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Różne stany komponentu - normal i disabled'
      }
    }
  }
}

// Interactive test with comprehensive testing
export const InteractiveTest: Story = {
  args: {
    variant: 'primary',
    children: 'Test Component'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test: komponent się renderuje
    const component = canvas.getByText('Test Component')
    await expect(component).toBeInTheDocument()
    
    // Test: ma poprawne klasy CSS
    await expect(component).toHaveClass('component-name', 'component-name-md', 'component-name-primary')
    
    // Test: reaguje na hover (symulacja)
    await userEvent.hover(component)
    
    // Test: ma poprawne aria attributes
    await expect(component).toHaveAttribute('aria-disabled', 'false')
    
    // Test: można kliknąć (jeśli ma onClick)
    if (component.onclick) {
      await userEvent.click(component)
    }
  }
}

// Performance test z bundle size
export const PerformanceTest: Story = {
  args: {
    children: 'Performance test'
  },
  parameters: {
    docs: {
      description: {
        story: 'Test performance - komponent powinien mieć minimalny wpływ na bundle size (<512B)'
      }
    }
  }
}

// Accessibility test
export const AccessibilityTest: Story = {
  args: {
    children: 'Accessibility test'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const component = canvas.getByText('Accessibility test')
    
    // Test: keyboard navigation
    await userEvent.tab()
    
    // Test: ARIA attributes
    await expect(component).toHaveAttribute('aria-disabled')
    
    // Test: focus management
    if (component.tabIndex !== -1) {
      component.focus()
      await expect(component).toHaveFocus()
    }
  }
}
```

---

## 🧪 Template: ComponentName.test.tsx (opcjonalny)

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@preact/testing-library'
import userEvent from '@testing-library/user-event'
import ComponentName from './ComponentName'

describe('ComponentName', () => {
  it('renders with default props', () => {
    render(<ComponentName>Test content</ComponentName>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    render(<ComponentName variant="primary">Primary test</ComponentName>)
    const element = screen.getByText('Primary test')
    expect(element).toHaveClass('component-name-primary')
  })

  it('applies size classes correctly', () => {
    render(<ComponentName size="lg">Large test</ComponentName>)
    const element = screen.getByText('Large test')
    expect(element).toHaveClass('component-name-lg')
  })

  it('handles disabled state', () => {
    render(<ComponentName disabled>Disabled test</ComponentName>)
    const element = screen.getByText('Disabled test')
    expect(element).toHaveClass('component-name-disabled')
    expect(element).toHaveAttribute('aria-disabled', 'true')
  })

  it('applies custom colors via CSS variables', () => {
    render(<ComponentName bg="#ff0000" color="#ffffff">Custom colors</ComponentName>)
    const element = screen.getByText('Custom colors')
    expect(element.style.getPropertyValue('--component-bg')).toBe('#ff0000')
    expect(element.style.getPropertyValue('--component-color')).toBe('#ffffff')
  })

  it('handles click events when not disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<ComponentName onClick={handleClick}>Clickable</ComponentName>)
    const element = screen.getByText('Clickable')
    
    await user.click(element)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not handle click events when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<ComponentName disabled onClick={handleClick}>Disabled clickable</ComponentName>)
    const element = screen.getByText('Disabled clickable')
    
    await user.click(element)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
```

---

## 📤 Template: index.ts

```tsx
/**
 * ComponentName - Re-exports
 */

export { default } from './ComponentName'
export type { ComponentNameProps } from './ComponentName'

// Dodatkowe eksporty jeśli potrzebne
// export { ComponentName } from './ComponentName'
```

---

## 📋 Checklist Implementacji

### ✅ Kod
- [ ] Interface z pełną typizacją
- [ ] JSDoc dla wszystkich props
- [ ] CSS Variables dla customizacji  
- [ ] Atomic classes support
- [ ] Accessibility attributes
- [ ] Error boundaries (jeśli potrzebne)

### ✅ Styling
- [ ] CSS Variables dla wszystkich właściwości
- [ ] Responsive design
- [ ] Dark mode support (przez variables)
- [ ] Hover/focus states
- [ ] Transition animations
- [ ] Bundle size <512B

### ✅ Stories
- [ ] Basic variants (Default, Primary, etc.)
- [ ] AllSizes showcase
- [ ] AllVariants showcase  
- [ ] CustomColors example
- [ ] States (disabled, loading, etc.)
- [ ] InteractiveTest z comprehensive testing
- [ ] PerformanceTest
- [ ] AccessibilityTest

### ✅ Testing
- [ ] Unit tests dla core functionality
- [ ] Interactive tests w Stories
- [ ] Performance tests (bundle size)
- [ ] Accessibility tests
- [ ] Visual regression tests (Chromatic)

### ✅ Documentation
- [ ] JSDoc na interface
- [ ] Usage examples w JSDoc
- [ ] Story descriptions
- [ ] README.md w folderze komponentu

---

## 🎯 Performance Guidelines

### Bundle Size
- **Target**: <512B per komponent
- **Method**: Tree-shaking, minimal dependencies
- **Monitoring**: Webpack Bundle Analyzer

### Runtime Performance  
- **Target**: <16ms render time
- **Method**: Minimalne DOM manipulacje
- **Monitoring**: React DevTools Profiler

### CSS Performance
- **Method**: Atomic classes, CSS Variables
- **Avoid**: Runtime CSS-in-JS
- **Target**: <50ms style recalculation

---

*Template version: 1.0*  
*Last updated: July 4, 2025*
