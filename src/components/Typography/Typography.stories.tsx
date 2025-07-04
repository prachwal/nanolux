import type { Meta, StoryObj } from '@storybook/preact'
import { Heading, Text } from './Typography'

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    docs: {
      description: {
        component: 'Uniwersalne nagłówki z atomic CSS. Auto-sizing bazujący na poziomie nagłówka z możliwością override.'
      }
    }
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6]
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl']
    },
    color: {
      control: { type: 'color' }
    }
  }
}

export default meta
type Story = StoryObj<typeof Heading>

export const AllLevels: Story = {
  render: () => (
    <div>
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  )
}

export const CustomSizes: Story = {
  render: () => (
    <div>
      <Heading level={1} size="4xl">Extra Large H1</Heading>
      <Heading level={2} size="sm">Small H2</Heading>
      <Heading level={3} size="2xl">Large H3</Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Heading z custom rozmiarami - override domyślnego size'
      }
    }
  }
}

export const CustomColors: Story = {
  render: () => (
    <div>
      <Heading level={1} color="#007bff">Blue Heading</Heading>
      <Heading level={2} color="#dc3545">Red Heading</Heading>
      <Heading level={3} color="#28a745">Green Heading</Heading>
    </div>
  )
}

export const Centered: Story = {
  render: () => (
    <div>
      <Heading level={1} center>Centered Main Title</Heading>
      <Heading level={2} center color="#6c757d">Centered Subtitle</Heading>
    </div>
  )
}

// Text stories
const textMeta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: 'Uniwersalny tekst paragrafowy z atomic CSS. Wspiera różne rozmiary, wagi i stany.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl']
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'bold']
    },
    color: {
      control: { type: 'color' }
    }
  }
}

export { textMeta }
type TextStory = StoryObj<typeof Text>

export const TextSizes: TextStory = {
  render: () => (
    <div>
      <Text size="xs">Extra small text - perfect for captions</Text>
      <Text size="sm">Small text - good for secondary info</Text>
      <Text size="base">Base text - default paragraph size</Text>
      <Text size="lg">Large text - emphasized content</Text>
      <Text size="xl">Extra large text - important statements</Text>
    </div>
  )
}

export const TextWeights: TextStory = {
  render: () => (
    <div>
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  )
}

export const TextStates: TextStory = {
  render: () => (
    <div>
      <Text>Regular text paragraph</Text>
      <Text muted>Muted text - less important information</Text>
      <Text color="#007bff">Custom colored text</Text>
      <Text center>Centered text paragraph</Text>
    </div>
  )
}

export const TypographyShowcase: TextStory = {
  render: () => (
    <div class="max-w-600 mx-auto" style="max-width: 600px; margin: 0 auto;">
      <Heading level={1} center>Welcome to NanoLux</Heading>
      <Text size="lg" center muted>
        Ultra-minimalistyczny framework komponentów dla Preact
      </Text>
      
      <Heading level={2}>Features</Heading>
      <Text>
        NanoLux to nowoczesny framework zaprojektowany z myślą o wydajności i prostocie. 
        Każdy komponent został zoptymalizowany pod kątem minimalnego rozmiaru bundla.
      </Text>
      
      <Heading level={3}>Performance First</Heading>
      <Text>
        Bundly mniejsze niż 1KB per komponent, automatyczny tree-shaking, 
        zero runtime overhead dla stylów.
      </Text>
      
      <Heading level={3}>Developer Experience</Heading>
      <Text>
        TypeScript first, Storybook integration, atomowe klasy CSS, 
        automatyczne testy i dokumentacja.
      </Text>
      
      <Text size="sm" muted center>
        Built with ❤️ for modern web development
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Kompletny przykład systemu typografii w akcji'
      }
    }
  }
}
