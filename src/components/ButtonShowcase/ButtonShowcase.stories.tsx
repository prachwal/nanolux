import type { Meta, StoryObj } from '@storybook/preact'
import ButtonShowcase from './ButtonShowcase'

const meta: Meta<typeof ButtonShowcase> = {
  title: 'Components/ButtonShowcase',
  component: ButtonShowcase,
  parameters: {
    docs: {
      description: {
        component: 'Showcase różnych wariantów przycisków demonstrujący możliwości komponentu Button z atomic CSS classes.'
      }
    }
  },
  argTypes: {
    title: {
      control: { type: 'text' }
    }
  }
}

export default meta
type Story = StoryObj<typeof ButtonShowcase>

// Basic stories
export const Default: Story = {
  args: {}
}

export const CustomTitle: Story = {
  args: {
    title: 'Interactive Button Gallery'
  }
}

export const NoTitle: Story = {
  args: {
    title: ''
  }
}

export const ComponentLibraryDemo: Story = {
  args: {
    title: 'NanoLux Button System'
  },
  parameters: {
    docs: {
      description: {
        story: 'Kompletna prezentacja systemu przycisków dla dokumentacji biblioteki komponentów'
      }
    }
  }
}

export const ShowcaseCollection: Story = {
  render: () => (
    <div class="flex flex-col gap-32">
      <ButtonShowcase title="Basic Variants" />
      <ButtonShowcase title="Size Options" />
      <ButtonShowcase title="Interactive States" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Kolekcja showcases z różnymi tematami'
      }
    }
  }
}

export const DesignSystemOverview: Story = {
  render: () => (
    <div>
      <div style="margin-bottom: 24px; text-align: center;">
        <h3 style="margin: 0 0 8px 0; color: #333;">NanoLux Design System</h3>
        <p style="margin: 0; color: #666; font-size: 0.875rem;">
          Complete button component showcase with all variants, sizes, and states
        </p>
      </div>
      
      <ButtonShowcase title="Complete Button Gallery" />
      
      <div style="margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
        <h5 style="margin: 0 0 8px 0; color: #333;">📋 Button Specifications:</h5>
        <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 0.875rem;">
          <li><strong>Variants:</strong> Primary, Secondary, Danger</li>
          <li><strong>Sizes:</strong> Small (sm), Medium (md), Large (lg)</li>
          <li><strong>States:</strong> Default, Hover, Disabled</li>
          <li><strong>Customization:</strong> CSS Variables for colors</li>
          <li><strong>Accessibility:</strong> Full keyboard and screen reader support</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Kompletny przegląd design system z dokumentacją specyfikacji'
      }
    }
  }
}

export const ResponsiveShowcase: Story = {
  render: () => (
    <div>
      <div class="text-sm mb-16">Desktop Layout:</div>
      <div style="width: 100%; max-width: 1200px;">
        <ButtonShowcase title="Full Desktop Experience" />
      </div>
      
      <div class="text-sm mb-16 mt-32">Tablet Layout:</div>
      <div style="width: 100%; max-width: 768px;">
        <ButtonShowcase title="Tablet Optimized" />
      </div>
      
      <div class="text-sm mb-16 mt-32">Mobile Layout:</div>
      <div style="width: 100%; max-width: 375px;">
        <ButtonShowcase title="Mobile Friendly" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsywny showcase na różnych szerokościach ekranu'
      }
    }
  }
}

export const InteractiveDemo: Story = {
  render: () => (
    <div>
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #333;">🎮 Interactive Button Demo</h4>
        <p style="margin: 0; color: #666; font-size: 0.875rem;">
          Click any button to see interactions. All buttons include hover effects and accessibility features.
        </p>
      </div>
      
      <ButtonShowcase title="Try All Buttons!" />
      
      <div style="margin-top: 16px; padding: 12px; background: #e3f2fd; border-radius: 6px; border-left: 4px solid #2196f3;">
        <div style="font-size: 0.875rem; color: #1565c0;">
          💡 <strong>Performance Note:</strong> Each button click is optimized for minimal reflow and repaint
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interaktywna demonstracja z naciskiem na user experience'
      }
    }
  }
}

export const ThemeVariations: Story = {
  render: () => (
    <div class="flex flex-col gap-32">
      <div>
        <h5 style="margin: 0 0 16px 0; color: #333;">Light Theme</h5>
        <div style="background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e0e0e0;">
          <ButtonShowcase title="Light Theme Buttons" />
        </div>
      </div>
      
      <div>
        <h5 style="margin: 0 0 16px 0; color: #333;">Dark Theme</h5>
        <div style="background: #2c2c2c; padding: 24px; border-radius: 8px;">
          <div style="color: white;">
            <ButtonShowcase title="Dark Theme Buttons" />
          </div>
        </div>
      </div>
      
      <div>
        <h5 style="margin: 0 0 16px 0; color: #333;">Colored Background</h5>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 8px;">
          <div style="color: white;">
            <ButtonShowcase title="Gradient Background" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase w różnych motywach i kontekstach kolorystycznych'
      }
    }
  }
}

export const A11yShowcase: Story = {
  render: () => (
    <div>
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #333;">♿ Accessibility Showcase</h4>
        <p style="margin: 0; color: #666; font-size: 0.875rem;">
          All buttons meet WCAG guidelines with proper contrast ratios and keyboard navigation.
        </p>
      </div>
      
      <ButtonShowcase title="Accessible Buttons" />
      
      <div style="margin-top: 24px; display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
        <div style="padding: 12px; background: #e8f5e8; border-radius: 6px;">
          <strong style="color: #155724;">✓ Keyboard Navigation</strong>
          <div style="font-size: 0.75rem; color: #155724;">Tab, Enter, Space support</div>
        </div>
        <div style="padding: 12px; background: #e8f5e8; border-radius: 6px;">
          <strong style="color: #155724;">✓ Screen Readers</strong>
          <div style="font-size: 0.75rem; color: #155724;">Proper ARIA labels</div>
        </div>
        <div style="padding: 12px; background: #e8f5e8; border-radius: 6px;">
          <strong style="color: #155724;">✓ Color Contrast</strong>
          <div style="font-size: 0.75rem; color: #155724;">WCAG AA compliant</div>
        </div>
        <div style="padding: 12px; background: #e8f5e8; border-radius: 6px;">
          <strong style="color: #155724;">✓ Focus Indicators</strong>
          <div style="font-size: 0.75rem; color: #155724;">Clear focus states</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Prezentacja funkcji accessibility z informacjami o zgodności WCAG'
      }
    }
  }
}
