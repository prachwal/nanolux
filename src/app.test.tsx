import { render } from '@testing-library/preact'
import { expect, test, describe, vi } from 'vitest'
import { App } from './app'

describe('App Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })

  test('renders app header', () => {
    const { getByText } = render(<App />)
    expect(getByText('NanoLux + Preact')).toBeInTheDocument()
    expect(getByText('Ultra-minimalistyczny framework komponentów')).toBeInTheDocument()
  })

  test('renders feature list with all nanolux features', () => {
    const { getByText } = render(<App />)
    
    // Check if all features are rendered
    expect(getByText('Ultra-małe bundly (<1KB runtime)')).toBeInTheDocument()
    expect(getByText('CSS Variables + Atomic CSS')).toBeInTheDocument()
    expect(getByText('Zero config')).toBeInTheDocument()
    expect(getByText('Build-time optimizations')).toBeInTheDocument()
    expect(getByText('Tree-shaking automatyczny')).toBeInTheDocument()
    expect(getByText('TypeScript support')).toBeInTheDocument()
    expect(getByText('Auto-generated documentation')).toBeInTheDocument()
    expect(getByText('Stories as tests')).toBeInTheDocument()
  })

  test('renders counter demo component', () => {
    const { getByText } = render(<App />)
    expect(getByText('🎛️ Demo komponentów NanoLux')).toBeInTheDocument()
    expect(getByText('Count: 0')).toBeInTheDocument()
  })

  test('renders button showcase', () => {
    const { getByText } = render(<App />)
    expect(getByText('Button Showcase')).toBeInTheDocument()
    expect(getByText('Small')).toBeInTheDocument()
    expect(getByText('Medium')).toBeInTheDocument()
    expect(getByText('Large')).toBeInTheDocument()
  })

  test('renders bundle info', () => {
    const { getByText } = render(<App />)
    expect(getByText(/Bundle size:/)).toBeInTheDocument()
    expect(getByText(/~950 bytes CSS/)).toBeInTheDocument()
    expect(getByText(/~600 bytes JS/)).toBeInTheDocument()
  })

  test('uses card components for layout', () => {
    const { container } = render(<App />)
    const cards = container.querySelectorAll('.card')
    expect(cards.length).toBeGreaterThanOrEqual(2)
  })

  test('applies correct card variants', () => {
    const { container } = render(<App />)
    const elevatedCard = container.querySelector('.card-elevated')
    const outlinedCard = container.querySelector('.card-outlined')
    
    expect(elevatedCard).toBeInTheDocument()
    expect(outlinedCard).toBeInTheDocument()
  })

  test('applies atomic CSS classes', () => {
    const { container } = render(<App />)
    const cardWithMargin = container.querySelector('.margin-top-16')
    expect(cardWithMargin).toBeInTheDocument()
  })

  // Performance test
  test('renders quickly with all components', () => {
    const startTime = performance.now()
    
    render(<App />)
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // App should render all components quickly
    expect(renderTime).toBeLessThan(50)
  })

  // Integration test
  test('all components work together without errors', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(<App />)
    
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
