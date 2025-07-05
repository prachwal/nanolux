# Modal API Reference

Modal component for displaying overlaid content that requires user interaction before proceeding.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Whether the modal is visible |
| `dismissible` | `boolean` | `true` | Whether the modal can be closed by clicking the overlay or pressing Escape |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Predefined size of the modal |
| `width` | `string` | `undefined` | Custom width (overrides size prop) |
| `title` | `string` | `undefined` | Title displayed in the modal header |
| `children` | `ComponentChildren` | **required** | Content of the modal |
| `onClose` | `() => void` | `undefined` | Callback function called when modal is closed |
| `onOpen` | `() => void` | `undefined` | Callback function called when modal is opened |
| `showClose` | `boolean` | `true` | Whether to show the close button in the header |
| `className` | `string` | `''` | Additional CSS classes to apply |

## CSS Classes

The Modal component uses the following CSS classes:

- `.modal` - Base modal container (overlay)
- `.modal__dialog` - Modal dialog container
- `.modal__dialog--sm` - Small modal size
- `.modal__dialog--md` - Medium modal size
- `.modal__dialog--lg` - Large modal size
- `.modal__dialog--xl` - Extra large modal size
- `.modal__header` - Modal header container
- `.modal__title` - Modal title styling
- `.modal__close` - Close button styling
- `.modal__content` - Modal content container
- `.modal--open` - Open state styling
- `.modal--closing` - Closing animation state

## CSS Custom Properties

- `--modal-width` - Custom modal width
- `--modal-max-width` - Maximum modal width
- `--modal-z-index` - Z-index for modal layering
- `--modal-backdrop-color` - Background overlay color
- `--modal-border-radius` - Modal border radius
- `--modal-shadow` - Modal box shadow

## Examples

### Basic Modal
```tsx
const [isOpen, setIsOpen] = useState(false)

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <p>Basic modal content</p>
</Modal>
```

### Modal with Title and Custom Size
```tsx
<Modal 
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Settings"
  size="lg"
>
  <div>
    <h3>User Preferences</h3>
    <p>Configure your settings here.</p>
  </div>
</Modal>
```

### Non-dismissible Modal
```tsx
<Modal 
  open={isOpen}
  onClose={() => setIsOpen(false)}
  dismissible={false}
  showClose={false}
  title="Required Action"
>
  <p>You must complete this action before proceeding.</p>
  <button onClick={() => setIsOpen(false)}>Complete</button>
</Modal>
```

### Modal with Custom Width
```tsx
<Modal 
  open={isOpen}
  onClose={() => setIsOpen(false)}
  width="90%"
  title="Wide Modal"
>
  <p>This modal takes up 90% of the screen width</p>
</Modal>
```

### Modal with Event Handlers
```tsx
<Modal 
  open={isOpen}
  onClose={() => {
    console.log('Modal closed')
    setIsOpen(false)
  }}
  onOpen={() => {
    console.log('Modal opened')
  }}
  title="Event Tracking"
>
  <p>This modal logs open and close events</p>
</Modal>
```

## Accessibility

- **Dialog Role**: Uses proper `role="dialog"` for screen readers
- **Focus Trap**: Automatically traps focus within the modal when open
- **Focus Restoration**: Returns focus to the trigger element when closed
- **Escape Key**: Closes dismissible modals when Escape is pressed
- **Overlay Click**: Closes dismissible modals when clicking outside the content
- **ARIA Labeling**: Proper labeling with `aria-labelledby` and `aria-describedby`
- **Background Scrolling**: Prevents page scrolling when modal is open

## Keyboard Navigation

- **Escape**: Closes the modal (if dismissible)
- **Tab**: Cycles through focusable elements within the modal
- **Shift + Tab**: Reverse tab navigation within the modal

## Sizing Reference

| Size | Width |
|------|-------|
| `sm` | 400px |
| `md` | 500px |
| `lg` | 700px |
| `xl` | 900px |

Custom widths can be specified using the `width` prop with any valid CSS value (px, %, em, rem, etc.).
