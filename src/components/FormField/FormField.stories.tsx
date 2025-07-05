import FormField from './FormField'
import Input from '../Input/Input'
import Select from '../Select/Select'
import Checkbox from '../Checkbox/Checkbox'
import { expect } from '@storybook/test'
import { within } from '@storybook/testing-library'

export default {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    docs: {
      description: {
        component: 'FormField wrapper dla pól formularza z etykietą, pomocą i obsługą błędów'
      }
    }
  }
}

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
]

export const BasicInput = {
  render: () => (
    <FormField label="Email Address" helpText="Enter your email address">
      <Input type="email" placeholder="user@example.com" />
    </FormField>
  )
}

export const RequiredField = {
  render: () => (
    <FormField label="Password" required helpText="Minimum 8 characters">
      <Input type="password" placeholder="Enter password" />
    </FormField>
  )
}

export const WithError = {
  render: () => (
    <FormField 
      label="Username" 
      error 
      errorMessage="Username is required"
    >
      <Input value="" placeholder="Enter username" />
    </FormField>
  )
}

export const WithSelect = {
  render: () => (
    <FormField label="Favorite Fruit" helpText="Choose your favorite">
      <Select options={sampleOptions} placeholder="Select fruit..." />
    </FormField>
  )
}

export const WithCheckbox = {
  render: () => (
    <FormField helpText="Check this box to receive newsletters">
      <Checkbox label="Subscribe to newsletter" />
    </FormField>
  )
}

export const AllSizes = {
  render: () => (
    <div class="flex flex-col gap-16">
      <FormField label="Small Field" size="sm" helpText="Small size field">
        <Input placeholder="Small input" />
      </FormField>
      <FormField label="Medium Field" size="md" helpText="Medium size field">
        <Input placeholder="Medium input" />
      </FormField>
      <FormField label="Large Field" size="lg" helpText="Large size field">
        <Input placeholder="Large input" />
      </FormField>
    </div>
  )
}

export const FormExample = {
  render: () => (
    <form class="max-w-400 mx-auto">
      <FormField label="First Name" required>
        <Input placeholder="Enter first name" />
      </FormField>
      
      <FormField label="Email" required helpText="We'll never share your email">
        <Input type="email" placeholder="user@example.com" />
      </FormField>
      
      <FormField label="Country" required>
        <Select 
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' }
          ]} 
          placeholder="Select country..." 
        />
      </FormField>
      
      <FormField helpText="Check to receive updates">
        <Checkbox label="Subscribe to newsletter" />
      </FormField>
    </form>
  )
}

export const InteractiveTest = {
  render: () => (
    <FormField label="Test Field" helpText="This is a help text">
      <Input placeholder="Test input" />
    </FormField>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: label jest widoczny
    const label = canvas.getByText('Test Field')
    await expect(label).toBeInTheDocument()
    
    // Test: help text jest widoczny
    const helpText = canvas.getByText('This is a help text')
    await expect(helpText).toBeInTheDocument()
    
    // Test: input jest dostępny
    const input = canvas.getByPlaceholderText('Test input')
    await expect(input).toBeInTheDocument()
    
    // Test: label jest powiązany z inputem
    await expect(label).toHaveAttribute('for', input.id)
  }
}