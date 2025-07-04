import type { Meta, StoryObj } from '@storybook/preact'
import Flex from './Flex'

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    docs: {
      description: {
        component: 'Uniwersalny Flex container używający atomic CSS classes. Zero overhead - tylko kombinuje istniejące klasy.'
      }
    }
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'column']
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch']
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around']
    },
    gap: {
      control: { type: 'select' },
      options: [4, 8, 12, 16, 20, 24]
    }
  }
}

export default meta
type Story = StoryObj<typeof Flex>

const SampleBox = ({ children, color = '#007bff' }: { children: any; color?: string }) => (
  <div style={`background: ${color}; color: white; padding: 12px; border-radius: 4px; min-width: 60px; text-align: center;`}>
    {children}
  </div>
)

export const HorizontalDefault: Story = {
  args: {
    direction: 'row',
    gap: 12
  },
  render: (args) => (
    <Flex {...args}>
      <SampleBox>1</SampleBox>
      <SampleBox>2</SampleBox>
      <SampleBox>3</SampleBox>
    </Flex>
  )
}

export const VerticalStack: Story = {
  args: {
    direction: 'column',
    gap: 8
  },
  render: (args) => (
    <Flex {...args}>
      <SampleBox>Item A</SampleBox>
      <SampleBox>Item B</SampleBox>
      <SampleBox>Item C</SampleBox>
    </Flex>
  )
}

export const CenteredContent: Story = {
  render: () => (
    <div style="height: 200px; border: 2px dashed #ccc;">
      <Flex direction="row" align="center" justify="center" style="height: 100%;">
        <SampleBox>Centered</SampleBox>
      </Flex>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Centrowanie contentu - bardzo częsty pattern'
      }
    }
  }
}

export const SpaceBetween: Story = {
  render: () => (
    <Flex direction="row" justify="between" align="center">
      <SampleBox>Left</SampleBox>
      <SampleBox color="#28a745">Center</SampleBox>
      <SampleBox color="#dc3545">Right</SampleBox>
    </Flex>
  )
}

export const AllGaps: Story = {
  render: () => (
    <Flex direction="column" gap={16}>
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">Gap 4px:</h4>
        <Flex gap={4}>
          <SampleBox>1</SampleBox>
          <SampleBox>2</SampleBox>
          <SampleBox>3</SampleBox>
        </Flex>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">Gap 12px:</h4>
        <Flex gap={12}>
          <SampleBox>1</SampleBox>
          <SampleBox>2</SampleBox>
          <SampleBox>3</SampleBox>
        </Flex>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">Gap 24px:</h4>
        <Flex gap={24}>
          <SampleBox>1</SampleBox>
          <SampleBox>2</SampleBox>
          <SampleBox>3</SampleBox>
        </Flex>
      </div>
    </Flex>
  )
}

export const ResponsiveWrap: Story = {
  render: () => (
    <Flex wrap gap={12}>
      <SampleBox>Item 1</SampleBox>
      <SampleBox>Item 2</SampleBox>
      <SampleBox>Item 3</SampleBox>
      <SampleBox>Item 4</SampleBox>
      <SampleBox>Item 5</SampleBox>
      <SampleBox>Item 6</SampleBox>
      <SampleBox>Item 7</SampleBox>
      <SampleBox>Item 8</SampleBox>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Flex wrap - elementy zawijają się automatycznie'
      }
    }
  }
}
