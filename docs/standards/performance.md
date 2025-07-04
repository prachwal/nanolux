# Performance Standards for NanoLux

> **Cel**: Ultra-lekkie komponenty z bundlami <1KB per komponent i wydajnością 60fps

## 🎯 Performance Philosophy

### Performance-First Development
1. **Bundle Size is King**: Każdy byte ma znaczenie w mobile-first world
2. **Compile-Time Optimization**: Maksymalna praca w build time, minimalna w runtime
3. **Tree-Shaking Friendly**: Dead code elimination dla nieużywanych komponentów
4. **Runtime Efficiency**: 60fps rendering, <16ms per frame budget

### Performance Hierarchy
```
┌─ Critical (Must Have) ────────────────┐
│ • Bundle Size <512B per component     │
│ • First Paint <100ms                  │
│ • Tree-shaking 100% effective         │
└────────────────────────────────────────┘
┌─ Important (Should Have) ─────────────┐  
│ • Render Time <16ms per component     │
│ • Memory Usage <1MB total             │
│ • Hot Reload <50ms                    │
└────────────────────────────────────────┘
┌─ Nice to Have ────────────────────────┐
│ • Build Time <10s                     │
│ • Code Splitting automatic            │
│ • Preload critical components         │
└────────────────────────────────────────┘
```

---

## 📏 Performance Budgets

### Bundle Size Targets

| Component Category | Target (Gzipped) | Max (Gzipped) | Tree-Shaking |
|-------------------|------------------|---------------|--------------|
| Basic (Button, Logo) | <256B | <512B | ✅ 100% |
| Forms (Input, Select) | <512B | <768B | ✅ 100% |
| Layout (Card, Grid) | <256B | <400B | ✅ 100% |
| Interactive (Modal, Tooltip) | <768B | <1KB | ✅ 100% |
| **Total Framework** | **<5KB** | **<7KB** | **✅ 100%** |

### Runtime Performance Targets

| Metric | Target | Max | Measurement |
|--------|--------|-----|-------------|
| First Paint | <50ms | <100ms | Lighthouse |
| Component Render | <8ms | <16ms | React DevTools |
| Event Response | <16ms | <32ms | User timing |
| Memory Usage | <512KB | <1MB | DevTools Memory |
| CPU Usage | <5% | <10% | DevTools Performance |

### Build Performance Targets

| Process | Target | Max | Tool |
|---------|--------|-----|------|
| Full Build | <5s | <10s | Vite |
| Hot Reload | <25ms | <50ms | Vite HMR |
| Type Check | <2s | <5s | TypeScript |
| Bundle Analysis | <1s | <3s | Rollup |

---

## 🔍 Measurement Tools

### Bundle Analysis Setup
```js
// vite.config.js
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    // Bundle size visualization
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: {
    // Enable detailed analysis
    reportCompressedSize: true,
    chunkSizeWarningLimit: 512,
    rollupOptions: {
      output: {
        // Manual chunk splitting per component
        manualChunks: {
          'button': ['./src/components/Button'],
          'card': ['./src/components/Card'],
          'input': ['./src/components/Input']
        }
      }
    }
  }
})
```

### Performance Monitoring
```tsx
// src/utils/performance.ts
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }
  
  measureRender(componentName: string, renderFn: () => void): number {
    const startTime = performance.now()
    renderFn()
    const endTime = performance.now()
    const duration = endTime - startTime
    
    this.recordMetric(componentName, duration)
    return duration
  }
  
  measureBundleSize(componentName: string): Promise<number> {
    return import(`../components/${componentName}`)
      .then(module => {
        const size = new Blob([JSON.stringify(module)]).size
        this.recordMetric(`${componentName}_bundle`, size)
        return size
      })
  }
  
  private recordMetric(key: string, value: number): void {
    if (!this.metrics.has(key)) {
      this.metrics.set(key, [])
    }
    this.metrics.get(key)!.push(value)
  }
  
  getMetrics(): Record<string, { avg: number; min: number; max: number }> {
    const result: Record<string, any> = {}
    
    for (const [key, values] of this.metrics) {
      result[key] = {
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values)
      }
    }
    
    return result
  }
}

// Usage in stories
export const PerformanceTest: Story = {
  play: async ({ canvasElement }) => {
    const monitor = PerformanceMonitor.getInstance()
    
    const renderTime = monitor.measureRender('Button', () => {
      // Component render logic
    })
    
    expect(renderTime).toBeLessThan(16) // 60fps budget
  }
}
```

