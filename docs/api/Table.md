# Table API Reference

Table component for displaying structured data in rows and columns with sorting and selection capabilities.

## Types

### TableColumn
```tsx
interface TableColumn {
  key: string
  header: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | **required** | Array of column configurations |
| `data` | `Record<string, any>[]` | **required** | Array of data objects to display |
| `variant` | `'default' \| 'striped' \| 'bordered'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the table |
| `responsive` | `boolean` | `false` | Whether the table is responsive/scrollable |
| `selectable` | `boolean` | `false` | Whether rows can be selected |
| `selectedRows` | `string[]` | `[]` | Array of selected row IDs |
| `onRowSelect` | `(rowId: string, selected: boolean) => void` | `undefined` | Callback when row selection changes |
| `onSort` | `(column: string, direction: 'asc' \| 'desc') => void` | `undefined` | Callback when column is sorted |
| `sortColumn` | `string` | `undefined` | Currently sorted column key |
| `sortDirection` | `'asc' \| 'desc'` | `undefined` | Current sort direction |
| `class` | `string` | `''` | Additional CSS classes |

## TableColumn Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `key` | `string` | **required** | Unique identifier for the column (maps to data object keys) |
| `header` | `string` | **required** | Display text for the column header |
| `sortable` | `boolean` | `false` | Whether the column can be sorted |
| `width` | `string` | `undefined` | CSS width value for the column |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment for the column |

## CSS Classes

### Table Container
- `.table` - Base table styling
- `.table--default` - Default variant
- `.table--striped` - Striped rows variant
- `.table--bordered` - Bordered variant
- `.table--sm` - Small size
- `.table--md` - Medium size
- `.table--lg` - Large size
- `.table--responsive` - Responsive wrapper

### Table Elements
- `.table__header` - Table header styling
- `.table__header-cell` - Header cell styling
- `.table__header-cell--sortable` - Sortable header styling
- `.table__sort-indicator` - Sort direction indicator
- `.table__body` - Table body styling
- `.table__row` - Table row styling
- `.table__row--selected` - Selected row styling
- `.table__cell` - Table cell styling
- `.table__cell--center` - Center-aligned cell
- `.table__cell--right` - Right-aligned cell
- `.table__checkbox` - Selection checkbox styling

## Examples

### Basic Table
```tsx
const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', align: 'center' }
]

const data = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
]

<Table columns={columns} data={data} />
```

### Sortable Table
```tsx
const sortableColumns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'createdAt', header: 'Created', sortable: true, align: 'right' }
]

<Table
  columns={sortableColumns}
  data={data}
  sortColumn="name"
  sortDirection="asc"
  onSort={(column, direction) => {
    console.log(`Sort by ${column} ${direction}`)
  }}
/>
```

### Selectable Table
```tsx
const [selectedRows, setSelectedRows] = useState(['1', '3'])

<Table
  columns={columns}
  data={data}
  selectable
  selectedRows={selectedRows}
  onRowSelect={(rowId, selected) => {
    if (selected) {
      setSelectedRows([...selectedRows, rowId])
    } else {
      setSelectedRows(selectedRows.filter(id => id !== rowId))
    }
  }}
/>
```

### Custom Column Widths and Alignment
```tsx
const customColumns = [
  { key: 'id', header: 'ID', width: '80px', align: 'center' },
  { key: 'name', header: 'Full Name', width: '200px' },
  { key: 'email', header: 'Email Address', width: '250px' },
  { key: 'status', header: 'Status', width: '120px', align: 'center' },
  { key: 'actions', header: 'Actions', align: 'right' }
]

<Table columns={customColumns} data={data} variant="bordered" />
```

### Responsive Table
```tsx
<Table
  columns={columns}
  data={data}
  responsive
  variant="striped"
  size="sm"
/>
```

### Table with Complex Cell Content
```tsx
const enrichedData = data.map(item => ({
  ...item,
  avatar: <Avatar src={item.avatarUrl} size="sm" />,
  status: <Badge variant={item.active ? 'success' : 'secondary'}>
    {item.active ? 'Active' : 'Inactive'}
  </Badge>,
  actions: (
    <div className="table-actions">
      <Button size="sm" variant="ghost">Edit</Button>
      <Button size="sm" variant="ghost" color="danger">Delete</Button>
    </div>
  )
}))

const enrichedColumns = [
  { key: 'avatar', header: '', width: '60px' },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status', align: 'center' },
  { key: 'actions', header: 'Actions', align: 'right' }
]

<Table columns={enrichedColumns} data={enrichedData} />
```

## Accessibility

- **Table Semantics**: Uses proper `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements
- **Header Association**: Column headers are properly associated with data cells
- **Sort Indicators**: Sort state is announced to screen readers via ARIA attributes
- **Selection States**: Row selection is announced and keyboard accessible
- **Keyboard Navigation**: 
  - Tab navigation through interactive elements
  - Space/Enter for checkbox selection
  - Click/Enter for sortable headers

## Data Format

### Basic Data Structure
```tsx
const data = [
  {
    id: '1',           // Required for row selection
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin'
  }
]
```

### Complex Cell Content
```tsx
const data = [
  {
    id: '1',
    name: 'John Doe',
    avatar: <Avatar src="/path/to/avatar.jpg" />,
    status: <Badge variant="success">Active</Badge>,
    actions: (
      <ButtonGroup>
        <Button size="sm">Edit</Button>
        <Button size="sm" variant="danger">Delete</Button>
      </ButtonGroup>
    )
  }
]
```

## Performance Notes

- Large datasets should implement pagination or virtualization
- Sort operations should be handled externally for better performance
- Consider memoizing complex cell renderers
- Use proper React keys for efficient re-rendering
