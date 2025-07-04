# 🎨 Components Documentation

Architektura i najlepsze praktyki dla komponentów NanoLux.

## � Phase 1: Foundation Components

### ✅ Core Components (Complete)
- **[Button](./Button.md)** - Enhanced button with 5 variants, 4 sizes, loading states (~512B)
- **[Input](./Input.md)** - Complete input/text field with types, icons, validation (~400B)  
- **[Card](./Card.md)** - Versatile container with variants and theming (~300B)
- **[Layout](./Layout.md)** - Flex & Stack helpers for atomic layouts (~100B)
- **[Typography](./Typography.md)** - Heading & Text system with semantic hierarchy (~200B)
- **[Logo](./Logo.md)** - Pre-existing logo component, fully validated (~150B)

**Total Phase 1 Bundle**: ~2.5KB | **Test Coverage**: 233/233 passed | **Stories**: 50+ interactive examples

## 📑 Documentation Structure

### Component Architecture
- **Folder per Component** - Wszystko w jednym miejscu
- **Co-located Files** - Kod, style, testy, stories razem
- **TypeScript Optional** - Pełne wsparcie, ale nie wymagane
- **Automatic Documentation** - Z TypeScript types i JSDoc

### Styling Approach
- **Atomic CSS First** - Preferuj atomic classes
- **CSS Variables** - Parametryzacja komponentów
- **Zero Runtime** - Brak JavaScript dla stylów
- **Build-time Purging** - Tylko używane klasy

### Component Patterns
- **Preact Syntax** - `class` zamiast `className`
- **Hook-based Logic** - Funkcyjne komponenty
- **Props Interface** - Strict TypeScript typing
- **Performance First** - Memoization, useCallback

## 🏗️ Struktura Komponentu

```
Button/
  ├── Button.tsx          # Główny komponent
  ├── Button.css          # Style (opcjonalne)
  ├── Button.stories.tsx  # Stories + visual tests
  ├── Button.test.tsx     # Unit tests
  ├── Button.examples.tsx # Examples showcase
  └── index.ts           # Re-export
```

## 🎯 Best Practices

1. **Atomic First** - Używaj atomic classes
2. **Performance Budgets** - Monitor bundle size
3. **User-Centric** - Testuj jak użytkownik
4. **Type Safety** - TypeScript interfaces
5. **Documentation** - Stories jako docs
