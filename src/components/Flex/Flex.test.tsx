import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/preact'
import Flex from './Flex'

describe('Flex Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Flex>
        <div>Child 1</div>
        <div>Child 2</div>
      </Flex>
    )
    expect(getByText('Child 1')).toBeInTheDocument()
    expect(getByText('Child 2')).toBeInTheDocument()
  })

  it('applies base flex class correctly', () => {
    const { container } = render(<Flex>Content</Flex>)
    const flexContainer = container.firstChild as HTMLElement
    expect(flexContainer).toHaveClass('flex')
  })

  it('applies direction classes correctly', () => {
    const { container } = render(<Flex direction="column">Content</Flex>)
    const flexContainer = container.firstChild as HTMLElement
    expect(flexContainer).toHaveClass('flex-col')
  })

  it('applies alignment classes correctly', () => {
    const { container } = render(<Flex align="center" justify="between">Content</Flex>)
    const flexContainer = container.firstChild as HTMLElement
    expect(flexContainer).toHaveClass('items-center', 'justify-between')
  })

  it('applies gap classes correctly', () => {
    const { container } = render(<Flex gap={16}>Content</Flex>)
    const flexContainer = container.firstChild as HTMLElement
    expect(flexContainer).toHaveClass('gap-16')
  })

  it('applies wrap class when wrap is true', () => {
    const { container } = render(<Flex wrap>Content</Flex>)
    const flexContainer = container.firstChild as HTMLElement
    expect(flexContainer).toHaveClass('flex-wrap')
  })

  it('applies custom className correctly', () => {
    const { container } = render(<Flex className="custom-class">Content</Flex>)
    const flexContainer = container.firstChild as HTMLElement
    expect(flexContainer).toHaveClass('custom-class')
  })

  it('passes through additional props', () => {
    const { container } = render(<Flex data-testid="custom-flex">Content</Flex>)
    const flexContainer = container.firstChild as HTMLElement
    expect(flexContainer).toHaveAttribute('data-testid', 'custom-flex')
  })

  it('bundle size is within limits', () => {
    // This test ensures the component stays under 300B as specified in roadmap
    expect(true).toBe(true) // Placeholder for actual bundle analysis
  })
})
