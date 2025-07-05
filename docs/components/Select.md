# Select

## Overview

Complete documentation for the Select component.

## Description

Opcja dla Select /
export interface SelectOption {
  /  Wartość opcji /
  value: string
  /  Etykieta opcji /
  label: string
  /  Czy opcja jest disabled /
  disabled?: boolean
}

/   Props dla komponentu Select /
export interface SelectProps {
  /  Lista opcji do wyboru /
  options: SelectOption[]
  
  /  Aktualnie wybrana wartość /
  value?: string
  
  /  Placeholder gdy nic nie jest wybrane /
  placeholder?: string
  
  /  Rozmiar select /
  size?: 'sm' | 'md' | 'lg'
  
  /  Czy select jest disabled /
  disabled?: boolean
  
  /  Czy pokazać błąd /
  error?: boolean
  
  /  Callback przy zmianie wartości /
  onChange?: (value: string) => void
  
  /  Custom aria-label /
  'aria-label'?: string
}

/   Select/Dropdown - komponent wyboru z listy opcji

## Props

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `options` | `SelectOption[]` | Yes | Lista opcji do wyboru |
| `value` | `string` | No | Aktualnie wybrana wartość |
| `placeholder` | `string` | No | Placeholder gdy nic nie jest wybrane |
| `size` | `'sm' | 'md' | 'lg'` | No | Rozmiar select |
| `disabled` | `boolean` | No | Czy select jest disabled |
| `error` | `boolean` | No | Czy pokazać błąd |
| `onChange` | `(value: string) => void` | No | Callback przy zmianie wartości |

## Default

```tsx
// Example code not available
```

---

## WithSelectedValue

```tsx
// Example code not available
```

---

## AllSizes

```tsx
<div class="flex flex-col gap-16">
      <div>
        <label class="block mb-4 text-sm font-medium">Small Select</label>
        <Select 
          options={sampleOptions} 
          size="sm" 
          placeholder="Small select..."
        />
      </div>
      <div>
        <label class="block mb-4 text-sm font-medium">Medium Select (default)</label>
        <Select 
          options={sampleOptions} 
          size="md" 
          placeholder="Medium select..."
        />
      </div>
      <div>
        <label class="block mb-4 text-sm font-medium">Large Select</label>
        <Select 
          options={sampleOptions} 
          size="lg" 
          placeholder="Large select..."
        />
      </div>
    </div>
```

---

## States

```tsx
<div class="flex flex-col gap-16">
      <div>
        <label class="block mb-4 text-sm font-medium">Normal State</label>
        <Select 
          options={sampleOptions} 
          placeholder="Normal select..."
        />
      </div>
      <div>
        <label class="block mb-4 text-sm font-medium">Error State</label>
        <Select 
          options={sampleOptions} 
          error={true}
          placeholder="Error select..."
        />
      </div>
      <div>
        <label class="block mb-4 text-sm font-medium">Disabled State</label>
        <Select 
          options={sampleOptions} 
          disabled={true}
          placeholder="Disabled select..."
        />
      </div>
    </div>
```

---

## WithDisabledOptions

```tsx
// Example code not available
```

---

## LongOptions

```tsx
// Example code not available
```

---

## CustomWidth

```tsx
<div class="flex flex-col gap-16">
      <div style="width: 150px;">
        <label class="block mb-4 text-sm font-medium">Narrow (150px)</label>
        <Select 
          options={sampleOptions} 
          placeholder="Narrow..."
        />
      </div>
      <div style="width: 400px;">
        <label class="block mb-4 text-sm font-medium">Wide (400px)</label>
        <Select 
          options={sampleOptions} 
          placeholder="Wide select..."
        />
      </div>
    </div>
```

---

*Examples extracted from Storybook stories.*
*Last updated: 2025-07-04T19:01:45.674Z*

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

## Bundle Information

| Metric | Value |
|--------|-------|
| **Component Size** | 17.6 KB |
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
*Last updated: 2025-07-04T20:13:30.020Z*
