# Tooltip API Reference

Tooltip component for displaying contextual information when users hover, focus, or click on elements.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | **required** | Text content of the tooltip |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position of the tooltip relative to the trigger element |
| `trigger` | `'hover' \| 'click' \| 'focus'` | `'hover'` | Event that shows/hides the tooltip |
| `delay` | `number` | `200` | Delay in milliseconds before showing the tooltip |
| `disabled` | `boolean` | `false` | Whether the tooltip is disabled |
| `children` | `ComponentChildren` | **required** | Element that triggers the tooltip |
| `className` | `string` | `''` | Additional CSS classes to apply |
| `maxWidth` | `string` | `'250px'` | Maximum width of the tooltip |

## CSS Classes

The Tooltip component uses the following CSS classes:

- `.tooltip` - Base tooltip container
- `.tooltip__trigger` - Wrapper for the trigger element
- `.tooltip__content` - Tooltip content container
- `.tooltip__content--visible` - Visible state styling
- `.tooltip__content--top` - Top placement styling
- `.tooltip__content--bottom` - Bottom placement styling
- `.tooltip__content--left` - Left placement styling
- `.tooltip__content--right` - Right placement styling
- `.tooltip__arrow` - Tooltip arrow/pointer styling

## CSS Custom Properties

- `--tooltip-bg` - Background color of the tooltip
- `--tooltip-color` - Text color of the tooltip
- `--tooltip-border-radius` - Border radius of the tooltip
- `--tooltip-shadow` - Box shadow of the tooltip
- `--tooltip-z-index` - Z-index for tooltip layering
- `--tooltip-max-width` - Maximum width (set via maxWidth prop)

## Examples

### Basic Tooltip
```tsx
<Tooltip content="This is a helpful tooltip">
  <button>Hover me</button>
</Tooltip>
```

### Different Placements
```tsx
<Tooltip content="Top tooltip" placement="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
  <button>Bottom</button>
</Tooltip>

<Tooltip content="Left tooltip" placement="left">
  <button>Left</button>
</Tooltip>

<Tooltip content="Right tooltip" placement="right">
  <button>Right</button>
</Tooltip>
```

### Different Triggers
```tsx
{/* Hover trigger (default) */}
<Tooltip content="Hover to see" trigger="hover">
  <span>Hover me</span>
</Tooltip>

{/* Click trigger */}
<Tooltip content="Click to see" trigger="click">
  <button>Click me</button>
</Tooltip>

{/* Focus trigger */}
<Tooltip content="Focus to see" trigger="focus">
  <input placeholder="Focus me" />
</Tooltip>
```

### Custom Styling
```tsx
<Tooltip 
  content="Custom styled tooltip"
  className="custom-tooltip"
  maxWidth="300px"
>
  <button>Custom tooltip</button>
</Tooltip>
```

### With Delay
```tsx
{/* Fast tooltip */}
<Tooltip content="Fast tooltip" delay={0}>
  <button>No delay</button>
</Tooltip>

{/* Slow tooltip */}
<Tooltip content="Slow tooltip" delay={1000}>
  <button>1 second delay</button>
</Tooltip>
```

### Disabled Tooltip
```tsx
<Tooltip content="You won't see this" disabled>
  <button>Disabled tooltip</button>
</Tooltip>
```

## Accessibility

- **ARIA Attributes**: Uses `aria-describedby` to link tooltip content to trigger element
- **Keyboard Navigation**: 
  - Focus trigger works with Tab navigation
  - Click trigger works with Enter/Space keys
  - Escape key dismisses click-triggered tooltips
- **Screen Reader Support**: Tooltip content is announced when appropriate
- **Touch Devices**: Gracefully handles hover events on touch interfaces

## Positioning Logic

The tooltip automatically:
- Calculates optimal position based on trigger element location
- Adjusts placement to avoid viewport edges
- Centers the tooltip relative to the trigger element
- Positions the arrow to point to the trigger

## Behavior Details

### Hover Trigger
- Shows on mouseenter, hides on mouseleave
- Respects the delay setting
- Cancels show/hide if opposite event occurs during delay

### Click Trigger
- Toggles visibility on click
- Closes when clicking outside the tooltip
- Can be closed with Escape key

### Focus Trigger
- Shows on focus, hides on blur
- Works with keyboard navigation
- Respects the delay setting

## Browser Support

- Modern browsers with CSS positioning support
- Graceful degradation for older browsers
- Responsive design for mobile devices

## Performance Notes

- Tooltips are rendered but hidden by default
- Position calculations are optimized for performance
- Event listeners are properly cleaned up to prevent memory leaks
