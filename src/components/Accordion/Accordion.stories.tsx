import Accordion, { AccordionItem } from './Accordion'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'
import { useState, useEffect } from 'preact/hooks'
import './Accordion.css'

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: 'Kolapsujący kontener dla grupowanych treści z animacjami'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'filled']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    }
  }
}

export const Default = {
  render: () => (
    <Accordion>
      <AccordionItem id="item1" title="Co to jest NanoLux?">
        <p>NanoLux to ultra-lekki framework komponentów dla Preact, 
        skoncentrowany na minimalizacji rozmiaru bundli przy zachowaniu 
        pełnej funkcjonalności.</p>
      </AccordionItem>
      <AccordionItem id="item2" title="Jakie są zalety?">
        <ul>
          <li>Bundly poniżej 1KB per komponent</li>
          <li>Tree-shaking friendly</li>
          <li>Zero konfiguracji</li>
          <li>Pełna kompatybilność z Preact</li>
        </ul>
      </AccordionItem>
      <AccordionItem id="item3" title="Jak zacząć?">
        <p>Zainstaluj NanoLux przez npm i zacznij używać komponentów:</p>
        <pre><code>npm install @nanolux/components</code></pre>
      </AccordionItem>
    </Accordion>
  )
}

export const WithDefaultOpen = {
  render: () => (
    <Accordion>
      <AccordionItem id="item1" title="Już otwarte" defaultOpen>
        <p>Ten element jest domyślnie otwarty dzięki właściwości defaultOpen.</p>
      </AccordionItem>
      <AccordionItem id="item2" title="Zamknięte">
        <p>Ten element jest domyślnie zamknięty.</p>
      </AccordionItem>
      <AccordionItem id="item3" title="Także zamknięte">
        <p>I ten też jest domyślnie zamknięty.</p>
      </AccordionItem>
    </Accordion>
  )
}

