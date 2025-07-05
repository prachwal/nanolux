# Radio

## Overview

Complete documentation for the Radio component.

## Description

Props dla komponentu Radio /
export interface RadioProps {
  /  Etykieta przycisku radio /
  label: string
  
  /  Wartość przycisku radio /
  value: string
  
  /  Nazwa grupy (wymagane dla radio buttons) /
  name: string
  
  /  Czy przycisk jest zaznaczony /
  checked?: boolean
  
  /  Wartość domyślnie zaznaczona /
  defaultChecked?: boolean
  
  /  Czy przycisk jest wyłączony /
  disabled?: boolean
  
  /  Rozmiar przycisku /
  size?: 'sm' | 'md' | 'lg'
  
  /  Custom CSS class /
  class?: string
  
  /  Callback wywoływany przy zmianie /
  onChange?: JSX.ChangeEventHandler<HTMLInputElement>
  
  /  ID dla accessibility /
  id?: string
}

/   Radio button z pełną kontrolą i accessibility

## Props

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | Yes | Etykieta przycisku radio |
| `value` | `string` | Yes | Wartość przycisku radio |
| `name` | `string` | Yes | Nazwa grupy (wymagane dla radio buttons) |
| `checked` | `boolean` | No | Czy przycisk jest zaznaczony |
| `defaultChecked` | `boolean` | No | Wartość domyślnie zaznaczona |
| `disabled` | `boolean` | No | Czy przycisk jest wyłączony |
| `size` | `'sm' | 'md' | 'lg'` | No | Rozmiar przycisku |
| `class` | `string` | No | Custom CSS class |
| `onChange` | `JSX.ChangeEventHandler<HTMLInputElement>` | No | Callback wywoływany przy zmianie |
| `id` | `string` | No | ID dla accessibility |

## Basic

```tsx
<div class="flex flex-col gap-8">
      <Radio name="basic" value="option1" label="Option 1" />
      <Radio name="basic" value="option2" label="Option 2" />
      <Radio name="basic" value="option3" label="Option 3" />
    </div>
```

---

## WithDefaultSelected

```tsx
<div class="flex flex-col gap-8">
      <Radio name="default" value="small" label="Small" />
      <Radio name="default" value="medium" label="Medium" checked />
      <Radio name="default" value="large" label="Large" />
    </div>
```

---

## AllSizes

```tsx
<div class="flex flex-col gap-12">
      <div>
        <h4 class="mb-8 font-medium">Small</h4>
        <div class="flex flex-col gap-4">
          <Radio name="sizes-sm" value="1" label="Small radio option" size="sm" />
          <Radio name="sizes-sm" value="2" label="Another small option" size="sm" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-8 font-medium">Medium (Default)</h4>
        <div class="flex flex-col gap-6">
          <Radio name="sizes-md" value="1" label="Medium radio option" size="md" />
          <Radio name="sizes-md" value="2" label="Another medium option" size="md" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-8 font-medium">Large</h4>
        <div class="flex flex-col gap-8">
          <Radio name="sizes-lg" value="1" label="Large radio option" size="lg" />
          <Radio name="sizes-lg" value="2" label="Another large option" size="lg" />
        </div>
      </div>
    </div>
```

---

## DisabledStates

```tsx
<div class="flex flex-col gap-8">
      <Radio name="disabled" value="enabled" label="Enabled option" />
      <Radio name="disabled" value="disabled1" label="Disabled option" disabled />
      <Radio name="disabled" value="disabled2" label="Disabled and checked" disabled checked />
    </div>
```

---

## FormExample

```tsx
<form class="max-w-400">
      <fieldset class="border-0 p-0 m-0">
        <legend class="text-lg font-medium mb-12">Choose your subscription plan:</legend>
        
        <div class="flex flex-col gap-8">
          <Radio 
            name="subscription" 
            value="free" 
            label="Free - Basic features only" 
          />
          <Radio 
            name="subscription" 
            value="pro" 
            label="Pro - $9.99/month with advanced features" 
            checked 
          />
          <Radio 
            name="subscription" 
            value="enterprise" 
            label="Enterprise - $29.99/month with full access" 
          />
        </div>
      </fieldset>
      
      <div class="mt-16">
        <button type="submit" class="btn btn-primary">
          Continue with Selected Plan
        </button>
      </div>
    </form>
```

---

## MultipleGroups

```tsx
<div class="flex gap-24">
      <div>
        <h4 class="mb-8 font-medium">Size</h4>
        <div class="flex flex-col gap-6">
          <Radio name="size" value="small" label="Small" />
          <Radio name="size" value="medium" label="Medium" checked />
          <Radio name="size" value="large" label="Large" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-8 font-medium">Color</h4>
        <div class="flex flex-col gap-6">
          <Radio name="color" value="red" label="Red" />
          <Radio name="color" value="blue" label="Blue" checked />
          <Radio name="color" value="green" label="Green" />
        </div>
      </div>
    </div>
```

---

## InteractiveTest

```tsx
<div class="flex flex-col gap-8">
      <Radio name="interactive" value="test1" label="Test Option 1" />
      <Radio name="interactive" value="test2" label="Test Option 2" />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: opcje są widoczne
    const option1 = canvas.getByLabelText('Test Option 1')
    const option2 = canvas.getByLabelText('Test Option 2')
    
    await expect(option1).toBeInTheDocument()
    await expect(option2).toBeInTheDocument()
    
    // Test: opcje mają tę samą nazwę grupy
    await expect(option1).toHaveAttribute('name', 'interactive')
    await expect(option2).toHaveAttribute('name', 'interactive')
    
    // Test: domyślnie żadna opcja nie jest zaznaczona
    await expect(option1).not.toBeChecked()
    await expect(option2).not.toBeChecked(
```

---

*Examples extracted from Storybook stories.*
*Last updated: 2025-07-04T19:01:45.675Z*

## Bundle Information

| Metric | Value |
|--------|-------|
| **Component Size** | 13 KB |
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
*Last updated: 2025-07-04T20:13:30.022Z*
