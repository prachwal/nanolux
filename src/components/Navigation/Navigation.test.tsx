import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import Navigation from './Navigation'
import Logo from '../Logo/Logo'
import Button from '../Button/Button'

const sampleItems = [
  { label: 'Home', href: '/', active: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Disabled', href: '/disabled', disabled: true }
]

describe('Navigation', () => {
  it('renders without items', () => {
    render(<Navigation />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
  })

  it('renders with navigation items', () => {
    render(<Navigation items={sampleItems} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Disabled')).toBeInTheDocument()
  })

  it('renders brand element', () => {
    render(
      <Navigation 
        brand={<Logo src="/logo.svg" alt="NanoLux" size="sm" />}
        items={sampleItems}
      />
    )
    
    // Logo powinien być obecny w brand sekcji
    const brandSection = document.querySelector('.navigation-brand')
    const logoImage = screen.getByAltText('NanoLux')
    expect(brandSection).toBeInTheDocument()
    expect(logoImage).toBeInTheDocument()
  })

  it('renders brand with link', () => {
    render(
      <Navigation 
        brand={<Logo src="/logo.svg" alt="NanoLux" size="sm" />}
        brandHref="/"
        items={sampleItems}
      />
    )
    
    const brandLink = document.querySelector('.navigation-brand-link')
    expect(brandLink).toHaveAttribute('href', '/')
    expect(screen.getByAltText('NanoLux')).toBeInTheDocument()
  })

  it('handles brand click', async () => {
    const handleBrandClick = vi.fn()
    render(
      <Navigation 
        brand={<Logo src="/logo.svg" alt="NanoLux" size="sm" />}
        brandOnClick={handleBrandClick}
        items={sampleItems}
      />
    )
    
    const brandLink = document.querySelector('.navigation-brand-link')
    await userEvent.click(brandLink!)
    
    expect(handleBrandClick).toHaveBeenCalledTimes(1)
  })

  it('renders actions section', () => {
    render(
      <Navigation 
        items={sampleItems}
        actions={<Button variant="primary">Sign In</Button>}
      />
    )
    
    const signInButton = screen.getByText('Sign In')
    expect(signInButton).toBeInTheDocument()
  })

  it('marks active navigation item', () => {
    render(<Navigation items={sampleItems} />)
    
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('aria-current', 'page')
  })

  it('handles navigation item clicks', async () => {
    const handleClick = vi.fn()
    const itemsWithClick = [
      { label: 'Custom', onClick: handleClick }
    ]
    
    render(<Navigation items={itemsWithClick} />)
    
    const customLink = screen.getByText('Custom')
    await userEvent.click(customLink)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables navigation items correctly', () => {
    render(<Navigation items={sampleItems} />)
    
    const disabledLink = screen.getByText('Disabled').closest('a')
    expect(disabledLink).toHaveAttribute('aria-disabled', 'true')
  })

  it('applies size classes correctly', () => {
    const { container } = render(<Navigation items={sampleItems} size="lg" />)
    
    expect(container.querySelector('.navigation')).toHaveClass('navigation-lg')
  })

  it('applies variant classes correctly', () => {
    const { container } = render(<Navigation items={sampleItems} variant="dark" />)
    
    expect(container.querySelector('.navigation')).toHaveClass('navigation-dark')
  })

  it('applies sticky positioning', () => {
    const { container } = render(<Navigation items={sampleItems} sticky />)
    
    expect(container.querySelector('.navigation')).toHaveClass('navigation-sticky')
  })

  it('renders custom children', () => {
    render(
      <Navigation items={sampleItems}>
        <div>Custom content</div>
      </Navigation>
    )
    
    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })

  it('handles disabled item clicks correctly', async () => {
    const handleClick = vi.fn()
    const disabledItems = [
      { label: 'Disabled', onClick: handleClick, disabled: true }
    ]
    
    render(<Navigation items={disabledItems} />)
    
    const disabledLink = screen.getByText('Disabled')
    await userEvent.click(disabledLink)
    
    // Disabled item should not trigger onClick
    expect(handleClick).not.toHaveBeenCalled()
  })
})
