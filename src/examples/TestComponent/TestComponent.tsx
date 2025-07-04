import { ComponentChildren, JSX } from 'preact'

/**
 * Props dla komponentu TestComponent
 */
export interface TestComponentProps {
  /** Wariant komponentu */
  variant?: 'default' | 'primary' | 'secondary'
  
  /** Rozmiar komponentu */
  size?: 'sm' | 'md' | 'lg'
  
  /** Czy komponent jest disabled */
  disabled?: boolean
  
  /** Zawartość komponentu */
  children: ComponentChildren
  
  /** Custom CSS class */
  class?: string
  
  /** Click handler */
  onClick?: JSX.MouseEventHandler<HTMLDivElement>
}

/**
 * TestComponent component
 * @example
 * <TestComponent variant="primary" size="lg">Content</TestComponent>
 */
export default function TestComponent({ 
  variant = 'default',
  size = 'md',
  disabled = false,
  children,
  class: className,
  onClick,
  ...props 
}: TestComponentProps) {
  const componentName = 'testcomponent'
  const classes = [
    'testcomponent',
    `${componentName.toLowerCase()}-${size}`,
    variant !== 'default' && `${componentName.toLowerCase()}-${variant}`,
    disabled && `${componentName.toLowerCase()}-disabled`,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <div 
      class={classes}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </div>
  )
}