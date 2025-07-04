import { render } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import AppHeader from './AppHeader'
import { testBundleSize } from '../../test/utils'

describe('AppHeader Component', () => {
  test('renders with default title and description', () => {
    const { getByText } = render(<AppHeader />)
    
    expect(getByText('NanoLux + Preact')).toBeInTheDocument()
    expect(getByText('Ultra-minimalistyczny framework komponentów')).toBeInTheDocument()
  })

  test('renders with custom title and description', () => {
    const { getByText } = render(
      <AppHeader 
        title="Custom App" 
        description="Custom description"
      />
    )
    
    expect(getByText('Custom App')).toBeInTheDocument()
    expect(getByText('Custom description')).toBeInTheDocument()
  })

  test('applies base classes correctly', () => {
    const { container } = render(<AppHeader />)
    const header = container.querySelector('header')
    
    expect(header).toHaveClass('app-header')
  })

  test('applies custom className correctly', () => {
    const { container } = render(<AppHeader className="custom-header" />)
    const header = container.querySelector('header')
    
    expect(header).toHaveClass('app-header', 'custom-header')
  })

  test('renders logos section', () => {
    const { container } = render(<AppHeader />)
    const logosSection = container.querySelector('.app-header-logos')
    
    expect(logosSection).toBeInTheDocument()
  })

  test('renders Vite logo with correct properties', () => {
    const { container } = render(<AppHeader />)
    const viteLink = container.querySelector('a[href="https://vite.dev"]')
    const viteImg = container.querySelector('img[alt="Vite logo"]')
    
    expect(viteLink).toBeInTheDocument()
    expect(viteLink).toHaveAttribute('target', '_blank')
    expect(viteImg).toBeInTheDocument()
    expect(viteImg).toHaveAttribute('src', '/vite.svg')
  })

  test('renders Preact logo with correct properties', () => {
    const { container } = render(<AppHeader />)
    const preactLink = container.querySelector('a[href="https://preactjs.com"]')
    const preactImg = container.querySelector('img[alt="Preact logo"]')
    
    expect(preactLink).toBeInTheDocument()
    expect(preactLink).toHaveAttribute('target', '_blank')
    expect(preactImg).toBeInTheDocument()
    expect(preactImg).toHaveAttribute('src', '/preact.svg')
  })

  test('renders title with correct class', () => {
    const { container } = render(<AppHeader title="Test Title" />)
    const title = container.querySelector('.app-header-title')
    
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Test Title')
    expect(title?.tagName).toBe('H1')
  })

  test('renders description with correct class', () => {
    const { container } = render(<AppHeader description="Test Description" />)
    const description = container.querySelector('.app-header-description')
    
    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent('Test Description')
    expect(description?.tagName).toBe('P')
  })

  test('has semantic HTML structure', () => {
    const { container } = render(<AppHeader />)
    const header = container.querySelector('header')
    
    expect(header).toBeInTheDocument()
    expect(header?.tagName).toBe('HEADER')
  })

  test('forwards additional props correctly', () => {
    const { container } = render(
      <AppHeader data-testid="test-header" role="banner" />
    )
    const header = container.querySelector('header')
    
    expect(header).toHaveAttribute('data-testid', 'test-header')
    expect(header).toHaveAttribute('role', 'banner')
  })

  test('trims className correctly when no custom class provided', () => {
    const { container } = render(<AppHeader />)
    const header = container.querySelector('header')
    
    expect(header?.className).toBe('app-header')
  })

  test('handles empty title gracefully', () => {
    const { container } = render(<AppHeader title="" />)
    const title = container.querySelector('.app-header-title')
    
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('')
  })

  test('handles empty description gracefully', () => {
    const { container } = render(<AppHeader description="" />)
    const description = container.querySelector('.app-header-description')
    
    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent('')
  })

  // Performance test according to NanoLux philosophy
  test('bundle size is within limits', async () => {
    await testBundleSize('AppHeader', 768) // max 768 bytes
  })

  // Integration test - ensures Logo components are working
  test('integrates with Logo components correctly', () => {
    const { container } = render(<AppHeader />)
    
    // Check for logo classes
    const viteLogoImg = container.querySelector('img[alt="Vite logo"]')
    const preactLogoImg = container.querySelector('img[alt="Preact logo"]')
    
    expect(viteLogoImg).toHaveClass('logo')
    expect(preactLogoImg).toHaveClass('logo')
  })

  // Accessibility test
  test('has proper accessibility structure', () => {
    const { container } = render(<AppHeader />)
    const header = container.querySelector('header')
    const title = container.querySelector('h1')
    
    expect(header).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    
    // Logo links should be accessible
    const logoLinks = container.querySelectorAll('a[target="_blank"]')
    expect(logoLinks).toHaveLength(2)
  })

  // Atomic CSS test - ensures correct CSS class composition
  test('follows atomic CSS principles', () => {
    const { container } = render(<AppHeader className="text-center" />)
    const header = container.querySelector('header')
    
    // Checks atomic CSS class composition
    expect(header?.className).toMatch(/app-header/)
    expect(header?.className).toMatch(/text-center/)
  })

  // Component structure test
  test('maintains consistent component structure', () => {
    const { container } = render(<AppHeader />)
    
    // Check for required elements in order
    const header = container.querySelector('header')
    const logosSection = header?.querySelector('.app-header-logos')
    const title = header?.querySelector('.app-header-title')
    const description = header?.querySelector('.app-header-description')
    
    expect(header).toBeInTheDocument()
    expect(logosSection).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    
    // Check order
    const children = Array.from(header?.children || [])
    expect(children[0]).toHaveClass('app-header-logos')
    expect(children[1]).toHaveClass('app-header-title')
    expect(children[2]).toHaveClass('app-header-description')
  })
})