---

## ⚡ Optimization Strategies

### 1. Bundle Size Optimization

#### Tree-Shaking Friendly Code
```tsx
// ✅ Good - Named exports for tree-shaking
export { Button } from './Button'
export { Card } from './Card'
export type { ButtonProps } from './Button'

// ❌ Bad - Barrel exports prevent tree-shaking
export * from './components'

// ✅ Good - Conditional exports
export const DevTools = process.env.NODE_ENV === 'development' 
  ? () => import('./DevTools')
  : () => null

// ✅ Good - Dynamic imports for large features
const Modal = lazy(() => import('./Modal'))
```

#### CSS Optimization
```css
/* ✅ Good - CSS Variables for runtime customization */
.btn {
  padding: var(--btn-padding, 8px 16px);
  background: var(--btn-bg, #007bff);
  color: var(--btn-color, white);
}

/* ✅ Good - Atomic classes for reusability */
.flex { display: flex; }
.gap-8 { gap: 8px; }
.items-center { align-items: center; }

/* ❌ Bad - Component-specific styles that can't be shared */
.custom-button-with-specific-styling {
  display: flex;
  gap: 8px;
  align-items: center;
  /* ... more styles */
}
```

#### Build-Time Optimizations
```js
// rollup.config.js
export default {
  plugins: [
    // Remove console.log in production
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }),
    
    // Optimize CSS
    postcss({
      plugins: [
        autoprefixer(),
        cssnano({
          preset: ['default', {
            discardComments: { removeAll: true }
          }]
        })
      ]
    }),
    
    // Bundle size analysis
    bundleSize({
      maxSize: 512, // bytes
      throwOnFail: true
    })
  ]
}
```

### 2. Runtime Performance Optimization

#### Efficient Component Design
```tsx
// ✅ Good - Memoized component
import { memo } from 'preact/compat'
import { useMemo, useCallback } from 'preact/hooks'

interface ExpensiveComponentProps {
  data: any[]
  onItemClick: (id: string) => void
}

const ExpensiveComponent = memo(({ data, onItemClick }: ExpensiveComponentProps) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true,
      formattedDate: new Date(item.date).toLocaleDateString()
    }))
  }, [data])
  
  // Stable function references
  const handleClick = useCallback((id: string) => {
    onItemClick(id)
  }, [onItemClick])
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  )
})

// ❌ Bad - Re-creates functions and objects on every render
function BadComponent({ data, onItemClick }) {
  return (
    <div>
      {data.map(item => (
        <div 
          key={item.id} 
          onClick={() => onItemClick(item.id)} // New function every render
          style={{ color: 'blue' }} // New object every render
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}
```

#### Optimized Event Handling
```tsx
// ✅ Good - Event delegation
function ListComponent({ items, onItemClick }: ListProps) {
  const handleContainerClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const itemId = target.closest('[data-item-id]')?.getAttribute('data-item-id')
    
    if (itemId) {
      onItemClick(itemId)
    }
  }, [onItemClick])
  
  return (
    <div onClick={handleContainerClick}>
      {items.map(item => (
        <div key={item.id} data-item-id={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  )
}

// ❌ Bad - Individual event handlers
function BadListComponent({ items, onItemClick }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  )
}
```

### 3. Loading Performance

