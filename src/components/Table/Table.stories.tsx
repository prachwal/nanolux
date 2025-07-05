import Table from './Table'
import { expect } from '@storybook/test'
import { within } from '@storybook/testing-library'
import { useState, useEffect } from 'preact/hooks'

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Active' },
]

const sampleColumns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', align: 'center' as const },
  { key: 'status', header: 'Status', align: 'right' as const },
]

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: 'Responsywna tabela z sortowaniem i zaznaczaniem wierszy'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'striped', 'bordered']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    }
  }
}

export const Default = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'default',
    size: 'md'
  }
}

export const Striped = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'striped'
  }
}

export const Bordered = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'bordered'
  }
}

export const AllSizes = {
  render: () => (
    <div class="flex flex-col gap-24">
      <div>
        <h3>Small Table</h3>
        <Table
          columns={sampleColumns}
          data={sampleData.slice(0, 2)}
          size="sm"
          variant="striped"
        />
      </div>
      <div>
        <h3>Medium Table (Default)</h3>
        <Table
          columns={sampleColumns}
          data={sampleData.slice(0, 2)}
          size="md"
          variant="striped"
        />
      </div>
      <div>
        <h3>Large Table</h3>
        <Table
          columns={sampleColumns}
          data={sampleData.slice(0, 2)}
          size="lg"
          variant="striped"
        />
      </div>
    </div>
  )
}

export const WithSelection = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    
    return (
      <div>
        <p>Selected rows: {selectedRows.join(', ')}</p>
        <Table
          columns={sampleColumns}
          data={sampleData}
          selectable
          selectedRows={selectedRows}
          onRowSelect={(rowId: string, selected: boolean) => {
            if (selected) {
              setSelectedRows([...selectedRows, rowId])
            } else {
              setSelectedRows(selectedRows.filter((id: string) => id !== rowId))
            }
          }}
          variant="striped"
        />
      </div>
    )
  }
}

export const WithSorting = {
  render: () => {
    const [sortColumn, setSortColumn] = useState<string>('')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [sortedData, setSortedData] = useState(sampleData)
    
    const handleSort = (column: string, direction: 'asc' | 'desc') => {
      setSortColumn(column)
      setSortDirection(direction)
      
      const sorted = [...sampleData].sort((a, b) => {
        const aVal = (a as any)[column]
        const bVal = (b as any)[column]
        
        if (direction === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })
      
      setSortedData(sorted)
    }
    
    return (
      <div>
        <p>Sorted by: {sortColumn} ({sortDirection})</p>
        <Table
          columns={sampleColumns}
          data={sortedData}
          onSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          variant="bordered"
        />
      </div>
    )
  }
}

export const ResponsiveTable = {
  render: () => (
    <div style="max-width: 400px; border: 1px solid #ccc; padding: 16px;">
      <p>Resize this container to see responsive behavior</p>
      <Table
        columns={[
          ...sampleColumns,
          { key: 'department', header: 'Department', width: '150px' },
          { key: 'location', header: 'Location', width: '120px' },
        ]}
        data={sampleData.map(item => ({
          ...item,
          department: 'Engineering',
          location: 'Remote'
        }))}
        responsive
        variant="striped"
      />
    </div>
  )
}

// Interactive test story
export const InteractiveTest = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'striped',
    selectable: true
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: table is rendered
    const table = canvas.getByRole('table')
    await expect(table).toBeInTheDocument()
    
    // Test: correct number of rows
    const rows = canvas.getAllByRole('row')
    await expect(rows).toHaveLength(4) // header + 3 data rows
    
    // Test: headers are present
    await expect(canvas.getByText('Name')).toBeInTheDocument()
    await expect(canvas.getByText('Email')).toBeInTheDocument()
    
    // Test: data is displayed
    await expect(canvas.getByText('John Doe')).toBeInTheDocument()
    await expect(canvas.getByText('jane@example.com')).toBeInTheDocument()
    
    // Test: table has correct classes
    await expect(table).toHaveClass('table', 'table-md', 'table-striped')
  }
}

