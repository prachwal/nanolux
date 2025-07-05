import { render, screen, fireEvent } from '@testing-library/preact'
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest'
import Modal from './Modal'

// Mock HTMLDialogElement methods since jsdom doesn't implement them
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn()
  HTMLDialogElement.prototype.close = vi.fn()
  HTMLDialogElement.prototype.focus = vi.fn()
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('Modal Component', () => {
  test('renders modal when open', () => {
    render(
      <Modal open={true} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )
    
    // Check that modal content is rendered
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
    
    // Check that showModal was called (jsdom limitation workaround)
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce()
  })

  test('does not call showModal when closed', () => {
    render(
      <Modal open={false} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )
    
    // Dialog element is always in DOM, but showModal() is not called when closed
    // Note: In jsdom, modal visibility is controlled via showModal()/close() methods
    // which don't actually affect DOM visibility, only the modal state
    const modal = screen.getByRole('dialog', { hidden: true })
    expect(modal).toBeInTheDocument()
    
    // Verify showModal was not called for closed modal
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled()
  })

  test('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} title="Test Modal" onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    )
    
    const closeButton = screen.getByLabelText('Zamknij modal')
    fireEvent.click(closeButton)
    
    expect(onClose).toHaveBeenCalledOnce()
  })

  test('applies correct size classes', () => {
    render(
      <Modal open={true} size="lg" title="Large Modal">
        <p>Content</p>
      </Modal>
    )
    
    const modal = screen.getByRole('dialog', { hidden: true })
    expect(modal).toHaveClass('modal-lg')
  })

  test('applies custom width style', () => {
    render(
      <Modal open={true} width="600px" title="Custom Width Modal">
        <p>Content</p>
      </Modal>
    )
    
    const modal = screen.getByRole('dialog', { hidden: true })
    expect(modal).toHaveStyle('--modal-width: 600px')
  })

  test('hides close button when showClose is false', () => {
    render(
      <Modal open={true} title="No Close Button" showClose={false}>
        <p>Content</p>
      </Modal>
    )
    
    const closeButton = screen.queryByLabelText('Zamknij modal')
    expect(closeButton).not.toBeInTheDocument()
  })

  test('renders without title when not provided', () => {
    render(
      <Modal open={true}>
        <p>Content without title</p>
      </Modal>
    )
    
    expect(screen.getByText('Content without title')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})
