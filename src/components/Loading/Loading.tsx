import { ComponentChildren } from 'preact'
import './Loading.css'

interface LoadingProps {
  /** Typ loadera */
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars'
  /** Rozmiar loadera */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Custom kolor */
  color?: string
  /** Tekst loading */
  text?: string
  /** Pozycja tekstu */
  textPosition?: 'bottom' | 'right'
  /** Czy loader jest w centrum ekranu (overlay) */
  overlay?: boolean
  /** Zawartość podczas ładowania (dla overlay) */
  children?: ComponentChildren
  /** Custom klasy CSS */
  className?: string
  /** Czy pokazać loader */
  loading?: boolean
}

/**
 * Loading/Spinner component z różnymi wariantami animacji
 * @example
 * <Loading variant="spinner" size="md" text="Loading..." />
 * <Loading overlay loading={isLoading}>Content</Loading>
 */
export default function Loading({
  variant = 'spinner',
  size = 'md',
  color,
  text,
  textPosition = 'bottom',
  overlay = false,
  children,
  className = '',
  loading = true,
  ...props
}: LoadingProps) {
  if (!loading && !overlay) return null
  if (!loading && overlay) return <>{children}</>

  const loaderClass = `loading loading-${variant} loading-${size}`
  const customStyle = color ? `--loading-color: ${color}` : ''

  const LoaderElement = () => (
    <div 
      class={`${loaderClass} ${className}`}
      style={customStyle}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {variant === 'spinner' && <div class="loading-spinner" />}
      {variant === 'dots' && (
        <div class="loading-dots">
          <div />
          <div />
          <div />
        </div>
      )}
      {variant === 'pulse' && <div class="loading-pulse" />}
      {variant === 'bars' && (
        <div class="loading-bars">
          <div />
          <div />
          <div />
          <div />
        </div>
      )}
      {text && (
        <div class={`loading-text loading-text-${textPosition}`}>
          {text}
        </div>
      )}
    </div>
  )

  if (overlay) {
    return (
      <div class="loading-overlay-container">
        {children && (
          <div class={`loading-content ${loading ? 'loading-content-blurred' : ''}`}>
            {children}
          </div>
        )}
        {loading && (
          <div class="loading-overlay">
            <LoaderElement />
          </div>
        )}
      </div>
    )
  }

  return <LoaderElement />
}

export type { LoadingProps }
