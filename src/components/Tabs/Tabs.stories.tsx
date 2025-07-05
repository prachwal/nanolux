import { Tabs, TabList, Tab, TabPanel } from './Tabs'
import { expect } from '@storybook/test'
import { within, userEvent } from '@storybook/testing-library'

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: 'Tabs component z różnymi wariantami i orientacją'
      }
    }
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'pills', 'underline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] }
  }
}

export const Default = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </TabList>
      <TabPanel value="tab1">
        <h3>Content for Tab 1</h3>
        <p>This is the content of the first tab.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <h3>Content for Tab 2</h3>
        <p>This is the content of the second tab.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <h3>Content for Tab 3</h3>
        <p>This is the content of the third tab.</p>
      </TabPanel>
    </Tabs>
  )
}

export const AllVariants = {
  render: () => (
    <div class="flex flex-col gap-24">
      <div>
        <h3 class="mb-12">Default</h3>
        <Tabs defaultValue="tab1" variant="default">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Default variant content 1</TabPanel>
          <TabPanel value="tab2">Default variant content 2</TabPanel>
          <TabPanel value="tab3">Default variant content 3</TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 class="mb-12">Pills</h3>
        <Tabs defaultValue="tab1" variant="pills">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Pills variant content 1</TabPanel>
          <TabPanel value="tab2">Pills variant content 2</TabPanel>
          <TabPanel value="tab3">Pills variant content 3</TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 class="mb-12">Underline</h3>
        <Tabs defaultValue="tab1" variant="underline">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Underline variant content 1</TabPanel>
          <TabPanel value="tab2">Underline variant content 2</TabPanel>
          <TabPanel value="tab3">Underline variant content 3</TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export const AllSizes = {
  render: () => (
    <div class="flex flex-col gap-24">
      <div>
        <h3 class="mb-12">Small</h3>
        <Tabs defaultValue="tab1" size="sm">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Small size content 1</TabPanel>
          <TabPanel value="tab2">Small size content 2</TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 class="mb-12">Medium</h3>
        <Tabs defaultValue="tab1" size="md">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Medium size content 1</TabPanel>
          <TabPanel value="tab2">Medium size content 2</TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 class="mb-12">Large</h3>
        <Tabs defaultValue="tab1" size="lg">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Large size content 1</TabPanel>
          <TabPanel value="tab2">Large size content 2</TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export const Vertical = {
  render: () => (
    <Tabs defaultValue="tab1" orientation="vertical" variant="pills">
      <TabList>
        <Tab value="tab1">Dashboard</Tab>
        <Tab value="tab2">Settings</Tab>
        <Tab value="tab3">Profile</Tab>
        <Tab value="tab4" disabled>Disabled</Tab>
      </TabList>
      <TabPanel value="tab1">
        <h3>Dashboard</h3>
        <p>Welcome to your dashboard. Here you can see an overview of your data.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <h3>Settings</h3>
        <p>Configure your application settings here.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <h3>Profile</h3>
        <p>Manage your profile information and preferences.</p>
      </TabPanel>
      <TabPanel value="tab4">
        <h3>Disabled Tab</h3>
        <p>This content won't be shown because the tab is disabled.</p>
      </TabPanel>
    </Tabs>
  )
}

export const WithDisabledTab = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">Active Tab</Tab>
        <Tab value="tab2" disabled>Disabled Tab</Tab>
        <Tab value="tab3">Another Tab</Tab>
      </TabList>
      <TabPanel value="tab1">
        <p>This is an active tab that can be clicked.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <p>This content won't be accessible because the tab is disabled.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <p>This is another active tab.</p>
      </TabPanel>
    </Tabs>
  )
}

export const LongContent = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="details">Details</Tab>
        <Tab value="documentation">Documentation</Tab>
      </TabList>
      <TabPanel value="overview">
        <h3>Project Overview</h3>
        <p>This is a comprehensive overview of the project with detailed information.</p>
        <ul class="mt-12 ml-16">
          <li>Feature 1: Complete implementation</li>
          <li>Feature 2: In progress</li>
          <li>Feature 3: Planned</li>
        </ul>
      </TabPanel>
      <TabPanel value="details">
        <h3>Technical Details</h3>
        <p>Here are the technical specifications and implementation details.</p>
        <div class="mt-12 p-12 bg-gray-100 rounded">
          <pre>const config = {`{
  framework: 'preact',
  bundler: 'vite',
  testing: 'vitest'
}`}</pre>
        </div>
      </TabPanel>
      <TabPanel value="documentation">
        <h3>Documentation</h3>
        <p>Complete documentation for this component and its usage.</p>
        <p class="mt-8">Refer to the API documentation for more details on props and customization options.</p>
      </TabPanel>
    </Tabs>
  )
}

// Interactive test
export const InteractiveTest = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2">Second Tab</Tab>
      </TabList>
      <TabPanel value="tab1">Content 1</TabPanel>
      <TabPanel value="tab2">Content 2</TabPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Test: tabs are present
    const firstTab = canvas.getByText('First Tab')
    const secondTab = canvas.getByText('Second Tab')
    await expect(firstTab).toBeInTheDocument()
    await expect(secondTab).toBeInTheDocument()
    
    // Test: first tab is active by default
    await expect(firstTab).toHaveAttribute('aria-selected', 'true')
    await expect(secondTab).toHaveAttribute('aria-selected', 'false')
    
    // Test: first content is visible
    await expect(canvas.getByText('Content 1')).toBeInTheDocument()
    
    // Test: clicking second tab switches content
    await userEvent.click(secondTab)
    await expect(canvas.getByText('Content 2')).toBeInTheDocument()
  }
}
