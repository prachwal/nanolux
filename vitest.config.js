import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: true,
    // Include only .test. files, exclude stories
    include: ['**/*.test.?(m)[jt]s?(x)'],
    exclude: ['**/*.stories.?(m)[jt]s?(x)', '**/node_modules/**'],
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [
        'src/**/*.stories.*',
        'src/**/*.test.*',
        'src/test/**',
        'src/main.tsx',
        '**/*.d.ts',
        '**/index.ts'
      ]
    },
    // Reporters for different output formats
    reporters: ['default', 'json', 'html']
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
})
