import type { Meta, StoryObj } from '@storybook/preact'
import BundleInfo from './BundleInfo'

const meta: Meta<typeof BundleInfo> = {
  title: 'Components/BundleInfo',
  component: BundleInfo,
  parameters: {
    docs: {
      description: {
        component: 'Wyświetla informacje o rozmiarze bundla. Kluczowy komponent dla performance-first filozofii NanoLux.'
      }
    }
  },
  argTypes: {
    cssSize: {
      control: { type: 'text' }
    },
    jsSize: {
      control: { type: 'text' }
    },
    totalSize: {
      control: { type: 'text' }
    }
  }
}

export default meta
type Story = StoryObj<typeof BundleInfo>

// Basic stories
export const Default: Story = {
  args: {}
}

export const OptimalSizes: Story = {
  args: {
    cssSize: '~800 bytes CSS',
    jsSize: '~400 bytes JS',
    totalSize: '~1.2KB'
  }
}

export const LargerBundle: Story = {
  args: {
    cssSize: '~1.2KB CSS',
    jsSize: '~900 bytes JS',
    totalSize: '~2.1KB'
  }
}

export const TinyBundle: Story = {
  args: {
    cssSize: '~500 bytes CSS',
    jsSize: '~300 bytes JS',
    totalSize: '~800 bytes'
  }
}

export const ProductionSizes: Story = {
  args: {
    cssSize: '~650 bytes CSS (gzipped)',
    jsSize: '~450 bytes JS (gzipped)',
    totalSize: '~1.1KB (gzipped)'
  },
  parameters: {
    docs: {
      description: {
        story: 'Rozmiary dla produkcji z kompresją gzip'
      }
    }
  }
}

export const ComparisonView: Story = {
  render: () => (
    <div class="flex flex-col gap-24">
      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">NanoLux Bundle</h4>
        <BundleInfo 
          cssSize="~950 bytes CSS" 
          jsSize="~600 bytes JS" 
          totalSize="~1.5KB" 
        />
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px 0; color: #333;">Typical React App</h4>
        <BundleInfo 
          cssSize="~45KB CSS" 
          jsSize="~120KB JS" 
          totalSize="~165KB" 
        />
      </div>
      
      <div style="padding: 16px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #28a745;">
        <strong style="color: #155724;">110x smaller!</strong> NanoLux vs typical React setup
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Porównanie rozmiarów NanoLux vs typowa aplikacja React'
      }
    }
  }
}

export const ProgressiveLoading: Story = {
  render: () => (
    <div class="flex flex-col gap-16">
      <h4 style="margin: 0; color: #333;">Progressive Bundle Loading</h4>
      
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="font-size: 0.875rem; color: #666;">Initial Load:</div>
        <BundleInfo cssSize="~400 bytes CSS" jsSize="~300 bytes JS" totalSize="~700 bytes" />
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="font-size: 0.875rem; color: #666;">+ First Interaction:</div>
        <BundleInfo cssSize="~650 bytes CSS" jsSize="~450 bytes JS" totalSize="~1.1KB" />
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="font-size: 0.875rem; color: #666;">+ Full Features:</div>
        <BundleInfo cssSize="~950 bytes CSS" jsSize="~600 bytes JS" totalSize="~1.5KB" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progresywne ładowanie bundle w różnych fazach aplikacji'
      }
    }
  }
}

export const BenchmarkGrid: Story = {
  render: () => (
    <div class="grid gap-16" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
      <div>
        <h5 style="margin: 0 0 8px 0; color: #333;">Minimum Viable</h5>
        <BundleInfo cssSize="~300B CSS" jsSize="~200B JS" totalSize="~500B" />
      </div>
      
      <div>
        <h5 style="margin: 0 0 8px 0; color: #333;">Basic App</h5>
        <BundleInfo cssSize="~600B CSS" jsSize="~400B JS" totalSize="~1KB" />
      </div>
      
      <div>
        <h5 style="margin: 0 0 8px 0; color: #333;">Full Featured</h5>
        <BundleInfo cssSize="~950B CSS" jsSize="~600B JS" totalSize="~1.5KB" />
      </div>
      
      <div>
        <h5 style="margin: 0 0 8px 0; color: #333;">Enterprise</h5>
        <BundleInfo cssSize="~1.2KB CSS" jsSize="~800B JS" totalSize="~2KB" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Benchmark różnych poziomów złożoności aplikacji'
      }
    }
  }
}

export const OptimizationTips: Story = {
  render: () => (
    <div>
      <BundleInfo cssSize="~950 bytes CSS" jsSize="~600 bytes JS" totalSize="~1.5KB" />
      
      <div style="margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
        <h5 style="margin: 0 0 12px 0; color: #333;">💡 Optimization Tips:</h5>
        <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 0.875rem;">
          <li>Use atomic CSS classes instead of custom styles</li>
          <li>Leverage CSS variables for dynamic theming</li>
          <li>Import only the components you need</li>
          <li>Enable tree-shaking in your build config</li>
          <li>Use dynamic imports for code splitting</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bundle info z praktycznymi tipami optymalizacji'
      }
    }
  }
}

export const RealTimeMonitoring: Story = {
  render: () => (
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h4 style="margin: 0; color: #333;">Bundle Monitor</h4>
        <div style="padding: 4px 8px; background: #28a745; color: white; border-radius: 4px; font-size: 0.75rem;">
          OPTIMAL
        </div>
      </div>
      
      <BundleInfo cssSize="~950 bytes CSS" jsSize="~600 bytes JS" totalSize="~1.5KB" />
      
      <div style="margin-top: 16px; display: flex; gap: 16px; font-size: 0.875rem;">
        <div style="color: #28a745;">
          ✓ Under 2KB limit
        </div>
        <div style="color: #28a745;">
          ✓ Tree-shaking active
        </div>
        <div style="color: #28a745;">
          ✓ CSS optimized
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-time monitoring z wskaźnikami stanu optymalizacji'
      }
    }
  }
}
