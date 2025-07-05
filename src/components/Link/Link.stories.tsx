import Link from './Link'
import { expect } from '@storybook/test'
import { within } from '@storybook/testing-library'

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: 'Uniwersalny link z pełną parametryzacją, zewnętrznymi URL i accessibility'
      }
    }
  }
}

export const Basic = {
  render: () => (
    <div class="flex flex-col gap-8">
      <Link href="/">Home</Link>
      <Link href="/about">About Us</Link>
      <Link href="/contact">Contact</Link>
    </div>
  )
}

export const Variants = {
  render: () => (
    <div class="flex flex-col gap-8">
      <Link href="/default" variant="default">Default Link</Link>
      <Link href="/primary" variant="primary">Primary Link</Link>
      <Link href="/secondary" variant="secondary">Secondary Link</Link>
      <Link href="/muted" variant="muted">Muted Link</Link>
      <Link href="/danger" variant="danger">Danger Link</Link>
    </div>
  )
}

export const Sizes = {
  render: () => (
    <div class="flex flex-col gap-8">
      <Link href="/small" size="sm">Small Link</Link>
      <Link href="/medium" size="md">Medium Link (Default)</Link>
      <Link href="/large" size="lg">Large Link</Link>
    </div>
  )
}

export const UnderlineStyles = {
  render: () => (
    <div class="flex flex-col gap-8">
      <Link href="/none" underline="none">No Underline</Link>
      <Link href="/hover" underline="hover">Underline on Hover (Default)</Link>
      <Link href="/always" underline="always">Always Underlined</Link>
    </div>
  )
}

export const ExternalLinks = {
  render: () => (
    <div class="flex flex-col gap-8">
      <Link href="https://github.com">GitHub (Auto-detected External)</Link>
      <Link href="/internal" external>Internal Link Marked as External</Link>
      <Link href="https://vitejs.dev" variant="primary">Vite Documentation</Link>
      <Link href="https://preactjs.com" variant="secondary" size="lg">
        Preact Documentation
      </Link>
    </div>
  )
}

export const States = {
  render: () => (
    <div class="flex flex-col gap-8">
      <Link href="/normal">Normal Link</Link>
      <Link href="/disabled" disabled>Disabled Link</Link>
      <Link href="https://example.com" disabled>Disabled External Link</Link>
    </div>
  )
}

export const InText = {
  render: () => (
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
  )
}

export const NavigationExample = {
  render: () => (
    <nav class="flex gap-16 p-16 bg-gray-50 rounded">
      <Link href="/" variant="primary" size="lg">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="https://github.com/company" external variant="muted" size="sm">
        GitHub
      </Link>
    </nav>
  )
}

export const FooterExample = {
  render: () => (
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
  )
}

export const InteractiveTest = {
  render: () => (
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
    await expect(disabledLinkElement).toHaveAttribute('aria-disabled', 'true')
  }
}
