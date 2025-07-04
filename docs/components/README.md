# 🎨 Components Documentation

Architektura i najlepsze praktyki dla komponentów NanoLux.

## 📑 Zawartość

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
