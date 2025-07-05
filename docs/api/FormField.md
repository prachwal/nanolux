# FormField API Reference

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

## Example

```tsx
<FormField label="Email" helpText="Enter your email address">
  <Input type="email" />
</FormField>

<FormField label="Country" error errorMessage="Please select a country">
  <Select options={countries} />
</FormField>
```

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

## Bundle Information

<!-- AUTO-GENERATED: Bundle size will be updated by metrics script -->
**Bundle Size**: TBD

## Test Coverage

<!-- AUTO-GENERATED: Coverage will be updated by test script -->
**Coverage**: TBD

---

*This documentation is auto-generated from TypeScript interfaces and JSDoc comments.*
*Last updated: 2025-07-04T19:01:45.456Z*
