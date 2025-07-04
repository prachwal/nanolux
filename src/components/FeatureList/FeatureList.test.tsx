import { render } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import FeatureList from './FeatureList'
import { testBundleSize } from '../../test/utils'

describe('FeatureList Component', () => {
  const mockFeatures = [
    { icon: '📦', text: 'Ultra-małe bundly' },
    { icon: '🎨', text: 'CSS Variables' },
    { icon: '⚡', text: 'Szybkie ładowanie' }
  ]

  test('renders with default title', () => {
    const { getByText } = render(<FeatureList features={mockFeatures} />)
    
    expect(getByText('✨ Funkcje NanoLux')).toBeInTheDocument()
  })

  test('renders with custom title', () => {
    const { getByText } = render(
      <FeatureList 
        features={mockFeatures} 
        title="Custom Features"
      />
    )
    
    expect(getByText('Custom Features')).toBeInTheDocument()
  })

  test('renders without title when not provided', () => {
    const { container } = render(
      <FeatureList features={mockFeatures} title="" />
    )
    
    const title = container.querySelector('.feature-list-title')
    expect(title).not.toBeInTheDocument()
  })

  test('renders all feature items correctly', () => {
    const { getByText } = render(<FeatureList features={mockFeatures} />)
    
    mockFeatures.forEach(feature => {
      expect(getByText(feature.icon)).toBeInTheDocument()
      expect(getByText(feature.text)).toBeInTheDocument()
    })
  })

  test('applies base classes correctly', () => {
    const { container } = render(<FeatureList features={mockFeatures} />)
    const featureList = container.firstChild as HTMLElement
    
    expect(featureList).toHaveClass('feature-list')
  })

  test('applies custom className correctly', () => {
    const { container } = render(
      <FeatureList features={mockFeatures} className="custom-list" />
    )
    const featureList = container.firstChild as HTMLElement
    
    expect(featureList).toHaveClass('feature-list', 'custom-list')
  })

  test('renders correct HTML structure', () => {
    const { container } = render(<FeatureList features={mockFeatures} />)
    
    const title = container.querySelector('.feature-list-title')
    const itemsList = container.querySelector('.feature-list-items')
    const items = container.querySelectorAll('.feature-list-item')
    
    expect(title).toBeInTheDocument()
    expect(title?.tagName).toBe('H4')
    expect(itemsList).toBeInTheDocument()
    expect(itemsList?.tagName).toBe('UL')
    expect(items).toHaveLength(mockFeatures.length)
  })

  test('each feature item has correct structure', () => {
    const { container } = render(<FeatureList features={mockFeatures} />)
    const items = container.querySelectorAll('.feature-list-item')
    
    items.forEach((item, index) => {
      expect(item.tagName).toBe('LI')
      
      const icon = item.querySelector('.feature-list-icon')
      const text = item.querySelector('.feature-list-text')
      
      expect(icon).toBeInTheDocument()
      expect(text).toBeInTheDocument()
      expect(icon).toHaveTextContent(mockFeatures[index].icon)
      expect(text).toHaveTextContent(mockFeatures[index].text)
    })
  })

  test('handles empty features array', () => {
    const { container } = render(<FeatureList features={[]} />)
    
    const itemsList = container.querySelector('.feature-list-items')
    const items = container.querySelectorAll('.feature-list-item')
    
    expect(itemsList).toBeInTheDocument()
    expect(items).toHaveLength(0)
  })

  test('handles single feature correctly', () => {
    const singleFeature = [{ icon: '🚀', text: 'Single feature' }]
    const { getByText } = render(<FeatureList features={singleFeature} />)
    
    expect(getByText('🚀')).toBeInTheDocument()
    expect(getByText('Single feature')).toBeInTheDocument()
  })

  test('forwards additional props correctly', () => {
    const { container } = render(
      <FeatureList 
        features={mockFeatures} 
        data-testid="test-feature-list"
        role="list"
      />
    )
    const featureList = container.firstChild as HTMLElement
    
    expect(featureList).toHaveAttribute('data-testid', 'test-feature-list')
    expect(featureList).toHaveAttribute('role', 'list')
  })

  test('trims className correctly when no custom class provided', () => {
    const { container } = render(<FeatureList features={mockFeatures} />)
    const featureList = container.firstChild as HTMLElement
    
    expect(featureList.className).toBe('feature-list')
  })

  test('uses correct key prop for items', () => {
    const { container } = render(<FeatureList features={mockFeatures} />)
    const items = container.querySelectorAll('.feature-list-item')
    
    // Verify items are rendered (React/Preact handles keys internally)
    expect(items).toHaveLength(mockFeatures.length)
  })

  // Performance test according to NanoLux philosophy
  test('bundle size is within limits', async () => {
    await testBundleSize('FeatureList', 512) // max 512 bytes
  })

  // Atomic CSS test - ensures correct CSS class composition
  test('follows atomic CSS principles', () => {
    const { container } = render(
      <FeatureList features={mockFeatures} className="flex flex-col gap-8" />
    )
    const featureList = container.firstChild as HTMLElement
    
    // Checks atomic CSS class composition
    expect(featureList.className).toMatch(/feature-list/)
    expect(featureList.className).toMatch(/flex/)
    expect(featureList.className).toMatch(/flex-col/)
    expect(featureList.className).toMatch(/gap-8/)
  })

  // Accessibility test
  test('has proper accessibility structure', () => {
    const { container } = render(<FeatureList features={mockFeatures} />)
    
    const title = container.querySelector('h4')
    const list = container.querySelector('ul')
    const items = container.querySelectorAll('li')
    
    expect(title).toBeInTheDocument()
    expect(list).toBeInTheDocument()
    expect(items).toHaveLength(mockFeatures.length)
  })

  // Content validation test
  test('displays features in correct order', () => {
    const { container } = render(<FeatureList features={mockFeatures} />)
    const items = container.querySelectorAll('.feature-list-item')
    
    items.forEach((item, index) => {
      const icon = item.querySelector('.feature-list-icon')
      const text = item.querySelector('.feature-list-text')
      
      expect(icon?.textContent).toBe(mockFeatures[index].icon)
      expect(text?.textContent).toBe(mockFeatures[index].text)
    })
  })

  // Edge cases
  test('handles features with empty text', () => {
    const featuresWithEmptyText = [
      { icon: '📦', text: '' },
      { icon: '🎨', text: 'Valid text' }
    ]
    
    const { container } = render(<FeatureList features={featuresWithEmptyText} />)
    const items = container.querySelectorAll('.feature-list-item')
    
    expect(items).toHaveLength(2)
    expect(items[0].querySelector('.feature-list-text')).toHaveTextContent('')
    expect(items[1].querySelector('.feature-list-text')).toHaveTextContent('Valid text')
  })

  test('handles features with empty icon', () => {
    const featuresWithEmptyIcon = [
      { icon: '', text: 'Feature without icon' },
      { icon: '🎨', text: 'Feature with icon' }
    ]
    
    const { container } = render(<FeatureList features={featuresWithEmptyIcon} />)
    const items = container.querySelectorAll('.feature-list-item')
    
    expect(items).toHaveLength(2)
    expect(items[0].querySelector('.feature-list-icon')).toHaveTextContent('')
    expect(items[1].querySelector('.feature-list-icon')).toHaveTextContent('🎨')
  })
})
