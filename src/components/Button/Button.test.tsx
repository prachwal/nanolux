import { render, fireEvent } from '@testing-library/preact'
import { expect, test, describe, vi } from 'vitest'
import Button from './Button'

describe('Button Component', () => {
  test('renders with correct text', () => {
    const { getByText } = render(<Button>Click me</Button>)
    expect(getByText('Click me')).toBeInTheDocument()
  })

  test('applies base classes correctly', () => {
    const { getByRole } = render(<Button>Test</Button>)
    const button = getByRole('button')
    
    expect(button).toHaveClass('btn', 'btn-md')
  })

  test('applies variant classes correctly', () => {
    const { getByRole } = render(
      <Button variant="primary">Primary Button</Button>
    )
    const button = getByRole('button')
    
    expect(button).toHaveClass('btn', 'btn-md', 'btn-primary')
  })

  test('applies size classes correctly', () => {
    const { getByRole } = render(
      <Button size="lg">Large Button</Button>
    )
    const button = getByRole('button')
    
    expect(button).toHaveClass('btn', 'btn-lg')
  })

  test('handles custom colors via CSS variables', () => {
    const { getByRole } = render(
      <Button bg="#ff0000" color="#ffffff">Custom Button</Button>
    )
    const button = getByRole('button')
    
    expect(button.style.cssText).toContain('--btn-bg: #ff0000')
    expect(button.style.cssText).toContain('--btn-color: #ffffff')
  })

  test('handles disabled state', () => {
    const { getByRole } = render(
      <Button disabled>Disabled Button</Button>
    )
    const button = getByRole('button')
    
    expect(button).toBeDisabled()
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    const { getByRole } = render(
      <Button onClick={handleClick}>Clickable Button</Button>
    )
    
    const button = getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    const { getByRole } = render(
      <Button onClick={handleClick} disabled>Disabled Button</Button>
    )
    
    const button = getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('combines multiple props correctly', () => {
    const { getByRole } = render(
      <Button variant="danger" size="sm" bg="#custom">
        Complex Button
      </Button>
    )
    const button = getByRole('button')
    
    expect(button).toHaveClass('btn', 'btn-sm', 'btn-danger')
    expect(button.style.cssText).toContain('--btn-bg: #custom')
  })

  test('passes through additional props', () => {
    const { getByRole } = render(
      <Button data-testid="custom-button" title="Custom Title">
        Test Button
      </Button>
    )
    const button = getByRole('button')
    
    expect(button).toHaveAttribute('data-testid', 'custom-button')
    expect(button).toHaveAttribute('title', 'Custom Title')
  })

  // Performance test - sprawdza czy komponent jest lekki
  test('has minimal rendering overhead', () => {
    const startTime = performance.now()
    
    // Renderuj 100 przycisków
    for (let i = 0; i < 100; i++) {
      render(<Button>Button {i}</Button>)
    }
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Powinno się renderować szybko (< 100ms dla 100 komponentów w środowisku testowym)
    expect(renderTime).toBeLessThan(100)
  })
})
