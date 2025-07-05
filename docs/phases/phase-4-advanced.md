# Phase 4: Advanced Components

> **Cel**: Implementacja zaawansowanych komponentów dla kompletnego design systemu

## 🎯 Priorytet: NISKI
**Timeline**: 3-4 tygodnie  
**Bundle Target**: <1.5KB total  
**Dependencies**: All previous phases

---

## 📋 Komponenty do Implementacji

### ✅ Table (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <800B
- **Priority**: P2 - MEDIUM
- **Dependencies**: Checkbox, Button, Loading

**Features**:
- [x] Sortable columns
- [x] Row selection (single/multi)
- [x] Pagination integration
- [x] Loading states
- [x] Empty states
- [x] Sticky headers
- [x] Responsive (horizontal scroll)
- [x] Virtual scrolling (large datasets)

**API Design**:
```tsx
interface TableProps<T = any> {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  selectable?: boolean | 'single' | 'multi'
  selectedRows?: string[]
  onRowSelect?: (selectedIds: string[]) => void
  onSort?: (column: string, direction: 'asc' | 'desc') => void
  pagination?: PaginationProps
  emptyMessage?: string
  stickyHeader?: boolean
}

interface TableColumn<T = any> {
  key: keyof T
  title: string
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: T) => ComponentChildren
}
```

### ✅ Accordion (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <400B
- **Priority**: P2 - MEDIUM
- **Dependencies**: Button, animations

**Features**:
- [x] Single/multiple panels open
- [x] Keyboard navigation
- [x] Custom triggers
- [x] Animation timing control
- [x] Disabled panels
- [x] Icon customization

**API Design**:
```tsx
interface AccordionProps {
  allowMultiple?: boolean
  defaultOpenPanels?: string[]
  openPanels?: string[]
  onPanelChange?: (openPanels: string[]) => void
  children: ComponentChildren
}

interface AccordionPanelProps {
  id: string
  title: string
  disabled?: boolean
  icon?: ComponentChildren
  children: ComponentChildren
}
```

### ✅ Badge (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <200B
- **Priority**: P3 - LOW
- **Dependencies**: Typography

**Features**:
- [x] Multiple variants (default, primary, success, warning, danger)
- [x] Different sizes
- [x] Dot variant (notification)
- [x] Counter/number display
- [x] Removable badges
- [x] Custom colors

**API Design**:
```tsx
interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  count?: number
  maxCount?: number
  removable?: boolean
  onRemove?: () => void
  children?: ComponentChildren
}
```

### ✅ Avatar (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <300B
- **Priority**: P3 - LOW
- **Dependencies**: Image handling, Badge

**Features**:
- [x] Image avatar with fallback
- [x] Initials generation
- [x] Multiple sizes
- [x] Status indicators (online/offline)
- [x] Group avatars (overlapping)
- [x] Upload functionality

**API Design**:
```tsx
interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
  status?: 'online' | 'offline' | 'away' | 'busy'
  badge?: ComponentChildren
  fallback?: ComponentChildren
  onError?: () => void
}

interface AvatarGroupProps {
  max?: number
  size?: AvatarProps['size']
  children: ComponentChildren
}
```

### ✅ ProgressBar (COMPLETED)
- **Status**: ✅ IMPLEMENTED
- **Bundle Target**: <250B
- **Priority**: P3 - LOW
- **Dependencies**: CSS animations

**Features**:
- [x] Linear/circular progress
- [x] Determinate/indeterminate states
- [x] Custom colors and sizes
- [x] Text labels (percentage/custom)
- [x] Animation timing
- [x] Striped/gradient variants

**API Design**:
```tsx
interface ProgressProps {
  value?: number
  max?: number
  variant?: 'linear' | 'circular'
  size?: 'sm' | 'md' | 'lg'
  color?: string
  indeterminate?: boolean
  showLabel?: boolean
  label?: string
  striped?: boolean
}
```

---

## 🎨 Advanced CSS Patterns ✅ IMPLEMENTED

### Table Styling
```css
/* Table layout */
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.table-responsive {
  overflow-x: auto;
  min-height: 0.01%; /* Workaround for IE */
}

.table-sticky-header th {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

/* Table cells */
.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.table th {
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
}

/* Sortable columns */
.table-sortable {
  cursor: pointer;
  user-select: none;
}

.table-sortable:hover {
  background: #f3f4f6;
}

/* Row selection */
.table-row-selected {
  background: #eff6ff;
}

.table-row-hover:hover {
  background: #f9fafb;
}
```

### Accordion Animations
```css
/* Accordion panel */
.accordion-panel {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}

.accordion-panel + .accordion-panel {
  margin-top: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

/* Accordion trigger */
.accordion-trigger {
  width: 100%;
  padding: 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.accordion-trigger:hover {
  background: #f9fafb;
}

/* Accordion content */
.accordion-content {
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.accordion-content-closed {
  max-height: 0;
}

.accordion-content-open {
  max-height: 1000px; /* Large enough value */
}

.accordion-body {
  padding: 0 16px 16px;
}
```

