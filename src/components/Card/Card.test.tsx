import { render } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import Card from './Card'
import { testBundleSize } from '../../test/utils'

describe('Card Component', () => {
  test('renders with correct content', () => {
    const { getByText } = render(<Card>Test content</Card>)
    expect(getByText('Test content')).toBeInTheDocument()
  })

  test('applies base classes correctly', () => {
    const { container } = render(<Card>Test</Card>)
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('card', 'card-default', 'card-md')
  })

  test('applies variant classes correctly', () => {
    const { container } = render(
      <Card variant="elevated">Elevated Card</Card>
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('card', 'card-elevated', 'card-md')
  })

  test('applies padding classes correctly', () => {
    const { container } = render(
      <Card padding="lg">Large Padding Card</Card>
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('card', 'card-default', 'card-lg')
  })

  test('applies outlined variant correctly', () => {
    const { container } = render(
      <Card variant="outlined">Outlined Card</Card>
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('card', 'card-outlined', 'card-md')
  })

  test('applies custom className correctly', () => {
    const { container } = render(
      <Card className="custom-class">Custom Card</Card>
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveClass('card', 'card-default', 'card-md', 'custom-class')
  })

  test('applies custom background color through CSS variables', () => {
    const { container } = render(
      <Card bg="#f8f9fa">Custom BG Card</Card>
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveAttribute('style', expect.stringContaining('--card-bg: #f8f9fa'))
  })

  test('applies custom border color through CSS variables', () => {
    const { container } = render(
      <Card borderColor="#dee2e6">Custom Border Card</Card>
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveAttribute('style', expect.stringContaining('--card-border-color: #dee2e6'))
  })

  test('applies both custom colors correctly', () => {
    const { container } = render(
      <Card bg="#f8f9fa" borderColor="#dee2e6">Custom Colors Card</Card>
    )
    const card = container.firstChild as HTMLElement
    
    const style = card.getAttribute('style')
    expect(style).toContain('--card-bg: #f8f9fa')
    expect(style).toContain('--card-border-color: #dee2e6')
  })

  test('forwards additional props correctly', () => {
    const { container } = render(
      <Card data-testid="test-card" role="article">Test Card</Card>
    )
    const card = container.firstChild as HTMLElement
    
    expect(card).toHaveAttribute('data-testid', 'test-card')
    expect(card).toHaveAttribute('role', 'article')
  })

  test('renders complex children correctly', () => {
    const { getByText } = render(
      <Card>
        <h3>Card Title</h3>
        <p>Card description</p>
      </Card>
    )
    
    expect(getByText('Card Title')).toBeInTheDocument()
    expect(getByText('Card description')).toBeInTheDocument()
  })

  test('has semantic HTML structure', () => {
    const { container } = render(<Card>Test</Card>)
    const card = container.firstChild as HTMLElement
    
    expect(card.tagName).toBe('DIV')
    expect(card).toHaveClass('card')
  })

  // Performance test according to NanoLux philosophy
  test('bundle size is within limits', async () => {
    await testBundleSize('Card', 512) // max 512 bytes
  })

  // Atomic CSS test - ensures correct CSS class composition
  test('follows atomic CSS principles', () => {
    const { container } = render(
      <Card variant="elevated" padding="lg" className="text-center">
        Atomic CSS Card
      </Card>
    )
    const card = container.firstChild as HTMLElement
    
    // Checks atomic CSS class composition
    expect(card.className).toMatch(/card/)
    expect(card.className).toMatch(/card-elevated/)
    expect(card.className).toMatch(/card-lg/)
    expect(card.className).toMatch(/text-center/)
  })

  // Edge cases
  test('handles empty content', () => {
    const { container } = render(<Card></Card>)
    const card = container.firstChild as HTMLElement
    
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('card')
  })

  test('handles null/undefined children gracefully', () => {
    const { container } = render(<Card>{null}</Card>)
    const card = container.firstChild as HTMLElement
    
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('card')
  })
})
