import Avatar from './Avatar'
import { expect } from '@storybook/test'
import { within } from '@storybook/testing-library'
import { useState, useEffect } from 'preact/hooks'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'Komponent do wyświetlania avatarów użytkowników z różnymi wariantami'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded']
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'away', 'busy']
    }
  }
}

export const Default = {
  args: {
    name: 'John Doe',
    variant: 'primary'
  }
}

export const WithImage = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: 'User Avatar',
    name: 'John Doe'
  }
}

export const AllSizes = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Avatar name="XS" size="xs" variant="primary" />
      <Avatar name="SM" size="sm" variant="primary" />
      <Avatar name="MD" size="md" variant="primary" />
      <Avatar name="LG" size="lg" variant="primary" />
      <Avatar name="XL" size="xl" variant="primary" />
      <Avatar name="2XL" size="2xl" variant="primary" />
    </div>
  )
}

export const AllShapes = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Avatar name="Circle" shape="circle" variant="primary" size="lg" />
      <Avatar name="Square" shape="square" variant="success" size="lg" />
      <Avatar name="Rounded" shape="rounded" variant="warning" size="lg" />
    </div>
  )
}

export const AllVariants = {
  render: () => (
    <div class="flex gap-8 flex-wrap items-center">
      <Avatar name="PR" variant="primary" />
      <Avatar name="SC" variant="secondary" />
      <Avatar name="SU" variant="success" />
      <Avatar name="WR" variant="warning" />
      <Avatar name="DN" variant="danger" />
      <Avatar name="IN" variant="info" />
      <Avatar name="NT" variant="neutral" />
    </div>
  )
}

export const WithInitials = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Avatar initials="JD" variant="primary" />
      <Avatar initials="JS" variant="success" />
      <Avatar initials="AB" variant="warning" />
      <Avatar initials="CD" variant="danger" />
    </div>
  )
}

