# Alert API Reference

Alert component for displaying important messages to users with various severity levels.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | The type/severity of the alert |
| `dismissible` | `boolean` | `false` | Whether the alert can be dismissed by the user |
| `autoClose` | `number \| false` | `false` | Auto-close timer in milliseconds, or false to disable |
| `title` | `string` | `undefined` | Optional title for the alert |
| `children` | `ComponentChildren` | **required** | The content/message of the alert |
| `onClose` | `() => void` | `undefined` | Callback function called when alert is closed |
| `showIcon` | `boolean` | `true` | Whether to display the variant-specific icon |
| `className` | `string` | `''` | Additional CSS classes to apply |
| `visible` | `boolean` | `true` | Controls the visibility of the alert |

## CSS Classes

The Alert component uses the following CSS classes:

- `.alert` - Base alert container
- `.alert--info` - Info variant styling
- `.alert--success` - Success variant styling  
- `.alert--warning` - Warning variant styling
- `.alert--error` - Error variant styling
- `.alert__header` - Alert header container (when title is present)
- `.alert__title` - Alert title styling
- `.alert__content` - Alert content/message container
- `.alert__close` - Close button styling (when dismissible)
- `.alert__icon` - Icon container styling
- `.alert--hidden` - Hidden state styling

## Examples

### Basic Alert
```tsx
<Alert variant="info">
  This is a basic informational alert
</Alert>
```

### Dismissible Alert with Title
```tsx
<Alert 
  variant="warning" 
  title="Warning" 
  dismissible 
  onClose={() => console.log('Alert dismissed')}
>
  Please review your input before proceeding
</Alert>
```

### Auto-closing Success Alert
```tsx
<Alert variant="success" autoClose={5000}>
  Data saved successfully!
</Alert>
```

### Controlled Alert
```tsx
const [alertVisible, setAlertVisible] = useState(true)

<Alert 
  variant="error" 
  visible={alertVisible}
  dismissible
  onClose={() => setAlertVisible(false)}
>
  An error occurred while processing your request
</Alert>
```

## Accessibility

- **ARIA Roles**: Uses `role="alert"` for immediate announcement to screen readers
- **Keyboard Navigation**: Dismissible alerts can be closed using keyboard (Enter/Space on close button)
- **Color Contrast**: All variants meet WCAG AA contrast requirements
- **Screen Reader Support**: Alert content is automatically announced when displayed

## Notes

- When `autoClose` is set, the alert will automatically call `onClose` after the specified duration
- The `visible` prop allows for external control of alert visibility
- Icons are automatically selected based on the variant unless `showIcon` is false
- Multiple alerts should be stacked vertically when displayed simultaneously
