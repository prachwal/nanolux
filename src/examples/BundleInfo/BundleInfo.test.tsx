import { render } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import BundleInfo from './BundleInfo'
import { testBundleSize } from '../../test/utils'

describe('BundleInfo Component', () => {
  test('renders with default values', () => {
    const { getByText } = render(<BundleInfo />)
    
    expect(getByText(/Bundle size:/)).toBeInTheDocument()
    expect(getByText(/~950 bytes CSS/)).toBeInTheDocument()
    expect(getByText(/~600 bytes JS/)).toBeInTheDocument()
    expect(getByText(/Total overhead: ~1.5KB/)).toBeInTheDocument()
  })

  test('renders with custom values', () => {
    const { getByText } = render(
      <BundleInfo 
        cssSize="800 bytes"
        jsSize="500 bytes"
        totalSize="1.3KB"
      />
    )
    
    expect(getByText(/800 bytes/)).toBeInTheDocument()
    expect(getByText(/500 bytes/)).toBeInTheDocument()
    expect(getByText(/Total overhead: 1.3KB/)).toBeInTheDocument()
  })

  test('applies base classes correctly', () => {
    const { container } = render(<BundleInfo />)
    const bundleInfo = container.firstChild as HTMLElement
    
    expect(bundleInfo).toHaveClass('bundle-info')
  })

  test('applies custom className correctly', () => {
    const { container } = render(<BundleInfo className="custom-info" />)
    const bundleInfo = container.firstChild as HTMLElement
    
    expect(bundleInfo).toHaveClass('bundle-info', 'custom-info')
  })

  test('renders correct HTML structure', () => {
    const { container } = render(<BundleInfo />)
    
    const info = container.querySelector('.bundle-info')
    const text = container.querySelector('.bundle-info-text')
    const size = container.querySelector('.bundle-info-size')
    const note = container.querySelector('.bundle-info-note')
    
    expect(info).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(text?.tagName).toBe('P')
    expect(size).toBeInTheDocument()
    expect(size?.tagName).toBe('STRONG')
    expect(note).toBeInTheDocument()
    expect(note?.tagName).toBe('SMALL')
  })

  test('displays bundle information with correct formatting', () => {
    const { container } = render(
      <BundleInfo 
        cssSize="1KB CSS"
        jsSize="800B JS"
        totalSize="1.8KB"
      />
    )
    
    const sizeElement = container.querySelector('.bundle-info-size')
    const noteElement = container.querySelector('.bundle-info-note')
    
    expect(sizeElement).toHaveTextContent('1KB CSS + 800B JS')
    expect(noteElement).toHaveTextContent('Total overhead: 1.8KB for both Button + Card')
  })

  test('forwards additional props correctly', () => {
    const { container } = render(
      <BundleInfo 
        data-testid="test-bundle-info"
        role="status"
      />
    )
    const bundleInfo = container.firstChild as HTMLElement
    
    expect(bundleInfo).toHaveAttribute('data-testid', 'test-bundle-info')
    expect(bundleInfo).toHaveAttribute('role', 'status')
  })

  test('trims className correctly when no custom class provided', () => {
    const { container } = render(<BundleInfo />)
    const bundleInfo = container.firstChild as HTMLElement
    
    expect(bundleInfo.className).toBe('bundle-info')
  })

  test('handles empty values gracefully', () => {
    const { container } = render(
      <BundleInfo 
        cssSize=""
        jsSize=""
        totalSize=""
      />
    )
    
    const sizeElement = container.querySelector('.bundle-info-size')
    const noteElement = container.querySelector('.bundle-info-note')
    
    expect(sizeElement).toHaveTextContent('+')
    expect(noteElement).toHaveTextContent('Total overhead: for both Button + Card')
  })

  test('handles long size values correctly', () => {
    const { getByText } = render(
      <BundleInfo 
        cssSize="1,234 bytes CSS with minification"
        jsSize="987 bytes JS with compression"
        totalSize="2.5KB total"
      />
    )
    
    expect(getByText(/1,234 bytes CSS with minification/)).toBeInTheDocument()
    expect(getByText(/987 bytes JS with compression/)).toBeInTheDocument()
    expect(getByText(/Total overhead: 2.5KB total/)).toBeInTheDocument()
  })

  // Performance test according to NanoLux philosophy
  test('bundle size is within limits', async () => {
    await testBundleSize('BundleInfo', 300) // max 300 bytes - should be very small
  })

  // Atomic CSS test - ensures correct CSS class composition
  test('follows atomic CSS principles', () => {
    const { container } = render(
      <BundleInfo className="text-center p-8" />
    )
    const bundleInfo = container.firstChild as HTMLElement
    
    // Checks atomic CSS class composition
    expect(bundleInfo.className).toMatch(/bundle-info/)
    expect(bundleInfo.className).toMatch(/text-center/)
    expect(bundleInfo.className).toMatch(/p-8/)
  })

  // Accessibility test
  test('has proper accessibility structure', () => {
    const { container } = render(<BundleInfo />)
    
    const paragraph = container.querySelector('p')
    const strong = container.querySelector('strong')
    const small = container.querySelector('small')
    
    expect(paragraph).toBeInTheDocument()
    expect(strong).toBeInTheDocument()
    expect(small).toBeInTheDocument()
  })

  // Content validation test
  test('displays information in correct structure', () => {
    const { container } = render(<BundleInfo />)
    const text = container.querySelector('.bundle-info-text')
    
    expect(text?.textContent).toMatch(/Bundle size:/)
    expect(text?.textContent).toMatch(/bytes CSS/)
    expect(text?.textContent).toMatch(/bytes JS/)
    expect(text?.textContent).toMatch(/per component \(gzipped\)/)
    expect(text?.textContent).toMatch(/Total overhead:/)
    expect(text?.textContent).toMatch(/for both Button \+ Card/)
  })

  // Component composition test
  test('maintains consistent component structure', () => {
    const { container } = render(<BundleInfo />)
    
    const bundleInfo = container.querySelector('.bundle-info')
    const text = bundleInfo?.querySelector('.bundle-info-text')
    const size = text?.querySelector('.bundle-info-size')
    const note = text?.querySelector('.bundle-info-note')
    
    expect(bundleInfo).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(size).toBeInTheDocument()
    expect(note).toBeInTheDocument()
    
    // Check that size is before note in the DOM
    const textContent = text?.textContent || ''
    const sizeIndex = textContent.indexOf(size?.textContent || '')
    const noteIndex = textContent.indexOf(note?.textContent || '')
    expect(sizeIndex).toBeLessThan(noteIndex)
  })

  // Edge cases
  test('handles special characters in size values', () => {
    const { getByText } = render(
      <BundleInfo 
        cssSize="~1KB CSS (est.)"
        jsSize="≈800B JS [min]"
        totalSize="~1.8KB ± 0.1KB"
      />
    )
    
    expect(getByText(/~1KB CSS \(est\.\)/)).toBeInTheDocument()
    expect(getByText(/≈800B JS \[min\]/)).toBeInTheDocument()
    expect(getByText(/Total overhead: ~1.8KB ± 0.1KB/)).toBeInTheDocument()
  })

  test('handles numeric-only values', () => {
    const { getByText } = render(
      <BundleInfo 
        cssSize="950"
        jsSize="600"
        totalSize="1550"
      />
    )
    
    expect(getByText(/950/)).toBeInTheDocument()
    expect(getByText(/600/)).toBeInTheDocument()
    expect(getByText(/Total overhead: 1550/)).toBeInTheDocument()
  })
})
