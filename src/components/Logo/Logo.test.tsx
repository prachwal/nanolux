import { render } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import Logo from './Logo'
import { testBundleSize } from '../../test/utils'

describe('Logo Component', () => {
  const defaultProps = {
    src: '/test-logo.svg',
    alt: 'Test Logo'
  }

  test('renders image with basic props', () => {
    const { getByRole } = render(<Logo {...defaultProps} />)
    const image = getByRole('img')
    
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-logo.svg')
    expect(image).toHaveAttribute('alt', 'Test Logo')
  })

  test('applies base classes correctly', () => {
    const { getByRole } = render(<Logo {...defaultProps} />)
    const image = getByRole('img')
    
    expect(image).toHaveClass('logo', 'logo-md')
  })

  test('applies size classes correctly', () => {
    const { getByRole, unmount } = render(<Logo {...defaultProps} size="sm" />)
    const smallLogo = getByRole('img')
    expect(smallLogo).toHaveClass('logo', 'logo-sm')
    unmount()
    
    const { getByRole: getLarge } = render(<Logo {...defaultProps} size="lg" />)
    const largeLogo = getLarge('img')
    expect(largeLogo).toHaveClass('logo', 'logo-lg')
  })

  test('applies variant classes correctly', () => {
    const { getByRole, unmount } = render(<Logo {...defaultProps} variant="vite" />)
    const viteLogo = getByRole('img')
    expect(viteLogo).toHaveClass('logo', 'logo-md', 'logo-vite')
    unmount()
    
    const { getByRole: getPreact } = render(<Logo {...defaultProps} variant="preact" />)
    const preactLogo = getPreact('img')
    expect(preactLogo).toHaveClass('logo', 'logo-md', 'logo-preact')
  })

  test('applies custom className correctly', () => {
    const { getByRole } = render(<Logo {...defaultProps} className="custom-logo" />)
    const image = getByRole('img')
    
    expect(image).toHaveClass('logo', 'logo-md', 'custom-logo')
  })

  test('renders without variant correctly', () => {
    const { getByRole } = render(<Logo {...defaultProps} />)
    const image = getByRole('img')
    
    expect(image).toHaveClass('logo', 'logo-md')
    expect(image).not.toHaveClass('logo-vite')
    expect(image).not.toHaveClass('logo-preact')
  })

  test('renders with link when href provided', () => {
    const { getByRole } = render(
      <Logo {...defaultProps} href="https://example.com" />
    )
    
    const link = getByRole('link')
    const image = getByRole('img')
    
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveClass('logo-link')
    expect(link).toContainElement(image)
  })

  test('respects custom target attribute', () => {
    const { getByRole } = render(
      <Logo {...defaultProps} href="https://example.com" target="_self" />
    )
    
    const link = getByRole('link')
    expect(link).toHaveAttribute('target', '_self')
  })

  test('renders without link when href not provided', () => {
    const { queryByRole, getByRole } = render(<Logo {...defaultProps} />)
    
    const link = queryByRole('link')
    const image = getByRole('img')
    
    expect(link).not.toBeInTheDocument()
    expect(image).toBeInTheDocument()
  })

  test('forwards additional props to image correctly', () => {
    const { getByRole } = render(
      <Logo 
        {...defaultProps} 
        data-testid="test-logo"
        title="Test Logo Title"
      />
    )
    const image = getByRole('img')
    
    expect(image).toHaveAttribute('data-testid', 'test-logo')
    expect(image).toHaveAttribute('title', 'Test Logo Title')
  })

  test('combines all classes correctly', () => {
    const { getByRole } = render(
      <Logo 
        {...defaultProps} 
        size="lg" 
        variant="vite" 
        className="custom-class another-class"
      />
    )
    const image = getByRole('img')
    
    expect(image).toHaveClass('logo', 'logo-lg', 'logo-vite', 'custom-class', 'another-class')
  })

  test('trims className correctly', () => {
    const { getByRole } = render(<Logo {...defaultProps} className="  spaced  " />)
    const image = getByRole('img')
    
    expect(image.className).toContain('logo')
    expect(image.className).toContain('logo-md')
    expect(image.className).toContain('spaced')
  })

  test('handles empty className correctly', () => {
    const { getByRole } = render(<Logo {...defaultProps} className="" />)
    const image = getByRole('img')
    
    expect(image.className).toBe('logo logo-md')
  })

  // Performance test according to NanoLux philosophy
  test('bundle size is within limits', async () => {
    await testBundleSize('Logo', 384) // max 384 bytes
  })

  // Atomic CSS test - ensures correct CSS class composition
  test('follows atomic CSS principles', () => {
    const { getByRole } = render(
      <Logo {...defaultProps} className="opacity-75 hover:opacity-100" />
    )
    const image = getByRole('img')
    
    // Checks atomic CSS class composition
    expect(image.className).toMatch(/logo/)
    expect(image.className).toMatch(/opacity-75/)
    expect(image.className).toMatch(/hover:opacity-100/)
  })

  // Accessibility test
  test('has proper accessibility attributes', () => {
    const { getByRole } = render(
      <Logo 
        src="/logo.svg" 
        alt="Company Logo" 
        href="https://company.com"
      />
    )
    
    const link = getByRole('link')
    const image = getByRole('img')
    
    expect(image).toHaveAttribute('alt', 'Company Logo')
    expect(link).toHaveAttribute('href', 'https://company.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  // Link behavior tests
  test('link opens in new tab by default', () => {
    const { getByRole } = render(
      <Logo {...defaultProps} href="https://example.com" />
    )
    
    const link = getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
  })

  test('link can open in same tab', () => {
    const { getByRole } = render(
      <Logo {...defaultProps} href="https://example.com" target="_self" />
    )
    
    const link = getByRole('link')
    expect(link).toHaveAttribute('target', '_self')
  })

  // Edge cases
  test('handles empty src gracefully', () => {
    const { getByRole } = render(<Logo src="" alt="Empty Logo" />)
    const image = getByRole('img')
    
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '')
    expect(image).toHaveAttribute('alt', 'Empty Logo')
  })

  test('handles empty alt gracefully', () => {
    const { getByRole } = render(<Logo src="/logo.svg" alt="" />)
    const image = getByRole('img')
    
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', '')
  })

  test('handles special characters in alt text', () => {
    const { getByRole } = render(
      <Logo src="/logo.svg" alt="Company & Partners Logo (2024)" />
    )
    const image = getByRole('img')
    
    expect(image).toHaveAttribute('alt', 'Company & Partners Logo (2024)')
  })

  test('handles long URLs correctly', () => {
    const longUrl = 'https://very-long-domain-name.example.com/very/long/path/to/resource'
    const { getByRole } = render(
      <Logo {...defaultProps} href={longUrl} />
    )
    
    const link = getByRole('link')
    expect(link).toHaveAttribute('href', longUrl)
  })

  // Component structure tests
  test('maintains correct structure without link', () => {
    const { container } = render(<Logo {...defaultProps} />)
    
    expect(container.firstChild?.nodeName).toBe('IMG')
    expect(container.firstChild).toHaveClass('logo')
  })

  test('maintains correct structure with link', () => {
    const { container } = render(
      <Logo {...defaultProps} href="https://example.com" />
    )
    
    const link = container.firstChild
    const image = link?.firstChild
    
    expect(link?.nodeName).toBe('A')
    expect(link).toHaveClass('logo-link')
    expect(image?.nodeName).toBe('IMG')
    expect(image).toHaveClass('logo')
  })

  // TypeScript integration test
  test('supports all variant values', () => {
    const variants = ['vite', 'preact'] as const
    
    variants.forEach(variant => {
      const { getByRole, unmount } = render(<Logo {...defaultProps} variant={variant} />)
      const image = getByRole('img')
      
      expect(image).toHaveClass(`logo-${variant}`)
      unmount() // Clean up to avoid conflicts
    })
  })

  test('supports all size values', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    
    sizes.forEach(size => {
      const { getByRole, unmount } = render(<Logo {...defaultProps} size={size} />)
      const image = getByRole('img')
      
      expect(image).toHaveClass(`logo-${size}`)
      unmount() // Clean up to avoid conflicts
    })
  })
})
