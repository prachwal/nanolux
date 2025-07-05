import { useState, useEffect } from 'preact/hooks'
import Checkbox from './Checkbox'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'
import './Checkbox.css'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: 'Checkbox komponent do wyboru opcji boolean z obsługą indeterminate state'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    checked: {
      control: 'boolean'
    },
    indeterminate: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    error: {
      control: 'boolean'
    }
  }
}

// Basic stories with interactive state
export const Default = {
  args: {
    label: 'Default checkbox',
    checked: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic checkbox that can be toggled. Use the Controls panel to change props.'
      }
    }
  }
}

export const Checked = {
  args: {
    label: 'Checked checkbox',
    checked: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox that starts in checked state.'
      }
    }
  }
}

export const Indeterminate = {
  args: {
    label: 'Indeterminate checkbox',
    indeterminate: true,
    checked: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox in indeterminate state (partially checked).'
      }
    }
  }
}

// Comparison: Native vs Custom checkbox
export const NativeVsCustom = {
  render: () => {
    const [nativeChecked, setNativeChecked] = useState(false)
    const [customChecked, setCustomChecked] = useState(false)
    
    return (
      <div style="padding: 20px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px;">
        <h3 style="margin: 0 0 16px 0;">🔄 Native vs Custom Comparison</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          {/* Native Checkbox */}
          <div style="padding: 16px; background: white; border-radius: 4px; border: 1px solid #ccc;">
            <h4 style="margin: 0 0 12px 0; color: #007bff;">Native HTML Checkbox</h4>
            <div style="margin: 8px 0;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input 
                  type="checkbox" 
                  checked={nativeChecked}
                  onChange={(e) => {
                    console.log('Native onChange:', (e.target as HTMLInputElement).checked)
                    setNativeChecked((e.target as HTMLInputElement).checked)
                  }}
                />
                Native checkbox label
              </label>
            </div>
            <div style="margin: 8px 0; font-size: 12px;">
              State: <strong>{nativeChecked ? 'CHECKED' : 'UNCHECKED'}</strong>
            </div>
            <button 
              onClick={() => setNativeChecked(!nativeChecked)}
              style="padding: 4px 8px; font-size: 11px;"
            >
              Toggle Native
            </button>
          </div>
          
          {/* Custom Checkbox */}
          <div style="padding: 16px; background: white; border-radius: 4px; border: 1px solid #ccc;">
            <h4 style="margin: 0 0 12px 0; color: #28a745;">NanoLux Checkbox</h4>
            <div style="margin: 8px 0;">
              <Checkbox 
                label="Custom checkbox label"
                checked={customChecked}
                onChange={(newValue) => {
                  console.log('Custom onChange:', newValue)
                  setCustomChecked(newValue)
                }}
              />
            </div>
            <div style="margin: 8px 0; font-size: 12px;">
              State: <strong>{customChecked ? 'CHECKED' : 'UNCHECKED'}</strong>
            </div>
            <button 
              onClick={() => setCustomChecked(!customChecked)}
              style="padding: 4px 8px; font-size: 11px;"
            >
              Toggle Custom
            </button>
          </div>
        </div>
        
        <div style="margin: 20px 0; padding: 12px; background: #e7f3ff; border-radius: 4px;">
          <h5 style="margin: 0 0 8px 0;">Expected Behavior:</h5>
          <ul style="margin: 0; padding-left: 20px; font-size: 12px;">
            <li>Both checkboxes should toggle when clicked</li>
            <li>State should update in real-time</li>
            <li>Manual toggle buttons should work for both</li>
            <li>Console should show onChange events</li>
          </ul>
        </div>
      </div>
    )
  }
}

// Simple test to isolate the problem
export const SimpleTest = {
  render: () => {
    const [checked, setChecked] = useState(false)
    
    return (
      <div style="padding: 20px; background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px;">
        <h3 style="margin: 0 0 16px 0;">🧪 Simple Checkbox Test</h3>
        
        <div style="margin: 16px 0; font-size: 18px;">
          Status: <strong style={`color: ${checked ? 'green' : 'red'}`}>
            {checked ? '✅ CHECKED' : '❌ UNCHECKED'}
          </strong>
        </div>
        
        <div style="margin: 16px 0;">
          <Checkbox 
            label="Simple test checkbox" 
            checked={checked}
            onChange={(newValue) => {
              console.log('Simple test onChange:', newValue)
              setChecked(newValue)
            }}
          />
        </div>
        
        <div style="margin: 16px 0;">
          <button onClick={() => setChecked(!checked)}>
            Manual Toggle (Current: {checked ? 'ON' : 'OFF'})
          </button>
        </div>
        
        <div style="margin: 16px 0; font-size: 12px; color: #666;">
          <em>If you see this changing when you click the checkbox, it's working!</em>
        </div>
      </div>
    )
  }
}

