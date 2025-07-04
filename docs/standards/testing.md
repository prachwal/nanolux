# Testing Strategy for NanoLux

> **Cel**: Comprehensive testing z minimalnym boilerplate i maksymalną automatyzacją

## 🎯 Testing Philosophy

### Stories-as-Tests Approach
1. **Zero Duplication**: Stories służą jako dokumentacja ORAZ testy
2. **User-Centric**: Testujemy jak użytkownik, nie implementację
3. **Performance-First**: Każdy test sprawdza bundle size
4. **Build-Time Validation**: Większość błędów wyłapujemy podczas budowania

### Testing Pyramid for NanoLux
```
┌─ E2E Tests (5%) ──────────────────────┐
│ • Critical user journeys              │
│ • Cross-browser compatibility         │
└────────────────────────────────────────┘
┌─ Integration Tests (15%) ─────────────┐  
│ • Component interactions              │
│ • Storybook play functions            │
│ • Visual regression testing           │
└────────────────────────────────────────┘
┌─ Unit Tests (80%) ────────────────────┐
│ • Component logic                     │
│ • Props validation                    │
│ • Event handling                      │
│ • Bundle size validation              │
└────────────────────────────────────────┘
```

---

## 🧪 Testing Stack

### Core Testing Tools
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",                    // Unit testing framework
    "@storybook/test": "^7.6.0",          // Storybook testing utilities
    "@storybook/test-runner": "^0.16.0",   // Stories → tests runner
    "@preact/testing-library": "^3.2.0",  // Preact testing utilities
    "@testing-library/jest-dom": "^6.0.0", // DOM matchers
    "@testing-library/user-event": "^14.0.0", // User interaction simulation
    "jsdom": "^23.0.0",                    // DOM environment for tests
    "chromatic": "^10.0.0"                // Visual regression testing
  }
}
```

### Integration Setup
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

---

## 📝 Test Categories

### 1. Component Unit Tests

**Purpose**: Testowanie logiki komponentu w izolacji
**Location**: `*.test.tsx` lub w `*.stories.tsx`
**Coverage**: Props, events, state changes

```tsx
// Button.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@preact/testing-library'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Test button</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Test button')
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-primary')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick}>Clickable</Button>)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('respects disabled state', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).not.toHaveBeenCalled()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### 2. Interactive Story Tests

**Purpose**: Testowanie interakcji użytkownika w kontekście wizualnym
**Location**: `*.stories.tsx` - `play` functions
**Coverage**: User workflows, accessibility, visual states

```tsx
// Button.stories.tsx
export const InteractiveTest: Story = {
  args: {
    variant: 'primary',
    children: 'Test Button'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    
    // Visual verification
    await expect(button).toBeInTheDocument()
    await expect(button).toHaveClass('btn', 'btn-primary')
    
    // Interaction testing
    await userEvent.hover(button)
    await userEvent.click(button)
    
    // Accessibility testing
    await expect(button).toHaveAttribute('type', 'button')
    await expect(button).not.toHaveAttribute('aria-disabled', 'true')
    
    // Keyboard navigation
    await userEvent.tab()
    await expect(button).toHaveFocus()
    
    // Custom assertions
    await expect(button).toHaveStyle('cursor: pointer')
  }
}
```

### 3. Performance Tests

**Purpose**: Validacja bundle size i runtime performance
**Location**: `src/test/performance/`
**Coverage**: Bundle size, render time, memory usage

```tsx
// src/test/performance/bundle-size.test.ts
import { describe, it, expect } from 'vitest'
import { analyzeBundle } from '../utils/bundle-analyzer'

describe('Bundle Size Tests', () => {
  it('Button component should be under 512B', async () => {
    const size = await analyzeBundle('./src/components/Button')
    expect(size.gzipped).toBeLessThan(512)
    expect(size.minified).toBeLessThan(1024)
  })

  it('Total framework should be under 7KB', async () => {
    const size = await analyzeBundle('./src/components')
    expect(size.gzipped).toBeLessThan(7 * 1024)
  })
})

// Performance test utility
export function withPerformanceTest(story: any, maxBundleSize = 512) {
  return {
    ...story,
    play: async (...args: any[]) => {
      const startTime = performance.now()
      
      // Run original test
      if (story.play) {
        await story.play(...args)
      }
      
      const renderTime = performance.now() - startTime
      
      // Performance assertions
      expect(renderTime).toBeLessThan(16) // 60fps = 16ms budget
      
      // Bundle size check (if available)
      const componentName = story.component?.name || 'Unknown'
      await testBundleSize(componentName, maxBundleSize)
    }
  }
}
```

