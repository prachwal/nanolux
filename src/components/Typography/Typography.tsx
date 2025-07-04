import { ComponentChildren, JSX } from 'preact'
import './Typography.css'

interface HeadingProps extends Omit<JSX.HTMLAttributes<HTMLHeadingElement>, 'class'> {
  /** Poziom nagłówka */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Rozmiar tekstu */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  /** Kolor tekstu */
  color?: string
  /** Czy tekst ma być wycentrowany */
  center?: boolean
  /** Zawartość */
  children: ComponentChildren
  /** Custom className */
  className?: string
}

interface TextProps extends Omit<JSX.HTMLAttributes<HTMLParagraphElement>, 'class'> {
  /** Rozmiar tekstu */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  /** Waga fontu */
  weight?: 'normal' | 'medium' | 'bold'
  /** Kolor tekstu */
  color?: string
  /** Czy tekst ma być wycentrowany */
  center?: boolean
  /** Czy tekst ma być wyciszony */
  muted?: boolean
  /** Zawartość */
  children: ComponentChildren
  /** Custom className */
  className?: string
}

/**
 * Uniwersalny nagłówek z atomic CSS
 * @example
 * <Heading level={1} size="3xl">Main Title</Heading>
 * <Heading level={2} color="#007bff">Subtitle</Heading>
 */
export function Heading({ 
  level = 1,
  size,
  color,
  center,
  children,
  className = '',
  ...props 
}: HeadingProps) {
  // Default sizes based on level if not specified
  const defaultSizes = {
    1: '3xl',
    2: '2xl', 
    3: 'xl',
    4: 'lg',
    5: 'base',
    6: 'sm'
  }
  
  const finalSize = size || defaultSizes[level]
  const sizeClass = `text-${finalSize}`
  const alignClass = center ? 'text-center' : ''
  const weightClass = level <= 2 ? 'font-bold' : 'font-medium'
  
  const classes = [
    'heading',
    sizeClass,
    weightClass,
    alignClass,
    className
  ].filter(Boolean).join(' ')
  
  const customStyle = color ? `color: ${color}` : undefined
  
  // Render appropriate heading element
  const commonProps = {
    class: classes,
    style: customStyle,
    ...props
  }
  
  switch (level) {
    case 1: return <h1 {...commonProps}>{children}</h1>
    case 2: return <h2 {...commonProps}>{children}</h2>
    case 3: return <h3 {...commonProps}>{children}</h3>
    case 4: return <h4 {...commonProps}>{children}</h4>
    case 5: return <h5 {...commonProps}>{children}</h5>
    case 6: return <h6 {...commonProps}>{children}</h6>
    default: return <h1 {...commonProps}>{children}</h1>
  }
}

/**
 * Uniwersalny tekst paragrafowy z atomic CSS
 * @example
 * <Text size="lg" weight="medium">Important text</Text>
 * <Text muted>Secondary text</Text>
 */
export function Text({ 
  size = 'base',
  weight = 'normal',
  color,
  center,
  muted,
  children,
  className = '',
  ...props 
}: TextProps) {
  const sizeClass = `text-${size}`
  const weightClass = `font-${weight}`
  const alignClass = center ? 'text-center' : ''
  const mutedClass = muted ? 'text-muted' : ''
  
  const classes = [
    'text',
    sizeClass,
    weightClass,
    alignClass,
    mutedClass,
    className
  ].filter(Boolean).join(' ')
  
  const customStyle = color ? `color: ${color}` : undefined
  
  return (
    <p 
      class={classes}
      style={customStyle}
      {...props}
    >
      {children}
    </p>
  )
}

export type { HeadingProps, TextProps }