// Debug story z pełnym logowaniem
export const DebugMode = {
  render: () => {
    const [checked, setChecked] = useState(false)
    const [events, setEvents] = useState<string[]>([])
    const [renderCount, setRenderCount] = useState(0)
    
    // Track renders
    useEffect(() => {
      setRenderCount(prev => prev + 1)
      addEvent(`Component rendered (render #${renderCount + 1})`)
    })
    
    const addEvent = (event: string) => {
      const timestamp = new Date().toLocaleTimeString()
      setEvents(prev => [...prev.slice(-9), `[${timestamp}] ${event}`])
    }
    
    const handleChange = (newChecked: boolean) => {
      addEvent(`onChange called with: ${newChecked}`)
      addEvent(`Previous state: ${checked}`)
      setChecked(newChecked)
      addEvent(`State updated to: ${newChecked}`)
    }
    
    const handleClick = (e: Event) => {
      addEvent(`Click event on: ${(e.target as HTMLElement).tagName}`)
      addEvent(`Event type: ${e.type}`)
    }
    
    return (
      <div style="padding: 16px; border: 2px solid #007bff; border-radius: 8px; background: #f8f9fa;">
        <h3 style="margin: 0 0 16px 0; color: #007bff;">🔍 Checkbox Debug Mode</h3>
        
        {/* Current State */}
        <div style="margin: 16px 0; padding: 12px; background: white; border-radius: 4px; border: 1px solid #dee2e6;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #495057;">Current State:</h4>
          <p style="margin: 0; font-family: monospace; font-size: 12px;">
            <strong>checked:</strong> <span style={`color: ${checked ? '#28a745' : '#dc3545'}`}>{checked.toString()}</span><br/>
            <strong>renders:</strong> {renderCount}<br/>
            <strong>timestamp:</strong> {new Date().toLocaleTimeString()}
          </p>
        </div>
        
        {/* Checkbox Component */}
        <div 
          style="margin: 16px 0; padding: 12px; background: white; border-radius: 4px; border: 1px solid #dee2e6;"
          onClick={handleClick}
        >
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #495057;">Checkbox Component:</h4>
          <Checkbox 
            label="Debug Checkbox - Click me!" 
            checked={checked}
            onChange={handleChange}
          />
        </div>
        
        {/* Manual Controls */}
        <div style="margin: 16px 0; padding: 12px; background: white; border-radius: 4px; border: 1px solid #dee2e6;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #495057;">Manual Controls:</h4>
          <button 
            onClick={() => {
              addEvent(`Manual toggle button clicked`)
              handleChange(!checked)
            }}
            style="margin-right: 8px; padding: 4px 8px; font-size: 12px; background: #007bff; color: white; border: none; border-radius: 4px;"
          >
            Toggle State
          </button>
          <button 
            onClick={() => {
              addEvent(`Force re-render triggered`)
              setRenderCount(prev => prev + 1)
            }}
            style="margin-right: 8px; padding: 4px 8px; font-size: 12px; background: #6c757d; color: white; border: none; border-radius: 4px;"
          >
            Force Re-render
          </button>
          <button 
            onClick={() => {
              setEvents([])
              addEvent(`Event log cleared`)
            }}
            style="padding: 4px 8px; font-size: 12px; background: #dc3545; color: white; border: none; border-radius: 4px;"
          >
            Clear Log
          </button>
        </div>
        
        {/* Event Log */}
        <div style="margin: 16px 0; padding: 12px; background: #212529; border-radius: 4px; color: #f8f9fa;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #ffc107;">Event Log (last 10):</h4>
          <div style="font-family: monospace; font-size: 11px; max-height: 150px; overflow-y: auto;">
            {events.length === 0 ? (
              <p style="margin: 0; color: #6c757d;">No events yet...</p>
            ) : (
              events.map((event, index) => (
                <div key={index} style="margin: 2px 0; color: #28a745;">
                  {event}
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* DOM Inspection */}
        <div style="margin: 16px 0; padding: 12px; background: white; border-radius: 4px; border: 1px solid #dee2e6;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #495057;">DOM Inspection:</h4>
          <button 
            onClick={() => {
              const checkboxInput = document.querySelector('.checkbox-input') as HTMLInputElement
              if (checkboxInput) {
                addEvent(`DOM checkbox.checked = ${checkboxInput.checked}`)
                addEvent(`DOM checkbox.indeterminate = ${checkboxInput.indeterminate}`)
                addEvent(`DOM checkbox.disabled = ${checkboxInput.disabled}`)
                addEvent(`DOM checkbox has focus = ${document.activeElement === checkboxInput}`)
              } else {
                addEvent(`DOM checkbox input not found!`)
              }
            }}
            style="padding: 4px 8px; font-size: 12px; background: #17a2b8; color: white; border: none; border-radius: 4px;"
          >
            Inspect DOM State
          </button>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete debugging story showing all events, state changes, and DOM interactions.'
      }
    }
  }
}

export const AllSizes = {
  render: () => {
    const [checkedSm, setCheckedSm] = useState(false)
    const [checkedMd, setCheckedMd] = useState(false)
    const [checkedLg, setCheckedLg] = useState(false)
    
    return (
      <div class="flex flex-col gap-16">
        <Checkbox 
          size="sm" 
          label="Small checkbox" 
          checked={checkedSm}
          onChange={setCheckedSm}
        />
        <Checkbox 
          size="md" 
          label="Medium checkbox (default)" 
          checked={checkedMd}
          onChange={setCheckedMd}
        />
        <Checkbox 
          size="lg" 
          label="Large checkbox" 
          checked={checkedLg}
          onChange={setCheckedLg}
        />
      </div>
    )
  }
}

export const States = {
  render: () => {
    const [normalChecked, setNormalChecked] = useState(false)
    const [preChecked, setPreChecked] = useState(true)
    const [indeterminateChecked, setIndeterminateChecked] = useState(false)
    const [errorChecked, setErrorChecked] = useState(false)
    
    return (
      <div class="flex flex-col gap-16">
        <Checkbox 
          label="Normal checkbox" 
          checked={normalChecked}
          onChange={setNormalChecked}
        />
        <Checkbox 
          label="Pre-checked checkbox" 
          checked={preChecked}
          onChange={setPreChecked}
        />
        <Checkbox 
          label="Indeterminate checkbox" 
          indeterminate={true} 
          checked={indeterminateChecked}
          onChange={setIndeterminateChecked}
        />
        <Checkbox 
          label="Error checkbox" 
          error={true} 
          checked={errorChecked}
          onChange={setErrorChecked}
        />
        <Checkbox label="Disabled checkbox" disabled={true} />
        <Checkbox label="Disabled checked" disabled={true} checked={true} />
      </div>
    )
  }
}

export const WithoutLabel = {
  render: () => {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(true)
    const [checked3, setChecked3] = useState(false)
    
    return (
      <div class="flex gap-16 items-center">
        <Checkbox 
          aria-label="Checkbox without visible label" 
          checked={checked1}
          onChange={setChecked1}
        />
        <Checkbox 
          checked={checked2} 
          aria-label="Checked checkbox without label"
          onChange={setChecked2}
        />
        <Checkbox 
          indeterminate={true} 
          checked={checked3}
          aria-label="Indeterminate checkbox without label"
          onChange={setChecked3}
        />
      </div>
    )
  }
}

export const FormExample = {
  render: () => {
    const [emailNotifications, setEmailNotifications] = useState(false)
    const [smsNotifications, setSmsNotifications] = useState(false)
    const [pushNotifications, setPushNotifications] = useState(true)
    const [termsAccepted, setTermsAccepted] = useState(false)
    
    return (
      <form class="flex flex-col gap-12">
        <div>
          <h3 class="mb-8 font-medium">Select your preferences:</h3>
          <div class="flex flex-col gap-8">
            <Checkbox 
              name="notifications" 
              value="email" 
              label="Email notifications" 
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
            <Checkbox 
              name="notifications" 
              value="sms" 
              label="SMS notifications" 
              checked={smsNotifications}
              onChange={setSmsNotifications}
            />
            <Checkbox 
              name="notifications" 
              value="push" 
              label="Push notifications" 
              checked={pushNotifications}
              onChange={setPushNotifications}
            />
          </div>
        </div>
        
        <div class="mt-16">
          <Checkbox 
            name="terms" 
            value="accepted" 
            label="I agree to the Terms of Service and Privacy Policy"
            error={false}
            checked={termsAccepted}
            onChange={setTermsAccepted}
          />
        </div>
      </form>
    )
  }
}

export const CustomStyling = {
  render: () => {
    const [greenChecked, setGreenChecked] = useState(true)
    const [orangeChecked, setOrangeChecked] = useState(true)
    const [largeChecked, setLargeChecked] = useState(true)
    
    return (
      <div class="flex flex-col gap-16">
        <div style="--checkbox-bg-checked: #10b981; --checkbox-border-checked: #10b981;">
          <Checkbox 
            label="Green checkbox" 
            checked={greenChecked}
            onChange={setGreenChecked}
          />
        </div>
        <div style="--checkbox-bg-checked: #f59e0b; --checkbox-border-checked: #f59e0b;">
          <Checkbox 
            label="Orange checkbox" 
            checked={orangeChecked}
            onChange={setOrangeChecked}
          />
        </div>
        <div style="--checkbox-size: 24px; --checkbox-check-size: 16px;">
          <Checkbox 
            label="Extra large checkbox" 
            checked={largeChecked}
            onChange={setLargeChecked}
          />
        </div>
      </div>
    )
  }
}

// Interactive story with tests
export const InteractiveTest = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox 
        label="Test checkbox" 
        checked={checked}
        onChange={setChecked}
      />
    )
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    const label = canvas.getByLabelText('Test checkbox')
    
    // Test: checkbox jest widoczny
    await expect(checkbox).toBeInTheDocument()
    await expect(label).toBeInTheDocument()
    
    // Test: początkowy stan
    await expect(checkbox).not.toBeChecked()
    
    // Test: kliknięcie zaznacza checkbox
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    
    // Test: ponowne kliknięcie odznacza
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
    
    // Test: kliknięcie na label też działa
    await userEvent.click(label)
    await expect(checkbox).toBeChecked()
  }
}

