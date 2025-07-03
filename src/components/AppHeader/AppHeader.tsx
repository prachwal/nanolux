import { ComponentChildren } from 'preact'
import Logo from '../Logo/Logo'
import './AppHeader.css'

interface AppHeaderProps {
  /** Tytuł aplikacji */
  title?: string
  /** Opis aplikacji */
  description?: string
  /** Dodatkowe klasy CSS */
  className?: string
}

export type { AppHeaderProps }

/**
 * Nagłówek aplikacji z logo i opisem
 * @example
 * <AppHeader title="My App" description="Amazing application" />
 */
export default function AppHeader({ 
  title = 'NanoLux + Preact',
  description = 'Ultra-minimalistyczny framework komponentów',
  className = '',
  ...props 
}: AppHeaderProps) {
  const headerClass = `app-header ${className}`.trim()
  
  return (
    <header className={headerClass} {...props}>
      <div className="app-header-logos">
        <Logo 
          src="/vite.svg" 
          alt="Vite logo" 
          variant="vite"
          href="https://vite.dev"
          target="_blank"
        />
        <Logo 
          src="/preact.svg" 
          alt="Preact logo" 
          variant="preact"
          href="https://preactjs.com"
          target="_blank"
        />
      </div>
      
      <h1 className="app-header-title">{title}</h1>
      <p className="app-header-description">{description}</p>
    </header>
  )
}
