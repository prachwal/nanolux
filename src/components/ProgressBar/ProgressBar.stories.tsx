import ProgressBar from './ProgressBar'
import { expect } from '@storybook/test'
import { within } from '@storybook/testing-library'
import { useState, useEffect } from 'preact/hooks'

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: 'Pasek postępu do wizualizacji stanu ukończenia zadań'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info']
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg']
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['inside', 'outside', 'top', 'bottom']
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'square']
    }
  }
}

export const Default = {
  args: {
    value: 65,
    variant: 'primary',
    showLabel: true
  }
}

export const AllVariants = {
  render: () => (
    <div class="flex flex-col gap-12">
      <ProgressBar value={85} variant="primary" showLabel label="Primary Progress" labelPosition="top" />
      <ProgressBar value={70} variant="secondary" showLabel label="Secondary Progress" labelPosition="top" />
      <ProgressBar value={95} variant="success" showLabel label="Success Progress" labelPosition="top" />
      <ProgressBar value={45} variant="warning" showLabel label="Warning Progress" labelPosition="top" />
      <ProgressBar value={25} variant="danger" showLabel label="Danger Progress" labelPosition="top" />
      <ProgressBar value={60} variant="info" showLabel label="Info Progress" labelPosition="top" />
    </div>
  )
}

export const AllSizes = {
  render: () => (
    <div class="flex flex-col gap-12">
      <div>
        <div class="mb-4 text-sm">Extra Small (xs)</div>
        <ProgressBar value={75} variant="primary" size="xs" showLabel />
      </div>
      <div>
        <div class="mb-4 text-sm">Small (sm)</div>
        <ProgressBar value={75} variant="primary" size="sm" showLabel />
      </div>
      <div>
        <div class="mb-4 text-sm">Medium (md)</div>
        <ProgressBar value={75} variant="primary" size="md" showLabel />
      </div>
      <div>
        <div class="mb-4 text-sm">Large (lg)</div>
        <ProgressBar value={75} variant="primary" size="lg" showLabel />
      </div>
    </div>
  )
}

export const WithLabels = {
  render: () => (
    <div class="flex flex-col gap-16">
      <div>
        <h3 class="mb-8">Label Positions</h3>
        <div class="flex flex-col gap-12">
          <ProgressBar value={75} variant="primary" label="Top Label" labelPosition="top" />
          <ProgressBar value={65} variant="success" label="Bottom Label" labelPosition="bottom" />
          <ProgressBar value={85} variant="warning" label="Inside Label" labelPosition="inside" />
          <ProgressBar value={55} variant="info" label="Outside Label" labelPosition="outside" />
        </div>
      </div>
      
      <div>
        <h3 class="mb-8">Custom Labels</h3>
        <div class="flex flex-col gap-12">
          <ProgressBar value={80} variant="success" label="8/10 Tasks Complete" labelPosition="top" />
          <ProgressBar value={45} variant="warning" label="45% Downloaded" labelPosition="bottom" />
          <ProgressBar value={90} variant="primary" label="90%" labelPosition="inside" size="lg" />
        </div>
      </div>
    </div>
  )
}

export const StripedAndAnimated = {
  render: () => (
    <div class="flex flex-col gap-12">
      <div>
        <div class="mb-4 text-sm">Striped</div>
        <ProgressBar value={70} variant="primary" striped showLabel />
      </div>
      <div>
        <div class="mb-4 text-sm">Animated</div>
        <ProgressBar value={55} variant="success" animated showLabel />
      </div>
      <div>
        <div class="mb-4 text-sm">Striped + Animated</div>
        <ProgressBar value={85} variant="warning" striped animated showLabel />
      </div>
      <div>
        <div class="mb-4 text-sm">Large Animated</div>
        <ProgressBar value={60} variant="info" striped animated showLabel size="lg" />
      </div>
    </div>
  )
}

export const DifferentShapes = {
  render: () => (
    <div class="flex flex-col gap-12">
      <div>
        <div class="mb-4 text-sm">Rounded (default)</div>
        <ProgressBar value={75} variant="primary" shape="rounded" showLabel />
      </div>
      <div>
        <div class="mb-4 text-sm">Square</div>
        <ProgressBar value={75} variant="success" shape="square" showLabel />
      </div>
    </div>
  )
}

