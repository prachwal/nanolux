import { ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import './Alert.css'

interface AlertProps {
  /** Typ alertu */
  variant?: 'info' | 'success' | 'warning' | 'error'
  /** Czy alert można zamknąć */
  dismissible?: boolean
  /** Czy alert znika automatycznie (ms) */
  autoClose?: number | false
  /** Tytuł alertu */
  title?: string
  /** Zawartość alertu */
  children: ComponentChildren
  /** Callback zamknięcia */
  onClose?: () => void
  /** Czy pokazać ikonę */
  showIcon?: boolean
  /** Custom klasy CSS */
  className?: string
  /** Czy alert jest widoczny */
  visible?: boolean
}

/**
 * Alert/Toast component z różnymi wariantami i auto-close
 * @example
 * <Alert variant="success" title="Success!" dismissible>
 *   Operation completed successfully
 * </Alert>
 */
export default function Alert({
  variant = 'info',
  dismissible = false,
  autoClose = false,
  title,
  children,
  onClose,
  showIcon = true,
  className = '',
  visible = true,
  ...props
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(visible)

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleClose()
      }, autoClose)

      return () => clearTimeout(timer)
    }
  }, [autoClose, isVisible])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null

  const alertClass = `alert alert-${variant} ${className}`

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return '✓'
      case 'warning':
        return '⚠'
      case 'error':
        return '✕'
      default:
        return 'ℹ'
    }
  }

  return (
    <div
      class={alertClass}
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      {...props}
    >
      {showIcon && (
        <div class="alert-icon">
          {getIcon()}
        </div>
      )}
      
      <div class="alert-content">
        {title && <div class="alert-title">{title}</div>}
        <div class="alert-message">{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          class="alert-close"
          onClick={handleClose}
          aria-label="Zamknij alert"
        >
          ×
        </button>
      )}
    </div>
  )
}

export type { AlertProps }
