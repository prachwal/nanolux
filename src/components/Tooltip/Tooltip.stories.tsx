import Tooltip from './Tooltip'
import Button from '../Button'
import { expect } from '@storybook/test'
import { within } from '@storybook/testing-library'
import { useState, useEffect } from 'preact/hooks'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: 'Tooltip component z pozycjonowaniem i accessibility'
      }
    }
  },
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    trigger: { control: 'select', options: ['hover', 'click', 'focus'] },
    delay: { control: 'number' },
    disabled: { control: 'boolean' }
  }
}

export const Default = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>
  }
}

export const AllPlacements = {
  render: () => (
    <div class="flex gap-16 p-24 flex-wrap content-center">
      <Tooltip content="Top tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  )
}

export const AllTriggers = {
  render: () => (
    <div class="flex gap-12 flex-wrap">
      <Tooltip content="Hover to see tooltip" trigger="hover">
        <Button>Hover</Button>
      </Tooltip>
      <Tooltip content="Click to see tooltip" trigger="click">
        <Button>Click</Button>
      </Tooltip>
      <Tooltip content="Focus to see tooltip" trigger="focus">
        <Button>Focus</Button>
      </Tooltip>
    </div>
  )
}

export const LongContent = {
  args: {
    content: 'This is a very long tooltip content that should wrap nicely and demonstrate max-width behavior.',
    maxWidth: '200px',
    children: <Button>Long tooltip</Button>
  }
}

export const CustomDelay = {
  args: {
    content: 'Tooltip with 1 second delay',
    delay: 1000,
    children: <Button>Slow tooltip</Button>
  }
}

export const Disabled = {
  args: {
    content: 'This tooltip is disabled',
    disabled: true,
    children: <Button>Disabled tooltip</Button>
  }
}

export const WithDifferentElements = {
  render: () => (
    <div class="flex gap-12 items-center flex-wrap">
      <Tooltip content="Button tooltip">
        <Button>Button</Button>
      </Tooltip>
      <Tooltip content="Link tooltip">
        <a href="#" class="text-blue-600 underline">Link</a>
      </Tooltip>
      <Tooltip content="Span tooltip">
        <span class="bg-gray-200 p-8 rounded">Span element</span>
      </Tooltip>
      <Tooltip content="Icon tooltip">
        <div class="w-24 h-24 bg-blue-500 rounded-full flex items-center content-center text-white font-bold">
          ?
        </div>
      </Tooltip>
    </div>
  )
}

// Interactive test
export const InteractiveTest = {
  args: {
    content: 'Test tooltip',
    children: <Button>Test</Button>
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: trigger element is present
    const button = canvas.getByText('Test')
    await expect(button).toBeInTheDocument()
    
    // Test: tooltip has trigger wrapper
    const triggerWrapper = button.closest('.tooltip-trigger')
    await expect(triggerWrapper).toBeInTheDocument()
  }
}

// Debug tooltip positioning - podobne do Checkbox debug stories
export const PositionDebug = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false)
    const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top')
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [position, setPosition] = useState({ top: 0, left: 0 })
    
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
      setPosition({ top: rect.top, left: rect.left })
      setIsVisible(true)
    }
    
    return (
      <div style="padding: 100px; background: #f8f9fa; border: 2px solid #007bff; border-radius: 8px;">
        <h3 style="margin-bottom: 20px; color: #007bff;">🔍 Tooltip Position Debug</h3>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Placement:</label>
          <select 
            value={placement} 
            onChange={(e) => setPlacement((e.target as HTMLSelectElement).value as any)}
            style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
        
        <div style="margin-bottom: 20px;">
          <strong>Trigger Info:</strong>
          <div style="font-family: monospace; font-size: 12px; background: #fff; padding: 8px; border-radius: 4px;">
            <div>Dimensions: {dimensions.width}x{dimensions.height}px</div>
            <div>Position: {Math.round(position.left)}, {Math.round(position.top)}px</div>
            <div>Visible: {isVisible ? '✅' : '❌'}</div>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <Tooltip 
            content={`Tooltip z placement: ${placement}`} 
            placement={placement}
            trigger="hover"
            delay={0}
          >
            <Button 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setIsVisible(false)}
            >
              Hover me - {placement}
            </Button>
          </Tooltip>
        </div>
        
        <div style="background: #fff; padding: 12px; border-radius: 4px; border: 1px solid #ddd;">
          <strong>CSS Debug Info:</strong>
          <div style="font-family: monospace; font-size: 11px; margin-top: 8px;">
            <div>Arrow position dla {placement}:</div>
            {placement === 'top' && <div style="color: #dc3545;">• bottom: -8px (może być za nisko)</div>}
            {placement === 'bottom' && <div style="color: #28a745;">• top: -8px</div>}
            {placement === 'left' && <div style="color: #17a2b8;">• right: -8px</div>}
            {placement === 'right' && <div style="color: #ffc107;">• left: -8px</div>}
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Debug story do analizy pozycjonowania strzałki tooltipa'
      }
    }
  }
}

