import { ComponentChildren } from 'preact'
import './Button.css'

interface ButtonProps {
  /** Wariant przycisku */
  variant?: 'primary' | 'secondary' | 'danger'
  /** Rozmiar przycisku */
  size?: 'sm' | 'md' | 'lg'
  /** Custom kolor tła */
  bg?: string
  /** Custom kolor tekstu */
  color?: string
  /** Czy przycisk jest disabled */
  disabled?: boolean
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
 */
export default function Button({ 
  variant, 
  size = 'md', 
  bg, 
  color, 
  disabled,
  children, 
  ...props 
}: ButtonProps) {
  const baseClass = `btn btn-${size}`
  const variantClass = variant ? ` btn-${variant}` : ''
  
  // Build custom style string for CSS variables
  const customStyles: string[] = []
  if (bg) customStyles.push(`--btn-bg: ${bg}`)
  if (color) customStyles.push(`--btn-color: ${color}`)
  const customStyle = customStyles.length > 0 ? customStyles.join('; ') : undefined
  
  return (
    <button 
      class={baseClass + variantClass} 
      // @ts-ignore - Preact allows string styles
      style={customStyle}
      disabled={disabled}
      {...props}
    >
      {/* @ts-ignore - Preact ComponentChildren compatibility */}
      {children}
    </button>
  )
}

export type { ButtonProps }
