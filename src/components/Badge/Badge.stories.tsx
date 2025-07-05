import Badge from './Badge'
import { expect } from '@storybook/test'
import { within } from '@storybook/testing-library'
import { useState, useEffect } from 'preact/hooks'

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'Mały znacznik do wyróżniania statusu lub kategorii'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info']
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg']
    },
    dotPosition: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left']
    }
  }
}

export const Default = {
  args: {
    children: 'Badge',
    variant: 'default'
  }
}

export const AllVariants = {
  render: () => (
    <div class="flex gap-8 flex-wrap items-center">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  )
}

export const OutlineVariants = {
  render: () => (
    <div class="flex gap-8 flex-wrap items-center">
      <Badge variant="default" outline>Default</Badge>
      <Badge variant="primary" outline>Primary</Badge>
      <Badge variant="secondary" outline>Secondary</Badge>
      <Badge variant="success" outline>Success</Badge>
      <Badge variant="warning" outline>Warning</Badge>
      <Badge variant="danger" outline>Danger</Badge>
      <Badge variant="info" outline>Info</Badge>
    </div>
  )
}

export const AllSizes = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Badge variant="primary" size="xs">XS Badge</Badge>
      <Badge variant="primary" size="sm">SM Badge</Badge>
      <Badge variant="primary" size="md">MD Badge</Badge>
      <Badge variant="primary" size="lg">LG Badge</Badge>
    </div>
  )
}

export const RoundedBadges = {
  render: () => (
    <div class="flex gap-8 flex-wrap items-center">
      <Badge variant="primary" rounded>Rounded</Badge>
      <Badge variant="success" rounded size="lg">Large Rounded</Badge>
      <Badge variant="warning" rounded outline>Outline Rounded</Badge>
      <Badge variant="danger" rounded size="xs">XS</Badge>
    </div>
  )
}

export const CustomColors = {
  render: () => (
    <div class="flex gap-8 flex-wrap items-center">
      <Badge bg="#ff6b6b" color="white">Custom Red</Badge>
      <Badge bg="#4ecdc4" color="white">Custom Teal</Badge>
      <Badge bg="#45b7d1" color="white">Custom Blue</Badge>
      <Badge bg="#96ceb4" color="#2d3436">Custom Green</Badge>
      <Badge bg="transparent" color="#e17055">Custom Outline</Badge>
    </div>
  )
}

export const WithDots = {
  render: () => (
    <div class="flex gap-16 flex-wrap items-center">
      <Badge variant="primary" dot dotPosition="top-right">
        Top Right
      </Badge>
      <Badge variant="success" dot dotPosition="top-left">
        Top Left
      </Badge>
      <Badge variant="warning" dot dotPosition="bottom-right">
        Bottom Right
      </Badge>
      <Badge variant="danger" dot dotPosition="bottom-left">
        Bottom Left
      </Badge>
    </div>
  )
}

export const PracticalExamples = {
  render: () => (
    <div class="flex flex-col gap-16">
      <div>
        <h3 class="mb-8">Status Badges</h3>
        <div class="flex gap-8 flex-wrap">
          <Badge variant="success" size="sm">Active</Badge>
          <Badge variant="warning" size="sm">Pending</Badge>
          <Badge variant="danger" size="sm">Inactive</Badge>
          <Badge variant="info" size="sm">New</Badge>
        </div>
      </div>
      
      <div>
        <h3 class="mb-8">Count Badges</h3>
        <div class="flex gap-8 flex-wrap items-center">
          <span>Messages <Badge variant="danger" size="xs" rounded>5</Badge></span>
          <span>Notifications <Badge variant="primary" size="xs" rounded>12</Badge></span>
          <span>Updates <Badge variant="success" size="xs" rounded>3</Badge></span>
        </div>
      </div>
      
      <div>
        <h3 class="mb-8">Category Badges</h3>
        <div class="flex gap-8 flex-wrap">
          <Badge variant="primary" outline rounded>JavaScript</Badge>
          <Badge variant="success" outline rounded>TypeScript</Badge>
          <Badge variant="info" outline rounded>Preact</Badge>
          <Badge variant="warning" outline rounded>CSS</Badge>
        </div>
      </div>
      
      <div>
        <h3 class="mb-8">With Notification Dots</h3>
        <div class="flex gap-16 flex-wrap items-center">
          <Badge variant="secondary" dot>
            Inbox
          </Badge>
          <Badge variant="primary" dot dotPosition="top-left">
            Profile
          </Badge>
          <Badge variant="success" dot dotPosition="bottom-right">
            Settings
          </Badge>
        </div>
      </div>
    </div>
  )
}

// Interactive test story
export const InteractiveTest = {
  args: {
    children: 'Test Badge',
    variant: 'primary',
    size: 'md'
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: badge is rendered
    const badge = canvas.getByText('Test Badge')
    await expect(badge).toBeInTheDocument()
    
    // Test: badge has correct classes
    await expect(badge).toHaveClass('badge', 'badge-md', 'badge-primary')
    
    // Test: badge is inline element
    const computedStyle = window.getComputedStyle(badge)
    await expect(computedStyle.display).toBe('inline-flex')
  }
}

