# 📖 NanoLux Documentation Index

Spis wszystkich dokumentów w projekcie NanoLux.

## 📂 Struktura Dokumentacji

```
docs/
├── README.md                    # 📚 Główna dokumentacja
├── components/                  # 🎨 Komponenty
│   └── README.md               # Architektura komponentów
├── development/                 # 🛠️ Development
│   └── README.md               # Setup i workflow
├── performance/                 # ⚡ Performance
│   └── README.md               # Optymalizacje i budgets
├── storybook/                   # 📖 Storybook
│   └── STORYBOOK_INTEGRATION.md # Dokumentacja wizualna
├── testing/                    # 🧪 Testing
│   ├── README.md               # Przewodnik testowania
│   └── TEST_SETUP.md           # Konfiguracja Vitest vs Jest
└── ci-cd/                      # 🚀 CI/CD
    └── README.md               # Pipeline i deployment
```

## 🚀 Quick Navigation

### 🎯 Dla Nowych Deweloperów
1. [**Development Setup**](./development/) - Konfiguracja środowiska
2. [**Testing Guide**](./testing/) - Jak pisać testy
3. [**Component Guide**](./components/) - Tworzenie komponentów
4. [**Storybook Guide**](./storybook/) - Dokumentacja wizualna komponentów

### 🔧 Dla Zaawansowanych
1. [**Performance Optimization**](./performance/) - Bundle size i wydajność
2. [**Testing Setup**](./testing/TEST_SETUP.md) - Rozwiązywanie problemów z testami
3. [**Architecture**](./components/) - Głęboka architektura
4. [**CI/CD Pipeline**](./ci-cd/) - Automatyzacja i deployment

### 🚨 Troubleshooting
- [**Jest vs Vitest Problem**](./testing/TEST_SETUP.md) - Błędy VS Code extensions
- [**Bundle Size Issues**](./performance/) - Optymalizacja rozmiaru
- [**Component Performance**](./components/) - Wydajność komponentów

## 📊 Status Projektu

- ✅ **Testing System**: 201/201 testów przechodzi
- ✅ **Build System**: Vite + Preact
- ✅ **Documentation**: Kompletna struktura
- ✅ **Performance**: <1KB runtime
- ✅ **Storybook Integration**: Kompletne (8 komponentów, 50+ stories)
- ✅ **CI/CD Pipeline**: Wdrożone (GitHub Actions + GitLab Pages)

### 🚀 CI/CD Features
- **Automated Testing**: Vitest + Coverage + Storybook tests
- **Bundle Analysis**: Size monitoring z targetem <50KB
- **Multi-platform Deploy**: GitHub Pages + GitLab Pages
- **PR Integration**: Automatyczne komentarze z wynikami
- **Performance Monitoring**: Bundle size tracking
- **Artifact Management**: 30-day retention dla raportów

## 🤝 Contribution Guidelines

1. **Documentation**: Każda zmiana wymaga aktualizacji docs
2. **Testing**: Nowe komponenty = nowe testy
3. **Performance**: Monitor bundle size budgets
4. **Code Style**: Atomic CSS + TypeScript
