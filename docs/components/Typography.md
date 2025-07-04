# Typography: Heading & Text

> **Status**: ✅ Phase 1 Complete  
> **Bundle Size**: ~200B total  
> **Coverage**: 13 unit tests, 8 interactive stories

## 🎯 Overview

Complete typography system with semantic heading hierarchy and flexible text component. Built for performance, accessibility, and design consistency with atomic CSS foundation.

## 📊 Metrics

- **Combined Bundle**: ~200B (8% of Phase 1 total)
- **Heading Bundle**: ~100B
- **Text Bundle**: ~100B
- **Stories**: 8 interactive examples
- **Tests**: 13 unit tests
- **Performance**: Pure CSS rendering

---

## 📝 Heading Component

### Features
Semantic heading component with automatic size mapping and full customization options.

#### Levels & Auto-sizing
- `h1` → `4xl` size (2.25rem)
- `h2` → `3xl` size (1.875rem)
- `h3` → `2xl` size (1.5rem)
- `h4` → `xl` size (1.25rem)
- `h5` → `lg` size (1.125rem)
- `h6` → `base` size (1rem)

#### Size Options
- `xs` - 0.75rem
- `sm` - 0.875rem
- `base` - 1rem
- `lg` - 1.125rem
- `xl` - 1.25rem
- `2xl` - 1.5rem
- `3xl` - 1.875rem
- `4xl` - 2.25rem

### API Reference
```tsx
interface HeadingProps {
  /** Semantic heading level */
  level: 1 | 2 | 3 | 4 | 5 | 6
  /** Override automatic size */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  /** Center alignment */
  center?: boolean
  /** Custom text color */
  color?: string
  /** Heading content */
  children: ComponentChildren
  /** Additional props */
  [key: string]: any
}
```

### Usage Examples

#### Semantic Hierarchy
```tsx
<Heading level={1}>Main Page Title</Heading>
<Heading level={2}>Section Heading</Heading>
<Heading level={3}>Subsection</Heading>
```

#### Size Override
```tsx
<Heading level={2} size="4xl">
  Large Section Title
</Heading>
```

#### Styling Options
```tsx
<Heading level={1} center color="#007bff">
  Centered Blue Title
</Heading>
```

---

## 📄 Text Component

### Features
Flexible text component for body content, labels, and UI text with comprehensive styling options.

#### Sizes
- `xs` - 0.75rem (small labels)
- `sm` - 0.875rem (secondary text)
- `base` - 1rem (default body text)
- `lg` - 1.125rem (prominent text)
- `xl` - 1.25rem (large text)

#### Weights
- `normal` - 400 (default)
- `medium` - 500 (emphasis)
- `bold` - 700 (strong emphasis)

#### States
- `muted` - Reduced opacity for secondary content
- `center` - Center alignment

### API Reference
```tsx
interface TextProps {
  /** Text size */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  /** Font weight */
  weight?: 'normal' | 'medium' | 'bold'
  /** Muted appearance */
  muted?: boolean
  /** Center alignment */
  center?: boolean
  /** Custom text color */
  color?: string
  /** Text content */
  children: ComponentChildren
  /** HTML element type */
  as?: 'p' | 'span' | 'div' | 'label'
  /** Additional props */
  [key: string]: any
}
```

### Usage Examples

#### Body Text
```tsx
<Text size="lg">
  Important paragraph content with larger text.
</Text>
```

#### Emphasized Text
```tsx
<Text weight="bold" color="#007bff">
  Important highlighted information
</Text>
```

#### Secondary Information
```tsx
<Text size="sm" muted>
  Additional details or metadata
</Text>
```

#### Custom Element
```tsx
<Text as="label" weight="medium">
  Form Field Label
</Text>
```

---

## 🏗️ Implementation Details

### Atomic CSS Integration
Both components leverage the atomic CSS system for consistent typography scaling and spacing.

#### Heading Implementation
```tsx
function Heading({ level, size, center, color, children, ...props }) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  const autoSize = sizeMap[level] || 'base'
  const finalSize = size || autoSize
  
  const classes = [
    `text-${finalSize}`,
    'font-bold',
    center && 'text-center'
  ].filter(Boolean).join(' ')
  
  const style = color ? `color: ${color}` : undefined
  
  return (
    <Tag class={classes} style={style} {...props}>
      {children}
    </Tag>
  )
}
```

#### Text Implementation
```tsx
function Text({ size = 'base', weight = 'normal', muted, center, color, as = 'p', children, ...props }) {
  const Tag = as as keyof JSX.IntrinsicElements
  
  const classes = [
    `text-${size}`,
    weight !== 'normal' && `font-${weight}`,
    muted && 'text-muted',
    center && 'text-center'
  ].filter(Boolean).join(' ')
  
  const style = color ? `color: ${color}` : undefined
  
  return (
    <Tag class={classes} style={style} {...props}>
      {children}
    </Tag>
  )
}
```

### CSS Classes Generated
- **Size classes**: `.text-xs` through `.text-4xl`
- **Weight classes**: `.font-normal`, `.font-medium`, `.font-bold`
- **Utility classes**: `.text-center`, `.text-muted`

