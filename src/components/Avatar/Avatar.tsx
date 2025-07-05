import { ComponentChildren } from 'preact'
import './Avatar.css'

interface AvatarProps {
  /** Źródło obrazu */
  src?: string
  /** Tekst alternatywny */
  alt?: string
  /** Inicjały do wyświetlenia */
  initials?: string
  /** Nazwa użytkownika (auto-generuje inicjały) */
  name?: string
  /** Rozmiar avatara */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Kształt avatara */
  shape?: 'circle' | 'square' | 'rounded'
  /** Wariant koloru tła dla inicjałów */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  /** Custom kolor tła */
  bg?: string
  /** Custom kolor tekstu */
  color?: string
  /** Czy avatar ma border */
  bordered?: boolean
  /** Czy avatar jest offline/online */
  status?: 'online' | 'offline' | 'away' | 'busy'
  /** Czy pokazać status indicator */
  showStatus?: boolean
  /** Placeholder gdy brak obrazu i inicjałów */
  placeholder?: ComponentChildren
  /** Callback przy błędzie ładowania obrazu */
  onError?: () => void
  /** Custom klasa CSS */
  class?: string
}

/**
 * Komponent do wyświetlania avatarów użytkowników
 * @example
 * <Avatar src="/user.jpg" alt="John Doe" />
 * <Avatar name="Jane Smith" variant="primary" />
 * <Avatar initials="AB" size="lg" status="online" />
 */
export default function Avatar({
  src,
  alt,
  initials,
  name,
  size = 'md',
  shape = 'circle',
  variant = 'neutral',
  bg,
  color,
  bordered = false,
  status,
  showStatus = false,
  placeholder,
  onError,
  class: className = '',
  ...props
}: AvatarProps) {
  // Auto-generate initials from name
  const displayInitials = initials || (name ? 
    name.split(' ')
      .map(word => word.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase()
    : ''
  )

  const baseClass = `avatar avatar-${size} avatar-${shape}`
  const variantClass = ` avatar-${variant}`
  const borderedClass = bordered ? ' avatar-bordered' : ''
  const statusClass = showStatus && status ? ' avatar-with-status' : ''
  
  const customStyle = bg || color ? 
    `${bg ? `--avatar-bg: ${bg};` : ''} ${color ? `--avatar-color: ${color};` : ''}` 
    : ''

  const renderContent = () => {
    if (src) {
      return (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          class="avatar-image"
          onError={onError}
        />
      )
    }
    
    if (displayInitials) {
      return (
        <span class="avatar-initials">
          {displayInitials}
        </span>
      )
    }
    
    if (placeholder) {
      return (
        <span class="avatar-placeholder">
          {placeholder}
        </span>
      )
    }
    
    // Default placeholder
    return (
      <span class="avatar-placeholder">
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </span>
    )
  }

  return (
    <div
      class={`${baseClass}${variantClass}${borderedClass}${statusClass} ${className}`}
      style={customStyle}
      {...props}
    >
      {renderContent()}
      {showStatus && status && (
        <span class={`avatar-status avatar-status-${status}`} />
      )}
    </div>
  )
}

export type { AvatarProps }