// Debug story z pełnym logowaniem
export const DebugMode = {
  render: () => {
    const [data, setData] = useState(sampleData)
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [sortBy, setSortBy] = useState<string | null>(null)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [events, setEvents] = useState<string[]>([])
    const [renderCount, setRenderCount] = useState(0)
    
    // Track renders
    useEffect(() => {
      setRenderCount(prev => prev + 1)
      addEvent(`Table rendered (render #${renderCount + 1})`)
    })
    
    const addEvent = (event: string) => {
      const timestamp = new Date().toLocaleTimeString()
      setEvents(prev => [...prev.slice(-9), `[${timestamp}] ${event}`])
    }
    
    const handleSort = (column: string) => {
      addEvent(`Sort requested: ${column}`)
      if (sortBy === column) {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
        setSortOrder(newOrder)
        addEvent(`Sort order changed: ${newOrder}`)
      } else {
        setSortBy(column)
        setSortOrder('asc')
        addEvent(`Sort column changed: ${column} (asc)`)
      }
    }
    
    const handleSelectionChange = (selection: number[]) => {
      addEvent(`Selection changed: [${selection.join(', ')}]`)
      addEvent(`Previous selection: [${selectedRows.join(', ')}]`)
      setSelectedRows(selection)
    }
    
    const addRow = () => {
      const newRow = {
        id: data.length + 1,
        name: `Test User ${data.length + 1}`,
        email: `test${data.length + 1}@example.com`,
        role: 'User',
        status: 'Active'
      }
      addEvent(`Row added: ${newRow.name}`)
      setData(prev => [...prev, newRow])
    }
    
    const removeRow = () => {
      if (data.length > 0) {
        const removedRow = data[data.length - 1]
        addEvent(`Row removed: ${removedRow.name}`)
        setData(prev => prev.slice(0, -1))
      }
    }
    
    return (
      <div style="padding: 16px; border: 2px solid #007bff; border-radius: 8px; background: #f8f9fa;">
        <h3 style="margin: 0 0 16px 0; color: #007bff;">🔍 Table Debug Mode</h3>
        
        {/* Test Table */}
        <div style="margin-bottom: 20px;">
          <h4 style="margin: 0 0 8px 0;">Test Table:</h4>
          <Table
            columns={sampleColumns}
            data={data}
            variant="striped"
            size="md"
            selectable={true}
            onSort={handleSort}
            onRowSelect={(rowId, selected) => {
              const id = parseInt(rowId)
              if (selected) {
                setSelectedRows(prev => [...prev, id])
              } else {
                setSelectedRows(prev => prev.filter(r => r !== id))
              }
            }}
          />
        </div>
        
        {/* Controls */}
        <div style="margin-bottom: 16px;">
          <h4 style="margin: 0 0 8px 0;">Test Controls:</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button 
              onClick={addRow}
              style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: white;"
            >
              Add Row
            </button>
            <button 
              onClick={removeRow}
              style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: white;"
            >
              Remove Row
            </button>
            <button 
              onClick={() => handleSort('name')}
              style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; background: white;"
            >
              Sort by Name
            </button>
            <button 
              onClick={() => handleSelectionChange(selectedRows.length > 0 ? [] : [1, 2])}
              style="padding: 4px 8px; border: 1px solid #007bff; border-radius: 4px; background: #007bff; color: white;"
            >
              Toggle Selection
            </button>
          </div>
        </div>
        
        {/* Status */}
        <div style="margin-bottom: 16px;">
          <h4 style="margin: 0 0 8px 0;">Status:</h4>
          <div style="font-family: monospace; font-size: 0.875rem;">
            <div>🔄 Renders: {renderCount}</div>
            <div>📊 Rows: {data.length}</div>
            <div>✅ Selected: {selectedRows.length} rows</div>
            <div>🔀 Sort: {sortBy ? `${sortBy} (${sortOrder})` : 'None'}</div>
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
        story: 'Complete debugging story showing all table interactions, sorting, selection, and data changes.'
      }
    }
  }
}

// Real-time monitor story
export const RealTimeTableMonitor = {
  render: () => {
    const [data, setData] = useState(sampleData)
    const [variant, setVariant] = useState<'default' | 'striped' | 'bordered'>('default')
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
    const [selectable, setSelectable] = useState(false)
    const [responsive, setResponsive] = useState(false)
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
    
    const handleVariantChange = (value: 'default' | 'striped' | 'bordered') => {
      logEvent('VARIANT_CHANGE', { value, previous: variant })
      setVariant(value)
    }
    
    const handleSizeChange = (value: 'sm' | 'md' | 'lg') => {
      logEvent('SIZE_CHANGE', { value, previous: size })
      setSize(value)
    }
    
    const handleSelectableChange = (value: boolean) => {
      logEvent('SELECTABLE_CHANGE', { value, previous: selectable })
      setSelectable(value)
    }
    
    const handleResponsiveChange = (value: boolean) => {
      logEvent('RESPONSIVE_CHANGE', { value, previous: responsive })
      setResponsive(value)
    }
    
    const handleSort = (column: string) => {
      logEvent('SORT_REQUEST', { column })
    }
    
    return (
      <div style="padding: 16px; border: 2px solid #10b981; border-radius: 8px; background: #f0fdf4;">
        <h3 style="margin: 0 0 16px 0; color: #10b981;">📊 Table Real-Time Monitor</h3>
        
        {/* Table */}
        <div style="margin-bottom: 20px;">
          <Table
            columns={sampleColumns}
            data={data}
            variant={variant}
            size={size}
            selectable={selectable}
            responsive={responsive}
            onSort={handleSort}
            onRowSelect={(rowId, selected) => {
              logEvent('ROW_SELECT', { rowId, selected })
            }}
          />
        </div>
        
        {/* Live Controls */}
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="display: block; font-weight: 500; margin-bottom: 4px;">Variant:</label>
            <select
              value={variant}
              onChange={(e) => handleVariantChange((e.target as HTMLSelectElement).value as any)}
              style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
            >
              <option value="default">Default</option>
              <option value="striped">Striped</option>
              <option value="bordered">Bordered</option>
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
        
        {/* Toggle Controls */}
        <div style="display: flex; gap: 16px; margin-bottom: 20px;">
          <label style="display: flex; align-items: center; gap: 8px;">
            <input
              type="checkbox"
              checked={selectable}
              onChange={(e) => handleSelectableChange((e.target as HTMLInputElement).checked)}
            />
            Selectable
          </label>
          <label style="display: flex; align-items: center; gap: 8px;">
            <input
              type="checkbox"
              checked={responsive}
              onChange={(e) => handleResponsiveChange((e.target as HTMLInputElement).checked)}
            />
            Responsive
          </label>
        </div>
        
        {/* Statistics */}
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 1.5rem; font-weight: bold; color: #10b981;">{interactions}</div>
            <div style="font-size: 0.875rem; color: #666;">Interactions</div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 1.5rem; font-weight: bold; color: #3b82f6;">{data.length}</div>
            <div style="font-size: 0.875rem; color: #666;">Rows</div>
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
        story: 'Real-time monitoring of all table props, interactions, sorting, and selection with live statistics.'
      }
    }
  }
}
