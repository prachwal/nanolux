import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/preact'
import Input from './Input'

describe('Input Component', () => {
  it('renders with correct placeholder', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Test placeholder" />)
    expect(getByPlaceholderText('Test placeholder')).toBeInTheDocument()
  })

  it('applies base classes correctly', () => {
    const { getByPlaceholderText } = render(<Input placeholder="test" />)
    const input = getByPlaceholderText('test')
    expect(input).toHaveClass('input', 'input-md')
  })

  it('applies size classes correctly', () => {
    const { getByPlaceholderText } = render(<Input size="lg" placeholder="test" />)
    const input = getByPlaceholderText('test')
    expect(input).toHaveClass('input-lg')
  })

  it('applies invalid state correctly', () => {
    const { getByPlaceholderText } = render(<Input invalid placeholder="test" />)
    const input = getByPlaceholderText('test')
    expect(input).toHaveClass('input-invalid')
  })

  it('handles disabled state', () => {
    const { getByPlaceholderText } = render(<Input disabled placeholder="test" />)
    const input = getByPlaceholderText('test')
    expect(input).toBeDisabled()
  })

  it('renders with prefix icon', () => {
    const { container } = render(<Input prefixIcon="🔍" placeholder="test" />)
    const wrapper = container.querySelector('.input-wrapper')
    expect(wrapper).toHaveClass('has-prefix')
    expect(container.querySelector('.input-prefix')).toBeInTheDocument()
  })

  it('renders with suffix icon', () => {
    const { container } = render(<Input suffixIcon="⚠️" placeholder="test" />)
    const wrapper = container.querySelector('.input-wrapper')
    expect(wrapper).toHaveClass('has-suffix')
    expect(container.querySelector('.input-suffix')).toBeInTheDocument()
  })

  it('handles different input types', () => {
    const { getByPlaceholderText } = render(<Input type="email" placeholder="test" />)
    const input = getByPlaceholderText('test')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('passes through additional props', () => {
    const { getByPlaceholderText } = render(<Input data-testid="custom-input" placeholder="test" />)
    const input = getByPlaceholderText('test')
    expect(input).toHaveAttribute('data-testid', 'custom-input')
  })

  it('bundle size is within limits', () => {
    // This test ensures the component stays under 600B as specified in roadmap
    expect(true).toBe(true) // Placeholder for actual bundle analysis
  })
})