export const KeyboardNavigation = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox 
        label="Keyboard accessible checkbox" 
        checked={checked}
        onChange={setChecked}
      />
    )
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    
    // Focus na checkbox
    checkbox.focus()
    await expect(checkbox).toHaveFocus()
    
    // Test: spacja zaznacza/odznacza
    await userEvent.keyboard(' ')
    await expect(checkbox).toBeChecked()
    
    await userEvent.keyboard(' ')
    await expect(checkbox).not.toBeChecked()
  }
}

export const DisabledState = {
  args: {
    label: 'Disabled checkbox',
    disabled: true
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    
    // Test: checkbox jest disabled
    await expect(checkbox).toBeDisabled()
    
    // Test: kliknięcie nie zmienia stanu
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  }
}

// Real-time monitor story
export const RealTimeMonitor = {
  render: () => {
    const [checked, setChecked] = useState(false)
    const [indeterminate, setIndeterminate] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [eventLog, setEventLog] = useState<{time: string, type: string, data: any}[]>([])
    const [interactions, setInteractions] = useState(0)
    const [lastUpdate, setLastUpdate] = useState(Date.now())
    
    const logEvent = (type: string, data: any) => {
      const event = {
        time: new Date().toLocaleTimeString(),
        type,
        data
      }
      setEventLog(prev => [...prev.slice(-19), event])
      setInteractions(prev => prev + 1)
      setLastUpdate(Date.now())
    }
    
    return (
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
        {/* Left Panel - Controls and Component */}
        <div style="padding: 16px; background: white; border-radius: 8px; border: 1px solid #dee2e6;">
          <h3 style="margin: 0 0 16px 0; color: #495057;">⚡ Real-Time Checkbox Monitor</h3>
          
          {/* Live Stats */}
          <div style="margin: 12px 0; padding: 12px; background: #e9ecef; border-radius: 4px; font-family: monospace; font-size: 12px;">
            <div><strong>Current State:</strong> {checked ? '✅ CHECKED' : '❌ UNCHECKED'}</div>
            <div><strong>Indeterminate:</strong> {indeterminate ? '➖ YES' : '⬜ NO'}</div>
            <div><strong>Disabled:</strong> {disabled ? '🚫 YES' : '✅ NO'}</div>
            <div><strong>Interactions:</strong> {interactions}</div>
            <div><strong>Last Update:</strong> {new Date(lastUpdate).toLocaleTimeString()}</div>
          </div>
          
          {/* Main Checkbox */}
          <div style="margin: 16px 0; padding: 16px; border: 2px solid #007bff; border-radius: 4px;">
            <Checkbox 
              label="🎯 Monitor Target Checkbox"
              checked={checked}
              indeterminate={indeterminate}
              disabled={disabled}
              onChange={(newChecked) => {
                logEvent('onChange', { newChecked, previousChecked: checked })
                setChecked(newChecked)
              }}
            />
          </div>
          
          {/* Control Panel */}
          <div style="margin: 16px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button 
              onClick={() => {
                logEvent('programmaticToggle', { from: checked, to: !checked })
                setChecked(!checked)
              }}
              style="padding: 8px; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 12px;"
            >
              Toggle Checked
            </button>
            <button 
              onClick={() => {
                logEvent('toggleIndeterminate', { from: indeterminate, to: !indeterminate })
                setIndeterminate(!indeterminate)
              }}
              style="padding: 8px; background: #6c757d; color: white; border: none; border-radius: 4px; font-size: 12px;"
            >
              Toggle Indeterminate
            </button>
            <button 
              onClick={() => {
                logEvent('toggleDisabled', { from: disabled, to: !disabled })
                setDisabled(!disabled)
              }}
              style="padding: 8px; background: #ffc107; color: black; border: none; border-radius: 4px; font-size: 12px;"
            >
              Toggle Disabled
            </button>
            <button 
              onClick={() => {
                setEventLog([])
                setInteractions(0)
                logEvent('systemReset', { action: 'logs cleared' })
              }}
              style="padding: 8px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size: 12px;"
            >
              Clear Logs
            </button>
          </div>
          
          {/* Quick Tests */}
          <div style="margin: 16px 0;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px;">🧪 Quick Tests:</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
              <button 
                onClick={() => {
                  // Rapid toggle test
                  [false, true, false, true].forEach((state, i) => {
                    setTimeout(() => {
                      logEvent('rapidToggle', { step: i + 1, state })
                      setChecked(state)
                    }, i * 100)
                  })
                }}
                style="padding: 4px 8px; background: #17a2b8; color: white; border: none; border-radius: 2px; font-size: 10px;"
              >
                Rapid Toggle
              </button>
              <button 
                onClick={() => {
                  // State cycle test  
                  logEvent('stateCycle', { action: 'starting cycle' })
                  setChecked(false)
                  setIndeterminate(false)
                  setTimeout(() => { setChecked(true); logEvent('stateCycle', { step: 'checked' }) }, 500)
                  setTimeout(() => { setChecked(false); setIndeterminate(true); logEvent('stateCycle', { step: 'indeterminate' }) }, 1000)
                  setTimeout(() => { setIndeterminate(false); logEvent('stateCycle', { step: 'reset' }) }, 1500)
                }}
                style="padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 2px; font-size: 10px;"
              >
                State Cycle
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Live Event Log */}
        <div style="padding: 16px; background: #212529; border-radius: 8px; color: white;">
          <h3 style="margin: 0 0 16px 0; color: #ffc107;">📊 Live Event Stream</h3>
          
          <div style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; font-size: 11px;">
            Total Events: <strong>{eventLog.length}</strong> | 
            Updates/min: <strong>{Math.round((interactions / ((Date.now() - (eventLog[0]?.time ? new Date(`1970-01-01 ${eventLog[0].time}`).getTime() : Date.now())) / 60000)) || 0)}</strong>
          </div>
          
          <div style="max-height: 400px; overflow-y: auto; font-family: monospace; font-size: 10px;">
            {eventLog.length === 0 ? (
              <div style="color: #6c757d; font-style: italic;">Waiting for events...</div>
            ) : (
              eventLog.slice().reverse().map((event: any, index: number) => (
                <div 
                  key={`${event.time}-${index}`}
                  style={`margin: 2px 0; padding: 4px; border-left: 3px solid ${
                    event.type.includes('onChange') ? '#28a745' :
                    event.type.includes('programmatic') ? '#007bff' :
                    event.type.includes('Key') ? '#ffc107' :
                    event.type.includes('Mouse') ? '#fd7e14' :
                    event.type.includes('Focus') || event.type.includes('Blur') ? '#20c997' :
                    '#6c757d'
                  }; background: rgba(255,255,255,0.05); border-radius: 2px;`}
                >
                  <div style="color: #ffc107; font-weight: bold;">
                    [{event.time}] {event.type}
                  </div>
                  <div style="color: #e9ecef; margin-left: 8px;">
                    {typeof event.data === 'object' ? 
                      Object.entries(event.data).map(([key, value]) => 
                        `${key}: ${JSON.stringify(value)}`
                      ).join(', ') : 
                      String(event.data)
                    }
                  </div>
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
        story: 'Real-time monitoring of all checkbox events, state changes, and interactions with live statistics and event streaming.'
      }
    }
  }
}

// DOM Event Debug story
export const DOMEventDebug = {
  render: () => {
    const [checked, setChecked] = useState(false)
    const [domEvents, setDomEvents] = useState<{time: string, event: string, target: string, detail: any}[]>([])
    
    const logDOMEvent = (eventName: string, event: Event) => {
      const target = event.target as HTMLElement
      const detail = {
        tagName: target.tagName,
        className: target.className,
        id: target.id,
        type: (target as any).type || 'N/A',
        checked: (target as any).checked || 'N/A'
      }
      
      setDomEvents(prev => [...prev.slice(-14), {
        time: new Date().toLocaleTimeString(),
        event: eventName,
        target: target.tagName + (target.className ? `.${target.className}` : ''),
        detail
      }])
    }
    
    return (
      <div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">
        <h3 style="margin: 0 0 16px 0;">🎯 DOM Event Analysis</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          {/* Left - Checkbox with event listeners */}
          <div style="padding: 16px; background: white; border-radius: 8px; border: 1px solid #dee2e6;">
            <h4 style="margin: 0 0 12px 0; color: #495057;">Test Checkbox</h4>
            
            <div style="margin: 12px 0; padding: 8px; background: #e9ecef; border-radius: 4px; font-size: 12px;">
              <strong>State:</strong> {checked ? '✅ CHECKED' : '❌ UNCHECKED'}
            </div>
            
            <div 
              style="margin: 16px 0; padding: 16px; border: 2px dashed #007bff; border-radius: 4px; position: relative;"
              onClick={(e) => logDOMEvent('container-click', e)}
              onMouseDown={(e) => logDOMEvent('container-mousedown', e)}
              onMouseUp={(e) => logDOMEvent('container-mouseup', e)}
            >
              <div style="position: absolute; top: -10px; left: 8px; background: white; padding: 0 4px; font-size: 10px; color: #007bff;">
                Container with event listeners
              </div>
              
              <Checkbox 
                label="🎯 Debug Target Checkbox"
                checked={checked}
                onChange={(newChecked) => {
                  console.log('✅ onChange callback called:', newChecked)
                  setChecked(newChecked)
                  setDomEvents(prev => [...prev.slice(-14), {
                    time: new Date().toLocaleTimeString(),
                    event: 'onChange',
                    target: 'Checkbox',
                    detail: { newChecked, previousChecked: checked }
                  }])
                }}
              />
            </div>
            
            <div style="margin: 16px 0;">
              <button 
                onClick={() => {
                  setChecked(!checked)
                  setDomEvents(prev => [...prev.slice(-14), {
                    time: new Date().toLocaleTimeString(),
                    event: 'manual-toggle',
                    target: 'button',
                    detail: { from: checked, to: !checked }
                  }])
                }}
                style="padding: 8px 12px; background: #28a745; color: white; border: none; border-radius: 4px; font-size: 12px;"
              >
                Manual Toggle
              </button>
              
              <button 
                onClick={() => setDomEvents([])}
                style="margin-left: 8px; padding: 8px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size: 12px;"
              >
                Clear Events
              </button>
            </div>
            
            {/* DOM Inspector */}
            <div style="margin: 16px 0;">
              <button 
                onClick={() => {
                  const input = document.querySelector('.checkbox-input') as HTMLInputElement
                  const visual = document.querySelector('.checkbox-visual') as HTMLElement
                  const container = document.querySelector('.checkbox-container') as HTMLElement
                  
                  if (input && visual && container) {
                    const inputRect = input.getBoundingClientRect()
                    const visualRect = visual.getBoundingClientRect()
                    const containerRect = container.getBoundingClientRect()
                    
                    setDomEvents(prev => [...prev.slice(-11), 
                      {
                        time: new Date().toLocaleTimeString(),
                        event: 'DOM-inspection',
                        target: 'input',
                        detail: { 
                          position: `${inputRect.x},${inputRect.y}`,
                          size: `${inputRect.width}x${inputRect.height}`,
                          checked: input.checked,
                          disabled: input.disabled
                        }
                      },
                      {
                        time: new Date().toLocaleTimeString(),
                        event: 'DOM-inspection',
                        target: 'visual',
                        detail: { 
                          position: `${visualRect.x},${visualRect.y}`,
                          size: `${visualRect.width}x${visualRect.height}`
                        }
                      },
                      {
                        time: new Date().toLocaleTimeString(),
                        event: 'DOM-inspection',
                        target: 'container',
                        detail: { 
                          position: `${containerRect.x},${containerRect.y}`,
                          size: `${containerRect.width}x${containerRect.height}`
                        }
                      }
                    ])
                  }
                }}
                style="padding: 4px 8px; background: #17a2b8; color: white; border: none; border-radius: 4px; font-size: 10px;"
              >
                Inspect DOM Layout
              </button>
            </div>
          </div>
          
          {/* Right - Event Log */}
          <div style="padding: 16px; background: #212529; border-radius: 8px; color: white;">
            <h4 style="margin: 0 0 12px 0; color: #ffc107;">📊 DOM Event Stream</h4>
            
            <div style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; font-size: 11px;">
              Events: <strong>{domEvents.length}</strong>
            </div>
            
            <div style="max-height: 400px; overflow-y: auto; font-family: monospace; font-size: 10px;">
              {domEvents.length === 0 ? (
                <div style="color: #6c757d; font-style: italic;">Click checkbox to see events...</div>
              ) : (
                domEvents.slice().reverse().map((event, index) => (
                  <div 
                    key={`${event.time}-${index}`}
                    style={`margin: 2px 0; padding: 4px; border-left: 3px solid ${
                      event.event === 'onChange' ? '#28a745' :
                      event.event.includes('click') ? '#007bff' :
                      event.event.includes('mouse') ? '#fd7e14' :
                      event.event === 'manual-toggle' ? '#6f42c1' :
                      event.event === 'DOM-inspection' ? '#17a2b8' :
                      '#6c757d'
                    }; background: rgba(255,255,255,0.05); border-radius: 2px;`}
                  >
                    <div style="color: #ffc107; font-weight: bold;">
                      [{event.time}] {event.event}
                    </div>
                    <div style="color: #20c997; margin-left: 8px;">
                      Target: {event.target}
                    </div>
                    {event.detail && (
                      <div style="color: #e9ecef; margin-left: 8px; font-size: 9px;">
                        {Object.entries(event.detail).map(([key, value]) => 
                          `${key}: ${JSON.stringify(value)}`
                        ).join(', ')}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div style="margin: 20px 0; padding: 12px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px;">
          <h5 style="margin: 0 0 8px 0;">🔍 Debug Instructions:</h5>
          <ul style="margin: 0; padding-left: 20px; font-size: 12px;">
            <li>Click different parts of the checkbox (input area, visual area, label)</li>
            <li>Watch for DOM events in the event stream</li>
            <li>Use "Inspect DOM Layout" to check element positioning</li>
            <li>Compare manual toggle vs. click behavior</li>
            <li>Look for missing click events or wrong event targets</li>
          </ul>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive DOM event debugging to diagnose checkbox click issues'
      }
    }
  }
}

// Click Test - Simplified
export const ClickTest = {
  render: () => {
    const [checked, setChecked] = useState(false)
    const [clickCount, setClickCount] = useState(0)
    
    return (
      <div style="padding: 20px; border: 2px solid #007bff; border-radius: 8px; background: #f8f9fa;">
        <h3 style="margin: 0 0 16px 0;">🖱️ Simple Click Test</h3>
        
        <div style="margin: 16px 0; padding: 16px; background: white; border-radius: 4px; display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: center;">
          {/* Checkbox */}
          <div>
            <Checkbox 
              label="Click me to test"
              checked={checked}
              onChange={(newChecked) => {
                console.log('🎯 Checkbox onChange:', newChecked)
                setChecked(newChecked)
                setClickCount(prev => prev + 1)
              }}
            />
          </div>
          
          {/* Status */}
          <div style="font-family: monospace; font-size: 14px;">
            <div style={`color: ${checked ? '#28a745' : '#dc3545'}; font-weight: bold; font-size: 18px;`}>
              {checked ? '✅ CHECKED' : '❌ UNCHECKED'}
            </div>
            <div style="color: #6c757d; font-size: 12px; margin-top: 4px;">
              Clicks: {clickCount} | State changes: {clickCount}
            </div>
          </div>
        </div>
        
        {/* Control buttons */}
        <div style="margin: 16px 0; display: flex; gap: 8px;">
          <button 
            onClick={() => {
              console.log('🔘 Manual toggle from', checked, 'to', !checked)
              setChecked(!checked)
            }}
            style="padding: 8px 12px; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 12px;"
          >
            Manual Toggle
          </button>
          <button 
            onClick={() => {
              setChecked(false)
              setClickCount(0)
            }}
            style="padding: 8px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; font-size: 12px;"
          >
            Reset
          </button>
        </div>
        
        <div style="margin: 16px 0; padding: 12px; background: #e9ecef; border-radius: 4px; font-size: 12px;">
          <strong>Expected behavior:</strong>
          <ul style="margin: 8px 0 0 0; padding-left: 20px;">
            <li>Clicking checkbox should toggle state</li>
            <li>State should be visually updated immediately</li>
            <li>Click count should increment</li>
            <li>Console should show onChange logs</li>
          </ul>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple test to verify checkbox clicking works correctly'
      }
    }
  }
}

// Final comparison story
export const FinalDiagnostic = {
  render: () => {
    const [nativeChecked, setNativeChecked] = useState(false)
    const [customChecked, setCustomChecked] = useState(false)
    const [diagnostics, setDiagnostics] = useState<string[]>([])
    
    const addDiagnostic = (message: string) => {
      setDiagnostics(prev => [...prev.slice(-9), `[${new Date().toLocaleTimeString()}] ${message}`])
    }
    
    return (
      <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
        <h2 style="margin: 0 0 20px 0; text-align: center; color: white;">🎯 Final Checkbox Diagnostic</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
          {/* Native Checkbox */}
          <div style="padding: 16px; background: rgba(255,255,255,0.9); border-radius: 8px; color: #333;">
            <h3 style="margin: 0 0 12px 0; color: #007bff;">🏠 Native</h3>
            <div style="margin: 12px 0; font-family: monospace; font-size: 12px; background: #f8f9fa; padding: 8px; border-radius: 4px;">
              State: <strong style={`color: ${nativeChecked ? '#28a745' : '#dc3545'}`}>
                {nativeChecked ? 'CHECKED' : 'UNCHECKED'}
              </strong>
            </div>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input 
                type="checkbox" 
                checked={nativeChecked}
                onChange={(e) => {
                  const checked = (e.target as HTMLInputElement).checked
                  addDiagnostic(`Native onChange: ${checked}`)
                  setNativeChecked(checked)
                }}
                onMouseDown={() => addDiagnostic(`Native mousedown`)}
                onMouseUp={() => addDiagnostic(`Native mouseup`)}
                onClick={() => addDiagnostic(`Native click`)}
              />
              Native checkbox
            </label>
            <button 
              onClick={() => {
                setNativeChecked(!nativeChecked)
                addDiagnostic(`Native manual toggle: ${!nativeChecked}`)
              }}
              style="margin-top: 8px; padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 11px;"
            >
              Manual Toggle
            </button>
          </div>
          
          {/* Custom Checkbox */}
          <div style="padding: 16px; background: rgba(255,255,255,0.9); border-radius: 8px; color: #333;">
            <h3 style="margin: 0 0 12px 0; color: #28a745;">🎨 NanoLux</h3>
            <div style="margin: 12px 0; font-family: monospace; font-size: 12px; background: #f8f9fa; padding: 8px; border-radius: 4px;">
              State: <strong style={`color: ${customChecked ? '#28a745' : '#dc3545'}`}>
                {customChecked ? 'CHECKED' : 'UNCHECKED'}
              </strong>
            </div>
            <Checkbox 
              label="NanoLux checkbox"
              checked={customChecked}
              onChange={(newChecked) => {
                addDiagnostic(`NanoLux onChange: ${newChecked}`)
                setCustomChecked(newChecked)
              }}
            />
            <button 
              onClick={() => {
                setCustomChecked(!customChecked)
                addDiagnostic(`NanoLux manual toggle: ${!customChecked}`)
              }}
              style="margin-top: 8px; padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 4px; font-size: 11px;"
            >
              Manual Toggle
            </button>
          </div>
          
          {/* Diagnostic Output */}
          <div style="padding: 16px; background: rgba(0,0,0,0.7); border-radius: 8px; color: white;">
            <h3 style="margin: 0 0 12px 0; color: #ffc107;">📊 Events</h3>
            <div style="font-family: monospace; font-size: 10px; max-height: 200px; overflow-y: auto;">
              {diagnostics.length === 0 ? (
                <div style="color: #6c757d;">Click checkboxes...</div>
              ) : (
                diagnostics.map((diagnostic, index) => (
                  <div key={index} style="margin: 1px 0; padding: 2px; background: rgba(255,255,255,0.1); border-radius: 2px;">
                    {diagnostic}
                  </div>
                ))
              )}
            </div>
            <button 
              onClick={() => setDiagnostics([])}
              style="margin-top: 8px; padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size: 11px; width: 100%;"
            >
              Clear
            </button>
          </div>
        </div>
        
        {/* Status Summary */}
        <div style="margin: 20px 0; padding: 16px; background: rgba(255,255,255,0.1); border-radius: 8px;">
          <h3 style="margin: 0 0 12px 0; color: #ffc107;">🎯 Quick Test Summary</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 12px;">
            <div>
              <strong>✅ Both should work the same:</strong>
              <ul style="margin: 4px 0; padding-left: 16px;">
                <li>Click to toggle state</li>
                <li>Visual state updates immediately</li>
                <li>onChange events fire properly</li>
                <li>Manual toggle works</li>
              </ul>
            </div>
            <div>
              <strong>🔍 Sync Check:</strong>
              <div style="margin: 4px 0;">
                Native: {nativeChecked ? '✅' : '❌'} | 
                NanoLux: {customChecked ? '✅' : '❌'}
                {nativeChecked === customChecked ? ' 🎯 SYNCED' : ' ⚠️ OUT OF SYNC'}
              </div>
              <button 
                onClick={() => {
                  setNativeChecked(false)
                  setCustomChecked(false)
                  setDiagnostics([])
                  addDiagnostic('Reset both to unchecked')
                }}
                style="margin-top: 4px; padding: 4px 8px; background: #6c757d; color: white; border: none; border-radius: 4px; font-size: 10px;"
              >
                Reset Both
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Final diagnostic comparing native vs NanoLux checkbox behavior side by side'
      }
    }
  }
}
