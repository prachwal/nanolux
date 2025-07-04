# ⚡ Performance Documentation

Dokumentacja optymalizacji wydajności w NanoLux.

## 📑 Zawartość

### Bundle Optimization
- **Tree-shaking** - Automatyczne usuwanie nieużywanego kodu
- **Code splitting** - Intelligent component splitting
- **CSS purging** - Tylko używane atomic classes

### Build-time Magic
- **Compile-time optimizations** - Maksimum pracy w build time
- **Static analysis** - Automatyczne wykrywanie wzorców
- **Bundle size monitoring** - Continuous size tracking

### Runtime Performance
- **Preact advantages** - 3KB vs 45KB React
- **Atomic CSS benefits** - Zero runtime overhead
- **Component memoization** - Smart re-rendering

## 🎯 Performance Budgets

| Component Type | Max Bundle Size | Max Render Time |
|----------------|-----------------|-----------------|
| Atomic (Button) | 512B | 1ms |
| Composite (Card) | 1KB | 5ms |
| Page Component | 5KB | 10ms |
| Full Application | 50KB | 100ms |

## 📊 Monitoring Tools

- **Bundle Analyzer** - Vite bundle analysis
- **Performance API** - Runtime measurement
- **Lighthouse** - Core Web Vitals
- **Vitest Benchmarks** - Component performance tests
