import { JSX } from 'preact'
import './Logo.css'

interface LogoProps extends Omit<JSX.HTMLAttributes<HTMLImageElement>, 'class' | 'src' | 'alt'> {
  /** Źródło obrazu logo */
  src: string
  /** Tekst alternatywny */
  alt: string
  /** Wariant stylu logo */
  variant?: 'vite' | 'preact'
  /** Rozmiar logo */
  size?: 'sm' | 'md' | 'lg'
  /** URL do przekierowania */
  href?: string
  /** Czy otwierać w nowej karcie */
  target?: '_blank' | '_self'
  /** Dodatkowe klasy CSS */
  className?: string
}

export type { LogoProps }

/**
 * Komponent logo z opcjonalnym linkiem
 * @example
 * <Logo src="/logo.svg" alt="Logo" variant="vite" />
 * <Logo src="/logo.svg" alt="Logo" href="https://example.com" target="_blank" />
 */
export default function Logo({ 
  src, 
  alt, 
  variant,
  size = 'md',
  href,
  target = '_blank',
  className = '',
  ...props 
}: LogoProps) {
  const baseClass = `logo logo-${size}`
  const variantClass = variant ? ` logo-${variant}` : ''
  const finalClass = `${baseClass}${variantClass} ${className}`.trim()
  
  const logoImage = (
    <img 
      src={src} 
      alt={alt} 
      className={finalClass}
      {...props}
    />
  )
  
  if (href) {
    return (
      <a href={href} target={target} className="logo-link">
        {logoImage}
      </a>
    )
  }
  
  return logoImage
}
