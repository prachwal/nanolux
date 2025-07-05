import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { expect, test, describe, vi } from 'vitest'
import Alert from './Alert'

describe('Alert Component', () => {
  test('renders alert with message', () => {
    render(
      <Alert variant="info">
        Test message
      </Alert>
    )
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  test('applies correct variant class', () => {
    render(
      <Alert variant="success">
        Success message
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('alert-success')
  })

  test('displays title when provided', () => {
    render(
      <Alert title="Alert Title">
        Alert message
      </Alert>
    )
    
    expect(screen.getByText('Alert Title')).toBeInTheDocument()
    expect(screen.getByText('Alert message')).toBeInTheDocument()
  })

  test('shows correct icon for each variant', () => {
    const { rerender } = render(<Alert variant="info">Message</Alert>)
    expect(screen.getByText('ℹ')).toBeInTheDocument()

    rerender(<Alert variant="success">Message</Alert>)
    expect(screen.getByText('✓')).toBeInTheDocument()

    rerender(<Alert variant="warning">Message</Alert>)
    expect(screen.getByText('⚠')).toBeInTheDocument()

    rerender(<Alert variant="error">Message</Alert>)
    expect(screen.getByText('✕')).toBeInTheDocument()
  })

  test('hides icon when showIcon is false', () => {
    render(
      <Alert variant="success" showIcon={false}>
        Message without icon
      </Alert>
    )
    
    expect(screen.queryByText('✓')).not.toBeInTheDocument()
  })

  test('shows close button when dismissible', () => {
    render(
      <Alert dismissible>
        Dismissible alert
      </Alert>
    )
    
    expect(screen.getByLabelText('Zamknij alert')).toBeInTheDocument()
  })

  test('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <Alert dismissible onClose={onClose}>
        Dismissible alert
      </Alert>
    )
    
    const closeButton = screen.getByLabelText('Zamknij alert')
    fireEvent.click(closeButton)
    
    expect(onClose).toHaveBeenCalledOnce()
  })

  test('does not render when visible is false', () => {
    render(
      <Alert visible={false}>
        Hidden alert
      </Alert>
    )
    
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test('auto-closes after specified time', async () => {
    const onClose = vi.fn()
    render(
      <Alert autoClose={100} onClose={onClose}>
        Auto-closing alert
      </Alert>
    )
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledOnce()
    }, { timeout: 200 })
  })

  test('sets correct aria-live attribute for error alerts', () => {
    render(
      <Alert variant="error">
        Error message
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert).toHaveAttribute('aria-live', 'assertive')
  })

  test('sets correct aria-live attribute for non-error alerts', () => {
    render(
      <Alert variant="info">
        Info message
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert).toHaveAttribute('aria-live', 'polite')
  })
})
