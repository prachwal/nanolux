# 🚀 NanoLux

> Minimalistyczny framework dla Preact - Ultra-małe bundly, Zero config, Performance-first

[![Tests](https://img.shields.io/badge/tests-30%2F30%20passing-brightgreen)](./docs/testing/)
[![Bundle Size](https://img.shields.io/badge/runtime-%3C1KB-blue)](./docs/performance/)
[![Framework](https://img.shields.io/badge/framework-Preact%203KB-purple)](https://preactjs.com/)

## ✨ Główne Założenia

- **🏃‍♂️ Ultra-małe bundly**: <1KB runtime, ekstremalna optymalizacja rozmiaru
- **⚡ Zero config**: działa out-of-the-box, minimal setup  
- **⚛️ Preact-first**: wykorzystuje zalety Preact (3KB vs 45KB React)
- **🎨 Atomic CSS**: performance-first styling, zero runtime overhead
- **🛠️ Modern tooling**: Vite, esbuild, TypeScript support

## 🚀 Quick Start

```bash
# Instalacja
npm install

# Development server (Vite + HMR)
npm run dev

# Storybook - component development
npm run storybook

# Testy - Vitest + @testing-library/preact
npm run test

# Build produkcyjny
npm run build
```

## 📂 Struktura Projektu

```
src/
├── components/           # Komponenty z co-located files
│   ├── Button/
│   │   ├── Button.tsx           # Główny komponent
│   │   ├── Button.css           # Atomic CSS styles
│   │   ├── Button.stories.tsx   # Storybook stories
│   │   ├── Button.test.tsx      # Vitest tests
│   │   └── index.ts            # Re-export
│   └── CounterDemo/
├── styles/              # Atomic CSS system
│   └── atomic.css
└── test/               # Test utilities & setup
    ├── setup.ts
    └── utils.ts
```

## 🧪 Testing System

**Vitest + Storybook Integration** - najlepsze z dwóch światów:

- ✅ **30/30 testów przechodzi** - pełna pokrycie komponentów
- ⚡ **Vitest** - ultra-fast test runner
- 🎭 **@testing-library/preact** - user-centric testing
- 📚 **Stories jako testy** - zero duplikacji
- 🎯 **Performance testing** - bundle size monitoring

```bash
npm run test          # Watch mode
npm run test:ui       # UI interface  
npm run test:coverage # Coverage report
```

## 🎨 Component Development

### Atomic CSS First

```jsx
// ✅ Preferowane - atomic classes
<div class="flex gap-12 mt-16 flex-wrap">
  <Button variant="primary">Click me</Button>
</div>

// ✅ CSS Variables dla customizacji
<Button 
  bg="#ff6b6b" 
  color="white"
  variant="primary"
>
  Custom Button
</Button>
```

### Preact Syntax

```jsx
// ✅ Preact - używaj 'class'
<div class="btn btn-primary">Button</div>

// ✅ Import z preact
import { useState } from 'preact/hooks'

// ✅ TypeScript support
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  children: ComponentChildren
}
```

## 📚 Dokumentacja

Kompletna dokumentacja znajduje się w [`/docs`](./docs/):

- 🧪 [**Testing**](./docs/testing/) - Vitest setup, testing guide
- 🎨 [**Components**](./docs/components/) - Architecture, best practices  
- ⚡ [**Performance**](./docs/performance/) - Bundle optimization, benchmarks
- 🛠️ [**Development**](./docs/development/) - VS Code setup, tooling

## 🎯 Performance Budgets

| Component Type | Max Bundle Size | Status |
|----------------|-----------------|--------|
| Button | 512B | ✅ 489B |
| CounterDemo | 1KB | ✅ 756B |
| Card | 1KB | 🔄 Planning |

## 🛠️ Tech Stack

- **⚛️ Preact** - 3KB UI library (vs 45KB React)
- **⚡ Vite** - Ultra-fast build tool
- **🧪 Vitest** - Lightning-fast testing
- **📚 Storybook** - Component development & docs
- **🎨 Atomic CSS** - Performance-first styling
- **📝 TypeScript** - Optional type safety

## 🔧 VS Code Setup

Projekt zawiera kompletną konfigurację VS Code:

- **Extensions**: Vitest, Preact support, Atomic CSS IntelliSense
- **Tasks**: Test runner, build tasks, development servers  
- **Debug**: Component debugging, test debugging
- **Settings**: Optimized for NanoLux development

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature-name`
3. **Test** your changes: `npm run test`
4. **Build** & verify: `npm run build`
5. **Submit** pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

**NanoLux** - Where minimalism meets performance 🚀

[📚 Documentation](./docs/) | [🧪 Testing Guide](./docs/testing/) | [🎯 Performance](./docs/performance/)