// Porównanie różnych pozycji strzałki
export const ArrowPositionComparison = {
  render: () => {
    return (
      <div style="padding: 60px; background: linear-gradient(45deg, #f8f9fa 25%, transparent 25%, transparent 75%, #f8f9fa 75%), linear-gradient(45deg, #f8f9fa 25%, transparent 25%, transparent 75%, #f8f9fa 75%); background-size: 20px 20px; background-position: 0 0, 10px 10px;">
        <h3 style="text-align: center; margin-bottom: 40px; color: #007bff;">📐 Arrow Position Comparison</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 800px; margin: 0 auto;">
          
          {/* Obecna pozycja */}
          <div style="text-align: center;">
            <h4 style="margin-bottom: 20px; color: #dc3545;">❌ Obecna (zbyt nisko)</h4>
            <Tooltip content="Strzałka zbyt nisko" placement="top" delay={0}>
              <Button>Current Position</Button>
            </Tooltip>
            <div style="margin-top: 10px; font-size: 12px; font-family: monospace; background: #fff; padding: 8px; border-radius: 4px;">
              bottom: -8px
            </div>
          </div>
          
          {/* Wszystkie pozycje obok siebie */}
          <div style="text-align: center;">
            <h4 style="margin-bottom: 20px; color: #007bff;">🔄 Wszystkie pozycje</h4>
            <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
              <Tooltip content="Top tooltip" placement="top" delay={0}>
                <Button>Top</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" placement="bottom" delay={0}>
                <Button>Bottom</Button>
              </Tooltip>
              <Tooltip content="Left tooltip" placement="left" delay={0}>
                <Button>Left</Button>
              </Tooltip>
              <Tooltip content="Right tooltip" placement="right" delay={0}>
                <Button>Right</Button>
              </Tooltip>
            </div>
          </div>
        </div>
        
        {/* Problem analysis */}
        <div style="margin-top: 40px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 20px;">
          <h4 style="color: #856404; margin-bottom: 12px;">🔍 Problem Analysis</h4>
          <ul style="margin: 0; padding-left: 20px; color: #856404;">
            <li>Strzałka dla placement="top" ma <code>bottom: -8px</code></li>
            <li>To umieszcza ją 8px poniżej dolnej krawędzi tooltipa</li>
            <li>Powinna być bliżej tooltipa, np. <code>bottom: -4px</code> lub <code>bottom: -6px</code></li>
            <li>Trzeba zachować spójność z innymi pozycjami</li>
          </ul>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Porównanie różnych pozycji strzałki tooltipa z analizą problemu'
      }
    }
  }
}