// Debug story z pełnym logowaniem
export const DebugMode = {
  render: () => {
    const [currentSrc, setCurrentSrc] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face')
    const [events, setEvents] = useState<string[]>([])
    const [renderCount, setRenderCount] = useState(0)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)
    
    // Track renders
    useEffect(() => {
      setRenderCount(prev => prev + 1)
      addEvent(`Component rendered (render #${renderCount + 1})`)
    })
    
    const addEvent = (event: string) => {
      const timestamp = new Date().toLocaleTimeString()
      setEvents(prev => [...prev.slice(-9), `[${timestamp}] ${event}`])
    }
    
    const handleImageError = () => {
      addEvent('Image failed to load')
      setImageError(true)
      setImageLoaded(false)
    }
    
    const testImage = (url: string) => {
      addEvent(`Testing image: ${url}`)
      setCurrentSrc(url)
      setImageLoaded(false)
      setImageError(false)
    }
    
    return (
      <div style="padding: 16px; border: 2px solid #007bff; border-radius: 8px; background: #f8f9fa;">
        <h3 style="margin: 0 0 16px 0; color: #007bff;">🔍 Avatar Debug Mode</h3>
        
        {/* Test Avatar */}
        <div style="margin-bottom: 20px;">
          <h4 style="margin: 0 0 8px 0;">Test Avatar:</h4>
          <Avatar
            src={currentSrc}
            name="John Doe"
            size="lg"
            variant="primary"
            showStatus={true}
            status="online"
            bordered={true}
            onError={handleImageError}
          />
        </div>
        
        {/* Controls */}
        <div style="margin-bottom: 16px;">
          <h4 style="margin: 0 0 8px 0;">Test Controls:</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button 
              onClick={() => testImage('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face')}
              style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: white;"
            >
              Valid Image
            </button>
            <button 
              onClick={() => testImage('invalid-url')}
              style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: white;"
            >
              Invalid Image
            </button>
            <button 
              onClick={() => testImage('')}
              style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: white;"
            >
              No Image
            </button>
            <button 
              onClick={() => addEvent('Manual event logged')}
              style="padding: 4px 8px; border: 1px solid #007bff; border-radius: 4px; background: #007bff; color: white;"
            >
              Log Event
            </button>
          </div>
        </div>
        
        {/* Status */}
        <div style="margin-bottom: 16px;">
          <h4 style="margin: 0 0 8px 0;">Status:</h4>
          <div style="font-family: monospace; font-size: 0.875rem;">
            <div>🔄 Renders: {renderCount}</div>
            <div>🖼️ Image: {imageLoaded ? '✅ Loaded' : imageError ? '❌ Error' : '⏳ Loading'}</div>
            <div>📄 Source: {currentSrc || 'No source'}</div>
          </div>
        </div>
        
        {/* Event Log */}
        <div>
          <h4 style="margin: 0 0 8px 0;">Event Log:</h4>
          <div style="max-height: 200px; overflow-y: auto; background: white; border: 1px solid #ccc; border-radius: 4px; padding: 8px;">
            {events.length === 0 ? (
              <div style="color: #999; font-style: italic;">No events yet...</div>
            ) : (
              events.map((event, index) => (
                <div key={index} style="font-family: monospace; font-size: 0.75rem; margin-bottom: 2px;">
                  {event}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete debugging story showing all avatar events, image loading, and component state changes.'
      }
    }
  }
}

// Real-time monitor story
export const RealTimeMonitor = {
  render: () => {
    const [src, setSrc] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face')
    const [name, setName] = useState('John Doe')
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md')
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'>('primary')
    const [shape, setShape] = useState<'circle' | 'square' | 'rounded'>('circle')
    const [status, setStatus] = useState<'online' | 'offline' | 'away' | 'busy'>('online')
    const [showStatus, setShowStatus] = useState(true)
    const [bordered, setBordered] = useState(false)
    const [eventLog, setEventLog] = useState<{time: string, type: string, data: any}[]>([])
    const [interactions, setInteractions] = useState(0)
    const [lastUpdate, setLastUpdate] = useState(Date.now())
    
    const logEvent = (type: string, data: any) => {
      const event = {
        time: new Date().toLocaleTimeString(),
        type,
        data
      }
      setEventLog(prev => [event, ...prev.slice(0, 19)])
      setInteractions(prev => prev + 1)
      setLastUpdate(Date.now())
    }
    
    const handleSrcChange = (value: string) => {
      logEvent('SRC_CHANGE', { value, previous: src })
      setSrc(value)
    }
    
    const handleNameChange = (value: string) => {
      logEvent('NAME_CHANGE', { value, previous: name })
      setName(value)
    }
    
    const handleSizeChange = (value: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
      logEvent('SIZE_CHANGE', { value, previous: size })
      setSize(value)
    }
    
    const handleVariantChange = (value: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral') => {
      logEvent('VARIANT_CHANGE', { value, previous: variant })
      setVariant(value)
    }
    
    const handleShapeChange = (value: 'circle' | 'square' | 'rounded') => {
      logEvent('SHAPE_CHANGE', { value, previous: shape })
      setShape(value)
    }
    
    const handleStatusChange = (value: 'online' | 'offline' | 'away' | 'busy') => {
      logEvent('STATUS_CHANGE', { value, previous: status })
      setStatus(value)
    }
    
    const handleShowStatusChange = (value: boolean) => {
      logEvent('SHOW_STATUS_CHANGE', { value, previous: showStatus })
      setShowStatus(value)
    }
    
    const handleBorderedChange = (value: boolean) => {
      logEvent('BORDERED_CHANGE', { value, previous: bordered })
      setBordered(value)
    }
    
    return (
      <div style="padding: 16px; border: 2px solid #10b981; border-radius: 8px; background: #f0fdf4;">
        <h3 style="margin: 0 0 16px 0; color: #10b981;">📊 Avatar Real-Time Monitor</h3>
        
        {/* Avatar */}
        <div style="margin-bottom: 20px; text-align: center;">
          <Avatar
            src={src}
            name={name}
            size={size}
            variant={variant}
            shape={shape}
            status={status}
            showStatus={showStatus}
            bordered={bordered}
            onError={() => logEvent('IMAGE_ERROR', { src })}
          />
        </div>
        
        {/* Live Controls */}
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 4px;">Image Source:</label>
            <input
              type="text"
              value={src}
              onChange={(e) => handleSrcChange((e.target as HTMLInputElement).value)}
              style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
            />
          </div>
          
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 4px;">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange((e.target as HTMLInputElement).value)}
              style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
            />
          </div>
          
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 4px;">Size:</label>
            <select
              value={size}
              onChange={(e) => handleSizeChange((e.target as HTMLSelectElement).value as any)}
              style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
            >
              <option value="xs">XS</option>
              <option value="sm">SM</option>
              <option value="md">MD</option>
              <option value="lg">LG</option>
              <option value="xl">XL</option>
              <option value="2xl">2XL</option>
            </select>
          </div>
          
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 4px;">Variant:</label>
            <select
              value={variant}
              onChange={(e) => handleVariantChange((e.target as HTMLSelectElement).value as any)}
              style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
              <option value="info">Info</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
          
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 4px;">Shape:</label>
            <select
              value={shape}
              onChange={(e) => handleShapeChange((e.target as HTMLSelectElement).value as any)}
              style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
            >
              <option value="circle">Circle</option>
              <option value="square">Square</option>
              <option value="rounded">Rounded</option>
            </select>
          </div>
          
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 4px;">Status:</label>
            <select
              value={status}
              onChange={(e) => handleStatusChange((e.target as HTMLSelectElement).value as any)}
              style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="away">Away</option>
              <option value="busy">Busy</option>
            </select>
          </div>
        </div>
        
        {/* Toggle Controls */}
        <div style="display: flex; gap: 16px; margin-bottom: 20px;">
          <label style="display: flex; align-items: center; gap: 8px;">
            <input
              type="checkbox"
              checked={showStatus}
              onChange={(e) => handleShowStatusChange((e.target as HTMLInputElement).checked)}
            />
            Show Status
          </label>
          <label style="display: flex; align-items: center; gap: 8px;">
            <input
              type="checkbox"
              checked={bordered}
              onChange={(e) => handleBorderedChange((e.target as HTMLInputElement).checked)}
            />
            Bordered
          </label>
        </div>
        
        {/* Statistics */}
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 1.5rem; font-weight: bold; color: #10b981;">{interactions}</div>
            <div style="font-size: 0.875rem; color: #666;">Interactions</div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 1.5rem; font-weight: bold; color: #3b82f6;">{eventLog.length}</div>
            <div style="font-size: 0.875rem; color: #666;">Events</div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 1rem; font-weight: bold; color: #f59e0b;">{new Date(lastUpdate).toLocaleTimeString()}</div>
            <div style="font-size: 0.875rem; color: #666;">Last Update</div>
          </div>
        </div>
        
        {/* Event Stream */}
        <div>
          <h4 style="margin: 0 0 8px 0;">Live Event Stream:</h4>
          <div style="max-height: 200px; overflow-y: auto; background: white; border: 1px solid #ccc; border-radius: 4px; padding: 8px;">
            {eventLog.length === 0 ? (
              <div style="color: #999; font-style: italic;">No events yet...</div>
            ) : (
              eventLog.map((event, index) => (
                <div key={index} style="font-family: monospace; font-size: 0.75rem; margin-bottom: 4px; padding: 4px; background: #f9f9f9; border-radius: 2px;">
                  <span style="color: #666;">[{event.time}]</span> <span style="color: #007bff; font-weight: bold;">{event.type}</span>: {JSON.stringify(event.data)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-time monitoring of all avatar props, state changes, and interactions with live statistics and event streaming.'
      }
    }
  }
}

export const AutoGeneratedInitials = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Avatar name="John Doe" variant="primary" />
      <Avatar name="Jane Smith" variant="success" />
      <Avatar name="Alice Brown" variant="warning" />
      <Avatar name="Bob Wilson Jr" variant="danger" />
    </div>
  )
}

export const WithStatus = {
  render: () => (
    <div class="flex gap-12 items-center">
      <Avatar name="Online" variant="primary" status="online" showStatus />
      <Avatar name="Offline" variant="secondary" status="offline" showStatus />
      <Avatar name="Away" variant="warning" status="away" showStatus />
      <Avatar name="Busy" variant="danger" status="busy" showStatus />
    </div>
  )
}

export const WithBorder = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Avatar name="JD" variant="primary" bordered />
      <Avatar name="JS" variant="success" bordered />
      <Avatar name="AB" variant="warning" bordered />
      <Avatar 
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        name="Sarah"
        bordered
      />
    </div>
  )
}

export const CustomColors = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Avatar name="CR" bg="#ff6b6b" color="white" />
      <Avatar name="CT" bg="#4ecdc4" color="white" />
      <Avatar name="CB" bg="#45b7d1" color="white" />
      <Avatar name="CG" bg="#96ceb4" color="#2d3436" />
    </div>
  )
}

