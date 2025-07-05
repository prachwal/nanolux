# Accordion API Reference

Accordion component for creating collapsible content sections that can expand and collapse.

## Components

The Accordion system consists of two main components:

### Accordion (Container)
Main container component that manages accordion behavior and styling.

### AccordionItem
Individual collapsible section within the accordion.

## Accordion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ComponentChildren` | **required** | AccordionItem components |
| `multiple` | `boolean` | `false` | Whether multiple items can be open simultaneously |
| `variant` | `'default' \| 'bordered' \| 'filled'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the accordion |
| `onChange` | `(openItems: string[]) => void` | `undefined` | Callback when open items change |
| `class` | `string` | `''` | Additional CSS classes |

## AccordionItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **required** | Unique identifier for the accordion item |
| `title` | `string` | **required** | Header text for the accordion item |
| `children` | `ComponentChildren` | **required** | Content of the accordion item |
| `defaultOpen` | `boolean` | `false` | Whether the item is open by default |
| `disabled` | `boolean` | `false` | Whether the item is disabled |
| `icon` | `ComponentChildren` | `undefined` | Icon to display in the header |

## CSS Classes

### Accordion Container
- `.accordion` - Base accordion container
- `.accordion--default` - Default variant styling
- `.accordion--bordered` - Bordered variant styling
- `.accordion--filled` - Filled variant styling
- `.accordion--sm` - Small size
- `.accordion--md` - Medium size
- `.accordion--lg` - Large size

### AccordionItem
- `.accordion__item` - Individual accordion item
- `.accordion__header` - Accordion item header/trigger
- `.accordion__header--disabled` - Disabled header state
- `.accordion__title` - Title text styling
- `.accordion__icon` - Icon container
- `.accordion__content` - Content container
- `.accordion__content--open` - Open state styling
- `.accordion__chevron` - Expand/collapse indicator

## Examples

### Basic Accordion
```tsx
<Accordion>
  <AccordionItem id="basic1" title="Section 1">
    <p>Content for section 1</p>
  </AccordionItem>
  
  <AccordionItem id="basic2" title="Section 2">
    <p>Content for section 2</p>
  </AccordionItem>
</Accordion>
```

### Multiple Open Sections
```tsx
<Accordion multiple>
  <AccordionItem id="multi1" title="First Section">
    This can be open while others are also open
  </AccordionItem>
  
  <AccordionItem id="multi2" title="Second Section">
    Multiple sections can be expanded simultaneously
  </AccordionItem>
</Accordion>
```

### Different Variants
```tsx
// Bordered variant
<Accordion variant="bordered">
  <AccordionItem id="bordered1" title="Bordered Section">
    Content with bordered styling
  </AccordionItem>
</Accordion>

// Filled variant
<Accordion variant="filled">
  <AccordionItem id="filled1" title="Filled Section">
    Content with filled background
  </AccordionItem>
</Accordion>
```

### With Default Open State
```tsx
<Accordion>
  <AccordionItem 
    id="open1" 
    title="Open by Default" 
    defaultOpen={true}
  >
    This section starts expanded
  </AccordionItem>
  
  <AccordionItem id="closed1" title="Closed by Default">
    This section starts collapsed
  </AccordionItem>
</Accordion>
```

### With Icons
```tsx
<Accordion>
  <AccordionItem 
    id="settings" 
    title="Settings" 
    icon={<SettingsIcon />}
  >
    Settings content
  </AccordionItem>
  
  <AccordionItem 
    id="profile" 
    title="Profile" 
    icon={<UserIcon />}
  >
    Profile content
  </AccordionItem>
</Accordion>
```

### Disabled Items
```tsx
<Accordion>
  <AccordionItem id="enabled" title="Enabled Section">
    This section can be toggled
  </AccordionItem>
  
  <AccordionItem 
    id="disabled" 
    title="Disabled Section" 
    disabled={true}
  >
    This section cannot be toggled
  </AccordionItem>
</Accordion>
```

### With Change Handler
```tsx
function ControlledAccordion() {
  const [openItems, setOpenItems] = useState(['default-open'])
  
  return (
    <Accordion 
      multiple={true}
      onChange={setOpenItems}
    >
      <AccordionItem id="default-open" title="Default Open">
        This section is open by default
      </AccordionItem>
      
      <AccordionItem id="closeable" title="Closeable Section">
        This section can be opened and closed
      </AccordionItem>
    </Accordion>
  )
}
```

## Accessibility

- **Keyboard Navigation**: 
  - Tab to navigate between accordion headers
  - Space/Enter to toggle accordion items
  - Arrow keys for additional navigation
- **ARIA Attributes**: 
  - `role="button"` on headers
  - `aria-expanded` to indicate state
  - `aria-controls` to link header to content
  - `aria-disabled` for disabled items
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader Support**: Proper state announcements and navigation

## Behavior

### Single Mode (default)
- Only one accordion item can be open at a time
- Opening a new item automatically closes others
- Clicking an open item closes it

### Multiple Mode
- Multiple accordion items can be open simultaneously
- Each item operates independently
- No automatic closing of other items

## Animation

- Smooth expand/collapse animations
- Configurable animation duration via CSS custom properties
- Respects user's motion preferences (`prefers-reduced-motion`)

## Styling Notes

- Uses CSS custom properties for theming
- Responsive design considerations
- Consistent spacing and typography
- Smooth transitions for state changes
