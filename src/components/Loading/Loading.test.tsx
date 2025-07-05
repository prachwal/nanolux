import { render, screen } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import Loading from './Loading'

describe('Loading Component', () => {
  test('renders loading spinner by default', () => {
    render(<Loading />)
    
    const loader = screen.getByRole('status')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveClass('loading-spinner')
  })

  test('applies correct variant class', () => {
    render(<Loading variant="dots" />)
    
    const loader = screen.getByRole('status')
    expect(loader).toHaveClass('loading-dots')
  })

  test('applies correct size class', () => {
    render(<Loading size="lg" />)
    
    const loader = screen.getByRole('status')
    expect(loader).toHaveClass('loading-lg')
  })

  test('displays text when provided', () => {
    render(<Loading text="Loading..." />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('applies custom color style', () => {
    render(<Loading color="#ff0000" />)
    
    const loader = screen.getByRole('status')
    expect(loader).toHaveStyle('--loading-color: #ff0000')
  })

  test('does not render when loading is false', () => {
    render(<Loading loading={false} />)
    
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('renders overlay correctly', () => {
    render(
      <Loading overlay loading={true}>
        <div>Content</div>
      </Loading>
    )
    
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
    
    const overlayContainer = screen.getByText('Content').closest('.loading-overlay-container')
    expect(overlayContainer).toBeInTheDocument()
  })

  test('shows content without overlay when loading is false', () => {
    render(
      <Loading overlay loading={false}>
        <div>Content</div>
      </Loading>
    )
    
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('applies correct text position class', () => {
    render(<Loading text="Test" textPosition="right" />)
    
    const textElement = screen.getByText('Test')
    expect(textElement).toHaveClass('loading-text-right')
  })
})
