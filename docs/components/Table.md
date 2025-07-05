# Table Component

Table component for displaying structured data in rows and columns with sorting and selection capabilities.

## Overview

The Table component provides a flexible and feature-rich way to display tabular data. It supports sorting, row selection, responsive design, and multiple visual variants to suit different use cases.

## Basic Usage

```tsx
import Table from '@/components/Table/Table'

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', align: 'center' }
]

const data = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
]

<Table columns={columns} data={data} />
```

## Variants

### Default
```tsx
<Table 
  variant="default" 
  columns={columns} 
  data={data} 
/>
```

### Striped
```tsx
<Table 
  variant="striped" 
  columns={columns} 
  data={data} 
/>
```

### Bordered
```tsx
<Table 
  variant="bordered" 
  columns={columns} 
  data={data} 
/>
```

## Sizes

```tsx
<Table size="sm" columns={columns} data={data} />   {/* Compact */}
<Table size="md" columns={columns} data={data} />   {/* Default */}
<Table size="lg" columns={columns} data={data} />   {/* Spacious */}
```

## Features

### Column Configuration
```tsx
const columns = [
  { 
    key: 'name', 
    header: 'Full Name', 
    sortable: true,
    width: '200px'
  },
  { 
    key: 'email', 
    header: 'Email Address',
    width: '250px'
  },
  { 
    key: 'status', 
    header: 'Status', 
    align: 'center',
    width: '100px'
  },
  { 
    key: 'actions', 
    header: 'Actions', 
    align: 'right',
    sortable: false
  }
]
```

### Sorting
```tsx
function SortableTable() {
  const [sortColumn, setSortColumn] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleSort = (column, direction) => {
    setSortColumn(column)
    setSortDirection(direction)
    // Implement your sorting logic here
  }

  return (
    <Table
      columns={columns}
      data={sortedData}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSort={handleSort}
    />
  )
}
```

### Row Selection
```tsx
function SelectableTable() {
  const [selectedRows, setSelectedRows] = useState([])

  const handleRowSelect = (rowId, selected) => {
    if (selected) {
      setSelectedRows([...selectedRows, rowId])
    } else {
      setSelectedRows(selectedRows.filter(id => id !== rowId))
    }
  }

  return (
    <Table
      columns={columns}
      data={data}
      selectable
      selectedRows={selectedRows}
      onRowSelect={handleRowSelect}
    />
  )
}
```

### Responsive Table
```tsx
<Table
  columns={columns}
  data={data}
  responsive
  variant="striped"
/>
```

## Advanced Examples

### User Management Table
```tsx
const userColumns = [
  { key: 'avatar', header: '', width: '60px' },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', align: 'center' },
  { key: 'lastLogin', header: 'Last Login', sortable: true },
  { key: 'status', header: 'Status', align: 'center' },
  { key: 'actions', header: 'Actions', align: 'right' }
]

const userData = [
  {
    id: '1',
    avatar: <Avatar src="/avatars/john.jpg" size="sm" />,
    name: 'John Doe',
    email: 'john@company.com',
    role: 'Administrator',
    lastLogin: '2024-01-15',
    status: <Badge variant="success">Active</Badge>,
    actions: (
      <div>
        <Button size="sm" variant="ghost">Edit</Button>
        <Button size="sm" variant="ghost" color="danger">Delete</Button>
      </div>
    )
  }
  // ... more users
]

<Table
  columns={userColumns}
  data={userData}
  variant="striped"
  selectable
  responsive
/>
```

### Data Table with Pagination
```tsx
function PaginatedTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <div>
      <Table
        columns={columns}
        data={paginatedData}
        variant="bordered"
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / pageSize)}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
```

### Interactive Table
```tsx
function InteractiveTable() {
  const [data, setData] = useState(initialData)
  const [selectedRows, setSelectedRows] = useState([])

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id))
  }

  const handleBulkDelete = () => {
    setData(data.filter(item => !selectedRows.includes(item.id)))
    setSelectedRows([])
  }

  return (
    <div>
      {selectedRows.length > 0 && (
        <div className="table-actions">
          <Button onClick={handleBulkDelete} variant="danger">
            Delete Selected ({selectedRows.length})
          </Button>
        </div>
      )}
      
      <Table
        columns={columns}
        data={data}
        selectable
        selectedRows={selectedRows}
        onRowSelect={(id, selected) => {
          if (selected) {
            setSelectedRows([...selectedRows, id])
          } else {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id))
          }
        }}
      />
    </div>
  )
}
```

## Best Practices

1. **Use appropriate variants**: Choose the variant that best fits your design system
2. **Make important columns sortable**: Enable sorting for data users need to organize
3. **Provide meaningful headers**: Use clear, descriptive column headers
4. **Consider responsive design**: Enable responsive mode for mobile compatibility
5. **Implement proper loading states**: Show loading indicators while data is being fetched
6. **Handle empty states**: Provide helpful messages when there's no data to display

## Accessibility

- **Keyboard Navigation**: Full keyboard support for table navigation
- **Screen Reader Support**: Proper table headers and relationships
- **Sort Indicators**: Clear visual and announced sort states
- **Selection States**: Accessible row selection with proper labeling

## Related Components

- [Loading](./Loading.md) - For table loading states
- [Pagination](./Pagination.md) - For table pagination
- [Badge](./Badge.md) - For status indicators in cells
- [Button](./Button.md) - For action buttons in cells

## API Reference

See [Table API](../api/Table.md) for detailed prop documentation.
