import { useState } from 'preact/hooks'
import { Button } from '../../components'
import './CounterDemo.css'

interface CounterDemoProps {
  /** Wartość początkowa licznika */
  initialValue?: number
  /** Dodatkowe klasy CSS */
  className?: string
}

export type { CounterDemoProps }

/**
 * Demo komponentu z licznikiem
 * @example
 * <CounterDemo initialValue={10} />
 */
export default function CounterDemo({ 
  initialValue = 0,
  className = '',
  ...props 
}: CounterDemoProps) {
  const [count, setCount] = useState(initialValue)
  
  const demoClass = `counter-demo ${className}`.trim()
  
  return (
    <div className={demoClass} {...props}>
      <h3 className="counter-demo-title">🎛️ Demo komponentów NanoLux</h3>
      
      <div className="counter-demo-buttons">
        <Button variant="primary" onClick={() => setCount((count) => count + 1)}>
          Count: {count}
        </Button>
        <Button variant="secondary" onClick={() => setCount(initialValue)}>
          Reset
        </Button>
        <Button variant="danger" onClick={() => setCount(count - 1)}>
          Decrease
        </Button>
      </div>
    </div>
  )
}
