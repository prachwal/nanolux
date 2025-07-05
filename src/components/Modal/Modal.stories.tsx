import Modal from './Modal'
import { expect } from '@storybook/test'
import { within } from '@storybook/testing-library'

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: 'Modal/Dialog component z pełną dostępnością i keyboard navigation'
      }
    }
  },
  argTypes: {
    open: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    showClose: { control: 'boolean' }
  }
}

export const Default = {
  args: {
    open: true,
    title: 'Modal Title',
    children: 'This is modal content. You can put any content here.'
  }
}

export const AllSizes = {
  render: () => (
    <div class="flex gap-12 flex-wrap">
      <Modal open={true} size="sm" title="Small Modal">
        <p>Small modal content</p>
      </Modal>
      <Modal open={true} size="md" title="Medium Modal">
        <p>Medium modal content</p>
      </Modal>
      <Modal open={true} size="lg" title="Large Modal">
        <p>Large modal content</p>
      </Modal>
      <Modal open={true} size="xl" title="Extra Large Modal">
        <p>Extra large modal content</p>
      </Modal>
    </div>
  )
}

export const WithoutTitle = {
  args: {
    open: true,
    children: (
      <div>
        <h3>Custom Header</h3>
        <p>Modal without default title, using custom content.</p>
      </div>
    )
  }
}

export const NonDismissible = {
  args: {
    open: true,
    dismissible: false,
    title: 'Important Modal',
    children: 'This modal can only be closed with the close button.',
    showClose: true
  }
}

export const CustomWidth = {
  args: {
    open: true,
    width: '300px',
    title: 'Custom Width',
    children: 'This modal has a custom width of 300px.'
  }
}

export const LongContent = {
  args: {
    open: true,
    title: 'Modal with Long Content',
    children: (
      <div>
        <p>This modal contains a lot of content to demonstrate scrolling.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    )
  }
}

// Interactive test
export const InteractiveTest = {
  args: {
    open: true,
    title: 'Test Modal',
    children: 'Test modal content',
    dismissible: true,
    showClose: true
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: modal is visible
    const modal = canvas.getByRole('dialog')
    await expect(modal).toBeInTheDocument()
    
    // Test: title is displayed
    const title = canvas.getByText('Test Modal')
    await expect(title).toBeInTheDocument()
    
    // Test: close button is present
    const closeButton = canvas.getByLabelText('Zamknij modal')
    await expect(closeButton).toBeInTheDocument()
    
    // Test: modal has correct classes
    await expect(modal).toHaveClass('modal', 'modal-md')
    
    // Test: content is displayed
    const content = canvas.getByText('Test modal content')
    await expect(content).toBeInTheDocument()
  }
}
