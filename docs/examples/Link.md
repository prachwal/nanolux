# Link Examples

*From Storybook: Components/Link*

## Basic

```tsx
<div class="flex flex-col gap-8">
      <Link href="/">Home</Link>
      <Link href="/about">About Us</Link>
      <Link href="/contact">Contact</Link>
    </div>
```

---

## Variants

```tsx
<div class="flex flex-col gap-8">
      <Link href="/default" variant="default">Default Link</Link>
      <Link href="/primary" variant="primary">Primary Link</Link>
      <Link href="/secondary" variant="secondary">Secondary Link</Link>
      <Link href="/muted" variant="muted">Muted Link</Link>
      <Link href="/danger" variant="danger">Danger Link</Link>
    </div>
```

---

## Sizes

```tsx
<div class="flex flex-col gap-8">
      <Link href="/small" size="sm">Small Link</Link>
      <Link href="/medium" size="md">Medium Link (Default
```

---

## UnderlineStyles

```tsx
<div class="flex flex-col gap-8">
      <Link href="/none" underline="none">No Underline</Link>
      <Link href="/hover" underline="hover">Underline on Hover (Default
```

---

## ExternalLinks

```tsx
<div class="flex flex-col gap-8">
      <Link href="https://github.com">GitHub (Auto-detected External
```

---

## States

```tsx
<div class="flex flex-col gap-8">
      <Link href="/normal">Normal Link</Link>
      <Link href="/disabled" disabled>Disabled Link</Link>
      <Link href="https://example.com" disabled>Disabled External Link</Link>
    </div>
```

---

## InText

```tsx
// Example code not available
```

---

## NavigationExample

```tsx
<nav class="flex gap-16 p-16 bg-gray-50 rounded">
      <Link href="/" variant="primary" size="lg">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="https://github.com/company" external variant="muted" size="sm">
        GitHub
      </Link>
    </nav>
```

---

## FooterExample

```tsx
<footer class="bg-gray-900 text-white p-16 rounded">
      <div class="flex gap-24">
        <div>
          <h4 class="text-white font-medium mb-8">Company</h4>
          <div class="flex flex-col gap-4">
            <Link href="/about" variant="muted" size="sm">About Us</Link>
            <Link href="/careers" variant="muted" size="sm">Careers</Link>
            <Link href="/contact" variant="muted" size="sm">Contact</Link>
          </div>
        </div>
        <div>
          <h4 class="text-white font-medium mb-8">Resources</h4>
          <div class="flex flex-col gap-4">
            <Link href="/docs" variant="muted" size="sm">Documentation</Link>
            <Link href="https://github.com" external variant="muted" size="sm">GitHub</Link>
            <Link href="/support" variant="muted" size="sm">Support</Link>
          </div>
        </div>
      </div>
    </footer>
```

---

## InteractiveTest

```tsx
<div class="flex gap-16">
      <Link href="/test1" variant="primary">Test Link 1</Link>
      <Link href="https://example.com">External Test</Link>
      <Link href="/test3" disabled>Disabled Test</Link>
    </div>
```

---

## Basic

```tsx
<div class="flex flex-col gap-8">
      <Link href="/">Home</Link>
      <Link href="/about">About Us</Link>
      <Link href="/contact">Contact</Link>
    </div>
```

---

## Variants

```tsx
<div class="flex flex-col gap-8">
      <Link href="/default" variant="default">Default Link</Link>
      <Link href="/primary" variant="primary">Primary Link</Link>
      <Link href="/secondary" variant="secondary">Secondary Link</Link>
      <Link href="/muted" variant="muted">Muted Link</Link>
      <Link href="/danger" variant="danger">Danger Link</Link>
    </div>
```

---

## Sizes

```tsx
<div class="flex flex-col gap-8">
      <Link href="/small" size="sm">Small Link</Link>
      <Link href="/medium" size="md">Medium Link (Default)</Link>
      <Link href="/large" size="lg">Large Link</Link>
    </div>
```

