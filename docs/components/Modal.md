# Modal Component

Modal component for displaying overlaid content that requires user interaction before proceeding.

## Overview

The Modal component creates a dialog overlay that blocks interaction with the underlying page content. It provides complete accessibility support, keyboard navigation, focus management, and customizable sizing options.

## Basic Usage

```tsx
import Modal from '@/components/Modal/Modal'
import { useState } from 'preact/hooks'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>This is the modal content.</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </>
  )
}
```

## Features

### Different Sizes
```tsx
<Modal size="sm" open={isOpen} onClose={onClose}>
  Small modal
</Modal>

<Modal size="md" open={isOpen} onClose={onClose}>
  Medium modal (default)
</Modal>

<Modal size="lg" open={isOpen} onClose={onClose}>
  Large modal
</Modal>

<Modal size="xl" open={isOpen} onClose={onClose}>
  Extra large modal
</Modal>
```

### Custom Width
```tsx
<Modal width="600px" open={isOpen} onClose={onClose}>
  Modal with custom width
</Modal>

<Modal width="80%" open={isOpen} onClose={onClose}>
  Modal with percentage width
</Modal>
```

### With Title
```tsx
<Modal 
  open={isOpen} 
  onClose={onClose}
  title="Confirmation Dialog"
>
  Are you sure you want to delete this item?
</Modal>
```

### Non-dismissible Modal
```tsx
<Modal 
  open={isOpen} 
  onClose={onClose}
  dismissible={false}
  showClose={false}
>
  This modal can only be closed programmatically
</Modal>
```

### Event Handlers
```tsx
<Modal 
  open={isOpen}
  onClose={() => {
    console.log('Modal closing')
    setIsOpen(false)
  }}
  onOpen={() => {
    console.log('Modal opened')
  }}
>
  Modal with event handlers
</Modal>
```

## Common Patterns

### Confirmation Dialog
```tsx
function ConfirmationModal({ open, onConfirm, onCancel }) {
  return (
    <Modal 
      open={open} 
      onClose={onCancel}
      title="Confirm Action"
      size="sm"
    >
      <p>Are you sure you want to proceed?</p>
      <div className="modal-actions">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </Modal>
  )
}
```

### Form Modal
```tsx
function CreateUserModal({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({ name: '', email: '' })

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      title="Create New User"
      size="md"
    >
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" 
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <div className="modal-actions">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">Create User</button>
        </div>
      </form>
    </Modal>
  )
}
```

### Information Modal
```tsx
function InfoModal({ open, onClose, data }) {
  return (
    <Modal 
      open={open} 
      onClose={onClose}
      title="User Details"
      size="lg"
    >
      <div className="user-info">
        <h3>{data.name}</h3>
        <p>Email: {data.email}</p>
        <p>Role: {data.role}</p>
        <p>Last Login: {data.lastLogin}</p>
      </div>
    </Modal>
  )
}
```

## Best Practices

1. **Use sparingly**: Modals interrupt user flow, so use them only when necessary
2. **Provide clear actions**: Always include clear ways to close or complete the modal
3. **Handle escape key**: Allow users to close dismissible modals with the Escape key
4. **Manage focus**: The modal automatically handles focus management for accessibility
5. **Consider mobile**: Ensure modals work well on smaller screens
6. **Avoid nesting**: Don't open modals from within other modals

## Accessibility

- **Focus Management**: Automatically traps focus within the modal when open
- **Keyboard Navigation**: Supports Escape key to close dismissible modals
- **ARIA Attributes**: Proper dialog roles and labeling for screen readers
- **Background Scrolling**: Prevents background page scrolling when modal is open
- **Focus Restoration**: Returns focus to the trigger element when modal closes

## Related Components

- [Alert](./Alert.md) - For simple notifications
- [Tooltip](./Tooltip.md) - For contextual information
- [Loading](./Loading.md) - For modal loading states

## API Reference

See [Modal API](../api/Modal.md) for detailed prop documentation.
