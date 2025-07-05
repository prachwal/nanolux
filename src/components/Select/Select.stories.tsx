import { useState } from 'preact/hooks'
import Select from './Select'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'
import './Select.css'

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Select/Dropdown komponent do wyboru opcji z listy z pełną obsługą klawiatury i accessibility'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: 'boolean'
    },
    error: {
      control: 'boolean'
    }
  }
}

// Sample options for stories
const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' }
]

const longOptions = [
  { value: 'option1', label: 'Very long option name that should be truncated' },
  { value: 'option2', label: 'Another long option' },
  { value: 'option3', label: 'Short' },
  { value: 'option4', label: 'Medium length option' }
]

const optionsWithDisabled = [
  { value: 'available1', label: 'Available Option 1' },
  { value: 'disabled1', label: 'Disabled Option', disabled: true },
  { value: 'available2', label: 'Available Option 2' },
  { value: 'disabled2', label: 'Another Disabled', disabled: true },
  { value: 'available3', label: 'Available Option 3' }
]

// Basic stories
export const Default = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select 
        options={sampleOptions}
        placeholder="Select fruit..."
        value={value}
        onChange={setValue}
      />
    )
  }
}

export const WithSelectedValue = {
  render: () => {
    const [value, setValue] = useState('banana')
    return (
      <Select 
        options={sampleOptions}
        placeholder="Select fruit..."
        value={value}
        onChange={setValue}
      />
    )
  }
}

export const AllSizes = {
  render: () => {
    const [smallValue, setSmallValue] = useState('')
    const [mediumValue, setMediumValue] = useState('')
    const [largeValue, setLargeValue] = useState('')
    
    return (
      <div class="flex flex-col gap-16">
        <div>
          <label class="block mb-4 text-sm font-medium">Small Select</label>
          <Select 
            options={sampleOptions} 
            size="sm" 
            placeholder="Small select..."
            value={smallValue}
            onChange={setSmallValue}
          />
        </div>
        <div>
          <label class="block mb-4 text-sm font-medium">Medium Select (default)</label>
          <Select 
            options={sampleOptions} 
            size="md" 
            placeholder="Medium select..."
            value={mediumValue}
            onChange={setMediumValue}
          />
        </div>
        <div>
          <label class="block mb-4 text-sm font-medium">Large Select</label>
          <Select 
            options={sampleOptions} 
            size="lg" 
            placeholder="Large select..."
            value={largeValue}
            onChange={setLargeValue}
          />
        </div>
      </div>
    )
  }
}

export const States = {
  render: () => {
    const [normalValue, setNormalValue] = useState('')
    const [errorValue, setErrorValue] = useState('')
    
    return (
      <div class="flex flex-col gap-16">
        <div>
          <label class="block mb-4 text-sm font-medium">Normal State</label>
          <Select 
            options={sampleOptions} 
            placeholder="Normal select..."
            value={normalValue}
            onChange={setNormalValue}
          />
        </div>
        <div>
          <label class="block mb-4 text-sm font-medium">Error State</label>
          <Select 
            options={sampleOptions} 
            error={true}
            placeholder="Error select..."
            value={errorValue}
            onChange={setErrorValue}
          />
        </div>
        <div>
          <label class="block mb-4 text-sm font-medium">Disabled State</label>
          <Select 
            options={sampleOptions} 
            disabled={true}
            placeholder="Disabled select..."
          />
        </div>
      </div>
    )
  }
}

export const WithDisabledOptions = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select 
        options={optionsWithDisabled}
        placeholder="Select option..."
        value={value}
        onChange={setValue}
      />
    )
  }
}

export const LongOptions = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select 
        options={longOptions}
        placeholder="Select long option..."
        value={value}
        onChange={setValue}
      />
    )
  }
}

export const CustomWidth = {
  render: () => {
    const [narrowValue, setNarrowValue] = useState('')
    const [wideValue, setWideValue] = useState('')
    
    return (
      <div class="flex flex-col gap-16">
        <div style="width: 150px;">
          <label class="block mb-4 text-sm font-medium">Narrow (150px)</label>
          <Select 
            options={sampleOptions} 
            placeholder="Narrow..."
            value={narrowValue}
            onChange={setNarrowValue}
          />
        </div>
        <div style="width: 400px;">
          <label class="block mb-4 text-sm font-medium">Wide (400px)</label>
          <Select 
            options={sampleOptions} 
            placeholder="Wide select..."
            value={wideValue}
            onChange={setWideValue}
          />
        </div>
      </div>
    )
  }
}

// Interactive story with tests
export const InteractiveTest = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select 
        options={sampleOptions}
        placeholder="Select fruit..."
        value={value}
        onChange={setValue}
      />
    )
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole('button')
    
    // Test: select trigger jest widoczny
    await expect(select).toBeInTheDocument()
    await expect(select).toHaveClass('select-trigger')
    
    // Test: placeholder jest wyświetlany
    await expect(select).toHaveTextContent('Select fruit...')
    
    // Test: kliknięcie otwiera dropdown
    await userEvent.click(select)
    
    // Test: dropdown jest widoczny
    const dropdown = canvas.getByRole('listbox')
    await expect(dropdown).toBeInTheDocument()
    
    // Test: opcje są widoczne
    const options = canvas.getAllByRole('option')
    await expect(options).toHaveLength(5)
    
    // Test: wybieranie opcji
    await userEvent.click(options[1]) // Banana
    
    // Test: dropdown się zamyka po wyborze
    await expect(dropdown).not.toBeInTheDocument()
    
    // Test: wybrana wartość jest wyświetlana
    await expect(select).toHaveTextContent('Banana')
  }
}

export const KeyboardNavigation = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select 
        options={sampleOptions}
        placeholder="Use keyboard to navigate..."
        value={value}
        onChange={setValue}
      />
    )
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole('button')
    
    // Focus na select
    select.focus()
    
    // Test: otwórz dropdown z klawiatury
    await userEvent.keyboard('{Enter}')
    
    const dropdown = canvas.getByRole('listbox')
    await expect(dropdown).toBeInTheDocument()
    
    // Test: Escape zamyka dropdown
    await userEvent.keyboard('{Escape}')
    await expect(dropdown).not.toBeInTheDocument()
  }
}
