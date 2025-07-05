# Accordion Component

Accordion component for creating collapsible content sections that can expand and collapse.

## Overview

The Accordion component provides a way to organize content into collapsible sections. Users can expand or collapse individual sections to show or hide content, making it perfect for FAQs, settings panels, and content organization.

## Basic Usage

```tsx
import { Accordion, AccordionItem } from '@/components/Accordion/Accordion'

<Accordion>
  <AccordionItem id="item1" title="First Section">
    <p>Content for the first accordion section.</p>
  </AccordionItem>
  
  <AccordionItem id="item2" title="Second Section">
    <p>Content for the second accordion section.</p>
  </AccordionItem>
  
  <AccordionItem id="item3" title="Third Section">
    <p>Content for the third accordion section.</p>
  </AccordionItem>
</Accordion>
```

## Variants

### Default
```tsx
<Accordion variant="default">
  <AccordionItem id="default1" title="Default Style">
    Clean, minimal accordion styling
  </AccordionItem>
</Accordion>
```

### Bordered
```tsx
<Accordion variant="bordered">
  <AccordionItem id="bordered1" title="Bordered Style">
    Accordion with visible borders
  </AccordionItem>
</Accordion>
```

### Filled
```tsx
<Accordion variant="filled">
  <AccordionItem id="filled1" title="Filled Style">
    Accordion with background fill
  </AccordionItem>
</Accordion>
```

## Sizes

```tsx
<Accordion size="sm">
  <AccordionItem id="small" title="Small Accordion">
    Compact accordion size
  </AccordionItem>
</Accordion>

<Accordion size="lg">
  <AccordionItem id="large" title="Large Accordion">
    Spacious accordion size
  </AccordionItem>
</Accordion>
```

## Features

### Multiple Open Items
```tsx
<Accordion multiple>
  <AccordionItem id="multi1" title="Section 1">
    Multiple sections can be open at once
  </AccordionItem>
  
  <AccordionItem id="multi2" title="Section 2">
    This section can be open while others are also open
  </AccordionItem>
  
  <AccordionItem id="multi3" title="Section 3">
    All sections are independent
  </AccordionItem>
</Accordion>
```

### Default Open Items
```tsx
<Accordion>
  <AccordionItem id="open1" title="Always Closed" defaultOpen={false}>
    This section starts closed
  </AccordionItem>
  
  <AccordionItem id="open2" title="Open by Default" defaultOpen={true}>
    This section starts open
  </AccordionItem>
</Accordion>
```

### Disabled Items
```tsx
<Accordion>
  <AccordionItem id="enabled" title="Enabled Section">
    This section can be toggled
  </AccordionItem>
  
  <AccordionItem id="disabled" title="Disabled Section" disabled>
    This section cannot be toggled
  </AccordionItem>
</Accordion>
```

### With Icons
```tsx
<Accordion>
  <AccordionItem 
    id="icon1" 
    title="Settings" 
    icon={<SettingsIcon />}
  >
    Settings content here
  </AccordionItem>
  
  <AccordionItem 
    id="icon2" 
    title="Profile" 
    icon={<UserIcon />}
  >
    Profile content here
  </AccordionItem>
</Accordion>
```

### Change Handler
```tsx
function ControlledAccordion() {
  const [openItems, setOpenItems] = useState(['faq1'])
  
  return (
    <Accordion 
      multiple 
      onChange={setOpenItems}
    >
      <AccordionItem id="faq1" title="What is React?">
        React is a JavaScript library for building user interfaces.
      </AccordionItem>
      
      <AccordionItem id="faq2" title="What is Preact?">
        Preact is a fast, lightweight alternative to React.
      </AccordionItem>
    </Accordion>
  )
}
```

## Common Use Cases

### FAQ Section
```tsx
<Accordion variant="bordered">
  <AccordionItem id="q1" title="How do I create an account?">
    <p>To create an account, click the "Sign Up" button and fill out the registration form.</p>
  </AccordionItem>
  
  <AccordionItem id="q2" title="How do I reset my password?">
    <p>Click "Forgot Password" on the login page and follow the email instructions.</p>
  </AccordionItem>
  
  <AccordionItem id="q3" title="How do I contact support?">
    <p>You can reach our support team at support@example.com or through the contact form.</p>
  </AccordionItem>
</Accordion>
```

### Settings Panel
```tsx
<Accordion multiple variant="filled">
  <AccordionItem id="general" title="General Settings" defaultOpen>
    <div className="settings-group">
      <label>
        <input type="checkbox" /> Enable notifications
      </label>
      <label>
        <input type="checkbox" /> Auto-save changes
      </label>
    </div>
  </AccordionItem>
  
  <AccordionItem id="privacy" title="Privacy Settings">
    <div className="settings-group">
      <label>
        <input type="checkbox" /> Make profile public
      </label>
      <label>
        <input type="checkbox" /> Allow data analytics
      </label>
    </div>
  </AccordionItem>
  
  <AccordionItem id="advanced" title="Advanced Settings">
    <div className="settings-group">
      <label>
        Developer mode: <input type="checkbox" />
      </label>
      <label>
        Debug logging: <input type="checkbox" />
      </label>
    </div>
  </AccordionItem>
</Accordion>
```

### Documentation Sections
```tsx
<Accordion>
  <AccordionItem id="installation" title="Installation">
    <pre><code>npm install nanolux</code></pre>
  </AccordionItem>
  
  <AccordionItem id="usage" title="Basic Usage">
    <pre><code>import { Button } from 'nanolux'</code></pre>
  </AccordionItem>
  
  <AccordionItem id="api" title="API Reference">
    <p>See the complete API documentation for all available props and methods.</p>
  </AccordionItem>
</Accordion>
```

## Best Practices

1. **Use descriptive titles**: Accordion titles should clearly indicate the content within
2. **Limit nesting**: Avoid nesting accordions inside other accordions
3. **Consider default states**: Think about which sections should be open by default
4. **Group related content**: Use accordions to organize related information together
5. **Provide keyboard access**: Ensure all accordion functionality is keyboard accessible

## Accessibility

- **Keyboard Navigation**: Arrow keys navigate between accordion headers
- **ARIA Support**: Proper ARIA attributes for screen readers
- **Focus Management**: Clear focus indicators on accordion headers
- **State Announcement**: Screen readers announce expanded/collapsed states

## Related Components

- [Tabs](./Tabs.md) - Alternative for organizing content into sections
- [Modal](./Modal.md) - For overlaid content
- [Card](./Card.md) - For grouped content display

## API Reference

See [Accordion API](../api/Accordion.md) for detailed prop documentation.
