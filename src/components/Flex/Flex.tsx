import { ComponentChildren, JSX } from 'preact'

interface FlexProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'> {
  /** Kierunek flex */
  direction?: 'row' | 'column'
  /** Alignment items */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  /** Gap między elementami */
  gap?: 4 | 8 | 12 | 16 | 20 | 24
  /** Czy ma wrap */
  wrap?: boolean
  /** Zawartość */
  children: ComponentChildren
  /** Custom className */
  className?: string
}

/**
 * Uniwersalny Flex container z atomic CSS
 * @example
 * <Flex direction="row" align="center" gap={12}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 */
export default function Flex({ 
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 8,
  wrap = false,
  children,
  className = '',
  ...props 
}: FlexProps) {
  const directionClass = direction === 'column' ? 'flex-col' : 'flex-row'
  const alignClass = `items-${align}`
  const justifyClass = `justify-${justify}`
  const gapClass = `gap-${gap}`
  const wrapClass = wrap ? 'flex-wrap' : ''
  
  const classes = [
    'flex',
    directionClass,
    alignClass,
    justifyClass,
    gapClass,
    wrapClass,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <div class={classes} {...props}>
      {children}
    </div>
  )
}

export type { FlexProps }