// Debug story z pełnym logowaniem
export const DebugMode = {
  render: () => {
    const [variant, setVariant] = useState<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>('primary')
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('md')
    const [outline, setOutline] = useState(false)
    const [rounded, setRounded] = useState(false)
    const [dot, setDot] = useState(false)
    const [events, setEvents] = useState<string[]>([])
    const [renderCount, setRenderCount] = useState(0)
    const [badgeContent, setBadgeContent] = useState('Debug Badge')
    
    // Track renders
    useEffect(() => {
      setRenderCount(prev => prev + 1)
      addEvent(`Badge rendered (render #${renderCount + 1})`)
    })
    
    const addEvent = (event: string) => {
      const timestamp = new Date().toLocaleTimeString()
      setEvents(prev => [...prev.slice(-9), `[${timestamp}] ${event}`])
    }
    
    const handleVariantChange = (newVariant: typeof variant) => {
      addEvent(`Variant changed: ${variant} → ${newVariant}`)
      setVariant(newVariant)
    }
    
    const handleSizeChange = (newSize: typeof size) => {
      addEvent(`Size changed: ${size} → ${newSize}`)
      setSize(newSize)
    }
    
    const handleOutlineToggle = () => {
      addEvent(`Outline toggled: ${outline} → ${!outline}`)
      setOutline(!outline)
    }
    
    const handleRoundedToggle = () => {
      addEvent(`Rounded toggled: ${rounded} → ${!rounded}`)
      setRounded(!rounded)
    }
    
    const handleDotToggle = () => {
      addEvent(`Dot toggled: ${dot} → ${!dot}`)
      setDot(!dot)
    }
    
    const handleContentChange = (e: Event) => {
      const newContent = (e.target as HTMLInputElement).value
      addEvent(`Content changed: "${badgeContent}" → "${newContent}"`)
      setBadgeContent(newContent)
    }
    
    const handleManualEvent = (eventType: string) => {
      addEvent(`Manual event triggered: ${eventType}`)
    }
    
    return (
      <div style="padding: 16px; border: 2px solid #007bff; border-radius: 8px; background: #f8f9fa;">
        <div style="margin-bottom: 16px;">
          <h4 style="margin: 0 0 12px 0; color: #007bff;">🐛 Badge Debug Mode</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <div style="margin-bottom: 8px; font-weight: 500;">Badge Preview:</div>
              <div style="padding: 12px; background: white; border: 1px solid #dee2e6; border-radius: 4px; text-align: center;">
                <Badge 
                  variant={variant}
                  size={size}
                  outline={outline}
                  rounded={rounded}
                  dot={dot}
                  dotPosition="top-right"
                >
                  {badgeContent}
                </Badge>
              </div>
            </div>
            
            <div>
              <div style="margin-bottom: 8px; font-weight: 500;">Debug Stats:</div>
              <div style="background: white; padding: 8px; border: 1px solid #dee2e6; border-radius: 4px; font-family: monospace; font-size: 12px;">
                <div>Renders: <strong>{renderCount}</strong></div>
                <div>Variant: <strong>{variant}</strong></div>
                <div>Size: <strong>{size}</strong></div>
                <div>Outline: <strong>{outline ? 'Yes' : 'No'}</strong></div>
                <div>Rounded: <strong>{rounded ? 'Yes' : 'No'}</strong></div>
                <div>Dot: <strong>{dot ? 'Yes' : 'No'}</strong></div>
                <div>Content: <strong>"{badgeContent}"</strong></div>
              </div>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <div style="margin-bottom: 8px; font-weight: 500;">Controls:</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <input 
                  type="text" 
                  value={badgeContent}
                  onInput={handleContentChange}
                  placeholder="Badge content"
                  style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px;"
                />
                
                <select 
                  value={variant} 
                  onChange={(e) => handleVariantChange((e.target as HTMLSelectElement).value as typeof variant)}
                  style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 12px;"
                >
                  <option value="default">Default</option>
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
                
                <label style="display: flex; align-items: center; gap: 4px; font-size: 12px;">
                  <input type="checkbox" checked={outline} onChange={handleOutlineToggle} />
                  Outline
                </label>
                
                <label style="display: flex; align-items: center; gap: 4px; font-size: 12px;">
                  <input type="checkbox" checked={rounded} onChange={handleRoundedToggle} />
                  Rounded
                </label>
                
                <label style="display: flex; align-items: center; gap: 4px; font-size: 12px;">
                  <input type="checkbox" checked={dot} onChange={handleDotToggle} />
                  Dot indicator
                </label>
              </div>
            </div>
            
            <div>
              <div style="margin-bottom: 8px; font-weight: 500;">Manual Events:</div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <button 
                  onClick={() => handleManualEvent('Style update')}
                  style="padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;"
                >
                  Trigger Style Update
                </button>
                <button 
                  onClick={() => handleManualEvent('Content refresh')}
                  style="padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;"
                >
                  Refresh Content
                </button>
                <button 
                  onClick={() => handleManualEvent('Force re-render')}
                  style="padding: 4px 8px; background: #ffc107; color: black; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;"
                >
                  Force Re-render
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
        story: 'Complete debugging story showing all Badge events, state changes, and prop interactions.'
      }
    }
  }
}

