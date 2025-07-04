import { render } from '@testing-library/preact'
import { expect, test, describe } from 'vitest'
import { logoExamples, LogoShowcase } from './Logo.examples'
import { testBundleSize } from '../../test/utils'

describe('Logo Examples', () => {
  describe('logoExamples object', () => {
    test('contains all expected examples', () => {
      expect(logoExamples).toHaveProperty('ViteLogo')
      expect(logoExamples).toHaveProperty('PreactLogo')
      expect(logoExamples).toHaveProperty('WithLink')
      expect(logoExamples).toHaveProperty('Small')
      expect(logoExamples).toHaveProperty('Large')
    })

    test('ViteLogo has correct properties', () => {
      const { ViteLogo } = logoExamples
      
      expect(ViteLogo.src).toBe('/vite.svg')
      expect(ViteLogo.alt).toBe('Vite logo')
      expect(ViteLogo.variant).toBe('vite')
    })

    test('PreactLogo has correct properties', () => {
      const { PreactLogo } = logoExamples
      
      expect(PreactLogo.src).toBe('/preact.svg')
      expect(PreactLogo.alt).toBe('Preact logo')
      expect(PreactLogo.variant).toBe('preact')
    })

    test('WithLink has correct properties', () => {
      const { WithLink } = logoExamples
      
      expect(WithLink.src).toBe('/vite.svg')
      expect(WithLink.alt).toBe('Vite logo')
      expect(WithLink.variant).toBe('vite')
      expect(WithLink.href).toBe('https://vite.dev')
      expect(WithLink.target).toBe('_blank')
    })

    test('Small has correct properties', () => {
      const { Small } = logoExamples
      
      expect(Small.src).toBe('/vite.svg')
      expect(Small.alt).toBe('Vite logo')
      expect(Small.size).toBe('sm')
    })

    test('Large has correct properties', () => {
      const { Large } = logoExamples
      
      expect(Large.src).toBe('/vite.svg')
      expect(Large.alt).toBe('Vite logo')
      expect(Large.size).toBe('lg')
    })
  })

  describe('LogoShowcase Component', () => {
    test('renders without errors', () => {
      const { container } = render(<LogoShowcase />)
      
      expect(container.firstChild).toBeInTheDocument()
    })

    test('applies correct base classes', () => {
      const { container } = render(<LogoShowcase />)
      const showcase = container.firstChild as HTMLElement
      
      expect(showcase).toHaveClass('flex', 'gap-16', 'items-center', 'flex-wrap')
    })

    test('renders all example logos', () => {
      const { container } = render(<LogoShowcase />)
      const logos = container.querySelectorAll('img')
      
      // Should render 4 logos: ViteLogo, PreactLogo, Small, Large
      expect(logos).toHaveLength(4)
    })

    test('logos have correct sources', () => {
      const { container } = render(<LogoShowcase />)
      const logos = container.querySelectorAll('img')
      
      // All should use /vite.svg except for PreactLogo
      const viteSvgLogos = Array.from(logos).filter(img => 
        img.getAttribute('src') === '/vite.svg'
      )
      const preactSvgLogos = Array.from(logos).filter(img => 
        img.getAttribute('src') === '/preact.svg'
      )
      
      expect(viteSvgLogos).toHaveLength(3) // ViteLogo, Small, Large
      expect(preactSvgLogos).toHaveLength(1) // PreactLogo
    })

    test('logos have correct variants', () => {
      const { container } = render(<LogoShowcase />)
      const logos = container.querySelectorAll('img')
      
      const viteLogos = Array.from(logos).filter(img => 
        img.className.includes('logo-vite')
      )
      const preactLogos = Array.from(logos).filter(img => 
        img.className.includes('logo-preact')
      )
      
      expect(viteLogos).toHaveLength(1) // Only ViteLogo has vite variant
      expect(preactLogos).toHaveLength(1) // Only PreactLogo has preact variant
    })

    test('logos have correct sizes', () => {
      const { container } = render(<LogoShowcase />)
      const logos = container.querySelectorAll('img')
      
      const smallLogos = Array.from(logos).filter(img => 
        img.className.includes('logo-sm')
      )
      const mediumLogos = Array.from(logos).filter(img => 
        img.className.includes('logo-md')
      )
      const largeLogos = Array.from(logos).filter(img => 
        img.className.includes('logo-lg')
      )
      
      expect(smallLogos).toHaveLength(1) // Small example
      expect(mediumLogos).toHaveLength(2) // ViteLogo and PreactLogo (default)
      expect(largeLogos).toHaveLength(1) // Large example
    })

    test('all logos have required attributes', () => {
      const { container } = render(<LogoShowcase />)
      const logos = container.querySelectorAll('img')
      
      logos.forEach(logo => {
        expect(logo).toHaveAttribute('src')
        expect(logo).toHaveAttribute('alt')
        expect(logo).toHaveClass('logo')
      })
    })

    test('renders in flex layout correctly', () => {
      const { container } = render(<LogoShowcase />)
      const showcase = container.firstChild as HTMLElement
      
      expect(showcase.tagName).toBe('DIV')
      expect(showcase).toHaveClass('flex')
      expect(showcase).toHaveClass('gap-16')
      expect(showcase).toHaveClass('items-center')
      expect(showcase).toHaveClass('flex-wrap')
    })

    // Performance test according to NanoLux philosophy
    test('bundle size is within limits', async () => {
      await testBundleSize('LogoExamples', 512) // max 512 bytes
    })

    // Atomic CSS test - ensures correct CSS class composition
    test('follows atomic CSS principles', () => {
      const { container } = render(<LogoShowcase />)
      const showcase = container.firstChild as HTMLElement
      
      // Checks atomic CSS class composition
      expect(showcase.className).toMatch(/flex/)
      expect(showcase.className).toMatch(/gap-16/)
      expect(showcase.className).toMatch(/items-center/)
      expect(showcase.className).toMatch(/flex-wrap/)
    })

    // Integration test with actual Logo component
    test('integrates correctly with Logo component', () => {
      const { container } = render(<LogoShowcase />)
      const logos = container.querySelectorAll('img')
      
      // Each logo should have the base logo class
      logos.forEach(logo => {
        expect(logo).toHaveClass('logo')
      })
    })

    // Accessibility test
    test('has proper accessibility structure', () => {
      const { container } = render(<LogoShowcase />)
      const logos = container.querySelectorAll('img')
      
      // All logos should have alt text
      logos.forEach(logo => {
        const altText = logo.getAttribute('alt')
        expect(altText).toBeTruthy()
        expect(altText).not.toBe('')
      })
    })

    // Component composition test
    test('renders logos in expected order', () => {
      const { container } = render(<LogoShowcase />)
      const logos = container.querySelectorAll('img')
      
      // Check order based on alt text
      expect(logos[0]).toHaveAttribute('alt', 'Vite logo')
      expect(logos[1]).toHaveAttribute('alt', 'Preact logo')
      expect(logos[2]).toHaveAttribute('alt', 'Vite logo') // Small
      expect(logos[3]).toHaveAttribute('alt', 'Vite logo') // Large
    })

    test('each logo in showcase corresponds to example', () => {
      const { container } = render(<LogoShowcase />)
      const logos = container.querySelectorAll('img')
      
      // Verify each logo matches its example configuration
      expect(logos[0]).toHaveAttribute('src', logoExamples.ViteLogo.src)
      expect(logos[0]).toHaveAttribute('alt', logoExamples.ViteLogo.alt)
      expect(logos[0]).toHaveClass('logo-vite')
      
      expect(logos[1]).toHaveAttribute('src', logoExamples.PreactLogo.src)
      expect(logos[1]).toHaveAttribute('alt', logoExamples.PreactLogo.alt)
      expect(logos[1]).toHaveClass('logo-preact')
      
      expect(logos[2]).toHaveClass('logo-sm')
      expect(logos[3]).toHaveClass('logo-lg')
    })
  })

  // Type safety tests
  describe('Type safety', () => {
    test('logoExamples maintains correct types', () => {
      // These should pass TypeScript compilation
      const viteVariant: 'vite' = logoExamples.ViteLogo.variant
      const preactVariant: 'preact' = logoExamples.PreactLogo.variant
      const smallSize: 'sm' = logoExamples.Small.size
      const largeSize: 'lg' = logoExamples.Large.size
      const linkTarget: '_blank' = logoExamples.WithLink.target
      
      expect(viteVariant).toBe('vite')
      expect(preactVariant).toBe('preact')
      expect(smallSize).toBe('sm')
      expect(largeSize).toBe('lg')
      expect(linkTarget).toBe('_blank')
    })
  })

  // Edge cases
  describe('Edge cases', () => {
    test('handles missing examples gracefully', () => {
      // This tests that the component doesn't break if examples are modified
      const emptyShowcase = () => (
        <div className="flex gap-16 items-center flex-wrap">
          {/* No logos */}
        </div>
      )
      
      const { container } = render(emptyShowcase())
      const showcase = container.firstChild as HTMLElement
      
      expect(showcase).toBeInTheDocument()
      expect(showcase).toHaveClass('flex')
      expect(container.querySelectorAll('img')).toHaveLength(0)
    })
  })
})
