import { render, screen } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import Table from './Table'

const sampleColumns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role' },
]

const sampleData = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
]

describe('Table', () => {
  test('renders table with data', () => {
    render(<Table columns={sampleColumns} data={sampleData} />)
    
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  test('applies variant class', () => {
    render(<Table columns={sampleColumns} data={sampleData} variant="striped" />)
    
    const table = screen.getByRole('table')
    expect(table).toHaveClass('table-striped')
  })

  test('applies size class', () => {
    render(<Table columns={sampleColumns} data={sampleData} size="lg" />)
    
    const table = screen.getByRole('table')
    expect(table).toHaveClass('table-lg')
  })

  test('renders responsive wrapper when responsive=true', () => {
    const { container } = render(
      <Table columns={sampleColumns} data={sampleData} responsive />
    )
    
    const wrapper = container.querySelector('.table-responsive')
    expect(wrapper).toBeInTheDocument()
  })

  test('renders selection checkboxes when selectable=true', () => {
    render(
      <Table 
        columns={sampleColumns} 
        data={sampleData} 
        selectable 
        selectedRows={[]}
        onRowSelect={() => {}}
      />
    )
    
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3) // header + 2 rows
  })

  test('shows sort indicators for sortable columns', () => {
    render(
      <Table 
        columns={sampleColumns} 
        data={sampleData}
        sortColumn="name"
        sortDirection="asc"
      />
    )
    
    const sortIcon = screen.getByText('↑')
    expect(sortIcon).toBeInTheDocument()
  })
})
