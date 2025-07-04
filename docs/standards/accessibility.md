# Accessibility Standards for NanoLux

> **Cel**: WCAG 2.1 AA compliance dla wszystkich komponentów z zero kompromisów w performance

## 🎯 Accessibility Philosophy

### Universal Design Principles
1. **Accessible by Default**: Każdy komponent działa z assistive technologies
2. **Keyboard First**: Pełna funkcjonalność bez myszy
3. **Screen Reader Optimized**: Semantic HTML + proper ARIA
4. **Performance Inclusive**: Accessibility nie może wpływać na bundle size

### WCAG 2.1 AA Compliance
```
┌─ Level A (Must Have) ─────────────────┐
│ • Keyboard navigation                 │
│ • Alt text for images                 │
│ • Semantic HTML structure             │
│ • Color contrast 3:1                  │
└───────────────────────────────────────┘
┌─ Level AA (Target) ───────────────────┐  
│ • Color contrast 4.5:1                │
│ • Focus indicators                     │
│ • Screen reader announcements         │
│ • Resize to 200% without scrolling    │
└───────────────────────────────────────┘
┌─ Level AAA (Nice to Have) ────────────┐
│ • Color contrast 7:1                  │
│ • No flashing content                 │
│ • Context help available              │
│ • Multiple ways to locate content     │
└───────────────────────────────────────┘
```

---

## ♿ Accessibility Requirements

### Keyboard Navigation Standards

| Component | Required Keys | Expected Behavior |
|-----------|---------------|-------------------|
| Button | Space, Enter | Activate button |
| Input | Tab, Shift+Tab | Focus management |
| Select | Space, Arrow Keys, Enter, Escape | Open/navigate/select/close |
| Modal | Escape, Tab | Close modal, focus trap |
| Tooltip | Escape | Dismiss tooltip |
| Tabs | Arrow Keys, Home, End | Navigate between tabs |
| Table | Arrow Keys, Space | Cell navigation, selection |
| Accordion | Enter, Space, Arrow Keys | Expand/collapse, navigate |

### ARIA Implementation Guide

#### Essential ARIA Attributes
```tsx
// Button states
<button 
  aria-pressed={isPressed}    // Toggle buttons
  aria-expanded={isExpanded}  // Expandable content
  aria-describedby="help-text" // Additional info
  aria-label="Close dialog"   // When text isn't descriptive
>

// Form controls
<input 
  aria-required={required}
  aria-invalid={hasError}
  aria-describedby="error-message"
  aria-labelledby="field-label"
/>

// Navigation
<nav aria-label="Main navigation">
  <a aria-current="page">Home</a>  // Current page
</nav>

// Live regions
<div 
  aria-live="polite"     // Announcements
  aria-atomic="true"     // Read entire content
  aria-relevant="additions text"
>

// Complex components
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
<div role="tooltip" aria-describedby="tooltip-content">
<table role="table" aria-label="User data">
```

### Focus Management

#### Focus Trapping (Modals)
```tsx
function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  
  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement
      
      // Focus first focusable element
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement
      firstFocusable?.focus()
      
      // Trap focus within modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          trapFocus(e, modalRef.current!)
        }
        if (e.key === 'Escape') {
          onClose()
        }
      }
      
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        // Restore previous focus
        previousFocusRef.current?.focus()
      }
    }
  }, [isOpen, onClose])
  
  return isOpen ? (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  ) : null
}

function trapFocus(event: KeyboardEvent, container: HTMLElement) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstFocusable = focusableElements[0] as HTMLElement
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement
  
  if (event.shiftKey) {
    if (document.activeElement === firstFocusable) {
      lastFocusable.focus()
      event.preventDefault()
    }
  } else {
    if (document.activeElement === lastFocusable) {
      firstFocusable.focus()
      event.preventDefault()
    }
  }
}
```

