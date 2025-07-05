interface ProgressBarProps {
  /** Aktualna wartość (0-100) */
  value: number
  /** Maksymalna wartość */
  max?: number
  /** Minimalna wartość */
  min?: number
  /** Wariant koloru */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  /** Rozmiar paska */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Czy pokazać etykietę z wartością */
  showLabel?: boolean
  /** Custom etykieta */
  label?: string
  /** Pozycja etykiety */
  labelPosition?: 'inside' | 'outside' | 'top' | 'bottom'
  /** Czy pasek ma być animowany */
  animated?: boolean
  /** Czy pasek ma być w paski */
  striped?: boolean
  /** Custom kolor tła */
  bg?: string
  /** Custom kolor paska */
  color?: string
  /** Kształt paska */
  shape?: 'rounded' | 'square'
  /** Custom klasa CSS */
  class?: string
}

/**
 * Pasek postępu do wizualizacji completion stanu
 * @example
 * <ProgressBar value={75} variant="success" showLabel />
 * <ProgressBar value={45} size="lg" animated striped />
 * <ProgressBar value={90} label="Upload complete" labelPosition="top" />
 */
export default function ProgressBar({
  value,
  max = 100,
  min = 0,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  label,
  labelPosition = 'inside',
  animated = false,
  striped = false,
  bg,
  color,
  shape = 'rounded',
  class: className = '',
  ...props
}: ProgressBarProps) {
  // Normalize value between min and max
  const normalizedValue = Math.max(min, Math.min(max, value))
  const percentage = ((normalizedValue - min) / (max - min)) * 100

  const progressClass = `progress progress-${size} progress-${shape}`
  const barClass = `progress-bar progress-bar-${variant}`
  const stripedClass = striped ? ' progress-bar-striped' : ''
  const animatedClass = animated ? ' progress-bar-animated' : ''
  
  const customStyle = bg || color ? 
    `${bg ? `--progress-bg: ${bg};` : ''} ${color ? `--progress-color: ${color};` : ''}` 
    : ''

  const displayLabel = label || (showLabel ? `${Math.round(percentage)}%` : '')

  const renderLabel = (position: string) => {
    if (!displayLabel || labelPosition !== position) return null
    
    return (
      <div class={`progress-label progress-label-${position}`}>
        {displayLabel}
      </div>
    )
  }

  return (
    <div class={`progress-container ${className}`} {...props}>
      {renderLabel('top')}
      
      <div 
        class={progressClass}
        style={customStyle}
        role="progressbar"
        aria-valuenow={normalizedValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label || `Progress: ${Math.round(percentage)}%`}
      >
        <div
          class={`${barClass}${stripedClass}${animatedClass}`}
          style={`width: ${percentage}%`}
        >
          {renderLabel('inside')}
        </div>
        {renderLabel('outside')}
      </div>
      
      {renderLabel('bottom')}
    </div>
  )
}

export type { ProgressBarProps }
