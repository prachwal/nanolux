# NanoLux - Implementation Roadmap

> **Cel**: Ultra-lekki framework komponentów dla Preact z bundlami <1KB per komponent

## 🎯 Filozofia Implementacji

- **Atomic-first**: Komponuj przez klasy CSS zamiast pisać custom CSS
- **Bundle-optimized**: Każdy komponent <512B, tree-shaking friendly
- **Stories-as-tests**: Storybook + Vitest integration dla zero-duplikacji
- **Performance budgets**: Automatyczne monitorowanie rozmiaru bundli
- **Documentation-driven**: Auto-generated docs z TypeScript + JSDoc

---

## 📋 Master Checklist

### Phase 1: Foundation (Must-have) - 80% coverage
- [x] Logo ✅ (już zaimplementowane)
- [ ] Button 🚧 (w trakcie)
- [ ] Card
- [ ] Input/TextField  
- [ ] Layout Helpers (Flex, Grid, Stack)
- [ ] Typography (Heading, Text)

### Phase 2: Forms & Navigation (High priority) - 95% coverage
- [ ] Select/Dropdown
- [ ] Checkbox/Radio
- [ ] FormField wrapper
- [ ] Navigation/Header
- [ ] Link component

### Phase 3: Interaction (Medium priority) - 98% coverage
- [ ] Modal/Dialog
- [ ] Tooltip
- [ ] Loading/Spinner
- [ ] Alert/Toast
- [ ] Tabs

### Phase 4: Advanced (Nice to have) - 100% coverage
- [ ] Table
- [ ] Accordion
- [ ] Badge
- [ ] Avatar
- [ ] ProgressBar

---

## 📊 Progress Tracking

| Fase | Komponenty | Status | Bundle Size | Test Coverage |
|------|------------|---------|-------------|---------------|
| 1    | 6/6        | 🚧 33%  | ~2KB total  | 85%          |
| 2    | 0/5        | ⏳ 0%   | ~1.5KB      | 90%          |
| 3    | 0/5        | ⏳ 0%   | ~2KB        | 85%          |
| 4    | 0/5        | ⏳ 0%   | ~1.5KB      | 80%          |

**Total Target**: ~7KB dla wszystkich komponentów

---

## 🔗 Quick Links

- [Phase 1 Details](./phases/phase-1-foundation.md)
- [Phase 2 Details](./phases/phase-2-forms-navigation.md)
- [Phase 3 Details](./phases/phase-3-interaction.md)
- [Phase 4 Details](./phases/phase-4-advanced.md)
- [Component Template](./templates/component-template.md)
- [Documentation Standards](./standards/documentation.md)
- [Testing Strategy](./standards/testing.md)
- [Performance Budgets](./standards/performance.md)

---

## 🚀 Getting Started

1. **Wybierz fazę**: Rozpocznij od Phase 1 - Foundation
2. **Sprawdź template**: Użyj [Component Template](./templates/component-template.md)
3. **Implementuj komponent**: Kod + Style + Stories + Tests
4. **Waliduj performance**: Bundle size < 512B
5. **Update checklist**: Oznacz jako ✅

---

## 📈 Success Metrics

### Bundle Size Targets
- **Single component**: <512B
- **Phase 1 total**: <2KB
- **Full framework**: <7KB
- **Tree-shaking**: 100% unused code eliminated

### Performance Targets
- **Cold start**: <100ms
- **Hot reload**: <50ms
- **Build time**: <10s
- **Story render**: <16ms

### Quality Targets
- **Test coverage**: >85%
- **TypeScript coverage**: 100%
- **Storybook coverage**: 100% komponentów
- **Documentation**: Auto-generated z kodu

---

## 🔄 Workflow

```bash
# 1. Implementuj komponent
npm run create:component ComponentName

# 2. Dodaj stories i testy  
npm run dev:storybook

# 3. Sprawdź bundle size
npm run build:analyze

# 4. Uruchom testy
npm run test:all

# 5. Update dokumentacji
npm run docs:generate
```

---

## 📚 Documentation Strategy

### Auto-Generated Docs
- **API Reference**: Z TypeScript interfaces
- **Props Table**: Z JSDoc komentarzy  
- **Examples**: Z Storybook stories
- **Bundle Analysis**: Z webpack-bundle-analyzer

### Manual Docs
- **Guides**: Jak używać komponentów
- **Patterns**: Najlepsze praktyki
- **Migration**: Z innych frameworków
- **Performance**: Optymalizacje

---

*Last updated: July 4, 2025*
*Next review: Weekly*
