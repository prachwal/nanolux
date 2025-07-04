import { ComponentChildren, JSX } from 'preact'
import './Button.css'

interface ButtonProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Wariant przycisku */
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
  /** Rozmiar przycisku */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Custom kolor tła */
  bg?: string
  /** Custom kolor tekstu */
  color?: string
  /** Czy przycisk jest disabled */
  disabled?: boolean
  /** Czy przycisk jest w stanie loading */
  loading?: boolean
  /** Ikona (opcjonalna) */
  icon?: ComponentChildren
  /** Zawartość przycisku */
  children: ComponentChildren
  /** Callback onClick */
  onClick?: (e: MouseEvent) => void
}

/**
 * Uniwersalny przycisk z pełną parametryzacją
 * @example
 * <Button variant="primary" size="lg">Click me</Button>
 * <Button bg="#ff6b6b" color="white">Custom</Button>
 * <Button variant="outline" icon="🔍">Search</Button>
 * <Button loading>Loading...</Button>
 */
export default function Button({ 
  variant, 
  size = 'md', 
  bg, 
  color, 
  disabled,
  loading,
  icon,
  children,
  onClick,
  ...props 
}: ButtonProps) {
  const baseClass = `btn btn-${size}`
  const variantClass = variant ? ` btn-${variant}` : ''
  const loadingClass = loading ? ' btn-loading' : ''
  
  // Build custom style string for CSS variables
  const customStyles: string[] = []
  if (bg) customStyles.push(`--btn-bg: ${bg}`)
  if (color) customStyles.push(`--btn-color: ${color}`)
  const customStyle = customStyles.length > 0 ? customStyles.join('; ') : undefined
  
  // Handle onClick properly with disabled state
  const handleClick = (e: MouseEvent) => {
    if (disabled || loading) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    if (onClick) {
      onClick(e)
    }
  }
  
  return (
    <button 
      class={baseClass + variantClass + loadingClass} 
      // @ts-ignore - Preact allows string styles
      style={customStyle}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && <span class="btn-spinner">⏳</span>}
      {icon && <span class="btn-icon">{icon}</span>}
      {/* @ts-ignore - Preact ComponentChildren compatibility */}
      <span class="btn-content">{children}</span>
    </button>
  )
}

export type { ButtonProps }
