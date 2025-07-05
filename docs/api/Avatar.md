# Avatar API Reference

Avatar component for displaying user profile pictures, initials, or placeholder content.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | Image source URL |
| `alt` | `string` | `undefined` | Alt text for the image |
| `initials` | `string` | `undefined` | Initials to display when no image |
| `name` | `string` | `undefined` | Full name (auto-generates initials) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Size of the avatar |
| `shape` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | Shape of the avatar |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'neutral'` | `'neutral'` | Color variant for initials background |
| `bg` | `string` | `undefined` | Custom background color |
| `color` | `string` | `undefined` | Custom text color |
| `bordered` | `boolean` | `false` | Whether to show border around avatar |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | `undefined` | Online status indicator |
| `showStatus` | `boolean` | `false` | Whether to display status indicator |
| `placeholder` | `ComponentChildren` | `undefined` | Fallback content when no image or initials |
| `className` | `string` | `''` | Additional CSS classes |

## CSS Classes

The Avatar component uses the following CSS classes:

- `.avatar` - Base avatar container
- `.avatar--xs` - Extra small size (24px)
- `.avatar--sm` - Small size (32px)
- `.avatar--md` - Medium size (40px, default)
- `.avatar--lg` - Large size (56px)
- `.avatar--xl` - Extra large size (80px)
- `.avatar--2xl` - 2X large size (120px)
- `.avatar--circle` - Circular shape
- `.avatar--square` - Square shape
- `.avatar--rounded` - Rounded square shape
- `.avatar--bordered` - Border styling
- `.avatar__image` - Image element styling
- `.avatar__initials` - Initials text styling
- `.avatar__placeholder` - Placeholder content styling
- `.avatar__status` - Status indicator styling
- `.avatar__status--online` - Online status (green)
- `.avatar__status--offline` - Offline status (gray)
- `.avatar__status--away` - Away status (yellow)
- `.avatar__status--busy` - Busy status (red)

## CSS Custom Properties

- `--avatar-bg` - Background color (set via bg prop or variant)
- `--avatar-color` - Text color (set via color prop)
- `--avatar-border-color` - Border color
- `--avatar-size` - Size of the avatar

## Examples

### Basic Avatar with Image
```tsx
<Avatar 
  src="/path/to/avatar.jpg" 
  alt="John Doe's profile picture"
  size="md"
/>
```

### Avatar with Initials
```tsx
<Avatar 
  initials="JD" 
  variant="primary"
  size="lg"
/>
```

### Avatar with Auto-generated Initials
```tsx
<Avatar 
  name="Jane Smith" 
  variant="success"
  size="md"
/>
```

### Avatar with Status Indicator
```tsx
<Avatar 
  src="/avatar.jpg"
  name="Online User"
  showStatus
  status="online"
  bordered
/>
```

### Custom Styled Avatar
```tsx
<Avatar 
  initials="CC"
  bg="#6366f1"
  color="#ffffff"
  size="xl"
  shape="rounded"
  bordered
/>
```

### Avatar with Fallback
```tsx
<Avatar 
  src="/broken-image.jpg"
  name="User Name"
  placeholder={<UserIcon />}
  variant="neutral"
/>
```

## Size Reference

| Size | Dimensions | Use Case |
|------|------------|----------|
| `xs` | 24px | Small lists, mentions |
| `sm` | 32px | Comments, chat messages |
| `md` | 40px | Default, general use |
| `lg` | 56px | User cards, profiles |
| `xl` | 80px | Profile headers |
| `2xl` | 120px | Large profile displays |

## Status Colors

| Status | Color | Meaning |
|--------|-------|---------|
| `online` | Green | User is currently active |
| `away` | Yellow | User is away from keyboard |
| `busy` | Red | User is busy/do not disturb |
| `offline` | Gray | User is offline |

## Accessibility

- **Image Alt Text**: Always provide meaningful alt text for images
- **Color Contrast**: All variant combinations meet WCAG AA contrast requirements
- **Screen Readers**: Status indicators are properly announced
- **Keyboard Navigation**: Focusable when interactive (e.g., when used as a button)

## Fallback Behavior

1. **Image Loading**: Attempts to load the provided `src`
2. **Image Error**: Falls back to initials if image fails to load
3. **Initials Generation**: 
   - Uses `initials` prop if provided
   - Auto-generates from `name` prop (first letter of each word)
4. **Final Fallback**: Shows `placeholder` content if no image or initials available

## Initials Generation Rules

- Takes the first letter of each word in the name
- Maximum of 2 characters
- Converts to uppercase
- Examples:
  - "John Doe" → "JD"
  - "Jane Smith Johnson" → "JS"
  - "Madonna" → "M"

## Performance Notes

- Images are lazy-loaded by default
- Failed image loads are cached to prevent repeated requests
- Status indicators use CSS for optimal performance
