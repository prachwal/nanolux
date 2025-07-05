import { render, screen } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import Badge from './Badge'

describe('Badge', () => {
  test('renders with text content', () => {
    render(<Badge>Test Badge</Badge>)
    
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  test('applies variant class', () => {
    render(<Badge variant="success">Badge</Badge>)
    
    const badge = screen.getByText('Badge')
    expect(badge).toHaveClass('badge-success')
  })

  test('applies size class', () => {
    render(<Badge size="lg">Badge</Badge>)
    
    const badge = screen.getByText('Badge')
    expect(badge).toHaveClass('badge-lg')
  })

  test('applies outline class when outline=true', () => {
    render(<Badge variant="primary" outline>Badge</Badge>)
    
    const badge = screen.getByText('Badge')
    expect(badge).toHaveClass('badge-outline-primary')
  })

  test('applies rounded class when rounded=true', () => {
    render(<Badge rounded>Badge</Badge>)
    
    const badge = screen.getByText('Badge')
    expect(badge).toHaveClass('badge-rounded')
  })

  test('renders dot when dot=true', () => {
    const { container } = render(
      <Badge dot dotPosition="top-right">Badge</Badge>
    )
    
    const dot = container.querySelector('.badge-dot')
    expect(dot).toBeInTheDocument()
    expect(dot).toHaveClass('badge-dot-top-right')
  })

  test('applies custom colors', () => {
    render(<Badge bg="#ff0000" color="#ffffff">Badge</Badge>)
    
    const badge = screen.getByText('Badge')
    const style = badge.getAttribute('style')
    expect(style).toContain('--badge-bg: #ff0000')
    expect(style).toContain('--badge-color: #ffffff')
  })
})
