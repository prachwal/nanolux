import { useState, useRef, useEffect } from 'preact/hooks'
import './Select.css'

/**
 * Opcja dla Select
 */
export interface SelectOption {
  /** Wartość opcji */
  value: string
  /** Etykieta opcji */
  label: string
  /** Czy opcja jest disabled */
  disabled?: boolean
}

/**
 * Props dla komponentu Select
 */
export interface SelectProps {
  /** Lista opcji do wyboru */
  options: SelectOption[]
  
  /** Aktualnie wybrana wartość */
  value?: string
  
  /** Placeholder gdy nic nie jest wybrane */
  placeholder?: string
  
  /** Rozmiar select */
  size?: 'sm' | 'md' | 'lg'
  
  /** Czy select jest disabled */
  disabled?: boolean
  
  /** Czy pokazać błąd */
  error?: boolean
  
  /** Callback przy zmianie wartości */
  onChange?: (value: string) => void
  
  /** Custom aria-label */
  'aria-label'?: string
}

/**
 * Select/Dropdown - komponent wyboru z listy opcji
 * @example
 * <Select 
 *   options={[{value: '1', label: 'Option 1'}]} 
 *   placeholder="Choose option"
 *   onChange={(value) => console.log(value)}
 * />
 */
export default function Select({ 
  options,
  value,
  placeholder = 'Select option...',
  size = 'md', 
  disabled = false,
  error = false,
  onChange,
  'aria-label': ariaLabel,
  ...props 
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  
  // Znajdź wybraną opcję
  const selectedOption = options.find(option => option.value === value)
  
  // Zamknij dropdown przy kliknięciu poza nim
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])
  
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }
  
  const handleOptionClick = (option: SelectOption) => {
    if (!option.disabled) {
      onChange?.(option.value)
      setIsOpen(false)
    }
  }
  
  const handleKeyDown = (event: KeyboardEvent) => {
    if (disabled) return
    
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        setIsOpen(!isOpen)
        break
      case 'Escape':
        setIsOpen(false)
        break
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          // Focus na pierwszą opcję
          const firstOption = selectRef.current?.querySelector('.select-option:not(.select-option-disabled)')
          if (firstOption) {
            (firstOption as HTMLElement).focus()
          }
        }
        break
    }
  }
  
  const baseClass = 'select'
  const sizeClass = ` select-${size}`
  const errorClass = error ? ' select-error' : ''
  const disabledClass = disabled ? ' select-disabled' : ''
  const openClass = isOpen ? ' select-open' : ''
  
  return (
    <div 
      ref={selectRef}
      class={`${baseClass}${sizeClass}${errorClass}${disabledClass}${openClass}`}
      {...props}
    >
      <button
        type="button"
        class="select-trigger"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <span class="select-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span class="select-arrow" aria-hidden="true">
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div class="select-dropdown" role="listbox">
          {options.map((option) => (
            <div
              key={option.value}
              class={`select-option${option.disabled ? ' select-option-disabled' : ''}${
                option.value === value ? ' select-option-selected' : ''
              }`}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleOptionClick(option)}
              tabIndex={option.disabled ? -1 : 0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handleOptionClick(option)
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}