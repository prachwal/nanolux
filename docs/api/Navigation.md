# Navigation API Reference

## Description

Interfejs dla pojedynczego linku w nawigacji /
export interface NavigationItem {
  /  Etykieta linku /
  label: string
  /  URL lub ścieżka /
  href?: string
  /  Czy link jest aktywny /
  active?: boolean
  /  Czy link jest wyłączony /
  disabled?: boolean
  /  Click handler dla SPA routing /
  onClick?: (event: Event) => void
}

/   Props dla komponentu Navigation /
export interface NavigationProps {
  /  Lista elementów nawigacji /
  items?: NavigationItem[]
  
  /  Logo/brand element /
  brand?: ComponentChildren
  
  /  URL dla brand/logo /
  brandHref?: string
  
  /  Click handler dla brand /
  brandOnClick?: (event: Event) => void
  
  /  Dodatkowa zawartość po prawej stronie /
  actions?: ComponentChildren
  
  /  Wariant nawigacji /
  variant?: 'default' | 'dark' | 'transparent'
  
  /  Rozmiar nawigacji /
  size?: 'sm' | 'md' | 'lg'
  
  /  Czy nawigacja jest sticky /
  sticky?: boolean
  
  /  Custom CSS class /
  class?: string
  
  /  Dodatkowa zawartość nawigacji /
  children?: ComponentChildren
}

/   Komponent Navigation/Header z responsive design i accessibility

## Example

```tsx
<Navigation 
  brand={<Logo />}
  items={[
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]}
  actions={<Button>Sign In</Button>}
/>
```

## Props

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `items` | `NavigationItem[]` | No | Lista elementów nawigacji |
| `brand` | `ComponentChildren` | No | Logo/brand element |
| `brandHref` | `string` | No | URL dla brand/logo |
| `brandOnClick` | `(event: Event) => void` | No | Click handler dla brand |
| `actions` | `ComponentChildren` | No | Dodatkowa zawartość po prawej stronie |
| `variant` | `'default' | 'dark' | 'transparent'` | No | Wariant nawigacji |
| `size` | `'sm' | 'md' | 'lg'` | No | Rozmiar nawigacji |
| `sticky` | `boolean` | No | Czy nawigacja jest sticky |
| `class` | `string` | No | Custom CSS class |
| `children` | `ComponentChildren` | No | Dodatkowa zawartość nawigacji |

## Bundle Information

<!-- AUTO-GENERATED: Bundle size will be updated by metrics script -->
**Bundle Size**: TBD

## Test Coverage

<!-- AUTO-GENERATED: Coverage will be updated by test script -->
**Coverage**: TBD

---

*This documentation is auto-generated from TypeScript interfaces and JSDoc comments.*
*Last updated: 2025-07-04T19:01:45.453Z*