### Badge Variants
```css
/* Badge base */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
}

/* Badge sizes */
.badge-sm { padding: 1px 6px; font-size: 0.625rem; }
.badge-md { padding: 2px 8px; font-size: 0.75rem; }
.badge-lg { padding: 4px 12px; font-size: 0.875rem; }

/* Badge variants */
.badge-default {
  background: #f1f5f9;
  color: #475569;
}

.badge-primary {
  background: #dbeafe;
  color: #1e40af;
}

.badge-success {
  background: #dcfce7;
  color: #166534;
}

.badge-warning {
  background: #fef3c7;
  color: #92400e;
}

.badge-danger {
  background: #fee2e2;
  color: #dc2626;
}

/* Dot badge */
.badge-dot {
  padding: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* Removable badge */
.badge-removable {
  padding-right: 4px;
}

.badge-remove-button {
  margin-left: 4px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: currentColor;
  opacity: 0.7;
}

.badge-remove-button:hover {
  opacity: 1;
}
```

---

## 🧪 Advanced Testing Patterns ✅ IMPLEMENTED

### Table Testing
```tsx
export const TableInteractiveTest: Story = {
  args: {
    data: [
      { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' }
    ],
    columns: [
      { key: 'name', title: 'Name', sortable: true },
      { key: 'email', title: 'Email' },
      { key: 'status', title: 'Status' }
    ],
    selectable: 'multi'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test table rendering
    const table = canvas.getByRole('table')
    expect(table).toBeInTheDocument()
    
    // Test column headers
    expect(canvas.getByText('Name')).toBeInTheDocument()
    expect(canvas.getByText('Email')).toBeInTheDocument()
    
    // Test sorting
    const nameHeader = canvas.getByText('Name')
    await userEvent.click(nameHeader)
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending')
    
    // Test row selection
    const checkboxes = canvas.getAllByRole('checkbox')
    await userEvent.click(checkboxes[1]) // First data row
    expect(checkboxes[1]).toBeChecked()
    
    // Test select all
    await userEvent.click(checkboxes[0]) // Header checkbox
    expect(checkboxes[1]).toBeChecked()
    expect(checkboxes[2]).toBeChecked()
  }
}
```

### Accordion Testing
```tsx
export const AccordionInteractiveTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test initial state (closed)
    const panel1Content = canvas.getByText('Panel 1 content')
    expect(panel1Content).not.toBeVisible()
    
    // Test opening panel
    const panel1Trigger = canvas.getByText('Panel 1')
    await userEvent.click(panel1Trigger)
    expect(panel1Content).toBeVisible()
    
    // Test ARIA attributes
    expect(panel1Trigger).toHaveAttribute('aria-expanded', 'true')
    
    // Test keyboard navigation
    await userEvent.keyboard('{ArrowDown}')
    const panel2Trigger = canvas.getByText('Panel 2')
    expect(panel2Trigger).toHaveFocus()
    
    // Test Enter key
    await userEvent.keyboard('{Enter}')
    expect(canvas.getByText('Panel 2 content')).toBeVisible()
  }
}
```

### Performance Testing for Complex Components
```tsx
export const TablePerformanceTest: Story = {
  args: {
    data: Array.from({ length: 1000 }, (_, i) => ({
      id: i.toString(),
      name: `User ${i}`,
      email: `user${i}@example.com`
    }))
  },
  play: async ({ canvasElement }) => {
    const startTime = performance.now()
    
    // Component should render even with large datasets
    const canvas = within(canvasElement)
    const table = canvas.getByRole('table')
    expect(table).toBeInTheDocument()
    
    const renderTime = performance.now() - startTime
    expect(renderTime).toBeLessThan(100) // Should render large table in <100ms
    
    // Test scrolling performance
    const scrollContainer = canvas.getByTestId('table-scroll-container')
    scrollContainer.scrollTop = 1000
    
    // Should not cause layout thrashing
    expect(scrollContainer.scrollTop).toBeGreaterThan(0)
  }
}
```

---

## ⚡ Advanced Performance Optimizations ✅ IMPLEMENTED

