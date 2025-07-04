import type { Meta, StoryObj } from '@storybook/preact'
import Logo from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    docs: {
      description: {
        component: 'Komponent logo z opcjonalnym linkiem. Wspiera różne warianty i rozmiary z atomic CSS classes.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['vite', 'preact']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    target: {
      control: { type: 'select' },
      options: ['_blank', '_self']
    }
  }
}

export default meta
type Story = StoryObj<typeof Logo>

// Basic stories
export const ViteLogo: Story = {
  args: {
    src: '/vite.svg',
    alt: 'Vite logo',
    variant: 'vite'
  }
}

export const PreactLogo: Story = {
  args: {
    src: '/preact.svg',
    alt: 'Preact logo',
    variant: 'preact'
  }
}

export const AllSizes: Story = {
  render: () => (
    <div class="flex gap-16 items-center">
      <Logo src="/vite.svg" alt="Small Vite logo" variant="vite" size="sm" />
      <Logo src="/vite.svg" alt="Medium Vite logo" variant="vite" size="md" />
      <Logo src="/vite.svg" alt="Large Vite logo" variant="vite" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie dostępne rozmiary logo z atomic CSS classes'
      }
    }
  }
}

export const AllVariants: Story = {
  render: () => (
    <div class="flex gap-16 items-center">
      <Logo src="/vite.svg" alt="Vite logo" variant="vite" />
      <Logo src="/preact.svg" alt="Preact logo" variant="preact" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Różne warianty logo - Vite i Preact'
      }
    }
  }
}

export const WithLink: Story = {
  args: {
    src: '/vite.svg',
    alt: 'Vite logo with link',
    variant: 'vite',
    href: 'https://vitejs.dev',
    target: '_blank'
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo z linkiem otwieranym w nowej karcie'
      }
    }
  }
}

export const LogoGrid: Story = {
  render: () => (
    <div class="grid gap-16" style="grid-template-columns: repeat(3, 1fr); place-items: center;">
      <Logo src="/vite.svg" alt="Vite small" variant="vite" size="sm" />
      <Logo src="/vite.svg" alt="Vite medium" variant="vite" size="md" />
      <Logo src="/vite.svg" alt="Vite large" variant="vite" size="lg" />
      <Logo src="/preact.svg" alt="Preact small" variant="preact" size="sm" />
      <Logo src="/preact.svg" alt="Preact medium" variant="preact" size="md" />
      <Logo src="/preact.svg" alt="Preact large" variant="preact" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid wszystkich kombinacji wariantów i rozmiarów'
      }
    }
  }
}

export const InteractiveLogo: Story = {
  render: () => (
    <div class="flex gap-16">
      <Logo 
        src="/vite.svg" 
        alt="Interactive Vite logo" 
        variant="vite" 
        href="https://vitejs.dev" 
        target="_blank"
      />
      <Logo 
        src="/preact.svg" 
        alt="Interactive Preact logo" 
        variant="preact" 
        href="https://preactjs.com" 
        target="_blank"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interaktywne logo z linkami do stron projektów'
      }
    }
  }
}

export const ResponsiveLogo: Story = {
  render: () => (
    <div class="flex flex-col gap-8">
      <div class="text-sm">Mobile (small):</div>
      <Logo src="/vite.svg" alt="Mobile logo" variant="vite" size="sm" />
      
      <div class="text-sm">Tablet (medium):</div>
      <Logo src="/vite.svg" alt="Tablet logo" variant="vite" size="md" />
      
      <div class="text-sm">Desktop (large):</div>
      <Logo src="/vite.svg" alt="Desktop logo" variant="vite" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsywne logo dla różnych urządzeń'
      }
    }
  }
}
