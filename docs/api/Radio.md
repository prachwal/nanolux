# Radio API Reference

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

## Example

```tsx
<Radio name="gender" value="male" label="Male" />
<Radio name="gender" value="female" label="Female" checked />
<Radio name="size" value="lg" label="Large" size="lg" />
```

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

## Bundle Information

<!-- AUTO-GENERATED: Bundle size will be updated by metrics script -->
**Bundle Size**: TBD

## Test Coverage

<!-- AUTO-GENERATED: Coverage will be updated by test script -->
**Coverage**: TBD

---

*This documentation is auto-generated from TypeScript interfaces and JSDoc comments.*
*Last updated: 2025-07-04T19:01:45.453Z*
