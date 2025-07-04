# Phase 1: Foundation Components

> **Cel**: Implementacja podstawowych komponentów pokrywających 80% przypadków użycia

## 🎯 Priorytet: KRYTYCZNY
**Timeline**: 2-3 tygodnie  
**Bundle Target**: <2KB total  
**Dependencies**: Brak

---

## 📋 Komponenty do Implementacji

### ✅ Logo (DONE)
- **Status**: Zaimplementowany
- **Bundle Size**: ~150B
- **Location**: `src/components/Logo/`
- **Stories**: ✅ Complete
- **Tests**: ✅ Interactive tests
- **Documentation**: ✅ Auto-generated

### 🚧 Button (IN PROGRESS)
- **Status**: W trakcie
- **Bundle Target**: <512B
- **Priority**: P0 - CRITICAL
- **Dependencies**: Atomic CSS classes

**Features**:
- [ ] Variants: `primary`, `secondary`, `danger`, `outline`, `ghost`
- [ ] Sizes: `sm`, `md`, `lg`, `xl`
- [ ] States: `disabled`, `loading`, `active`
- [ ] Custom colors via CSS variables
- [ ] Icon support (optional)

**API Design**:
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  icon?: ComponentChildren
  children: ComponentChildren
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>
}
```

**Stories Required**:
- [ ] AllVariants
- [ ] AllSizes  
- [ ] WithIcon
- [ ] LoadingStates
- [ ] CustomColors
- [ ] InteractiveTest

### ⏳ Card (PLANNED)
- **Bundle Target**: <400B
- **Priority**: P0 - CRITICAL
- **Dependencies**: Atomic CSS classes

**Features**:
- [ ] Variants: `default`, `elevated`, `outlined`, `filled`
- [ ] Slots: `header`, `content`, `footer`, `actions`
- [ ] Hover effects via CSS
- [ ] Custom padding/spacing

**API Design**:
```tsx
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  children: ComponentChildren
  header?: ComponentChildren
  footer?: ComponentChildren
}
```

### ⏳ Input/TextField (PLANNED)
- **Bundle Target**: <600B
- **Priority**: P0 - CRITICAL
- **Dependencies**: FormField wrapper

**Features**:
- [ ] Types: `text`, `email`, `password`, `number`, `tel`, `url`
- [ ] Sizes: `sm`, `md`, `lg`
- [ ] States: `disabled`, `invalid`, `loading`
- [ ] Icons: `prefix`, `suffix`
- [ ] Validation styling

**API Design**:
```tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  invalid?: boolean
  placeholder?: string
  value?: string
  onChange?: JSX.GenericEventHandler<HTMLInputElement>
  prefixIcon?: ComponentChildren
  suffixIcon?: ComponentChildren
}
```

### ⏳ Layout Helpers (PLANNED)
- **Bundle Target**: <300B
- **Priority**: P1 - HIGH
- **Dependencies**: Atomic CSS system

**Components**:
- [ ] `Flex` - Flexbox wrapper
- [ ] `Grid` - CSS Grid wrapper  
- [ ] `Stack` - Vertical/horizontal stacking
- [ ] `Container` - Max-width container
- [ ] `Spacer` - Flexible spacing

**API Design**:
```tsx
// Flex
interface FlexProps {
  direction?: 'row' | 'column'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  gap?: 4 | 8 | 12 | 16 | 20 | 24
  wrap?: boolean
  children: ComponentChildren
}

// Stack  
interface StackProps {
  direction?: 'vertical' | 'horizontal'
  spacing?: 4 | 8 | 12 | 16 | 20 | 24
  align?: 'start' | 'center' | 'end' | 'stretch'
  children: ComponentChildren
}
```

### ⏳ Typography (PLANNED)
- **Bundle Target**: <200B
- **Priority**: P1 - HIGH
- **Dependencies**: Atomic CSS classes

**Components**:
- [ ] `Heading` - h1-h6 headings
- [ ] `Text` - paragraph text
- [ ] `Link` - styled links

**API Design**:
```tsx
interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: string
  children: ComponentChildren
}

interface TextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'default' | 'muted' | 'danger' | 'success'
  variant?: 'body' | 'caption' | 'overline'
  children: ComponentChildren
}
```

---

## 🎨 Atomic CSS Requirements

### Core Classes (must be implemented)
```css
/* Layout */
.flex, .flex-col, .flex-row, .flex-wrap
.grid, .items-center, .justify-center, .justify-between

/* Spacing */
.gap-4, .gap-8, .gap-12, .gap-16, .gap-20, .gap-24
.p-4, .p-8, .px-12, .py-16, .m-0, .mx-auto

/* Sizing */
.w-full, .w-auto, .max-w-400, .h-full

/* Typography */
.text-xs, .text-sm, .text-base, .text-lg, .text-xl
.font-normal, .font-medium, .font-bold
.text-center, .text-left

/* Effects */
.rounded, .rounded-md, .shadow, .shadow-md
.opacity-50, .opacity-75, .transition-all
```

---

## 🧪 Testing Strategy

### Performance Tests
```tsx
// Każdy komponent musi mieć test bundle size
export const BundleSizeTest = withPerformanceTest({
  args: { children: 'Test content' }
}, 512) // max 512B
```

### Accessibility Tests  
```tsx
export const AccessibilityTest = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Keyboard navigation
    await userEvent.tab()
    await expect(canvas.getByRole('button')).toHaveFocus()
    
    // ARIA attributes
    await expect(button).toHaveAttribute('aria-label')
    
    // Color contrast (automated with axe)
    await axeCheck(canvasElement)
  }
}
```

### Visual Regression Tests
```tsx
export const VisualTest = {
  parameters: {
    chromatic: { 
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
        mobile: { viewport: 'mobile' }
      }
    }
  }
}
```

---

## 📊 Success Criteria

### Phase 1 Completion Checklist
- [ ] Wszystkie 6 komponentów zaimplementowane
- [ ] Bundle size <2KB total
- [ ] Test coverage >85%
- [ ] Wszystkie stories napisane
- [ ] Documentation auto-generated
- [ ] Performance budgets spełnione
- [ ] Accessibility tests przechodzą

### Quality Gates
- **Bundle Size**: Każdy komponent <512B
- **Performance**: Stories renderują <16ms
- **Tests**: >85% coverage, wszystkie testy przechodzą
- **TypeScript**: 100% typed, brak any
- **Docs**: Auto-generated z JSDoc

---

## 🔗 Dependencies

### Internal
- `src/styles/atomic.css` - Atomic CSS classes
- `src/test/story-utils.ts` - Testing utilities
- Component template structure

### External
- Preact (już zainstalowane)
- TypeScript (już zainstalowane)
- Vite (już zainstalowane)

---

## 📝 Implementation Notes

### Order of Implementation
1. **Button** - Najpopularniejszy komponent, wzorzec dla innych
2. **Card** - Podstawowy building block
3. **Input** - Krytyczny dla formularzy
4. **Layout Helpers** - Wsparcie dla kompozycji
5. **Typography** - Finalizacja podstaw

### Code Style
- Używaj `class` zamiast `className` (Preact)
- CSS Variables dla customizacji
- Atomic classes dla layoutu
- TypeScript interfaces z JSDoc
- Stories jako testy + dokumentacja

---

*Phase 1 Target: 80% use case coverage*  
*Next Phase: [Phase 2 - Forms & Navigation](./phase-2-forms-navigation.md)*
