import { ComponentChildren } from 'preact'
import { useState, useContext } from 'preact/hooks'
import { createContext } from 'preact'
import './Tabs.css'

interface TabsProps {
  /** Domyślnie aktywna zakładka */
  defaultValue?: string
  /** Kontrolowana wartość */
  value?: string
  /** Callback zmiany zakładki */
  onChange?: (value: string) => void
  /** Wariant zakładek */
  variant?: 'default' | 'pills' | 'underline'
  /** Rozmiar zakładek */
  size?: 'sm' | 'md' | 'lg'
  /** Orientacja */
  orientation?: 'horizontal' | 'vertical'
  /** Zawartość zakładek */
  children: ComponentChildren
  /** Custom klasy CSS */
  className?: string
}

interface TabListProps {
  children: ComponentChildren
  className?: string
}

interface TabProps {
  /** Wartość zakładki */
  value: string
  /** Czy zakładka jest disabled */
  disabled?: boolean
  /** Zawartość zakładki */
  children: ComponentChildren
  /** Custom klasy CSS */
  className?: string
}

interface TabPanelProps {
  /** Wartość odpowiadającej zakładki */
  value: string
  /** Zawartość panelu */
  children: ComponentChildren
  /** Custom klasy CSS */
  className?: string
}

// Context for tabs
const TabsContext = createContext<{
  activeTab: string
  setActiveTab: (value: string) => void
  variant: string
  size: string
  orientation: string
}>({
  activeTab: '',
  setActiveTab: () => {},
  variant: 'default',
  size: 'md',
  orientation: 'horizontal'
})

/**
 * Tabs - główny kontener dla zakładek
 * @example
 * <Tabs defaultValue="tab1">
 *   <TabList>
 *     <Tab value="tab1">Tab 1</Tab>
 *     <Tab value="tab2">Tab 2</Tab>
 *   </TabList>
 *   <TabPanel value="tab1">Content 1</TabPanel>
 *   <TabPanel value="tab2">Content 2</TabPanel>
 * </Tabs>
 */
export function Tabs({
  defaultValue,
  value,
  onChange,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  children,
  className = '',
  ...props
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || '')

  const currentTab = value !== undefined ? value : activeTab

  const handleTabChange = (newValue: string) => {
    if (value === undefined) {
      setActiveTab(newValue)
    }
    onChange?.(newValue)
  }

  const tabsClass = `tabs tabs-${variant} tabs-${size} tabs-${orientation} ${className}`

  return (
    <TabsContext.Provider
      value={{
        activeTab: currentTab,
        setActiveTab: handleTabChange,
        variant,
        size,
        orientation
      }}
    >
      <div class={tabsClass} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

/**
 * TabList - kontener dla przycisków zakładek
 */
export function TabList({ children, className = '', ...props }: TabListProps) {
  return (
    <div class={`tab-list ${className}`} role="tablist" {...props}>
      {children}
    </div>
  )
}

/**
 * Tab - pojedyncza zakładka
 */
export function Tab({ value, disabled = false, children, className = '', ...props }: TabProps) {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tab must be used within Tabs component')
  }

  const { activeTab, setActiveTab } = context
  const isActive = activeTab === value

  const handleClick = () => {
    if (!disabled) {
      setActiveTab(value)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const tabClass = `tab ${isActive ? 'tab-active' : ''} ${disabled ? 'tab-disabled' : ''} ${className}`

  return (
    <button
      type="button"
      class={tabClass}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * TabPanel - zawartość zakładki
 */
export function TabPanel({ value, children, className = '', ...props }: TabPanelProps) {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('TabPanel must be used within Tabs component')
  }

  const { activeTab } = context
  const isActive = activeTab === value

  if (!isActive) return null

  return (
    <div
      class={`tab-panel ${className}`}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      {...props}
    >
      {children}
    </div>
  )
}

// Export types
export type { TabsProps, TabListProps, TabProps, TabPanelProps }
