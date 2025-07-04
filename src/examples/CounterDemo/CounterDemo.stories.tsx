import type { Meta, StoryObj } from '@storybook/preact'
import CounterDemo from './CounterDemo'

const meta: Meta<typeof CounterDemo> = {
  title: 'Components/CounterDemo',
  component: CounterDemo,
  parameters: {
    docs: {
      description: {
        component: 'Demo komponentu z licznikiem pokazującym interaktywność i state management w Preact. Używa atomic CSS classes.'
      }
    }
  },
  argTypes: {
    initialValue: {
      control: { type: 'number' }
    }
  }
}

export default meta
type Story = StoryObj<typeof CounterDemo>

// Basic stories
export const Default: Story = {
  args: {}
}

export const WithInitialValue: Story = {
  args: {
    initialValue: 10
  }
}

export const StartFromZero: Story = {
  args: {
    initialValue: 0
  }
}

export const StartFromNegative: Story = {
  args: {
    initialValue: -5
  }
}

export const StartFromHundred: Story = {
  args: {
    initialValue: 100
  }
}

export const MultipleCounters: Story = {
  render: () => (
    <div class="flex flex-col gap-24">
      <CounterDemo initialValue={0} />
      <CounterDemo initialValue={10} />
      <CounterDemo initialValue={50} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wiele niezależnych liczników z różnymi wartościami początkowymi'
      }
    }
  }
}

export const CounterGrid: Story = {
  render: () => (
    <div class="grid gap-16" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
      <CounterDemo initialValue={0} />
      <CounterDemo initialValue={5} />
      <CounterDemo initialValue={10} />
      <CounterDemo initialValue={15} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid układu liczników z responsywnym designem'
      }
    }
  }
}

export const InteractiveShowcase: Story = {
  render: () => (
    <div class="max-w-400">
      <h3 style="margin: 0 0 16px 0; color: #333;">Interactive Demo Showcase</h3>
      <p style="margin: 0 0 24px 0; color: #666; line-height: 1.5;">
        This counter demonstrates state management with Preact hooks. 
        Click the buttons to see real-time updates with minimal bundle size.
      </p>
      <CounterDemo initialValue={0} />
      <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 6px; font-size: 0.875rem; color: #666;">
        💡 <strong>Performance:</strong> Each state update is optimized for minimal re-renders
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Prezentacja interaktywnych możliwości z opisem performance'
      }
    }
  }
}

export const BenchmarkDemo: Story = {
  render: () => (
    <div class="flex flex-col gap-16">
      <div style="text-align: center;">
        <h4 style="margin: 0 0 8px 0;">Performance Benchmark</h4>
        <p style="margin: 0 0 16px 0; color: #666; font-size: 0.875rem;">
          Multiple counters to test rendering performance
        </p>
      </div>
      
      <div class="grid gap-8" style="grid-template-columns: repeat(4, 1fr);">
        {Array.from({ length: 8 }, (_, i) => (
          <CounterDemo key={i} initialValue={i * 5} />
        ))}
      </div>
      
      <div style="text-align: center; font-size: 0.75rem; color: #999;">
        8 independent counter instances with separate state
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Test wydajności z wieloma instancjami komponentu'
      }
    }
  }
}

export const CustomStyling: Story = {
  render: () => (
    <div>
      <style>{`
        .custom-counter-demo {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .custom-counter-demo .counter-demo-title {
          color: white;
        }
        .custom-counter-demo .counter-demo-value {
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          padding: 8px;
        }
      `}</style>
      
      <CounterDemo 
        initialValue={42} 
        className="custom-counter-demo"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Counter z custom stylingiem używającym CSS variables'
      }
    }
  }
}
