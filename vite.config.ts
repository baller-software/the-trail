import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/oregon-trail/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
