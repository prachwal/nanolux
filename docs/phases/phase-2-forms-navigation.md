# Phase 2: Forms & Navigation Components

> **Cel**: Implementacja komponentów formularzy i nawigacji dla kompletnego experience

## 🎯 Priorytet: WYSOKI
**Timeline**: 2 tygodnie  
**Bundle Target**: <1.5KB total  
**Dependencies**: Phase 1 (Button, Card, Input)

---

## 📋 Komponenty do Implementacji

### ✅ Select/Dropdown (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <600B
- **Priority**: P0 - CRITICAL
- **Dependencies**: Input foundation, Portal (optional)

**Features**:
- [x] Single & multi-select
- [x] Search/filter functionality
- [x] Custom option rendering
- [x] Keyboard navigation (Arrow keys, Enter, Escape)
- [x] Async loading support
- [x] Grouping options

**API Design**:
```tsx
interface SelectProps<T = any> {
  options: SelectOption<T>[]
  value?: T | T[]
  multiple?: boolean
  searchable?: boolean
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  onSelectionChange?: (value: T | T[]) => void
  onSearch?: (query: string) => void
  renderOption?: (option: SelectOption<T>) => ComponentChildren
  size?: 'sm' | 'md' | 'lg'
}

interface SelectOption<T = any> {
  value: T
  label: string
  disabled?: boolean
  group?: string
}
```

### ✅ Checkbox/Radio (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <400B
- **Priority**: P0 - CRITICAL
- **Dependencies**: Atomic CSS classes

**Features**:
- [x] Individual Checkbox/Radio
- [x] RadioGroup for grouped radios
- [x] CheckboxGroup for multiple checkboxes
- [x] Indeterminate state (checkbox)
- [x] Custom icons/styling
- [x] Label positioning (left/right)

**API Design**:
```tsx
interface CheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  labelPosition?: 'left' | 'right'
  onChange?: (checked: boolean) => void
}

interface RadioProps {
  value: string
  checked?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  name?: string
  onChange?: (value: string) => void
}
```

### ✅ FormField (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <300B
- **Priority**: P1 - HIGH
- **Dependencies**: Typography components

**Features**:
- [x] Label with optional required indicator
- [x] Help text/description
- [x] Error message display
- [x] Success/warning states
- [x] Flexible layout (stacked/inline)

**API Design**:
```tsx
interface FormFieldProps {
  label?: string
  required?: boolean
  helpText?: string
  errorMessage?: string
  successMessage?: string
  warningMessage?: string
  layout?: 'stacked' | 'inline'
  children: ComponentChildren
}
```

### ✅ Navigation/Header (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <500B
- **Priority**: P1 - HIGH
- **Dependencies**: Link component, Layout helpers

**Features**:
- [x] Horizontal navigation bar
- [x] Logo/brand area
- [x] Navigation items with active states
- [x] Mobile hamburger menu
- [x] Dropdown menus
- [x] User menu/avatar area

**API Design**:
```tsx
interface NavigationProps {
  brand?: ComponentChildren
  items: NavigationItem[]
  actions?: ComponentChildren
  mobileBreakpoint?: number
  sticky?: boolean
}

interface NavigationItem {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  children?: NavigationItem[] // Dropdown items
}
```

### ✅ Link (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <200B
- **Priority**: P1 - HIGH
- **Dependencies**: Typography base

**Features**:
- [x] Internal/external links
- [x] Different variants (primary, secondary, muted)
- [x] Icon support (prefix/suffix)
- [x] Disabled state
- [x] Loading state

**API Design**:
```tsx
interface LinkProps {
  href?: string
  variant?: 'primary' | 'secondary' | 'muted' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  external?: boolean
  prefixIcon?: ComponentChildren
  suffixIcon?: ComponentChildren
  children: ComponentChildren
  onClick?: JSX.MouseEventHandler<HTMLAnchorElement>
}
```

---

## 🎨 Required Atomic CSS Extensions ✅ IMPLEMENTED

### Form-specific Classes
```css
/* Form field layouts */
.form-field { /* base form field container */ }
.form-field-stacked { /* vertical label/input layout */ }
.form-field-inline { /* horizontal label/input layout */ }

/* Form states */
.form-invalid { border-color: var(--color-danger); }
.form-valid { border-color: var(--color-success); }
.form-warning { border-color: var(--color-warning); }

/* Form text */
.form-label { /* label styling */ }
.form-help-text { /* help text styling */ }
.form-error-text { color: var(--color-danger); }
.form-success-text { color: var(--color-success); }

/* Checkbox/Radio */
.checkbox, .radio { /* base input styling */ }
.checkbox-checked, .radio-checked { /* checked state */ }
.checkbox-indeterminate { /* indeterminate state */ }

/* Select dropdown */
.select-container { position: relative; }
.select-dropdown { /* dropdown positioning */ }
.select-option { /* option styling */ }
.select-option-selected { /* selected option */ }
.select-option-focused { /* keyboard focused option */ }
```

### Navigation Classes
```css
/* Navigation layouts */
.nav { display: flex; align-items: center; }
.nav-horizontal { flex-direction: row; }
.nav-vertical { flex-direction: column; }

/* Navigation items */
.nav-item { /* base nav item */ }
.nav-item-active { /* active nav item */ }
.nav-item-disabled { /* disabled nav item */ }

/* Mobile navigation */
.nav-mobile-toggle { /* hamburger button */ }
.nav-mobile-menu { /* mobile menu container */ }
.nav-mobile-open { /* open mobile menu state */ }

/* Dropdown menus */
.nav-dropdown { position: relative; }
.nav-dropdown-menu { /* dropdown menu positioning */ }
.nav-dropdown-open { /* open dropdown state */ }
```

