import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration with React plugin and API proxy
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default Vite dev server port
    proxy: {
      // Proxy API requests to Express server
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})