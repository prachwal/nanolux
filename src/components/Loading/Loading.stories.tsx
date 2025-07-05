import Loading from './Loading'
import Button from '../Button'
import Card from '../Card'
import { expect } from '@storybook/test'
import { within } from '@storybook/testing-library'

export default {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    docs: {
      description: {
        component: 'Loading/Spinner component z różnymi wariantami animacji'
      }
    }
  },
  argTypes: {
    variant: { control: 'select', options: ['spinner', 'dots', 'pulse', 'bars'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    textPosition: { control: 'select', options: ['bottom', 'right'] },
    overlay: { control: 'boolean' },
    loading: { control: 'boolean' }
  }
}

export const Default = {
  args: {
    variant: 'spinner',
    size: 'md'
  }
}

export const AllVariants = {
  render: () => (
    <div class="flex gap-16 items-center flex-wrap">
      <div class="text-center">
        <Loading variant="spinner" size="lg" />
        <p class="mt-8 text-sm">Spinner</p>
      </div>
      <div class="text-center">
        <Loading variant="dots" size="lg" />
        <p class="mt-8 text-sm">Dots</p>
      </div>
      <div class="text-center">
        <Loading variant="pulse" size="lg" />
        <p class="mt-8 text-sm">Pulse</p>
      </div>
      <div class="text-center">
        <Loading variant="bars" size="lg" />
        <p class="mt-8 text-sm">Bars</p>
      </div>
    </div>
  )
}

export const AllSizes = {
  render: () => (
    <div class="flex gap-16 items-center flex-wrap">
      <div class="text-center">
        <Loading variant="spinner" size="sm" />
        <p class="mt-8 text-sm">Small</p>
      </div>
      <div class="text-center">
        <Loading variant="spinner" size="md" />
        <p class="mt-8 text-sm">Medium</p>
      </div>
      <div class="text-center">
        <Loading variant="spinner" size="lg" />
        <p class="mt-8 text-sm">Large</p>
      </div>
      <div class="text-center">
        <Loading variant="spinner" size="xl" />
        <p class="mt-8 text-sm">Extra Large</p>
      </div>
    </div>
  )
}

export const WithText = {
  render: () => (
    <div class="flex gap-16 flex-wrap">
      <Loading variant="spinner" text="Loading..." textPosition="bottom" />
      <Loading variant="dots" text="Processing..." textPosition="right" />
      <Loading variant="pulse" text="Please wait..." textPosition="bottom" />
    </div>
  )
}

export const CustomColors = {
  render: () => (
    <div class="flex gap-16 items-center flex-wrap">
      <Loading variant="spinner" color="#ef4444" size="lg" />
      <Loading variant="dots" color="#10b981" size="lg" />
      <Loading variant="pulse" color="#8b5cf6" size="lg" />
      <Loading variant="bars" color="#f59e0b" size="lg" />
    </div>
  )
}

export const WithOverlay = {
  render: () => (
    <Loading overlay loading={true}>
      <Card className="p-24">
        <h3>Content with Loading Overlay</h3>
        <p>This content is blurred when loading is active.</p>
        <Button>Some Button</Button>
      </Card>
    </Loading>
  )
}

export const ConditionalLoading = {
  args: {
    loading: false,
    variant: 'spinner',
    text: 'This loader is hidden'
  }
}

export const LoadingButton = {
  render: () => (
    <div class="flex gap-12 items-center flex-wrap">
      <Button disabled class="flex items-center gap-8">
        <Loading variant="spinner" size="sm" />
        Loading...
      </Button>
      <Button disabled class="flex items-center gap-8">
        <Loading variant="dots" size="sm" />
        Processing...
      </Button>
    </div>
  )
}

// Interactive test
export const InteractiveTest = {
  args: {
    variant: 'spinner',
    size: 'md',
    text: 'Test loading'
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: loading indicator is visible
    const loader = canvas.getByRole('status')
    await expect(loader).toBeInTheDocument()
    
    // Test: has correct variant class
    await expect(loader).toHaveClass('loading-spinner')
    
    // Test: has correct size class
    await expect(loader).toHaveClass('loading-md')
    
    // Test: text is displayed
    const text = canvas.getByText('Test loading')
    await expect(text).toBeInTheDocument()
  }
}
