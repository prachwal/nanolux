import { render, screen } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
  test('renders with correct attributes', () => {
    render(<ProgressBar value={75} />)
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '75')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
  })

  test('applies variant class', () => {
    const { container } = render(<ProgressBar value={50} variant="success" />)
    
    const progressBarFill = container.querySelector('.progress-bar')
    expect(progressBarFill).toHaveClass('progress-bar-success')
  })

  test('applies size class', () => {
    const { container } = render(<ProgressBar value={50} size="lg" />)
    
    const progress = container.querySelector('.progress')
    expect(progress).toHaveClass('progress-lg')
  })

  test('applies shape class', () => {
    const { container } = render(<ProgressBar value={50} shape="square" />)
    
    const progress = container.querySelector('.progress')
    expect(progress).toHaveClass('progress-square')
  })

  test('shows percentage label when showLabel=true', () => {
    render(<ProgressBar value={75} showLabel />)
    
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  test('shows custom label', () => {
    render(<ProgressBar value={50} label="Custom Label" />)
    
    expect(screen.getByText('Custom Label')).toBeInTheDocument()
  })

  test('renders label in top position', () => {
    const { container } = render(
      <ProgressBar value={50} label="Top Label" labelPosition="top" />
    )
    
    const label = container.querySelector('.progress-label-top')
    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent('Top Label')
  })

  test('applies striped class when striped=true', () => {
    const { container } = render(<ProgressBar value={50} striped />)
    
    const progressBarFill = container.querySelector('.progress-bar')
    expect(progressBarFill).toHaveClass('progress-bar-striped')
  })

  test('applies animated class when animated=true', () => {
    const { container } = render(<ProgressBar value={50} animated />)
    
    const progressBarFill = container.querySelector('.progress-bar')
    expect(progressBarFill).toHaveClass('progress-bar-animated')
  })

  test('normalizes value within min/max range', () => {
    render(<ProgressBar value={150} max={100} />)
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '100')
  })

  test('applies custom colors', () => {
    const { container } = render(
      <ProgressBar value={50} bg="#f0f0f0" color="#ff0000" />
    )
    
    const progress = container.querySelector('.progress')
    const style = progress?.getAttribute('style')
    expect(style).toContain('--progress-bg: #f0f0f0')
    expect(style).toContain('--progress-color: #ff0000')
  })

  test('sets correct width percentage', () => {
    const { container } = render(<ProgressBar value={75} />)
    
    const progressBarFill = container.querySelector('.progress-bar')
    const style = progressBarFill?.getAttribute('style')
    expect(style).toContain('width: 75%')
  })
})
