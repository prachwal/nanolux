# Loading API Reference

Loading component for displaying various loading states and spinner animations.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'spinner' \| 'dots' \| 'pulse' \| 'bars'` | `'spinner'` | The animation style of the loader |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the loading indicator |
| `color` | `string` | `undefined` | Custom color for the loading indicator |
| `text` | `string` | `undefined` | Loading text to display alongside the indicator |
| `textPosition` | `'bottom' \| 'right'` | `'bottom'` | Position of the loading text relative to the indicator |
| `overlay` | `boolean` | `false` | Whether to show as an overlay that covers child content |
| `children` | `ComponentChildren` | `undefined` | Content to show/hide when using overlay mode |
| `className` | `string` | `''` | Additional CSS classes to apply |
| `loading` | `boolean` | `true` | Whether the loading state is active |

## CSS Classes

The Loading component uses the following CSS classes:

- `.loading` - Base loading container
- `.loading-spinner` - Spinner variant
- `.loading-dots` - Dots variant
- `.loading-pulse` - Pulse variant
- `.loading-bars` - Bars variant
- `.loading-sm` - Small size
- `.loading-md` - Medium size
- `.loading-lg` - Large size
- `.loading-xl` - Extra large size
- `.loading__text` - Loading text styling
- `.loading__text--bottom` - Text positioned below indicator
- `.loading__text--right` - Text positioned to the right of indicator
- `.loading-overlay` - Overlay container styling
- `.loading-overlay__content` - Overlay content styling

## CSS Custom Properties

- `--loading-color` - Custom color for the loading indicator
- `--loading-size` - Custom size for the loading indicator
- `--loading-speed` - Animation duration

## Examples

### Basic Loading Indicators
```tsx
<Loading variant="spinner" />
<Loading variant="dots" size="lg" />
<Loading variant="pulse" color="#007bff" />
<Loading variant="bars" size="sm" />
```

### With Loading Text
```tsx
<Loading text="Loading..." />
<Loading text="Please wait..." textPosition="right" />
<Loading variant="dots" text="Fetching data..." />
```

### Overlay Loading
```tsx
<Loading overlay loading={isLoading} text="Processing...">
  <div>
    <h2>Content Title</h2>
    <p>This content will be covered by the loading overlay</p>
  </div>
</Loading>
```

### Conditional Loading
```tsx
const [isLoading, setIsLoading] = useState(false)

// Only shows when loading is true
<Loading loading={isLoading} variant="spinner" text="Loading..." />

// Shows content when loading is false in overlay mode
<Loading overlay loading={isLoading}>
  <div>Content shown when not loading</div>
</Loading>
```

### Custom Styling
```tsx
<Loading 
  variant="spinner" 
  color="var(--primary-color)" 
  className="custom-loading"
  style={{ '--loading-speed': '0.5s' }}
/>
```

## Accessibility

- **ARIA Live Regions**: Loading text is announced to screen readers
- **Screen Reader Labels**: Proper labeling for loading states
- **Motion Preferences**: Respects `prefers-reduced-motion` for users with motion sensitivity
- **Focus Management**: Overlay mode properly manages focus when loading

## Animation Details

- **Spinner**: Circular rotation animation
- **Dots**: Sequential dot pulsing animation
- **Pulse**: Scale-based pulsing animation
- **Bars**: Height-changing bars animation

All animations respect the user's motion preferences and can be customized via CSS custom properties.