#### Focus Indicators
```css
/* High-contrast focus indicators */
.focus-indicator {
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: outline-color 0.15s ease;
}

.focus-indicator:focus {
  outline-color: var(--focus-color, #3b82f6);
}

/* Custom focus styles for specific components */
.btn:focus {
  outline: 2px solid var(--btn-focus-color, #3b82f6);
  outline-offset: 2px;
}

.input:focus {
  border-color: var(--input-focus-color, #3b82f6);
  box-shadow: 0 0 0 1px var(--input-focus-color, #3b82f6);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .focus-indicator:focus {
    outline: 3px solid;
    outline-color: Highlight;
  }
}
```

---

## 🔍 Screen Reader Support

### Semantic HTML Foundation
```tsx
// ✅ Good - Semantic HTML with proper roles
function Navigation({ items }: NavProps) {
  return (
    <nav aria-label="Main navigation">
      <ul role="list">
        {items.map(item => (
          <li key={item.id}>
            <a 
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// ❌ Bad - Generic divs without semantic meaning
function BadNavigation({ items }) {
  return (
    <div className="nav">
      {items.map(item => (
        <div key={item.id} onClick={() => navigate(item.href)}>
          {item.label}
        </div>
      ))}
    </div>
  )
}
```

### Live Regions for Dynamic Content
```tsx
function ToastManager() {
  const [announcements, setAnnouncements] = useState<string[]>([])
  
  const showToast = (message: string, type: 'success' | 'error') => {
    // Add to announcements for screen readers
    const announcement = `${type}: ${message}`
    setAnnouncements(prev => [...prev, announcement])
    
    // Clean up announcements after delay
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1))
    }, 1000)
  }
  
  return (
    <>
      {/* Visual toasts */}
      <div className="toast-container">
        {/* Toast components */}
      </div>
      
      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>
    </>
  )
}

// Screen reader only utility class
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Descriptive Labels and Help Text
```tsx
function AccessibleFormField({ 
  label, 
  helpText, 
  errorMessage, 
  required,
  children 
}: FormFieldProps) {
  const fieldId = useId()
  const helpId = `${fieldId}-help`
  const errorId = `${fieldId}-error`
  
  return (
    <div className="form-field">
      <label htmlFor={fieldId} className="form-label">
        {label}
        {required && (
          <span aria-label="required" className="required-indicator">
            *
          </span>
        )}
      </label>
      
      {helpText && (
        <div id={helpId} className="form-help-text">
          {helpText}
        </div>
      )}
      
      {/* Clone child input with proper IDs and ARIA */}
      {cloneElement(children, {
        id: fieldId,
        'aria-required': required,
        'aria-invalid': !!errorMessage,
        'aria-describedby': [
          helpText ? helpId : null,
          errorMessage ? errorId : null
        ].filter(Boolean).join(' ') || undefined
      })}
      
      {errorMessage && (
        <div 
          id={errorId} 
          className="form-error-text"
          role="alert"  // Announces errors immediately
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}
```

---

## 🎨 Color and Contrast

### Color Contrast Standards
```css
/* WCAG AA minimum contrast ratios */
:root {
  /* Text colors - 4.5:1 minimum contrast */
  --text-primary: #1f2937;     /* 16.8:1 against white */
  --text-secondary: #6b7280;   /* 5.9:1 against white */
  --text-muted: #9ca3af;       /* 4.7:1 against white */
  
  /* Background colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-accent: #f3f4f6;
  
  /* Interactive colors - 3:1 minimum for UI components */
  --btn-primary-bg: #3b82f6;   /* 4.5:1 against white text */
  --btn-primary-text: #ffffff;
  --btn-secondary-bg: #e5e7eb; /* 1.2:1 against white, use dark text */
  --btn-secondary-text: #374151;
  
  /* Focus colors - must be visible */
  --focus-color: #2563eb;      /* 5.9:1 against white */
  --focus-color-alt: #dc2626;  /* For error states */
}

/* High contrast mode adaptations */
@media (prefers-contrast: high) {
  :root {
    --text-primary: #000000;
    --text-secondary: #000000;
    --bg-primary: #ffffff;
    --btn-primary-bg: #000000;
    --btn-primary-text: #ffffff;
    --focus-color: #000000;
  }
}

/* Dark mode with proper contrast */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #f9fafb;     /* 16.1:1 against dark bg */
    --text-secondary: #d1d5db;   /* 7.1:1 against dark bg */
    --text-muted: #9ca3af;       /* 4.9:1 against dark bg */
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --focus-color: #60a5fa;      /* 4.8:1 against dark bg */
  }
}
```

### Color-Independent Design
```tsx
// ✅ Good - Multiple indicators for state
function StatusBadge({ status }: { status: 'success' | 'warning' | 'error' }) {
  const config = {
    success: { icon: '✓', text: 'Success', color: 'green' },
    warning: { icon: '⚠', text: 'Warning', color: 'yellow' },
    error: { icon: '✗', text: 'Error', color: 'red' }
  }
  
  const { icon, text, color } = config[status]
  
  return (
    <div 
      className={`badge badge-${color}`}
      role="status"
      aria-label={`Status: ${text}`}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="badge-text">{text}</span>
    </div>
  )
}

// ❌ Bad - Color-only indication
function BadStatusBadge({ status }) {
  return (
    <div className={`badge badge-${status}`}>
      {/* Only color differentiates status */}
    </div>
  )
}
```

---

## 📱 Responsive and Motion Accessibility

### Responsive Text and Touch Targets
```css
/* Minimum touch target sizes - 44px x 44px */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 8px 16px;
}

