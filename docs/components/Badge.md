# Badge Component

Badge component for displaying small status indicators, labels, and counts.

## Overview

The Badge component provides a way to highlight status, categories, counts, or other small pieces of information. It supports multiple variants, sizes, and styles to fit different use cases.

## Basic Usage

```tsx
import Badge from '@/components/Badge/Badge'

<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
```

## Variants

### Default
```tsx
<Badge variant="default">Default</Badge>
```

### Primary
```tsx
<Badge variant="primary">Primary</Badge>
```

### Secondary
```tsx
<Badge variant="secondary">Secondary</Badge>
```

### Success
```tsx
<Badge variant="success">Active</Badge>
```

### Warning
```tsx
<Badge variant="warning">Pending</Badge>
```

### Danger
```tsx
<Badge variant="danger">Error</Badge>
```

### Info
```tsx
<Badge variant="info">Info</Badge>
```

## Sizes

```tsx
<Badge size="xs">Extra Small</Badge>
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>    {/* Default */}
<Badge size="lg">Large</Badge>
```

## Styles

### Rounded Badges
```tsx
<Badge rounded>Rounded</Badge>
<Badge variant="primary" rounded>Primary Rounded</Badge>
```

### Outline Badges
```tsx
<Badge outline>Outline</Badge>
<Badge variant="success" outline>Success Outline</Badge>
```

### Dot Badges
```tsx
<Badge dot>Notification</Badge>
<Badge variant="danger" dot dotPosition="top-right">Messages</Badge>
```

## Custom Colors

```tsx
<Badge bg="#ff6b6b" color="#ffffff">
  Custom Colors
</Badge>
```

## Common Use Cases

### Status Indicators
```tsx
<div className="user-status">
  <span>John Doe</span>
  <Badge variant="success">Online</Badge>
</div>

<div className="order-status">
  <span>Order #12345</span>
  <Badge variant="warning">Pending</Badge>
</div>

<div className="service-status">
  <span>API Service</span>
  <Badge variant="danger">Down</Badge>
</div>
```

### Counts and Numbers
```tsx
<div className="notification-item">
  <span>Messages</span>
  <Badge variant="primary" rounded>5</Badge>
</div>

<div className="shopping-cart">
  <ShoppingCartIcon />
  <Badge variant="danger" size="sm">3</Badge>
</div>
```

### Category Labels
```tsx
<div className="blog-post">
  <h3>Blog Post Title</h3>
  <div className="tags">
    <Badge variant="info" size="sm">JavaScript</Badge>
    <Badge variant="secondary" size="sm">React</Badge>
    <Badge variant="primary" size="sm">Tutorial</Badge>
  </div>
</div>
```

### Feature Highlights
```tsx
<div className="feature-list">
  <div className="feature">
    <span>Premium Feature</span>
    <Badge variant="warning" size="xs">Pro</Badge>
  </div>
  
  <div className="feature">
    <span>New Feature</span>
    <Badge variant="success" size="xs">New</Badge>
  </div>
  
  <div className="feature">
    <span>Beta Feature</span>
    <Badge variant="info" size="xs">Beta</Badge>
  </div>
</div>
```

### Navigation with Notifications
```tsx
<nav className="navigation">
  <a href="/messages" className="nav-item">
    Messages
    <Badge variant="danger" size="xs" rounded>12</Badge>
  </a>
  
  <a href="/notifications" className="nav-item">
    Notifications
    <Badge variant="primary" size="xs" rounded>3</Badge>
  </a>
</nav>
```

### User Roles
```tsx
<div className="user-card">
  <Avatar src="/avatar.jpg" name="Jane Smith" />
  <div className="user-info">
    <h4>Jane Smith</h4>
    <div className="user-roles">
      <Badge variant="primary" size="sm">Admin</Badge>
      <Badge variant="info" size="sm">Developer</Badge>
    </div>
  </div>
</div>
```

### Product Features
```tsx
<div className="product-card">
  <img src="/product.jpg" alt="Product" />
  <div className="product-badges">
    <Badge variant="success" size="sm">Free Shipping</Badge>
    <Badge variant="warning" size="sm">Limited Time</Badge>
    <Badge variant="danger" size="sm">Sale</Badge>
  </div>
  <h3>Product Name</h3>
</div>
```

## Advanced Usage

### Dynamic Badge Colors
```tsx
function StatusBadge({ status }) {
  const getVariant = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'pending': return 'warning'
      case 'error': return 'danger'
      case 'draft': return 'secondary'
      default: return 'default'
    }
  }

  return (
    <Badge variant={getVariant(status)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
```

### Counter Badge
```tsx
function CounterBadge({ count, max = 99 }) {
  const displayCount = count > max ? `${max}+` : count.toString()
  
  return (
    <Badge 
      variant="danger" 
      size="xs" 
      rounded
      style={{ display: count > 0 ? 'inline-block' : 'none' }}
    >
      {displayCount}
    </Badge>
  )
}
```

## Best Practices

1. **Use sparingly**: Don't overuse badges as they can create visual clutter
2. **Choose appropriate variants**: Use colors that match the semantic meaning
3. **Keep text short**: Badges work best with 1-3 words or numbers
4. **Maintain consistency**: Use consistent badge styles throughout your app
5. **Consider accessibility**: Ensure sufficient color contrast for all variants

## Accessibility

- **Color Contrast**: All variants meet WCAG AA contrast requirements
- **Screen Readers**: Badge content is properly announced
- **Semantic HTML**: Uses appropriate HTML elements for context
- **Focus Indicators**: Clear focus states when badges are interactive

## Related Components

- [Button](./Button.md) - For interactive badges
- [Avatar](./Avatar.md) - Often used together with badges
- [Chip](./Chip.md) - For larger, more interactive labels

## API Reference

See [Badge API](../api/Badge.md) for detailed prop documentation.
