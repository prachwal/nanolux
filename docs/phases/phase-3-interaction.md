# Phase 3: Interaction Components

> **Cel**: Implementacja interaktywnych komponentów dla bogaterszego user experience

## 🎯 Priorytet: ŚREDNI
**Timeline**: 2-3 tygodnie  
**Bundle Target**: <2KB total  
**Dependencies**: Phase 1 & 2 (Button, Card, Input, FormField)

---

## 📋 Komponenty do Implementacji

### ⏳ Modal/Dialog (PLANNED)
- **Bundle Target**: <800B
- **Priority**: P0 - CRITICAL
- **Dependencies**: Portal, Button, Card

**Features**:
- [ ] Overlay/backdrop z auto-close
- [ ] Multiple sizes (sm, md, lg, xl, fullscreen)
- [ ] Header/body/footer slots
- [ ] Keyboard navigation (Escape to close)
- [ ] Focus management (trap focus)
- [ ] Animation/transitions
- [ ] Nested modals support

**API Design**:
```tsx
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen'
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  title?: string
  children: ComponentChildren
  footer?: ComponentChildren
}
```

### ⏳ Tooltip (PLANNED)
- **Bundle Target**: <400B
- **Priority**: P1 - HIGH
- **Dependencies**: Portal, positioning utilities

**Features**:
- [ ] Hover/focus triggers
- [ ] Multiple placements (top, bottom, left, right)
- [ ] Auto-positioning (collision detection)
- [ ] Delay timers (show/hide)
- [ ] Rich content support
- [ ] Keyboard accessible

**API Design**:
```tsx
interface TooltipProps {
  content: ComponentChildren
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  trigger?: 'hover' | 'focus' | 'click'
  showDelay?: number
  hideDelay?: number
  disabled?: boolean
  children: ComponentChildren
}
```

### ⏳ Loading/Spinner (PLANNED)
- **Bundle Target**: <300B
- **Priority**: P1 - HIGH
- **Dependencies**: CSS animations

**Features**:
- [ ] Multiple spinner variants (circle, dots, bars)
- [ ] Different sizes
- [ ] Custom colors via CSS variables
- [ ] Overlay loading states
- [ ] Text with spinner
- [ ] Accessible loading announcements

**API Design**:
```tsx
interface SpinnerProps {
  variant?: 'circle' | 'dots' | 'bars' | 'pulse'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  speed?: 'slow' | 'medium' | 'fast'
}

interface LoadingOverlayProps {
  loading: boolean
  text?: string
  spinner?: SpinnerProps
  children: ComponentChildren
}
```

### ⏳ Alert/Toast (PLANNED)
- **Bundle Target**: <600B
- **Priority**: P1 - HIGH
- **Dependencies**: Portal, Button (close), animations

**Features**:
- [ ] Multiple variants (info, success, warning, error)
- [ ] Auto-dismiss z timeout
- [ ] Manual dismiss button
- [ ] Rich content support
- [ ] Position management (top, bottom, corners)
- [ ] Stack management (multiple toasts)
- [ ] Accessibility announcements

**API Design**:
```tsx
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  dismissible?: boolean
  onDismiss?: () => void
  children: ComponentChildren
}

interface ToastProps extends AlertProps {
  duration?: number
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

// Toast manager API
interface ToastManager {
  show: (toast: ToastProps) => string
  dismiss: (id: string) => void
  dismissAll: () => void
}
```

### ⏳ Tabs (PLANNED)
- **Bundle Target**: <500B
- **Priority**: P2 - MEDIUM
- **Dependencies**: Button foundation

**Features**:
- [ ] Horizontal/vertical orientation
- [ ] Keyboard navigation (Arrow keys)
- [ ] Lazy loading tab content
- [ ] Disabled tabs
- [ ] Icon support w tab labels
- [ ] Custom tab styling

**API Design**:
```tsx
interface TabsProps {
  defaultTab?: string
  activeTab?: string
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'pills' | 'underline'
  onTabChange?: (tabId: string) => void
  children: ComponentChildren
}

interface TabProps {
  id: string
  label: string
  disabled?: boolean
  icon?: ComponentChildren
  children: ComponentChildren
}
```

