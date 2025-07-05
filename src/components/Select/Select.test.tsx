import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import Select from './Select'

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
]

describe('Select', () => {
  it('renders with default props', () => {
    render(
      <Select 
        options={sampleOptions} 
        placeholder="Select fruit..." 
      />
    )
    
    const selectTrigger = screen.getByRole('button')
    expect(selectTrigger).toBeInTheDocument()
    expect(selectTrigger).toHaveClass('select-trigger')
    expect(selectTrigger).toHaveTextContent('Select fruit...')
  })
  
  it('shows selected value', () => {
    render(
      <Select 
        options={sampleOptions}
        value="banana"
        placeholder="Select fruit..."
      />
    )
    
    const selectTrigger = screen.getByRole('button')
    expect(selectTrigger).toHaveTextContent('Banana')
  })
  
  it('applies size classes correctly', () => {
    const { container } = render(
      <Select 
        options={sampleOptions}
        size="lg"
        placeholder="Large select"
      />
    )
    
    const select = container.querySelector('.select')
    expect(select).toHaveClass('select-lg')
  })
  
  it('handles disabled state', () => {
    render(
      <Select 
        options={sampleOptions}
        disabled
        placeholder="Disabled select"
      />
    )
    
    const selectTrigger = screen.getByRole('button')
    expect(selectTrigger).toBeDisabled()
  })
  
  it('handles error state', () => {
    const { container } = render(
      <Select 
        options={sampleOptions}
        error
        placeholder="Error select"
      />
    )
    
    const select = container.querySelector('.select')
    expect(select).toHaveClass('select-error')
  })
  
  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    
    render(
      <Select 
        options={sampleOptions}
        placeholder="Click to open"
      />
    )
    
    const selectTrigger = screen.getByRole('button')
    await user.click(selectTrigger)
    
    const dropdown = screen.getByRole('listbox')
    expect(dropdown).toBeInTheDocument()
    
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
  })
  
  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(
      <Select 
        options={sampleOptions}
        onChange={handleChange}
        placeholder="Select to test onChange"
      />
    )
    
    const selectTrigger = screen.getByRole('button')
    await user.click(selectTrigger)
    
    const bananaOption = screen.getByText('Banana')
    await user.click(bananaOption)
    
    expect(handleChange).toHaveBeenCalledWith('banana')
  })
  
  it('closes dropdown after selection', async () => {
    const user = userEvent.setup()
    
    render(
      <Select 
        options={sampleOptions}
        placeholder="Select and close"
      />
    )
    
    const selectTrigger = screen.getByRole('button')
    await user.click(selectTrigger)
    
    const bananaOption = screen.getByText('Banana')
    await user.click(bananaOption)
    
    const dropdown = screen.queryByRole('listbox')
    expect(dropdown).not.toBeInTheDocument()
  })
  
  it('handles disabled options', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    const optionsWithDisabled = [
      { value: 'option1', label: 'Available' },
      { value: 'option2', label: 'Disabled', disabled: true }
    ]
    
    render(
      <Select 
        options={optionsWithDisabled}
        onChange={handleChange}
        placeholder="Test disabled options"
      />
    )
    
    const selectTrigger = screen.getByRole('button')
    await user.click(selectTrigger)
    
    const disabledOption = screen.getByText('Disabled')
    await user.click(disabledOption)
    
    // onChange nie powinien być wywołany dla disabled opcji
    expect(handleChange).not.toHaveBeenCalled()
  })
})