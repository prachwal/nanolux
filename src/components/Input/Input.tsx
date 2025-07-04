import { ComponentChildren, JSX } from 'preact'
import './Input.css'

interface InputProps extends Omit<JSX.HTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Typ inputu */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  /** Rozmiar inputu */
  size?: 'sm' | 'md' | 'lg'
  /** Czy input jest disabled */
  disabled?: boolean
  /** Czy input jest w stanie invalid */
  invalid?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Wartość inputu */
  value?: string
  /** Callback onChange */
  onChange?: JSX.GenericEventHandler<HTMLInputElement>
  /** Ikona prefiks */
  prefixIcon?: ComponentChildren
  /** Ikona sufiks */
  suffixIcon?: ComponentChildren
  /** Custom className */
  className?: string
}

/**
 * Uniwersalny input z pełną parametryzacją
 * @example
 * <Input type="email" placeholder="Enter email" />
 * <Input size="lg" prefixIcon="🔍" placeholder="Search..." />
 * <Input invalid suffixIcon="⚠️" placeholder="Invalid input" />
 */
export default function Input({ 
  type = 'text',
  size = 'md',
  disabled,
  invalid,
  placeholder,
  value,
  onChange,
  prefixIcon,
  suffixIcon,
  className = '',
  ...props 
}: InputProps) {
  const baseClass = `input input-${size}`
  const stateClass = invalid ? ' input-invalid' : ''
  const fullClass = className ? `${baseClass}${stateClass} ${className}` : `${baseClass}${stateClass}`
  
  const wrapperClass = `input-wrapper${prefixIcon ? ' has-prefix' : ''}${suffixIcon ? ' has-suffix' : ''}`
  
  return (
    <div class={wrapperClass}>
      {prefixIcon && <span class="input-prefix">{prefixIcon}</span>}
      <input 
        class={fullClass}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {suffixIcon && <span class="input-suffix">{suffixIcon}</span>}
    </div>
  )
}

export type { InputProps }