// Live CSS Editor dla strzałki
export const LiveArrowEditor = {
  render: () => {
    const [arrowOffset, setArrowOffset] = useState(-8)
    const [arrowSize, setArrowSize] = useState(4)
    const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top')
    
    // Dodaj custom style do head
    useEffect(() => {
      const styleId = 'tooltip-arrow-override'
      let styleElement = document.getElementById(styleId) as HTMLStyleElement
      
      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = styleId
        document.head.appendChild(styleElement)
      }
      
      const css = `
        .tooltip-${placement} .tooltip-arrow {
          ${placement === 'top' ? `bottom: ${arrowOffset}px !important;` : ''}
          ${placement === 'bottom' ? `top: ${arrowOffset}px !important;` : ''}
          ${placement === 'left' ? `right: ${arrowOffset}px !important;` : ''}
          ${placement === 'right' ? `left: ${arrowOffset}px !important;` : ''}
          border-width: ${arrowSize}px !important;
        }
      `
      styleElement.textContent = css
      
      return () => {
        styleElement?.remove()
      }
    }, [arrowOffset, arrowSize, placement])
    
    return (
      <div style="padding: 40px; background: #f8f9fa; border: 2px solid #28a745; border-radius: 8px;">
        <h3 style="color: #28a745; margin-bottom: 24px;">⚡ Live Arrow CSS Editor</h3>
        
        <div style="display: grid; grid-template-columns: 300px 1fr; gap: 30px;">
          
          {/* Controls */}
          <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
            <h4 style="margin-bottom: 16px;">Controls</h4>
            
            <div style="margin-bottom: 16px;">
              <label style="display: block; margin-bottom: 4px; font-weight: 600;">Placement:</label>
              <select 
                value={placement} 
                onChange={(e) => setPlacement((e.target as HTMLSelectElement).value as any)}
                style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            
            <div style="margin-bottom: 16px;">
              <label style="display: block; margin-bottom: 4px; font-weight: 600;">
                Arrow Offset: {arrowOffset}px
              </label>
              <input 
                type="range" 
                min="-12" 
                max="0" 
                value={arrowOffset}
                onChange={(e) => setArrowOffset(parseInt((e.target as HTMLInputElement).value))}
                style="width: 100%;"
              />
              <div style="display: flex; justify-content: space-between; font-size: 10px; color: #666;">
                <span>-12px</span>
                <span>0px</span>
              </div>
            </div>
            
            <div style="margin-bottom: 16px;">
              <label style="display: block; margin-bottom: 4px; font-weight: 600;">
                Arrow Size: {arrowSize}px
              </label>
              <input 
                type="range" 
                min="2" 
                max="8" 
                value={arrowSize}
                onChange={(e) => setArrowSize(parseInt((e.target as HTMLInputElement).value))}
                style="width: 100%;"
              />
              <div style="display: flex; justify-content: space-between; font-size: 10px; color: #666;">
                <span>2px</span>
                <span>8px</span>
              </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 12px; border-radius: 4px; font-family: monospace; font-size: 12px;">
              <strong>Generated CSS:</strong><br/>
              .tooltip-{placement} .tooltip-arrow {"{"}
              <br/>
              &nbsp;&nbsp;{placement === 'top' ? 'bottom' : placement === 'bottom' ? 'top' : placement === 'left' ? 'right' : 'left'}: {arrowOffset}px;
              <br/>
              &nbsp;&nbsp;border-width: {arrowSize}px;
              <br/>
              {"}"}
            </div>
          </div>
          
          {/* Preview */}
          <div style="background: #fff; padding: 40px; border-radius: 8px; border: 1px solid #ddd; text-align: center;">
            <h4 style="margin-bottom: 30px;">Live Preview</h4>
            
            <Tooltip 
              content={`Arrow offset: ${arrowOffset}px, size: ${arrowSize}px`} 
              placement={placement}
              delay={0}
            >
              <Button>Hover for tooltip</Button>
            </Tooltip>
            
            <div style="margin-top: 30px; font-size: 14px; color: #666;">
              Przesuń suwaki powyżej, żeby zobaczyć zmiany w czasie rzeczywistym
            </div>
          </div>
        </div>
        
        {/* Recommended values */}
        <div style="margin-top: 30px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px;">
          <h4 style="color: #155724; margin-bottom: 12px;">💡 Recommended Values</h4>
          <div style="color: #155724;">
            <strong>Arrow Offset:</strong> -4px do -6px (zamiast obecnych -8px)<br/>
            <strong>Arrow Size:</strong> 4px (obecne jest OK)<br/>
            <strong>Uzasadnienie:</strong> Mniejszy offset sprawi, że strzałka będzie bliżej tooltipa i lepiej wizualnie połączona
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaktywny edytor CSS do testowania pozycji strzałki tooltipa w czasie rzeczywistym'
      }
    }
  }
}

