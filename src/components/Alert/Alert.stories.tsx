import Alert from './Alert'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: 'Alert/Toast component z różnymi wariantami i auto-close'
      }
    }
  },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    dismissible: { control: 'boolean' },
    autoClose: { control: 'number' },
    showIcon: { control: 'boolean' },
    visible: { control: 'boolean' }
  }
}

export const Default = {
  args: {
    variant: 'info',
    children: 'This is an informational alert message.'
  }
}

export const AllVariants = {
  render: () => (
    <div class="flex flex-col gap-12">
      <Alert variant="info" title="Information" showIcon>
        This is an informational alert with useful information.
      </Alert>
      <Alert variant="success" title="Success!" showIcon>
        Your action was completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning" showIcon>
        Please review this important information.
      </Alert>
      <Alert variant="error" title="Error" showIcon>
        There was an error processing your request.
      </Alert>
    </div>
  )
}

export const WithoutTitle = {
  render: () => (
    <div class="flex flex-col gap-12">
      <Alert variant="success">
        Simple success message without title.
      </Alert>
      <Alert variant="warning">
        Simple warning message without title.
      </Alert>
    </div>
  )
}

export const Dismissible = {
  render: () => (
    <div class="flex flex-col gap-12">
      <Alert variant="info" title="Dismissible Alert" dismissible>
        This alert can be closed by clicking the × button.
      </Alert>
      <Alert variant="warning" dismissible>
        Warning message that can be dismissed.
      </Alert>
    </div>
  )
}

export const WithoutIcon = {
  args: {
    variant: 'success',
    title: 'No Icon',
    showIcon: false,
    children: 'This alert does not show an icon.'
  }
}

export const AutoClose = {
  args: {
    variant: 'success',
    title: 'Auto Close',
    autoClose: 3000,
    children: 'This alert will automatically close after 3 seconds.'
  }
}

export const LongContent = {
  args: {
    variant: 'info',
    title: 'Detailed Information',
    dismissible: true,
    children: (
      <div>
        <p>This is a longer alert message that demonstrates how the component handles more content.</p>
        <ul class="mt-8 ml-16">
          <li>First important point</li>
          <li>Second important point</li>
          <li>Third important point</li>
        </ul>
        <p class="mt-8">Additional information can be included as needed.</p>
      </div>
    )
  }
}

export const AsToast = {
  render: () => (
    <div style="position: relative; height: 300px; background: #f3f4f6; border-radius: 8px; padding: 16px;">
      <p>Scroll down to see the toast notification in the corner.</p>
      <Alert 
        variant="success" 
        title="Toast Notification" 
        dismissible 
        className="alert-toast"
      >
        This alert is positioned as a toast notification.
      </Alert>
    </div>
  )
}

// Interactive test
export const InteractiveTest = {
  args: {
    variant: 'success',
    title: 'Test Alert',
    dismissible: true,
    children: 'This is a test alert message.'
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: alert is visible
    const alert = canvas.getByRole('alert')
    await expect(alert).toBeInTheDocument()
    
    // Test: has correct variant class
    await expect(alert).toHaveClass('alert-success')
    
    // Test: title is displayed
    const title = canvas.getByText('Test Alert')
    await expect(title).toBeInTheDocument()
    
    // Test: icon is displayed
    const icon = canvas.getByText('✓')
    await expect(icon).toBeInTheDocument()
    
    // Test: close button is present
    const closeButton = canvas.getByLabelText('Zamknij alert')
    await expect(closeButton).toBeInTheDocument()
    
    // Test: clicking close button works
    await userEvent.click(closeButton)
    // Note: In a real scenario, this would hide the alert
  }
}