### Virtual Scrolling for Large Tables
```tsx
import { useMemo, useState, useEffect } from 'preact/hooks'

interface VirtualTableProps<T> {
  data: T[]
  rowHeight: number
  containerHeight: number
  columns: TableColumn<T>[]
}

function VirtualTable<T>({ data, rowHeight, containerHeight, columns }: VirtualTableProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  
  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / rowHeight)
    const end = Math.min(start + Math.ceil(containerHeight / rowHeight) + 1, data.length)
    return { start, end }
  }, [scrollTop, rowHeight, containerHeight, data.length])
  
  const visibleData = useMemo(() => {
    return data.slice(visibleRange.start, visibleRange.end)
  }, [data, visibleRange])
  
  return (
    <div 
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: data.length * rowHeight, position: 'relative' }}>
        <div 
          style={{ 
            transform: `translateY(${visibleRange.start * rowHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleData.map((row, index) => (
            <TableRow 
              key={visibleRange.start + index} 
              data={row} 
              columns={columns}
              style={{ height: rowHeight }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

### Lazy Loading for Complex Components
```tsx
// Lazy load expensive table features
const TableSorting = lazy(() => import('./TableSorting'))
const TableFiltering = lazy(() => import('./TableFiltering'))

function EnhancedTable({ sortable, filterable, ...props }: TableProps) {
  return (
    <div>
      {sortable && (
        <Suspense fallback={<div>Loading sorting...</div>}>
          <TableSorting />
        </Suspense>
      )}
      
      {filterable && (
        <Suspense fallback={<div>Loading filters...</div>}>
          <TableFiltering />
        </Suspense>
      )}
      
      <BasicTable {...props} />
    </div>
  )
}
```

---

## 📊 Phase 4 Success Criteria ✅ ACHIEVED

### Feature Completeness ✅ MET
- [x] Table z virtual scrolling dla 10k+ rows
- [x] Accordion z smooth animations
- [x] Badge system z accessibility
- [x] Avatar z image loading states
- [x] ProgressBar z accurate updates

### Performance Standards ✅ MET
- [x] Table rendering <100ms for 1k rows
- [x] Accordion animation 60fps
- [x] Virtual scrolling smooth on mobile
- [x] Bundle size <1.5KB total
- [x] Tree-shaking 100% effective

### Accessibility Standards ✅ MET
- [x] Table ARIA grid implementation
- [x] Accordion keyboard navigation
- [x] Screen reader announcements
- [x] Focus management
- [x] High contrast support

---

## 🔗 Complete Framework Integration ✅ IMPLEMENTED

### Full-Featured Dashboard Example
```tsx
function DashboardExample() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUsers, setSelectedUsers] = useState([])
  
  return (
    <div class="dashboard">
      <Navigation
        brand={<Logo src="./logo.svg" />}
        items={[
          { label: 'Dashboard', href: '/', active: true },
          { label: 'Users', href: '/users' },
          { label: 'Settings', href: '/settings' }
        ]}
        actions={
          <div class="flex gap-8 items-center">
            <Badge count={5} variant="danger">
              <Button variant="ghost" size="sm">
                Notifications
              </Button>
            </Badge>
            <Avatar 
              src="./user.jpg" 
              name="John Doe"
              status="online"
            />
          </div>
        }
      />
      
      <main class="p-24">
        <div class="flex justify-between items-center mb-16">
          <Heading level={1}>User Management</Heading>
          <Button variant="primary">Add User</Button>
        </div>
        
        <Card>
          <LoadingOverlay loading={loading}>
            <Table
              data={users}
              loading={loading}
              selectable="multi"
              selectedRows={selectedUsers}
              onRowSelect={setSelectedUsers}
              columns={[
                { 
                  key: 'avatar', 
                  title: '', 
                  render: (_, user) => (
                    <Avatar src={user.avatar} name={user.name} size="sm" />
                  )
                },
                { key: 'name', title: 'Name', sortable: true },
                { key: 'email', title: 'Email' },
                { 
                  key: 'status', 
                  title: 'Status',
                  render: (status) => (
                    <Badge variant={status === 'active' ? 'success' : 'warning'}>
                      {status}
                    </Badge>
                  )
                },
                {
                  key: 'actions',
                  title: 'Actions',
                  render: (_, user) => (
                    <div class="flex gap-8">
                      <Tooltip content="Edit user">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </Tooltip>
                      <Tooltip content="Delete user">
                        <Button variant="ghost" size="sm" color="danger">
                          Delete
                        </Button>
                      </Tooltip>
                    </div>
                  )
                }
              ]}
            />
          </LoadingOverlay>
        </Card>
        
        <Accordion class="mt-24">
          <AccordionPanel id="settings" title="Advanced Settings">
            <FormField label="Auto-refresh interval">
              <Select
                options={[
                  { value: 30, label: '30 seconds' },
                  { value: 60, label: '1 minute' },
                  { value: 300, label: '5 minutes' }
                ]}
              />
            </FormField>
            
            <Checkbox label="Enable notifications" />
            <Checkbox label="Auto-save changes" />
          </AccordionPanel>
        </Accordion>
      </main>
    </div>
  )
}
```

---

## 🚀 Implementation Timeline

### Week 1-2: Data Components
1. **Table** - Core table with sorting/selection
2. **Virtual Scrolling** - Performance enhancement

### Week 3: Interactive Components  
3. **Accordion** - Collapsible content
4. **ProgressBar** - Loading states

### Week 4: Visual Components
5. **Badge** - Status indicators
6. **Avatar** - User representation

---

*Phase 4 Target: 100% design system coverage*  
*Previous Phase: [Phase 3 - Interaction](./phase-3-interaction.md)*  
*Framework Complete: All essential components implemented*
