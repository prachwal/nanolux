# Phase 1: Foundation Components

> **Cel**: Implementacja podstawowych komponentów pokrywających 80% przypadków użycia

## 🎯 Priorytet: KRYTYCZNY
**Timeline**: 2-3 tygodnie  
**Bundle Target**: <2KB total  
**Dependencies**: Brak

---

## 📋 Komponenty do Implementacji

### ✅ Logo (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Size**: ~150B
- **Location**: `src/components/Logo/`
- **Stories**: ✅ Complete
- **Tests**: ✅ Interactive tests
- **Documentation**: ✅ Auto-generated

### ✅ Button (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <512B
- **Priority**: P0 - CRITICAL
- **Dependencies**: Atomic CSS classes

**Features**:
- [x] Variants: `primary`, `secondary`, `danger`, `outline`, `ghost`
- [x] Sizes: `sm`, `md`, `lg`, `xl`
- [x] States: `disabled`, `loading`, `active`
- [x] Custom colors via CSS variables
- [x] Icon support (optional)

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

**Stories Implemented**:
- [x] AllVariants
- [x] AllSizes  
- [x] WithIcon
- [x] LoadingStates
- [x] CustomColors
- [x] InteractiveTest

### ✅ Card (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <400B
- **Priority**: P0 - CRITICAL
- **Dependencies**: Atomic CSS classes

**Features**:
- [x] Variants: `default`, `elevated`, `outlined`, `filled`
- [x] Slots: `header`, `content`, `footer`, `actions`
- [x] Hover effects via CSS
- [x] Custom padding/spacing

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

### ✅ Input/TextField (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <600B
- **Priority**: P0 - CRITICAL
- **Dependencies**: FormField wrapper

**Features**:
- [x] Types: `text`, `email`, `password`, `number`, `tel`, `url`
- [x] Sizes: `sm`, `md`, `lg`
- [x] States: `disabled`, `invalid`, `loading`
- [x] Icons: `prefix`, `suffix`
- [x] Validation styling

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

### ✅ Layout Helpers (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <300B
- **Priority**: P1 - HIGH
- **Dependencies**: Atomic CSS system

**Components**:
- [x] `Flex` - Flexbox wrapper
- [x] `Stack` - Vertical/horizontal stacking

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

### ✅ Typography (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <200B
- **Priority**: P1 - HIGH
- **Dependencies**: Atomic CSS classes

**Components**:
- [x] `Heading` - h1-h6 headings
- [x] `Text` - paragraph text

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

### Core Classes (implemented)
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

### Phase 1 Completion Checklist ✅ COMPLETED
- [x] Wszystkie 6 komponentów zaimplementowane
- [x] Bundle size <2KB total
- [x] Test coverage >85%
- [x] Wszystkie stories napisane
- [x] Documentation auto-generated
- [x] Performance budgets spełnione
- [x] Accessibility tests przechodzą

### Quality Gates ✅ MET
- **Bundle Size**: ✅ Każdy komponent <512B
- **Performance**: ✅ Stories renderują <16ms
- **Tests**: ✅ >85% coverage, wszystkie testy przechodzą
- **TypeScript**: ✅ 100% typed, brak any
- **Docs**: ✅ Auto-generated z JSDoc

---

## 🔗 Dependencies

### Internal
- `src/styles/atomic.css` - Atomic CSS classes ✅
- `src/test/story-utils.ts` - Testing utilities ✅
- Component template structure ✅

### External
- Preact (już zainstalowane) ✅
- TypeScript (już zainstalowane) ✅
- Vite (już zainstalowane) ✅

---

## 📝 Implementation Notes

### Order of Implementation ✅ COMPLETED
1. **Button** ✅ - Najpopularniejszy komponent, wzorzec dla innych
2. **Card** ✅ - Podstawowy building block
3. **Input** ✅ - Krytyczny dla formularzy
4. **Layout Helpers** ✅ - Wsparcie dla kompozycji
5. **Typography** ✅ - Finalizacja podstaw

### Code Style ✅ IMPLEMENTED
- Używaj `class` zamiast `className` (Preact) ✅
- CSS Variables dla customizacji ✅
- Atomic classes dla layoutu ✅
- TypeScript interfaces z JSDoc ✅
- Stories jako testy + dokumentacja ✅

---

*Phase 1 Target: 80% use case coverage* ✅ **ACHIEVED**  
*Next Phase: [Phase 2 - Forms & Navigation](./phase-2-forms-navigation.md)* ✅ **COMPLETED**
