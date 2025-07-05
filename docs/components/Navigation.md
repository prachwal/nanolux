# Navigation

## Overview

Complete documentation for the Navigation component.

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

## Default

```tsx
// Example code not available
```

---

## Variants

```tsx
<div class="flex gap-8">
      <Navigation variant="default">Default</Navigation>
      <Navigation variant="primary">Primary</Navigation>
      <Navigation variant="secondary">Secondary</Navigation>
    </div>
```

---

## Sizes

```tsx
<div class="flex gap-8 items-center">
      <Navigation variant="primary" size="sm">Small</Navigation>
      <Navigation variant="primary" size="md">Medium</Navigation>
      <Navigation variant="primary" size="lg">Large</Navigation>
    </div>
```

---

## States

```tsx
<div class="flex gap-8">
      <Navigation variant="primary">Enabled</Navigation>
      <Navigation variant="primary" disabled>Disabled</Navigation>
    </div>
```

---

*Examples extracted from Storybook stories.*
*Last updated: 2025-07-04T19:01:45.677Z*

## InteractiveTest

```tsx
// Example code not available
```

---

## Bundle Information

| Metric | Value |
|--------|-------|
| **Component Size** | 14.7 KB |
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
*Last updated: 2025-07-04T20:13:30.023Z*
