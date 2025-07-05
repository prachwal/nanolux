# Checkbox

## Overview

Complete documentation for the Checkbox component.

## Description

Props dla komponentu Checkbox /
export interface CheckboxProps {
  /  Czy checkbox jest zaznaczony /
  checked?: boolean
  
  /  Stan indeterminate (częściowo zaznaczony) /
  indeterminate?: boolean
  
  /  Etykieta checkbox /
  label?: string
  
  /  Rozmiar checkbox /
  size?: 'sm' | 'md' | 'lg'
  
  /  Czy checkbox jest disabled /
  disabled?: boolean
  
  /  Czy pokazać błąd /
  error?: boolean
  
  /  Callback przy zmianie stanu /
  onChange?: (checked: boolean) => void
  
  /  ID dla accessibility /
  id?: string
  
  /  Name dla formularzy /
  name?: string
  
  /  Value dla formularzy /
  value?: string
  
  /  Custom aria-label /
  'aria-label'?: string
  
  /  Custom aria-describedby /
  'aria-describedby'?: string
}

/   Checkbox - komponent wyboru opcji true/false/indeterminate

## Props

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `checked` | `boolean` | No | Czy checkbox jest zaznaczony |
| `indeterminate` | `boolean` | No | Stan indeterminate (częściowo zaznaczony) |
| `label` | `string` | No | Etykieta checkbox |
| `size` | `'sm' | 'md' | 'lg'` | No | Rozmiar checkbox |
| `disabled` | `boolean` | No | Czy checkbox jest disabled |
| `error` | `boolean` | No | Czy pokazać błąd |
| `onChange` | `(checked: boolean) => void` | No | Callback przy zmianie stanu |
| `id` | `string` | No | ID dla accessibility |
| `name` | `string` | No | Name dla formularzy |
| `value` | `string` | No | Value dla formularzy |

## Default

```tsx
// Example code not available
```

---

## Checked

```tsx
// Example code not available
```

---

## Indeterminate

```tsx
// Example code not available
```

---

## AllSizes

```tsx
<div class="flex flex-col gap-16">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox (default)" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
```

---

## States

```tsx
<div class="flex flex-col gap-16">
      <Checkbox label="Normal checkbox" />
      <Checkbox label="Checked checkbox" checked={true} />
      <Checkbox label="Indeterminate checkbox" indeterminate={true} />
      <Checkbox label="Error checkbox" error={true} />
      <Checkbox label="Disabled checkbox" disabled={true} />
      <Checkbox label="Disabled checked" disabled={true} checked={true} />
    </div>
```

---

## WithoutLabel

```tsx
<div class="flex gap-16 items-center">
      <Checkbox aria-label="Checkbox without visible label" />
      <Checkbox checked={true} aria-label="Checked checkbox without label" />
      <Checkbox indeterminate={true} aria-label="Indeterminate checkbox without label" />
    </div>
```

---

## FormExample

```tsx
<form class="flex flex-col gap-12">
      <div>
        <h3 class="mb-8 font-medium">Select your preferences:</h3>
        <div class="flex flex-col gap-8">
          <Checkbox name="notifications" value="email" label="Email notifications" />
          <Checkbox name="notifications" value="sms" label="SMS notifications" />
          <Checkbox name="notifications" value="push" label="Push notifications" checked={true} />
        </div>
      </div>
      
      <div class="mt-16">
        <Checkbox 
          name="terms" 
          value="accepted" 
          label="I agree to the Terms of Service and Privacy Policy"
          error={false}
        />
      </div>
    </form>
```

---

## CustomStyling

```tsx
<div class="flex flex-col gap-16">
      <div style="--checkbox-bg-checked: #10b981; --checkbox-border-checked: #10b981;">
        <Checkbox label="Green checkbox" checked={true} />
      </div>
      <div style="--checkbox-bg-checked: #f59e0b; --checkbox-border-checked: #f59e0b;">
        <Checkbox label="Orange checkbox" checked={true} />
      </div>
      <div style="--checkbox-size: 24px; --checkbox-check-size: 16px;">
        <Checkbox label="Extra large checkbox" checked={true} />
      </div>
    </div>
```

---

*Examples extracted from Storybook stories.*
*Last updated: 2025-07-04T19:01:45.682Z*

## InteractiveTest

```tsx
// Example code not available
```

---

## KeyboardNavigation

```tsx
// Example code not available
```

---

## DisabledState

```tsx
// Example code not available
```

---

## Bundle Information

| Metric | Value |
|--------|-------|
| **Component Size** | 15.7 KB |
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
*Last updated: 2025-07-04T20:13:30.027Z*
