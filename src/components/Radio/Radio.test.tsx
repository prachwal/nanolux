import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import Radio from './Radio'

describe('Radio', () => {
  it('renders with required props', () => {
    render(<Radio name="test" value="option1" label="Option 1" />)
    
    const radio = screen.getByRole('radio')
    const label = screen.getByText('Option 1')
    
    expect(radio).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(radio).toHaveAttribute('name', 'test')
    expect(radio).toHaveAttribute('value', 'option1')
  })

  it('renders checked when checked prop is true', () => {
    render(<Radio name="test" value="option1" label="Checked" checked={true} />)
    
    const radio = screen.getByRole('radio')
    expect(radio).toBeChecked()
  })

  it('renders unchecked by default', () => {
    render(<Radio name="test" value="option1" label="Unchecked" />)
    
    const radio = screen.getByRole('radio')
    expect(radio).not.toBeChecked()
  })

  it('handles disabled state', () => {
    render(<Radio name="test" value="option1" label="Disabled" disabled />)
    
    const radio = screen.getByRole('radio')
    expect(radio).toBeDisabled()
  })

  it('calls onChange when clicked', async () => {
    const handleChange = vi.fn()
    render(
      <Radio 
        name="test" 
        value="option1" 
        label="Clickable" 
        onChange={handleChange}
      />
    )
    
    const radio = screen.getByRole('radio')
    await userEvent.click(radio)
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('does not call onChange when disabled', async () => {
    const handleChange = vi.fn()
    render(
      <Radio 
        name="test" 
        value="option1" 
        label="Disabled" 
        disabled 
        onChange={handleChange}
      />
    )
    
    const radio = screen.getByRole('radio')
    await userEvent.click(radio)
    
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('applies size classes correctly', () => {
    const { container } = render(
      <Radio name="test" value="option1" label="Large" size="lg" />
    )
    
    expect(container.querySelector('.radio')).toHaveClass('radio-lg')
  })

  it('applies disabled classes correctly', () => {
    const { container } = render(
      <Radio name="test" value="option1" label="Disabled" disabled />
    )
    
    expect(container.querySelector('.radio')).toHaveClass('radio-disabled')
  })

  it('connects label with input via htmlFor', () => {
    render(<Radio name="test" value="option1" label="Connected" />)
    
    const radio = screen.getByRole('radio')
    const label = screen.getByText('Connected').closest('label')
    
    expect(label).toHaveAttribute('for', radio.id)
  })

  it('generates unique IDs for radio groups', () => {
    render(
      <div>
        <Radio name="group1" value="a" label="Group 1 A" />
        <Radio name="group1" value="b" label="Group 1 B" />
        <Radio name="group2" value="a" label="Group 2 A" />
      </div>
    )
    
    const radios = screen.getAllByRole('radio')
    const ids = radios.map(radio => radio.id)
    
    // All IDs should be unique
    expect(new Set(ids).size).toBe(ids.length)
    
    // IDs should contain group name and value
    expect(ids[0]).toContain('group1')
    expect(ids[0]).toContain('a')
    expect(ids[2]).toContain('group2')
  })
})