### 4. Accessibility Tests

**Purpose**: Zapewnienie dostępności dla wszystkich użytkowników
**Location**: `*.stories.tsx` lub dedykowane pliki
**Coverage**: ARIA, keyboard navigation, screen readers

```tsx
// src/test/accessibility/axe.test.ts
import { describe, it, expect } from 'vitest'
import { render } from '@preact/testing-library'
import { axe, toHaveNoViolations } from 'jest-axe'
import Button from '../components/Button/Button'

expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  it('Button should have no accessibility violations', async () => {
    const { container } = render(<Button variant="primary">Test</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Button should support keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<Button>Keyboard test</Button>)
    
    await user.tab()
    expect(screen.getByRole('button')).toHaveFocus()
    
    await user.keyboard('{Enter}')
    // Verify Enter key activates button
  })
})

// Accessibility story test
export const AccessibilityTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Run axe accessibility tests
    const results = await axe(canvasElement)
    expect(results.violations).toHaveLength(0)
    
    // Keyboard navigation test
    await userEvent.tab()
    const focusedElement = canvas.getByRole('button')
    await expect(focusedElement).toHaveFocus()
    
    // Screen reader test
    await expect(focusedElement).toHaveAccessibleName()
    await expect(focusedElement).toHaveAccessibleDescription()
  }
}
```

### 5. Visual Regression Tests

**Purpose**: Wykrywanie nieoczekiwanych zmian wizualnych
**Tool**: Chromatic + Storybook
**Coverage**: All stories, different viewports, themes

```tsx
// chromatic.config.js
module.exports = {
  projectToken: process.env.CHROMATIC_PROJECT_TOKEN,
  buildScriptName: 'build-storybook',
  onlyChanged: true, // Only test changed stories
  exitZeroOnChanges: true,
  ignoreLastBuildOnBranch: 'main'
}

// Visual regression story
export const VisualRegression: Story = {
  parameters: {
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
        mobile: { viewport: 'mobile' },
        tablet: { viewport: 'tablet' },
        desktop: { viewport: 'desktop' }
      }
    }
  }
}
```

---

## 🔧 Test Utilities

### Shared Test Setup
```ts
// src/test/setup.ts
import { expect, afterEach } from 'vitest'
import { cleanup } from '@preact/testing-library'
import * as matchers from '@testing-library/jest-dom/matchers'
import { setProjectAnnotations } from '@storybook/preact'
import * as projectAnnotations from '../.storybook/preview'

// Extend Vitest matchers
expect.extend(matchers)

// Storybook integration
setProjectAnnotations(projectAnnotations)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Global test configuration
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
```

### Custom Testing Utilities
```tsx
// src/test/utils.tsx
import { render, RenderOptions } from '@preact/testing-library'
import { ComponentChildren } from 'preact'

// Theme wrapper for testing
interface ThemeWrapperProps {
  theme?: 'light' | 'dark'
  children: ComponentChildren
}

function ThemeWrapper({ theme = 'light', children }: ThemeWrapperProps) {
  return (
    <div data-theme={theme} class={`theme-${theme}`}>
      {children}
    </div>
  )
}

// Custom render with theme support
export function renderWithTheme(
  ui: React.ReactElement,
  options: RenderOptions & { theme?: 'light' | 'dark' } = {}
) {
  const { theme, ...renderOptions } = options
  
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeWrapper theme={theme}>{children}</ThemeWrapper>
    ),
    ...renderOptions
  })
}

// Story testing utility
export function testStory(storyModule: any, storyName: string) {
  const stories = composeStories(storyModule)
  const Story = stories[storyName]
  return render(<Story />)
}

// Bundle size testing
export async function testBundleSize(componentName: string, maxSize: number) {
  try {
    const stats = await import('../utils/bundle-stats.json')
    const size = stats.components[componentName]?.gzipped || 0
    expect(size).toBeLessThan(maxSize)
    return size
  } catch {
    console.warn(`Bundle stats not available for ${componentName}`)
    return 0
  }
}

// Performance measurement
export function measurePerformance<T>(fn: () => T): { result: T; time: number } {
  const start = performance.now()
  const result = fn()
  const time = performance.now() - start
  return { result, time }
}
```

