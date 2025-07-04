import { render } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import { 
  ButtonSizesShowcase, 
  ButtonVariantsShowcase, 
  ButtonCustomColorsShowcase 
} from './Button.examples'

describe('Button Examples/Stories Tests', () => {
  test('ButtonSizesShowcase renders all sizes', () => {
    const { getByText } = render(<ButtonSizesShowcase />)
    
    expect(getByText('Small')).toBeInTheDocument()
    expect(getByText('Medium')).toBeInTheDocument()
    expect(getByText('Large')).toBeInTheDocument()
  })

  test('ButtonVariantsShowcase renders all variants', () => {
    const { getByText } = render(<ButtonVariantsShowcase />)
    
    expect(getByText('Primary')).toBeInTheDocument()
    expect(getByText('Secondary')).toBeInTheDocument()
    expect(getByText('Danger')).toBeInTheDocument()
  })

  test('ButtonCustomColorsShowcase renders custom colored buttons', () => {
    const { getByText } = render(<ButtonCustomColorsShowcase />)
    
    expect(getByText('Custom Red')).toBeInTheDocument()
    expect(getByText('Custom Teal')).toBeInTheDocument()
    expect(getByText('Custom Blue')).toBeInTheDocument()
  })

  test('Button sizes have correct CSS classes', () => {
    const { container } = render(<ButtonSizesShowcase />)
    const buttons = container.querySelectorAll('button')
    
    expect(buttons[0]).toHaveClass('btn-sm')
    expect(buttons[1]).toHaveClass('btn-md')
    expect(buttons[2]).toHaveClass('btn-lg')
  })

  test('Button variants have correct CSS classes', () => {
    const { container } = render(<ButtonVariantsShowcase />)
    const buttons = container.querySelectorAll('button')
    
    expect(buttons[0]).toHaveClass('btn-primary')
    expect(buttons[1]).toHaveClass('btn-secondary')
    expect(buttons[2]).toHaveClass('btn-danger')
  })

  test('Custom color buttons have correct CSS variables', () => {
    const { container } = render(<ButtonCustomColorsShowcase />)
    const buttons = container.querySelectorAll('button')
    
    expect(buttons[0].style.cssText).toContain('--btn-bg: #ff6b6b')
    expect(buttons[1].style.cssText).toContain('--btn-bg: #4ecdc4')
    expect(buttons[2].style.cssText).toContain('--btn-bg: #45b7d1')
  })

  // Performance test - sprawdza czy showcase components renderują się szybko
  test('showcase components have minimal rendering overhead', () => {
    const startTime = performance.now()
    
    render(<ButtonSizesShowcase />)
    render(<ButtonVariantsShowcase />)
    render(<ButtonCustomColorsShowcase />)
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Wszystkie showcase powinny się renderować bardzo szybko
    expect(renderTime).toBeLessThan(20)
  })
})
