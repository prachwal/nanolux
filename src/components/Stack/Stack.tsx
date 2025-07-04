import { ComponentChildren, JSX } from 'preact'

interface StackProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'> {
  /** Kierunek stackowania */
  direction?: 'vertical' | 'horizontal'
  /** Spacing między elementami */
  spacing?: 4 | 8 | 12 | 16 | 20 | 24
  /** Alignment elementów */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Zawartość */
  children: ComponentChildren
  /** Custom className */
  className?: string
}

/**
 * Stack - prosty layout do układania elementów w pionie lub poziomie
 * @example
 * <Stack spacing={12}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 */
export default function Stack({ 
  direction = 'vertical',
  spacing = 12,
  align = 'stretch',
  children,
  className = '',
  ...props 
}: StackProps) {
  const isVertical = direction === 'vertical'
  const directionClass = isVertical ? 'flex-col' : 'flex-row'
  const alignClass = `items-${align}`
  const gapClass = `gap-${spacing}`
  
  const classes = [
    'flex',
    directionClass,
    alignClass,
    gapClass,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <div class={classes} {...props}>
      {children}
    </div>
  )
}

export type { StackProps }