---

## 📊 Test Coverage

### Coverage Targets
- **Unit Tests**: >85% line coverage
- **Component Tests**: 100% public API coverage  
- **Story Tests**: 100% components have interactive tests
- **Accessibility**: 100% components tested with axe
- **Performance**: 100% components have bundle size tests

### Coverage Configuration
```js
// vitest.config.js
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      include: ['src/components/**/*.{ts,tsx}'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
      thresholds: {
        global: {
          statements: 85,
          branches: 80,
          functions: 85,
          lines: 85
        }
      }
    }
  }
})
```

---

## 🚀 Testing Workflow

### Development Workflow
```bash
# Podczas developmentu
npm run test:watch          # Watch mode dla szybkiego feedbacku
npm run storybook          # Visual testing w Storybook
npm run test:coverage      # Sprawdź coverage

# Przed commitowaniem  
npm run test:all           # Wszystkie testy
npm run test:bundle        # Bundle size validation
npm run test:accessibility # A11y tests
```

### CI/CD Pipeline
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
      
      # Unit tests
      - name: Run Unit Tests
        run: npm run test:coverage
      
      # Story tests  
      - name: Build Storybook
        run: npm run build-storybook
      - name: Run Story Tests
        run: npm run test:storybook
      
      # Performance tests
      - name: Bundle Size Analysis
        run: npm run test:bundle
      
      # Visual regression tests
      - name: Chromatic Visual Tests
        run: npm run chromatic
        env:
          CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
      
      # Upload coverage
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
```

---

## 🎯 Quality Gates

### Pre-merge Requirements
- [ ] All unit tests pass
- [ ] All story tests pass  
- [ ] Coverage >85%
- [ ] No accessibility violations
- [ ] Bundle size within limits
- [ ] No visual regressions (Chromatic)

### Release Requirements
- [ ] Full test suite passes
- [ ] Performance benchmarks met
- [ ] Cross-browser testing complete
- [ ] Documentation tests pass
- [ ] E2E critical paths verified

---

## 📈 Testing Metrics

### Automated Metrics Collection
```tsx
// src/test/metrics.ts
export interface TestMetrics {
  coverage: {
    statements: number
    branches: number
    functions: number
    lines: number
  }
  performance: {
    avgRenderTime: number
    bundleSize: number
    memoryUsage: number
  }
  accessibility: {
    violationsCount: number
    passRate: number
  }
  reliability: {
    testPassRate: number
    flakyTestCount: number
  }
}

export async function collectTestMetrics(): Promise<TestMetrics> {
  // Implementation for collecting metrics
}
```

### Metrics Dashboard
- **Coverage Trends**: Track over time
- **Performance Regression**: Bundle size, render time
- **Accessibility Score**: Violation trends
- **Test Reliability**: Flaky test detection

---

## 🔍 Debugging Tests

### Debug Configuration
```js
// .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
  "args": ["run", "--reporter=verbose"],
  "console": "integratedTerminal"
}
```

### Debug Utilities
```tsx
// src/test/debug-utils.tsx
export function debugRender(component: React.ReactElement) {
  const { debug } = render(component)
  debug() // Prints DOM to console
}

export function debugStory(story: any) {
  return {
    ...story,
    play: async (...args: any[]) => {
      console.log('Story args:', args)
      if (story.play) {
        await story.play(...args)
      }
    }
  }
}
```

---

*Testing Strategy v1.0*  
*Last updated: July 4, 2025*
