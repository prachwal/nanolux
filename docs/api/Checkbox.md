# Checkbox API Reference

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

## Example

```tsx
<Checkbox label="Accept terms" onChange={(checked) => console.log(checked)} />
<Checkbox checked={true} label="Pre-checked option" />
<Checkbox indeterminate={true} label="Partially selected" />
```

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

## Bundle Information

<!-- AUTO-GENERATED: Bundle size will be updated by metrics script -->
**Bundle Size**: TBD

## Test Coverage

<!-- AUTO-GENERATED: Coverage will be updated by test script -->
**Coverage**: TBD

---

*This documentation is auto-generated from TypeScript interfaces and JSDoc comments.*
*Last updated: 2025-07-04T19:01:45.457Z*
