import { describe, test, expect } from 'vitest'

// Import all story files to test they can be loaded
import * as ButtonStories from '../components/Button/Button.stories'
import * as CardStories from '../components/Card/Card.stories'
import * as LogoStories from '../components/Logo/Logo.stories'
import * as AppHeaderStories from '../components/AppHeader/AppHeader.stories'
import * as CounterDemoStories from '../components/CounterDemo/CounterDemo.stories'
import * as FeatureListStories from '../components/FeatureList/FeatureList.stories'
import * as BundleInfoStories from '../components/BundleInfo/BundleInfo.stories'
import * as ButtonShowcaseStories from '../components/ButtonShowcase/ButtonShowcase.stories'

describe('Storybook Stories Tests', () => {
  describe('Button Stories', () => {
    test('Button stories export correctly', () => {
      expect(ButtonStories.default).toBeDefined()
      expect(ButtonStories.Primary).toBeDefined()
      expect(ButtonStories.Secondary).toBeDefined()
      expect(ButtonStories.Danger).toBeDefined()
      expect(ButtonStories.AllSizes).toBeDefined()
      expect(ButtonStories.AllVariants).toBeDefined()
      expect(ButtonStories.CustomColors).toBeDefined()
    })

    test('Button stories have render functions', () => {
      expect(ButtonStories.AllSizes.render).toBeDefined()
      expect(ButtonStories.AllVariants.render).toBeDefined()
      expect(ButtonStories.CustomColors.render).toBeDefined()
    })
  })

  describe('Card Stories', () => {
    test('Card stories export correctly', () => {
      expect(CardStories.default).toBeDefined()
      expect(CardStories.Default).toBeDefined()
      expect(CardStories.Elevated).toBeDefined()
      expect(CardStories.Outlined).toBeDefined()
      expect(CardStories.AllVariants).toBeDefined()
    })
  })

  describe('Logo Stories', () => {
    test('Logo stories export correctly', () => {
      expect(LogoStories.default).toBeDefined()
      expect(LogoStories.ViteLogo).toBeDefined()
      expect(LogoStories.PreactLogo).toBeDefined()
      expect(LogoStories.AllSizes).toBeDefined()
      expect(LogoStories.AllVariants).toBeDefined()
    })
  })

  describe('AppHeader Stories', () => {
    test('AppHeader stories export correctly', () => {
      expect(AppHeaderStories.default).toBeDefined()
      expect(AppHeaderStories.Default).toBeDefined()
      expect(AppHeaderStories.CustomTitle).toBeDefined()
      expect(AppHeaderStories.ResponsiveDemo).toBeDefined()
    })
  })

  describe('CounterDemo Stories', () => {
    test('CounterDemo stories export correctly', () => {
      expect(CounterDemoStories.default).toBeDefined()
      expect(CounterDemoStories.Default).toBeDefined()
      expect(CounterDemoStories.WithInitialValue).toBeDefined()
      expect(CounterDemoStories.MultipleCounters).toBeDefined()
    })
  })

  describe('FeatureList Stories', () => {
    test('FeatureList stories export correctly', () => {
      expect(FeatureListStories.default).toBeDefined()
      expect(FeatureListStories.Default).toBeDefined()
      expect(FeatureListStories.WithTitle).toBeDefined()
      expect(FeatureListStories.ComparisonLists).toBeDefined()
    })
  })

  describe('BundleInfo Stories', () => {
    test('BundleInfo stories export correctly', () => {
      expect(BundleInfoStories.default).toBeDefined()
      expect(BundleInfoStories.Default).toBeDefined()
      expect(BundleInfoStories.OptimalSizes).toBeDefined()
      expect(BundleInfoStories.ComparisonView).toBeDefined()
    })
  })

  describe('ButtonShowcase Stories', () => {
    test('ButtonShowcase stories export correctly', () => {
      expect(ButtonShowcaseStories.default).toBeDefined()
      expect(ButtonShowcaseStories.Default).toBeDefined()
      expect(ButtonShowcaseStories.CustomTitle).toBeDefined()
      expect(ButtonShowcaseStories.DesignSystemOverview).toBeDefined()
    })
  })

  describe('Story Metadata', () => {
    test('All stories have correct meta structure', () => {
      const allMetas = [
        ButtonStories.default,
        CardStories.default,
        LogoStories.default,
        AppHeaderStories.default,
        CounterDemoStories.default,
        FeatureListStories.default,
        BundleInfoStories.default,
        ButtonShowcaseStories.default
      ]

      allMetas.forEach((meta) => {
        expect(meta.title).toBeDefined()
        expect(meta.title).toMatch(/^Components\//)
        expect(meta.component).toBeDefined()
        expect(meta.parameters?.docs?.description?.component).toBeDefined()
      })
    })

    test('Stories follow NanoLux naming convention', () => {
      expect(ButtonStories.default.title).toBe('Components/Button')
      expect(CardStories.default.title).toBe('Components/Card')
      expect(LogoStories.default.title).toBe('Components/Logo')
      expect(AppHeaderStories.default.title).toBe('Components/AppHeader')
      expect(CounterDemoStories.default.title).toBe('Components/CounterDemo')
      expect(FeatureListStories.default.title).toBe('Components/FeatureList')
      expect(BundleInfoStories.default.title).toBe('Components/BundleInfo')
      expect(ButtonShowcaseStories.default.title).toBe('Components/ButtonShowcase')
    })
  })

  describe('Story Performance', () => {
    test('Stories load quickly', () => {
      const startTime = performance.now()
      
      // Import and access all stories
      const stories = [
        ButtonStories,
        CardStories,
        LogoStories,
        AppHeaderStories,
        CounterDemoStories,
        FeatureListStories,
        BundleInfoStories,
        ButtonShowcaseStories
      ]
      
      stories.forEach(story => {
        expect(story.default).toBeDefined()
      })
      
      const endTime = performance.now()
      const loadTime = endTime - startTime
      
      // Stories should load very quickly
      expect(loadTime).toBeLessThan(50)
    })

    test('Story meta includes CSS-related documentation', () => {
      const storiesWithCSS = [
        ButtonStories.default,
        CardStories.default,
        FeatureListStories.default,
        AppHeaderStories.default
      ]

      storiesWithCSS.forEach((meta) => {
        const description = meta.parameters?.docs?.description?.component
        expect(description).toContain('CSS')
      })
    })

    test('Stories include performance-related content', () => {
      const description = ButtonStories.default.parameters?.docs?.description?.component
      expect(description).toContain('CSS variables')
      
      const bundleDescription = BundleInfoStories.default.parameters?.docs?.description?.component
      expect(bundleDescription).toContain('performance')
    })
  })
})
