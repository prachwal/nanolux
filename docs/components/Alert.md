# Alert Component

Alert component for displaying important messages to users with various severity levels.

## Overview

The Alert component provides a way to display contextual feedback messages for typical user actions with different variants including info, success, warning, and error states. It supports features like dismissibility, auto-closing, and custom icons.

## Basic Usage

```tsx
import Alert from '@/components/Alert/Alert'

// Basic alert
<Alert variant="info">
  This is an informational message
</Alert>

// Success alert with title
<Alert variant="success" title="Success!" dismissible>
  Operation completed successfully
</Alert>

// Warning alert that auto-closes
<Alert variant="warning" autoClose={5000}>
  This alert will disappear in 5 seconds
</Alert>
```

## Variants

### Info (Default)
```tsx
<Alert variant="info">
  Informational message for users
</Alert>
```

### Success
```tsx
<Alert variant="success" title="Success!">
  Operation completed successfully
</Alert>
```

### Warning
```tsx
<Alert variant="warning" title="Warning">
  Please review your input
</Alert>
```

### Error
```tsx
<Alert variant="error" title="Error">
  Something went wrong
</Alert>
```

## Features

### Dismissible Alerts
```tsx
<Alert variant="info" dismissible onClose={() => console.log('Alert closed')}>
  This alert can be dismissed
</Alert>
```

### Auto-closing Alerts
```tsx
<Alert variant="success" autoClose={3000}>
  This alert will auto-close in 3 seconds
</Alert>
```

### With Icons
```tsx
<Alert variant="error" showIcon={true}>
  Alert with icon (default behavior)
</Alert>

<Alert variant="info" showIcon={false}>
  Alert without icon
</Alert>
```

### Controlled Visibility
```tsx
const [visible, setVisible] = useState(true)

<Alert 
  variant="info" 
  visible={visible} 
  onClose={() => setVisible(false)}
>
  Controlled alert visibility
</Alert>
```

## Best Practices

1. **Choose appropriate variants**: Use the correct variant to match the message severity
2. **Keep messages concise**: Alert messages should be brief and actionable
3. **Use titles wisely**: Titles help categorize alerts but aren't always necessary
4. **Consider auto-close timing**: For non-critical messages, auto-close after 3-5 seconds
5. **Make important alerts persistent**: Critical error messages should require user dismissal
6. **Limit simultaneous alerts**: Avoid showing too many alerts at once

## Accessibility

- Uses semantic HTML structure for screen readers
- Proper ARIA attributes for alert announcements
- Keyboard navigation support for dismissible alerts
- High contrast colors for different variants
- Icons provide visual context alongside text

## Related Components

- [Toast](./Toast.md) - For temporary notifications
- [Modal](./Modal.md) - For blocking user interactions
- [Banner](./Banner.md) - For persistent system-wide messages

## API Reference

See [Alert API](../api/Alert.md) for detailed prop documentation.
