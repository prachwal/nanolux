import { render, fireEvent } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import CounterDemo from './CounterDemo'

describe('CounterDemo Component', () => {
  test('renders with default initial value', () => {
    const { getByText } = render(<CounterDemo />)
    
    expect(getByText('Count: 0')).toBeInTheDocument()
    expect(getByText('🎛️ Demo komponentów NanoLux')).toBeInTheDocument()
  })

  test('renders with custom initial value', () => {
    const { getByText } = render(<CounterDemo initialValue={5} />)
    
    expect(getByText('Count: 5')).toBeInTheDocument()
  })

  test('increments counter when Count button is clicked', () => {
    const { getByText } = render(<CounterDemo initialValue={0} />)
    
    const countButton = getByText('Count: 0')
    fireEvent.click(countButton)
    
    expect(getByText('Count: 1')).toBeInTheDocument()
  })

  test('decrements counter when Decrease button is clicked', () => {
    const { getByText } = render(<CounterDemo initialValue={5} />)
    
    const decreaseButton = getByText('Decrease')
    fireEvent.click(decreaseButton)
    
    expect(getByText('Count: 4')).toBeInTheDocument()
  })

  test('resets counter when Reset button is clicked', () => {
    const { getByText } = render(<CounterDemo initialValue={5} />)
    
    // First increment
    const countButton = getByText('Count: 5')
    fireEvent.click(countButton)
    expect(getByText('Count: 6')).toBeInTheDocument()
    
    // Then reset
    const resetButton = getByText('Reset')
    fireEvent.click(resetButton)
    expect(getByText('Count: 5')).toBeInTheDocument()
  })

  test('handles multiple increments correctly', () => {
    const { getByText } = render(<CounterDemo initialValue={0} />)
    
    let countButton = getByText('Count: 0')
    
    fireEvent.click(countButton)
    countButton = getByText('Count: 1')
    
    fireEvent.click(countButton)
    countButton = getByText('Count: 2')
    
    fireEvent.click(countButton)
    expect(getByText('Count: 3')).toBeInTheDocument()
  })

  test('handles mixed increment and decrement operations', () => {
    const { getByText } = render(<CounterDemo initialValue={10} />)
    
    let countButton = getByText('Count: 10')
    const decreaseButton = getByText('Decrease')
    
    fireEvent.click(countButton) // 11
    countButton = getByText('Count: 11')
    
    fireEvent.click(countButton) // 12
    countButton = getByText('Count: 12')
    
    fireEvent.click(decreaseButton) // 11
    expect(getByText('Count: 11')).toBeInTheDocument()
  })

  test('applies custom className', () => {
    const { container } = render(
      <CounterDemo className="custom-class" />
    )
    
    const counterDemo = container.querySelector('.counter-demo')
    expect(counterDemo).toHaveClass('counter-demo', 'custom-class')
  })

  test('passes through additional props', () => {
    const { container } = render(
      <CounterDemo data-testid="counter-component" />
    )
    
    const counterDemo = container.querySelector('.counter-demo')
    expect(counterDemo).toHaveAttribute('data-testid', 'counter-component')
  })

  test('uses Button components correctly', () => {
    const { container } = render(<CounterDemo />)
    
    const buttons = container.querySelectorAll('button')
    expect(buttons).toHaveLength(3) // Count, Reset, Decrease
    
    // Sprawdź czy używa klas z Button component
    buttons.forEach(button => {
      expect(button).toHaveClass('btn')
    })
    
    // Sprawdź warianty przycisków
    expect(buttons[0]).toHaveClass('btn-primary') // Count button
    expect(buttons[1]).toHaveClass('btn-secondary') // Reset button  
    expect(buttons[2]).toHaveClass('btn-danger') // Decrease button
  })

  // Integration test - sprawdza całkowitą funkcjonalność
  test('complete counter functionality works correctly', () => {
    const { getByText } = render(<CounterDemo initialValue={0} />)
    
    let countButton = getByText('Count: 0')
    const resetButton = getByText('Reset')
    const decreaseButton = getByText('Decrease')
    
    // Sprawdź początkowy stan
    expect(getByText('Count: 0')).toBeInTheDocument()
    
    // Test sekwencji operacji
    fireEvent.click(countButton) // 1
    countButton = getByText('Count: 1')
    
    fireEvent.click(countButton) // 2
    countButton = getByText('Count: 2')
    
    fireEvent.click(countButton) // 3
    expect(getByText('Count: 3')).toBeInTheDocument()
    
    fireEvent.click(decreaseButton) // 2
    expect(getByText('Count: 2')).toBeInTheDocument()
    
    fireEvent.click(decreaseButton) // 1
    fireEvent.click(decreaseButton) // 0
    expect(getByText('Count: 0')).toBeInTheDocument()
    
    fireEvent.click(decreaseButton) // -1
    expect(getByText('Count: -1')).toBeInTheDocument()
    
    // Test reset functionality
    fireEvent.click(resetButton) // back to 0
    expect(getByText('Count: 0')).toBeInTheDocument()
  })

  // Performance test
  test('renders quickly even with rapid interactions', () => {
    const { getByText } = render(<CounterDemo />)
    let countButton = getByText('Count: 0')
    
    const startTime = performance.now()
    
    // Symulacja szybkich kliknięć
    for (let i = 0; i < 10; i++) {
      fireEvent.click(countButton)
      countButton = getByText(`Count: ${i + 1}`)
    }
    
    const endTime = performance.now()
    const interactionTime = endTime - startTime
    
    // Powinno obsłużyć 10 kliknięć bardzo szybko
    expect(interactionTime).toBeLessThan(100)
    expect(getByText('Count: 10')).toBeInTheDocument()
  })
})
