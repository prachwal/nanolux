import type { Meta, StoryObj } from '@storybook/preact'
import FeatureList from './FeatureList'

const meta: Meta<typeof FeatureList> = {
  title: 'Components/FeatureList',
  component: FeatureList,
  parameters: {
    docs: {
      description: {
        component: 'Lista funkcjonalności z ikonami. Responsywny design z atomic CSS classes i semantic HTML.'
      }
    }
  },
  argTypes: {
    title: {
      control: { type: 'text' }
    },
    features: {
      control: { type: 'object' }
    }
  }
}

export default meta
type Story = StoryObj<typeof FeatureList>

// Sample features data
const nanoluxFeatures = [
  { icon: '📦', text: 'Ultra-małe bundly <1KB runtime' },
  { icon: '⚡', text: 'Zero config - działa out-of-the-box' },
  { icon: '🎯', text: 'Preact-first approach (3KB vs 45KB React)' },
  { icon: '🎨', text: 'CSS Variables + Atomic CSS' },
  { icon: '🔧', text: 'Build-time optimizations' },
  { icon: '📱', text: 'Responsywny design system' }
]

const shortFeatures = [
  { icon: '🚀', text: 'Fast' },
  { icon: '🎯', text: 'Precise' },
  { icon: '💡', text: 'Smart' }
]

const technicalFeatures = [
  { icon: '⚙️', text: 'TypeScript support z automatycznym type inference' },
  { icon: '🏗️', text: 'Vite + esbuild dla ultra-szybkiego development' },
  { icon: '🌳', text: 'Automatyczny tree-shaking i dead code elimination' },
  { icon: '📊', text: 'Bundle analyzer z performance budgets' },
  { icon: '🔄', text: 'Hot Module Replacement z state preservation' },
  { icon: '🧪', text: 'Integrated testing z Vitest + Storybook' }
]

// Basic stories
export const Default: Story = {
  args: {
    features: nanoluxFeatures
  }
}

export const WithTitle: Story = {
  args: {
    title: 'NanoLux Features',
    features: nanoluxFeatures
  }
}

export const ShortList: Story = {
  args: {
    title: 'Core Values',
    features: shortFeatures
  }
}

export const TechnicalFeatures: Story = {
  args: {
    title: 'Technical Excellence',
    features: technicalFeatures
  }
}

export const NoTitle: Story = {
  args: {
    features: [
      { icon: '✨', text: 'Beautiful components' },
      { icon: '🎭', text: 'Semantic markup' },
      { icon: '♿', text: 'Accessibility first' },
      { icon: '🎪', text: 'Animation ready' }
    ]
  }
}

export const LongFeatureTexts: Story = {
  args: {
    title: 'Detailed Features',
    features: [
      { 
        icon: '📦', 
        text: 'Ultra-minimalistic bundle size with aggressive tree-shaking and dead code elimination to ensure your application loads as fast as possible' 
      },
      { 
        icon: '🎨', 
        text: 'Advanced CSS Variables system combined with atomic CSS classes for maximum flexibility while maintaining consistent design patterns' 
      },
      { 
        icon: '⚡', 
        text: 'Zero configuration setup that works immediately out of the box with intelligent defaults and automatic optimization strategies' 
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Długie teksty funkcjonalności z automatycznym zawijaniem'
      }
    }
  }
}

export const DifferentIconTypes: Story = {
  args: {
    title: 'Icon Variety',
    features: [
      { icon: '🚀', text: 'Emoji icons' },
      { icon: '→', text: 'Symbol characters' },
      { icon: '★', text: 'Special symbols' },
      { icon: '◆', text: 'Geometric shapes' },
      { icon: '✓', text: 'Checkmarks and status' },
      { icon: '#', text: 'Typography symbols' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Różne typy ikon - emoji, symbole, znaki specjalne'
      }
    }
  }
}

export const ComparisonLists: Story = {
  render: () => (
    <div class="grid gap-24" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
      <FeatureList
        title="Before NanoLux"
        features={[
          { icon: '😵', text: 'Massive bundle sizes' },
          { icon: '🐌', text: 'Slow load times' },
          { icon: '⚙️', text: 'Complex configuration' },
          { icon: '🔧', text: 'Manual optimizations' }
        ]}
      />
      <FeatureList
        title="With NanoLux"
        features={[
          { icon: '🎯', text: 'Ultra-small bundles' },
          { icon: '⚡', text: 'Lightning fast' },
          { icon: '✨', text: 'Zero configuration' },
          { icon: '🚀', text: 'Auto-optimized' }
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Porównanie dwóch list funkcjonalności w układzie grid'
      }
    }
  }
}

export const ResponsiveDemo: Story = {
  render: () => (
    <div>
      <div class="text-sm mb-16">Desktop View (3 columns):</div>
      <div style="width: 100%; max-width: 1200px;">
        <FeatureList title="Full Desktop Experience" features={technicalFeatures} />
      </div>
      
      <div class="text-sm mb-16 mt-32">Tablet View (2 columns):</div>
      <div style="width: 100%; max-width: 768px;">
        <FeatureList title="Tablet Optimized" features={nanoluxFeatures} />
      </div>
      
      <div class="text-sm mb-16 mt-32">Mobile View (1 column):</div>
      <div style="width: 100%; max-width: 375px;">
        <FeatureList title="Mobile First" features={shortFeatures} />
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
