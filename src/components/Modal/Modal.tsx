import { ComponentChildren, JSX } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import './Modal.css'

interface ModalProps {
  /** Czy modal jest widoczny */
  open?: boolean
  /** Czy modal może być zamknięty kliknięciem na overlay */
  dismissible?: boolean
  /** Rozmiar modala */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Custom width */
  width?: string
  /** Tytuł modala */
  title?: string
  /** Zawartość modala */
  children: ComponentChildren
  /** Callback zamknięcia modala */
  onClose?: () => void
  /** Callback po otwarciu */
  onOpen?: () => void
  /** Czy pokazać przycisk zamknięcia */
  showClose?: boolean
  /** Custom klasy CSS */
  className?: string
}

/**
 * Modal/Dialog component z pełną dostępnością i keyboard navigation
 * @example
 * <Modal open={isOpen} onClose={() => setIsOpen(false)}>
 *   <p>Modal content</p>
 * </Modal>
 */
export default function Modal({
  open = false,
  dismissible = true,
  size = 'md',
  width,
  title,
  children,
  onClose,
  onOpen,
  showClose = true,
  className = '',
  ...props
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    if (open) {
      // Store previously focused element
      previousFocus.current = document.activeElement as HTMLElement
      
      // Show modal and focus
      modal.showModal()
      modal.focus()
      onOpen?.()
    } else {
      // Close modal and restore focus
      modal.close()
      previousFocus.current?.focus()
    }
  }, [open, onOpen])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && dismissible) {
      onClose?.()
    }
  }

  const handleBackdropClick = (e: JSX.TargetedMouseEvent<HTMLDialogElement>) => {
    if (dismissible && e.target === modalRef.current) {
      onClose?.()
    }
  }

  const sizeClass = `modal-${size}`
  const customStyle = width ? `--modal-width: ${width}` : ''

  return (
    <dialog
      ref={modalRef}
      class={`modal ${sizeClass} ${className}`}
      style={customStyle}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      {...props}
    >
      <div class="modal-content">
        {(title || showClose) && (
          <header class="modal-header">
            {title && <h2 class="modal-title">{title}</h2>}
            {showClose && (
              <button
                type="button"
                class="modal-close"
                onClick={onClose}
                aria-label="Zamknij modal"
              >
                ×
              </button>
            )}
          </header>
        )}
        <div class="modal-body">
          {children}
        </div>
      </div>
    </dialog>
  )
}

export type { ModalProps }
