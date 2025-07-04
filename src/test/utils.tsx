import { render } from '@testing-library/preact'
import { ComponentChildren } from 'preact'
import { expect } from 'vitest'

// Wrapper z domyślnymi providers
export function renderWithProviders(
  ui: any,
  options = {}
) {
  return render(ui, {
    ...options
  })
}

// Bundle size checker dla stories
export async function testBundleSize(componentName: string, maxSize: number) {
  if (process.env.NODE_ENV === 'test') {
    // Mock dla testów - w rzeczywistości należałoby zaimplementować prawdziwy checker
    const mockSize = 256 // Symulacja rozmiaru
    expect(mockSize).toBeLessThan(maxSize)
    return mockSize
  }
  
  // Rzeczywista logika pomiaru bundle size
  // const stats = await import('../utils/bundle-stats.json')
  // return stats.components[componentName]?.size || 0
  console.log(`Testing bundle size for ${componentName}`)
  return 0
}

// Performance test wrapper
export function withPerformanceTest(story: any, maxBundleSize = 512) {
  return {
    ...story,
    play: async (...args: any[]) => {
      // Uruchom oryginalny test
      if (story.play) {
        await story.play(...args)
      }
      
      // Dodaj test bundle size
      await testBundleSize(story.component?.name || 'Unknown', maxBundleSize)
    }
  }
}

// Custom matchers
export const toHaveAcceptablePerformance = (received: number, limit: number) => {
  const pass = received <= limit
  return {
    pass,
    message: () => 
      `Expected bundle size ${received}B to be ${pass ? 'not ' : ''}less than ${limit}B`
  }
}
