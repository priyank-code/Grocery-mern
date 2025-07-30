import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173,
    host: '0.0.0.0'
  },
  build: {
    outDir: '../backend/client/dist',
    emptyOutDir: true
  }
})
