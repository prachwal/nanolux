# Tabs API Reference

Tabs component for organizing content into multiple panels that users can switch between.

## Components

The Tabs system consists of four main components:

### Tabs (Container)
Main container component that manages tab state and provides context.

### TabList
Container for the tab buttons/triggers.

### Tab
Individual tab button/trigger.

### TabPanel
Content panel associated with a tab.

## Tabs Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | `undefined` | Default active tab (uncontrolled) |
| `value` | `string` | `undefined` | Current active tab (controlled) |
| `onChange` | `(value: string) => void` | `undefined` | Callback when active tab changes |
| `variant` | `'default' \| 'pills' \| 'underline'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the tabs |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation |
| `children` | `ComponentChildren` | **required** | TabList and TabPanel components |
| `className` | `string` | `''` | Additional CSS classes |

## TabList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ComponentChildren` | **required** | Tab components |
| `className` | `string` | `''` | Additional CSS classes |

## Tab Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Unique identifier for the tab |
| `disabled` | `boolean` | `false` | Whether the tab is disabled |
| `children` | `ComponentChildren` | **required** | Tab label content |
| `className` | `string` | `''` | Additional CSS classes |

## TabPanel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Identifier matching the associated tab |
| `children` | `ComponentChildren` | **required** | Panel content |
| `className` | `string` | `''` | Additional CSS classes |

## CSS Classes

### Tabs Container
- `.tabs` - Base tabs container
- `.tabs--horizontal` - Horizontal orientation
- `.tabs--vertical` - Vertical orientation

### TabList
- `.tabs__list` - Tab list container
- `.tabs__list--default` - Default variant styling
- `.tabs__list--pills` - Pills variant styling
- `.tabs__list--underline` - Underline variant styling
- `.tabs__list--sm` - Small size
- `.tabs__list--md` - Medium size
- `.tabs__list--lg` - Large size

### Tab
- `.tabs__tab` - Individual tab styling
- `.tabs__tab--active` - Active tab state
- `.tabs__tab--disabled` - Disabled tab state

### TabPanel
- `.tabs__panel` - Tab panel container
- `.tabs__panel--active` - Active panel state

## Examples

### Basic Usage
```tsx
<Tabs defaultValue="home">
  <TabList>
    <Tab value="home">Home</Tab>
    <Tab value="about">About</Tab>
  </TabList>
  
  <TabPanel value="home">
    Home content
  </TabPanel>
  
  <TabPanel value="about">
    About content
  </TabPanel>
</Tabs>
```

### Controlled Tabs
```tsx
const [activeTab, setActiveTab] = useState('profile')

<Tabs value={activeTab} onChange={setActiveTab}>
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>
  
  <TabPanel value="profile">
    Profile content
  </TabPanel>
  
  <TabPanel value="settings">
    Settings content
  </TabPanel>
</Tabs>
```

### Different Variants
```tsx
// Pills variant
<Tabs variant="pills" defaultValue="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="details">Details</Tab>
  </TabList>
  {/* Panels */}
</Tabs>

// Underline variant
<Tabs variant="underline" defaultValue="stats">
  <TabList>
    <Tab value="stats">Statistics</Tab>
    <Tab value="reports">Reports</Tab>
  </TabList>
  {/* Panels */}
</Tabs>
```

### Vertical Orientation
```tsx
<Tabs orientation="vertical" defaultValue="general">
  <TabList>
    <Tab value="general">General</Tab>
    <Tab value="advanced">Advanced</Tab>
    <Tab value="security">Security</Tab>
  </TabList>
  
  <TabPanel value="general">
    General settings
  </TabPanel>
  
  <TabPanel value="advanced">
    Advanced settings
  </TabPanel>
  
  <TabPanel value="security">
    Security settings
  </TabPanel>
</Tabs>
```

### With Disabled Tab
```tsx
<Tabs defaultValue="available">
  <TabList>
    <Tab value="available">Available</Tab>
    <Tab value="disabled" disabled>Disabled</Tab>
    <Tab value="another">Another</Tab>
  </TabList>
  {/* Panels */}
</Tabs>
```

## Accessibility

- **ARIA Roles**: Uses `tablist`, `tab`, and `tabpanel` roles
- **Keyboard Navigation**: 
  - Arrow keys to navigate between tabs
  - Space/Enter to activate tabs
  - Home/End to jump to first/last tab
- **Focus Management**: Proper focus indicators and roving tabindex
- **Screen Reader Support**: Proper labeling and state announcements

## State Management

- **Uncontrolled**: Use `defaultValue` for simple use cases
- **Controlled**: Use `value` and `onChange` for complex state management
- **Mixed**: Can combine both for default state with external control

## Styling Notes

- Use CSS custom properties for theming
- Each variant has distinct visual styling
- Responsive design considerations for mobile devices
- Smooth animations for tab transitions
