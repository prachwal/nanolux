# Link API Reference

## Description

Props dla komponentu Link /
export interface LinkProps extends Omit<JSX.HTMLAttributes<HTMLAnchorElement>, 'class'> {
  /  Adres URL /
  href: string
  
  /  Zawartość linku /
  children: ComponentChildren
  
  /  Wariant stylu linku /
  variant?: 'default' | 'primary' | 'secondary' | 'muted' | 'danger'
  
  /  Rozmiar linku /
  size?: 'sm' | 'md' | 'lg'
  
  /  Czy link ma podkreślenie /
  underline?: 'none' | 'hover' | 'always'
  
  /  Czy otwierać w nowej karcie /
  external?: boolean
  
  /  Czy link jest wyłączony /
  disabled?: boolean
  
  /  Custom CSS class /
  class?: string
  
  /  Click handler (dla SPA routing) /
  onClick?: JSX.MouseEventHandler<HTMLAnchorElement>
}

/   Uniwersalny link z pełną parametryzacją i accessibility

## Example

```tsx
<Link href="/about">About Us</Link>
<Link href="https://example.com" external>External Link</Link>
<Link href="/contact" variant="primary" size="lg">Contact</Link>
```

## Bundle Information

<!-- AUTO-GENERATED: Bundle size will be updated by metrics script -->
**Bundle Size**: TBD

## Test Coverage

<!-- AUTO-GENERATED: Coverage will be updated by test script -->
**Coverage**: TBD

---

*This documentation is auto-generated from TypeScript interfaces and JSDoc comments.*
*Last updated: 2025-07-04T19:01:45.454Z*