#### Code Splitting Strategy
```tsx
// src/components/index.ts - Lazy loaded components
export { default as Button } from './Button' // Always loaded (critical)
export { default as Card } from './Card'     // Always loaded (critical)

// Lazy loaded for better initial bundle
export const Modal = lazy(() => import('./Modal'))
export const DataTable = lazy(() => import('./DataTable'))
export const ChartComponent = lazy(() => import('./ChartComponent'))

// Usage with Suspense
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal isOpen={showModal} />
    </Suspense>
  )
}
```

#### Preloading Strategy
```tsx
// src/utils/preload.ts
export function preloadComponent(componentName: string): Promise<any> {
  return import(`../components/${componentName}`)
}

// Preload on user interaction
function ButtonWithModalPreload() {
  const handleMouseEnter = useCallback(() => {
    preloadComponent('Modal') // Preload on hover
  }, [])
  
  return (
    <Button onMouseEnter={handleMouseEnter}>
      Open Modal
    </Button>
  )
}
```

---

## 📊 Performance Testing

### Automated Performance Tests
```tsx
// src/test/performance.test.ts
import { describe, it, expect } from 'vitest'
import { render } from '@preact/testing-library'
import { measurePerformance, PerformanceMonitor } from '../utils/performance'

describe('Performance Tests', () => {
  it('Button should render within performance budget', () => {
    const { result, time } = measurePerformance(() => {
      render(<Button variant="primary">Test</Button>)
    })
    
    expect(time).toBeLessThan(16) // 60fps budget
  })
  
  it('Component bundle should be under size limit', async () => {
    const monitor = PerformanceMonitor.getInstance()
    const bundleSize = await monitor.measureBundleSize('Button')
    
    expect(bundleSize).toBeLessThan(512) // 512B limit
  })
  
  it('Component should not cause memory leaks', () => {
    const initialMemory = performance.memory?.usedJSHeapSize || 0
    
    // Render and unmount 100 times
    for (let i = 0; i < 100; i++) {
      const { unmount } = render(<Button>Test {i}</Button>)
      unmount()
    }
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc()
    }
    
    const finalMemory = performance.memory?.usedJSHeapSize || 0
    const memoryIncrease = finalMemory - initialMemory
    
    expect(memoryIncrease).toBeLessThan(100_000) // <100KB increase
  })
})
```

### Performance Benchmarking
```tsx
// src/test/benchmarks/render-performance.test.ts
import { bench, describe } from 'vitest'
import { render } from '@preact/testing-library'
import Button from '../components/Button'

describe('Render Performance Benchmarks', () => {
  bench('Button render time', () => {
    render(<Button variant="primary">Benchmark</Button>)
  })
  
  bench('Button with custom props render time', () => {
    render(
      <Button 
        variant="primary" 
        size="lg" 
        bg="#custom" 
        disabled={false}
      >
        Custom Button
      </Button>
    )
  })
  
  bench('Multiple buttons render time', () => {
    render(
      <div>
        {Array.from({ length: 100 }, (_, i) => (
          <Button key={i} variant="primary">Button {i}</Button>
        ))}
      </div>
    )
  })
})
```

---

## 🚨 Performance Monitoring

### CI/CD Performance Gates
```yaml
# .github/workflows/performance.yml
name: Performance Tests
on: [push, pull_request]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      
      # Bundle size check
      - name: Check Bundle Size
        run: |
          npm run build
          npm run bundle:analyze
          npm run bundle:check
      
      # Runtime performance tests
      - name: Performance Tests
        run: npm run test:performance
      
      # Lighthouse CI
      - name: Lighthouse CI
        run: |
          npm run build-storybook
          npx lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
      
      # Comment results on PR
      - name: Comment Performance Results
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs')
            const results = JSON.parse(fs.readFileSync('performance-results.json'))
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Performance Results
              
              **Bundle Size**: ${results.bundleSize}KB (${results.bundleDiff > 0 ? '+' : ''}${results.bundleDiff}KB)
              **Render Time**: ${results.renderTime}ms (target: <16ms)
              **Lighthouse Score**: ${results.lighthouse}/100
              `
            })
