import { JSX } from 'preact'
import './FeatureList.css'

interface FeatureItem {
  /** Ikona lub emoji */
  icon: string
  /** Tekst funkcjonalności */
  text: string
}

interface FeatureListProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'class'> {
  /** Lista funkcjonalności */
  features: FeatureItem[]
  /** Tytuł sekcji */
  title?: string
  /** Dodatkowe klasy CSS */
  className?: string
}

export type { FeatureListProps, FeatureItem }

/**
 * Lista funkcjonalności z ikonami
 * @example
 * <FeatureList 
 *   title="Features" 
 *   features={[
 *     { icon: '📦', text: 'Ultra-małe bundly' },
 *     { icon: '🎨', text: 'CSS Variables' }
 *   ]}
 * />
 */
export default function FeatureList({ 
  features,
  title = '✨ Funkcje NanoLux',
  className = '',
  ...props 
}: FeatureListProps) {
  const listClass = `feature-list ${className}`.trim()
  
  return (
    <div className={listClass} {...props}>
      {title && <h4 className="feature-list-title">{title}</h4>}
      
      <ul className="feature-list-items">
        {features.map((feature, index) => (
          <li key={index} className="feature-list-item">
            <span className="feature-list-icon">{feature.icon}</span>
            <span className="feature-list-text">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
