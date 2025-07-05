# Select API Reference

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

## Example

```tsx
<Select 
  options={[{value: '1', label: 'Option 1'}]} 
  placeholder="Choose option"
  onChange={(value) => console.log(value)}
/>
```

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

## Bundle Information

<!-- AUTO-GENERATED: Bundle size will be updated by metrics script -->
**Bundle Size**: TBD

## Test Coverage

<!-- AUTO-GENERATED: Coverage will be updated by test script -->
**Coverage**: TBD

---

*This documentation is auto-generated from TypeScript interfaces and JSDoc comments.*
*Last updated: 2025-07-04T19:01:45.452Z*
