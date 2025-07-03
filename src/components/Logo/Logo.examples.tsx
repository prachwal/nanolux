// Logo Examples - Simple documentation without Storybook dependency
import Logo from './Logo'

// Basic examples for documentation
export const logoExamples = {
  ViteLogo: {
    src: '/vite.svg',
    alt: 'Vite logo',
    variant: 'vite' as const
  },
  
  PreactLogo: {
    src: '/preact.svg',
    alt: 'Preact logo',
    variant: 'preact' as const
  },
  
  WithLink: {
    src: '/vite.svg',
    alt: 'Vite logo',
    variant: 'vite' as const,
    href: 'https://vite.dev',
    target: '_blank' as const
  },
  
  Small: {
    src: '/vite.svg',
    alt: 'Vite logo',
    size: 'sm' as const
  },
  
  Large: {
    src: '/vite.svg',
    alt: 'Vite logo',
    size: 'lg' as const
  }
}

/**
 * Example showcase component for Logo
 * Usage: <LogoShowcase />
 */
export function LogoShowcase() {
  return (
    <div className="flex gap-16 items-center flex-wrap">
      <Logo {...logoExamples.ViteLogo} />
      <Logo {...logoExamples.PreactLogo} />
      <Logo {...logoExamples.Small} />
      <Logo {...logoExamples.Large} />
    </div>
  )
}
