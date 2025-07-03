import './BundleInfo.css'

interface BundleInfoProps {
  /** Rozmiar CSS w bajtach */
  cssSize?: string
  /** Rozmiar JS w bajtach */
  jsSize?: string
  /** Całkowity rozmiar */
  totalSize?: string
  /** Dodatkowe klasy CSS */
  className?: string
}

export type { BundleInfoProps }

/**
 * Informacje o rozmiarze bundla
 * @example
 * <BundleInfo cssSize="950 bytes" jsSize="600 bytes" totalSize="1.5KB" />
 */
export default function BundleInfo({ 
  cssSize = '~950 bytes CSS',
  jsSize = '~600 bytes JS',
  totalSize = '~1.5KB',
  className = '',
  ...props 
}: BundleInfoProps) {
  const infoClass = `bundle-info ${className}`.trim()
  
  return (
    <div className={infoClass} {...props}>
      <p className="bundle-info-text">
        Bundle size: {' '}
        <strong className="bundle-info-size">
          {cssSize} + {jsSize}
        </strong> per component (gzipped)
        <br />
        <small className="bundle-info-note">
          Total overhead: {totalSize} for both Button + Card
        </small>
      </p>
    </div>
  )
}
