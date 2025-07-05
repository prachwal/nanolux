import { ComponentChildren, JSX } from 'preact'
import { useState, useRef, useEffect } from 'preact/hooks'
import './Tooltip.css'

interface TooltipProps {
  /** Tekst tooltipa */
  content: string
  /** Pozycja tooltipa względem elementu */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Trigger tooltipa */
  trigger?: 'hover' | 'click' | 'focus'
  /** Opóźnienie pokazania (ms) */
  delay?: number
  /** Czy tooltip jest disabled */
  disabled?: boolean
  /** Element który ma tooltip */
  children: ComponentChildren
  /** Custom klasy CSS */
  className?: string
  /** Maksymalna szerokość tooltipa */
  maxWidth?: string
}

/**
 * Tooltip component z pozycjonowaniem i accessibility
 * @example
 * <Tooltip content="To jest tooltip">
 *   <button>Hover me</button>
 * </Tooltip>
 */
export default function Tooltip({
  content,
  placement = 'top',
  trigger = 'hover',
  delay = 200,
  disabled = false,
  children,
  className = '',
  maxWidth = '250px',
  ...props
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)

  const showTooltip = () => {
    if (disabled) return
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true)
      updatePosition()
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    
    let top = 0
    let left = 0

    switch (placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + 8
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left - tooltipRect.width - 8
        break
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + 8
        break
    }

    // Keep tooltip within viewport
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    if (left < 8) left = 8
    if (left + tooltipRect.width > viewportWidth - 8) {
      left = viewportWidth - tooltipRect.width - 8
    }
    if (top < 8) top = 8
    if (top + tooltipRect.height > viewportHeight - 8) {
      top = viewportHeight - tooltipRect.height - 8
    }

    setPosition({ top, left })
  }

  useEffect(() => {
    if (isVisible) {
      updatePosition()
      
      const handleResize = () => updatePosition()
      const handleScroll = () => updatePosition()
      
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isVisible])

  const triggerProps: Record<string, any> = {}

  if (trigger === 'hover') {
    triggerProps.onMouseEnter = showTooltip
    triggerProps.onMouseLeave = hideTooltip
  } else if (trigger === 'click') {
    triggerProps.onClick = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (isVisible) {
        hideTooltip()
      } else {
        showTooltip()
      }
    }
  } else if (trigger === 'focus') {
    triggerProps.onFocus = showTooltip
    triggerProps.onBlur = hideTooltip
  }

  return (
    <>
      <div
        ref={triggerRef}
        class={`tooltip-trigger ${className}`}
        {...triggerProps}
        {...props}
      >
        {children}
      </div>
      
      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          class={`tooltip tooltip-${placement}`}
          style={{
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            maxWidth,
            zIndex: 9999
          }}
          role="tooltip"
        >
          {content}
          <div class="tooltip-arrow" />
        </div>
      )}
    </>
  )
}

export type { TooltipProps }
