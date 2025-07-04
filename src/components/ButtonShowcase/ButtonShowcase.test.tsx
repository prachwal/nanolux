import { render } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import ButtonShowcase from './ButtonShowcase'
import { testBundleSize } from '../../test/utils'

describe('ButtonShowcase Component', () => {
  test('renders with default title', () => {
    const { getByText } = render(<ButtonShowcase />)
    
    expect(getByText('Button Showcase')).toBeInTheDocument()
  })

  test('renders with custom title', () => {
    const { getByText } = render(<ButtonShowcase title="Custom Showcase" />)
    
    expect(getByText('Custom Showcase')).toBeInTheDocument()
  })

  test('renders without title when not provided', () => {
    const { container } = render(<ButtonShowcase title="" />)
    
    const title = container.querySelector('.button-showcase-title')
    expect(title).not.toBeInTheDocument()
  })

  test('applies base classes correctly', () => {
    const { container } = render(<ButtonShowcase />)
    const showcase = container.firstChild as HTMLElement
    
    expect(showcase).toHaveClass('button-showcase')
  })

  test('applies custom className correctly', () => {
    const { container } = render(<ButtonShowcase className="custom-showcase" />)
    const showcase = container.firstChild as HTMLElement
    
    expect(showcase).toHaveClass('button-showcase', 'custom-showcase')
  })

  test('renders sizes section correctly', () => {
    const { getByText } = render(<ButtonShowcase />)
    
    expect(getByText('Rozmiary')).toBeInTheDocument()
    expect(getByText('Small')).toBeInTheDocument()
    expect(getByText('Medium')).toBeInTheDocument()
    expect(getByText('Large')).toBeInTheDocument()
  })

  test('renders custom colors section correctly', () => {
    const { getByText } = render(<ButtonShowcase />)
    
    expect(getByText('Kolory niestandardowe')).toBeInTheDocument()
    expect(getByText('Custom Red')).toBeInTheDocument()
    expect(getByText('Custom Teal')).toBeInTheDocument()
    expect(getByText('Custom Blue')).toBeInTheDocument()
  })

  test('renders correct HTML structure', () => {
    const { container } = render(<ButtonShowcase />)
    
    const showcase = container.querySelector('.button-showcase')
    const title = container.querySelector('.button-showcase-title')
    const sections = container.querySelectorAll('.button-showcase-section')
    const subtitles = container.querySelectorAll('.button-showcase-subtitle')
    const groups = container.querySelectorAll('.button-showcase-group')
    
    expect(showcase).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(title?.tagName).toBe('H4')
    expect(sections).toHaveLength(2) // sizes and custom colors
    expect(subtitles).toHaveLength(2)
    expect(subtitles[0].tagName).toBe('H5')
    expect(groups).toHaveLength(2)
  })

  test('renders all button variants with correct props', () => {
    const { container } = render(<ButtonShowcase />)
    
    // Size buttons
    const smallButton = Array.from(container.querySelectorAll('button')).find(btn => btn.textContent === 'Small')
    const mediumButton = Array.from(container.querySelectorAll('button')).find(btn => btn.textContent === 'Medium')
    const largeButton = Array.from(container.querySelectorAll('button')).find(btn => btn.textContent === 'Large')
    
    expect(smallButton).toBeInTheDocument()
    expect(mediumButton).toBeInTheDocument()
    expect(largeButton).toBeInTheDocument()
    
    // Custom color buttons
    const redButton = Array.from(container.querySelectorAll('button')).find(btn => btn.textContent === 'Custom Red')
    const tealButton = Array.from(container.querySelectorAll('button')).find(btn => btn.textContent === 'Custom Teal')
    const blueButton = Array.from(container.querySelectorAll('button')).find(btn => btn.textContent === 'Custom Blue')
    
    expect(redButton).toBeInTheDocument()
    expect(tealButton).toBeInTheDocument()
    expect(blueButton).toBeInTheDocument()
  })

  test('size buttons have correct classes', () => {
    const { container } = render(<ButtonShowcase />)
    
    const buttons = container.querySelectorAll('button')
    const sizeButtons = Array.from(buttons).slice(0, 3) // First 3 are size buttons
    
    expect(sizeButtons[0]).toHaveClass('btn', 'btn-sm', 'btn-primary')
    expect(sizeButtons[1]).toHaveClass('btn', 'btn-md', 'btn-primary')
    expect(sizeButtons[2]).toHaveClass('btn', 'btn-lg', 'btn-primary')
  })

  test('custom color buttons have correct styles', () => {
    const { container } = render(<ButtonShowcase />)
    
    const buttons = container.querySelectorAll('button')
    const colorButtons = Array.from(buttons).slice(3, 6) // Next 3 are color buttons
    
    expect(colorButtons[0]).toHaveAttribute('style', expect.stringContaining('--btn-bg: #ff6b6b'))
    expect(colorButtons[1]).toHaveAttribute('style', expect.stringContaining('--btn-bg: #4ecdc4'))
    expect(colorButtons[2]).toHaveAttribute('style', expect.stringContaining('--btn-bg: #45b7d1'))
  })

  test('forwards additional props correctly', () => {
    const { container } = render(
      <ButtonShowcase 
        data-testid="test-showcase"
        role="region"
      />
    )
    const showcase = container.firstChild as HTMLElement
    
    expect(showcase).toHaveAttribute('data-testid', 'test-showcase')
    expect(showcase).toHaveAttribute('role', 'region')
  })

  test('trims className correctly when no custom class provided', () => {
    const { container } = render(<ButtonShowcase />)
    const showcase = container.firstChild as HTMLElement
    
    expect(showcase.className).toBe('button-showcase')
  })

  test('integrates with Button component correctly', () => {
    const { container } = render(<ButtonShowcase />)
    
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
    
    // All buttons should have base btn class
    buttons.forEach(button => {
      expect(button).toHaveClass('btn')
    })
  })

  // Performance test according to NanoLux philosophy
  test('bundle size is within limits', async () => {
    await testBundleSize('ButtonShowcase', 1024) // max 1KB - includes Button imports
  })

  // Atomic CSS test - ensures correct CSS class composition
  test('follows atomic CSS principles', () => {
    const { container } = render(
      <ButtonShowcase className="p-16 bg-white" />
    )
    const showcase = container.firstChild as HTMLElement
    
    // Checks atomic CSS class composition
    expect(showcase.className).toMatch(/button-showcase/)
    expect(showcase.className).toMatch(/p-16/)
    expect(showcase.className).toMatch(/bg-white/)
  })

  // Accessibility test
  test('has proper accessibility structure', () => {
    const { container } = render(<ButtonShowcase />)
    
    const title = container.querySelector('h4')
    const subtitles = container.querySelectorAll('h5')
    const buttons = container.querySelectorAll('button')
    
    expect(title).toBeInTheDocument()
    expect(subtitles).toHaveLength(2)
    expect(buttons.length).toBeGreaterThan(0)
    
    // All buttons should be accessible (buttons have implicit type="button")
    buttons.forEach(button => {
      expect(button.tagName).toBe('BUTTON')
    })
  })

  // Content organization test
  test('maintains consistent section structure', () => {
    const { container } = render(<ButtonShowcase />)
    
    const sections = container.querySelectorAll('.button-showcase-section')
    
    sections.forEach(section => {
      const subtitle = section.querySelector('.button-showcase-subtitle')
      const group = section.querySelector('.button-showcase-group')
      
      expect(subtitle).toBeInTheDocument()
      expect(group).toBeInTheDocument()
      expect(subtitle?.tagName).toBe('H5')
    })
  })

  // Component composition test
  test('displays sections in correct order', () => {
    const { container } = render(<ButtonShowcase />)
    
    const subtitles = container.querySelectorAll('.button-showcase-subtitle')
    
    expect(subtitles[0]).toHaveTextContent('Rozmiary')
    expect(subtitles[1]).toHaveTextContent('Kolory niestandardowe')
  })

  // Edge cases
  test('handles custom title with special characters', () => {
    const { getByText } = render(
      <ButtonShowcase title="Showcase: Buttons & More!" />
    )
    
    expect(getByText('Showcase: Buttons & More!')).toBeInTheDocument()
  })

  test('renders correctly without title but with className', () => {
    const { container } = render(
      <ButtonShowcase title="" className="no-title-showcase" />
    )
    
    const showcase = container.firstChild as HTMLElement
    const title = container.querySelector('.button-showcase-title')
    
    expect(showcase).toHaveClass('button-showcase', 'no-title-showcase')
    expect(title).not.toBeInTheDocument()
  })

  test('button groups contain expected number of buttons', () => {
    const { container } = render(<ButtonShowcase />)
    
    const groups = container.querySelectorAll('.button-showcase-group')
    
    // First group (sizes) should have 3 buttons
    const sizeButtons = groups[0].querySelectorAll('button')
    expect(sizeButtons).toHaveLength(3)
    
    // Second group (custom colors) should have 3 buttons
    const colorButtons = groups[1].querySelectorAll('button')
    expect(colorButtons).toHaveLength(3)
  })
})
