# 🧪 Testing Documentation

Kompletna dokumentacja systemu testów w NanoLux.

## 📑 Zawartość

### [TEST_SETUP.md](./TEST_SETUP.md)
**Problem z Jest vs Vitest** - Rozwiązanie konfliktów VS Code extensions i konfiguracja wyłącznie Vitest.
- Rendering performance
- Memory usage testing

## 🎯 Kluczowe Zasady

1. **Vitest First** - Tylko Vitest, nie Jest
2. **User-Centric Testing** - Testuj jak użytkownik
3. **Performance Monitoring** - Każdy test sprawdza bundle size
4. **Stories jako Testy** - Minimalizuj boilerplate
5. **Zero Config** - Testy działają od razu

## ⚡ Quick Commands

```bash
npm run test              # Vitest watch mode
npm run test:ui           # Vitest UI interface
npm run test:coverage     # Coverage report
npm run test -- --run     # Single run
npm run test:stories      # Storybook tests
```

## 🛠️ Stack Testowy

- **Vitest** - Test runner
- **@testing-library/preact** - Component testing
- **@testing-library/jest-dom** - DOM matchers
- **jsdom** - DOM simulation
- **Storybook** - Visual testing & docs