export const CustomColors = {
  render: () => (
    <div class="flex flex-col gap-12">
      <ProgressBar value={75} bg="#f0f0f0" color="#ff6b6b" showLabel label="Custom Red" labelPosition="top" />
      <ProgressBar value={60} bg="#e8f5e8" color="#4ecdc4" showLabel label="Custom Teal" labelPosition="top" />
      <ProgressBar value={85} bg="#e8f4fd" color="#45b7d1" showLabel label="Custom Blue" labelPosition="top" />
      <ProgressBar value={40} bg="#fff5e6" color="#f39c12" showLabel label="Custom Orange" labelPosition="top" />
    </div>
  )
}

export const PracticalExamples = {
  render: () => (
    <div class="flex flex-col gap-20">
      <div>
        <h3 class="mb-12">File Upload Progress</h3>
        <div class="flex flex-col gap-8">
          <ProgressBar 
            value={85} 
            variant="primary" 
            label="document.pdf (850KB / 1MB)"
            labelPosition="top"
            size="md"
          />
          <ProgressBar 
            value={45} 
            variant="info" 
            label="image.jpg (225KB / 500KB)"
            labelPosition="top"
            size="md"
          />
          <ProgressBar 
            value={100} 
            variant="success" 
            label="video.mp4 - Complete!"
            labelPosition="top"
            size="md"
          />
        </div>
      </div>
      
      <div>
        <h3 class="mb-12">Skills Progress</h3>
        <div class="flex flex-col gap-8">
          <ProgressBar value={90} variant="success" label="JavaScript" labelPosition="outside" />
          <ProgressBar value={75} variant="primary" label="TypeScript" labelPosition="outside" />
          <ProgressBar value={85} variant="info" label="Preact/React" labelPosition="outside" />
          <ProgressBar value={60} variant="warning" label="Node.js" labelPosition="outside" />
          <ProgressBar value={40} variant="secondary" label="Python" labelPosition="outside" />
        </div>
      </div>
      
      <div>
        <h3 class="mb-12">System Status</h3>
        <div class="flex flex-col gap-8">
          <ProgressBar value={25} variant="danger" label="CPU Usage" labelPosition="top" striped />
          <ProgressBar value={70} variant="warning" label="Memory Usage" labelPosition="top" striped />
          <ProgressBar value={45} variant="success" label="Disk Usage" labelPosition="top" striped />
          <ProgressBar value={95} variant="info" label="Network Usage" labelPosition="top" striped />
        </div>
      </div>
    </div>
  )
}

export const AnimatedDemo = {
  render: () => {
    const [progress, setProgress] = useState(0)
    
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0
          return prev + 1
        })
      }, 100)
      
      return () => clearInterval(interval)
    }, [])
    
    return (
      <div class="flex flex-col gap-12">
        <div>
          <div class="mb-4 text-sm">Auto-incrementing Progress</div>
          <ProgressBar 
            value={progress} 
            variant="primary" 
            showLabel 
            animated 
            striped 
            size="lg"
          />
        </div>
        
        <div>
          <div class="mb-4 text-sm">Different Style</div>
          <ProgressBar 
            value={progress} 
            variant="success" 
            label={`Loading... ${progress}%`}
            labelPosition="top"
            animated
          />
        </div>
      </div>
    )
  }
}

// Interactive test story
export const InteractiveTest = {
  args: {
    value: 75,
    variant: 'primary',
    showLabel: true,
    size: 'md'
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: progress bar is rendered
    const progressBar = canvasElement.querySelector('.progress')
    await expect(progressBar).toBeInTheDocument()
    
    // Test: progress bar has correct aria attributes
    await expect(progressBar).toHaveAttribute('role', 'progressbar')
    await expect(progressBar).toHaveAttribute('aria-valuenow', '75')
    await expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    await expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    
    // Test: progress bar has correct classes
    await expect(progressBar).toHaveClass('progress', 'progress-md')
    
    // Test: progress bar fill
    const progressBarFill = canvasElement.querySelector('.progress-bar')
    await expect(progressBarFill).toBeInTheDocument()
    await expect(progressBarFill).toHaveClass('progress-bar-primary')
    
    // Test: label is displayed
    const label = canvas.getByText('75%')
    await expect(label).toBeInTheDocument()
  }
}