export const WithCustomPlaceholder = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Avatar 
        placeholder={<span>👤</span>}
        variant="neutral"
      />
      <Avatar 
        placeholder={<span>🎭</span>}
        variant="primary"
      />
      <Avatar 
        placeholder={<span>🤖</span>}
        variant="success"
      />
    </div>
  )
}

export const UserList = {
  render: () => (
    <div class="flex flex-col gap-12">
      <h3>Team Members</h3>
      <div class="flex flex-col gap-8">
        <div class="flex gap-12 items-center">
          <Avatar 
            name="John Doe" 
            variant="primary" 
            status="online" 
            showStatus 
            size="md"
          />
          <div>
            <div class="font-medium">John Doe</div>
            <div class="text-sm text-gray-500">Software Engineer</div>
          </div>
        </div>
        
        <div class="flex gap-12 items-center">
          <Avatar 
            name="Jane Smith" 
            variant="success" 
            status="away" 
            showStatus 
            size="md"
          />
          <div>
            <div class="font-medium">Jane Smith</div>
            <div class="text-sm text-gray-500">Product Manager</div>
          </div>
        </div>
        
        <div class="flex gap-12 items-center">
          <Avatar 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            name="Mike Johnson" 
            status="busy" 
            showStatus 
            size="md"
            bordered
          />
          <div>
            <div class="font-medium">Mike Johnson</div>
            <div class="text-sm text-gray-500">Designer</div>
          </div>
        </div>
        
        <div class="flex gap-12 items-center">
          <Avatar 
            name="Sarah Wilson" 
            variant="warning" 
            status="offline" 
            showStatus 
            size="md"
          />
          <div>
            <div class="font-medium">Sarah Wilson</div>
            <div class="text-sm text-gray-500">QA Engineer</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AvatarGroup = {
  render: () => (
    <div class="flex flex-col gap-16">
      <div>
        <h3 class="mb-8">Overlapping Avatars</h3>
        <div class="flex" style="margin-left: -8px;">
          <Avatar name="John" variant="primary" size="md" bordered class="ml--8" />
          <Avatar name="Jane" variant="success" size="md" bordered class="ml--8" />
          <Avatar name="Mike" variant="warning" size="md" bordered class="ml--8" />
          <Avatar name="Sarah" variant="danger" size="md" bordered class="ml--8" />
          <div class="avatar avatar-md avatar-circle avatar-neutral ml--8" style="border: 2px solid white;">
            <span class="avatar-initials">+3</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="mb-8">Different Sizes Group</h3>
        <div class="flex gap-8 items-center">
          <Avatar name="Admin" variant="danger" size="lg" />
          <Avatar name="Mod" variant="warning" size="md" />
          <Avatar name="User1" variant="primary" size="sm" />
          <Avatar name="User2" variant="success" size="sm" />
          <Avatar name="User3" variant="info" size="sm" />
        </div>
      </div>
    </div>
  )
}

// Interactive test story
export const InteractiveTest = {
  args: {
    name: 'Test User',
    variant: 'primary',
    size: 'md',
    showStatus: true,
    status: 'online'
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: avatar is rendered
    const avatar = canvasElement.querySelector('.avatar')
    await expect(avatar).toBeInTheDocument()
    
    // Test: initials are displayed
    const initials = canvas.getByText('TU')
    await expect(initials).toBeInTheDocument()
    
    // Test: status indicator is present
    const status = canvasElement.querySelector('.avatar-status')
    await expect(status).toBeInTheDocument()
    
    // Test: avatar has correct classes
    await expect(avatar).toHaveClass('avatar', 'avatar-md', 'avatar-primary', 'avatar-with-status')
    
    // Test: status has correct class
    await expect(status).toHaveClass('avatar-status-online')
  }
}