---

## 🧪 Testing Strategy Extensions ✅ IMPLEMENTED

### Form Testing Patterns
```tsx
// Form field testing
export const FormFieldTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test label association
    const label = canvas.getByLabelText(/username/i)
    expect(label).toBeInTheDocument()
    
    // Test required field indication
    expect(canvas.getByText('*')).toBeInTheDocument()
    
    // Test error state
    await userEvent.clear(label)
    await userEvent.tab() // Trigger validation
    expect(canvas.getByText(/required/i)).toBeInTheDocument()
    
    // Test success state
    await userEvent.type(label, 'valid-username')
    expect(canvas.queryByText(/required/i)).not.toBeInTheDocument()
  }
}

// Select component testing
export const SelectInteractiveTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole('combobox')
    
    // Test opening dropdown
    await userEvent.click(select)
    expect(canvas.getByRole('listbox')).toBeVisible()
    
    // Test keyboard navigation
    await userEvent.keyboard('{ArrowDown}')
    expect(canvas.getByRole('option', { selected: true })).toHaveFocus()
    
    // Test selection
    await userEvent.keyboard('{Enter}')
    expect(canvas.getByRole('listbox')).not.toBeVisible()
    
    // Test search functionality
    await userEvent.click(select)
    await userEvent.type(select, 'search term')
    expect(canvas.getAllByRole('option')).toHaveLength(2) // Filtered results
  }
}
```

### Navigation Testing Patterns
```tsx
// Navigation accessibility testing
export const NavigationA11yTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test keyboard navigation
    await userEvent.tab()
    expect(canvas.getByRole('navigation')).toContainElement(document.activeElement)
    
    // Test ARIA labels
    const nav = canvas.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label')
    
    // Test active states
    const activeLink = canvas.getByRole('link', { current: 'page' })
    expect(activeLink).toHaveAttribute('aria-current', 'page')
    
    // Test mobile menu
    const mobileToggle = canvas.getByRole('button', { name: /menu/i })
    await userEvent.click(mobileToggle)
    expect(canvas.getByRole('navigation')).toHaveAttribute('aria-expanded', 'true')
  }
}
```

---

## 📊 Phase 2 Success Criteria ✅ ACHIEVED

### Functional Requirements ✅ MET
- [x] All form components accessible (WCAG 2.1 AA)
- [x] Complete keyboard navigation support
- [x] Mobile-responsive design
- [x] Screen reader compatibility
- [x] Form validation patterns

### Performance Requirements ✅ MET
- [x] Bundle size <1.5KB total for Phase 2
- [x] Individual components <600B each
- [x] Render time <16ms per component
- [x] No layout shifts during interactions

### Quality Requirements ✅ MET
- [x] 100% TypeScript coverage
- [x] >90% test coverage
- [x] All stories with interactive tests
- [x] Visual regression tests passing
- [x] Accessibility tests passing

---

## 🔗 Integration with Phase 1 ✅ IMPLEMENTED

### Component Composition Examples
```tsx
// Form using Phase 1 + Phase 2 components
function LoginForm() {
  return (
    <Card>
      <FormField label="Username" required>
        <Input 
          type="text" 
          placeholder="Enter username"
          invalid={hasError}
        />
      </FormField>
      
      <FormField label="Password" required>
        <Input 
          type="password" 
          placeholder="Enter password"
        />
      </FormField>
      
      <Checkbox label="Remember me" />
      
      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Card>
  )
}

// Navigation with branding
function AppHeader() {
  return (
    <Navigation
      brand={<Logo src="./logo.svg" variant="brand" />}
      items={[
        { label: 'Home', href: '/', active: true },
        { label: 'Products', href: '/products' },
        { label: 'About', href: '/about' }
      ]}
      actions={
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      }
    />
  )
}
```

---

## 🚀 Implementation Order ✅ COMPLETED

### Week 1: Core Form Components ✅
1. **FormField** ✅ - Foundation for all form components
2. **Checkbox/Radio** ✅ - Simple form inputs
3. **Link** ✅ - Basic navigation primitive

### Week 2: Advanced Components ✅
4. **Select/Dropdown** ✅ - Complex form component
5. **Navigation/Header** ✅ - Complete navigation solution

### Dependencies Map ✅ SATISFIED
```
FormField (no deps) ✅
├── Checkbox/Radio (uses FormField) ✅
├── Select (uses FormField, Input) ✅
└── Navigation (uses Link, Button, Logo) ✅

Link (uses Typography) ✅
├── Navigation (uses Link) ✅
```

---

## 📝 Implementation Notes

### Form Accessibility Priority ✅ IMPLEMENTED
- ARIA attributes dla wszystkich form controls ✅
- Proper label associations (`for`/`id`) ✅
- Error announcements dla screen readers ✅
- Keyboard navigation (Tab, Arrow keys, Enter, Escape) ✅
- Focus management w dropdown components ✅

### Mobile-First Design ✅ IMPLEMENTED
- Touch-friendly target sizes (min 44px) ✅
- Responsive navigation patterns ✅
- Progressive enhancement ✅
- Performance optimization dla mobile networks ✅

### Integration Patterns ✅ IMPLEMENTED
- Consistent API design z Phase 1 ✅
- Shared CSS variables system ✅
- Compatible z atomic CSS approach ✅
- Stories demonstrują integration z Phase 1 ✅

---

*Phase 2 Target: 95% use case coverage* ✅ **ACHIEVED**  
*Previous Phase: [Phase 1 - Foundation](./phase-1-foundation.md)* ✅ **COMPLETED**  
*Next Phase: [Phase 3 - Interaction](./phase-3-interaction.md)* ✅ **COMPLETED**
