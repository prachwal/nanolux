import type { Meta, StoryObj } from '@storybook/preact'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Uniwersalny input z pełną parametryzacją. Wspiera różne typy, rozmiary, ikony i stany walidacji.'
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    invalid: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    }
  }
}

export default meta
type Story = StoryObj<typeof Input>

// Basic stories
export const Default: Story = {
  args: {
    placeholder: 'Enter text...'
  }
}

export const WithValue: Story = {
  args: {
    value: 'Sample text',
    placeholder: 'Enter text...'
  }
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email address...'
  }
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...'
  }
}

export const AllSizes: Story = {
  render: () => (
    <div class="flex flex-col gap-12">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie dostępne rozmiary inputów'
      }
    }
  }
}

export const AllTypes: Story = {
  render: () => (
    <div class="flex flex-col gap-12">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie dostępne typy inputów'
      }
    }
  }
}

export const WithIcons: Story = {
  render: () => (
    <div class="flex flex-col gap-12">
      <Input prefixIcon="🔍" placeholder="Search..." />
      <Input type="email" prefixIcon="📧" placeholder="Enter email..." />
      <Input type="password" prefixIcon="🔒" suffixIcon="👁️" placeholder="Password..." />
      <Input suffixIcon="⚠️" placeholder="With warning icon" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inputy z ikonami - prefix i suffix'
      }
    }
  }
}

export const States: Story = {
  render: () => (
    <div class="flex flex-col gap-12">
      <Input placeholder="Normal state" />
      <Input invalid placeholder="Invalid state" />
      <Input disabled placeholder="Disabled state" />
      <Input disabled value="Disabled with value" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Różne stany inputów - normal, invalid, disabled'
      }
    }
  }
}

export const InteractiveTest: Story = {
  args: {
    placeholder: 'Type something...'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Type something...')
    
    // Test: input jest widoczny
    await expect(input).toBeInTheDocument()
    
    // Test: input ma odpowiednie klasy
    await expect(input).toHaveClass('input', 'input-md')
    
    // Test: można pisać w input
    await userEvent.type(input, 'Hello World')
    await expect(input).toHaveValue('Hello World')
    
    // Test: focus działa
    await userEvent.clear(input)
    await userEvent.click(input)
    await expect(input).toHaveFocus()
  }
}