export const AllVariants = {
  render: () => (
    <div class="flex flex-col gap-24">
      <div>
        <h3>Default Variant</h3>
        <Accordion variant="default">
          <AccordionItem id="default1" title="Default Item 1">
            <p>Zawartość dla default variant.</p>
          </AccordionItem>
          <AccordionItem id="default2" title="Default Item 2">
            <p>Druga zawartość dla default variant.</p>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3>Bordered Variant</h3>
        <Accordion variant="bordered">
          <AccordionItem id="bordered1" title="Bordered Item 1">
            <p>Zawartość dla bordered variant z pogrubioną ramką.</p>
          </AccordionItem>
          <AccordionItem id="bordered2" title="Bordered Item 2">
            <p>Druga zawartość dla bordered variant.</p>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3>Filled Variant</h3>
        <Accordion variant="filled">
          <AccordionItem id="filled1" title="Filled Item 1">
            <p>Zawartość dla filled variant z wypełnionym tłem nagłówków.</p>
          </AccordionItem>
          <AccordionItem id="filled2" title="Filled Item 2">
            <p>Druga zawartość dla filled variant.</p>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export const AllSizes = {
  render: () => (
    <div class="flex flex-col gap-24">
      <div>
        <h3>Small Size</h3>
        <Accordion size="sm" variant="bordered">
          <AccordionItem id="sm1" title="Small Accordion">
            <p>Mniejszy tekst i padding w small size.</p>
          </AccordionItem>
          <AccordionItem id="sm2" title="Another Small Item">
            <p>Kolejny element w małym rozmiarze.</p>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3>Medium Size (Default)</h3>
        <Accordion size="md" variant="bordered">
          <AccordionItem id="md1" title="Medium Accordion">
            <p>Standardowy rozmiar tekstu i paddingu.</p>
          </AccordionItem>
          <AccordionItem id="md2" title="Another Medium Item">
            <p>Kolejny element w standardowym rozmiarze.</p>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3>Large Size</h3>
        <Accordion size="lg" variant="bordered">
          <AccordionItem id="lg1" title="Large Accordion">
            <p>Większy tekst i padding w large size dla lepszej czytelności.</p>
          </AccordionItem>
          <AccordionItem id="lg2" title="Another Large Item">
            <p>Kolejny element w dużym rozmiarze.</p>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export const WithIcons = {
  render: () => (
    <Accordion variant="filled">
      <AccordionItem 
        id="icon1" 
        title="Ustawienia" 
        icon={<span>⚙️</span>}
      >
        <p>Panel ustawień aplikacji z różnymi opcjami konfiguracji.</p>
      </AccordionItem>
      <AccordionItem 
        id="icon2" 
        title="Profil użytkownika" 
        icon={<span>👤</span>}
      >
        <p>Informacje o profilu użytkownika i opcje personalizacji.</p>
      </AccordionItem>
      <AccordionItem 
        id="icon3" 
        title="Pomoc" 
        icon={<span>❓</span>}
      >
        <p>Sekcja pomocy z najczęściej zadawanymi pytaniami.</p>
      </AccordionItem>
    </Accordion>
  )
}

export const WithDisabledItems = {
  render: () => (
    <Accordion>
      <AccordionItem id="enabled1" title="Dostępny element">
        <p>Ten element jest normalnie dostępny i można go rozwijać.</p>
      </AccordionItem>
      <AccordionItem id="disabled1" title="Wyłączony element" disabled>
        <p>Ten element jest wyłączony i nie można go rozwijać.</p>
      </AccordionItem>
      <AccordionItem id="enabled2" title="Kolejny dostępny element">
        <p>Ten element również jest dostępny.</p>
      </AccordionItem>
    </Accordion>
  )
}

// Interactive test story
export const InteractiveTest = {
  render: () => (
    <Accordion variant="bordered">
      <AccordionItem id="test1" title="Test Item 1">
        <p>First test content</p>
      </AccordionItem>
      <AccordionItem id="test2" title="Test Item 2" defaultOpen>
        <p>Second test content</p>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: accordion is rendered
    const accordion = canvasElement.querySelector('.accordion')
    await expect(accordion).toBeInTheDocument()
    
    // Test: headers are present
    const firstHeader = canvas.getByText('Test Item 1')
    const secondHeader = canvas.getByText('Test Item 2')
    await expect(firstHeader).toBeInTheDocument()
    await expect(secondHeader).toBeInTheDocument()
    
    // Test: second item is open by default
    const secondContent = canvas.getByText('Second test content')
    await expect(secondContent).toBeVisible()
    
    // Test: click to toggle first item
    const firstButton = firstHeader.closest('button')
    if (firstButton) {
      await userEvent.click(firstButton)
      
      // First content should now be visible
      const firstContent = canvas.getByText('First test content')
      await expect(firstContent).toBeVisible()
    }
    
    // Test: accordion has correct classes
    await expect(accordion).toHaveClass('accordion', 'accordion-bordered')
  }
}

// Debug story z pełnym logowaniem
export const DebugMode = {
  render: () => {
    const [events, setEvents] = useState<string[]>([])
    const [renderCount, setRenderCount] = useState(0)
    
    // Track renders
    useEffect(() => {
      setRenderCount(prev => prev + 1)
      addEvent(`Accordion debug story rendered (render #${renderCount + 1})`)
    })
    
    const addEvent = (event: string) => {
      const timestamp = new Date().toLocaleTimeString()
      setEvents(prev => [...prev.slice(-9), `[${timestamp}] ${event}`])
    }
    
    const performTestAction = (action: string) => {
      addEvent(`Test action: ${action}`)
    }
    
    return (
      <div style="padding: 16px; border: 2px solid #007bff; border-radius: 8px; background: #f8f9fa;">
        <h3 style="margin: 0 0 16px 0; color: #007bff;">🔍 Accordion Debug Mode</h3>
        
        {/* Test Accordion */}
        <div style="margin-bottom: 20px;">
          <h4 style="margin: 0 0 8px 0;">Test Accordion:</h4>
          <Accordion variant="bordered" size="md">
            <AccordionItem 
              id="item1" 
              title="Debug Item 1" 
              defaultOpen={true}
            >
              <p>To jest zawartość pierwszego elementu. Kliknij nagłówek aby go zamknąć/otworzyć.</p>
              <p>This item tracks internal state management and renders.</p>
            </AccordionItem>
            <AccordionItem 
              id="item2" 
              title="Debug Item 2"
              defaultOpen={false}
            >
              <p>To jest zawartość drugiego elementu z dodatkową listą:</p>
              <ul>
                <li>Element 1</li>
                <li>Element 2</li>
                <li>Element 3</li>
              </ul>
              <p>This item demonstrates list content with debug info.</p>
            </AccordionItem>
            <AccordionItem 
              id="item3" 
              title="Debug Item 3 (Disabled)" 
              disabled
              defaultOpen={false}
            >
              <p>Ten element jest wyłączony i nie może być kliknięty.</p>
              <p>This demonstrates disabled state behavior.</p>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Controls */}
        <div style="margin-bottom: 16px;">
          <h4 style="margin: 0 0 8px 0;">Debug Controls:</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button 
              onClick={() => performTestAction('Test accordion variant')}
              style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: white;"
            >
              Test Variant
            </button>
            <button 
              onClick={() => performTestAction('Test accessibility')}
              style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: white;"
            >
              Test A11y
            </button>
            <button 
              onClick={() => performTestAction('Test disabled state')}
              style="padding: 4px 8px; border: 1px solid #007bff; border-radius: 4px; background: #007bff; color: white;"
            >
              Test Disabled
            </button>
            <button 
              onClick={() => addEvent('Manual event logged')}
              style="padding: 4px 8px; border: 1px solid #28a745; border-radius: 4px; background: #28a745; color: white;"
            >
              Log Event
            </button>
          </div>
        </div>
        
        {/* Status */}
        <div style="margin-bottom: 16px;">
          <h4 style="margin: 0 0 8px 0;">Debug Status:</h4>
          <div style="font-family: monospace; font-size: 0.875rem;">
            <div>🔄 Renders: {renderCount}</div>
            <div>� Component: Accordion with self-managed AccordionItems</div>
            <div>⚙️ State: Items manage their own open/closed state</div>
            <div>🔢 Total Events: {events.length}</div>
          </div>
        </div>
        
        {/* Component Info */}
        <div style="margin-bottom: 16px;">
          <h4 style="margin: 0 0 8px 0;">Component Architecture:</h4>
          <div style="font-family: monospace; font-size: 0.75rem; background: white; padding: 8px; border-radius: 4px;">
            <div style="color: #007bff;">Accordion:</div>
            <div>- Container component with variant/size styling</div>
            <div>- Does not control child state</div>
            <div style="color: #007bff; margin-top: 8px;">AccordionItem:</div>
            <div>- Self-contained with internal useState</div>
            <div>- Manages own open/closed state</div>
            <div>- Supports defaultOpen, disabled props</div>
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
        story: 'Complete debugging story showing all accordion interactions, animations, and state changes.'
      }
    }
  }
}

// Real-time monitor story
export const RealTimeAccordionMonitor = {
  render: () => {
    const [variant, setVariant] = useState<'default' | 'bordered' | 'filled'>('default')
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
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
    
    const handleVariantChange = (value: 'default' | 'bordered' | 'filled') => {
      logEvent('VARIANT_CHANGE', { value, previous: variant })
      setVariant(value)
    }
    
    const handleSizeChange = (value: 'sm' | 'md' | 'lg') => {
      logEvent('SIZE_CHANGE', { value, previous: size })
      setSize(value)
    }
    
    return (
      <div style="padding: 16px; border: 2px solid #10b981; border-radius: 8px; background: #f0fdf4;">
        <h3 style="margin: 0 0 16px 0; color: #10b981;">📊 Accordion Real-Time Monitor</h3>
        
        {/* Accordion */}
        <div style="margin-bottom: 20px;">
          <Accordion variant={variant} size={size}>
            <AccordionItem 
              id="monitor1" 
              title="🔧 Configuration Panel" 
              defaultOpen={false}
            >
              <div style="padding: 8px;">
                <h5>Accordion Settings</h5>
                <p>This panel contains configuration options and real-time settings for the accordion component.</p>
                <ul>
                  <li>Variant: {variant}</li>
                  <li>Size: {size}</li>
                  <li>Interactions: {interactions}</li>
                </ul>
              </div>
            </AccordionItem>
            <AccordionItem 
              id="monitor2" 
              title="📊 Analytics Dashboard"
              defaultOpen={true}
            >
              <div style="padding: 8px;">
                <h5>Live Statistics</h5>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 8px;">
                  <div style="text-align: center; padding: 8px; background: white; border-radius: 4px;">
                    <div style="font-weight: bold; color: #10b981;">{interactions}</div>
                    <div style="font-size: 0.75rem;">Interactions</div>
                  </div>
                  <div style="text-align: center; padding: 8px; background: white; border-radius: 4px;">
                    <div style="font-weight: bold; color: #3b82f6;">{eventLog.length}</div>
                    <div style="font-size: 0.75rem;">Events</div>
                  </div>
                </div>
              </div>
            </AccordionItem>
            <AccordionItem 
              id="monitor3" 
              title="🎨 Customization Options"
              defaultOpen={false}
            >
              <div style="padding: 8px;">
                <h5>Style Customization</h5>
                <p>Customize the appearance and behavior of the accordion:</p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <div>
                    <label style="display: block; font-weight: 500; margin-bottom: 4px;">Variant:</label>
                    <select
                      value={variant}
                      onChange={(e) => handleVariantChange((e.target as HTMLSelectElement).value as any)}
                      style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
                    >
                      <option value="default">Default</option>
                      <option value="bordered">Bordered</option>
                      <option value="filled">Filled</option>
                    </select>
                  </div>
                  <div>
                    <label style="display: block; font-weight: 500; margin-bottom: 4px;">Size:</label>
                    <select
                      value={size}
                      onChange={(e) => handleSizeChange((e.target as HTMLSelectElement).value as any)}
                      style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
                    >
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                    </select>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Statistics */}
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 1.5rem; font-weight: bold; color: #10b981;">{interactions}</div>
            <div style="font-size: 0.875rem; color: #666;">Interactions</div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 1.5rem; font-weight: bold; color: #3b82f6;">{eventLog.length}</div>
            <div style="font-size: 0.875rem; color: #666;">Events Logged</div>
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
        story: 'Real-time monitoring of all accordion props, interactions, and state changes with live statistics.'
      }
    }
  }
}
