import { render, screen } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import Accordion, { AccordionItem } from './Accordion'

describe('Accordion', () => {
  test('renders accordion with items', () => {
    render(
      <Accordion>
        <AccordionItem id="1" title="Item 1">Content 1</AccordionItem>
        <AccordionItem id="2" title="Item 2">Content 2</AccordionItem>
      </Accordion>
    )
    
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  test('applies variant class', () => {
    const { container } = render(
      <Accordion variant="bordered">
        <AccordionItem id="1" title="Item">Content</AccordionItem>
      </Accordion>
    )
    
    const accordion = container.querySelector('.accordion')
    expect(accordion).toHaveClass('accordion-bordered')
  })

  test('applies size class', () => {
    const { container } = render(
      <Accordion size="lg">
        <AccordionItem id="1" title="Item">Content</AccordionItem>
      </Accordion>
    )
    
    const accordion = container.querySelector('.accordion')
    expect(accordion).toHaveClass('accordion-lg')
  })

  test('item opens by default when defaultOpen=true', () => {
    render(
      <AccordionItem id="1" title="Item" defaultOpen>
        Content
      </AccordionItem>
    )
    
    expect(screen.getByText('Content')).toBeVisible()
  })

  test('item is disabled when disabled=true', () => {
    render(
      <AccordionItem id="1" title="Item" disabled>
        Content
      </AccordionItem>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  test('renders icon when provided', () => {
    render(
      <AccordionItem id="1" title="Item" icon={<span>🎉</span>}>
        Content
      </AccordionItem>
    )
    
    expect(screen.getByText('🎉')).toBeInTheDocument()
  })
})
