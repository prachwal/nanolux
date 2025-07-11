import { ComponentChildren, JSX } from 'preact'
import './Link.css'

/**
 * Props dla komponentu Link
 */
export interface LinkProps extends Omit<JSX.HTMLAttributes<HTMLAnchorElement>, 'class'> {
  /** Adres URL */
  href: string
  
  /** Zawartość linku */
  children: ComponentChildren
  
  /** Wariant stylu linku */
  variant?: 'default' | 'primary' | 'secondary' | 'muted' | 'danger'
  
  /** Rozmiar linku */
  size?: 'sm' | 'md' | 'lg'
  
  /** Czy link ma podkreślenie */
  underline?: 'none' | 'hover' | 'always'
  
  /** Czy otwierać w nowej karcie */
  external?: boolean
  
  /** Czy link jest wyłączony */
  disabled?: boolean
  
  /** Custom CSS class */
  class?: string
  
  /** Click handler (dla SPA routing) */
  onClick?: JSX.MouseEventHandler<HTMLAnchorElement>
}

/**
 * Uniwersalny link z pełną parametryzacją i accessibility
 * @example
 * <Link href="/about">About Us</Link>
 * <Link href="https://example.com" external>External Link</Link>
 * <Link href="/contact" variant="primary" size="lg">Contact</Link>
 */
export default function Link({ 
  href,
  children,
  variant = 'default',
  size = 'md',
  underline = 'hover',
  external = false,
  disabled = false,
  class: className,
  onClick,
  ...props 
}: LinkProps) {
  const baseClass = 'link'
  const variantClass = ` link-${variant}`
  const sizeClass = ` link-${size}`
  const underlineClass = ` link-underline-${underline}`
  const disabledClass = disabled ? ' link-disabled' : ''
  const externalClass = external ? ' link-external' : ''
  const customClass = className ? ` ${className}` : ''
  
  const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    
    if (onClick) {
      onClick(event)
    }
  }
  
  // Automatycznie dodaj external jeśli href zaczyna się od http
  const isExternalUrl = href.startsWith('http://') || href.startsWith('https://')
  const shouldOpenExternal = external || isExternalUrl
  
  return (
    <a
      href={disabled ? undefined : href}
      class={`${baseClass}${variantClass}${sizeClass}${underlineClass}${disabledClass}${externalClass}${customClass}`}
      target={shouldOpenExternal ? '_blank' : undefined}
      rel={shouldOpenExternal ? 'noopener noreferrer' : undefined}
      aria-disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
      {shouldOpenExternal && !disabled && (
        <span class="link-external-icon" aria-label="(opens in new tab)">
          ↗
        </span>
      )}
    </a>
  )
}

// Eksportuj typy dla dokumentacji