---

## 🎨 Required Atomic CSS Extensions

### Modal/Overlay Classes
```css
/* Modal positioning and backdrop */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.modal-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
}

/* Modal sizes */
.modal-sm { max-width: 400px; }
.modal-md { max-width: 600px; }
.modal-lg { max-width: 800px; }
.modal-xl { max-width: 1200px; }
.modal-fullscreen { 
  width: 100vw; 
  height: 100vh; 
  max-width: none; 
  max-height: none; 
}
```

### Tooltip/Popover Classes
```css
/* Tooltip positioning */
.tooltip {
  position: absolute;
  z-index: 1050;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  pointer-events: none;
}

.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
}

/* Tooltip placement arrows */
.tooltip-top .tooltip-arrow {
  bottom: -4px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid rgba(0, 0, 0, 0.9);
}

.tooltip-bottom .tooltip-arrow {
  top: -4px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid rgba(0, 0, 0, 0.9);
}
```

### Loading/Animation Classes
```css
/* Spinner animations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.spinner-circle {
  animation: spin 1s linear infinite;
  border: 2px solid #f3f3f3;
  border-top: 2px solid var(--spinner-color, #3b82f6);
  border-radius: 50%;
}

.spinner-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

.spinner-dots {
  display: flex;
  gap: 4px;
}

.spinner-dots > div {
  animation: bounce 1.4s ease-in-out infinite both;
}
```

### Alert/Toast Classes
```css
/* Alert variants */
.alert {
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.alert-info {
  background: #eff6ff;
  border-color: #3b82f6;
  color: #1e40af;
}

.alert-success {
  background: #f0fdf4;
  border-color: #22c55e;
  color: #166534;
}

.alert-warning {
  background: #fffbeb;
  border-color: #f59e0b;
  color: #92400e;
}

.alert-error {
  background: #fef2f2;
  border-color: #ef4444;
  color: #dc2626;
}

/* Toast positioning */
.toast-container {
  position: fixed;
  z-index: 1060;
  pointer-events: none;
}

.toast-container-top-right {
  top: 16px;
  right: 16px;
}

.toast-container-bottom-center {
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
}
```

---

## 🧪 Advanced Testing Strategies

### Modal Testing Patterns
```tsx
export const ModalInteractiveTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test modal opening
    const openButton = canvas.getByText('Open Modal')
    await userEvent.click(openButton)
    
    const modal = await canvas.findByRole('dialog')
    expect(modal).toBeInTheDocument()
    
    // Test focus trapping
    const firstFocusable = within(modal).getByRole('button', { name: /close/i })
    expect(firstFocusable).toHaveFocus()
    
    // Test Escape key closing
    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(modal).not.toBeInTheDocument()
    })
    
    // Test backdrop click closing
    await userEvent.click(openButton)
    const backdrop = await canvas.findByTestId('modal-backdrop')
    await userEvent.click(backdrop)
    await waitFor(() => {
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
    })
  }
}
```

### Tooltip Testing Patterns
```tsx
export const TooltipInteractiveTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText('Hover me')
    
    // Test hover trigger
    await userEvent.hover(trigger)
    const tooltip = await canvas.findByRole('tooltip')
    expect(tooltip).toBeVisible()
    
    // Test tooltip positioning
    expect(tooltip).toHaveClass('tooltip-top')
    
    // Test hover out
    await userEvent.unhover(trigger)
    await waitFor(() => {
      expect(tooltip).not.toBeInTheDocument()
    })
    
    // Test keyboard focus
    await userEvent.tab()
    expect(trigger).toHaveFocus()
    const tooltipOnFocus = await canvas.findByRole('tooltip')
    expect(tooltipOnFocus).toBeVisible()
  }
}
```

### Toast Manager Testing
```tsx
export const ToastManagerTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test showing toast
    const showButton = canvas.getByText('Show Toast')
    await userEvent.click(showButton)
    
    const toast = await canvas.findByRole('alert')
    expect(toast).toBeInTheDocument()
    
    // Test auto-dismiss
    await waitFor(() => {
      expect(toast).not.toBeInTheDocument()
    }, { timeout: 5000 })
    
    // Test manual dismiss
    await userEvent.click(showButton)
    const newToast = await canvas.findByRole('alert')
    const dismissButton = within(newToast).getByRole('button')
    await userEvent.click(dismissButton)
    
    expect(newToast).not.toBeInTheDocument()
  }
}
```

