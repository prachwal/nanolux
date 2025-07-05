import { useState } from 'preact/hooks'
import Radio from './Radio'
import { expect } from '@storybook/test'
import { within } from '@storybook/testing-library'

export default {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: 'Radio button z pełną kontrolą i accessibility - dla wyboru jednej opcji z grupy'
      }
    }
  }
}

export const Basic = {
  render: () => {
    const [selected, setSelected] = useState('')
    return (
      <div class="flex flex-col gap-8">
        <Radio 
          name="basic" 
          value="option1" 
          label="Option 1" 
          checked={selected === 'option1'}
          onChange={() => setSelected('option1')}
        />
        <Radio 
          name="basic" 
          value="option2" 
          label="Option 2" 
          checked={selected === 'option2'}
          onChange={() => setSelected('option2')}
        />
        <Radio 
          name="basic" 
          value="option3" 
          label="Option 3" 
          checked={selected === 'option3'}
          onChange={() => setSelected('option3')}
        />
      </div>
    )
  }
}

export const WithDefaultSelected = {
  render: () => {
    const [selected, setSelected] = useState('medium')
    return (
      <div class="flex flex-col gap-8">
        <Radio 
          name="default" 
          value="small" 
          label="Small" 
          checked={selected === 'small'}
          onChange={() => setSelected('small')}
        />
        <Radio 
          name="default" 
          value="medium" 
          label="Medium" 
          checked={selected === 'medium'}
          onChange={() => setSelected('medium')}
        />
        <Radio 
          name="default" 
          value="large" 
          label="Large" 
          checked={selected === 'large'}
          onChange={() => setSelected('large')}
        />
      </div>
    )
  }
}

export const AllSizes = {
  render: () => {
    const [smallSelected, setSmallSelected] = useState('')
    const [mediumSelected, setMediumSelected] = useState('')
    const [largeSelected, setLargeSelected] = useState('')
    
    return (
      <div class="flex flex-col gap-12">
        <div>
          <h4 class="mb-8 font-medium">Small</h4>
          <div class="flex flex-col gap-4">
            <Radio 
              name="sizes-sm" 
              value="1" 
              label="Small radio option" 
              size="sm" 
              checked={smallSelected === '1'}
              onChange={() => setSmallSelected('1')}
            />
            <Radio 
              name="sizes-sm" 
              value="2" 
              label="Another small option" 
              size="sm" 
              checked={smallSelected === '2'}
              onChange={() => setSmallSelected('2')}
            />
          </div>
        </div>
        
        <div>
          <h4 class="mb-8 font-medium">Medium (Default)</h4>
          <div class="flex flex-col gap-6">
            <Radio 
              name="sizes-md" 
              value="1" 
              label="Medium radio option" 
              size="md" 
              checked={mediumSelected === '1'}
              onChange={() => setMediumSelected('1')}
            />
            <Radio 
              name="sizes-md" 
              value="2" 
              label="Another medium option" 
              size="md" 
              checked={mediumSelected === '2'}
              onChange={() => setMediumSelected('2')}
            />
          </div>
        </div>
        
        <div>
          <h4 class="mb-8 font-medium">Large</h4>
          <div class="flex flex-col gap-8">
            <Radio 
              name="sizes-lg" 
              value="1" 
              label="Large radio option" 
              size="lg" 
              checked={largeSelected === '1'}
              onChange={() => setLargeSelected('1')}
            />
            <Radio 
              name="sizes-lg" 
              value="2" 
              label="Another large option" 
              size="lg" 
              checked={largeSelected === '2'}
              onChange={() => setLargeSelected('2')}
            />
          </div>
        </div>
      </div>
    )
  }
}

export const DisabledStates = {
  render: () => (
    <div class="flex flex-col gap-8">
      <Radio name="disabled" value="enabled" label="Enabled option" />
      <Radio name="disabled" value="disabled1" label="Disabled option" disabled />
      <Radio name="disabled" value="disabled2" label="Disabled and checked" disabled checked />
    </div>
  )
}

export const FormExample = {
  render: () => {
    const [subscription, setSubscription] = useState('pro')
    
    return (
      <form class="max-w-400">
        <fieldset class="border-0 p-0 m-0">
          <legend class="text-lg font-medium mb-12">Choose your subscription plan:</legend>
          
          <div class="flex flex-col gap-8">
            <Radio 
              name="subscription" 
              value="free" 
              label="Free - Basic features only" 
              checked={subscription === 'free'}
              onChange={() => setSubscription('free')}
            />
            <Radio 
              name="subscription" 
              value="pro" 
              label="Pro - $9.99/month with advanced features" 
              checked={subscription === 'pro'}
              onChange={() => setSubscription('pro')}
            />
            <Radio 
              name="subscription" 
              value="enterprise" 
              label="Enterprise - $29.99/month with full access" 
              checked={subscription === 'enterprise'}
              onChange={() => setSubscription('enterprise')}
            />
          </div>
        </fieldset>
        
        <div class="mt-16">
          <button type="submit" class="btn btn-primary">
            Continue with Selected Plan
          </button>
        </div>
      </form>
    )
  }
}

export const MultipleGroups = {
  render: () => (
    <div class="flex gap-24">
      <div>
        <h4 class="mb-8 font-medium">Size</h4>
        <div class="flex flex-col gap-6">
          <Radio name="size" value="small" label="Small" />
          <Radio name="size" value="medium" label="Medium" checked />
          <Radio name="size" value="large" label="Large" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-8 font-medium">Color</h4>
        <div class="flex flex-col gap-6">
          <Radio name="color" value="red" label="Red" />
          <Radio name="color" value="blue" label="Blue" checked />
          <Radio name="color" value="green" label="Green" />
        </div>
      </div>
    </div>
  )
}

export const InteractiveTest = {
  render: () => (
    <div class="flex flex-col gap-8">
      <Radio name="interactive" value="test1" label="Test Option 1" />
      <Radio name="interactive" value="test2" label="Test Option 2" />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: opcje są widoczne
    const option1 = canvas.getByLabelText('Test Option 1')
    const option2 = canvas.getByLabelText('Test Option 2')
    
    await expect(option1).toBeInTheDocument()
    await expect(option2).toBeInTheDocument()
    
    // Test: opcje mają tę samą nazwę grupy
    await expect(option1).toHaveAttribute('name', 'interactive')
    await expect(option2).toHaveAttribute('name', 'interactive')
    
    // Test: domyślnie żadna opcja nie jest zaznaczona
    await expect(option1).not.toBeChecked()
    await expect(option2).not.toBeChecked()
  }
}
