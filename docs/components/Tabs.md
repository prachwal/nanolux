# Tabs Component

Tabs component for organizing content into multiple panels that users can switch between.

## Overview

The Tabs component provides a way to organize content into multiple sections with tab navigation. It supports different variants, orientations, and both controlled and uncontrolled usage patterns.

## Basic Usage

```tsx
import { Tabs, TabList, Tab, TabPanel } from '@/components/Tabs/Tabs'

<Tabs defaultValue="tab1">
  <TabList>
    <Tab value="tab1">Tab 1</Tab>
    <Tab value="tab2">Tab 2</Tab>
    <Tab value="tab3">Tab 3</Tab>
  </TabList>
  
  <TabPanel value="tab1">
    <p>Content for Tab 1</p>
  </TabPanel>
  
  <TabPanel value="tab2">
    <p>Content for Tab 2</p>
  </TabPanel>
  
  <TabPanel value="tab3">
    <p>Content for Tab 3</p>
  </TabPanel>
</Tabs>
```

## Variants

### Default
```tsx
<Tabs variant="default" defaultValue="home">
  <TabList>
    <Tab value="home">Home</Tab>
    <Tab value="about">About</Tab>
    <Tab value="contact">Contact</Tab>
  </TabList>
  {/* Tab panels */}
</Tabs>
```

### Pills
```tsx
<Tabs variant="pills" defaultValue="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="details">Details</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>
  {/* Tab panels */}
</Tabs>
```

### Underline
```tsx
<Tabs variant="underline" defaultValue="dashboard">
  <TabList>
    <Tab value="dashboard">Dashboard</Tab>
    <Tab value="analytics">Analytics</Tab>
    <Tab value="reports">Reports</Tab>
  </TabList>
  {/* Tab panels */}
</Tabs>
```

## Sizes

```tsx
<Tabs size="sm" defaultValue="small">
  <TabList>
    <Tab value="small">Small</Tab>
    <Tab value="tabs">Tabs</Tab>
  </TabList>
  {/* Tab panels */}
</Tabs>

<Tabs size="lg" defaultValue="large">
  <TabList>
    <Tab value="large">Large</Tab>
    <Tab value="tabs">Tabs</Tab>
  </TabList>
  {/* Tab panels */}
</Tabs>
```

## Orientation

### Horizontal (Default)
```tsx
<Tabs orientation="horizontal" defaultValue="first">
  <TabList>
    <Tab value="first">First</Tab>
    <Tab value="second">Second</Tab>
  </TabList>
  {/* Tab panels */}
</Tabs>
```

### Vertical
```tsx
<Tabs orientation="vertical" defaultValue="profile">
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="account">Account</Tab>
    <Tab value="security">Security</Tab>
  </TabList>
  {/* Tab panels */}
</Tabs>
```

## Features

### Controlled Tabs
```tsx
function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <TabList>
        <Tab value="general">General</Tab>
        <Tab value="advanced">Advanced</Tab>
      </TabList>
      
      <TabPanel value="general">
        General settings content
      </TabPanel>
      
      <TabPanel value="advanced">
        Advanced settings content
      </TabPanel>
    </Tabs>
  )
}
```

### Disabled Tabs
```tsx
<Tabs defaultValue="available">
  <TabList>
    <Tab value="available">Available</Tab>
    <Tab value="disabled" disabled>Disabled</Tab>
    <Tab value="another">Another</Tab>
  </TabList>
  {/* Tab panels */}
</Tabs>
```

### Dynamic Tabs
```tsx
function DynamicTabs() {
  const [tabs, setTabs] = useState([
    { id: '1', label: 'Tab 1', content: 'Content 1' },
    { id: '2', label: 'Tab 2', content: 'Content 2' }
  ])

  return (
    <Tabs defaultValue="1">
      <TabList>
        {tabs.map(tab => (
          <Tab key={tab.id} value={tab.id}>{tab.label}</Tab>
        ))}
      </TabList>
      
      {tabs.map(tab => (
        <TabPanel key={tab.id} value={tab.id}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  )
}
```

## Common Patterns

### Settings Panel
```tsx
<Tabs defaultValue="profile" variant="pills">
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="account">Account</Tab>
    <Tab value="security">Security</Tab>
    <Tab value="notifications">Notifications</Tab>
  </TabList>
  
  <TabPanel value="profile">
    <h3>Profile Settings</h3>
    {/* Profile form */}
  </TabPanel>
  
  <TabPanel value="account">
    <h3>Account Settings</h3>
    {/* Account form */}
  </TabPanel>
  
  <TabPanel value="security">
    <h3>Security Settings</h3>
    {/* Security form */}
  </TabPanel>
  
  <TabPanel value="notifications">
    <h3>Notification Settings</h3>
    {/* Notification form */}
  </TabPanel>
</Tabs>
```

### Data Dashboard
```tsx
<Tabs defaultValue="overview" variant="underline">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="analytics">Analytics</Tab>
    <Tab value="reports">Reports</Tab>
    <Tab value="exports">Exports</Tab>
  </TabList>
  
  <TabPanel value="overview">
    {/* Dashboard overview */}
  </TabPanel>
  
  <TabPanel value="analytics">
    {/* Analytics charts */}
  </TabPanel>
  
  <TabPanel value="reports">
    {/* Reports table */}
  </TabPanel>
  
  <TabPanel value="exports">
    {/* Export options */}
  </TabPanel>
</Tabs>
```

## Best Practices

1. **Use clear labels**: Tab labels should be concise and descriptive
2. **Limit tab count**: Avoid having too many tabs (5-7 maximum recommended)
3. **Maintain consistency**: Use the same variant and size throughout your app
4. **Consider mobile**: Vertical tabs may work better on smaller screens
5. **Provide feedback**: Show loading states or empty states in tab panels when appropriate

## Accessibility

- **Keyboard Navigation**: Full arrow key navigation between tabs
- **ARIA Support**: Proper ARIA roles and properties for screen readers
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader Support**: Tab labels and content are properly announced

## Related Components

- [Button](./Button.md) - For tab-like button groups
- [Navigation](./Navigation.md) - For page-level navigation
- [Accordion](./Accordion.md) - Alternative for vertical content organization

## API Reference

See [Tabs API](../api/Tabs.md) for detailed prop documentation.
