import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('renders with default props', () => {
    render(<Checkbox label="Test checkbox" />)
    
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('Test checkbox')
    
    expect(checkbox).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  it('renders checked when checked prop is true', () => {
    render(<Checkbox label="Checked" checked={true} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('renders indeterminate state', () => {
    render(<Checkbox label="Indeterminate" indeterminate={true} />)
    
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.indeterminate).toBe(true)
  })

  it('applies size classes correctly', () => {
    const { container } = render(<Checkbox label="Large" size="lg" />)
    
    const checkboxWrapper = container.querySelector('.checkbox')
    expect(checkboxWrapper).toHaveClass('checkbox-lg')
  })

  it('handles disabled state', () => {
    render(<Checkbox label="Disabled" disabled={true} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('applies error state', () => {
    const { container } = render(<Checkbox label="Error" error={true} />)
    
    const checkboxWrapper = container.querySelector('.checkbox')
    expect(checkboxWrapper).toHaveClass('checkbox-error')
  })

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<Checkbox label="Test" onChange={handleChange} />)
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('calls onChange when label is clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<Checkbox label="Test label" onChange={handleChange} />)
    
    const label = screen.getByText('Test label')
    await user.click(label)
    
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<Checkbox label="Disabled" disabled={true} onChange={handleChange} />)
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('handles keyboard interaction', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<Checkbox label="Keyboard test" onChange={handleChange} />)
    
    const checkbox = screen.getByRole('checkbox')
    checkbox.focus()
    
    await user.keyboard(' ')
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('renders without label when only aria-label is provided', () => {
    render(<Checkbox aria-label="Accessible checkbox" />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('aria-label', 'Accessible checkbox')
    
    // Nie powinno być visible label
    expect(screen.queryByText('Accessible checkbox')).not.toBeInTheDocument()
  })

  it('generates unique id when not provided', () => {
    render(<Checkbox label="Auto ID" />)
    
    const checkbox = screen.getByRole('checkbox')
    const id = checkbox.getAttribute('id')
    
    expect(id).toMatch(/^checkbox-[a-z0-9]+$/)
  })

  it('uses provided id', () => {
    render(<Checkbox label="Custom ID" id="custom-checkbox" />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('id', 'custom-checkbox')
  })

  it('associates label with checkbox correctly', () => {
    render(<Checkbox label="Associated label" id="test-checkbox" />)
    
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('Associated label')
    
    expect(checkbox).toHaveAttribute('id', 'test-checkbox')
    expect(label).toHaveAttribute('for', 'test-checkbox')
  })
})