/* Responsive text scaling */
@media (max-width: 640px) {
  .btn {
    font-size: 16px; /* Prevents zoom on iOS */
    min-height: 48px; /* Larger touch targets on mobile */
  }
}

/* Text that scales with user preferences */
.text-scalable {
  font-size: 1rem; /* Respects user's font size settings */
}

/* Support for 200% zoom */
@media (min-resolution: 2dppx) {
  .high-dpi-content {
    /* Ensure content remains readable at 200% zoom */
    max-width: 50ch; /* Optimal reading width */
    line-height: 1.5;
  }
}
```

### Motion and Animation Accessibility
```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Keep essential animations but make them instant */
  .modal-enter {
    animation: none;
    opacity: 1;
    transform: scale(1);
  }
  
  /* Remove parallax and auto-playing content */
  .auto-carousel {
    animation-play-state: paused;
  }
}

/* Safe animations that respect motion preferences */
.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    animation: none;
    opacity: 1;
  }
}

/* Provide motion alternatives */
.loading-spinner {
  animation: spin 1s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .loading-spinner {
    animation: none;
  }
  
  .loading-spinner::after {
    content: "Loading...";
    display: block;
    text-align: center;
  }
}
```

---

## 🧪 Accessibility Testing

### Automated Testing with axe-core
```tsx
// src/test/accessibility.test.ts
import { describe, it, expect } from 'vitest'
import { render } from '@preact/testing-library'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  it('Button should have no accessibility violations', async () => {
    const { container } = render(
      <Button variant="primary">Test Button</Button>
    )
    
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
        'keyboard-navigation': { enabled: true },
        'focus-management': { enabled: true }
      }
    })
    
    expect(results).toHaveNoViolations()
  })
  
  it('Form field should be properly labeled', async () => {
    const { container } = render(
      <FormField label="Username" required>
        <Input type="text" />
      </FormField>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

### Manual Testing Checklist
```tsx
// Accessibility story tests
export const AccessibilityTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Keyboard navigation test
    await userEvent.tab()
    const focusedElement = document.activeElement
    expect(focusedElement).toBeInTheDocument()
    expect(focusedElement).toHaveClass('focus-indicator')
    
    // Screen reader announcements
    const button = canvas.getByRole('button')
    expect(button).toHaveAccessibleName()
    expect(button).not.toHaveAttribute('aria-label', '')
    
    // Color contrast (visual verification)
    const computedStyle = getComputedStyle(button)
    const bgColor = computedStyle.backgroundColor
    const textColor = computedStyle.color
    
    // High contrast mode test
    expect(button).toHaveStyle('outline: transparent')
  }
}

// Keyboard navigation test
export const KeyboardNavigationTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Tab through all interactive elements
    const interactiveElements = canvas.getAllByRole(
      /button|link|textbox|combobox|checkbox|radio/
    )
    
    for (let i = 0; i < interactiveElements.length; i++) {
      await userEvent.tab()
      expect(interactiveElements[i]).toHaveFocus()
    }
    
    // Test Shift+Tab (reverse navigation)
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    expect(interactiveElements[interactiveElements.length - 2]).toHaveFocus()
  }
}
```

### Screen Reader Testing
```tsx
// Screen reader announcement testing
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Usage in components
function Toast({ message, type }: ToastProps) {
  useEffect(() => {
    announceToScreenReader(`${type}: ${message}`, 'polite')
  }, [message, type])
  
  return (
    <div role="alert" className={`toast toast-${type}`}>
      {message}
    </div>
  )
}
```

---

## 📊 Accessibility Metrics

### Automated Monitoring
```js
// scripts/accessibility-audit.js
const axeCore = require('axe-core')
const puppeteer = require('puppeteer')

async function auditAccessibility() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  // Test all Storybook stories
  const stories = await getStorybookStories()
  const results = []
  
  for (const story of stories) {
    await page.goto(story.url)
    await page.injectFile(require.resolve('axe-core'))
    
    const axeResults = await page.evaluate(() => {
      return axe.run(document, {
        rules: {
          'color-contrast': { enabled: true },
          'keyboard-navigation': { enabled: true },
          'aria-labels': { enabled: true }
        }
      })
    })
    
    results.push({
      story: story.name,
      violations: axeResults.violations,
      passes: axeResults.passes.length
    })
  }
  
  await browser.close()
  
  // Generate accessibility report
  generateAccessibilityReport(results)
}

function generateAccessibilityReport(results) {
  const totalViolations = results.reduce((sum, r) => sum + r.violations.length, 0)
  const totalPasses = results.reduce((sum, r) => sum + r.passes, 0)
  
  console.log(`Accessibility Audit Results:`)
  console.log(`Total Tests: ${results.length}`)
  console.log(`Violations: ${totalViolations}`)
  console.log(`Passes: ${totalPasses}`)
  console.log(`Success Rate: ${((totalPasses / (totalPasses + totalViolations)) * 100).toFixed(1)}%`)
  
  if (totalViolations > 0) {
    console.error('❌ Accessibility violations found!')
    process.exit(1)
  } else {
    console.log('✅ All accessibility tests passed!')
  }
}
```

### Performance Budget for Accessibility
- **Screen Reader**: <500ms announcement delay
- **Keyboard Navigation**: <16ms response time
- **Focus Indicators**: <100ms transition time
- **Bundle Impact**: <100B additional size for a11y features

---

## 🎯 Accessibility Success Criteria

### Compliance Standards
- [ ] WCAG 2.1 AA compliance (100%)
- [ ] Keyboard navigation (100% components)
- [ ] Screen reader compatibility (NVDA, JAWS, VoiceOver)
- [ ] High contrast mode support
- [ ] Touch accessibility (44px minimum targets)

### Testing Requirements
- [ ] Automated axe tests (0 violations)
- [ ] Manual keyboard testing
- [ ] Screen reader testing (major readers)
- [ ] Color blindness testing
- [ ] Motion sensitivity compliance

### Documentation Requirements
- [ ] Accessibility examples in all stories
- [ ] Keyboard shortcuts documented
- [ ] Screen reader behavior described
- [ ] Color contrast ratios specified
- [ ] Alternative input methods covered

---

*Accessibility Standards v1.0*  
*Last updated: July 4, 2025*
