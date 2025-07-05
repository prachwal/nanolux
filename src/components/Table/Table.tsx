import './Table.css'

interface TableColumn {
  /** Klucz kolumny */
  key: string
  /** Nagłówek kolumny */
  header: string
  /** Czy kolumna jest sortowalna */
  sortable?: boolean
  /** Szerokość kolumny */
  width?: string
  /** Wyrównanie zawartości */
  align?: 'left' | 'center' | 'right'
}

interface TableProps {
  /** Kolumny tabeli */
  columns: TableColumn[]
  /** Dane do wyświetlenia */
  data: Record<string, any>[]
  /** Wariant tabeli */
  variant?: 'default' | 'striped' | 'bordered'
  /** Rozmiar tabeli */
  size?: 'sm' | 'md' | 'lg'
  /** Czy tabela jest responsywna */
  responsive?: boolean
  /** Czy można zaznaczać wiersze */
  selectable?: boolean
  /** Zaznaczone wiersze */
  selectedRows?: string[]
  /** Callback dla zaznaczenia wiersza */
  onRowSelect?: (rowId: string, selected: boolean) => void
  /** Callback dla sortowania */
  onSort?: (column: string, direction: 'asc' | 'desc') => void
  /** Aktualnie sortowana kolumna */
  sortColumn?: string
  /** Kierunek sortowania */
  sortDirection?: 'asc' | 'desc'
  /** Custom klasa CSS */
  class?: string
}

/**
 * Responsywna tabela z sortowaniem i zaznaczaniem wierszy
 * @example
 * <Table 
 *   columns={[{key: 'name', header: 'Name', sortable: true}]}
 *   data={[{name: 'John', age: 30}]}
 *   variant="striped"
 * />
 */
export default function Table({
  columns,
  data,
  variant = 'default',
  size = 'md',
  responsive = true,
  selectable = false,
  selectedRows = [],
  onRowSelect,
  onSort,
  sortColumn,
  sortDirection,
  class: className = '',
  ...props
}: TableProps) {
  const tableClass = `table table-${size} table-${variant}`
  const wrapperClass = responsive ? 'table-responsive' : ''

  const handleSort = (column: TableColumn) => {
    if (!column.sortable || !onSort) return
    
    const newDirection = sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc'
    onSort(column.key, newDirection)
  }

  const handleRowSelect = (rowIndex: number, selected: boolean) => {
    if (!onRowSelect) return
    onRowSelect(String(rowIndex), selected)
  }

  const renderHeader = () => (
    <thead>
      <tr>
        {selectable && (
          <th class="table-select-header">
            <input
              type="checkbox"
              checked={selectedRows.length === data.length && data.length > 0}
              onChange={(e) => {
                const target = e.target as HTMLInputElement
                data.forEach((_, index) => {
                  handleRowSelect(index, target.checked)
                })
              }}
            />
          </th>
        )}
        {columns.map((column) => (
          <th
            key={column.key}
            class={`${column.sortable ? 'table-sortable' : ''} ${column.align ? `text-${column.align}` : ''}`}
            style={column.width ? `width: ${column.width}` : ''}
            onClick={() => handleSort(column)}
          >
            {column.header}
            {column.sortable && sortColumn === column.key && (
              <span class={`table-sort-icon ${sortDirection === 'asc' ? 'asc' : 'desc'}`}>
                {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  )

  const renderBody = () => (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          class={selectedRows.includes(String(rowIndex)) ? 'table-row-selected' : ''}
        >
          {selectable && (
            <td class="table-select-cell">
              <input
                type="checkbox"
                checked={selectedRows.includes(String(rowIndex))}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement
                  handleRowSelect(rowIndex, target.checked)
                }}
              />
            </td>
          )}
          {columns.map((column) => (
            <td
              key={column.key}
              class={column.align ? `text-${column.align}` : ''}
            >
              {row[column.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )

  const table = (
    <table class={`${tableClass} ${className}`} {...props}>
      {renderHeader()}
      {renderBody()}
    </table>
  )

  return responsive ? (
    <div class={wrapperClass}>
      {table}
    </div>
  ) : table
}

export type { TableProps, TableColumn }
