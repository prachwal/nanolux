import { ComponentChildren } from 'preact'
import './Badge.css'

interface BadgeProps {
  /** Zawartość badge'a */
  children: ComponentChildren
  /** Wariant badge'a */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  /** Rozmiar badge'a */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Czy badge ma być okrągły */
  rounded?: boolean
  /** Czy badge ma outline style */
  outline?: boolean
  /** Custom kolor tła */
  bg?: string
  /** Custom kolor tekstu */
  color?: string
  /** Czy badge ma kropkę */
  dot?: boolean
  /** Pozycja kropki (tylko z dot=true) */
  dotPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /** Custom klasa CSS */
  class?: string
}

/**
 * Mały znacznik do wyróżniania statusu lub kategorii
 * @example
 * <Badge variant="primary">New</Badge>
 * <Badge variant="success" size="sm">Active</Badge>
 * <Badge dot dotPosition="top-right">Notifications</Badge>
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  rounded = false,
  outline = false,
  bg,
  color,
  dot = false,
  dotPosition = 'top-right',
  class: className = '',
  ...props
}: BadgeProps) {
  const baseClass = `badge badge-${size}`
  const variantClass = outline ? ` badge-outline-${variant}` : ` badge-${variant}`
  const roundedClass = rounded ? ' badge-rounded' : ''
  const dotClass = dot ? ' badge-with-dot' : ''
  
  const customStyle = bg || color ? 
    `${bg ? `--badge-bg: ${bg};` : ''} ${color ? `--badge-color: ${color};` : ''}` 
    : ''

  const badge = (
    <span
      class={`${baseClass}${variantClass}${roundedClass}${dotClass} ${className}`}
      style={customStyle}
      {...props}
    >
      {children}
      {dot && (
        <span class={`badge-dot badge-dot-${dotPosition}`} />
      )}
    </span>
  )

  return badge
}

export type { BadgeProps }
