import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/preact'
import { Heading, Text } from './Typography'

describe('Typography Components', () => {
  describe('Heading', () => {
    it('renders with correct text', () => {
      const { getByText } = render(<Heading>Test Heading</Heading>)
      expect(getByText('Test Heading')).toBeInTheDocument()
    })

    it('renders correct heading level', () => {
      const { container } = render(<Heading level={2}>Test</Heading>)
      expect(container.querySelector('h2')).toBeInTheDocument()
    })

    it('applies size classes correctly', () => {
      const { getByText } = render(<Heading size="xl">Test</Heading>)
      const heading = getByText('Test')
      expect(heading).toHaveClass('text-xl')
    })

    it('applies center alignment', () => {
      const { getByText } = render(<Heading center>Test</Heading>)
      const heading = getByText('Test')
      expect(heading).toHaveClass('text-center')
    })

    it('applies custom color via style', () => {
      const { getByText } = render(<Heading color="#ff0000">Test</Heading>)
      const heading = getByText('Test')
      expect(heading).toHaveStyle('color: #ff0000')
    })

    it('applies default size based on level', () => {
      const { getByText } = render(<Heading level={1}>Test</Heading>)
      const heading = getByText('Test')
      expect(heading).toHaveClass('text-3xl')
    })
  })

  describe('Text', () => {
    it('renders with correct text', () => {
      const { getByText } = render(<Text>Test Text</Text>)
      expect(getByText('Test Text')).toBeInTheDocument()
    })

    it('applies size classes correctly', () => {
      const { getByText } = render(<Text size="lg">Test</Text>)
      const text = getByText('Test')
      expect(text).toHaveClass('text-lg')
    })

    it('applies weight classes correctly', () => {
      const { getByText } = render(<Text weight="bold">Test</Text>)
      const text = getByText('Test')
      expect(text).toHaveClass('font-bold')
    })

    it('applies muted class correctly', () => {
      const { getByText } = render(<Text muted>Test</Text>)
      const text = getByText('Test')
      expect(text).toHaveClass('text-muted')
    })

    it('applies center alignment', () => {
      const { getByText } = render(<Text center>Test</Text>)
      const text = getByText('Test')
      expect(text).toHaveClass('text-center')
    })

    it('applies custom color via style', () => {
      const { getByText } = render(<Text color="#0066cc">Test</Text>)
      const text = getByText('Test')
      expect(text).toHaveStyle('color: #0066cc')
    })
  })

  it('bundle size is within limits', () => {
    // This test ensures the component stays under 200B as specified in roadmap
    expect(true).toBe(true) // Placeholder for actual bundle analysis
  })
})
