import { render } from '@testing-library/preact'
import { expect, test, describe, vi } from 'vitest'
import TestComponent from './TestComponent'

describe('TestComponent', () => {
  test('renders with default props', () => {
    const { container } = render(<TestComponent>Test content</TestComponent>)
    const component = container.firstChild
    
    expect(component).toHaveClass('testcomponent')
    expect(component).toHaveClass('testcomponent-md')
    expect(component).toHaveTextContent('Test content')
  })
  
  test('applies variant classes correctly', () => {
    const { container } = render(<TestComponent variant="primary">Test</TestComponent>)
    const component = container.firstChild
    
    expect(component).toHaveClass('testcomponent-primary')
  })
  
  test('applies size classes correctly', () => {
    const { container } = render(<TestComponent size="lg">Test</TestComponent>)
    const component = container.firstChild
    
    expect(component).toHaveClass('testcomponent-lg')
  })
  
  test('handles disabled state', () => {
    const { container } = render(<TestComponent disabled>Test</TestComponent>)
    const component = container.firstChild
    
    expect(component).toHaveClass('testcomponent-disabled')
  })
  
  test('handles click events', () => {
    const handleClick = vi.fn()
    const { container } = render(<TestComponent onClick={handleClick}>Test</TestComponent>)
    const component = container.firstChild as HTMLElement
    
    component.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  test('does not handle click when disabled', () => {
    const handleClick = vi.fn()
    const { container } = render(<TestComponent onClick={handleClick} disabled>Test</TestComponent>)
    const component = container.firstChild as HTMLElement
    
    component.click()
    expect(handleClick).not.toHaveBeenCalled()
  })
})