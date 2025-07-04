import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: true,
    // Exclude stories from test files, include only .test. files
    include: ['**/*.test.?(m)[jt]s?(x)'],
    exclude: ['**/*.stories.?(m)[jt]s?(x)', '**/node_modules/**']
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
})
