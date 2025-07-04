import type { Meta, StoryObj } from '@storybook/preact'
import Card from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Uniwersalna karta z pełną parametryzacją stylów. Wspiera warianty, padding i custom kolory z CSS variables.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined']
    },
    padding: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    bg: {
      control: { type: 'color' }
    },
    borderColor: {
      control: { type: 'color' }
    }
  }
}

export default meta
type Story = StoryObj<typeof Card>

// Basic stories
export const Default: Story = {
  args: {
    children: 'Default card content with basic styling.'
  }
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Elevated card with shadow effect.'
  }
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined card with border styling.'
  }
}

export const AllVariants: Story = {
  render: () => (
    <div class="flex gap-16 flex-wrap">
      <Card variant="default">Default Card</Card>
      <Card variant="elevated">Elevated Card</Card>
      <Card variant="outlined">Outlined Card</Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie dostępne warianty kart'
      }
    }
  }
}

export const AllPaddings: Story = {
  render: () => (
    <div class="flex gap-16 flex-wrap">
      <Card variant="elevated" padding="sm">Small Padding</Card>
      <Card variant="elevated" padding="md">Medium Padding</Card>
      <Card variant="elevated" padding="lg">Large Padding</Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Różne rozmiary padding z atomic CSS classes'
      }
    }
  }
}

export const CustomColors: Story = {
  render: () => (
    <div class="flex gap-16 flex-wrap">
      <Card bg="#f8f9fa" borderColor="#dee2e6">Light Card</Card>
      <Card bg="#343a40" borderColor="#6c757d" style="color: white;">Dark Card</Card>
      <Card bg="#e3f2fd" borderColor="#2196f3">Blue Card</Card>
      <Card bg="#f3e5f5" borderColor="#9c27b0">Purple Card</Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom kolory używając CSS variables - --card-bg i --card-border-color'
      }
    }
  }
}

export const WithContent: Story = {
  render: () => (
    <div class="max-w-400">
      <Card variant="elevated" padding="lg">
        <h3 style="margin: 0 0 12px 0; color: #333;">Card Title</h3>
        <p style="margin: 0 0 16px 0; color: #666; line-height: 1.5;">
          This is a card with structured content including a title, description, and action button.
        </p>
        <button class="btn btn-primary">Action Button</button>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Karta z strukturalną zawartością - tytuł, opis i przycisk'
      }
    }
  }
}

export const CardGrid: Story = {
  render: () => (
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
      <Card variant="elevated">
        <h4 style="margin: 0 0 8px 0;">Feature 1</h4>
        <p style="margin: 0; color: #666;">Ultra-small bundles for better performance</p>
      </Card>
      <Card variant="elevated">
        <h4 style="margin: 0 0 8px 0;">Feature 2</h4>
        <p style="margin: 0; color: #666;">Zero config setup with intelligent defaults</p>
      </Card>
      <Card variant="elevated">
        <h4 style="margin: 0 0 8px 0;">Feature 3</h4>
        <p style="margin: 0; color: #666;">Preact-first approach for minimal overhead</p>
      </Card>
      <Card variant="elevated">
        <h4 style="margin: 0 0 8px 0;">Feature 4</h4>
        <p style="margin: 0; color: #666;">Atomic CSS with performance optimization</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid układu kart z responsywnym designem'
      }
    }
  }
}
