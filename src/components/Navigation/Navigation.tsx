import { ComponentChildren, JSX } from 'preact'

/**
 * Interfejs dla pojedynczego linku w nawigacji
 */
export interface NavigationItem {
  /** Etykieta linku */
  label: string
  /** URL lub ścieżka */
  href?: string
  /** Czy link jest aktywny */
  active?: boolean
  /** Czy link jest wyłączony */
  disabled?: boolean
  /** Click handler dla SPA routing */
  onClick?: (event: Event) => void
}

/**
 * Props dla komponentu Navigation
 */
export interface NavigationProps {
  /** Lista elementów nawigacji */
  items?: NavigationItem[]
  
  /** Logo/brand element */
  brand?: ComponentChildren
  
  /** URL dla brand/logo */
  brandHref?: string
  
  /** Click handler dla brand */
  brandOnClick?: (event: Event) => void
  
  /** Dodatkowa zawartość po prawej stronie */
  actions?: ComponentChildren
  
  /** Wariant nawigacji */
  variant?: 'default' | 'dark' | 'transparent'
  
  /** Rozmiar nawigacji */
  size?: 'sm' | 'md' | 'lg'
  
  /** Czy nawigacja jest sticky */
  sticky?: boolean
  
  /** Custom CSS class */
  class?: string
  
  /** Dodatkowa zawartość nawigacji */
  children?: ComponentChildren
}

/**
 * Komponent Navigation/Header z responsive design i accessibility
 * @example
 * <Navigation 
 *   brand={<Logo />}
 *   items={[
 *     { label: 'Home', href: '/', active: true },
 *     { label: 'About', href: '/about' },
 *     { label: 'Contact', href: '/contact' }
 *   ]}
 *   actions={<Button>Sign In</Button>}
 * />
 */
export default function Navigation({ 
  items = [],
  brand,
  brandHref,
  brandOnClick,
  actions,
  variant = 'default',
  size = 'md',
  sticky = false,
  class: className,
  children,
  ...props 
}: NavigationProps) {
  const baseClass = 'navigation'
  const variantClass = ` navigation-${variant}`
  const sizeClass = ` navigation-${size}`
  const stickyClass = sticky ? ' navigation-sticky' : ''
  const customClass = className ? ` ${className}` : ''
  
  const handleBrandClick = (event: Event) => {
    if (brandOnClick) {
      event.preventDefault()
      brandOnClick(event)
    }
  }
  
  const handleItemClick = (item: NavigationItem) => (event: Event) => {
    if (item.disabled) {
      event.preventDefault()
      return
    }
    
    if (item.onClick) {
      event.preventDefault()
      item.onClick(event)
    }
  }
  
  return (
    <nav 
      class={`${baseClass}${variantClass}${sizeClass}${stickyClass}${customClass}`}
      role="navigation"
      aria-label="Main navigation"
      {...props}
    >
      <div class="navigation-container">
        {/* Brand/Logo */}
        {brand && (
          <div class="navigation-brand">
            {brandHref || brandOnClick ? (
              <a 
                href={brandHref}
                onClick={brandOnClick ? handleBrandClick : undefined}
                class="navigation-brand-link"
              >
                {brand}
              </a>
            ) : (
              <div class="navigation-brand-content">
                {brand}
              </div>
            )}
          </div>
        )}
        
        {/* Navigation Items */}
        {items.length > 0 && (
          <ul class="navigation-list">
            {items.map((item, index) => (
              <li 
                key={index} 
                class={`navigation-item${item.active ? ' navigation-item-active' : ''}${item.disabled ? ' navigation-item-disabled' : ''}`}
              >
                {item.href || item.onClick ? (
                  <a
                    href={item.disabled ? undefined : item.href}
                    onClick={item.onClick ? handleItemClick(item) : undefined}
                    class="navigation-link"
                    aria-current={item.active ? 'page' : undefined}
                    aria-disabled={item.disabled}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span class="navigation-text">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        
        {/* Custom Children */}
        {children && (
          <div class="navigation-content">
            {children}
          </div>
        )}
        
        {/* Actions */}
        {actions && (
          <div class="navigation-actions">
            {actions}
          </div>
        )}
      </div>
    </nav>
  )
}

// Eksportuj typy dla dokumentacji
export type { NavigationProps, NavigationItem }
