import { ComponentChildren } from 'preact'
import { useState } from 'preact/hooks'
import './Accordion.css'

interface AccordionItemProps {
  /** Unikalny identyfikator elementu */
  id: string
  /** Nagłówek elementu */
  title: string
  /** Zawartość elementu */
  children: ComponentChildren
  /** Czy element jest domyślnie otwarty */
  defaultOpen?: boolean
  /** Czy element jest disabled */
  disabled?: boolean
  /** Ikona do wyświetlenia */
  icon?: ComponentChildren
}

interface AccordionProps {
  /** Elementy akordeonu */
  children: ComponentChildren
  /** Czy może być otwartych więcej elementów na raz */
  multiple?: boolean
  /** Wariant akordeonu */
  variant?: 'default' | 'bordered' | 'filled'
  /** Rozmiar akordeonu */
  size?: 'sm' | 'md' | 'lg'
  /** Callback przy zmianie stanu */
  onChange?: (openItems: string[]) => void
  /** Custom klasa CSS */
  class?: string
}

/**
 * Element akordeonu
 */
export function AccordionItem({ 
  id, 
  title, 
  children, 
  defaultOpen = false, 
  disabled = false,
  icon
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  const toggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }
  
  return (
    <div class={`accordion-item ${isOpen ? 'accordion-item-open' : ''} ${disabled ? 'accordion-item-disabled' : ''}`}>
      <button
        type="button"
        class="accordion-header"
        onClick={toggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
      >
        {icon && <span class="accordion-icon">{icon}</span>}
        <span class="accordion-title">{title}</span>
        <span class={`accordion-chevron ${isOpen ? 'open' : ''}`}>
          ▼
        </span>
      </button>
      <div
        id={`accordion-content-${id}`}
        class={`accordion-content ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div class="accordion-body">
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * Kolapsujący kontener dla grupowanych treści
 * @example
 * <Accordion>
 *   <AccordionItem id="1" title="Sekcja 1">
 *     Zawartość sekcji 1
 *   </AccordionItem>
 *   <AccordionItem id="2" title="Sekcja 2">
 *     Zawartość sekcji 2
 *   </AccordionItem>
 * </Accordion>
 */
export default function Accordion({
  children,
  multiple = false,
  variant = 'default',
  size = 'md',
  onChange,
  class: className = '',
  ...props
}: AccordionProps) {
  const accordionClass = `accordion accordion-${variant} accordion-${size}`
  
  return (
    <div class={`${accordionClass} ${className}`} {...props}>
      {children}
    </div>
  )
}

export type { AccordionProps, AccordionItemProps }
