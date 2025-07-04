import type { Meta, StoryObj } from '@storybook/preact'
import Stack from './Stack'

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    docs: {
      description: {
        component: 'Stack - prosty layout komponent do układania elementów w pionie lub poziomie z równomiernym spacingiem.'
      }
    }
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal']
    },
    spacing: {
      control: { type: 'select' },
      options: [4, 8, 12, 16, 20, 24]
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch']
    }
  }
}

export default meta
type Story = StoryObj<typeof Stack>

const SampleCard = ({ children, color = '#f8f9fa' }: { children: any; color?: string }) => (
  <div style={`background: ${color}; padding: 16px; border-radius: 6px; border: 1px solid #e0e0e0;`}>
    {children}
  </div>
)

export const VerticalDefault: Story = {
  args: {
    direction: 'vertical',
    spacing: 12
  },
  render: (args) => (
    <Stack {...args}>
      <SampleCard>First item</SampleCard>
      <SampleCard>Second item with more content that wraps to multiple lines</SampleCard>
      <SampleCard>Third item</SampleCard>
    </Stack>
  )
}

export const HorizontalStack: Story = {
  args: {
    direction: 'horizontal',
    spacing: 16
  },
  render: (args) => (
    <Stack {...args}>
      <SampleCard color="#e3f2fd">Card A</SampleCard>
      <SampleCard color="#f3e5f5">Card B</SampleCard>
      <SampleCard color="#e8f5e8">Card C</SampleCard>
    </Stack>
  )
}

export const AllSpacings: Story = {
  render: () => (
    <Stack spacing={20}>
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">Spacing 4px:</h4>
        <Stack spacing={4}>
          <SampleCard>Item 1</SampleCard>
          <SampleCard>Item 2</SampleCard>
          <SampleCard>Item 3</SampleCard>
        </Stack>
      </div>
      
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">Spacing 12px:</h4>
        <Stack spacing={12}>
          <SampleCard>Item 1</SampleCard>
          <SampleCard>Item 2</SampleCard>
          <SampleCard>Item 3</SampleCard>
        </Stack>
      </div>
      
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">Spacing 24px:</h4>
        <Stack spacing={24}>
          <SampleCard>Item 1</SampleCard>
          <SampleCard>Item 2</SampleCard>
          <SampleCard>Item 3</SampleCard>
        </Stack>
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Porównanie różnych spacingów w Stack'
      }
    }
  }
}

export const Alignment: Story = {
  render: () => (
    <Stack spacing={16}>
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">Align Start:</h4>
        <Stack direction="horizontal" align="start" spacing={12} style="height: 80px; background: #f8f9fa; padding: 8px;">
          <SampleCard>Short</SampleCard>
          <SampleCard>Tall content with multiple lines</SampleCard>
          <SampleCard>Medium</SampleCard>
        </Stack>
      </div>
      
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">Align Center:</h4>
        <Stack direction="horizontal" align="center" spacing={12} style="height: 80px; background: #f8f9fa; padding: 8px;">
          <SampleCard>Short</SampleCard>
          <SampleCard>Tall content with multiple lines</SampleCard>
          <SampleCard>Medium</SampleCard>
        </Stack>
      </div>
      
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">Align Stretch:</h4>
        <Stack direction="horizontal" align="stretch" spacing={12} style="height: 80px; background: #f8f9fa; padding: 8px;">
          <SampleCard>Short</SampleCard>
          <SampleCard>Tall content with multiple lines</SampleCard>
          <SampleCard>Medium</SampleCard>
        </Stack>
      </div>
    </Stack>
  )
}

export const FormLayout: Story = {
  render: () => (
    <Stack spacing={16} style="max-width: 300px;">
      <div>
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Name</label>
        <input style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter name" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Email</label>
        <input type="email" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter email" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Message</label>
        <textarea style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; height: 80px;" placeholder="Enter message"></textarea>
      </div>
      <button style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Submit
      </button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Praktyczny przykład - formularz z użyciem Stack'
      }
    }
  }
}
