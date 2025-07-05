import { render, screen } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import Avatar from './Avatar'

describe('Avatar', () => {
  test('renders image when src is provided', () => {
    render(<Avatar src="/test.jpg" alt="Test Avatar" />)
    
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test.jpg')
    expect(img).toHaveAttribute('alt', 'Test Avatar')
  })

  test('renders initials when provided', () => {
    render(<Avatar initials="JD" />)
    
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  test('auto-generates initials from name', () => {
    render(<Avatar name="John Doe" />)
    
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  test('applies size class', () => {
    const { container } = render(<Avatar name="Test" size="lg" />)
    
    const avatar = container.querySelector('.avatar')
    expect(avatar).toHaveClass('avatar-lg')
  })

  test('applies shape class', () => {
    const { container } = render(<Avatar name="Test" shape="square" />)
    
    const avatar = container.querySelector('.avatar')
    expect(avatar).toHaveClass('avatar-square')
  })

  test('applies variant class', () => {
    const { container } = render(<Avatar name="Test" variant="success" />)
    
    const avatar = container.querySelector('.avatar')
    expect(avatar).toHaveClass('avatar-success')
  })

  test('applies bordered class when bordered=true', () => {
    const { container } = render(<Avatar name="Test" bordered />)
    
    const avatar = container.querySelector('.avatar')
    expect(avatar).toHaveClass('avatar-bordered')
  })

  test('renders status indicator when showStatus=true', () => {
    const { container } = render(
      <Avatar name="Test" showStatus status="online" />
    )
    
    const status = container.querySelector('.avatar-status')
    expect(status).toBeInTheDocument()
    expect(status).toHaveClass('avatar-status-online')
  })

  test('renders custom placeholder', () => {
    render(<Avatar placeholder={<span>👤</span>} />)
    
    expect(screen.getByText('👤')).toBeInTheDocument()
  })

  test('applies custom colors', () => {
    const { container } = render(
      <Avatar name="Test" bg="#ff0000" color="#ffffff" />
    )
    
    const avatar = container.querySelector('.avatar')
    const style = avatar?.getAttribute('style')
    expect(style).toContain('--avatar-bg: #ff0000')
    expect(style).toContain('--avatar-color: #ffffff')
  })
})
