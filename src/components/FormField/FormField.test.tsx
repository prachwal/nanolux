import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import FormField from './FormField'

describe('FormField', () => {
  it('renders with basic label and children', () => {
    render(
      <FormField label="Email">
        <input type="email" />
      </FormField>
    )
    
    const label = screen.getByText('Email')
    const input = screen.getByRole('textbox')
    
    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(label).toHaveAttribute('for', input.id)
  })

  it('shows required indicator when required', () => {
    render(
      <FormField label="Password" required>
        <input type="password" />
      </FormField>
    )
    
    const required = screen.getByLabelText('required')
    expect(required).toBeInTheDocument()
    expect(required).toHaveTextContent('*')
  })

  it('displays help text when provided', () => {
    const helpText = 'Enter your email address'
    render(
      <FormField label="Email" helpText={helpText}>
        <input type="email" />
      </FormField>
    )
    
    expect(screen.getByText(helpText)).toBeInTheDocument()
  })

  it('displays error message when in error state', () => {
    const errorMessage = 'Email is required'
    render(
      <FormField label="Email" error errorMessage={errorMessage}>
        <input type="email" />
      </FormField>
    )
    
    const errorElement = screen.getByRole('alert')
    expect(errorElement).toHaveTextContent(errorMessage)
  })

  it('hides help text when showing error', () => {
    const helpText = 'Enter your email'
    const errorMessage = 'Email is required'
    
    render(
      <FormField 
        label="Email" 
        helpText={helpText}
        error 
        errorMessage={errorMessage}
      >
        <input type="email" />
      </FormField>
    )
    
    expect(screen.queryByText(helpText)).not.toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { container } = render(
      <FormField label="Email" size="lg">
        <input type="email" />
      </FormField>
    )
    
    expect(container.querySelector('.form-field')).toHaveClass('form-field-lg')
  })

  it('applies error classes when in error state', () => {
    const { container } = render(
      <FormField label="Email" error>
        <input type="email" />
      </FormField>
    )
    
    expect(container.querySelector('.form-field')).toHaveClass('form-field-error')
  })
})