---

## 🧪 Testing Strategy

### Combined Tests (13)
- ✅ Heading renders correct HTML element (h1-h6)
- ✅ Automatic size mapping works correctly
- ✅ Size override functionality
- ✅ Center alignment application
- ✅ Custom color styling
- ✅ Text component size options
- ✅ Font weight application
- ✅ Muted state styling
- ✅ Custom element rendering (as prop)
- ✅ CSS class composition
- ✅ Props pass-through
- ✅ Accessibility attributes
- ✅ TypeScript type safety

### Accessibility Tests
- Semantic HTML validation
- Screen reader compatibility
- Keyboard navigation support
- Color contrast compliance

---

## 📚 Storybook Stories

### Combined Stories (8)
1. **Heading Hierarchy** - All heading levels showcase
2. **Heading Sizes** - Size override examples
3. **Heading Styling** - Color and alignment options
4. **Text Sizes** - All text size variants
5. **Text Weights** - Font weight demonstrations
6. **Text States** - Muted and centered variants
7. **Typography Scale** - Complete system overview
8. **Real World Example** - Practical usage demo

---

## 🎨 Typography Scale

### Design System
```
Heading Scale:
- H1/4xl: 36px (2.25rem) - Page titles
- H2/3xl: 30px (1.875rem) - Section headers
- H3/2xl: 24px (1.5rem) - Subsections
- H4/xl:  20px (1.25rem) - Minor headings
- H5/lg:  18px (1.125rem) - Small headers
- H6/base: 16px (1rem) - Minimal headers

Text Scale:
- xl:   20px (1.25rem) - Large text
- lg:   18px (1.125rem) - Prominent text
- base: 16px (1rem) - Body text
- sm:   14px (0.875rem) - Secondary text
- xs:   12px (0.75rem) - Small labels
```

### Line Height
- **Headings**: 1.2 (tight spacing)
- **Text**: 1.6 (comfortable reading)

### Font Weights
- **normal**: 400 (body text)
- **medium**: 500 (emphasis)
- **bold**: 700 (headings, strong emphasis)

---

## ♿ Accessibility

### Semantic HTML
- **Proper heading hierarchy** - h1-h6 for screen readers
- **Meaningful structure** - Logical content organization
- **Element semantics** - Appropriate HTML elements

### Screen Reader Support
- **Heading navigation** - Screen readers can jump between headings
- **Content structure** - Clear information hierarchy
- **Text alternatives** - Proper labeling for complex text

### Visual Accessibility
- **Color contrast** - WCAG AA compliance
- **Focus indicators** - Clear focus states
- **Responsive text** - Readable at all screen sizes

---

## 🔧 Advanced Patterns

### Content Hierarchy
```tsx
<Stack spacing={24}>
  <Heading level={1} size="4xl" center>
    Welcome to NanoLux
  </Heading>
  
  <Text size="lg" center muted>
    Ultra-lightweight UI components for modern web apps
  </Text>
  
  <Stack spacing={16}>
    <Heading level={2}>Features</Heading>
    <Text>
      NanoLux provides a complete set of components optimized for 
      performance and developer experience.
    </Text>
  </Stack>
</Stack>
```

### Form Labels
```tsx
<Stack spacing={8}>
  <Text as="label" weight="medium">
    Email Address
  </Text>
  <Input type="email" placeholder="Enter your email..." />
  <Text size="xs" muted>
    We'll never share your email with anyone else.
  </Text>
</Stack>
```

### Card Content
```tsx
<Card>
  <Stack spacing={12}>
    <Heading level={3} color="#007bff">
      Card Title
    </Heading>
    <Text>
      Card description with proper typography hierarchy 
      and spacing.
    </Text>
    <Text size="sm" muted>
      Last updated 2 hours ago
    </Text>
  </Stack>
</Card>
```

---

## 📈 Performance Benchmarks

- **Bundle size**: 200B total (100B each)
- **Render performance**: Native DOM speed
- **CSS overhead**: Minimal atomic classes
- **Tree-shaking**: 100% unused styles eliminated
- **Font loading**: System fonts (zero latency)
- **Memory footprint**: Minimal wrapper elements

---

## 🔄 Design Tokens

### CSS Variables Available
```css
/* Typography customization */
--heading-color: Default heading color
--text-color: Default text color
--text-muted-opacity: Muted text opacity (default: 0.6)
--font-family: Font stack (system fonts)
```

### Atomic Classes
- `.text-*` - Size classes
- `.font-*` - Weight classes
- `.text-center` - Alignment
- `.text-muted` - Opacity state

---

## 🎯 Best Practices

### Semantic Usage
- Use heading levels semantically (h1 → h2 → h3)
- Override size only when necessary
- Maintain logical content hierarchy

### Performance
- Leverage atomic CSS for consistency
- Avoid custom font loading when possible
- Use system font stack for speed

### Accessibility
- Don't skip heading levels
- Provide sufficient color contrast
- Test with screen readers

### Design Consistency
- Stick to the defined scale
- Use muted text for secondary content
- Maintain consistent spacing with Stack/Flex

---

*Part of NanoLux Phase 1: Foundation - Complete ✅*
