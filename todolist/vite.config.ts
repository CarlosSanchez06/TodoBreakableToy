import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 8080, // your custom port
  },
  test: {
    globals: true, // So you can use `describe`, `expect`, etc. without imports
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // This file will import jest-dom
  },
})