---

## UnderlineStyles

```tsx
<div class="flex flex-col gap-8">
      <Link href="/none" underline="none">No Underline</Link>
      <Link href="/hover" underline="hover">Underline on Hover (Default)</Link>
      <Link href="/always" underline="always">Always Underlined</Link>
    </div>
```

---

## ExternalLinks

```tsx
<div class="flex flex-col gap-8">
      <Link href="https://github.com">GitHub (Auto-detected External)</Link>
      <Link href="/internal" external>Internal Link Marked as External</Link>
      <Link href="https://vitejs.dev" variant="primary">Vite Documentation</Link>
      <Link href="https://preactjs.com" variant="secondary" size="lg">
        Preact Documentation
      </Link>
    </div>
```

---

## States

```tsx
<div class="flex flex-col gap-8">
      <Link href="/normal">Normal Link</Link>
      <Link href="/disabled" disabled>Disabled Link</Link>
      <Link href="https://example.com" disabled>Disabled External Link</Link>
    </div>
```

---

## InText

```tsx
<div class="max-w-400">
      <p class="text-base leading-relaxed">
        This is a paragraph with{' '}
        <Link href="/inline" variant="primary">an inline link</Link>{' '}
        and also{' '}
        <Link href="https://example.com" variant="secondary">an external link</Link>{' '}
        within the text. Links should flow naturally with the text content
        while maintaining their visual distinction.
      </p>
    </div>
```

---

## NavigationExample

```tsx
<nav class="flex gap-16 p-16 bg-gray-50 rounded">
      <Link href="/" variant="primary" size="lg">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="https://github.com/company" external variant="muted" size="sm">
        GitHub
      </Link>
    </nav>
```

---

## FooterExample

```tsx
<footer class="bg-gray-900 text-white p-16 rounded">
      <div class="flex gap-24">
        <div>
          <h4 class="text-white font-medium mb-8">Company</h4>
          <div class="flex flex-col gap-4">
            <Link href="/about" variant="muted" size="sm">About Us</Link>
            <Link href="/careers" variant="muted" size="sm">Careers</Link>
            <Link href="/contact" variant="muted" size="sm">Contact</Link>
          </div>
        </div>
        <div>
          <h4 class="text-white font-medium mb-8">Resources</h4>
          <div class="flex flex-col gap-4">
            <Link href="/docs" variant="muted" size="sm">Documentation</Link>
            <Link href="https://github.com" external variant="muted" size="sm">GitHub</Link>
            <Link href="/support" variant="muted" size="sm">Support</Link>
          </div>
        </div>
      </div>
    </footer>
```

---

## InteractiveTest

```tsx
<div class="flex gap-16">
      <Link href="/test1" variant="primary">Test Link 1</Link>
      <Link href="https://example.com">External Test</Link>
      <Link href="/test3" disabled>Disabled Test</Link>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: podstawowe linki są widoczne
    const link1 = canvas.getByText('Test Link 1')
    const externalLink = canvas.getByText('External Test')
    const disabledLink = canvas.getByText('Disabled Test')
    
    await expect(link1).toBeInTheDocument()
    await expect(externalLink).toBeInTheDocument()
    await expect(disabledLink).toBeInTheDocument()
    
    // Test: external link ma odpowiednie atrybuty
    const externalLinkElement = externalLink.closest('a')
    await expect(externalLinkElement).toHaveAttribute('target', '_blank')
    await expect(externalLinkElement).toHaveAttribute('rel', 'noopener noreferrer')
    
    // Test: disabled link nie ma href
    const disabledLinkElement = disabledLink.closest('a')
    await expect(disabledLinkElement).not.toHaveAttribute('href')
    await expect(disabledLinkElement).toHaveAttribute('aria-disabled', 'true'
```

---

*Examples extracted from Storybook stories.*
*Last updated: 2025-07-04T19:01:45.680Z*
