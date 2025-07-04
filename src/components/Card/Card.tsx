import { ComponentChildren, JSX } from 'preact'
import './Card.css'

interface CardProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'> {
  /** Wariant karty */
  variant?: 'default' | 'elevated' | 'outlined'
  /** Padding wewnętrzny */
  padding?: 'sm' | 'md' | 'lg'
  /** Custom kolor tła */
  bg?: string
  /** Custom kolor obramowania */
  borderColor?: string
  /** Zawartość karty */
  children?: ComponentChildren
  /** Custom className */
  className?: string
}

/**
 * Uniwersalna karta z pełną parametryzacją
 * @example
 * <Card variant="elevated" padding="lg">Content</Card>
 * <Card bg="#f8f9fa" borderColor="#dee2e6">Custom Card</Card>
 */
export default function Card({ 
  variant = 'default',
  padding = 'md',
  bg,
  borderColor,
  children,
  className = '',
  ...props 
}: CardProps) {
  const baseClass = `card card-${variant} card-${padding}`
  const fullClass = className ? `${baseClass} ${className}` : baseClass
  
  // Build custom style string for CSS variables
  const customStyles: string[] = []
  if (bg) customStyles.push(`--card-bg: ${bg}`)
  if (borderColor) customStyles.push(`--card-border-color: ${borderColor}`)
  const customStyle = customStyles.length > 0 ? customStyles.join('; ') : undefined
  
  return (
    <div 
      class={fullClass} 
      // @ts-ignore - Preact allows string styles
      style={customStyle}
      {...props}
    >
      {/* @ts-ignore - Preact ComponentChildren compatibility */}
      {children}
    </div>
  )
}

export type { CardProps }
