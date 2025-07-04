import type { Meta, StoryObj } from '@storybook/preact'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Uniwersalny przycisk z pełną parametryzacją stylów. Wspiera warianty, rozmiary i custom kolory z CSS variables.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    bg: {
      control: { type: 'color' }
    },
    color: {
      control: { type: 'color' }
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

// Basic stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button'
  }
}

export const AllSizes: Story = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie dostępne rozmiary przycisków z atomic CSS classes'
      }
    }
  }
}

export const AllVariants: Story = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button>Default</Button>
    </div>
  )
}

export const CustomColors: Story = {
  render: () => (
    <div class="flex gap-8 flex-wrap">
      <Button bg="#ff6b6b" color="white">Custom Red</Button>
      <Button bg="#4ecdc4" color="white">Custom Teal</Button>
      <Button bg="#45b7d1" color="white">Custom Blue</Button>
      <Button bg="#f9ca24" color="#2c2c2c">Custom Yellow</Button>
      <Button bg="#6c5ce7" color="white">Custom Purple</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom kolory używając CSS variables - --btn-bg i --btn-color'
      }
    }
  }
}

export const Disabled: Story = {
  render: () => (
    <div class="flex gap-8 items-center">
      <Button variant="primary" disabled>Disabled Primary</Button>
      <Button variant="secondary" disabled>Disabled Secondary</Button>
      <Button disabled>Disabled Default</Button>
    </div>
  )
}

export const WithClickHandler: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
    onClick: () => alert('Button clicked!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Button z obsługą zdarzeń onClick'
      }
    }
  }
}
