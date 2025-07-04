import TestComponent from './TestComponent'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'

export default {
  title: 'Components/TestComponent',
  component: TestComponent,
  parameters: {
    docs: {
      description: {
        component: 'TestComponent component with customizable variants and sizes'
      }
    }
  }
}

export const Default = {
  args: {
    children: 'Default TestComponent'
  }
}

export const Variants = {
  render: () => (
    <div class="flex gap-8">
      <TestComponent variant="default">Default</TestComponent>
      <TestComponent variant="primary">Primary</TestComponent>
      <TestComponent variant="secondary">Secondary</TestComponent>
    </div>
  )
}

export const Sizes = {
  render: () => (
    <div class="flex gap-8 items-center">
      <TestComponent variant="primary" size="sm">Small</TestComponent>
      <TestComponent variant="primary" size="md">Medium</TestComponent>
      <TestComponent variant="primary" size="lg">Large</TestComponent>
    </div>
  )
}

export const States = {
  render: () => (
    <div class="flex gap-8">
      <TestComponent variant="primary">Enabled</TestComponent>
      <TestComponent variant="primary" disabled>Disabled</TestComponent>
    </div>
  )
}

export const InteractiveTest = {
  args: {
    variant: 'primary',
    children: 'Click me'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const component = canvas.getByRole('generic')
    
    await expect(component).toBeInTheDocument()
    await expect(component).toHaveClass('testcomponent', 'testcomponent-md', 'testcomponent-primary')
    
    await userEvent.click(component)
  }
}