---

## ⚡ Performance Considerations

### Portal Performance
```tsx
// Lazy portal creation
const Portal = lazy(() => import('./Portal'))

function Modal({ isOpen, children, ...props }: ModalProps) {
  if (!isOpen) return null
  
  return (
    <Suspense fallback={null}>
      <Portal>
        <ModalContent {...props}>
          {children}
        </ModalContent>
      </Portal>
    </Suspense>
  )
}
```

### Animation Performance
```css
/* GPU-accelerated animations */
.modal-enter {
  transform: scale(0.95) translateZ(0);
  opacity: 0;
  transition: all 0.2s ease-out;
}

.modal-enter-active {
  transform: scale(1) translateZ(0);
  opacity: 1;
}

/* Efficient spinner animations */
.spinner-circle {
  will-change: transform;
  animation: spin 1s linear infinite;
}
```

### Memory Management
```tsx
// Toast cleanup utilities
export class ToastManager {
  private toasts = new Map<string, Toast>()
  private timers = new Map<string, NodeJS.Timeout>()
  
  show(toast: ToastProps): string {
    const id = generateId()
    this.toasts.set(id, toast)
    
    if (toast.duration) {
      const timer = setTimeout(() => {
        this.dismiss(id)
      }, toast.duration)
      this.timers.set(id, timer)
    }
    
    return id
  }
  
  dismiss(id: string): void {
    this.toasts.delete(id)
    
    const timer = this.timers.get(id)
    if (timer) {
      clearTimeout(timer)
      this.timers.delete(id)
    }
  }
  
  cleanup(): void {
    this.timers.forEach(timer => clearTimeout(timer))
    this.timers.clear()
    this.toasts.clear()
  }
}
```

---

## 📊 Phase 3 Success Criteria

### Functional Requirements
- [ ] All components keyboard accessible
- [ ] Focus management w modal/tooltip
- [ ] Screen reader announcements
- [ ] Mobile touch support
- [ ] Progressive enhancement

### Performance Requirements
- [ ] Bundle size <2KB total for Phase 3
- [ ] Modal open/close <200ms
- [ ] Tooltip show/hide <100ms
- [ ] Smooth 60fps animations
- [ ] Memory cleanup on unmount

### Quality Requirements
- [ ] 100% TypeScript coverage
- [ ] >85% test coverage
- [ ] Portal/overlay edge cases tested
- [ ] Cross-browser compatibility
- [ ] Touch device testing

---

## 🔗 Integration Examples

### Complete Form with Phase 1+2+3
```tsx
function CompleteForm() {
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  return (
    <Card>
      <FormField label="Email" required>
        <Input 
          type="email" 
          placeholder="Enter email"
          suffixIcon={
            <Tooltip content="We'll never share your email">
              <InfoIcon />
            </Tooltip>
          }
        />
      </FormField>
      
      <LoadingOverlay loading={loading}>
        <Button 
          variant="primary" 
          loading={loading}
          onClick={() => setLoading(true)}
        >
          Submit Form
        </Button>
      </LoadingOverlay>
      
      {showSuccess && (
        <Alert 
          variant="success"
          dismissible
          onDismiss={() => setShowSuccess(false)}
        >
          Form submitted successfully!
        </Alert>
      )}
    </Card>
  )
}
```

---

## 🚀 Implementation Priority

### Week 1: Core Overlays
1. **Modal/Dialog** - Najważniejszy overlay component
2. **Tooltip** - Proste pozycjonowanie

### Week 2: Feedback Components  
3. **Loading/Spinner** - Stan ładowania
4. **Alert/Toast** - User feedback

### Week 3: Navigation Enhancement
5. **Tabs** - Content organization

---

*Phase 3 Target: 98% use case coverage*  
*Previous Phase: [Phase 2 - Forms & Navigation](./phase-2-forms-navigation.md)*  
*Next Phase: [Phase 4 - Advanced](./phase-4-advanced.md)*
