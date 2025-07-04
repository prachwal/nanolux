# Jest vs Vitest - Problem Rozwiązany

## Problem
VS Code rozszerzenia Jest (orta.vscode-jest, firsttris.vscode-jest-runner) próbowały parsować pliki `.test.tsx` i rzucały błędy JSX syntax.

## Rozwiązanie
Projekt używa **tylko Vitest**, nie Jest. Wszystkie konfiguracje zostały ustawione żeby wyłączyć Jest.

## Konfiguracja
- ✅ **Vitest**: `npm run test` - główny test runner
- ❌ **Jest**: Całkowicie wyłączony w workspace
- 📁 **Pliki**: `.vscode/settings.json`, `jest.config.js`, `nanolux.code-workspace`

## Uruchamianie Testów
```bash
# Główne komendy
npm run test          # Vitest watch mode
npm run test:ui       # Vitest UI
npm run test:coverage # Pokrycie kodu
npm run test -- --run # Jednorazowe uruchomienie

# VS Code Tasks
Ctrl+Shift+P -> "Tasks: Run Task" -> "Test (Vitest)"
```

## Status Testów
- ✅ 30/30 testów przechodzi
- ✅ 3 pliki testowe (Button, CounterDemo, Button.examples)
- ⚡ Vitest + @testing-library/preact + jsdom
- 🎯 Zero konfiguracji, działa out-of-the-box

## Jeśli Jest Error się Pojawi
1. Restart VS Code: `Ctrl+Shift+P` -> "Developer: Reload Window"
2. Sprawdź czy rozszerzenia Jest są wyłączone
3. Użyj terminala: `npm run test`
4. Otwórz workspace file: `nanolux.code-workspace`
