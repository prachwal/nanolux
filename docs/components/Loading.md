# Loading Component

Loading component for displaying various loading states and spinner animations.

## Overview

The Loading component provides multiple animation variants for indicating loading states in your application. It supports different sizes, colors, overlay modes, and customizable loading text.

## Basic Usage

```tsx
import Loading from '@/components/Loading/Loading'

// Basic spinner
<Loading />

// With custom text
<Loading text="Loading data..." />

// Different variant
<Loading variant="dots" size="lg" />
```

## Variants

### Spinner (Default)
```tsx
<Loading variant="spinner" />
```

### Dots
```tsx
<Loading variant="dots" />
```

### Pulse
```tsx
<Loading variant="pulse" />
```

### Bars
```tsx
<Loading variant="bars" />
```

## Sizes

```tsx
<Loading size="sm" />   {/* Small */}
<Loading size="md" />   {/* Medium (default) */}
<Loading size="lg" />   {/* Large */}
<Loading size="xl" />   {/* Extra Large */}
```

## Features

### With Loading Text
```tsx
<Loading text="Loading..." />
<Loading text="Please wait..." textPosition="right" />
```

### Custom Colors
```tsx
<Loading color="#ff6b6b" />
<Loading color="var(--primary-color)" />
```

### Overlay Mode
```tsx
<Loading overlay loading={isLoading}>
  <div>
    <h1>Content</h1>
    <p>This content will be hidden while loading</p>
  </div>
</Loading>
```

### Conditional Loading
```tsx
const [isLoading, setIsLoading] = useState(false)

<Loading loading={isLoading} text="Processing..." />
```

## Use Cases

### Page Loading
```tsx
function PageContent() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchData().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loading variant="spinner" text="Loading page..." />
  }

  return <div>Page content</div>
}
```

### Overlay Loading
```tsx
function DataTable() {
  const [loading, setLoading] = useState(false)
  
  return (
    <Loading overlay loading={loading} text="Refreshing data...">
      <table>
        {/* Table content */}
      </table>
    </Loading>
  )
}
```

### Button Loading State
```tsx
function SubmitButton() {
  const [submitting, setSubmitting] = useState(false)
  
  return (
    <button disabled={submitting}>
      {submitting && <Loading size="sm" />}
      {submitting ? 'Submitting...' : 'Submit'}
    </button>
  )
}
```

## Best Practices

1. **Choose appropriate variants**: Spinner for general loading, dots for subtle loading, pulse for content placeholders
2. **Use overlay sparingly**: Only for operations that need to block user interaction
3. **Provide context**: Include descriptive loading text when the operation might take time
4. **Consider performance**: Use loading states for operations taking longer than 1-2 seconds
5. **Match design system**: Use consistent loading patterns across your application

## Accessibility

- Proper ARIA labels for screen readers
- Loading states are announced to assistive technologies
- Respects user's motion preferences (reduced animations)
- Semantic HTML structure for better accessibility

## Related Components

- [Button](./Button.md) - For button loading states
- [Alert](./Alert.md) - For loading error messages
- [Modal](./Modal.md) - For modal loading overlays

## API Reference

See [Loading API](../api/Loading.md) for detailed prop documentation.
