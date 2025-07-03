import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  
  // NanoLux optimization settings
  build: {
    // Minimize bundle size
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['preact']
        }
      }
    }
  },
  
  // Path aliases for components
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components'
    }
  },
  
  // Dev server optimization
  server: {
    hmr: {
      overlay: false
    }
  }
})