// Debug story z pełnym logowaniem
export const DebugMode = {
  render: () => {
    const [value, setValue] = useState(50)
    const [max, setMax] = useState(100)
    const [min, setMin] = useState(0)
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>('primary')
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('md')
    const [showLabel, setShowLabel] = useState(true)
    const [labelPosition, setLabelPosition] = useState<'inside' | 'outside' | 'top' | 'bottom'>('inside')
    const [animated, setAnimated] = useState(false)
    const [striped, setStriped] = useState(false)
    const [shape, setShape] = useState<'rounded' | 'square'>('rounded')
    const [events, setEvents] = useState<string[]>([])
    const [renderCount, setRenderCount] = useState(0)
    
    // Track renders
    useEffect(() => {
      setRenderCount(prev => prev + 1)
      addEvent(`ProgressBar rendered (render #${renderCount + 1})`)
    })
    
    const addEvent = (event: string) => {
      const timestamp = new Date().toLocaleTimeString()
      setEvents(prev => [...prev.slice(-9), `[${timestamp}] ${event}`])
    }
    
    const handleValueChange = (newValue: number) => {
      addEvent(`Value changed: ${value} → ${newValue} (${((newValue - min) / (max - min) * 100).toFixed(1)}%)`)
      setValue(newValue)
    }
    
    const handleMaxChange = (newMax: number) => {
      addEvent(`Max changed: ${max} → ${newMax}`)
      setMax(newMax)
    }
    
    const handleMinChange = (newMin: number) => {
      addEvent(`Min changed: ${min} → ${newMin}`)
      setMin(newMin)
    }
    
    const handleVariantChange = (newVariant: typeof variant) => {
      addEvent(`Variant changed: ${variant} → ${newVariant}`)
      setVariant(newVariant)
    }
    
    const handleSizeChange = (newSize: typeof size) => {
      addEvent(`Size changed: ${size} → ${newSize}`)
      setSize(newSize)
    }
    
    const handleAnimatedToggle = () => {
      addEvent(`Animation toggled: ${animated} → ${!animated}`)
      setAnimated(!animated)
    }
    
    const handleStripedToggle = () => {
      addEvent(`Striped toggled: ${striped} → ${!striped}`)
      setStriped(!striped)
    }
    
    const handleShapeChange = (newShape: typeof shape) => {
      addEvent(`Shape changed: ${shape} → ${newShape}`)
      setShape(newShape)
    }
    
    const handleLabelToggle = () => {
      addEvent(`Label display toggled: ${showLabel} → ${!showLabel}`)
      setShowLabel(!showLabel)
    }
    
    const handleLabelPositionChange = (newPosition: typeof labelPosition) => {
      addEvent(`Label position changed: ${labelPosition} → ${newPosition}`)
      setLabelPosition(newPosition)
    }
    
    const handleManualEvent = (eventType: string) => {
      addEvent(`Manual event triggered: ${eventType}`)
    }
    
    const percentage = ((value - min) / (max - min)) * 100
    
    return (
      <div style="padding: 16px; border: 2px solid #007bff; border-radius: 8px; background: #f8f9fa;">
        <div style="margin-bottom: 16px;">
          <h4 style="margin: 0 0 12px 0; color: #007bff;">🐛 ProgressBar Debug Mode</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <div style="margin-bottom: 8px; font-weight: 500;">ProgressBar Preview:</div>
              <div style="padding: 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px;">
                <ProgressBar 
                  value={value}
                  max={max}
                  min={min}
                  variant={variant}
                  size={size}
                  showLabel={showLabel}
                  labelPosition={labelPosition}
                  animated={animated}
                  striped={striped}
                  shape={shape}
                />
              </div>
            </div>
            
            <div>
              <div style="margin-bottom: 8px; font-weight: 500;">Debug Stats:</div>
              <div style="background: white; padding: 8px; border: 1px solid #dee2e6; border-radius: 4px; font-family: monospace; font-size: 12px;">
                <div>Renders: <strong>{renderCount}</strong></div>
                <div>Value: <strong>{value}</strong></div>
                <div>Range: <strong>{min} - {max}</strong></div>
                <div>Percentage: <strong>{percentage.toFixed(1)}%</strong></div>
                <div>Variant: <strong>{variant}</strong></div>
                <div>Size: <strong>{size}</strong></div>
                <div>Label: <strong>{showLabel ? labelPosition : 'Hidden'}</strong></div>
                <div>Effects: <strong>{[animated && 'animated', striped && 'striped'].filter(Boolean).join(', ') || 'none'}</strong></div>
                <div>Shape: <strong>{shape}</strong></div>
              </div>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <div style="margin-bottom: 8px; font-weight: 500;">Controls:</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                  Value: <input 
                    type="range" 
                    min={min} 
                    max={max} 
                    value={value}
                    onInput={(e) => handleValueChange(Number((e.target as HTMLInputElement).value))}
                    style="flex: 1;"
                  />
                  <span style="min-width: 30px;">{value}</span>
                </label>
                
                <label style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                  Min: <input 
                    type="number" 
                    value={min}
                    onInput={(e) => handleMinChange(Number((e.target as HTMLInputElement).value))}
                    style="width: 60px; padding: 2px 4px; border: 1px solid #ccc; border-radius: 2px;"
                  />
                </label>
                
                <label style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                  Max: <input 
                    type="number" 
                    value={max}
                    onInput={(e) => handleMaxChange(Number((e.target as HTMLInputElement).value))}
                    style="width: 60px; padding: 2px 4px; border: 1px solid #ccc; border-radius: 2px;"
                  />
                </label>
                
                <select 
                  value={variant} 
                  onChange={(e) => handleVariantChange((e.target as HTMLSelectElement).value as typeof variant)}
                  style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px;"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Danger</option>
                  <option value="info">Info</option>
                </select>
                
                <select 
                  value={size} 
                  onChange={(e) => handleSizeChange((e.target as HTMLSelectElement).value as typeof size)}
                  style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px;"
                >
                  <option value="xs">XS</option>
                  <option value="sm">SM</option>
                  <option value="md">MD</option>
                  <option value="lg">LG</option>
                </select>
                
                <select 
                  value={labelPosition} 
                  onChange={(e) => handleLabelPositionChange((e.target as HTMLSelectElement).value as typeof labelPosition)}
                  style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px;"
                  disabled={!showLabel}
                >
                  <option value="inside">Inside</option>
                  <option value="outside">Outside</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
                
                <select 
                  value={shape} 
                  onChange={(e) => handleShapeChange((e.target as HTMLSelectElement).value as typeof shape)}
                  style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px;"
                >
                  <option value="rounded">Rounded</option>
                  <option value="square">Square</option>
                </select>
              </div>
            </div>
            
            <div>
              <div style="margin-bottom: 8px; font-weight: 500;">Toggles & Events:</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <label style="display: flex; align-items: center; gap: 4px; font-size: 12px;">
                  <input type="checkbox" checked={showLabel} onChange={handleLabelToggle} />
                  Show Label
                </label>
                
                <label style="display: flex; align-items: center; gap: 4px; font-size: 12px;">
                  <input type="checkbox" checked={animated} onChange={handleAnimatedToggle} />
                  Animated
                </label>
                
                <label style="display: flex; align-items: center; gap: 4px; font-size: 12px;">
                  <input type="checkbox" checked={striped} onChange={handleStripedToggle} />
                  Striped
                </label>
                
                <button 
                  onClick={() => handleManualEvent('Progress simulation')}
                  style="padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;"
                >
                  Simulate Progress
                </button>
                <button 
                  onClick={() => handleManualEvent('Reset progress')}
                  style="padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;"
                >
                  Reset Progress
                </button>
                <button 
                  onClick={() => handleManualEvent('Complete progress')}
                  style="padding: 4px 8px; background: #ffc107; color: black; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;"
                >
                  Complete Progress
                </button>
                <button 
                  onClick={() => setEvents([])}
                  style="padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;"
                >
                  Clear Events
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <div style="margin-bottom: 8px; font-weight: 500;">Event Log (last 10):</div>
            <div style="background: #1a1a1a; color: #00ff00; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 11px; max-height: 200px; overflow-y: auto;">
              {events.length === 0 ? (
                <div style="color: #666;">No events yet...</div>
              ) : (
                events.map((event, index) => (
                  <div key={index}>{event}</div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete debugging story showing all ProgressBar events, state changes, and prop interactions.'
      }
    }
  }
}

// Real-time monitor story for ProgressBar
export const RealTimeProgressMonitor = {
  render: () => {
    const [value, setValue] = useState(50)
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>('primary')
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('md')
    const [showLabel, setShowLabel] = useState(true)
    const [labelPosition, setLabelPosition] = useState<'inside' | 'outside' | 'top' | 'bottom'>('inside')
    const [animated, setAnimated] = useState(false)
    const [striped, setStriped] = useState(false)
    const shape = 'rounded'
    const [eventLog, setEventLog] = useState<{time: string, type: string, data: any}[]>([])
    const [interactions, setInteractions] = useState(0)
    const [lastUpdate, setLastUpdate] = useState(Date.now())
    const [autoProgress, setAutoProgress] = useState(false)
    
    const max = 100
    const min = 0
    
    const logEvent = (type: string, data: any) => {
      const now = Date.now()
      setEventLog(prev => [...prev.slice(-19), {
        time: new Date(now).toLocaleTimeString(),
        type,
        data
      }])
      setLastUpdate(now)
      setInteractions(prev => prev + 1)
    }
    
    const handlePropChange = (prop: string, oldValue: any, newValue: any) => {
      logEvent('PROP_CHANGE', { prop, oldValue, newValue })
    }
    
    const handleValueChange = (newValue: number) => {
      const percentage = ((newValue - min) / (max - min)) * 100
      handlePropChange('value', value, newValue)
      logEvent('PROGRESS_UPDATE', { value: newValue, percentage: percentage.toFixed(1) })
      setValue(newValue)
    }
    
    const handleVariantChange = (newVariant: typeof variant) => {
      handlePropChange('variant', variant, newVariant)
      setVariant(newVariant)
    }
    
    const handleSizeChange = (newSize: typeof size) => {
      handlePropChange('size', size, newSize)
      setSize(newSize)
    }
    
    const handleAnimatedChange = (newAnimated: boolean) => {
      handlePropChange('animated', animated, newAnimated)
      setAnimated(newAnimated)
    }
    
    const handleStripedChange = (newStriped: boolean) => {
      handlePropChange('striped', striped, newStriped)
      setStriped(newStriped)
    }
    
    const handleLabelChange = (newShowLabel: boolean) => {
      handlePropChange('showLabel', showLabel, newShowLabel)
      setShowLabel(newShowLabel)
    }
    
    const handleLabelPositionChange = (newPosition: typeof labelPosition) => {
      handlePropChange('labelPosition', labelPosition, newPosition)
      setLabelPosition(newPosition)
    }
    
    const handleAutoProgressToggle = () => {
      const newAuto = !autoProgress
      logEvent('AUTO_PROGRESS', { enabled: newAuto })
      setAutoProgress(newAuto)
    }
    
    // Auto-progress simulation
    useEffect(() => {
      if (!autoProgress) return
      
      const interval = setInterval(() => {
        setValue(prev => {
          const newValue = prev >= max ? min : prev + 1
          if (newValue === min || newValue === max) {
            logEvent('PROGRESS_CYCLE', { value: newValue, cycled: newValue === min })
          }
          return newValue
        })
      }, 50)
      
      return () => clearInterval(interval)
    }, [autoProgress, min, max])
    
    // Auto-log periodic updates
    useEffect(() => {
      const interval = setInterval(() => {
        logEvent('HEALTH_CHECK', { 
          value, 
          percentage: ((value - min) / (max - min) * 100).toFixed(1),
          variant, 
          size, 
          animated, 
          striped,
          shape,
          showLabel,
          labelPosition,
          timestamp: Date.now() 
        })
      }, 5000)
      
      return () => clearInterval(interval)
    }, [value, min, max, variant, size, animated, striped, shape, showLabel, labelPosition])
    
    const percentage = ((value - min) / (max - min)) * 100
    
    return (
      <div class="p-16 border-2 border-blue-500 rounded-lg bg-gray-50">
        <div class="mb-16">
          <h4 class="mb-12 text-blue-600 font-medium">📊 Real-Time ProgressBar Monitor</h4>
          
          <div class="grid grid-cols-3 gap-16 mb-16">
            {/* ProgressBar Preview */}
            <div>
              <div class="mb-8 font-medium">Live ProgressBar:</div>
              <div class="p-12 bg-white border border-gray-300 rounded">
                <ProgressBar 
                  value={value}
                  max={max}
                  min={min}
                  variant={variant}
                  size={size}
                  showLabel={showLabel}
                  labelPosition={labelPosition}
                  animated={animated}
                  striped={striped}
                  shape={shape}
                />
              </div>
            </div>
            
            {/* Statistics */}
            <div>
              <div class="mb-8 font-medium">Statistics:</div>
              <div class="bg-white p-8 border border-gray-300 rounded font-mono text-xs">
                <div><strong>Interactions:</strong> {interactions}</div>
                <div><strong>Last Update:</strong> {new Date(lastUpdate).toLocaleTimeString()}</div>
                <div><strong>Events:</strong> {eventLog.length}</div>
                <div><strong>Value:</strong> {value}/{max} ({percentage.toFixed(1)}%)</div>
                <div><strong>Variant:</strong> {variant}</div>
                <div><strong>Size:</strong> {size}</div>
                <div><strong>Effects:</strong> {[animated && 'animated', striped && 'striped'].filter(Boolean).join(', ') || 'none'}</div>
                <div><strong>Auto-Progress:</strong> {autoProgress ? 'ON' : 'OFF'}</div>
              </div>
            </div>
            
            {/* Live Controls */}
            <div>
              <div class="mb-8 font-medium">Live Controls:</div>
              <div class="flex flex-col gap-8">
                <label class="flex items-center gap-4 text-xs">
                  Value: 
                  <input 
                    type="range" 
                    min={min} 
                    max={max} 
                    value={value}
                    onInput={(e) => handleValueChange(Number((e.target as HTMLInputElement).value))}
                    class="flex-1"
                    disabled={autoProgress}
                  />
                  <span class="min-w-30">{value}</span>
                </label>
                
                <select 
                  value={variant} 
                  onChange={(e) => handleVariantChange((e.target as HTMLSelectElement).value as typeof variant)}
                  class="p-4 border border-gray-300 rounded text-xs"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Danger</option>
                  <option value="info">Info</option>
                </select>
                
                <select 
                  value={size} 
                  onChange={(e) => handleSizeChange((e.target as HTMLSelectElement).value as typeof size)}
                  class="p-4 border border-gray-300 rounded text-xs"
                >
                  <option value="xs">XS</option>
                  <option value="sm">SM</option>
                  <option value="md">MD</option>
                  <option value="lg">LG</option>
                </select>
                
                <select 
                  value={labelPosition} 
                  onChange={(e) => handleLabelPositionChange((e.target as HTMLSelectElement).value as typeof labelPosition)}
                  class="p-4 border border-gray-300 rounded text-xs"
                  disabled={!showLabel}
                >
                  <option value="inside">Inside</option>
                  <option value="outside">Outside</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
                
                <div class="flex flex-col gap-4">
                  <label class="flex items-center gap-4 text-xs">
                    <input 
                      type="checkbox" 
                      checked={showLabel} 
                      onChange={(e) => handleLabelChange((e.target as HTMLInputElement).checked)} 
                    />
                    Show Label
                  </label>
                  
                  <label class="flex items-center gap-4 text-xs">
                    <input 
                      type="checkbox" 
                      checked={animated} 
                      onChange={(e) => handleAnimatedChange((e.target as HTMLInputElement).checked)} 
                    />
                    Animated
                  </label>
                  
                  <label class="flex items-center gap-4 text-xs">
                    <input 
                      type="checkbox" 
                      checked={striped} 
                      onChange={(e) => handleStripedChange((e.target as HTMLInputElement).checked)} 
                    />
                    Striped
                  </label>
                  
                  <label class="flex items-center gap-4 text-xs">
                    <input 
                      type="checkbox" 
                      checked={autoProgress} 
                      onChange={handleAutoProgressToggle} 
                    />
                    Auto Progress
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Event Stream */}
          <div>
            <div class="mb-8 font-medium">Event Stream (last 20):</div>
            <div class="bg-black text-green-400 p-8 rounded font-mono text-xs max-h-200 overflow-y-auto">
              {eventLog.length === 0 ? (
                <div class="text-gray-600">Waiting for events...</div>
              ) : (
                eventLog.map((event, index) => (
                  <div key={index} class="flex justify-between">
                    <span>[{event.time}]</span>
                    <span class="text-yellow-400">{event.type}</span>
                    <span class="text-blue-400">{JSON.stringify(event.data)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div class="mt-12 flex gap-8">
            <button 
              onClick={() => setEventLog([])}
              class="px-8 py-4 bg-red-500 text-white rounded text-xs hover:bg-red-600"
            >
              Clear Events
            </button>
            <button 
              onClick={() => logEvent('MANUAL_TEST', { trigger: 'user', timestamp: Date.now() })}
              class="px-8 py-4 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              Test Event
            </button>
            <button 
              onClick={() => setValue(Math.floor(Math.random() * (max - min) + min))}
              class="px-8 py-4 bg-green-500 text-white rounded text-xs hover:bg-green-600"
            >
              Random Progress
            </button>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-time monitoring of all ProgressBar props, events, and interactions with live statistics, auto-progress simulation, and event streaming.'
      }
    }
  }
}
