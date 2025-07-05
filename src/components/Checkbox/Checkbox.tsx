import { JSX } from 'preact'
import { useRef, useEffect, useMemo } from 'preact/hooks'
import './Checkbox.css'

/**
 * Props dla komponentu Checkbox
 */
export interface CheckboxProps {
  /** Czy checkbox jest zaznaczony */
  checked?: boolean
  
  /** Stan indeterminate (częściowo zaznaczony) */
  indeterminate?: boolean
  
  /** Etykieta checkbox */
  label?: string
  
  /** Rozmiar checkbox */
  size?: 'sm' | 'md' | 'lg'
  
  /** Czy checkbox jest disabled */
  disabled?: boolean
  
  /** Czy pokazać błąd */
  error?: boolean
  
  /** Callback przy zmianie stanu */
  onChange?: (checked: boolean) => void
  
  /** ID dla accessibility */
  id?: string
  
  /** Name dla formularzy */
  name?: string
  
  /** Value dla formularzy */
  value?: string
  
  /** Custom aria-label */
  'aria-label'?: string
  
  /** Custom aria-describedby */
  'aria-describedby'?: string
}

/**
 * Checkbox - komponent wyboru opcji true/false/indeterminate
 * @example
 * <Checkbox label="Accept terms" onChange={(checked) => console.log(checked)} />
 * <Checkbox checked={true} label="Pre-checked option" />
 * <Checkbox indeterminate={true} label="Partially selected" />
 */
export default function Checkbox({ 
  checked = false,
  indeterminate = false,
  label,
  size = 'md', 
  disabled = false,
  error = false,
  onChange,
  id,
  name,
  value,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props 
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Stabilny ID - generuj tylko raz
  const inputId = useMemo(() => 
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`, 
    [id]
  )
  
  // Synchronizuj indeterminate state z DOM
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const handleChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      const newChecked = (event.target as HTMLInputElement).checked
      onChange(newChecked)
    }
  }
  
  const baseClass = 'checkbox'
  const sizeClass = ` checkbox-${size}`
  const errorClass = error ? ' checkbox-error' : ''
  const disabledClass = disabled ? ' checkbox-disabled' : ''
  
  return (
    <div 
      class={`${baseClass}${sizeClass}${errorClass}${disabledClass}`}
      {...props}
    >
      <div class="checkbox-container">
        <input
          ref={inputRef}
          type="checkbox"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          class="checkbox-input"
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
        />
        <div class="checkbox-visual">
          {indeterminate ? (
            <span class="checkbox-indeterminate" aria-hidden="true">−</span>
          ) : checked ? (
            <span class="checkbox-check" aria-hidden="true">✓</span>
          ) : null}
        </div>
      </div>
      
      {label && (
        <label 
          htmlFor={inputId} 
          class="checkbox-label"
        >
          {label}
        </label>
      )}
    </div>
  )
}