```

### Runtime Performance Dashboard
```tsx
// src/utils/performance-dashboard.ts
export class PerformanceDashboard {
  private static metrics: PerformanceMetric[] = []
  
  static track(componentName: string, metric: string, value: number): void {
    this.metrics.push({
      componentName,
      metric,
      value,
      timestamp: Date.now()
    })
    
    // Send to analytics service
    if (typeof window !== 'undefined') {
      this.sendToAnalytics({ componentName, metric, value })
    }
  }
  
  static getComponentMetrics(componentName: string): PerformanceMetric[] {
    return this.metrics.filter(m => m.componentName === componentName)
  }
  
  private static sendToAnalytics(data: any): void {
    // Implementation for sending metrics to analytics service
    // e.g., Google Analytics, DataDog, etc.
  }
}

// Usage in components
export function withPerformanceTracking<P>(
  Component: ComponentType<P>,
  componentName: string
) {
  return function PerformanceTrackedComponent(props: P) {
    useEffect(() => {
      const startTime = performance.now()
      
      return () => {
        const renderTime = performance.now() - startTime
        PerformanceDashboard.track(componentName, 'renderTime', renderTime)
      }
    }, [])
    
    return <Component {...props} />
  }
}
```

---

## 🎯 Performance Success Criteria

### Release Criteria
- [ ] All components <512B bundle size
- [ ] Total framework <7KB
- [ ] 100% tree-shaking effectiveness
- [ ] All render times <16ms
- [ ] No memory leaks detected
- [ ] Lighthouse score >95

### Monitoring Alerts
- **Bundle Size Regression**: >10% increase triggers alert
- **Render Performance**: >20ms render time triggers alert  
- **Memory Usage**: >1MB usage triggers alert
- **Build Time**: >15s build triggers alert

### Performance Review Process
1. **Weekly Review**: Bundle size trends, performance regressions
2. **Release Review**: Full performance audit before major releases
3. **Quarterly Review**: Performance targets reassessment
4. **Annual Review**: Technology stack performance evaluation

---

## 🔧 Performance Tools & Scripts

### Bundle Analysis Scripts
```json
{
  "scripts": {
    "bundle:analyze": "vite build --mode analyze",
    "bundle:visualize": "npx webpack-bundle-analyzer dist/assets/*.js",
    "bundle:check": "node scripts/check-bundle-size.js",
    "bundle:report": "node scripts/generate-bundle-report.js",
    "perf:test": "vitest run --config vitest.performance.config.js",
    "perf:bench": "vitest bench",
    "perf:profile": "node --prof scripts/profile-components.js"
  }
}
```

### Performance Utilities
```js
// scripts/check-bundle-size.js
const fs = require('fs')
const path = require('path')
const gzipSize = require('gzip-size')

const BUNDLE_LIMITS = {
  'button': 512,
  'card': 400,
  'input': 768,
  'modal': 1024
}

async function checkBundleSize() {
  const distPath = path.join(__dirname, '../dist/assets')
  const files = fs.readdirSync(distPath)
  
  for (const file of files) {
    if (file.endsWith('.js')) {
      const filePath = path.join(distPath, file)
      const content = fs.readFileSync(filePath)
      const size = gzipSize.sync(content)
      
      const componentName = extractComponentName(file)
      const limit = BUNDLE_LIMITS[componentName]
      
      if (limit && size > limit) {
        console.error(`❌ ${componentName}: ${size}B > ${limit}B limit`)
        process.exit(1)
      } else {
        console.log(`✅ ${componentName}: ${size}B (limit: ${limit}B)`)
      }
    }
  }
}

checkBundleSize()
```

---

*Performance Standards v1.0*  
*Last updated: July 4, 2025*
