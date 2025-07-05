import Navigation from './Navigation'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'

export default {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    docs: {
      description: {
        component: 'Navigation component with customizable variants and sizes'
      }
    }
  }
}

export const Default = {
  args: {
    children: 'Default Navigation'
  }
}

export const Variants = {
  render: () => (
    <div class="flex gap-8">
      <Navigation variant="default">Default</Navigation>
      <Navigation variant="primary">Primary</Navigation>
      <Navigation variant="secondary">Secondary</Navigation>
    </div>
  )
}

export const Sizes = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Navigation variant="primary" size="sm">Small</Navigation>
      <Navigation variant="primary" size="md">Medium</Navigation>
      <Navigation variant="primary" size="lg">Large</Navigation>
    </div>
  )
}

export const States = {
  render: () => (
    <div class="flex gap-8">
      <Navigation variant="primary">Enabled</Navigation>
      <Navigation variant="primary" disabled>Disabled</Navigation>
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
    await expect(component).toHaveClass('navigation', 'navigation-md', 'navigation-primary')
    
    await userEvent.click(component)
  }
}