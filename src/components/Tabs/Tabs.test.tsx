import { render, screen, fireEvent } from '@testing-library/preact'
import { expect, test, describe, vi } from 'vitest'
import { Tabs, TabList, Tab, TabPanel } from './Tabs'

describe('Tabs Component', () => {
  const TabsExample = ({ defaultValue = 'tab1', onChange }: { defaultValue?: string, onChange?: (value: string) => void }) => (
    <Tabs defaultValue={defaultValue} onChange={onChange}>
      <TabList>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3" disabled>Tab 3</Tab>
      </TabList>
      <TabPanel value="tab1">Content 1</TabPanel>
      <TabPanel value="tab2">Content 2</TabPanel>
      <TabPanel value="tab3">Content 3</TabPanel>
    </Tabs>
  )

  test('renders tabs and panels correctly', () => {
    render(<TabsExample />)
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  test('shows default active tab', () => {
    render(<TabsExample defaultValue="tab2" />)
    
    const tab2 = screen.getByText('Tab 2')
    expect(tab2).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  test('switches tabs on click', () => {
    render(<TabsExample />)
    
    const tab2 = screen.getByText('Tab 2')
    fireEvent.click(tab2)
    
    expect(tab2).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
  })

  test('calls onChange when tab is clicked', () => {
    const onChange = vi.fn()
    render(<TabsExample onChange={onChange} />)
    
    const tab2 = screen.getByText('Tab 2')
    fireEvent.click(tab2)
    
    expect(onChange).toHaveBeenCalledWith('tab2')
  })

  test('does not switch to disabled tab', () => {
    render(<TabsExample />)
    
    const tab3 = screen.getByText('Tab 3')
    const tab1 = screen.getByText('Tab 1')
    
    expect(tab3).toHaveAttribute('aria-disabled', 'true')
    expect(tab1).toHaveAttribute('aria-selected', 'true')
    
    fireEvent.click(tab3)
    
    // Should still be on tab 1
    expect(tab1).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  test('supports keyboard navigation', () => {
    render(<TabsExample />)
    
    const tab1 = screen.getByText('Tab 1')
    
    fireEvent.keyDown(tab1, { key: 'Enter' })
    expect(tab1).toHaveAttribute('aria-selected', 'true')
    
    fireEvent.keyDown(tab1, { key: ' ' })
    expect(tab1).toHaveAttribute('aria-selected', 'true')
  })

  test('applies correct variant classes', () => {
    render(
      <Tabs defaultValue="tab1" variant="pills">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
      </Tabs>
    )
    
    const tabsContainer = screen.getByText('Tab 1').closest('.tabs')
    expect(tabsContainer).toHaveClass('tabs-pills')
  })

  test('applies correct size classes', () => {
    render(
      <Tabs defaultValue="tab1" size="lg">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
      </Tabs>
    )
    
    const tabsContainer = screen.getByText('Tab 1').closest('.tabs')
    expect(tabsContainer).toHaveClass('tabs-lg')
  })

  test('applies correct orientation classes', () => {
    render(
      <Tabs defaultValue="tab1" orientation="vertical">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
      </Tabs>
    )
    
    const tabsContainer = screen.getByText('Tab 1').closest('.tabs')
    expect(tabsContainer).toHaveClass('tabs-vertical')
  })
})
