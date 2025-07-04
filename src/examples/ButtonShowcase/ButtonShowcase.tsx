import { Button } from '../../components'
import { JSX } from 'preact'
import './ButtonShowcase.css'

interface ButtonShowcaseProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'> {
  /** Tytuł sekcji */
  title?: string
  /** Dodatkowe klasy CSS */
  className?: string
}

export type { ButtonShowcaseProps }

/**
 * Showcase różnych wariantów przycisków
 * @example
 * <ButtonShowcase title="Button Sizes" />
 */
export default function ButtonShowcase({ 
  title = 'Button Showcase',
  className = '',
  ...props 
}: ButtonShowcaseProps) {
  const showcaseClass = `button-showcase ${className}`.trim()
  
  return (
    <div className={showcaseClass} {...props}>
      {title && <h4 className="button-showcase-title">{title}</h4>}
      
      <div className="button-showcase-section">
        <h5 className="button-showcase-subtitle">Rozmiary</h5>
        <div className="button-showcase-group">
          <Button size="sm" variant="primary">Small</Button>
          <Button size="md" variant="primary">Medium</Button>
          <Button size="lg" variant="primary">Large</Button>
        </div>
      </div>
      
      <div className="button-showcase-section">
        <h5 className="button-showcase-subtitle">Kolory niestandardowe</h5>
        <div className="button-showcase-group">
          <Button bg="#ff6b6b" color="white">Custom Red</Button>
          <Button bg="#4ecdc4" color="white">Custom Teal</Button>
          <Button bg="#45b7d1" color="white">Custom Blue</Button>
        </div>
      </div>
    </div>
  )
}
