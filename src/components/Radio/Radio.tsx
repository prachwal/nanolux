import { JSX } from 'preact'

/**
 * Props dla komponentu Radio
 */
export interface RadioProps {
  /** Etykieta przycisku radio */
  label: string
  
  /** Wartość przycisku radio */
  value: string
  
  /** Nazwa grupy (wymagane dla radio buttons) */
  name: string
  
  /** Czy przycisk jest zaznaczony */
  checked?: boolean
  
  /** Wartość domyślnie zaznaczona */
  defaultChecked?: boolean
  
  /** Czy przycisk jest wyłączony */
  disabled?: boolean
  
  /** Rozmiar przycisku */
  size?: 'sm' | 'md' | 'lg'
  
  /** Custom CSS class */
  class?: string
  
  /** Callback wywoływany przy zmianie */
  onChange?: JSX.ChangeEventHandler<HTMLInputElement>
  
  /** ID dla accessibility */
  id?: string
}

/**
 * Radio button z pełną kontrolą i accessibility
 * @example
 * <Radio name="gender" value="male" label="Male" />
 * <Radio name="gender" value="female" label="Female" checked />
 * <Radio name="size" value="lg" label="Large" size="lg" />
 */
export default function Radio({ 
  label,
  value,
  name,
  checked,
  defaultChecked,
  disabled = false,
  size = 'md',
  class: className,
  onChange,
  id,
  ...props 
}: RadioProps) {
  // Generuj ID jeśli nie podano
  const radioId = id || `radio-${name}-${value}`
  
  const baseClass = 'radio'
  const sizeClass = ` radio-${size}`
  const disabledClass = disabled ? ' radio-disabled' : ''
  const customClass = className ? ` ${className}` : ''
  
  return (
    <div class={`${baseClass}${sizeClass}${disabledClass}${customClass}`}>
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        class="radio-input"
        {...props}
      />
      <label 
        htmlFor={radioId}
        class="radio-label"
      >
        <span class="radio-indicator" aria-hidden="true"></span>
        <span class="radio-text">{label}</span>
      </label>
    </div>
  )
}

// Eksportuj typy dla dokumentacji
export type { RadioProps }