// Real-time monitor story for Badge
export const RealTimeBadgeMonitor = {
  render: () => {
    const [variant, setVariant] = useState<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>('primary')
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('md')
    const [outline, setOutline] = useState(false)
    const [rounded, setRounded] = useState(false)
    const [dot, setDot] = useState(false)
    const [eventLog, setEventLog] = useState<{time: string, type: string, data: any}[]>([])
    const [interactions, setInteractions] = useState(0)
    const [lastUpdate, setLastUpdate] = useState(Date.now())
    const [badgeContent, setBadgeContent] = useState('Monitor Badge')
    
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
    
    const handleVariantChange = (newVariant: typeof variant) => {
      handlePropChange('variant', variant, newVariant)
      setVariant(newVariant)
    }
    
    const handleSizeChange = (newSize: typeof size) => {
      handlePropChange('size', size, newSize)
      setSize(newSize)
    }
    
    const handleOutlineChange = (newOutline: boolean) => {
      handlePropChange('outline', outline, newOutline)
      setOutline(newOutline)
    }
    
    const handleRoundedChange = (newRounded: boolean) => {
      handlePropChange('rounded', rounded, newRounded)
      setRounded(newRounded)
    }
    
    const handleDotChange = (newDot: boolean) => {
      handlePropChange('dot', dot, newDot)
      setDot(newDot)
    }
    
    const handleContentChange = (newContent: string) => {
      handlePropChange('content', badgeContent, newContent)
      setBadgeContent(newContent)
    }
    
    // Auto-log periodic updates
    useEffect(() => {
      const interval = setInterval(() => {
        logEvent('HEALTH_CHECK', { 
          variant, 
          size, 
          outline, 
          rounded, 
          dot,
          content: badgeContent,
          timestamp: Date.now() 
        })
      }, 5000)
      
      return () => clearInterval(interval)
    }, [variant, size, outline, rounded, dot, badgeContent])
    
    return (
      <div class="p-16 border-2 border-blue-500 rounded-lg bg-gray-50">
        <div class="mb-16">
          <h4 class="mb-12 text-blue-600 font-medium">📊 Real-Time Badge Monitor</h4>
          
          <div class="grid grid-cols-3 gap-16 mb-16">
            {/* Badge Preview */}
            <div>
              <div class="mb-8 font-medium">Live Badge:</div>
              <div class="p-12 bg-white border border-gray-300 rounded text-center">
                <Badge 
                  variant={variant}
                  size={size}
                  outline={outline}
                  rounded={rounded}
                  dot={dot}
                  dotPosition="top-right"
                >
                  {badgeContent}
                </Badge>
              </div>
            </div>
            
            {/* Statistics */}
            <div>
              <div class="mb-8 font-medium">Statistics:</div>
              <div class="bg-white p-8 border border-gray-300 rounded font-mono text-xs">
                <div><strong>Interactions:</strong> {interactions}</div>
                <div><strong>Last Update:</strong> {new Date(lastUpdate).toLocaleTimeString()}</div>
                <div><strong>Events:</strong> {eventLog.length}</div>
                <div><strong>Variant:</strong> {variant}</div>
                <div><strong>Size:</strong> {size}</div>
                <div><strong>Modifiers:</strong> {[outline && 'outline', rounded && 'rounded', dot && 'dot'].filter(Boolean).join(', ') || 'none'}</div>
              </div>
            </div>
            
            {/* Live Controls */}
            <div>
              <div class="mb-8 font-medium">Live Controls:</div>
              <div class="flex flex-col gap-8">
                <input 
                  type="text" 
                  value={badgeContent}
                  onInput={(e) => handleContentChange((e.target as HTMLInputElement).value)}
                  placeholder="Badge content"
                  class="p-4 border border-gray-300 rounded text-xs"
                />
                
                <select 
                  value={variant} 
                  onChange={(e) => handleVariantChange((e.target as HTMLSelectElement).value as typeof variant)}
                  class="p-4 border border-gray-300 rounded text-xs"
                >
                  <option value="default">Default</option>
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
                
                <div class="flex flex-col gap-4">
                  <label class="flex items-center gap-4 text-xs">
                    <input 
                      type="checkbox" 
                      checked={outline} 
                      onChange={(e) => handleOutlineChange((e.target as HTMLInputElement).checked)} 
                    />
                    Outline Style
                  </label>
                  
                  <label class="flex items-center gap-4 text-xs">
                    <input 
                      type="checkbox" 
                      checked={rounded} 
                      onChange={(e) => handleRoundedChange((e.target as HTMLInputElement).checked)} 
                    />
                    Rounded Corners
                  </label>
                  
                  <label class="flex items-center gap-4 text-xs">
                    <input 
                      type="checkbox" 
                      checked={dot} 
                      onChange={(e) => handleDotChange((e.target as HTMLInputElement).checked)} 
                    />
                    Dot Indicator
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
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-time monitoring of all Badge props, events, and interactions with live statistics and event streaming.'
      }
    }
  }
}