// Real-time monitoring podobne do Checkbox
export const RealTimeMonitor = {
  render: () => {
    const [events, setEvents] = useState<{time: string, type: string, data: any}[]>([])
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)
    
    const logEvent = (type: string, data: any) => {
      const time = new Date().toLocaleTimeString()
      setEvents(prev => [...prev.slice(-9), { time, type, data }])
    }
    
    const handleMouseEnter = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      setTriggerRect(rect)
      setTooltipVisible(true)
      logEvent('mouseenter', { rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height } })
    }
    
    const handleMouseLeave = () => {
      setTooltipVisible(false)
      setTriggerRect(null)
      logEvent('mouseleave', {})
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    return (
      <div style="padding: 20px; background: #f8f9fa; border: 2px solid #6f42c1; border-radius: 8px;" onMouseMove={handleMouseMove}>
        <h3 style="color: #6f42c1; margin-bottom: 20px;">📊 Real-time Tooltip Monitor</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          
          {/* Tooltip Test Area */}
          <div style="background: #fff; padding: 20px; border-radius: 8px; text-align: center;">
            <h4 style="margin-bottom: 20px;">Test Area</h4>
            
            <div style="margin-bottom: 20px;">
              <Tooltip 
                content="Monitoring this tooltip" 
                placement="top"
                delay={0}
              >
                <Button 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Monitored Tooltip
                </Button>
              </Tooltip>
            </div>
            
            <div style="font-family: monospace; font-size: 12px; text-align: left;">
              <div><strong>Mouse:</strong> {mousePosition.x}, {mousePosition.y}</div>
              <div><strong>Tooltip Visible:</strong> {tooltipVisible ? '✅' : '❌'}</div>
              {triggerRect && (
                <div>
                  <strong>Trigger Rect:</strong><br/>
                  &nbsp;&nbsp;x: {Math.round(triggerRect.x)}, y: {Math.round(triggerRect.y)}<br/>
                  &nbsp;&nbsp;w: {Math.round(triggerRect.width)}, h: {Math.round(triggerRect.height)}
                </div>
              )}
            </div>
          </div>
          
          {/* Event Log */}
          <div style="background: #fff; padding: 20px; border-radius: 8px;">
            <h4 style="margin-bottom: 16px;">Event Log</h4>
            <div style="height: 200px; overflow-y: auto; font-family: monospace; font-size: 11px; background: #f8f9fa; padding: 8px; border-radius: 4px;">
              {events.length === 0 ? (
                <div style="color: #666;">Hover over the button to see events...</div>
              ) : (
                events.map((event, i) => (
                  <div key={i} style="margin-bottom: 4px; padding: 2px 0; border-bottom: 1px solid #eee;">
                    <span style="color: #666;">[{event.time}]</span>{' '}
                    <span style="color: #007bff; font-weight: bold;">{event.type}</span>
                    {Object.keys(event.data).length > 0 && (
                      <div style="margin-left: 16px; color: #666;">
                        {JSON.stringify(event.data, null, 2).slice(0, 100)}...
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
            <button 
              onClick={() => setEvents([])}
              style="margin-top: 8px; padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;"
            >
              Clear Log
            </button>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-time monitoring tooltipa z logiem eventów i pozycji myszy'
      }
    }
  }
}
