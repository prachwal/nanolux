import type { Meta, StoryObj } from '@storybook/preact'
import AppHeader from './AppHeader'

const meta: Meta<typeof AppHeader> = {
  title: 'Components/AppHeader',
  component: AppHeader,
  parameters: {
    docs: {
      description: {
        component: 'Nagłówek aplikacji z logo i opisem. Responsywny design z atomic CSS classes.'
      }
    }
  },
  argTypes: {
    title: {
      control: { type: 'text' }
    },
    description: {
      control: { type: 'text' }
    }
  }
}

export default meta
type Story = StoryObj<typeof AppHeader>

// Basic stories
export const Default: Story = {
  args: {}
}

export const CustomTitle: Story = {
  args: {
    title: 'My Awesome App',
    description: 'Building the future with NanoLux'
  }
}

export const ShortDescription: Story = {
  args: {
    title: 'NanoLux',
    description: 'Minimalistic & Fast'
  }
}

export const LongDescription: Story = {
  args: {
    title: 'NanoLux Framework',
    description: 'Ultra-minimalistyczny framework komponentów dla Preact z atomic CSS, zero-config setup i ekstremalnymi optymalizacjami bundle size'
  }
}

export const ProductShowcase: Story = {
  render: () => (
    <div>
      <AppHeader 
        title="NanoLux Pro" 
        description="Professional edition with advanced features and enterprise support"
      />
      <div style="margin-top: 32px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
        <p style="margin: 0; color: #666;">
          This is how the header looks in a real application context with content below it.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header w kontekście aplikacji z zawartością poniżej'
      }
    }
  }
}

export const DifferentTitles: Story = {
  render: () => (
    <div class="flex flex-col gap-32">
      <AppHeader title="Short" description="Brief and to the point" />
      <AppHeader title="Medium Length Title" description="A moderate description that provides good context" />
      <AppHeader title="Very Long Application Title That Spans Multiple Words" description="An extensive description that explains the application's purpose, features, and benefits in detail" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Różne długości tytułów i opisów'
      }
    }
  }
}

export const BrandingVariations: Story = {
  render: () => (
    <div class="flex flex-col gap-32">
      <AppHeader title="NanoLux" description="Ultra-minimalistic component framework" />
      <AppHeader title="NanoLux Studio" description="Visual development environment for components" />
      <AppHeader title="NanoLux CLI" description="Command-line tools for project scaffolding" />
      <AppHeader title="NanoLux Docs" description="Complete documentation and examples" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Różne warianty brandingu dla suite produktów'
      }
    }
  }
}

export const ResponsiveDemo: Story = {
  render: () => (
    <div>
      <div class="text-sm mb-16">Desktop View:</div>
      <div style="width: 100%; max-width: 1200px;">
        <AppHeader title="NanoLux Desktop" description="Full-featured desktop experience with all components and features" />
      </div>
      
      <div class="text-sm mb-16 mt-32">Tablet View:</div>
      <div style="width: 100%; max-width: 768px;">
        <AppHeader title="NanoLux Tablet" description="Optimized for medium screens and touch interfaces" />
      </div>
      
      <div class="text-sm mb-16 mt-32">Mobile View:</div>
      <div style="width: 100%; max-width: 375px;">
        <AppHeader title="NanoLux Mobile" description="Compact mobile-first design" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsywny design na różnych szerokościach ekranu'
      }
    }
  }
}

export const WithCustomStyling: Story = {
  args: {
    title: 'Styled Header',
    description: 'Custom styled header with additional CSS',
    className: 'custom-header-style'
  },
  decorators: [
    (Story) => (
      <div>
        <style>{`
          .custom-header-style {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          }
          .custom-header-style .logo {
            filter: brightness(0) invert(1);
          }
        `}</style>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Header z custom stylingiem używającym CSS variables'
      }
    }
  }
}
