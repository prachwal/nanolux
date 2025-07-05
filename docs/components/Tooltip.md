# Tooltip Component

Tooltip component for displaying contextual information when users hover, focus, or click on elements.

## Overview

The Tooltip component provides contextual help and information about UI elements. It supports multiple placement options, trigger methods, and includes proper accessibility features and positioning logic.

## Basic Usage

```tsx
import Tooltip from '@/components/Tooltip/Tooltip'

<Tooltip content="This is a helpful tooltip">
  <button>Hover me</button>
</Tooltip>
```

## Placement Options

### Top (Default)
```tsx
<Tooltip content="Tooltip above the element" placement="top">
  <button>Top Tooltip</button>
</Tooltip>
```

### Bottom
```tsx
<Tooltip content="Tooltip below the element" placement="bottom">
  <button>Bottom Tooltip</button>
</Tooltip>
```

### Left
```tsx
<Tooltip content="Tooltip to the left" placement="left">
  <button>Left Tooltip</button>
</Tooltip>
```

### Right
```tsx
<Tooltip content="Tooltip to the right" placement="right">
  <button>Right Tooltip</button>
</Tooltip>
```

## Trigger Methods

### Hover (Default)
```tsx
<Tooltip content="Shows on hover" trigger="hover">
  <span>Hover me</span>
</Tooltip>
```

### Click
```tsx
<Tooltip content="Shows on click" trigger="click">
  <button>Click me</button>
</Tooltip>
```

### Focus
```tsx
<Tooltip content="Shows on focus" trigger="focus">
  <input placeholder="Focus me" />
</Tooltip>
```

## Features

### Custom Delay
```tsx
<Tooltip content="Delayed tooltip" delay={500}>
  <button>Delayed hover</button>
</Tooltip>

<Tooltip content="No delay" delay={0}>
  <button>Instant tooltip</button>
</Tooltip>
```

### Maximum Width
```tsx
<Tooltip 
  content="This is a very long tooltip that will wrap to multiple lines" 
  maxWidth="200px"
>
  <button>Long tooltip</button>
</Tooltip>
```

### Disabled Tooltip
```tsx
<Tooltip content="This won't show" disabled>
  <button>Disabled tooltip</button>
</Tooltip>
```

## Common Use Cases

### Form Field Help
```tsx
<div className="form-field">
  <label htmlFor="password">
    Password
    <Tooltip content="Password must be at least 8 characters long">
      <span className="help-icon">?</span>
    </Tooltip>
  </label>
  <input id="password" type="password" />
</div>
```

### Icon Explanations
```tsx
<div className="toolbar">
  <Tooltip content="Save document">
    <button className="icon-button">💾</button>
  </Tooltip>
  
  <Tooltip content="Print document">
    <button className="icon-button">🖨️</button>
  </Tooltip>
  
  <Tooltip content="Share document">
    <button className="icon-button">📤</button>
  </Tooltip>
</div>
```

### Status Indicators
```tsx
<div className="status-list">
  <Tooltip content="Service is running normally">
    <div className="status-indicator status--success">API Service</div>
  </Tooltip>
  
  <Tooltip content="Service is experiencing issues">
    <div className="status-indicator status--warning">Database</div>
  </Tooltip>
  
  <Tooltip content="Service is currently offline">
    <div className="status-indicator status--error">Cache</div>
  </Tooltip>
</div>
```

### Truncated Text
```tsx
<div className="user-list">
  {users.map(user => (
    <Tooltip key={user.id} content={user.fullName}>
      <div className="user-item">
        {user.fullName.length > 20 
          ? user.fullName.slice(0, 20) + '...'
          : user.fullName
        }
      </div>
    </Tooltip>
  ))}
</div>
```

## Advanced Usage

### Conditional Tooltips
```tsx
function ConditionalTooltip({ user, children }) {
  const shouldShowTooltip = user.bio && user.bio.length > 0
  
  if (!shouldShowTooltip) {
    return children
  }
  
  return (
    <Tooltip content={user.bio}>
      {children}
    </Tooltip>
  )
}
```

### Rich Content Workaround
```tsx
// For complex content, consider using a Popover instead
function RichTooltip({ children }) {
  return (
    <Tooltip content="John Doe - Senior Developer - Last seen 2 hours ago">
      {children}
    </Tooltip>
  )
}
```

## Best Practices

1. **Keep content concise**: Tooltips should provide brief, helpful information
2. **Use appropriate triggers**: Hover for supplementary info, focus for form help, click for complex content
3. **Don't repeat visible text**: Tooltips should add value, not duplicate existing content
4. **Consider mobile**: Hover tooltips don't work on touch devices
5. **Provide alternatives**: Ensure important information is accessible without tooltips
6. **Test positioning**: Verify tooltips don't get cut off at screen edges

## Accessibility

- **Keyboard Support**: Focus-triggered tooltips work with keyboard navigation
- **Screen Readers**: Proper ARIA attributes for assistive technologies
- **High Contrast**: Tooltip styling maintains readability in high contrast modes
- **Touch Devices**: Graceful handling of hover events on touch interfaces

## Related Components

- [Popover](./Popover.md) - For more complex overlay content
- [Modal](./Modal.md) - For blocking interactions
- [Alert](./Alert.md) - For important notifications

## API Reference

See [Tooltip API](../api/Tooltip.md) for detailed prop documentation.
