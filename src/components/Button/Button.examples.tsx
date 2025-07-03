// Button Examples - Simple documentation without Storybook dependency
import Button from './Button'

// Basic examples for documentation
export const buttonExamples = {
  Primary: {
    variant: 'primary' as const,
    children: 'Primary Button'
  },
  
  Secondary: {
    variant: 'secondary' as const,
    children: 'Secondary Button'
  },
  
  Danger: {
    variant: 'danger' as const,
    children: 'Danger Button'
  },
  
  Small: {
    variant: 'primary' as const,
    size: 'sm' as const,
    children: 'Small'
  },
  
  Large: {
    variant: 'primary' as const,
    size: 'lg' as const,
    children: 'Large'
  },
  
  CustomRed: {
    bg: '#ff6b6b',
    color: 'white',
    children: 'Custom Red'
  },
  
  CustomTeal: {
    bg: '#4ecdc4',
    color: 'white',
    children: 'Custom Teal'
  }
}

/**
 * Button sizes showcase
 */
export function ButtonSizesShowcase() {
  return (
    <div className="flex gap-12 items-center flex-wrap">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  )
}

/**
 * Button variants showcase
 */
export function ButtonVariantsShowcase() {
  return (
    <div className="flex gap-12 items-center flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  )
}

/**
 * Custom colors showcase
 */
export function ButtonCustomColorsShowcase() {
  return (
    <div className="flex gap-12 items-center flex-wrap">
      <Button bg="#ff6b6b" color="white">Custom Red</Button>
      <Button bg="#4ecdc4" color="white">Custom Teal</Button>
      <Button bg="#45b7d1" color="white">Custom Blue</Button>
    </div>
  )
}
