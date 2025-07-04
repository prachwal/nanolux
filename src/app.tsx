import './app.css'
import './styles/atomic.css'

// Import our NanoLux components
import { Card } from './components'
import { 
  AppHeader, 
  CounterDemo, 
  ButtonShowcase, 
  FeatureList, 
  BundleInfo,
  type FeatureItem 
} from './examples'

export function App() {
  const nanoluxFeatures: FeatureItem[] = [
    { icon: '📦', text: 'Ultra-małe bundly (<1KB runtime)' },
    { icon: '🎨', text: 'CSS Variables + Atomic CSS' },
    { icon: '🔧', text: 'Zero config' },
    { icon: '⚡', text: 'Build-time optimizations' },
    { icon: '🌟', text: 'Tree-shaking automatyczny' },
    { icon: '🎯', text: 'TypeScript support' },
    { icon: '📚', text: 'Auto-generated documentation' },
    { icon: '🧪', text: 'Stories as tests' }
  ]

  return (
    <>
      <AppHeader />
      
      {/* Demo NanoLux Components */}
      <Card variant="elevated" padding="lg">
        <CounterDemo />
        <ButtonShowcase />
      </Card>
      
      <Card variant="outlined" padding="md" className="margin-top-16">
        <FeatureList features={nanoluxFeatures} />
      </Card>
      
      <BundleInfo />
    </>
  )
}
