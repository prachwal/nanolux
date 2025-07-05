# FormField

## Overview

Complete documentation for the FormField component.

## Description

Props dla komponentu FormField /
export interface FormFieldProps {
  /  Etykieta pola /
  label?: string
  
  /  Tekst pomocy pod polem /
  helpText?: string
  
  /  Komunikat o błędzie /
  errorMessage?: string
  
  /  Czy pole jest wymagane /
  required?: boolean
  
  /  Czy pokazać stan błędu /
  error?: boolean
  
  /  Rozmiar pola /
  size?: 'sm' | 'md' | 'lg'
  
  /  ID dla accessibility (automatycznie przekazywane do children) /
  id?: string
  
  /  Zawartość pola (Input, Select, Checkbox, etc.) /
  children: ComponentChildren
  
  /  Custom CSS class /
  class?: string
}

/   FormField - wrapper dla pól formularza z etykietą, pomocą i błędami

## Props

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | No | Etykieta pola |
| `helpText` | `string` | No | Tekst pomocy pod polem |
| `errorMessage` | `string` | No | Komunikat o błędzie |
| `required` | `boolean` | No | Czy pole jest wymagane |
| `error` | `boolean` | No | Czy pokazać stan błędu |
| `size` | `'sm' | 'md' | 'lg'` | No | Rozmiar pola |
| `id` | `string` | No | ID dla accessibility (automatycznie przekazywane do children) |
| `children` | `ComponentChildren` | Yes | Zawartość pola (Input, Select, Checkbox, etc.) |
| `class` | `string` | No | Custom CSS class |

## BasicInput

```tsx
<FormField label="Email Address" helpText="Enter your email address">
      <Input type="email" placeholder="user@example.com" />
    </FormField>
```

---

## RequiredField

```tsx
<FormField label="Password" required helpText="Minimum 8 characters">
      <Input type="password" placeholder="Enter password" />
    </FormField>
```

---

## WithError

```tsx
<FormField 
      label="Username" 
      error 
      errorMessage="Username is required"
    >
      <Input value="" placeholder="Enter username" />
    </FormField>
```

---

## WithSelect

```tsx
<FormField label="Favorite Fruit" helpText="Choose your favorite">
      <Select options={sampleOptions} placeholder="Select fruit..." />
    </FormField>
```

---

## WithCheckbox

```tsx
<FormField helpText="Check this box to receive newsletters">
      <Checkbox label="Subscribe to newsletter" />
    </FormField>
```

---

## AllSizes

```tsx
<div class="flex flex-col gap-16">
      <FormField label="Small Field" size="sm" helpText="Small size field">
        <Input placeholder="Small input" />
      </FormField>
      <FormField label="Medium Field" size="md" helpText="Medium size field">
        <Input placeholder="Medium input" />
      </FormField>
      <FormField label="Large Field" size="lg" helpText="Large size field">
        <Input placeholder="Large input" />
      </FormField>
    </div>
```

---

## FormExample

```tsx
<form class="max-w-400 mx-auto">
      <FormField label="First Name" required>
        <Input placeholder="Enter first name" />
      </FormField>
      
      <FormField label="Email" required helpText="We'll never share your email">
        <Input type="email" placeholder="user@example.com" />
      </FormField>
      
      <FormField label="Country" required>
        <Select 
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' }
          ]} 
          placeholder="Select country..." 
        />
      </FormField>
      
      <FormField helpText="Check to receive updates">
        <Checkbox label="Subscribe to newsletter" />
      </FormField>
    </form>
```

---

## InteractiveTest

```tsx
<FormField label="Test Field" helpText="This is a help text">
      <Input placeholder="Test input" />
    </FormField>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: label jest widoczny
    const label = canvas.getByText('Test Field')
    await expect(label).toBeInTheDocument()
    
    // Test: help text jest widoczny
    const helpText = canvas.getByText('This is a help text')
    await expect(helpText).toBeInTheDocument()
    
    // Test: input jest dostępny
    const input = canvas.getByPlaceholderText('Test input')
    await expect(input).toBeInTheDocument()
    
    // Test: label jest powiązany z inputem
    await expect(label).toHaveAttribute('for', input.id
```

---

*Examples extracted from Storybook stories.*
*Last updated: 2025-07-04T19:01:45.681Z*

## Bundle Information

| Metric | Value |
|--------|-------|
| **Component Size** | 11.5 KB |
| **Performance** | ⚠️ Large |
| **Last Analyzed** | 7/4/2025 |

## Test Coverage

| Type | Coverage |
|------|----------|
| **Unit Tests** | TBD |
| **Integration** | TBD |
| **Visual Tests** | Available in Storybook |

## Implementation Notes

<!-- MANUAL SECTION: Add implementation details, best practices, etc. -->
*This section is for manual documentation of implementation details.*

## Best Practices

<!-- MANUAL SECTION: Add usage best practices -->
*Add best practices and usage guidelines here.*

## Related Components

<!-- MANUAL SECTION: Link to related components -->
*List related components and how they work together.*

---

*This documentation is automatically updated from multiple sources.*
*Last updated: 2025-07-04T20:13:30.025Z*
